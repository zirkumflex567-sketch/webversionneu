import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Enemy } from '../Enemy'
import { CelShadingMaterial } from '../../rendering/shaders/CelShadingMaterial'
import * as THREE from 'three'

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

describe('Enemy', () => {
  let enemy: Enemy
  const testPosition = new THREE.Vector3(0, 0, 0)

  beforeEach(() => {
    enemy = new Enemy(testPosition, 'drone')
  })

  describe('cel-shading', () => {
    it('should apply cel-shading to enemy mesh (fallback)', () => {
      // The body should be a fallback Group with cel-shading material
      expect(enemy.body).toBeDefined()
      expect(enemy.body).toBeInstanceOf(THREE.Group)
    })

    it('should apply cel-shading material to fallback enemy mesh', () => {
      // Check if the fallback mesh has CelShadingMaterial
      let hasCelMaterial = false
      if (enemy.body instanceof THREE.Group) {
        enemy.body.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
            if ((child as THREE.Mesh).material instanceof CelShadingMaterial) {
              hasCelMaterial = true
            }
          }
        })
      }
      expect(hasCelMaterial).toBe(true)
    })

    it('should use red color palette for standard enemies', () => {
      // Verify fallback uses red colors
      let baseColor: THREE.Color | undefined
      if (enemy.body instanceof THREE.Group) {
        enemy.body.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
            const mat = (child as THREE.Mesh).material as CelShadingMaterial
            if (mat.uniforms && mat.uniforms.baseColor) {
              baseColor = mat.uniforms.baseColor.value
            }
          }
        })
      }
      // Red palette is 0xff3333
      expect(baseColor).toBeDefined()
      expect(baseColor?.getHex()).toBe(0xff3333)
    })

    it('should use small outline width for enemies (0.015)', () => {
      // Verify outline width
      let outlineWidth: number | undefined
      if (enemy.body instanceof THREE.Group) {
        enemy.body.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
            const mat = (child as THREE.Mesh).material as CelShadingMaterial
            if (mat.uniforms && mat.uniforms.outlineWidth) {
              outlineWidth = mat.uniforms.outlineWidth.value
            }
          }
        })
      }
      expect(outlineWidth).toBe(0.015)
    })
  })

  describe('constructor', () => {
    it('should initialize with correct sprite type', () => {
      const droneEnemy = new Enemy(testPosition, 'drone')
      expect(droneEnemy.spriteType).toBe('drone')
    })

    it('should initialize with default drone type', () => {
      const defaultEnemy = new Enemy(testPosition)
      expect(defaultEnemy.spriteType).toBe('drone')
    })

    it('should position enemy at correct location', () => {
      const position = new THREE.Vector3(5, 0, 10)
      const testEnemy = new Enemy(position, 'drone')
      expect(testEnemy.position.x).toBeCloseTo(5, 5)
      expect(testEnemy.position.z).toBeCloseTo(10, 5)
    })

    it('should create fallback mesh when no sprite or model available', () => {
      expect(enemy.body).toBeInstanceOf(THREE.Group)
      expect(enemy.body.children.length).toBeGreaterThan(0)
    })
  })
})
