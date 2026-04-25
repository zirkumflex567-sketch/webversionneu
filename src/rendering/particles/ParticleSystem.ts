import * as THREE from 'three'

export interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: THREE.Color
  size: number
  lifetime: number
  age: number
  alive: boolean
}

export class ParticleSystem {
  private pool: Particle[] = []
  private active: Set<Particle> = new Set()
  private _geometry: THREE.BufferGeometry
  private positionAttribute: THREE.BufferAttribute
  private colorAttribute: THREE.BufferAttribute
  private sizeAttribute: THREE.BufferAttribute

  constructor(poolSize: number) {
    this._geometry = new THREE.BufferGeometry()

    // Pre-allocate buffers for max particles
    const positions = new Float32Array(poolSize * 3)
    const colors = new Float32Array(poolSize * 3)
    const sizes = new Float32Array(poolSize)

    this.positionAttribute = new THREE.BufferAttribute(positions, 3)
    this.colorAttribute = new THREE.BufferAttribute(colors, 3)
    this.sizeAttribute = new THREE.BufferAttribute(sizes, 1)

    this._geometry.setAttribute('position', this.positionAttribute)
    this._geometry.setAttribute('color', this.colorAttribute)
    this._geometry.setAttribute('size', this.sizeAttribute)

    // Create particle pool
    for (let i = 0; i < poolSize; i++) {
      this.pool.push({
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        color: new THREE.Color(0xffffff),
        size: 1,
        lifetime: 1,
        age: 0,
        alive: false,
      })
    }
  }

  get poolSize(): number {
    return this.pool.length + this.active.size
  }

  get availableCount(): number {
    return this.pool.length
  }

  acquire(): Particle {
    let particle = this.pool.pop()
    if (!particle) {
      // Pool exhausted, create new particle (graceful overflow)
      particle = {
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        color: new THREE.Color(0xffffff),
        size: 1,
        lifetime: 1,
        age: 0,
        alive: false,
      }
    }

    // Reset particle state to defaults
    particle.position.set(0, 0, 0)
    particle.velocity.set(0, 0, 0)
    particle.color.setHex(0xffffff)
    particle.size = 1
    particle.lifetime = 1
    particle.alive = true
    particle.age = 0

    this.active.add(particle)
    return particle
  }

  release(particle: Particle): void {
    particle.alive = false
    this.active.delete(particle)
    this.pool.push(particle)
  }

  update(delta: number): void {
    const toRemove: Particle[] = []

    // Update active particles
    for (const p of this.active) {
      p.age += delta

      // Check if particle exceeded lifetime
      if (p.age >= p.lifetime) {
        toRemove.push(p)
      } else {
        // Update position with velocity
        p.position.addScaledVector(p.velocity, delta)

        // Update geometry - note: this is inefficient and will be addressed in next iteration
        // For now, we're deferring geometry updates to avoid O(n²) behavior
      }
    }

    // Release dead particles
    for (const p of toRemove) {
      this.release(p)
    }

    // Update all alive particle geometry in single pass
    let index = 0
    for (const p of this.active) {
      if (index < (this.positionAttribute.array as Float32Array).length / 3) {
        this.updateParticleInGeometry(index, p)
        index++
      }
    }

    // Update geometry attributes
    this.positionAttribute.needsUpdate = true
    this.colorAttribute.needsUpdate = true
    this.sizeAttribute.needsUpdate = true
  }

  private updateParticleInGeometry(index: number, particle: Particle): void {
    const pos = this.positionAttribute.array as Float32Array
    const col = this.colorAttribute.array as Float32Array
    const sizes = this.sizeAttribute.array as Float32Array

    pos[index * 3] = particle.position.x
    pos[index * 3 + 1] = particle.position.y
    pos[index * 3 + 2] = particle.position.z

    col[index * 3] = particle.color.r
    col[index * 3 + 1] = particle.color.g
    col[index * 3 + 2] = particle.color.b

    sizes[index] = particle.size
  }

  get geometry(): THREE.BufferGeometry {
    return this._geometry
  }

  dispose(): void {
    this._geometry.dispose()
    this.active.clear()
    this.pool = []
  }
}
