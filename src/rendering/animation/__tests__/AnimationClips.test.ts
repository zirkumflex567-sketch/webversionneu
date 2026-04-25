import { describe, it, expect } from 'vitest'
import {
  CHARACTER_ANIMATIONS,
  ENEMY_ANIMATIONS,
  VEHICLE_ANIMATIONS,
  ABILITY_ANIMATIONS,
  AnimationState,
} from '../AnimationClips'

describe('AnimationClips', () => {
  describe('CHARACTER_ANIMATIONS', () => {
    it('should define idle animation', () => {
      expect(CHARACTER_ANIMATIONS.IDLE).toBeDefined()
      expect(typeof CHARACTER_ANIMATIONS.IDLE).toBe('string')
    })

    it('should define walk animation', () => {
      expect(CHARACTER_ANIMATIONS.WALK).toBeDefined()
      expect(typeof CHARACTER_ANIMATIONS.WALK).toBe('string')
    })

    it('should define run animation', () => {
      expect(CHARACTER_ANIMATIONS.RUN).toBeDefined()
      expect(typeof CHARACTER_ANIMATIONS.RUN).toBe('string')
    })

    it('should define jump animation', () => {
      expect(CHARACTER_ANIMATIONS.JUMP).toBeDefined()
      expect(typeof CHARACTER_ANIMATIONS.JUMP).toBe('string')
    })

    it('should have valid animation names', () => {
      const names = Object.values(CHARACTER_ANIMATIONS)
      for (const name of names) {
        expect(name.length).toBeGreaterThan(0)
        expect(typeof name).toBe('string')
      }
    })
  })

  describe('ENEMY_ANIMATIONS', () => {
    it('should define idle animation', () => {
      expect(ENEMY_ANIMATIONS.IDLE).toBeDefined()
    })

    it('should define attack animation', () => {
      expect(ENEMY_ANIMATIONS.ATTACK).toBeDefined()
    })

    it('should define death animation', () => {
      expect(ENEMY_ANIMATIONS.DEATH).toBeDefined()
    })

    it('should have at least 3 animations', () => {
      const count = Object.keys(ENEMY_ANIMATIONS).length
      expect(count).toBeGreaterThanOrEqual(3)
    })
  })

  describe('VEHICLE_ANIMATIONS', () => {
    it('should define idle animation', () => {
      expect(VEHICLE_ANIMATIONS.IDLE).toBeDefined()
    })

    it('should define accelerate animation', () => {
      expect(VEHICLE_ANIMATIONS.ACCELERATE).toBeDefined()
    })

    it('should define damage animation', () => {
      expect(VEHICLE_ANIMATIONS.DAMAGE).toBeDefined()
    })

    it('should define destruction animation', () => {
      expect(VEHICLE_ANIMATIONS.DESTRUCTION).toBeDefined()
    })
  })

  describe('ABILITY_ANIMATIONS', () => {
    it('should define basic attack animation', () => {
      expect(ABILITY_ANIMATIONS.BASIC_ATTACK).toBeDefined()
    })

    it('should define technique animation', () => {
      expect(ABILITY_ANIMATIONS.TECHNIQUE).toBeDefined()
    })

    it('should define ultimate animation', () => {
      expect(ABILITY_ANIMATIONS.ULTIMATE).toBeDefined()
    })

    it('should define dodge animation', () => {
      expect(ABILITY_ANIMATIONS.DODGE).toBeDefined()
    })
  })

  describe('AnimationState interface', () => {
    it('should define animation state with name and priority', () => {
      const state: AnimationState = {
        name: 'attack',
        priority: 10,
        canInterrupt: false,
        duration: 1.5,
      }
      expect(state.name).toBe('attack')
      expect(state.priority).toBeGreaterThanOrEqual(0)
      expect(typeof state.canInterrupt).toBe('boolean')
      expect(typeof state.duration).toBe('number')
    })
  })
})
