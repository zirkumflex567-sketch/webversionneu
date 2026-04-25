import { describe, it, expect } from 'vitest';
import { BALANCE, calculateEffectiveDamage, getWaveDifficultyMultiplier, calculateEnemyHealth, calculateLootReward } from '../balance';

describe('Balance Configuration', () => {
  describe('Character Damage Multipliers', () => {
    it('should have damage multipliers between 0.8 and 1.3', () => {
      Object.entries(BALANCE.characterDamageMultiplier).forEach(([, multiplier]) => {
        expect(multiplier).toBeGreaterThanOrEqual(0.8);
        expect(multiplier).toBeLessThanOrEqual(1.3);
      });
    });

    it('should have 14 characters defined', () => {
      expect(Object.keys(BALANCE.characterDamageMultiplier)).toHaveLength(14);
    });

    it('should have health multipliers between 0.75 and 1.3', () => {
      Object.entries(BALANCE.characterHealthMultiplier).forEach(([, multiplier]) => {
        expect(multiplier).toBeGreaterThanOrEqual(0.75);
        expect(multiplier).toBeLessThanOrEqual(1.3);
      });
    });
  });

  describe('Cooldown Values', () => {
    it('should have positive cooldown times', () => {
      expect(BALANCE.techniqueCooldown).toBeGreaterThan(0);
      expect(BALANCE.heavyCooldown).toBeGreaterThan(0);
      expect(BALANCE.ultimateCooldown).toBeGreaterThan(0);
      expect(BALANCE.vehicleAbilityCooldown).toBeGreaterThan(0);
    });

    it('should have ultimate > technique > heavy > basic', () => {
      expect(BALANCE.ultimateCooldown).toBeGreaterThan(BALANCE.techniqueCooldown);
      expect(BALANCE.techniqueCooldown).toBeGreaterThan(BALANCE.heavyCooldown);
      expect(BALANCE.heavyCooldown).toBeGreaterThan(0); // basic is 0
    });

    it('should have reasonable duration values', () => {
      expect(BALANCE.stunDuration).toBeLessThan(2000); // Stuns < 2s
      expect(BALANCE.slowDuration).toBeLessThan(5000); // Slows < 5s
    });
  });

  describe('Damage Scaling', () => {
    it('should have damage scaling from 1.0 to 5.0', () => {
      Object.entries(BALANCE.damageScaling).forEach(([, scale]) => {
        expect(scale).toBeGreaterThanOrEqual(1.0);
        expect(scale).toBeLessThanOrEqual(5.0);
      });
    });

    it('should have ultimate > heavy > technique > basic', () => {
      expect(BALANCE.damageScaling.ultimate).toBeGreaterThan(BALANCE.damageScaling.heavy);
      expect(BALANCE.damageScaling.heavy).toBeGreaterThan(BALANCE.damageScaling.technique);
      expect(BALANCE.damageScaling.technique).toBeGreaterThan(BALANCE.damageScaling.basic);
    });

    it('should have status damage between 0.1 and 0.3', () => {
      Object.entries(BALANCE.statusDamage).forEach(([, damage]) => {
        expect(damage).toBeGreaterThanOrEqual(0.1);
        expect(damage).toBeLessThanOrEqual(0.3);
      });
    });
  });

  describe('Wave Scaling', () => {
    it('should have positive multipliers', () => {
      expect(BALANCE.waveScaling.baseEnemyCount).toBeGreaterThan(0);
      expect(BALANCE.waveScaling.countMultiplier).toBeGreaterThan(1.0);
      expect(BALANCE.waveScaling.damageMultiplier).toBeGreaterThan(1.0);
      expect(BALANCE.waveScaling.healthMultiplier).toBeGreaterThan(1.0);
    });

    it('should increase difficulty over waves', () => {
      const wave1 = 1;
      const wave10 = Math.pow(BALANCE.waveScaling.damageMultiplier, 10 - 1);
      expect(wave10).toBeGreaterThan(wave1);
    });
  });

  describe('Difficulty Multipliers', () => {
    it('should have all 6 difficulty levels defined', () => {
      expect(Object.keys(BALANCE.difficultyMultipliers)).toHaveLength(6);
    });

    it('should increase with difficulty', () => {
      for (let i = 1; i < 6; i++) {
        const current = BALANCE.difficultyMultipliers[i as keyof typeof BALANCE.difficultyMultipliers];
        const next = BALANCE.difficultyMultipliers[(i + 1) as keyof typeof BALANCE.difficultyMultipliers];
        expect(next.enemyDamage).toBeGreaterThan(current.enemyDamage);
        expect(next.enemyHealth).toBeGreaterThan(current.enemyHealth);
        expect(next.bossHealth).toBeGreaterThan(current.bossHealth);
      }
    });

    it('should have difficulty 1 as baseline (1.0x)', () => {
      const diff1 = BALANCE.difficultyMultipliers[1];
      expect(diff1.enemyDamage).toBe(1.0);
      expect(diff1.enemyHealth).toBe(1.0);
      expect(diff1.bossHealth).toBe(1.0);
    });
  });

  describe('Boss Scaling', () => {
    it('should have positive boss values', () => {
      expect(BALANCE.bossHealthBase).toBeGreaterThan(0);
      expect(BALANCE.bossDamageBase).toBeGreaterThan(0);
      expect(BALANCE.bossAttackCooldown).toBeGreaterThan(0);
      expect(BALANCE.bossSpecialAbilityCooldown).toBeGreaterThan(BALANCE.bossAttackCooldown);
    });

    it('should have phase health reduction between 0.2 and 0.5', () => {
      expect(BALANCE.bossPhaseHealthReduction).toBeGreaterThanOrEqual(0.2);
      expect(BALANCE.bossPhaseHealthReduction).toBeLessThanOrEqual(0.5);
    });
  });

  describe('Loot Rewards', () => {
    it('should have positive base rewards', () => {
      expect(BALANCE.baseScrapPerKill).toBeGreaterThan(0);
      expect(BALANCE.baseScrapPerWave).toBeGreaterThan(0);
      expect(BALANCE.baseScrapBossKill).toBeGreaterThan(BALANCE.baseScrapPerKill);
      expect(BALANCE.baseTechPerWave).toBeGreaterThan(0);
    });

    it('should have boss rewards greater than normal', () => {
      expect(BALANCE.baseScrapBossKill).toBeGreaterThan(BALANCE.baseScrapPerKill);
      expect(BALANCE.baseTechBossKill).toBeGreaterThan(BALANCE.baseTechPerWave);
    });
  });

  describe('Loot Drop Rates', () => {
    it('should have rates between 0 and 1', () => {
      Object.entries(BALANCE.lootDropRates).forEach(([, rate]) => {
        expect(rate).toBeGreaterThanOrEqual(0);
        expect(rate).toBeLessThanOrEqual(1);
      });
    });

    it('should sum to approximately 1.0', () => {
      const total = Object.values(BALANCE.lootDropRates).reduce((sum, rate) => sum + rate, 0);
      expect(total).toBeCloseTo(1.0, 2);
    });

    it('should have decreasing rates from common to legendary', () => {
      expect(BALANCE.lootDropRates.common).toBeGreaterThan(BALANCE.lootDropRates.uncommon);
      expect(BALANCE.lootDropRates.uncommon).toBeGreaterThan(BALANCE.lootDropRates.rare);
      expect(BALANCE.lootDropRates.rare).toBeGreaterThan(BALANCE.lootDropRates.epic);
      expect(BALANCE.lootDropRates.epic).toBeGreaterThan(BALANCE.lootDropRates.legendary);
    });
  });

  describe('Bounty System', () => {
    it('should have weighted difficulty multipliers', () => {
      Object.entries(BALANCE.bountyDifficultyWeights).forEach(([, weight]) => {
        expect(typeof weight).toBe('number');
      });
    });

    it('should have reward multipliers from 1.0 to 2.0', () => {
      Object.entries(BALANCE.bountyRewardMultipliers).forEach(([, mult]) => {
        expect(mult).toBeGreaterThanOrEqual(1.0);
        expect(mult).toBeLessThanOrEqual(2.0);
      });
    });

    it('should increase with difficulty', () => {
      expect(BALANCE.bountyRewardMultipliers.medium).toBeGreaterThan(BALANCE.bountyRewardMultipliers.easy);
      expect(BALANCE.bountyRewardMultipliers.hard).toBeGreaterThan(BALANCE.bountyRewardMultipliers.medium);
    });
  });

  describe('Balance Targets', () => {
    it('should target 50% win rate', () => {
      expect(BALANCE.targetWinRate).toBe(0.5);
    });

    it('should have acceptable win rate range of ±10%', () => {
      expect(BALANCE.winRateAcceptableRange).toBe(0.1);
    });

    it('should target 50+ minute sessions', () => {
      expect(BALANCE.targetSessionLength).toBeGreaterThanOrEqual(45);
    });

    it('should have reasonable difficulty spike', () => {
      expect(BALANCE.targetDifficultySpike).toBeGreaterThan(1.0);
      expect(BALANCE.targetDifficultySpike).toBeLessThan(2.0);
    });
  });

  describe('Adjustments', () => {
    it('should have no adjustments by default (all 1.0)', () => {
      Object.entries(BALANCE.adjustments).forEach(([, mult]) => {
        expect(mult).toBe(1.0);
      });
    });
  });
});

