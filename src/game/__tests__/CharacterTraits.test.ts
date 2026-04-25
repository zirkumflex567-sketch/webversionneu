import { describe, it, expect, beforeEach } from 'vitest'
import { applyCharacterTraitDamage, getCharacterTraitMultiplier, getActiveStatusCount } from '../CharacterTraits'
import { Enemy } from '../Enemy'
import * as THREE from 'three'

describe('CharacterTraits', () => {
  let mockEnemies: Enemy[] = []
  const position = { x: 0, y: 0, z: 0 }

  beforeEach(() => {
    mockEnemies = []
  })

  describe('applyCharacterTraitDamage', () => {
    it('should return base damage when no enemies are present', () => {
      const damage = applyCharacterTraitDamage(100, 'marek', [], position)
      expect(damage).toBe(100)
    })

    it('should return base damage when character is null', () => {
      const damage = applyCharacterTraitDamage(100, null, [], position)
      expect(damage).toBe(100)
    })

    it('should return base damage when enemies list is empty', () => {
      const damage = applyCharacterTraitDamage(100, 'rixa', [], position)
      expect(damage).toBe(100)
    })

    it('should apply +3% damage per status effect on nearby enemies', () => {
      // Mock enemy with 5 active status effects at origin
      const enemy = {
        position: new THREE.Vector3(0, 0, 0),
        activeStatuses: [
          { type: 'burn', duration: 1 },
          { type: 'slow', duration: 2 },
          { type: 'stun', duration: 3 },
          { type: 'poison', duration: 1 },
          { type: 'chill', duration: 2 },
        ],
      } as Enemy

      mockEnemies.push(enemy)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // 5 statuses * 0.03 = 0.15 multiplier, so 100 * 1.15 = 115
      expect(damage).toBeCloseTo(115, 5)
    })

    it('should cap status count at 10 stacks', () => {
      const enemy = {
        position: new THREE.Vector3(0, 0, 0),
        activeStatuses: new Array(15).fill({ type: 'burn', duration: 1 }),
      } as Enemy

      mockEnemies.push(enemy)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // Max 10 statuses * 0.03 = 0.30 multiplier, so 100 * 1.30 = 130
      expect(damage).toBe(130)
    })

    it('should only count enemies within range', () => {
      const closeEnemy = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [{ type: 'burn', duration: 1 }],
      } as Enemy

      const farEnemy = {
        position: new THREE.Vector3(20, 0, 0),
        activeStatuses: [{ type: 'burn', duration: 1 }, { type: 'slow', duration: 1 }],
      } as Enemy

      mockEnemies.push(closeEnemy, farEnemy)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // Only closeEnemy counts (1 status), farEnemy is at 20m (outside 15m range)
      expect(damage).toBe(103)
    })

    it('should ignore enemies with no active statuses', () => {
      const statusEnemy = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [{ type: 'burn', duration: 1 }, { type: 'slow', duration: 1 }],
      } as Enemy

      const noStatusEnemy = {
        position: new THREE.Vector3(3, 0, 0),
        activeStatuses: [],
      } as Enemy

      mockEnemies.push(statusEnemy, noStatusEnemy)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // Only 2 statuses from statusEnemy, noStatusEnemy doesn't contribute
      expect(damage).toBe(106)
    })

    it('should handle 3D distance calculation correctly', () => {
      const enemy = {
        position: new THREE.Vector3(3, 5, 4), // sqrt(9 + 25 + 16) = sqrt(50) ≈ 7.07m
        activeStatuses: [{ type: 'burn', duration: 1 }],
      } as Enemy

      mockEnemies.push(enemy)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // Distance is 7.07, within range, so 1 status applies
      expect(damage).toBe(103)
    })

    it('should handle enemy exactly at range boundary', () => {
      const enemy = {
        position: new THREE.Vector3(15, 0, 0), // Exactly 15m away (on XZ plane)
        activeStatuses: [{ type: 'burn', duration: 1 }],
      } as Enemy

      mockEnemies.push(enemy)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // At boundary (distance = 15, range = 15), distance < range is false
      expect(damage).toBe(100)
    })

    it('should aggregate statuses from multiple enemies', () => {
      const enemy1 = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [
          { type: 'burn', duration: 1 },
          { type: 'slow', duration: 1 },
          { type: 'stun', duration: 1 },
        ],
      } as Enemy

      const enemy2 = {
        position: new THREE.Vector3(-5, 0, 0),
        activeStatuses: [
          { type: 'poison', duration: 1 },
          { type: 'chill', duration: 1 },
        ],
      } as Enemy

      mockEnemies.push(enemy1, enemy2)
      const damage = applyCharacterTraitDamage(100, 'rixa', mockEnemies, position, 15)

      // 3 + 2 = 5 total statuses, 100 * 1.15 = 115
      expect(damage).toBeCloseTo(115, 5)
    })
  })

  describe('getCharacterTraitMultiplier', () => {
    it('should return marek multiplier based on nearby enemies', () => {
      const enemy1 = { position: new THREE.Vector3(2, 0, 0), activeStatuses: [] } as Enemy
      const enemy2 = { position: new THREE.Vector3(4, 0, 0), activeStatuses: [] } as Enemy
      const mult = getCharacterTraitMultiplier('marek', [enemy1, enemy2], position)
      expect(mult).toBeCloseTo(1.03, 5)
    })

    it('should return 1.0 for empty enemies list', () => {
      const mult = getCharacterTraitMultiplier('rixa', [], position)
      expect(mult).toBe(1.0)
    })

    it('should return correct multiplier for status effects', () => {
      const enemy = {
        position: new THREE.Vector3(0, 0, 0),
        activeStatuses: [
          { type: 'burn', duration: 1 },
          { type: 'slow', duration: 1 },
          { type: 'stun', duration: 1 },
          { type: 'poison', duration: 1 },
        ],
      } as Enemy

      mockEnemies.push(enemy)
      const mult = getCharacterTraitMultiplier('rixa', mockEnemies, position, 15)

      // 4 statuses * 0.03 = 0.12, so 1.0 + 0.12 = 1.12
      expect(mult).toBeCloseTo(1.12, 5)
    })

    it('should respect range limit', () => {
      const closeEnemy = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [{ type: 'burn', duration: 1 }],
      } as Enemy

      const farEnemy = {
        position: new THREE.Vector3(25, 0, 0),
        activeStatuses: [{ type: 'slow', duration: 1 }],
      } as Enemy

      mockEnemies.push(closeEnemy, farEnemy)
      const mult = getCharacterTraitMultiplier('rixa', mockEnemies, position, 15)

      // Only closeEnemy in range: 1 status = 1.03
      expect(mult).toBeCloseTo(1.03, 5)
    })

    it('should cap at 10 stacks (1.3)', () => {
      const enemy = {
        position: new THREE.Vector3(0, 0, 0),
        activeStatuses: new Array(20).fill({ type: 'burn', duration: 1 }),
      } as Enemy

      mockEnemies.push(enemy)
      const mult = getCharacterTraitMultiplier('rixa', mockEnemies, position, 15)

      // Capped at 10: 1.0 + (10 * 0.03) = 1.3
      expect(mult).toBeCloseTo(1.3, 5)
    })
  })

  describe('getActiveStatusCount', () => {
    it('should return 0 for empty enemies list', () => {
      const count = getActiveStatusCount([], position)
      expect(count).toBe(0)
    })

    it('should count all active statuses', () => {
      const enemy1 = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [
          { type: 'burn', duration: 1 },
          { type: 'slow', duration: 1 },
          { type: 'stun', duration: 1 },
        ],
      } as Enemy

      const enemy2 = {
        position: new THREE.Vector3(-5, 0, 0),
        activeStatuses: [
          { type: 'poison', duration: 1 },
          { type: 'chill', duration: 1 },
        ],
      } as Enemy

      mockEnemies.push(enemy1, enemy2)
      const count = getActiveStatusCount(mockEnemies, position, 15)

      // 3 + 2 = 5
      expect(count).toBe(5)
    })

    it('should only count enemies within range', () => {
      const closeEnemy = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [
          { type: 'burn', duration: 1 },
          { type: 'slow', duration: 1 },
        ],
      } as Enemy

      const farEnemy = {
        position: new THREE.Vector3(20, 0, 0),
        activeStatuses: [
          { type: 'stun', duration: 1 },
          { type: 'poison', duration: 1 },
          { type: 'chill', duration: 1 },
        ],
      } as Enemy

      mockEnemies.push(closeEnemy, farEnemy)
      const count = getActiveStatusCount(mockEnemies, position, 15)

      // Only closeEnemy counts: 2
      expect(count).toBe(2)
    })

    it('should ignore enemies with no active statuses', () => {
      const statusEnemy = {
        position: new THREE.Vector3(5, 0, 0),
        activeStatuses: [{ type: 'burn', duration: 1 }],
      } as Enemy

      const noStatusEnemy = {
        position: new THREE.Vector3(3, 0, 0),
        activeStatuses: [],
      } as Enemy

      mockEnemies.push(statusEnemy, noStatusEnemy)
      const count = getActiveStatusCount(mockEnemies, position, 15)

      // Only statusEnemy counts: 1
      expect(count).toBe(1)
    })
  })
})
