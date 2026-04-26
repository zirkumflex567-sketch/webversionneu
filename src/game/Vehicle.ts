import * as THREE from 'three'
import { ARENA_BOUNDS } from './World'
import { Input } from './Input'
import { AssetManager } from './AssetManager'
import { FXManager } from './FXManager'
import { SpriteEntity } from './SpriteEntity'
import { useGameStore } from '../store'
import { getCelPalette, getPaintFinish } from '../config/CelShadingConfig'
import { CelShadingMaterial } from '../rendering/shaders/CelShadingMaterial'
import { AnimationManager } from '../rendering/animation/AnimationManager'

export class Vehicle {
  readonly group = new THREE.Group()
  private body!: THREE.Group | SpriteEntity
  
  // Physics / tuning
  speed = 0
  readonly maxSpeed = 15
  readonly acceleration = 25
  readonly deceleration = 10
  readonly brakeForce = 35
  readonly turnSpeed = 2.5 // Radians per second

  // Nitro Dash
  readonly nitroCooldownMax = 8   // seconds between uses
  nitroCharges            = 2     // max charges
  readonly nitroChargesMax = 2
  nitroCooldown           = 0     // current cooldown timer
  private nitroActive     = false
  private nitroTimer      = 0
  private readonly nitroDuration = 0.6
  private readonly nitroSpeedMult = 2.4

  // Internal state
  private facingAngle = 0 // Radians, 0 is looking towards +Z
  private readonly hasChromePaint: boolean
  paintFinish: string = 'matte'

  // Animation
  animationManager?: AnimationManager
  private abilityAnimationCallback?: () => void

