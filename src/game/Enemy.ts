import * as THREE from 'three'
import { Vehicle } from './Vehicle'
import { AssetManager } from './AssetManager'
import { SpriteEntity } from './SpriteEntity'
import { useGameStore } from '../store'
import { CelShadingMaterial } from '../rendering/shaders/CelShadingMaterial'
import { AnimationManager } from '../rendering/animation/AnimationManager'
import { ENEMY_ANIMATIONS } from '../rendering/animation/AnimationClips'

export class Enemy {
  readonly group = new THREE.Group()
  protected body!: THREE.Group | SpriteEntity
  public isBoss = false
  
  speed: number = 8
  hp: number = 30
  maxHp: number = 30
  damage: number = 4
  scrapValue: number = 10
  protected spriteType: string = 'drone'

  // To avoid clipping into each other
  radius = 1.0

  // Per-type grid config for sprite frame picking:
  // drone → 3 cols x 4 rows (transparent bg, first 8 frames valid)
  // heavy → 4 cols x 3 rows (8 valid frames in first 2 rows)
  // golem → 3 cols x 3 rows (8 valid frames)
  // mireking → 4 cols x 4 rows (8 valid frames in first 2 rows)
  private static readonly SPRITE_CONFIGS: Record<string, { cols: number; rows: number; size: number }> = {
    drone:    { cols: 4, rows: 2, size: 3.2  },
    heavy:    { cols: 4, rows: 3, size: 5.4  },
    golem:    { cols: 3, rows: 3, size: 9.5  },
    mireking: { cols: 4, rows: 2, size: 9.5  },
  }
  
  constructor(startPosition: THREE.Vector3, spriteType: 'drone' | 'heavy' | 'golem' | 'mireking' = 'drone') {
    this.group.position.copy(startPosition)
    this.group.position.y = 0 // Grounded
    this.spriteType = spriteType
    const spriteTex = AssetManager.getInstance().getEntitySprite(spriteType)
    if (spriteTex) {
      const cfg = Enemy.SPRITE_CONFIGS[spriteType]
      const gridConfig = { cols: cfg.cols, rows: cfg.rows, frames: 8 }
      this.body = new SpriteEntity(spriteTex, { width: cfg.size, height: cfg.size }, gridConfig)
      this.group.add(this.body.mesh)
    } else {
      try {
        this.body = AssetManager.getInstance().getEnemyModel()
        this.group.add(this.body as THREE.Group)
        // Apply cel-shading to loaded model meshes
        this.applyCelShadingToMeshes(this.body as THREE.Group)
      } catch {
        const geo = new THREE.CylinderGeometry(this.radius, this.radius, 1.8, 8)
        // Apply cel-shading material with red palette for enemies
        const enemyPalette = {
          baseColor: new THREE.Color(0xff3333), // Red for standard enemies
          shadowColor: new THREE.Color(0x661111), // Dark red
          lightColor: new THREE.Color(0xffffff),
          outlineColor: new THREE.Color(0x000000),
        }
        const mat = new CelShadingMaterial({
          baseColor: enemyPalette.baseColor,
          shadowColor: enemyPalette.shadowColor,
          lightColor: enemyPalette.lightColor,
          outlineWidth: 0.015, // Slightly smaller than player's 0.02
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.y = 0.9
        const fallbackGroup = new THREE.Group()
        fallbackGroup.add(mesh)
        this.body = fallbackGroup
        this.group.add(this.body)
      }
    }

    // Initialize animation manager if body is a Group with potential animations
    if (!(this.body instanceof SpriteEntity) && this.body instanceof THREE.Group) {
      this.animationManager = new AnimationManager(this.body)
    }
  }

  get position(): THREE.Vector3 {
    return this.group.position
  }

  takeDamage(amount: number): void {
    this.hp -= amount
    
    // Lifesteal logic
    const state = useGameStore.getState()
    if (state.modifiers.lifesteal > 0 && amount > 0) {
      const heal = amount * (state.modifiers.lifesteal / 100)
      state.setMatchState({ health: Math.min(state.maxHealth, state.health + heal) })
    }

    // Play hit sound
    AssetManager.getInstance().playSound('hit')
    
    // Impact Stutter (mini stun)
    const stutterTime = amount > 20 ? 0.15 : 0.05
    this.stunTimer = Math.max(this.stunTimer, stutterTime)

    // Flash white on hit
    if (this.body instanceof SpriteEntity) {
      this.body.setFlash(2.0, 0xffffff)
    } else {
      this.body.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          if (mat && mat.emissive) {
            mat.emissive.setHex(0xffffff)
            mat.emissiveIntensity = 2.0
          }
        }
      })
    }
    
