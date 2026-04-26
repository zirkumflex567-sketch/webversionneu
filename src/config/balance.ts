/**
 * H-Town Combat balance configuration
 * Centralized tuning for character damage, cooldowns, wave difficulty, boss scaling, and loot rates.
 * All values in milliseconds (time) or percentages (multipliers) unless noted.
 */

export const BALANCE = {
  // ==================== CHARACTER BASE STATS ====================
  // Base damage multiplier per character (1.0 = baseline 100 damage)
  characterDamageMultiplier: {
    lyra_dorn: 1.0,        // Balanced DPS
    mira_voss: 0.95,       // Utility-focused, slightly lower damage
    tarek_al_sahir: 1.05,  // High burst damage
    mara_esch: 0.9,        // Speed-focused, lower damage
    jorik_steelborn: 1.1,  // Tank with high damage output
    neris_vael: 1.0,       // Balanced
    cyr_ohne_gestern: 0.85, // Support/debuff, low direct damage
    havok_smith: 1.15,     // Damage dealer
    vex_neon: 0.95,        // Speed/evasion, moderate damage
    kess_vaultborn: 1.05,  // Ranged burst
    alina_chrome: 1.0,     // Balanced ranged
    redux_mark7: 1.2,      // Heavy hitter
    sorona_silverfang: 1.0, // Balanced hybrid
    zeno_vex: 0.9,         // Tech/debuff support
  } as const,

  // Base health multiplier per character (1.0 = baseline)
  characterHealthMultiplier: {
    lyra_dorn: 1.0,
    mira_voss: 0.95,
    tarek_al_sahir: 0.9,
    mara_esch: 0.85,
    jorik_steelborn: 1.2,
    neris_vael: 1.0,
    cyr_ohne_gestern: 1.1,
    havok_smith: 1.15,
    vex_neon: 0.8,
    kess_vaultborn: 0.95,
    alina_chrome: 0.9,
    redux_mark7: 1.25,
    sorona_silverfang: 1.0,
    zeno_vex: 1.05,
  } as const,

  // ==================== ABILITY COOLDOWN ADJUSTMENTS ====================
  // Base cooldown values (in ms) — used in skills.ts
  // Technique cooldowns (Q abilities)
  techniqueCooldown: 8000,    // 8 seconds

  // Heavy attack cooldowns (M2 abilities)
  heavyCooldown: 4000,        // 4 seconds

  // Ultimate cooldowns (R abilities)
  ultimateCooldown: 90000,    // 90 seconds (1.5 minutes)

  // Vehicle ability cooldown (Nitro Dash)
  vehicleAbilityCooldown: 8000, // 8 seconds, 2 charges

  // Stun/control effect durations (ms)
  stunDuration: 500,
  slowDuration: 2000,

  // ==================== DAMAGE SCALING ====================
  // Global damage multiplier (for balance tweaks across the board)
  globalDamageMultiplier: 1.0,

  // Damage per hit type (relative to base 100 damage)
  damageScaling: {
    basic: 1.0,           // Basic attacks: 100 damage
    technique: 1.5,       // Q abilities: 150 damage
    heavy: 2.0,           // M2 abilities: 200 damage
    ultimate: 5.0,        // R abilities: 500 damage
    vehicle: 1.8,         // Vehicle abilities: 180 damage
  } as const,

  // Status effect damage multipliers
  statusDamage: {
    mondbrand: 0.2,       // 20% of base damage per tick
    siegelriss: 0.15,     // 15% per tick (weaker status)
    schuldmarke: 0.25,    // 25% per tick (stronger status)
  } as const,

  // ==================== WAVE & DIFFICULTY ====================
  // Wave scaling multipliers (difficulty × enemy count × damage)
  waveScaling: {
    baseEnemyCount: 3,    // Start with 3 enemies
    countMultiplier: 1.2, // Increase count by 20% per wave
    damageMultiplier: 1.15, // Increase enemy damage by 15% per wave
    healthMultiplier: 1.25, // Increase enemy health by 25% per wave
  } as const,

  // Difficulty-specific multipliers (applied to all waves at this difficulty)
  difficultyMultipliers: {
    1: { enemyDamage: 1.0, enemyHealth: 1.0, bossHealth: 1.0, bossRewards: 1.0 },
    2: { enemyDamage: 1.15, enemyHealth: 1.2, bossHealth: 1.3, bossRewards: 1.3 },
    3: { enemyDamage: 1.35, enemyHealth: 1.5, bossHealth: 1.7, bossRewards: 1.6 },
    4: { enemyDamage: 1.6, enemyHealth: 2.0, bossHealth: 2.2, bossRewards: 2.0 },
    5: { enemyDamage: 1.9, enemyHealth: 2.6, bossHealth: 3.0, bossRewards: 2.5 },
    6: { enemyDamage: 2.3, enemyHealth: 3.3, bossHealth: 4.0, bossRewards: 3.2 },
  } as const,

  // Enemy type health/damage overrides
  enemyTypeMultipliers: {
    basic: { health: 1.0, damage: 1.0 },
    elite: { health: 1.8, damage: 1.5 },
    heavy: { health: 2.5, damage: 1.2 },
    minion: { health: 0.6, damage: 0.8 },
  } as const,

  // ==================== BOSS SCALING ====================
  // Boss health pools (base value, multiplied by difficultyMultipliers)
  bossHealthBase: 1000,
  bossPhaseHealthReduction: 0.33, // Each phase reduces health by 33%

  // Boss damage per attack
  bossDamageBase: 50,
  bossDamagePerPhase: 15, // Add 15 damage per phase

  // Boss attack patterns
  bossAttackCooldown: 3000, // Attack every 3 seconds
  bossSpecialAbilityCooldown: 15000, // Special ability every 15 seconds

  // ==================== LOOT & REWARDS ====================
  // Base scrap rewards
  baseScrapPerKill: 10,
  baseScrapPerWave: 25,
  baseScrapBossKill: 100,
  baseScrapExtraction: 50, // Bonus for successful extraction

  // Loot drop rates (percentage chance, 0-1)
  lootDropRates: {
    common: 0.5,     // 50% common (low value items)
    uncommon: 0.25,  // 25% uncommon
    rare: 0.15,      // 15% rare
    epic: 0.08,      // 8% epic
    legendary: 0.02, // 2% legendary
  } as const,

  // Tech point rewards
  baseTechPerWave: 5,
  baseTechBossKill: 20,
  baseTechExtraction: 10,

  // ==================== BOUNTY SYSTEM ====================
  // Bounty difficulty scoring
  bountyDifficultyWeights: {
    enemyMultiplier: 50,           // Weight for enemy damage/count increases
    incomingDamageMultiplier: 30,  // Weight for damage taken increases
    scrapBonus: -10,               // Negative weight (reduces difficulty)
    techBonus: -15,                // Negative weight for tech bonuses
  } as const,

  // Bounty reward scaling
  bountyRewardMultipliers: {
    easy: 1.0,     // Difficulty 1-2
    medium: 1.3,   // Difficulty 3-4
    hard: 1.6,     // Difficulty 5+
  } as const,

  // ==================== BALANCE TARGETS ====================
  // Win rate targets (percentage)
  targetWinRate: 0.5,       // 50% win rate
  winRateAcceptableRange: 0.1, // ±10% (40-60% acceptable)

  // Average session length (minutes)
  targetSessionLength: 50,   // 50 minutes average

  // Difficulty curve
  targetDifficultySpike: 1.5, // Boss should be 1.5x harder than last wave

  // ==================== BALANCING ADJUSTMENTS ====================
  // These are override multipliers that can be applied globally during testing
  // Set to 1.0 for no change
  adjustments: {
    damageGlobal: 1.0,      // Adjust all damage
    cooldownGlobal: 1.0,    // Adjust all cooldowns
    enemyHealthGlobal: 1.0, // Adjust all enemy health
    lootGlobal: 1.0,        // Adjust all loot rewards
  } as const,
} as const;