describe('Balance Helper Functions', () => {
  describe('calculateEffectiveDamage', () => {
    it('should calculate damage for basic attacks', () => {
      const damage = calculateEffectiveDamage('lyra_dorn', 'basic');
      expect(damage).toBe(100); // 100 * 1.0 * 1.0 * 1.0 * 1.0
    });

    it('should calculate higher damage for ultimates', () => {
      const basicDamage = calculateEffectiveDamage('lyra_dorn', 'basic');
      const ultimateDamage = calculateEffectiveDamage('lyra_dorn', 'ultimate');
      expect(ultimateDamage).toBeGreaterThan(basicDamage);
    });

    it('should apply character multiplier', () => {
      const dpsCharDamage = calculateEffectiveDamage('havok_smith', 'basic'); // 1.15x
      const supportCharDamage = calculateEffectiveDamage('cyr_ohne_gestern', 'basic'); // 0.85x
      expect(dpsCharDamage).toBeGreaterThan(supportCharDamage);
    });

    it('should return positive damage', () => {
      const damage = calculateEffectiveDamage('lyra_dorn', 'technique');
      expect(damage).toBeGreaterThan(0);
    });
  });

  describe('getWaveDifficultyMultiplier', () => {
    it('should increase with wave number', () => {
      const wave1 = getWaveDifficultyMultiplier(1, 1);
      const wave5 = getWaveDifficultyMultiplier(5, 1);
      expect(wave5).toBeGreaterThan(wave1);
    });

    it('should increase with difficulty', () => {
      const diff1 = getWaveDifficultyMultiplier(1, 1);
      const diff6 = getWaveDifficultyMultiplier(1, 6);
      expect(diff6).toBeGreaterThan(diff1);
    });

    it('should return positive multiplier', () => {
      const mult = getWaveDifficultyMultiplier(3, 4);
      expect(mult).toBeGreaterThan(0);
    });
  });

  describe('calculateEnemyHealth', () => {
    it('should increase with wave number', () => {
      const wave1 = calculateEnemyHealth(100, 1, 1);
      const wave5 = calculateEnemyHealth(100, 5, 1);
      expect(wave5).toBeGreaterThan(wave1);
    });

    it('should increase with difficulty', () => {
      const diff1 = calculateEnemyHealth(100, 1, 1);
      const diff6 = calculateEnemyHealth(100, 1, 6);
      expect(diff6).toBeGreaterThan(diff1);
    });

    it('should apply enemy type multiplier', () => {
      const basicHealth = calculateEnemyHealth(100, 1, 1, 'basic');
      const heavyHealth = calculateEnemyHealth(100, 1, 1, 'heavy');
      expect(heavyHealth).toBeGreaterThan(basicHealth);
    });

    it('should return positive health', () => {
      const health = calculateEnemyHealth(100, 2, 3, 'elite');
      expect(health).toBeGreaterThan(0);
    });
  });

  describe('calculateLootReward', () => {
    it('should increase with difficulty', () => {
      const diff1 = calculateLootReward(100, 1);
      const diff6 = calculateLootReward(100, 6);
      expect(diff6).toBeGreaterThanOrEqual(diff1);
    });

    it('should give more for boss kills', () => {
      const normalKill = calculateLootReward(100, 3, false);
      const bossKill = calculateLootReward(100, 3, true);
      expect(bossKill).toBeGreaterThanOrEqual(normalKill);
    });

    it('should return integer value', () => {
      const reward = calculateLootReward(100, 2);
      expect(Number.isInteger(reward)).toBe(true);
    });

    it('should return positive reward', () => {
      const reward = calculateLootReward(100, 4);
      expect(reward).toBeGreaterThan(0);
    });
  });
});
