/**
 * AudioManager — Centralized audio playback system
 * Supports SFX, UI sounds, boss themes, ambient audio, and 3D positional sound.
 */

export type SoundType = 'sfx' | 'ui' | 'music' | 'ambient' | 'voice';

export interface AudioConfig {
  volume: number;
  masterEnabled: boolean;
  sfxEnabled: boolean;
  musicEnabled: boolean;
  ambientEnabled: boolean;
}

export interface Sound {
  id: string;
  type: SoundType;
  path: string;
  duration?: number; // milliseconds
  loop?: boolean;
  volume?: number; // 0-1, defaults to 1
}

// Sound Library - Pre-defined sounds mapped to events
export const SOUND_LIBRARY: Record<string, Sound> = {
  // UI Sounds
  'ui_click': { id: 'ui_click', type: 'ui', path: '/audio/ui/click.mp3', volume: 0.6 },
  'ui_hover': { id: 'ui_hover', type: 'ui', path: '/audio/ui/hover.mp3', volume: 0.4 },
  'ui_error': { id: 'ui_error', type: 'ui', path: '/audio/ui/error.mp3', volume: 0.7 },
  'ui_success': { id: 'ui_success', type: 'ui', path: '/audio/ui/success.mp3', volume: 0.7 },

  // Skill/Unlock Sounds
  'skill_unlock': { id: 'skill_unlock', type: 'sfx', path: '/audio/sfx/skill_unlock.mp3', volume: 0.8 },
  'skill_upgrade': { id: 'skill_upgrade', type: 'sfx', path: '/audio/sfx/skill_upgrade.mp3', volume: 0.8 },

  // Combat Sounds
  'weapon_fire': { id: 'weapon_fire', type: 'sfx', path: '/audio/sfx/weapon_fire.mp3', volume: 0.9 },
  'weapon_hit': { id: 'weapon_hit', type: 'sfx', path: '/audio/sfx/weapon_hit.mp3', volume: 0.7 },
  'ability_cast': { id: 'ability_cast', type: 'sfx', path: '/audio/sfx/ability_cast.mp3', volume: 0.8 },
  'explosion': { id: 'explosion', type: 'sfx', path: '/audio/sfx/explosion.mp3', volume: 0.9 },
  'dash': { id: 'dash', type: 'sfx', path: '/audio/sfx/dash.mp3', volume: 0.7 },

  // Enemy Sounds
  'enemy_death': { id: 'enemy_death', type: 'sfx', path: '/audio/sfx/enemy_death.mp3', volume: 0.6 },
  'boss_spawn': { id: 'boss_spawn', type: 'sfx', path: '/audio/sfx/boss_spawn.mp3', volume: 0.9 },
  'enemy_alert': { id: 'enemy_alert', type: 'sfx', path: '/audio/sfx/enemy_alert.mp3', volume: 0.7 },

  // Loot Sounds
  'scrap_pickup': { id: 'scrap_pickup', type: 'sfx', path: '/audio/sfx/scrap_pickup.mp3', volume: 0.6 },
  'tech_pickup': { id: 'tech_pickup', type: 'sfx', path: '/audio/sfx/tech_pickup.mp3', volume: 0.7 },
  'loot_rarity_rare': { id: 'loot_rarity_rare', type: 'sfx', path: '/audio/sfx/loot_rare.mp3', volume: 0.8 },
  'loot_rarity_epic': { id: 'loot_rarity_epic', type: 'sfx', path: '/audio/sfx/loot_epic.mp3', volume: 0.9 },

  // Music & Ambient
  'music_hub': { id: 'music_hub', type: 'music', path: '/audio/music/hub_ambient.mp3', loop: true, volume: 0.5 },
  'music_boss_lyra': { id: 'music_boss_lyra', type: 'music', path: '/audio/music/boss_lyra.mp3', loop: true, volume: 0.6 },
  'music_boss_heavy': { id: 'music_boss_heavy', type: 'music', path: '/audio/music/boss_heavy.mp3', loop: true, volume: 0.6 },
  'ambient_swamp': { id: 'ambient_swamp', type: 'ambient', path: '/audio/ambient/swamp.mp3', loop: true, volume: 0.3 },
  'ambient_desert': { id: 'ambient_desert', type: 'ambient', path: '/audio/ambient/desert.mp3', loop: true, volume: 0.3 },
  'ambient_forest': { id: 'ambient_forest', type: 'ambient', path: '/audio/ambient/forest.mp3', loop: true, volume: 0.3 },

  // Wave Sounds
  'wave_start': { id: 'wave_start', type: 'sfx', path: '/audio/sfx/wave_start.mp3', volume: 0.8 },
  'wave_complete': { id: 'wave_complete', type: 'sfx', path: '/audio/sfx/wave_complete.mp3', volume: 0.8 },

  // Status Effects
  'status_mondbrand': { id: 'status_mondbrand', type: 'sfx', path: '/audio/sfx/status_mondbrand.mp3', volume: 0.6 },
  'status_poison': { id: 'status_poison', type: 'sfx', path: '/audio/sfx/status_poison.mp3', volume: 0.6 },
};

