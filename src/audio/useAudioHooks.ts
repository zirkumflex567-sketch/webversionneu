/**
 * useAudioHooks — Audio event hooks for game events
 * Integrates AudioManager with game state changes
 */

import { getAudioManager } from './AudioManager';

/**
 * UI Sound Hooks
 */
export const useAudioUIHooks = () => {
  const audio = getAudioManager();

  return {
    onButtonClick: () => audio.playSound('ui_click'),
    onButtonHover: () => audio.playSound('ui_hover'),
    onError: () => audio.playSound('ui_error'),
    onSuccess: () => audio.playSound('ui_success'),
  };
};

/**
 * Skill/Tech Hooks
 */
export const useAudioSkillHooks = () => {
  const audio = getAudioManager();

  return {
    onSkillUnlock: () => audio.playSound('skill_unlock'),
    onSkillUpgrade: () => audio.playSound('skill_upgrade'),
  };
};

/**
 * Combat Sound Hooks
 */
export const useAudioCombatHooks = () => {
  const audio = getAudioManager();

  return {
    onWeaponFire: () => audio.playSound('weapon_fire'),
    onWeaponHit: () => audio.playSound('weapon_hit'),
    onAbilityCast: () => audio.playSound('ability_cast'),
    onExplosion: () => audio.playSound('explosion'),
    onDash: () => audio.playSound('dash'),
  };
};

/**
 * Enemy Sound Hooks
 */
export const useAudioEnemyHooks = () => {
  const audio = getAudioManager();

  return {
    onEnemyDeath: () => audio.playSound('enemy_death'),
    onBossSpawn: () => audio.playSound('boss_spawn'),
    onEnemyAlert: () => audio.playSound('enemy_alert'),
  };
};

/**
 * Loot Sound Hooks
 */
export const useAudioLootHooks = () => {
  const audio = getAudioManager();

  return {
    onScrapPickup: () => audio.playSound('scrap_pickup'),
    onTechPickup: () => audio.playSound('tech_pickup'),
    onLootRare: () => audio.playSound('loot_rarity_rare'),
    onLootEpic: () => audio.playSound('loot_rarity_epic'),
  };
};

/**
 * Dialogue Sound Hooks
 */
export const useAudioDialogueHooks = () => {
  return {
    onDialogueStart: () => {
      // Fade in dialogue music or ambient
      console.log('[AUDIO] Dialogue started');
    },
    onDialogueEnd: () => {
      console.log('[AUDIO] Dialogue ended');
    },
  };
};

/**
 * Wave/Match Sound Hooks
 */
export const useAudioWaveHooks = () => {
  const audio = getAudioManager();

  return {
    onWaveStart: () => audio.playSound('wave_start'),
    onWaveComplete: () => audio.playSound('wave_complete'),
    onBossTheme: (bossId: string) => {
      // Map boss IDs to boss themes
      if (bossId.includes('lyra')) audio.playSound('music_boss_lyra');
      else if (bossId.includes('heavy')) audio.playSound('music_boss_heavy');
      else audio.playSound('music_boss_heavy'); // Default
    },
  };
};

/**
 * Ambient Sound Hooks
 */
export const useAudioAmbientHooks = () => {
  const audio = getAudioManager();

  return {
    setAmbience: (location: string) => {
      // Stop previous ambient
      audio.stopSound('ambient_swamp');
      audio.stopSound('ambient_desert');
      audio.stopSound('ambient_forest');

      // Play new ambient
      if (location.includes('swamp')) audio.playSound('ambient_swamp');
      else if (location.includes('desert')) audio.playSound('ambient_desert');
      else if (location.includes('forest')) audio.playSound('ambient_forest');
    },
    setHubMusic: () => {
      audio.stopSound('music_boss_lyra');
      audio.stopSound('music_boss_heavy');
      audio.playSound('music_hub');
    },
  };
};

/**
 * Status Effect Sound Hooks
 */
export const useAudioStatusHooks = () => {
  const audio = getAudioManager();

  return {
    onMondbrandApplied: () => audio.playSound('status_mondbrand'),
    onPoisonApplied: () => audio.playSound('status_poison'),
  };
};

/**
 * Unified Audio Hook
 * Provides all audio hooks in one place
 */
export const useAudioHooks = () => {
  return {
    ui: useAudioUIHooks(),
    skill: useAudioSkillHooks(),
    combat: useAudioCombatHooks(),
    enemy: useAudioEnemyHooks(),
    loot: useAudioLootHooks(),
    dialogue: useAudioDialogueHooks(),
    wave: useAudioWaveHooks(),
    ambient: useAudioAmbientHooks(),
    status: useAudioStatusHooks(),
  };
};

/**
 * Register audio hooks to global events
 * Call this during game initialization
 */
export function registerAudioHooks(): void {
  // Example: Hook into window/document events if needed
  console.log('[AudioManager] Hooks registered. Ready for audio playback.');

  // Could register to custom event emitters here
  // const hooks = useAudioHooks();
  // window.addEventListener('game:skillUnlock', hooks.skill.onSkillUnlock);
  // window.addEventListener('game:enemyDeath', hooks.enemy.onEnemyDeath);
  // etc.
}
