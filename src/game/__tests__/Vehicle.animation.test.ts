import { describe, it, expect, vi } from 'vitest'
import * as THREE from 'three'
import { Vehicle } from '../Vehicle'
import { VEHICLE_ANIMATIONS, ABILITY_ANIMATIONS } from '../../rendering/animation/AnimationClips'

// Mock AssetManager
vi.mock('../AssetManager', () => ({
  AssetManager: {
    getInstance: vi.fn(() => ({
      getPlayerModel: vi.fn(() => null),
      getEntitySprite: vi.fn(() => null),
      getVehicleModel: vi.fn(() => new THREE.Group()),
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
      modifiers: { speedMult: 1 },
    })),
  },
}))

describe('Vehicle Animation Integration', () => {
  describe('AnimationManager initialization', () => {
    it('should initialize AnimationManager for vehicle body', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      // AnimationManager should be created if body supports animations
      expect(vehicle.animationManager).toBeDefined()
    })
  })

  describe('playAbilityAnimation', () => {
    it('should exist as a method', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      expect(typeof vehicle.playAbilityAnimation).toBe('function')
    })

    it('should accept ability animation name', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      expect(() => {
        vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.BASIC_ATTACK)
      }).not.toThrow()
    })

    it('should accept optional callback', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)
      const callback = vi.fn()

      expect(() => {
        vehicle.playAbilityAnimation(ABILITY_ANIMATIONS.DODGE, callback)
      }).not.toThrow()
    })
  })

  describe('Vehicle state animations', () => {
    it('should transition to accelerate animation', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      expect(() => {
        vehicle.playStateAnimation(VEHICLE_ANIMATIONS.ACCELERATE)
      }).not.toThrow()
    })

    it('should transition to damage animation', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      expect(() => {
        vehicle.playStateAnimation(VEHICLE_ANIMATIONS.DAMAGE)
      }).not.toThrow()
    })
  })

  describe('Animation update integration', () => {
    it('should update animator in Vehicle.update()', () => {
      const position = new THREE.Vector3(0, 0, 0)
      const vehicle = new Vehicle(position)

      // AnimationManager.update should be called with delta time
      if (vehicle.animationManager) {
        const updateSpy = vi.spyOn(vehicle.animationManager, 'update')

        // Simulate game loop
        const input = {
          isDown: () => false,
          wasNitroPressed: false
        } as any
        const openWorld = {
          checkCollision: vi.fn(() => false)
        } as any

        vehicle.update(0.016, input, openWorld)

        // AnimationManager.update should be called with delta
        expect(updateSpy).toHaveBeenCalledWith(0.016)
      }
    })
  })
})