/**
 * AudioManager — Handles all audio playback
 * Placeholder implementation — actual audio playback would use Web Audio API
 */
export class AudioManager {
  private config: AudioConfig;
  private activeAudio: Map<string, HTMLAudioElement | null> = new Map();

  constructor(config: Partial<AudioConfig> = {}) {
    this.config = {
      volume: 1.0,
      masterEnabled: true,
      sfxEnabled: true,
      musicEnabled: true,
      ambientEnabled: true,
      ...config
    };
  }

  /**
   * Play a sound by ID
   */
  playSound(soundId: string, options?: { pitch?: number; volume?: number; position?: { x: number; y: number; z: number } }): void {
    const sound = SOUND_LIBRARY[soundId];
    if (!sound) {
      console.warn(`[AudioManager] Sound not found: ${soundId}`);
      return;
    }

    if (!this.shouldPlaySound(sound.type)) return;

    // Calculate final volume
    const finalVolume = this.calculateVolume(sound, options?.volume);

    // Placeholder: In real implementation, would use Web Audio API
    console.log(
      `[AUDIO] Playing: ${soundId} (${sound.type}) @ ${(finalVolume * 100).toFixed(0)}%${
        options?.position ? ` @ pos(${options.position.x}, ${options.position.y}, ${options.position.z})` : ''
      }${options?.pitch ? ` @ pitch ${options.pitch}` : ''}`
    );

    // In a real implementation:
    // const audio = new Audio(sound.path);
    // audio.volume = finalVolume;
    // if (sound.loop) audio.loop = true;
    // audio.play();
    // this.activeAudio.set(soundId, audio);
  }

  /**
   * Stop a sound
   */
  stopSound(soundId: string): void {
    const audio = this.activeAudio.get(soundId);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.activeAudio.delete(soundId);
    }
  }

  /**
   * Fade out a sound
   */
  fadeOut(soundId: string, duration: number = 1000): void {
    const audio = this.activeAudio.get(soundId);
    if (!audio) return;

    const steps = 50;
    const step = duration / steps;
    const volumeDecrement = audio.volume / steps;

    const interval = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - volumeDecrement);
      if (audio.volume <= 0) {
        clearInterval(interval);
        this.stopSound(soundId);
      }
    }, step);
  }

  /**
   * Set master volume (0-1)
   */
  setMasterVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Toggle audio enabled/disabled
   */
  setAudioEnabled(enabled: boolean): void {
    this.config.masterEnabled = enabled;
    if (!enabled) {
      this.stopAllSounds();
    }
  }

  /**
   * Stop all active sounds
   */
  stopAllSounds(): void {
    this.activeAudio.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    this.activeAudio.clear();
  }

  /**
   * Determine if a sound should play based on type and config
   */
  private shouldPlaySound(type: SoundType): boolean {
    if (!this.config.masterEnabled) return false;
    if (type === 'sfx' && !this.config.sfxEnabled) return false;
    if (type === 'music' && !this.config.musicEnabled) return false;
    if (type === 'ambient' && !this.config.ambientEnabled) return false;
    return true;
  }

  /**
   * Calculate final volume accounting for master, type, and individual settings
   */
  private calculateVolume(sound: Sound, customVolume?: number): number {
    const baseVolume = sound.volume ?? 1.0;
    const customVol = customVolume ?? 1.0;
    return this.config.volume * baseVolume * customVol;
  }

  /**
   * Get current config
   */
  getConfig(): AudioConfig {
    return { ...this.config };
  }
}

// Global audio manager singleton
let globalAudioManager: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (!globalAudioManager) {
    globalAudioManager = new AudioManager();
  }
  return globalAudioManager;
}

export function initAudioManager(config?: Partial<AudioConfig>): AudioManager {
  globalAudioManager = new AudioManager(config);
  return globalAudioManager;
}
