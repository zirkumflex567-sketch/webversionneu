import * as THREE from 'three'
import { Enemy } from './Enemy'
import { FXManager } from './FXManager'
import { Vehicle } from './Vehicle'

export class GlassShard extends Enemy {
  constructor(startPosition: THREE.Vector3) {
    super(startPosition, 'drone')
    this.hp = 30
    this.maxHp = 30
    this.speed = 18 // Very fast
    this.damage = 15
    this.group.scale.set(0.6, 0.6, 0.6) // Small and fast
  }

}

export class CrystalFiend extends Enemy {
  private reflectActive = false
  private reflectTimer = 0

  constructor(startPosition: THREE.Vector3) {
    super(startPosition, 'heavy')
    this.hp = 200
    this.maxHp = 200
    this.speed = 6
    this.damage = 25
    this.group.scale.set(1.2, 1.2, 1.2)
  }

  update(delta: number, target: Vehicle, allEnemies: Enemy[]): void {
    super.update(delta, target, allEnemies)
    
    this.reflectTimer -= delta
    if (this.reflectTimer <= 0) {
      this.reflectActive = !this.reflectActive
      this.reflectTimer = this.reflectActive ? 2.0 : 4.0
    }
  }

  takeDamage(amount: number): void {
    if (this.reflectActive) {
      // Mitigate damage
      super.takeDamage(amount * 0.3)
      FXManager.getInstance().spawnExplosion(this.position, 0xffffff, false)
    } else {
      super.takeDamage(amount)
    }
  }
}
