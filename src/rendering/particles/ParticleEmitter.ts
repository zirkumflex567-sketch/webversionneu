import * as THREE from 'three'
import { ParticleSystem } from './ParticleSystem'

export class ParticleEmitter {
  position = new THREE.Vector3()
  initialVelocity = new THREE.Vector3(0, 1, 0)
  velocitySpread = 0.5
  gravity = new THREE.Vector3(0, 0, 0)
  color = new THREE.Color(0xffffff)
  size = 1
  lifetime = 1.0
  emissionRate = 10 // particles per second
  enabled = true

  private system: ParticleSystem
  private emissionAccum = 0

  constructor(system: ParticleSystem) {
    this.system = system
  }

  update(delta: number): void {
    if (!this.enabled) return

    // Accumulate emission time
    this.emissionAccum += delta
    const particlesToEmit = Math.floor(this.emissionAccum * this.emissionRate)
    this.emissionAccum -= particlesToEmit / this.emissionRate

    // Emit particles
    for (let i = 0; i < particlesToEmit; i++) {
      this.spawnParticle()
    }
  }

  spawnParticle() {
    const particle = this.system.acquire()

    // Set position
    particle.position.copy(this.position)

    // Set lifetime
    particle.lifetime = this.lifetime

    // Set color
    particle.color.copy(this.color)

    // Set size
    particle.size = this.size

    // Set velocity with spread
    particle.velocity.copy(this.initialVelocity)
    particle.velocity.x += (Math.random() - 0.5) * this.velocitySpread
    particle.velocity.y += (Math.random() - 0.5) * this.velocitySpread
    particle.velocity.z += (Math.random() - 0.5) * this.velocitySpread

    // Apply gravity each frame (will be integrated in system update)
    particle.velocity.add(this.gravity)

    return particle
  }

  burst(count: number): void {
    for (let i = 0; i < count; i++) {
      this.spawnParticle()
    }
  }

  dispose(): void {
    // No resources to clean up
  }
}
