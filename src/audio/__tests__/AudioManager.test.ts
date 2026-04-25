import { describe, it, expect, beforeEach } from 'vitest';
import { AudioManager, SOUND_LIBRARY, initAudioManager, getAudioManager } from '../AudioManager';

describe('AudioManager', () => {
  let manager: AudioManager;

  beforeEach(() => {
    manager = new AudioManager();
  });

  it('should initialize with default config', () => {
    const config = manager.getConfig();
    expect(config.masterEnabled).toBe(true);
    expect(config.sfxEnabled).toBe(true);
    expect(config.musicEnabled).toBe(true);
    expect(config.ambientEnabled).toBe(true);
    expect(config.volume).toBe(1.0);
  });

  it('should initialize with custom config', () => {
    const customManager = new AudioManager({
      volume: 0.5,
      masterEnabled: false,
      sfxEnabled: false,
    });
    const config = customManager.getConfig();
    expect(config.volume).toBe(0.5);
    expect(config.masterEnabled).toBe(false);
    expect(config.sfxEnabled).toBe(false);
  });

  it('should set master volume', () => {
    manager.setMasterVolume(0.7);
    expect(manager.getConfig().volume).toBe(0.7);
  });

  it('should clamp volume between 0 and 1', () => {
    manager.setMasterVolume(1.5);
    expect(manager.getConfig().volume).toBe(1.0);

    manager.setMasterVolume(-0.5);
    expect(manager.getConfig().volume).toBe(0.0);
  });

  it('should toggle audio enabled', () => {
    expect(manager.getConfig().masterEnabled).toBe(true);
    manager.setAudioEnabled(false);
    expect(manager.getConfig().masterEnabled).toBe(false);
  });

  it('should play sound without errors', () => {
    expect(() => manager.playSound('ui_click')).not.toThrow();
    expect(() => manager.playSound('skill_unlock')).not.toThrow();
    expect(() => manager.playSound('weapon_fire')).not.toThrow();
  });

  it('should warn on unknown sound ID', () => {
    const warnSpy = console.warn;
    let warned = false;
    console.warn = () => { warned = true; };

    manager.playSound('unknown_sound_id');

    console.warn = warnSpy;
    expect(warned).toBe(true);
  });

  it('should have all required sounds in library', () => {
    const requiredSounds = [
      'ui_click', 'ui_error', 'ui_success',
      'skill_unlock', 'skill_upgrade',
      'weapon_fire', 'weapon_hit', 'ability_cast',
      'explosion', 'dash',
      'enemy_death', 'boss_spawn',
      'scrap_pickup', 'tech_pickup',
      'loot_rarity_rare', 'loot_rarity_epic',
      'music_hub', 'ambient_swamp',
      'wave_start', 'wave_complete',
    ];

    requiredSounds.forEach(soundId => {
      expect(SOUND_LIBRARY[soundId]).toBeDefined();
    });
  });

  it('should initialize singleton correctly', () => {
    initAudioManager({ volume: 0.8 });
    const manager1 = getAudioManager();
    const manager2 = getAudioManager();

    expect(manager1).toBe(manager2);
    expect(manager1.getConfig().volume).toBe(0.8);
  });

  it('should validate sound library structure', () => {
    Object.entries(SOUND_LIBRARY).forEach(([id, sound]) => {
      expect(sound.id).toBe(id);
      expect(['sfx', 'ui', 'music', 'ambient', 'voice']).toContain(sound.type);
      expect(sound.path).toBeTruthy();
      if (sound.volume !== undefined) {
        expect(sound.volume).toBeGreaterThanOrEqual(0);
        expect(sound.volume).toBeLessThanOrEqual(1);
      }
    });
  });
});
