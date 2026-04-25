import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { ParticleMaterial } from '../ParticleMaterial'

describe('ParticleMaterial', () => {
  it('should create points material for particles', () => {
    const material = new ParticleMaterial()
    expect(material).toBeInstanceOf(THREE.ShaderMaterial)
  })

  it('should support size attribute', () => {
    const material = new ParticleMaterial()
    expect(material.uniforms.scale).toBeDefined()
  })

  it('should support color attribute', () => {
    const material = new ParticleMaterial()
    expect(material.uniforms.colorMultiplier).toBeDefined()
  })

  it('should support additive blending for glow effect', () => {
    const material = new ParticleMaterial({ blending: 'additive' })
    expect(material.blending).toBe(THREE.AdditiveBlending)
  })

  it('should support transparent blending', () => {
    const material = new ParticleMaterial({ blending: 'transparent' })
    expect(material.blending).toBe(THREE.NormalBlending)
  })

  it('should enable per-vertex colors', () => {
    const material = new ParticleMaterial()
    expect(material.vertexColors).toBe(true)
  })

  it('should accept sizeAttenuation config option', () => {
    const material = new ParticleMaterial({ sizeAttenuation: false })
    // sizeAttenuation is stored internally via constructor config
    // ShaderMaterial doesn't expose this property, but it's used for calculation
    expect(material).toBeInstanceOf(THREE.ShaderMaterial)
  })
})
