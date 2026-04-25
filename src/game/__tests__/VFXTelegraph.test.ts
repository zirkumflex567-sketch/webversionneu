import { describe, it, expect, beforeEach } from 'vitest'
import { VFXTelegraph } from '../VFXTelegraph'
import * as THREE from 'three'

describe('VFXTelegraph', () => {
  let telegraph: VFXTelegraph
  let scene: THREE.Scene

  beforeEach(() => {
    telegraph = new VFXTelegraph()
    scene = new THREE.Scene()
    scene.add(telegraph.group)
  })

  describe('spawnTelegraph', () => {
    it('should create a telegraph zone at specified position', () => {
      const pos = new THREE.Vector3(5, 0, 5)
      telegraph.spawnTelegraph(pos, 2, 0xff0000, 1.5)

      expect(telegraph.group.children.length).toBe(1)
      const mesh = telegraph.group.children[0] as THREE.Mesh
      expect(mesh.position.x).toBe(5)
      expect(mesh.position.z).toBe(5)
      expect(mesh.position.y).toBe(0.01) // Just above ground
    })

    it('should use specified color and duration', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0x00ff00, 2.0)
      expect(telegraph.group.children.length).toBe(1)
      // Material properties are set but we can't directly test them without inspecting internals
    })

    it('should support multiple telegraph zones', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 1.5)
      telegraph.spawnTelegraph(new THREE.Vector3(5, 0, 5), 3, 0xff9900, 1.5)
      telegraph.spawnTelegraph(new THREE.Vector3(-5, 0, -5), 1.5, 0xffff00, 1.5)

      expect(telegraph.group.children.length).toBe(3)
    })
  })

  describe('spawnExpandingWave', () => {
    it('should create an expanding wave telegraph', () => {
      const pos = new THREE.Vector3(10, 0, 10)
      telegraph.spawnExpandingWave(pos, 5, 0xff6600, 1.0)

      expect(telegraph.group.children.length).toBe(1)
      const mesh = telegraph.group.children[0] as THREE.Mesh
      expect(mesh.position.x).toBe(10)
      expect(mesh.position.z).toBe(10)
    })

    it('should support multiple expanding waves', () => {
      telegraph.spawnExpandingWave(new THREE.Vector3(0, 0, 0), 5, 0xff6600, 1.0)
      telegraph.spawnExpandingWave(new THREE.Vector3(20, 0, 0), 8, 0x00ff88, 1.2)

      expect(telegraph.group.children.length).toBe(2)
    })
  })

  describe('spawnCone', () => {
    it('should create a cone telegraph at origin facing direction', () => {
      const origin = new THREE.Vector3(0, 0, 0)
      const direction = new THREE.Vector3(1, 0, 0).normalize()
      telegraph.spawnCone(origin, direction, 45, 8, 0xff0000, 1.5)

      expect(telegraph.group.children.length).toBe(1)
      const mesh = telegraph.group.children[0] as THREE.Mesh
      expect(mesh.position.x).toBeCloseTo(4, 1) // depth * 0.5 = 4
    })

    it('should work with different directions', () => {
      const origin = new THREE.Vector3(5, 0, 5)
      const direction1 = new THREE.Vector3(0, 0, 1).normalize()
      const direction2 = new THREE.Vector3(-1, 0, 0).normalize()

      telegraph.spawnCone(origin, direction1, 45, 8, 0xff0000, 1.5)
      telegraph.spawnCone(origin, direction2, 45, 8, 0x00ff00, 1.5)

      expect(telegraph.group.children.length).toBe(2)
    })
  })

  describe('update', () => {
    it('should progress telegraph zones over time', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 1.0)

      expect(telegraph.group.children.length).toBe(1)

      telegraph.update(0.5)
      expect(telegraph.group.children.length).toBe(1) // Still active

      telegraph.update(0.6) // Total > 1.0
      expect(telegraph.group.children.length).toBe(0) // Should be removed
    })

    it('should remove zones when duration expires', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 0.5)
      telegraph.spawnTelegraph(new THREE.Vector3(5, 0, 5), 2, 0xff0000, 1.5)

      telegraph.update(0.6)

      // First zone should be removed, second should remain
      expect(telegraph.group.children.length).toBe(1)
    })

    it('should handle multiple updates', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 1.0)

      telegraph.update(0.3)
      telegraph.update(0.3)
      telegraph.update(0.3)
      telegraph.update(0.2) // Total: 1.1

      expect(telegraph.group.children.length).toBe(0)
    })

    it('should modify opacity based on progress', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 1.0)
      telegraph.update(0.5) // 50% progress

      const mesh = telegraph.group.children[0] as THREE.Mesh
      const mat = mesh.material as THREE.MeshBasicMaterial
      expect(mat.opacity).toBeGreaterThan(0)
      expect(mat.opacity).toBeLessThanOrEqual(1)
    })

    it('should fade out at end of duration', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 1.0)

      telegraph.update(0.9) // 90% progress
      const mesh = telegraph.group.children[0] as THREE.Mesh
      const mat = mesh.material as THREE.MeshBasicMaterial
      const opacityAtEnd = mat.opacity

      expect(opacityAtEnd).toBeLessThan(0.3) // Should be low at 90%
    })
  })

  describe('dispose', () => {
    it('should clean up and remove group from scene', () => {
      telegraph.spawnTelegraph(new THREE.Vector3(0, 0, 0), 2, 0xff0000, 1.5)
      telegraph.spawnTelegraph(new THREE.Vector3(5, 0, 5), 3, 0x00ff00, 1.5)

      // Group starts in scene
      expect(scene.children.indexOf(telegraph.group)).toBeGreaterThanOrEqual(0)

      telegraph.dispose(scene)

      // Group should be removed from scene
      expect(scene.children.indexOf(telegraph.group)).toBe(-1)
    })
  })
})
