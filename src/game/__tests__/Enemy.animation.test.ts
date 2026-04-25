import { describe, it, expect, vi } from 'vitest'
import * as THREE from 'three'
import { Enemy } from '../Enemy'
import { AnimationManager } from '../../rendering/animation/AnimationManager'
import { ENEMY_ANIMATIONS } from '../../rendering/animation/AnimationClips'

// Mock AssetManager
vi.mock('../AssetManager', () => ({
  AssetManager: {
    getInstance: vi.fn(() => ({
      getEntitySprite: vi.fn(() => null),
      getEnemyModel: vi.fn(() => {
        throw new Error('No enemy model available')
      }),
      playSound: vi.fn(),
    })),
  },
}))

// Mock useGameStore
vi.mock('../../store', () => ({
  useGameStore: {
    getState: vi.fn(() => ({
      modifiers: { lifesteal: 0 },
      maxHealth: 100,
      health: 100,
      setMatchState: vi.fn(),
    })),
  },
}))

describe('Enemy Animation Integration', () => {
  describe('AnimationManager initialization', () => {
    it('should initialize AnimationManager for enemy body', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      expect(enemy.animationManager).toBeDefined()
    })
  })

  describe('playAttackAnimation', () => {
    it('should exist as a method', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      expect(typeof enemy.playAttackAnimation).toBe('function')
    })

    it('should trigger attack animation', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      expect(() => {
        enemy.playAttackAnimation()
      }).not.toThrow()
    })

    it('should accept optional callback', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)
      const callback = vi.fn()

      expect(() => {
        enemy.playAttackAnimation(callback)
      }).not.toThrow()
    })
  })

  describe('playDeathAnimation', () => {
    it('should exist as a method', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      expect(typeof enemy.playDeathAnimation).toBe('function')
    })

    it('should trigger death animation', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      expect(() => {
        enemy.playDeathAnimation()
      }).not.toThrow()
    })

    it('should accept optional callback for death completion', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)
      const callback = vi.fn()

      expect(() => {
        enemy.playDeathAnimation(callback)
      }).not.toThrow()
    })
  })

  describe('Animation update integration', () => {
    it('should update animator in Enemy.update()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      if (enemy.animationManager) {
        const updateSpy = vi.spyOn(enemy.animationManager, 'update')

        // Create a mock vehicle target
        const mockTarget = {
          position: new THREE.Vector3(0, 0, 1),
        } as any

        // Simulate game loop - call update with delta
        const allEnemies: Enemy[] = []
        enemy.update(0.016, mockTarget, allEnemies)

        // AnimationManager.update should be called with delta
        expect(updateSpy).toHaveBeenCalledWith(0.016)
      }
    })
  })

  describe('Enemy type support', () => {
    it('should work with drone enemies', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position, 'drone')

      expect(enemy.animationManager).toBeDefined()
    })

    it('should work with heavy enemies', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position, 'heavy')

      expect(enemy.animationManager).toBeDefined()
    })

    it('should work with golem enemies', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position, 'golem')

      expect(enemy.animationManager).toBeDefined()
    })

    it('should work with mireking enemies', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position, 'mireking')

      expect(enemy.animationManager).toBeDefined()
    })
  })
})
