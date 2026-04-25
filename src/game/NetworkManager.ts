import * as THREE from 'three';
import { Socket } from 'socket.io-client';
import { getSocket, useMultiplayerStore } from '../multiplayerStore';

export interface RemotePlayer {
  id: string;
  mesh?: THREE.Mesh;
  targetPosition: { x: number, y: number, z: number };
  targetRotation: { x: number, y: number, z: number, w: number };
}

export interface RemotePlayerData {
  id: string;
  position?: { x: number, y: number, z: number };
  rotation?: { x: number, y: number, z: number, w: number };
}

export class NetworkManager {
  private socket: Socket | null = null;
  public players = new Map<string, RemotePlayer>();
  private roomId: string | null = null;
  
  constructor() {
    this.roomId = new URLSearchParams(window.location.search).get('room') || 'default_room';
  }

  public connect() {
    // Ensure the multiplayer store has initiated the connection
    useMultiplayerStore.getState().connect();
    this.socket = getSocket();

    if (!this.socket) {
      console.warn('NetworkManager: Socket not initialized yet');
      return;
    }

    this.socket.on('connect', () => {
      console.log('Connected to multiplayer server');
      this.socket?.emit('join_room', this.roomId);
    });

    this.socket.on('player_joined', (data: { players: [string, RemotePlayerData][] }) => {
      console.log('Player joined', data);
      data.players.forEach(([id, player]: [string, RemotePlayerData]) => {
        if (id !== this.socket?.id && !this.players.has(id)) {
          this.spawnPlayer(id, player);
        }
      });
    });

    this.socket.on('player_left', (id) => {
      console.log('Player left', id);
      const p = this.players.get(id);
      if (p) {
        if (p.mesh && p.mesh.parent) {
          p.mesh.parent.remove(p.mesh);
        }
        this.players.delete(id);
      }
    });

    this.socket.on('player_moved', (data: RemotePlayerData) => {
      const p = this.players.get(data.id);
      if (p && p.mesh && data.position && data.rotation) {
        p.targetPosition = data.position;
        p.targetRotation = data.rotation;
      } else {
        // Spawn if they don't exist
        this.spawnPlayer(data.id, data);
      }
    });
  }

  private spawnPlayer(id: string, data: RemotePlayerData) {
    // Create a dummy box for the other player
    const geometry = new THREE.BoxGeometry(2, 2, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(data.position?.x || 0, data.position?.y || 0, data.position?.z || 0);
    mesh.castShadow = true;
    
    this.players.set(id, {
      id,
      mesh,
      targetPosition: data.position || {x:0, y:0, z:0},
      targetRotation: data.rotation || {x:0, y:0, z:0, w:1}
    });
    
    console.log("SPAWNED PLAYER", id);
    // Ideally we inject into the scene here
    const win = window as unknown as { __GAME_SCENE__?: THREE.Scene };
    if (win.__GAME_SCENE__) {
      win.__GAME_SCENE__.add(mesh);
    }
  }

  public sendUpdate(position: THREE.Vector3, quaternion: THREE.Quaternion) {
    if (!this.socket || !this.socket.connected) return;
    
    this.socket.emit('player_update', {
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w }
    });
  }

  public update(dt: number) {
    // Interpolate remote players
    this.players.forEach(p => {
      if (p.mesh && p.targetPosition) {
        p.mesh.position.lerp(new THREE.Vector3(p.targetPosition.x, p.targetPosition.y, p.targetPosition.z), dt * 10);
        const q = new THREE.Quaternion(p.targetRotation.x, p.targetRotation.y, p.targetRotation.z, p.targetRotation.w);
        p.mesh.quaternion.slerp(q, dt * 10);
      }
    });
  }
}
