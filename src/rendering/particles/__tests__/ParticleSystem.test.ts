import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { ParticleSystem } from '../ParticleSystem'

describe('ParticleSystem', () => {
  it('should create particle pool of specified size', () => {
    const system = new ParticleSystem(100)
    expect(system.poolSize).toBe(100)
  })

  it('should return available particle count', () => {
    const system = new ParticleSystem(50)
    expect(system.availableCount).toBe(50)
  })

  it('should acquire particle from pool', () => {
    const system = new ParticleSystem(10)
    const particle = system.acquire()
    expect(particle).toBeDefined()
    expect(particle.alive).toBe(true)
  })

  it('should reduce available count when particle acquired', () => {
    const system = new ParticleSystem(10)
    expect(system.availableCount).toBe(10)
    system.acquire()
    expect(system.availableCount).toBe(9)
  })

  it('should release particle back to pool', () => {
    const system = new ParticleSystem(10)
    const particle = system.acquire()
    expect(system.availableCount).toBe(9)
    system.release(particle)
    expect(system.availableCount).toBe(10)
  })

  it('should update alive particles with delta time', () => {
    const system = new ParticleSystem(5)
    const particle = system.acquire()
    particle.lifetime = 1.0
    system.update(0.5)
    expect(particle.age).toBe(0.5)
  })

  it('should auto-release dead particles', () => {
    const system = new ParticleSystem(5)
    const particle = system.acquire()
    particle.lifetime = 0.5
    system.update(0.6) // Exceed lifetime
    expect(system.availableCount).toBe(5) // Particle recycled
  })

  it('should provide Three.js geometry for rendering', () => {
    const system = new ParticleSystem(20)
    const geometry = system.geometry
    expect(geometry).toBeInstanceOf(THREE.BufferGeometry)
  })

  it('should track particle positions in geometry', () => {
    const system = new ParticleSystem(10)
    const particle = system.acquire()
    particle.position.set(1, 2, 3)
    system.update(0)

    const positions = system.geometry.getAttribute('position').array as Float32Array
    expect(positions[0]).toBe(1) // x
    expect(positions[1]).toBe(2) // y
    expect(positions[2]).toBe(3) // z
  })

  it('should reset particle state on reacquire after release', () => {
    const system = new ParticleSystem(10)

    // Acquire and set custom state
    const particle = system.acquire()
    particle.position.set(5, 10, 15)
    particle.velocity.set(1, 2, 3)
    particle.color.setHex(0xff0000)
    particle.size = 5
    particle.lifetime = 2.0

    // Release it
    system.release(particle)

    // Acquire another particle (could be same instance from pool)
    const particle2 = system.acquire()

    // Should have clean state
    expect(particle2.position.x).toBe(0)
    expect(particle2.position.y).toBe(0)
    expect(particle2.position.z).toBe(0)
    expect(particle2.velocity.x).toBe(0)
    expect(particle2.velocity.y).toBe(0)
    expect(particle2.velocity.z).toBe(0)
    expect(particle2.color.getHex()).toBe(0xffffff)
    expect(particle2.size).toBe(1)
    expect(particle2.lifetime).toBe(1)
  })
})
