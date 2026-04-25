import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { ParticleLOD } from '../ParticleLOD'

describe('ParticleLOD', () => {
  it('should create LOD with default levels', () => {
    const lod = new ParticleLOD()
    expect(lod).toBeDefined()
  })

  it('should determine LOD level based on distance', () => {
    const lod = new ParticleLOD()
    const nearLevel = lod.getLODLevel(5) // Close to camera
    const farLevel = lod.getLODLevel(100) // Far from camera
    expect(farLevel).toBeGreaterThan(nearLevel)
  })

  it('should return quality multiplier for LOD level', () => {
    const lod = new ParticleLOD()
    const level0 = lod.getQualityMultiplier(0) // High quality
    const level2 = lod.getQualityMultiplier(2) // Low quality
    expect(level0).toBeGreaterThan(level2)
  })

  it('should determine if particle should be culled at distance', () => {
    const lod = new ParticleLOD()
    const shouldRender = lod.shouldRender(new THREE.Vector3(0, 0, 50))
    expect(shouldRender).toBe(true)
  })

  it('should cull distant particles in stress mode', () => {
    const lod = new ParticleLOD({ stressMode: true })
    const shouldRender = lod.shouldRender(new THREE.Vector3(0, 0, 200))
    expect(shouldRender).toBe(false) // Distant particles culled in stress
  })
})
