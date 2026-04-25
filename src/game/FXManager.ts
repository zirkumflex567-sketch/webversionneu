import * as THREE from 'three'
import { assetPath } from '../config/assetPath'

interface Particle {
  pos: THREE.Vector3
  vel: THREE.Vector3
  color: THREE.Color
  life: number
  maxLife: number
}

interface AnimatedSprite {
  sprite: THREE.Sprite
  startTime: number
  duration: number
  cols: number
  rows: number
}

export class FXManager {
  private static instance: FXManager
  private particles: Particle[] = []
  private readonly maxParticles = 2000
  
  private geometry: THREE.BufferGeometry
  private material: THREE.PointsMaterial
  private points: THREE.Points
  
  private positions: Float32Array
  private colors: Float32Array

  private explosionTexture: THREE.Texture | null = null
  private dustTexture: THREE.Texture | null = null
  private muzzleFlashTexture: THREE.Texture | null = null
  private plasmaTexture: THREE.Texture | null = null
  private animatedSprites: AnimatedSprite[] = []
  private scene: THREE.Scene | null = null

  private constructor() {
    this.geometry = new THREE.BufferGeometry()
    this.positions = new Float32Array(this.maxParticles * 3)
    this.colors = new Float32Array(this.maxParticles * 3)

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    
    this.material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    })

    this.points = new THREE.Points(this.geometry, this.material)
    this.points.frustumCulled = false

    const texLoader = new THREE.TextureLoader()

    // Load VFX Textures
    texLoader.load(assetPath('/assets/vfx/explosion_luminous.png'), (tex) => {
      this.explosionTexture = tex
    })
    texLoader.load(assetPath('/assets/vfx/vfx_dust_clouds.png'), (tex) => {
      this.dustTexture = tex
    })
    texLoader.load(assetPath('/assets/vfx/vfx_muzzle_flashes.png'), (tex) => {
      this.muzzleFlashTexture = tex
    })
    texLoader.load(assetPath('/assets/vfx/vfx_plasma_impacts.png'), (tex) => {
      this.plasmaTexture = tex
    })
  }

  static getInstance(): FXManager {
    if (!FXManager.instance) FXManager.instance = new FXManager()
    return FXManager.instance
  }

  public setScene(scene: THREE.Scene) {
    this.scene = scene
    this.scene.add(this.points)
  }

  get visualGroup(): THREE.Points {
    return this.points
  }

  spawnExplosion(pos: THREE.Vector3, color: number, isBoss = false): void {
    if (!this.scene) return

    const col = new THREE.Color(color)
    
    // 1. Layered Particles (Shrapnel & Sparks)
    for (let i = 0; i < (isBoss ? 80 : 25); i++) {
      this.addParticle(
        pos.clone(),
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          Math.random() * 15,
          (Math.random() - 0.5) * 20
        ),
        col,
        0.8 + Math.random() * 1.2
      )
    }

    // 2. High-Tech Core (Fast Flash) — sizes kept modest so embedded frame labels
    // on explosion_luminous.png don't read as text billboards when up close.
    this.spawnAnimatedSprite(pos, 0xffffff, isBoss ? 5 : 3, 250, 4, 4)

    // 3. Smoke Ring / Shockwave (Slower)
    this.spawnAnimatedSprite(pos, color, isBoss ? 7 : 4, 800, 4, 4)
  }

  private spawnAnimatedSprite(pos: THREE.Vector3, color: number, size: number, duration: number, cols: number, rows: number, textureType: 'explosion' | 'dust' | 'flash' | 'plasma' = 'explosion'): void {
    const texSource = textureType === 'dust' ? this.dustTexture :
                      textureType === 'flash' ? this.muzzleFlashTexture :
                      textureType === 'plasma' ? this.plasmaTexture : this.explosionTexture

    if (!this.scene || !texSource) return
    
    const texCopy = texSource.clone()
    texCopy.needsUpdate = true
    // Init UV to first frame so we don't show the entire spritesheet for 1 frame
    texCopy.repeat.set(1 / cols, 1 / rows)
    texCopy.offset.set(0, (rows - 1) / rows)
    const spriteMat = new THREE.SpriteMaterial({
      map: texCopy, 
      color: new THREE.Color(color),
      transparent: true, 
      blending: THREE.AdditiveBlending,
      depthWrite: false 
    })
    const sprite = new THREE.Sprite(spriteMat)
    
    sprite.scale.set(size, size, 1)
    sprite.position.copy(pos)
    sprite.position.y += 0.5
    
    this.scene.add(sprite)
    
    this.animatedSprites.push({
      sprite,
      startTime: performance.now(),
      duration,
      cols,
      rows
    })
  }

  spawnImpact(pos: THREE.Vector3, color = 0xffffff): void {
    const col = new THREE.Color(color)
    for (let i = 0; i < 8; i++) {
        const vel = new THREE.Vector3(
            (Math.random() - 0.5) * 12,
            Math.random() * 10,
            (Math.random() - 0.5) * 12
        )
      this.addParticle(pos.clone(), vel, col, 0.3 + Math.random() * 0.4)
    }
    this.spawnAnimatedSprite(pos, color, 1.8, 320, 4, 4, 'plasma')
  }

  spawnMuzzleFlash(pos: THREE.Vector3, dir: THREE.Vector3, color = 0xffffff): void {
      if (!this.scene) return
      
      // Spawn a small animated sprite at the muzzle
      const flashPos = pos.clone().add(dir.clone().multiplyScalar(0.5))
      this.spawnAnimatedSprite(flashPos, color, 1.2, 100, 4, 4, 'flash')
  }

  spawnSandCloud(pos: THREE.Vector3, speed: number): void {
      if (!this.scene) return
      if (Math.random() > 0.4) return // Rate limit
      
      const size = 1.0 + (speed / 15)
      const color = 0xd2b48c // Tan/Sand
      this.spawnAnimatedSprite(pos, color, size, 1200 + Math.random() * 800, 4, 4, 'dust')
  }

  spawnSparkTrail(pos: THREE.Vector3, color = 0x00ffaa): void {
    // High-tech chrome sparks
    const col = new THREE.Color(color)
    const trailPos = pos.clone()
    trailPos.y += 0.1
    this.addParticle(
      trailPos,
      new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        Math.random() * 4,
        (Math.random() - 0.5) * 5
      ),
      col,
      0.4 + Math.random() * 0.6
    )
  }

  private addParticle(pos: THREE.Vector3, vel: THREE.Vector3, color: THREE.Color, life: number): void {
    if (this.particles.length >= this.maxParticles) return
    this.particles.push({ pos, vel, color, life, maxLife: life })
  }

  update(delta: number): void {
    const now = performance.now()

    // 1. Update Particles
    const posAttr = this.geometry.getAttribute('position') as THREE.BufferAttribute
    const colAttr = this.geometry.getAttribute('color') as THREE.BufferAttribute
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.life -= delta
      
      if (p.life <= 0) {
        this.particles.splice(i, 1)
        continue
      }

      p.vel.y -= 25 * delta // Heavier gravity
      p.pos.addScaledVector(p.vel, delta)
      
      const idx = i * 3
      this.positions[idx] = p.pos.x
      this.positions[idx + 1] = p.pos.y
      this.positions[idx + 2] = p.pos.z
      
      const alpha = p.life / p.maxLife
      this.colors[idx] = p.color.r * alpha
      this.colors[idx + 1] = p.color.g * alpha
      this.colors[idx + 2] = p.color.b * alpha
    }

    for (let i = this.particles.length; i < this.maxParticles; i++) {
      const idx = i * 3
      this.positions[idx] = 0
      this.positions[idx + 1] = -1000
      this.positions[idx + 2] = 0
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true

    // 2. Update Animated Sprites
    for (let i = this.animatedSprites.length - 1; i >= 0; i--) {
      const anim = this.animatedSprites[i]
      const elapsed = now - anim.startTime
      const progress = elapsed / anim.duration
      
      if (progress >= 1.0) {
        if (this.scene) this.scene.remove(anim.sprite)
        anim.sprite.material.map?.dispose()
        anim.sprite.material.dispose()
        this.animatedSprites.splice(i, 1)
        continue
      }

      // Spritesheet math (Standard 4x4 Grid - 16 Frames)
      const totalFrames = anim.cols * anim.rows
      const frameSpeed = 1.0 // Normalized speed
      const currentFrame = Math.min(totalFrames - 1, Math.floor(progress * totalFrames * frameSpeed))
      
      const col = currentFrame % anim.cols
      const row = Math.floor(currentFrame / anim.cols)
      
      const tex = anim.sprite.material.map!
      
      // Top-left is 0,0 in most spritesheets, but Three.js starts bottom-left
      // So row 0 (top) is actually (rows - 1 - row)
      tex.repeat.set(1 / anim.cols, 1 / anim.rows)
      tex.offset.set(col / anim.cols, (anim.rows - 1 - row) / anim.rows)
      
      // Fade out
      anim.sprite.material.opacity = 1.0 - Math.pow(progress, 2)
    }
  }
}
