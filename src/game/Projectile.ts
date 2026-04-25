import * as THREE from 'three'
import { Enemy } from './Enemy'
import { useGameStore } from '../store'
import { OpenWorldManager } from './OpenWorld'

export class Projectile {
  readonly group = new THREE.Group()
  private mesh: THREE.Mesh
  public isDead = false
  
  private velocity: THREE.Vector3
  private lifeTime = 2.0
  public damage = 15

  constructor(startPos: THREE.Vector3, direction: THREE.Vector3) {
    const geo = new THREE.CylinderGeometry(0.1, 0.1, 2.0, 8)
    geo.rotateX(Math.PI / 2) // point along Z
    
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffee })
    this.mesh = new THREE.Mesh(geo, mat)
    this.group.add(this.mesh)
    
    this.group.position.copy(startPos)
    this.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction.clone().normalize())
    
    this.velocity = direction.normalize().multiplyScalar(60) // Fast tracer
  }

  update(delta: number, enemies: Enemy[], openWorld: OpenWorldManager): void {
    // 1. Move
    this.group.position.addScaledVector(this.velocity, delta)

    // Check Open World Environment Collision (City Buildings)
    if (openWorld.checkCollision(this.group.position, 0.5)) {
        this.isDead = true;
        return;
    }

    // 2. Lifetime
    this.lifeTime -= delta
    if (this.lifeTime <= 0) {
      this.isDead = true
      return
    }

    // 3. Collision
    for (const enemy of enemies) {
      if (enemy.isDead()) continue
      
      const distSq = this.group.position.distanceToSquared(enemy.position)
      const rangeSq = (enemy.radius + 0.55) * (enemy.radius + 0.55)
      
      if (distSq < rangeSq) {
        enemy.takeDamage(this.damage)
        // Check for Burn Status
        const chance = useGameStore.getState().modifiers.statusChance
        if (chance > 0 && Math.random() < chance) {
          enemy.applyStatus("burn", 5, 3.0) // 5 dps for 3 seconds
        }
        this.isDead = true
        break
      }
    }
  }
}
