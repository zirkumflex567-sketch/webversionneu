import { Server } from 'socket.io';
import { createServer } from 'http';
import Redis from 'ioredis';

const PORT = process.env.MULTIPLAYER_PORT || 3105;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Redis client for persistence
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redis.on('error', (err) => console.error('Redis error:', err));
redis.on('connect', () => console.log('Connected to Redis successfully'));

// Basic room and state management
const rooms = new Map(); // roomId -> { players: { id, position, rotation, velocity, ... }, state: {...} }
const lobbies = new Map(); // lobbyId -> { id, name, players, maxPlayers, host }

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // --- LOBBY SYSTEM ---
  socket.on('get_lobbies', () => {
    socket.emit('lobbies_list', Array.from(lobbies.values()));
  });

  socket.on('create_lobby', (data) => {
    const lobbyId = 'lobby_' + Math.random().toString(36).substr(2, 9);
    const newLobby = {
      id: lobbyId,
      name: data.name || `Lobby ${lobbyId.substring(6, 10)}`,
      players: [{ id: socket.id, name: data.playerName || 'Player' }],
      maxPlayers: data.maxPlayers || 4,
      host: socket.id
    };
    lobbies.set(lobbyId, newLobby);
    socket.join(lobbyId);
    io.emit('lobbies_list', Array.from(lobbies.values()));
    socket.emit('lobby_joined', newLobby);
  });

  socket.on('join_lobby', (data) => {
    const lobby = lobbies.get(data.lobbyId);
    if (lobby && lobby.players.length < lobby.maxPlayers) {
      lobby.players.push({ id: socket.id, name: data.playerName || 'Player' });
      socket.join(data.lobbyId);
      io.to(data.lobbyId).emit('lobby_updated', lobby);
      io.emit('lobbies_list', Array.from(lobbies.values()));
      socket.emit('lobby_joined', lobby);
    } else {
      socket.emit('lobby_error', 'Lobby is full or does not exist');
    }
  });

  // --- CHAT SYSTEM ---
  socket.on('send_chat', async (data) => {
    const chatMsg = {
      id: Math.random().toString(36).substr(2, 9),
      sender: data.playerName || 'Anonymous',
      message: data.message,
      timestamp: Date.now(),
      room: data.room || 'global'
    };
    
    if (data.room && data.room !== 'global') {
      io.to(data.room).emit('receive_chat', chatMsg);
    } else {
      // Save global chat to Redis (keep last 50)
      await redis.lpush('combat:chat', JSON.stringify(chatMsg));
      await redis.ltrim('combat:chat', 0, 49);
      io.emit('receive_chat', chatMsg);
    }
  });

  socket.on('get_chat_history', async () => {
    try {
      const msgs = await redis.lrange('combat:chat', 0, 49);
      const parsed = msgs.map(m => JSON.parse(m)).reverse(); // Reverse to get chronological order
      socket.emit('chat_history', parsed);
    } catch (e) {
      console.error("Error fetching chat:", e);
      socket.emit('chat_history', []);
    }
  });

  // --- LEADERBOARD SYSTEM ---
  socket.on('get_leaderboard', async () => {
    try {
      // Get top 100 players from sorted set
      const topPlayers = await redis.zrevrange('combat:leaderboard', 0, 99, 'WITHSCORES');
      const leaderboard = [];
      for (let i = 0; i < topPlayers.length; i += 2) {
        leaderboard.push({
          name: topPlayers[i],
          score: parseInt(topPlayers[i + 1], 10)
        });
      }
      socket.emit('leaderboard_data', leaderboard);
    } catch (e) {
      console.error("Error fetching leaderboard:", e);
      socket.emit('leaderboard_data', []);
    }
  });

  socket.on('update_score', async (data) => {
    if (!data.name || !data.score) return;
    try {
      await redis.zincrby('combat:leaderboard', data.score, data.name);
      
      // Broadcast updated leaderboard
      const topPlayers = await redis.zrevrange('combat:leaderboard', 0, 99, 'WITHSCORES');
      const leaderboard = [];
      for (let i = 0; i < topPlayers.length; i += 2) {
        leaderboard.push({
          name: topPlayers[i],
          score: parseInt(topPlayers[i + 1], 10)
        });
      }
      io.emit('leaderboard_data', leaderboard);
    } catch (e) {
      console.error("Error updating score:", e);
    }
  });

  // --- GAMEPLAY ROOMS ---
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        players: new Map(),
        enemies: new Map(),
        bullets: new Map(),
        startTime: Date.now()
      });
    }
    const room = rooms.get(roomId);
    room.players.set(socket.id, {
      id: socket.id,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      health: 100,
      isReady: false
    });
    
    // Notify room of new player
    io.to(roomId).emit('player_joined', { id: socket.id, players: Array.from(room.players.entries()) });
    console.log(`Player ${socket.id} joined room ${roomId}`);
    
    socket.on('disconnect', () => {
      // Remove from gameplay room
      room.players.delete(socket.id);
      io.to(roomId).emit('player_left', socket.id);
      if (room.players.size === 0) {
        rooms.delete(roomId);
      }
      
      // Remove from lobbies
      for (const [lobbyId, lobby] of lobbies.entries()) {
        const pIndex = lobby.players.findIndex(p => p.id === socket.id);
        if (pIndex !== -1) {
          lobby.players.splice(pIndex, 1);
          if (lobby.players.length === 0) {
            lobbies.delete(lobbyId);
          } else if (lobby.host === socket.id) {
            lobby.host = lobby.players[0].id; // Reassign host
          }
          io.to(lobbyId).emit('lobby_updated', lobby);
          io.emit('lobbies_list', Array.from(lobbies.values()));
        }
      }
    });

    socket.on('player_update', (data) => {
      // data: { position, rotation, velocity, etc. }
      if (room.players.has(socket.id)) {
        const player = room.players.get(socket.id);
        Object.assign(player, data);
        // Broadcast to others in the room
        socket.to(roomId).volatile.emit('player_moved', { id: socket.id, ...data });
      }
    });

    socket.on('spawn_bullet', (data) => {
      // Broadcast bullet spawn
      socket.to(roomId).emit('bullet_spawned', { id: socket.id, ...data });
    });

    socket.on('enemy_hit', (data) => {
      // Validate hit and reduce enemy health
      socket.to(roomId).emit('enemy_damaged', data);
    });
  });
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Multiplayer Socket.io server running on port ${PORT}`);
});