    setTimeout(() => {
      if (this.group && this.hp > 0) {
        if (this.body instanceof SpriteEntity) {
          this.body.setFlash(
            0.2 + (1.0 - (this.hp / Math.max(this.maxHp, 1))) * 1.5,
            this.isBoss ? 0xff0000 : 0x00ffaa
          )
        } else {
          this.body.traverse(child => {
            if ((child as THREE.Mesh).isMesh) {
              const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
              if (mat && mat.emissive) {
                mat.emissive.setHex(this.isBoss ? 0xff0000 : 0x00ffaa)
                mat.emissiveIntensity = 0.2 + (1.0 - (this.hp / Math.max(this.maxHp, 1))) * 1.5
              }
            }
          })
        }
      }
    }, 80)
  }

  isDead(): boolean {
    return this.hp <= 0
  }

  getHpRatio(): number {
    return Math.max(0, Math.min(1, this.hp / Math.max(this.maxHp, 1)))
  }

  stunTimer: number = 0
  activeStatuses: { id: string, dps: number, timer: number }[] = []

  // Animation
  animationManager?: AnimationManager
  private attackAnimationCallback?: () => void
  private deathAnimationCallback?: () => void

  applyStatus(id: string, dps: number, duration: number) {
    const existing = this.activeStatuses.find(s => s.id === id)
    if (existing) {
      existing.timer = Math.max(existing.timer, duration)
    } else {
      this.activeStatuses.push({ id, dps, timer: duration })
    }
  }

  private applyCelShadingToMeshes(group: THREE.Group): void {
    const enemyPalette = {
      baseColor: new THREE.Color(0xff3333), // Red for standard enemies
      shadowColor: new THREE.Color(0x661111), // Dark red
      lightColor: new THREE.Color(0xffffff),
    }

    group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const celMaterial = new CelShadingMaterial({
          baseColor: enemyPalette.baseColor,
          shadowColor: enemyPalette.shadowColor,
          lightColor: enemyPalette.lightColor,
          outlineWidth: 0.015,
        })
        mesh.material = celMaterial
      }
    })
  }

  update(delta: number, target: Vehicle, allEnemies: Enemy[]): void {
    // Update animations each frame
    this.updateAnimations(delta)

    // Process Stun / Hit Stutter
    if (this.stunTimer > 0) {
      this.stunTimer -= delta
      return
    }

    // Process Status Effects (DoTs)

    const toTarget = target.position.clone().sub(this.position)
    toTarget.y = 0
    
    const distToTarget = toTarget.length()
    
    // 1. Steering & Seeking
    let moveDir = new THREE.Vector3()
    if (distToTarget > 0.5) {
      moveDir.copy(toTarget).normalize()
      if (!(this.body instanceof SpriteEntity)) {
        this.group.rotation.y = Math.atan2(moveDir.x, moveDir.z)
      }
    }
    
    // 2. Separation (Avoid clipping with other enemies)
    const separation = new THREE.Vector3()
    let neighbors = 0
    for (const other of allEnemies) {
      if (other === this) continue
      const toOther = this.position.clone().sub(other.position)
      toOther.y = 0
      const d = toOther.length()
      const minSpacing = this.radius + other.radius + 0.2 // Small buffer
      
      if (d < minSpacing && d > 0.01) {
        // Push away inversely proportional to distance
        const pushForce = minSpacing - d
        separation.add(toOther.normalize().multiplyScalar(pushForce * 5))
        neighbors++
      }
    }
    // Push away from target if getting too close (so they don't sit inside the player and melt health)
    const dTarget = toTarget.length()
    if (dTarget < 1.8) {
      const pushForce = 1.8 - dTarget
      separation.add(toTarget.clone().normalize().multiplyScalar(-pushForce * 10))
      neighbors++
    }
    
    if (neighbors > 0) {
      moveDir.add(separation).normalize()
    }
    
    // 3. Apply movement
    // Distant stragglers get a catch-up boost so waves do not stall when the player kites the edge.
    const catchUpBoost = distToTarget > 18
      ? 1 + Math.min(0.75, (distToTarget - 18) / 20)
      : 1
    this.group.position.addScaledVector(moveDir, this.speed * catchUpBoost * delta)
    this.group.position.y = 0 // Enforce grounding strictly
  }

  public updateSprite(camera: THREE.Camera): void {
    if (this.body instanceof SpriteEntity) {
      const toTarget = new THREE.Vector3(Math.sin(this.group.rotation.y), 0, Math.cos(this.group.rotation.y))
      this.body.update(toTarget, camera.position, this.group.position)
    }
  }

  playAttackAnimation(callback?: () => void): void {
    if (!this.animationManager) return

    this.attackAnimationCallback = callback
    this.animationManager.play(ENEMY_ANIMATIONS.ATTACK)
  }

  playDeathAnimation(callback?: () => void): void {
    if (!this.animationManager) return

    this.deathAnimationCallback = callback
    this.animationManager.play(ENEMY_ANIMATIONS.DEATH)
  }

  private updateAnimations(delta: number): void {
    if (this.animationManager) {
      this.animationManager.update(delta)

      // Execute attack callback if animation finished
      if (this.attackAnimationCallback && !this.animationManager.currentAction) {
        this.attackAnimationCallback()
        this.attackAnimationCallback = undefined
      }

      // Execute death callback if animation finished
      if (this.deathAnimationCallback && !this.animationManager.currentAction) {
        this.deathAnimationCallback()
        this.deathAnimationCallback = undefined
      }
    }
  }
}
