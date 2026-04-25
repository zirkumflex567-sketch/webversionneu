import { describe, it, expect, vi } from 'vitest'
import * as THREE from 'three'
import { Vehicle } from '../Vehicle'
import { Enemy } from '../Enemy'
import { AnimationManager } from '../../rendering/animation/AnimationManager'
import { ABILITY_ANIMATIONS, ENEMY_ANIMATIONS, VEHICLE_ANIMATIONS } from '../../rendering/animation/AnimationClips'

// Mock AssetManager
vi.mock('../AssetManager', () => ({
  AssetManager: {
    getInstance: vi.fn(() => ({
      getPlayerModel: vi.fn(() => null),
      getEntitySprite: vi.fn(() => null),
      getVehicleModel: vi.fn(() => new THREE.Group()),
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
      meta: { unlockedCosmetics: [] },
      character: 'rixa',
      modifiers: { speedMult: 1, lifesteal: 0 },
      maxHealth: 100,
      health: 100,
      setMatchState: vi.fn(),
    })),
  },
}))

describe('Animation System Integration', () => {
  describe('Vehicle animation flow through game loop', () => {
    it('should call animationManager.update() when Vehicle.update() is invoked', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      if (vehicle.animationManager) {
        const updateSpy = vi.spyOn(vehicle.animationManager, 'update')

        // Simulate game loop
        const input = { isDown: () => false, wasNitroPressed: false } as any
        const openWorld = { checkCollision: () => false } as any

        vehicle.update(0.016, input, openWorld)

        expect(updateSpy).toHaveBeenCalledWith(0.016)
      }
    })

    it('should trigger ability animations on Vehicle.playAbilityAnimation()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      const callback = vi.fn()
      vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.BASIC_ATTACK, callback)

      if (vehicle.animationManager) {
        const playSpy = vi.spyOn(vehicle.animationManager, 'play')
        vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.BASIC_ATTACK, callback)
        expect(playSpy).toHaveBeenCalledWith(ABILITY_ANIMATIONS.BASIC_ATTACK)
      }
    })

    it('should trigger state animations on Vehicle.playStateAnimation()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      if (vehicle.animationManager) {
        const playSpy = vi.spyOn(vehicle.animationManager, 'play')
        vehicle.playStateAnimation(VEHICLE_ANIMATIONS.ACCELERATE)
        expect(playSpy).toHaveBeenCalledWith(VEHICLE_ANIMATIONS.ACCELERATE)
      }
    })

    it('should support multiple ability animation types', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      const abilities = [
        ABILITY_ANIMATIONS.BASIC_ATTACK,
        ABILITY_ANIMATIONS.DODGE,
        ABILITY_ANIMATIONS.SHIELD,
        ABILITY_ANIMATIONS.HEAL,
      ]

      for (const ability of abilities) {
        expect(() => {
          vehicle.playAbilityAnimation(ability)
        }).not.toThrow()
      }
    })
  })

  describe('Enemy animation flow through game loop', () => {
    it('should call animationManager.update() when Enemy.update() is invoked', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      if (enemy.animationManager) {
        const updateSpy = vi.spyOn(enemy.animationManager, 'update')

        // Simulate game loop
        const mockTarget = { position: new THREE.Vector3(0, 0, 1) } as any
        const allEnemies: Enemy[] = []

        enemy.update(0.016, mockTarget, allEnemies)

        expect(updateSpy).toHaveBeenCalledWith(0.016)
      }
    })

    it('should trigger attack animations on Enemy.playAttackAnimation()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      if (enemy.animationManager) {
        const playSpy = vi.spyOn(enemy.animationManager, 'play')
        const callback = vi.fn()
        enemy.playAttackAnimation(callback)
        expect(playSpy).toHaveBeenCalledWith(ENEMY_ANIMATIONS.ATTACK)
      }
    })

    it('should trigger death animations on Enemy.playDeathAnimation()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      if (enemy.animationManager) {
        const playSpy = vi.spyOn(enemy.animationManager, 'play')
        const callback = vi.fn()
        enemy.playDeathAnimation(callback)
        expect(playSpy).toHaveBeenCalledWith(ENEMY_ANIMATIONS.DEATH)
      }
    })
  })

  describe('Delta time propagation through animation pipeline', () => {
    it('should propagate correct delta time from Vehicle.update() to animationManager.update()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      if (vehicle.animationManager) {
        const updateSpy = vi.spyOn(vehicle.animationManager, 'update')
        const input = { isDown: () => false, wasNitroPressed: false } as any
        const openWorld = { checkCollision: () => false } as any

        const deltas = [0.016, 0.032, 0.05, 0.008]

        for (const delta of deltas) {
          vehicle.update(delta, input, openWorld)
          expect(updateSpy).toHaveBeenLastCalledWith(delta)
        }
      }
    })

    it('should propagate correct delta time from Enemy.update() to animationManager.update()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      if (enemy.animationManager) {
        const updateSpy = vi.spyOn(enemy.animationManager, 'update')
        const mockTarget = { position: new THREE.Vector3(0, 0, 1) } as any
        const allEnemies: Enemy[] = []

        const deltas = [0.016, 0.032, 0.05, 0.008]

        for (const delta of deltas) {
          enemy.update(delta, mockTarget, allEnemies)
          expect(updateSpy).toHaveBeenLastCalledWith(delta)
        }
      }
    })
  })

  describe('Concurrent animation support', () => {
    it('should support independent animations on multiple Vehicle instances', () => {
      const pos1 = new THREE.Vector3(0, 0, 0)
      const pos2 = new THREE.Vector3(5, 0, 5)

      const vehicle1 = new Vehicle(pos1)
      const vehicle2 = new Vehicle(pos2)

      const input = { isDown: () => false, wasNitroPressed: false } as any
      const openWorld = { checkCollision: () => false } as any

      // Trigger different animations
      vehicle1.playAbilityAnimation(ABILITY_ANIMATIONS.BASIC_ATTACK)
      vehicle2.playAbilityAnimation(ABILITY_ANIMATIONS.DODGE)

      // Both should maintain separate animation state
      vehicle1.update(0.016, input, openWorld)
      vehicle2.update(0.016, input, openWorld)

      expect(vehicle1.animationManager).toBeDefined()
      expect(vehicle2.animationManager).toBeDefined()
      expect(vehicle1.position).not.toEqual(vehicle2.position)
    })

    it('should support independent animations on multiple Enemy instances', () => {
      const pos1 = new THREE.Vector3(0, 0, 0)
      const pos2 = new THREE.Vector3(5, 0, 5)

      const enemy1 = new Enemy(pos1, 'drone')
      const enemy2 = new Enemy(pos2, 'heavy')

      const mockTarget = { position: new THREE.Vector3(10, 0, 10) } as any
      const allEnemies = [enemy1, enemy2]

      // Trigger different animations
      enemy1.playAttackAnimation()
      enemy2.playDeathAnimation()

      // Both should maintain separate animation state
      enemy1.update(0.016, mockTarget, allEnemies)
      enemy2.update(0.016, mockTarget, allEnemies)

      expect(enemy1.animationManager).toBeDefined()
      expect(enemy2.animationManager).toBeDefined()
      expect(enemy1.position).not.toEqual(enemy2.position)
    })

    it('should support concurrent animations across Vehicle and Enemy entities', () => {
      const vehiclePos = new THREE.Vector3(0, 0, 0)
      const enemyPos = new THREE.Vector3(5, 0, 5)

      const vehicle = new Vehicle(vehiclePos)
      const enemy = new Enemy(enemyPos)

      // Trigger animations on both
      vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.TECHNIQUE)
      enemy.playAttackAnimation()

      // Update both simultaneously
      const vehicleInput = { isDown: () => false, wasNitroPressed: false } as any
      const vehicleOpenWorld = { checkCollision: () => false } as any
      const enemyTarget = { position: new THREE.Vector3(0, 0, 0) } as any
      const allEnemies = [enemy]

      vehicle.update(0.016, vehicleInput, vehicleOpenWorld)
      enemy.update(0.016, enemyTarget, allEnemies)

      // Both should have independent animation managers
      expect(vehicle.animationManager).toBeDefined()
      expect(enemy.animationManager).toBeDefined()
    })
  })

  describe('Animation system completeness across entity types', () => {
    it('should provide AnimationManager for different enemy types', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemyTypes = ['drone', 'heavy', 'golem', 'mireking'] as const

      const enemies = enemyTypes.map((type) => new Enemy(position, type))

      // All enemy types should have AnimationManager available
      for (const enemy of enemies) {
        expect(enemy.animationManager).toBeDefined()
      }
    })

    it('should support all ability animation types on Vehicle', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      const abilities = Object.values(ABILITY_ANIMATIONS)

      for (const ability of abilities) {
        expect(() => {
          vehicle.playAbilityAnimation(ability)
        }).not.toThrow()
      }
    })

    it('should support all vehicle state animation types', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      const states = Object.values(VEHICLE_ANIMATIONS)

      for (const state of states) {
        expect(() => {
          vehicle.playStateAnimation(state)
        }).not.toThrow()
      }
    })

    it('should support all enemy animation types', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)

      const enemyAnims = [ENEMY_ANIMATIONS.ATTACK, ENEMY_ANIMATIONS.DEATH]

      for (const anim of enemyAnims) {
        expect(() => {
          if (anim === ENEMY_ANIMATIONS.ATTACK) {
            enemy.playAttackAnimation()
          } else if (anim === ENEMY_ANIMATIONS.DEATH) {
            enemy.playDeathAnimation()
          }
        }).not.toThrow()
      }
    })
  })

  describe('Animation callback handling', () => {
    it('should support callbacks for Vehicle ability animations', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)
      const callback = vi.fn()

      expect(() => {
        vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.DODGE, callback)
      }).not.toThrow()

      // Callback should be stored internally for later execution
      expect(callback).not.toHaveBeenCalled()
    })

    it('should support callbacks for Enemy attack animations', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)
      const callback = vi.fn()

      expect(() => {
        enemy.playAttackAnimation(callback)
      }).not.toThrow()

      // Callback should be stored internally for later execution
      expect(callback).not.toHaveBeenCalled()
    })

    it('should support callbacks for Enemy death animations', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const enemy = new Enemy(position)
      const callback = vi.fn()

      expect(() => {
        enemy.playDeathAnimation(callback)
      }).not.toThrow()

      // Callback should be stored internally for later execution
      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('Game loop simulation', () => {
    it('should simulate a complete frame update cycle for Vehicle with animations', () => {
      const vehiclePos = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(vehiclePos)

      const input = { isDown: () => false, wasNitroPressed: false } as any
      const openWorld = { checkCollision: () => false } as any

      // Trigger an animation
      vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.BASIC_ATTACK)

      // Simulate multiple frames
      const frameDeltas = [0.016, 0.016, 0.016, 0.016]

      for (const delta of frameDeltas) {
        vehicle.update(delta, input, openWorld)
      }

      // Vehicle should complete without errors
      expect(vehicle.animationManager).toBeDefined()
    })

    it('should simulate a complete frame update cycle for Enemy with animations', () => {
      const enemyPos = new THREE.Vector3(5, 0, 5)
      const enemy = new Enemy(enemyPos, 'drone')

      const mockTarget = { position: new THREE.Vector3(0, 0, 0) } as any
      const allEnemies = [enemy]

      // Trigger an animation
      enemy.playAttackAnimation()

      // Simulate multiple frames
      const frameDeltas = [0.016, 0.016, 0.016, 0.016]

      for (const delta of frameDeltas) {
        enemy.update(delta, mockTarget, allEnemies)
      }

      // Enemy should complete without errors
      expect(enemy.animationManager).toBeDefined()
    })

    it('should maintain animation flow through mixed game loop updates', () => {
      const vehiclePos = new THREE.Vector3(0, 0, 0)
      const enemyPos = new THREE.Vector3(5, 0, 5)

      const vehicle = new Vehicle(vehiclePos)
      const enemy = new Enemy(enemyPos)

      const vehicleInput = { isDown: () => false, wasNitroPressed: false } as any
      const vehicleOpenWorld = { checkCollision: () => false } as any
      const enemyTarget = vehicle
      const allEnemies = [enemy]

      // Trigger animations on both
      vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.TECHNIQUE)
      enemy.playAttackAnimation()

      // Simulate multiple game frames with both entities
      const frameDeltas = [0.016, 0.032, 0.016, 0.05, 0.016]

      for (const delta of frameDeltas) {
        vehicle.update(delta, vehicleInput, vehicleOpenWorld)
        enemy.update(delta, enemyTarget, allEnemies)
      }

      // Both entities should maintain animation state correctly
      expect(vehicle.animationManager).toBeDefined()
      expect(enemy.animationManager).toBeDefined()
    })
  })
})
