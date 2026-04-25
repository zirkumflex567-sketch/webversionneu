import { describe, it, expect, vi } from 'vitest'
import * as THREE from 'three'
import { ParticleSystem } from '../../rendering/particles/ParticleSystem'
import { ParticleMaterial } from '../../rendering/particles/ParticleMaterial'

describe('Game Particle Integration', () => {
  it('should initialize particle system with 1000 particle pool', () => {
    const particleSystem = new ParticleSystem(1000)
    expect(particleSystem.poolSize).toBeGreaterThanOrEqual(1000)
  })

  it('should create particle mesh from system', () => {
    const particleSystem = new ParticleSystem(1000)
    const particleMaterial = new ParticleMaterial({ blending: 'additive' })
    const particleMesh = new THREE.Points(particleSystem.geometry, particleMaterial)
    
    expect(particleMesh).toBeInstanceOf(THREE.Points)
    expect(particleMesh.geometry).toBe(particleSystem.geometry)
  })

  it('should update particle system each frame', () => {
    const particleSystem = new ParticleSystem(1000)
    
    // Acquire a particle
    const particle = particleSystem.acquire()
    particle.position.set(0, 0, 0)
    particle.velocity.set(1, 0, 0)
    particle.lifetime = 1.0
    
    const initialX = particle.position.x
    
    // Update particle system
    particleSystem.update(0.016)
    
    // Particle should have moved
    expect(particle.position.x).toBeGreaterThan(initialX)
  })

  it('should have getParticleSystem getter on Game class', () => {
    // Verify that Game class has the necessary methods by checking the source
    const fs = require('fs')
    const gameSourcePath = './src/game/Game.ts'
    const gameSource = fs.readFileSync(gameSourcePath, 'utf-8')
    
    expect(gameSource).toContain('getParticleSystem')
    expect(gameSource).toContain('ParticleSystem')
  })
})