export type BalanceConfig = typeof BALANCE;

/**
 * Calculate effective damage for a character ability
 * @param characterId Character identifier
 * @param damageType Type of damage (basic, technique, heavy, ultimate, vehicle)
 * @returns Effective damage value
 */
export function calculateEffectiveDamage(
  characterId: string,
  damageType: keyof typeof BALANCE.damageScaling,
  baseDamage: number = 100
): number {
  const characterMult = BALANCE.characterDamageMultiplier[characterId as keyof typeof BALANCE.characterDamageMultiplier] || 1.0;
  const damageScaleMult = BALANCE.damageScaling[damageType];
  const globalMult = BALANCE.adjustments.damageGlobal;
  const globalDamageMult = BALANCE.globalDamageMultiplier;

  return baseDamage * characterMult * damageScaleMult * globalMult * globalDamageMult;
}

/**
 * Calculate wave-relative difficulty multiplier
 * @param wave Wave number (1-indexed)
 * @param difficulty Difficulty level (1-6)
 * @returns Multiplier for enemy stats at this wave
 */
export function getWaveDifficultyMultiplier(wave: number, difficulty: number): number {
  const diffMult = BALANCE.difficultyMultipliers[difficulty as keyof typeof BALANCE.difficultyMultipliers] || BALANCE.difficultyMultipliers[1];
  const waveCount = (BALANCE.waveScaling.baseEnemyCount * Math.pow(BALANCE.waveScaling.countMultiplier, wave - 1));
  const waveDamage = Math.pow(BALANCE.waveScaling.damageMultiplier, wave - 1);

  return (waveCount / BALANCE.waveScaling.baseEnemyCount) * waveDamage * diffMult.enemyDamage;
}

/**
 * Calculate effective enemy health at a difficulty/wave
 * @param baseHealth Enemy base health
 * @param wave Wave number
 * @param difficulty Difficulty level (1-6)
 * @param enemyType Enemy type (basic, elite, heavy, minion)
 * @returns Effective health value
 */
export function calculateEnemyHealth(
  baseHealth: number,
  wave: number,
  difficulty: number,
  enemyType: keyof typeof BALANCE.enemyTypeMultipliers = 'basic'
): number {
  const diffMult = BALANCE.difficultyMultipliers[difficulty as keyof typeof BALANCE.difficultyMultipliers] || BALANCE.difficultyMultipliers[1];
  const waveHealthScale = Math.pow(BALANCE.waveScaling.healthMultiplier, wave - 1);
  const typeMultiplier = BALANCE.enemyTypeMultipliers[enemyType].health;

  return baseHealth * diffMult.enemyHealth * waveHealthScale * typeMultiplier;
}

/**
 * Calculate loot rewards for a kill
 * @param baseScrap Base scrap value
 * @param difficulty Difficulty level (1-6)
 * @param isBoss Whether this is a boss kill
 * @returns Adjusted scrap amount
 */
export function calculateLootReward(
  baseScrap: number,
  difficulty: number,
  isBoss: boolean = false
): number {
  const diffMult = BALANCE.difficultyMultipliers[difficulty as keyof typeof BALANCE.difficultyMultipliers] || BALANCE.difficultyMultipliers[1];
  const lootMult = isBoss ? diffMult.bossRewards : 1.0;

  return Math.floor(baseScrap * lootMult * BALANCE.adjustments.lootGlobal);
}
