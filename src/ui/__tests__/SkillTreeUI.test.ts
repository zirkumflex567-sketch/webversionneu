import { describe, it, expect } from 'vitest';
import { CHARACTERS } from '../../data/CharacterData';

describe('SkillTreeUI', () => {
  it('should load all character skill trees', () => {
    Object.values(CHARACTERS).forEach(character => {
      expect(character.branches).toHaveLength(3);
      character.branches.forEach(branch => {
        expect(branch.nodes.length).toBeGreaterThanOrEqual(4);
        expect(branch.nodes[branch.nodes.length - 1].tier).toBe(4); // Capstone
      });
    });
  });

  it('should have valid tech costs for all nodes', () => {
    Object.values(CHARACTERS).forEach(character => {
      character.branches.forEach(branch => {
        branch.nodes.forEach(node => {
          expect(node.techCost).toBeGreaterThan(0);
          expect(node.techCost).toBeLessThanOrEqual(10);
          expect(node.tier).toBeGreaterThanOrEqual(1);
          expect(node.tier).toBeLessThanOrEqual(4);
        });
      });
    });
  });

  it('should have valid stat modifiers for all nodes', () => {
    const validStatKeys = [
      'damageBonus', 'fireRateMult', 'speedMult', 'scrapMult', 'techMult',
      'maxHealth', 'armor', 'critChance', 'critDamage', 'pickupRadius',
      'statusChance', 'controlDuration', 'lifesteal', 'droneCount', 'shieldOnPickup'
    ];

    Object.values(CHARACTERS).forEach(character => {
      character.branches.forEach(branch => {
        branch.nodes.forEach(node => {
          expect(validStatKeys).toContain(node.statKey);
          expect(node.valuePerRank).toBeGreaterThan(0);
          expect(node.maxRanks).toBeGreaterThan(0);
        });
      });
    });
  });

  it('should have tier 4 as capstone with single rank', () => {
    Object.values(CHARACTERS).forEach(character => {
      character.branches.forEach(branch => {
        const capstone = branch.nodes[branch.nodes.length - 1];
        expect(capstone.tier).toBe(4);
        expect(capstone.maxRanks).toBe(1);
        expect(capstone.name.includes('CAPSTONE')).toBe(true);
      });
    });
  });
});
