import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Lobby {
  id: string;
  name: string;
  players: { id: string; name: string }[];
  maxPlayers: number;
  host: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: number;
  room: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
}

interface MultiplayerState {
  socket: Socket | null;
  isConnected: boolean;
  lobbies: Lobby[];
  currentLobby: Lobby | null;
  chatHistory: ChatMessage[];
  leaderboard: LeaderboardEntry[];
  
  // Actions
  connect: () => void;
  createLobby: (name: string, playerName: string, maxPlayers?: number) => void;
  joinLobby: (lobbyId: string, playerName: string) => void;
  leaveLobby: () => void;
  sendChat: (message: string, playerName: string, room?: string) => void;
  refreshLobbies: () => void;
  refreshLeaderboard: () => void;
  refreshChat: () => void;
}

let socketInstance: Socket | null = null;

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  socket: null,
  isConnected: false,
  lobbies: [],
  currentLobby: null,
  chatHistory: [],
  leaderboard: [],

  connect: () => {
    if (socketInstance) return;

    const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const socketUrl = isProd ? 'https://h-town.duckdns.org' : 'http://127.0.0.1:3105';
    
    socketInstance = io(socketUrl, {
      path: isProd ? '/combat-socket/' : '/socket.io/',
      transports: ['websocket'],
    });

    set({ socket: socketInstance });

    socketInstance.on('connect', () => {
      set({ isConnected: true });
      socketInstance?.emit('get_lobbies');
      socketInstance?.emit('get_leaderboard');
      socketInstance?.emit('get_chat_history');
    });

    socketInstance.on('disconnect', () => {
      set({ isConnected: false });
    });

    socketInstance.on('lobbies_list', (data: Lobby[]) => {
      set({ lobbies: data });
    });

    socketInstance.on('lobby_joined', (data: Lobby) => {
      set({ currentLobby: data });
    });

    socketInstance.on('lobby_updated', (data: Lobby) => {
      if (get().currentLobby?.id === data.id) {
        set({ currentLobby: data });
      }
    });

    socketInstance.on('receive_chat', (data: ChatMessage) => {
      set(state => {
        const newHistory = [...state.chatHistory, data];
        if (newHistory.length > 50) newHistory.shift();
        return { chatHistory: newHistory };
      });
    });

    socketInstance.on('chat_history', (data: ChatMessage[]) => {
      set({ chatHistory: data });
    });

    socketInstance.on('leaderboard_data', (data: LeaderboardEntry[]) => {
      set({ leaderboard: data });
    });
  },

  createLobby: (name, playerName, maxPlayers = 4) => {
    socketInstance?.emit('create_lobby', { name, playerName, maxPlayers });
  },

  joinLobby: (lobbyId, playerName) => {
    socketInstance?.emit('join_lobby', { lobbyId, playerName });
  },

  leaveLobby: () => {
    // We could emit a leave event, or disconnect reconnect
    // For now we just null out locally and wait for disconnect logic
    set({ currentLobby: null });
  },

  sendChat: (message, playerName, room = 'global') => {
    socketInstance?.emit('send_chat', { message, playerName, room });
  },

  refreshLobbies: () => {
    socketInstance?.emit('get_lobbies');
  },

  refreshLeaderboard: () => {
    socketInstance?.emit('get_leaderboard');
  },

  refreshChat: () => {
    socketInstance?.emit('get_chat_history');
  }
}));

export const getSocket = () => socketInstance;
