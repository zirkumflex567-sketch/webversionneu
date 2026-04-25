import * as THREE from 'three'
import { Enemy } from './Enemy'
import { Vehicle } from './Vehicle'
import { SpriteEntity } from './SpriteEntity'

export class NightmareEnemy extends Enemy {
  private phaseTimer: number = 0
  private isPhasing: boolean = false
  private pulseTimer: number = 0
  private readonly PULSE_COOLDOWN = 5.0
  private readonly PHASE_COOLDOWN = 8.0
  private readonly PHASE_DURATION = 2.0

  private setBodyOpacity(opacity: number): void {
    if (this.body instanceof SpriteEntity) {
      const material = this.body.mesh.material
      if (Array.isArray(material)) {
        for (const m of material) {
          if ('opacity' in m) {
            m.opacity = opacity
            m.transparent = opacity < 1.0
          }
        }
      } else if ('opacity' in material) {
        material.opacity = opacity
        material.transparent = opacity < 1.0
      }
      return
    }

    this.body.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const material = mesh.material
        if (Array.isArray(material)) {
          for (const m of material) {
            if ('opacity' in m) {
              m.opacity = opacity
              m.transparent = opacity < 1.0
            }
          }
        } else if ('opacity' in material) {
          material.opacity = opacity
          material.transparent = opacity < 1.0
        }
      }
    })
  }

  constructor(startPosition: THREE.Vector3, type: 'drone' | 'heavy' = 'drone') {
    super(startPosition, type)
    this.speed = 10 // Faster than normal enemies
    this.hp = 50
    this.maxHp = 50
    this.damage = 6
    this.scrapValue = 25

    // Apply "Nightmare" look (Purple/Dark)
    this.applyNightmareLook()
  }

  private applyNightmareLook() {
    const nightmareColor = 0x8800ff
    if (this.body instanceof SpriteEntity) {
      // We can't easily change sprite texture color without shaders, 
      // but we can set a constant flash or emissive if the shader supports it.
      this.body.setFlash(1.0, nightmareColor)
    } else {
      this.body.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          if (mat) {
            mat.color.setHex(0x220033)
            if (mat.emissive) {
              mat.emissive.setHex(nightmareColor)
              mat.emissiveIntensity = 2.0
            }
          }
        }
      })
    }
  }

  takeDamage(amount: number): void {
    if (this.isPhasing) return // Invulnerable while phasing
    super.takeDamage(amount)
  }

  update(delta: number, target: Vehicle, allEnemies: Enemy[]): void {
    // 1. Phasing Logic
    this.phaseTimer += delta
    if (!this.isPhasing && this.phaseTimer >= this.PHASE_COOLDOWN) {
      this.startPhasing()
    } else if (this.isPhasing && this.phaseTimer >= this.PHASE_DURATION) {
      this.stopPhasing()
    }

    // 2. Pulse Logic
    this.pulseTimer += delta
    if (this.pulseTimer >= this.PULSE_COOLDOWN) {
      this.triggerEchoPulse(target)
      this.pulseTimer = 0
    }

    // 3. Normal Movement (only if not stunned)
    if (!this.isPhasing) {
      super.update(delta, target, allEnemies)
    } else {
      // While phasing, they move slower but can pass through objects (conceptually)
      const toTarget = target.position.clone().sub(this.position).normalize()
      this.group.position.addScaledVector(toTarget, this.speed * 0.3 * delta)
    }
  }

  private startPhasing() {
    this.isPhasing = true
    this.phaseTimer = 0
    this.setBodyOpacity(0.3)
  }

  private stopPhasing() {
    this.isPhasing = false
    this.phaseTimer = 0
    this.setBodyOpacity(1.0)
  }

  private triggerEchoPulse(target: Vehicle) {
    const dist = this.position.distanceTo(target.position)
    if (dist < 10) {
      // Visual effect (could be a particle system, but we'll use a simple light flash)
      const pushDir = target.position.clone().sub(this.position).normalize()
      const approach = pushDir.dot(target.facingDir)
      const knockback = approach > 0 ? 8 : 4
      target.speed = Math.max(-target.maxSpeed * 0.4, target.speed - knockback)
      
      // Notify player or play sound
      console.log("[Nightmare] Echo Pulse hit player!")
    }
  }
}
