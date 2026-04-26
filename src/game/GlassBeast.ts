import * as THREE from 'three'
import { Boss } from './Boss'
import { Vehicle } from './Vehicle'
import { FXManager } from './FXManager'
import { Enemy } from './Enemy'
import { useGameStore } from '../store'
import { t } from '../i18n'

export class GlassBeast extends Boss {
  private shardTimer = 3.0
  private reflectTimer = 8.0
  private isReflecting = false
  
  constructor(startPosition: THREE.Vector3) {
    super(startPosition, 'golem') // Use golem as base for now
    this.hp = 2500
    this.maxHp = 2500
    this.speed = 9
    this.damage = 35
    this.group.scale.set(2, 2, 2)
  }

  update(delta: number, target: Vehicle, allEnemies: Enemy[]): void {
    super.update(delta, target, allEnemies)
    
    // Shard Attack
    this.shardTimer -= delta
    if (this.shardTimer <= 0) {
      this.launchShards()
      this.shardTimer = 4.0
    }

    // Reflect Mechanic
    this.reflectTimer -= delta
    if (this.reflectTimer <= 0) {
      this.toggleReflect()
      this.reflectTimer = 10.0
    }
  }

  private launchShards() {
    // FX: Crystal glow
    FXManager.getInstance().spawnExplosion(this.position, 0x00ffff, false)
    
    // In a real implementation, we would spawn actual shard projectiles here
    // For the prototype, we trigger a warning callout
    const locale = useGameStore.getState().locale
    useGameStore.getState().showCallout(t("callout.glassbeast.shard", undefined, locale), 2000, 'warning')
  }

  private toggleReflect() {
    this.isReflecting = !this.isReflecting
    if (this.isReflecting) {
      const locale = useGameStore.getState().locale
      useGameStore.getState().showCallout(t("callout.glassbeast.reflect", undefined, locale), 3000, 'boss')
      // Change color or add FX
      setTimeout(() => { this.isReflecting = false }, 3000)
    }
  }

  // Override takeDamage if we want to reflect
  takeDamage(amount: number): void {
    if (this.isReflecting) {
      // Reflect 50% damage back to player? 
      // For now, just mitigate it and show a pulse
      FXManager.getInstance().spawnExplosion(this.position, 0xffffff, false)
      super.takeDamage(amount * 0.2)
    } else {
      super.takeDamage(amount)
    }
  }
}