  constructor(startPosition: THREE.Vector3) {
    this.group.position.copy(startPosition)

    const meta = useGameStore.getState().meta
    this.hasChromePaint = meta.unlockedCosmetics.includes('cos_chrome_paint')

    const char = useGameStore.getState().character as 'rixa' | 'marek'
    const pilotModel = AssetManager.getInstance().getPlayerModel(char)
    const spriteType = char === 'rixa' ? 'chromlilie' : 'schrotty'
    const spriteTex = AssetManager.getInstance().getEntitySprite(spriteType)

    if (pilotModel) {
      this.body = pilotModel
      this.group.add(pilotModel)
    } else if (spriteTex) {
      this.body = new SpriteEntity(spriteTex, { width: 4.8, height: 4.8 })
      this.group.add(this.body.mesh)
    } else {
      try {
        this.body = AssetManager.getInstance().getVehicleModel()
        this.group.add(this.body as THREE.Group)
      } catch {
        // Fallback
        const geometry = new THREE.BoxGeometry(1.4, 0.8, 3)
        const material = new THREE.MeshStandardMaterial({
          color: 0x3b8bff,
          roughness: 0.6,
          metalness: 0.2
        })
        const fallback = new THREE.Mesh(geometry, material)
        fallback.position.y = 0.4
        const fallbackGroup = new THREE.Group()
        fallbackGroup.add(fallback)
        this.body = fallbackGroup
        this.group.add(this.body)
      }
    }

    // Apply cel-shading material to the vehicle body
    if (!(this.body instanceof SpriteEntity)) {
      const palette = getCelPalette(char)
      const celMaterial = new CelShadingMaterial({
        baseColor: palette.baseColor,
        shadowColor: palette.shadowColor,
        lightColor: palette.lightColor,
        outlineWidth: 0.02,
      })

      this.body.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh) {
          mesh.material = celMaterial
        }
      })
    }

    if (this.hasChromePaint && !(this.body instanceof SpriteEntity)) {
      this.body.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          for (const m of mats) {
            const std = m as THREE.MeshStandardMaterial
            if (std && 'metalness' in std) {
              std.metalness = 1.0
              std.roughness = 0.1
              std.needsUpdate = true
            }
          }
        }
      })
    }

    // Initialize animation manager if body is a Group with potential animations
    if (!(this.body instanceof SpriteEntity) && this.body instanceof THREE.Group) {
      this.animationManager = new AnimationManager(this.body)
    }
  }

  public get position(): THREE.Vector3 { return this.group.position }
  public get quaternion(): THREE.Quaternion { return this.group.quaternion }

  get facingDir(): THREE.Vector3 {
    // 0 angle means +Z direction.
    return new THREE.Vector3(Math.sin(this.facingAngle), 0, Math.cos(this.facingAngle))
  }

  update(delta: number, input: Input): void {
    // Update animations each frame
    this.updateAnimations(delta)

    // Nitro Dash logic
    if (this.nitroActive) {
      this.nitroTimer -= delta
      if (this.nitroTimer <= 0) this.nitroActive = false
    }
    if (this.nitroCooldown > 0) {
      this.nitroCooldown = Math.max(0, this.nitroCooldown - delta)
      if (this.nitroCooldown === 0 && this.nitroCharges < this.nitroChargesMax) {
        this.nitroCharges++
        // Recharge next charge after another cooldown
        if (this.nitroCharges < this.nitroChargesMax) this.nitroCooldown = this.nitroCooldownMax
      }
    }
    if (input.wasNitroPressed && this.nitroCharges > 0 && !this.nitroActive) {
      this.nitroActive = true
      this.nitroTimer = this.nitroDuration
      this.nitroCharges--
      if (this.nitroCooldown === 0) this.nitroCooldown = this.nitroCooldownMax
      FXManager.getInstance().spawnExplosion(this.position, 0xffffff, false)
      AssetManager.getInstance().playSound('hit')
    }

    // 1. Acceleration / Braking
    const gas = input.isDown('w', 'arrowup')
    const brake = input.isDown('s', 'arrowdown')
    
    const { modifiers } = useGameStore.getState()
    const nitroBoost = this.nitroActive ? this.nitroSpeedMult : 1
    const currentMaxSpeed = this.maxSpeed * modifiers.speedMult * nitroBoost
    const currentAccel = this.acceleration * modifiers.speedMult * nitroBoost
    
    if (gas) {
      this.speed += currentAccel * delta
    } else if (brake) {
      this.speed -= this.brakeForce * delta
    } else {
      // Natural deceleration 
      if (this.speed > 0) {
        this.speed -= this.deceleration * delta
        if (this.speed < 0) this.speed = 0
      } else if (this.speed < 0) {
        this.speed += this.deceleration * delta
        if (this.speed > 0) this.speed = 0
      }
    }
    
    // Clamp speed
    this.speed = THREE.MathUtils.clamp(this.speed, -currentMaxSpeed * 0.4, currentMaxSpeed)
    
    // 2. Steering (only if moving)
    const speedRatio = Math.abs(this.speed) / this.maxSpeed
    if (speedRatio > 0.05) {
      const left = input.isDown('a', 'arrowleft')
      const right = input.isDown('d', 'arrowright')
      
      let turnStr = 0
      if (left) turnStr = 1
      if (right) turnStr = -1
      
      // If we are reversing, steering should feel reversed visually 
      // relative to world, but normal relative to car. We multiply by signs.
      const directionMult = this.speed >= 0 ? 1 : -1
      this.facingAngle += turnStr * this.turnSpeed * delta * directionMult
    }

    // 3. Apply position
    if (this.body instanceof SpriteEntity) {
      // Handled in updateSprite
    } else {
      this.body.rotation.y = this.facingAngle
    }
    this.group.rotation.y = 0 
    const moveDir = this.facingDir.clone().multiplyScalar(this.speed * delta)
    this.group.position.add(moveDir)

    // 5. FX: Sand trails
    if (Math.abs(this.speed) > 2) {
        const fx = FXManager.getInstance()
        const trailPos = this.position.clone()
        const backOff = this.facingDir.clone().multiplyScalar(-1.5)
        trailPos.add(backOff)
        fx.spawnSandCloud(trailPos, Math.abs(this.speed))
    }

    // 4. Boundary clamp (Hard Edge of the Map)
    const boundX = ARENA_BOUNDS.halfLength - 2
    const boundZ = ARENA_BOUNDS.halfWidth - 2
    
    this.group.position.x = THREE.MathUtils.clamp(this.group.position.x, -boundX, boundX)
    this.group.position.z = THREE.MathUtils.clamp(this.group.position.z, -boundZ, boundZ)
  }

  public updateSprite(camera: THREE.Camera): void {
    if (this.body instanceof SpriteEntity) {
      this.body.update(this.facingDir, camera.position, this.group.position)
    }
  }

  public setPaintFinish(finish: string): void {
    this.paintFinish = finish
    const finishConfig = getPaintFinish(finish)

    // Apply finish to vehicle material if it's a shader material or standard material
    if (!(this.body instanceof SpriteEntity)) {
      this.body.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          for (const mat of mats) {
            if ('roughness' in mat && 'metalness' in mat) {
              const material = mat as unknown as THREE.MeshStandardMaterial & THREE.ShaderMaterial & {
                uniforms?: {
                  gloss?: { value: number }
                  metalness?: { value: number }
                }
              }
              material.roughness = finishConfig.roughness
              material.metalness = finishConfig.metalness
              material.needsUpdate = true
            }
            // For shader materials with uniforms
            if ('uniforms' in mat) {
              const material = mat as unknown as THREE.ShaderMaterial & {
                uniforms?: {
                  gloss?: { value: number }
                  metalness?: { value: number }
                }
              }
              if (material.uniforms.gloss) {
                material.uniforms.gloss.value = finishConfig.gloss
              }
              if (material.uniforms.metalness) {
                material.uniforms.metalness.value = finishConfig.metalness
              }
            }
          }
        }
      })
    }
  }

  playAbilityAnimation(abilityName: string, callback?: () => void): void {
    if (!this.animationManager) return

    this.abilityAnimationCallback = callback
    this.animationManager.play(abilityName)
  }

  playStateAnimation(stateName: string): void {
    if (!this.animationManager) return

    this.animationManager.play(stateName)
  }

  private updateAnimations(delta: number): void {
    if (this.animationManager) {
      this.animationManager.update(delta)

      // Execute ability callback if animation finished
      if (this.abilityAnimationCallback && !this.animationManager.currentAction) {
        this.abilityAnimationCallback()
        this.abilityAnimationCallback = undefined
      }
    }
  }
}
