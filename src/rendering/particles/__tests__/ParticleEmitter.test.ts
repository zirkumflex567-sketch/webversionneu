import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { ParticleEmitter } from '../ParticleEmitter'
import { ParticleSystem } from '../ParticleSystem'

describe('ParticleEmitter', () => {
  it('should create emitter with default config', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)
    expect(emitter).toBeDefined()
  })

  it('should configure emission rate', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)
    emitter.emissionRate = 50
    expect(emitter.emissionRate).toBe(50)
  })

  it('should configure particle lifetime', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)
    emitter.lifetime = 2.0
    expect(emitter.lifetime).toBe(2.0)
  })

  it('should emit particles over time', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)
    emitter.emissionRate = 100 // 100 particles per second

    emitter.update(0.01) // 10ms = 1 particle
    expect(system.availableCount).toBe(99)
  })

  it('should spawn particles at position', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    const position = new THREE.Vector3(5, 10, 15)
    emitter.position.copy(position)
    const particle = emitter.spawnParticle()

    expect(particle.position).toEqual(position)
  })

  it('should apply initial velocity to particles', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    emitter.initialVelocity = new THREE.Vector3(1, 2, 3)
    emitter.velocitySpread = 0 // No spread for precise test
    const particle = emitter.spawnParticle()

    expect(particle.velocity.x).toBe(1)
    expect(particle.velocity.y).toBe(2)
    expect(particle.velocity.z).toBe(3)
  })

  it('should apply gravity to particles', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    emitter.gravity = new THREE.Vector3(0, -9.8, 0)
    const particle = emitter.spawnParticle()

    expect(particle.velocity.y).toBeLessThan(0) // Gravity applied
  })

  it('should randomize particle velocity with spread', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    emitter.initialVelocity = new THREE.Vector3(0, 5, 0)
    emitter.velocitySpread = 1.0

    // Emit multiple particles and check they have different velocities
    const p1 = emitter.spawnParticle()
    const p2 = emitter.spawnParticle()

    expect(p1.velocity).not.toEqual(p2.velocity) // Should be different
  })

  it('should burst emit multiple particles', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    expect(system.availableCount).toBe(100)
    emitter.burst(25)
    expect(system.availableCount).toBe(75)
  })

  it('should support color tinting', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    emitter.color = new THREE.Color(0xff0000) // Red
    const particle = emitter.spawnParticle()

    expect(particle.color.r).toBe(1)
    expect(particle.color.g).toBe(0)
    expect(particle.color.b).toBe(0)
  })

  it('should support size configuration', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    emitter.size = 5
    const particle = emitter.spawnParticle()

    expect(particle.size).toBe(5)
  })

  it('should stop emitting when disabled', () => {
    const system = new ParticleSystem(100)
    const emitter = new ParticleEmitter(system)

    emitter.emissionRate = 100
    emitter.enabled = false

    const beforeCount = system.availableCount
    emitter.update(0.1)
    const afterCount = system.availableCount

    expect(beforeCount).toBe(afterCount) // No particles emitted
  })
})
