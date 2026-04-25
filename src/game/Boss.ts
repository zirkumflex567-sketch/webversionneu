import * as THREE from 'three'
import { Enemy } from './Enemy'
import { Vehicle } from './Vehicle'
import { AssetManager } from './AssetManager'
import { FXManager } from './FXManager'
import { SpriteEntity } from './SpriteEntity'

export class Boss extends Enemy {
  isBoss = true
  type: 'golem' | 'mireking'

  constructor(startPosition: THREE.Vector3, type: 'golem' | 'mireking' = 'golem') {
    super(startPosition, type === 'golem' ? 'golem' : 'mireking')
    this.type = type
    
    // Fallback if sprite logic didn't replace body in super()
    if (!(this.body instanceof SpriteEntity)) {
        this.group.remove(this.body)
        const bossModel = AssetManager.getInstance().getBossModel(type)
        this.body = bossModel
        this.group.add(this.body)
    }

    // 2. Boss specific scaling and stats
    this.hp = type === 'golem' ? 1500 : 1000
    this.maxHp = this.hp
    this.speed = type === 'golem' ? 7 : 12 
    this.damage = type === 'golem' ? 45 : 25
    this.radius = type === 'golem' ? 2.5 : 2.2 // Adjusted for larger sprite

    // Scale up the model/sprite root
    this.group.scale.set(1.5, 1.5, 1.5) 
  }

  private stompTimer = 4.0

  update(delta: number, target: Vehicle, allEnemies: Enemy[]): void {
    super.update(delta, target, allEnemies)
    
    // Unique Boss Behaviors
    this.stompTimer -= delta
    if (this.stompTimer <= 0) {
      if (this.type === 'golem') {
        this.executeGolemSmash(target)
      } else {
        this.executeMireScream(target)
      }
      this.stompTimer = 5.0 + Math.random() * 2
    }
  }

  private executeGolemSmash(target: Vehicle) {
     const dist = this.position.distanceTo(target.position)
     if (dist < 12) {
       // Massive screenshake and knockback
       const pushDir = target.position.clone().sub(this.position).normalize()
       target.group.position.addScaledVector(pushDir, 6.0)
       
       // FX: Ground impact
       FXManager.getInstance().spawnExplosion(this.position, 0xff8800, true)
     }
  }

  private executeMireScream(target: Vehicle) {
    const dist = this.position.distanceTo(target.position)
    if (dist < 15) {
       // Slow the target significantly
       target.speed *= 0.5
       
       // FX: Ghostly scream pulse
       FXManager.getInstance().spawnExplosion(this.position, 0xc9b7ff, true)
    }
  }
}
