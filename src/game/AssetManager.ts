import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { assetPath } from '../config/assetPath'

export class AssetManager {
  private static instance: AssetManager
  
  private vehicleModel: THREE.Group | null = null
  private enemyModel: THREE.Group | null = null
  
  private schrottyTex: THREE.Texture | null = null
  private chromTex: THREE.Texture | null = null
  private droneTex: THREE.Texture | null = null
  private heavyTex: THREE.Texture | null = null
  private golemTex: THREE.Texture | null = null
  private mirekingTex: THREE.Texture | null = null
  
  private lootTex: THREE.Texture | null = null
  private extractTex: THREE.Texture | null = null
  private propsTex: THREE.Texture | null = null
  
  private asphaltTex: THREE.Texture | null = null
  private sandTex: THREE.Texture | null = null
  
  private textureLoader = new THREE.TextureLoader()
  private fbxLoader = new FBXLoader()
  private glbLoader = new GLTFLoader()
  
  // Cache for dynamic GLB models
  private glbCache: Map<string, THREE.Group> = new Map()
  
  private constructor() {}

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager()
    }
    return AssetManager.instance
  }

  private audioListener = new THREE.AudioListener()
  private audioLoader = new THREE.AudioLoader()
  
  private shootSoundBuf: AudioBuffer | null = null
  private hitSoundBuf: AudioBuffer | null = null
  private levelUpBuf: AudioBuffer | null = null
  private startSoundBuf: AudioBuffer | null = null
  private gameOverBuf: AudioBuffer | null = null
  private kickBuf: AudioBuffer | null = null
  private punchBuf: AudioBuffer | null = null
  private tackleBuf: AudioBuffer | null = null
  private goalBuf: AudioBuffer | null = null

  private rixaModel: THREE.Group | null = null
  private marekModel: THREE.Group | null = null

  public async preloadAll(): Promise<void> {
    const failures: string[] = []
    const successes: string[] = []
    const safeLoad = async <T,>(p: Promise<T>, label?: string): Promise<T | null> => {
      try {
        const r = await p
        if (label) successes.push(label)
        return r
      } catch(e) {
        const lbl = label ?? "<unlabeled>"
        failures.push(lbl)
        console.error("[AssetManager] FAILED to load:", lbl, e)
        return null
      }
    }

    const charactersTex = await safeLoad(this.textureLoader.loadAsync(assetPath('/assets/textures/characters_main.png')), '/assets/textures/characters_main.png')
    if (charactersTex) {
      charactersTex.colorSpace = THREE.SRGBColorSpace
      charactersTex.flipY = false
    }

    const [
      schrotty, characters, bossGolem, bossMireKing,
      feuermech, goldbadger,
      shootBuf, hitBuf, levelUpBuf,
      startBuf, gameOverBuf, kickBuf, punchBuf, tackleBuf, goalBuf,
      sTex, cTex, dTex, hTex, gTex, mTex,
      lTex, eTex, pTex, aTex, snTex
    ] = await Promise.all([
      safeLoad(this.fbxLoader.loadAsync(assetPath('/assets/models/schrotty.fbx')), '/assets/models/schrotty.fbx'),
      safeLoad(this.fbxLoader.loadAsync(assetPath('/assets/models/characters.fbx')), '/assets/models/characters.fbx'),
      safeLoad(this.fbxLoader.loadAsync(assetPath('/assets/models/boss_golem.fbx')), '/assets/models/boss_golem.fbx'),
      safeLoad(this.fbxLoader.loadAsync(assetPath('/assets/models/boss_mireking.fbx')), '/assets/models/boss_mireking.fbx'),
      safeLoad(this.fbxLoader.loadAsync(assetPath('/assets/characters/char_feuermech.fbx')), '/assets/characters/char_feuermech.fbx'),
      safeLoad(this.fbxLoader.loadAsync(assetPath('/assets/characters/char_goldbadger.fbx')), '/assets/characters/char_goldbadger.fbx'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/shoot.wav')), '/assets/sounds/shoot.wav'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/hit.wav')), '/assets/sounds/hit.wav'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/levelup.wav')), '/assets/sounds/levelup.wav'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/start.mp3')), '/assets/sounds/start.mp3'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/gameover.mp3')), '/assets/sounds/gameover.mp3'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/kick.wav')), '/assets/sounds/kick.wav'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/punch.wav')), '/assets/sounds/punch.wav'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/tackle.wav')), '/assets/sounds/tackle.wav'),
      safeLoad(this.audioLoader.loadAsync(assetPath('/assets/sounds/goal.wav')), '/assets/sounds/goal.wav'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/ent_player_schrotty.png')), '/assets/ui/ent_player_schrotty.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/ent_player_chromlilie.png')), '/assets/ui/ent_player_chromlilie.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/ent_enemy_drone.png')), '/assets/ui/ent_enemy_drone.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/ent_enemy_heavy.png')), '/assets/ui/ent_enemy_heavy.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/ent_boss_golem.png')), '/assets/ui/ent_boss_golem.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/ent_boss_mireking.png')), '/assets/ui/ent_boss_mireking.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/loot_items_sheet.png')), '/assets/ui/loot_items_sheet.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/extraction_pad_decal.png')), '/assets/ui/extraction_pad_decal.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/ui/props_industrial_debris.png')), '/assets/ui/props_industrial_debris.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/textures/tex_ground_asphalt.png')), '/assets/textures/tex_ground_asphalt.png'),
      safeLoad(this.textureLoader.loadAsync(assetPath('/assets/textures/tex_ground_sand.png')), '/assets/textures/tex_ground_sand.png')
    ])
    
    this.schrottyTex = sTex
    this.chromTex = cTex
    this.droneTex = dTex
    this.heavyTex = hTex
    this.golemTex = gTex
    this.mirekingTex = mTex
    this.lootTex = lTex
    this.extractTex = eTex
    this.propsTex = pTex
    this.asphaltTex = aTex
    this.sandTex = snTex
    
    this.shootSoundBuf = shootBuf
    this.hitSoundBuf = hitBuf
    this.levelUpBuf = levelUpBuf
    this.startSoundBuf = startBuf
    this.gameOverBuf = gameOverBuf
    this.kickBuf = kickBuf
    this.punchBuf = punchBuf
    this.tackleBuf = tackleBuf
    this.goalBuf = goalBuf

    // ... (Setup Schrotty and characters)
    this.setupCharacter(schrotty, 'vehicle')
    this.setupCharacter(characters, 'enemy')

    if (feuermech) {
      this.setupPilotCharacter(feuermech)
      this.rixaModel = feuermech
    }
    if (goldbadger) {
      this.setupPilotCharacter(goldbadger)
      this.marekModel = goldbadger
    }
    
    if (bossGolem) {
      bossGolem.scale.setScalar(0.015) // Slightly larger
      this.bossGolemModel = bossGolem
    }
    if (bossMireKing) {
      bossMireKing.scale.setScalar(0.012)
      this.bossMireKingModel = bossMireKing
    }

    const modelState = {
      vehicleModel: !!this.vehicleModel,
      enemyModel: !!this.enemyModel,
      rixaModel: !!this.rixaModel,
      marekModel: !!this.marekModel,
      bossGolemModel: !!this.bossGolemModel,
      bossMireKingModel: !!this.bossMireKingModel,
    }
    const textureState = {
      schrottyTex: !!this.schrottyTex,
      chromTex: !!this.chromTex,
      droneTex: !!this.droneTex,
      heavyTex: !!this.heavyTex,
      golemTex: !!this.golemTex,
      mirekingTex: !!this.mirekingTex,
      lootTex: !!this.lootTex,
      extractTex: !!this.extractTex,
      propsTex: !!this.propsTex,
      asphaltTex: !!this.asphaltTex,
      sandTex: !!this.sandTex,
    }
    console.log("[AssetManager] Preload complete:", {
      successes: successes.length,
      failures: failures.length,
      failedAssets: failures,
      models: modelState,
      textures: textureState,
    })
    if (failures.length > 0) {
      console.warn("[AssetManager] Some assets failed to load. Check failedAssets above. Game uses fallback geometry where missing.")
    }
  }

  private bossGolemModel: THREE.Group | null = null
  private bossMireKingModel: THREE.Group | null = null

  private setupCharacter(model: THREE.Group | null, type: 'vehicle' | 'enemy') {
    if (!model) return
    
    // 1. Root Scaling
    model.scale.setScalar(0.02) 
    model.rotation.y = Math.PI 
    
    // 2. Recursive Setup
    model.traverse(child => {
      // Remove lights/cameras
      if (child.type.includes('Camera') || child.type.includes('Light')) {
        child.visible = false
        if (child.parent) child.parent.remove(child)
      }

      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.frustumCulled = false // NEVER CULL - fixes giant artifact flickering

        // Wasteland Material Overrides
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        if (mat) {
          mat.metalness = 0.6
          mat.roughness = 0.5
          // Don't darken — let the original texture colours show through
        }
      }
    })
    
    model.updateMatrixWorld(true)

    if (type === 'vehicle') this.vehicleModel = model
    else this.enemyModel = model
  }

  private setupPilotCharacter(model: THREE.Group) {
    model.rotation.y = Math.PI
    model.traverse(child => {
      if (child.type.includes('Camera') || child.type.includes('Light')) {
        child.visible = false
        if (child.parent) child.parent.remove(child)
      }
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.frustumCulled = false
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        if (mat) {
          mat.metalness = 0.55
          mat.roughness = 0.45
        }
      }
    })
    model.updateMatrixWorld(true)
  }

  public getPlayerModel(char: 'rixa' | 'marek'): THREE.Group | null {
    const source = char === 'rixa' ? this.rixaModel : this.marekModel
    if (!source) return null
    return this.normalizeClone(source, { width: 2.6, height: 2.8, depth: 2.6 })
  }

  private normalizeClone(
    source: THREE.Group,
    dimensions: { width: number; height: number; depth: number },
  ): THREE.Group {
    const clone = source.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const safeSize = {
      x: Math.max(size.x, 0.001),
      y: Math.max(size.y, 0.001),
      z: Math.max(size.z, 0.001),
    }
    const scale = Math.min(
      dimensions.width / safeSize.x,
      dimensions.height / safeSize.y,
      dimensions.depth / safeSize.z,
    )

    clone.scale.multiplyScalar(scale)
    clone.updateMatrixWorld(true)

    const scaledBox = new THREE.Box3().setFromObject(clone)
    const center = scaledBox.getCenter(new THREE.Vector3())
    clone.position.sub(center)
    clone.position.y -= scaledBox.min.y
    clone.updateMatrixWorld(true)

    return clone
  }

  private createFallbackVehicleModel(): THREE.Group {
    const root = new THREE.Group()

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.6, 3.6),
      new THREE.MeshStandardMaterial({
        color: 0x2bcfb0,
        roughness: 0.35,
        metalness: 0.7,
        emissive: 0x0b3d37,
        emissiveIntensity: 0.35,
      }),
    )
    body.position.y = 0.75
    body.castShadow = true
    body.receiveShadow = true
    root.add(body)

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.35, 0.55, 1.7),
      new THREE.MeshStandardMaterial({
        color: 0x101828,
        roughness: 0.2,
        metalness: 0.5,
      }),
    )
    cabin.position.set(0, 1.15, -0.05)
    cabin.castShadow = true
    root.add(cabin)

    const bumperGeo = new THREE.BoxGeometry(1.85, 0.28, 0.32)
    const bumperMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.45, metalness: 0.85 })
    const frontBumper = new THREE.Mesh(bumperGeo, bumperMat)
    frontBumper.position.set(0, 0.45, 1.86)
    frontBumper.castShadow = true
    root.add(frontBumper)

    const rearBumper = new THREE.Mesh(bumperGeo, bumperMat)
    rearBumper.position.set(0, 0.45, -1.86)
    rearBumper.castShadow = true
    root.add(rearBumper)

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.85, metalness: 0.15 })
    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.38, 16)
    const wheelOffsets: [number, number, number][] = [
      [-1.02, 0.42, -1.18],
      [1.02, 0.42, -1.18],
      [-1.02, 0.42, 1.18],
      [1.02, 0.42, 1.18],
    ]
    for (const [x, y, z] of wheelOffsets) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(x, y, z)
      wheel.castShadow = true
      root.add(wheel)
    }

    return root
  }

  private createFallbackEnemyModel(): THREE.Group {
    const root = new THREE.Group()
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.55, 1.2, 8, 16),
      new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        roughness: 0.65,
        metalness: 0.25,
        emissive: 0x2a0808,
        emissiveIntensity: 0.4,
      }),
    )
    body.position.y = 1.1
    body.castShadow = true
    body.receiveShadow = true
    root.add(body)

    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xf59e0b,
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.3,
      }),
    )
    eye.position.set(0, 1.45, 0.45)
    root.add(eye)
    return root
  }

  private looksLikeVehicle(source: THREE.Group): boolean {
    const box = new THREE.Box3().setFromObject(source)
    const size = box.getSize(new THREE.Vector3())
    return size.z >= size.y * 0.9 || size.x >= size.y * 0.9
  }

  public getBossModel(type: 'golem' | 'mireking'): THREE.Group {
    const model = type === 'golem' ? this.bossGolemModel : this.bossMireKingModel
    if (!model) {
      const baseEnemy = this.enemyModel ?? this.createFallbackEnemyModel()
      return this.normalizeClone(baseEnemy, { width: 3.6, height: 5.8, depth: 3.6 })
    }
    return this.normalizeClone(model, type === 'golem'
      ? { width: 5.2, height: 6.4, depth: 5.2 }
      : { width: 4.2, height: 5.4, depth: 4.2 })
  }

  public getAudioListener(): THREE.AudioListener {
    return this.audioListener
  }

  public playSound(type: 'shoot' | 'hit' | 'levelup' | 'start' | 'gameover' | 'kick' | 'punch' | 'tackle' | 'goal'): void {
    const bufMap: Record<string, AudioBuffer | null> = {
      shoot: this.shootSoundBuf,
      hit: this.hitSoundBuf,
      levelup: this.levelUpBuf,
      start: this.startSoundBuf,
      gameover: this.gameOverBuf,
      kick: this.kickBuf,
      punch: this.punchBuf,
      tackle: this.tackleBuf,
      goal: this.goalBuf,
    }
    const volumeMap: Record<string, number> = {
      shoot: 0.2, hit: 0.4, levelup: 0.8,
      start: 0.6, gameover: 0.7, kick: 0.5, punch: 0.5, tackle: 0.55, goal: 0.7,
    }
    const buf = bufMap[type]
    if (!buf) return
    const sound = new THREE.Audio(this.audioListener)
    sound.setBuffer(buf)
    sound.setVolume(volumeMap[type] ?? 0.4)
    if (type === 'shoot') sound.setDetune((Math.random() - 0.5) * 400)
    sound.play()
  }

  public getVehicleModel(): THREE.Group {
    if (!this.vehicleModel) throw new Error("Assets not loaded!")
    if (!this.looksLikeVehicle(this.vehicleModel)) {
      return this.createFallbackVehicleModel()
    }
    return this.normalizeClone(this.vehicleModel, { width: 2.4, height: 1.7, depth: 4.8 })
  }

  public getEnemyModel(): THREE.Group {
    if (!this.enemyModel) {
      return this.normalizeClone(this.createFallbackEnemyModel(), { width: 1.6, height: 2.4, depth: 1.6 })
    }
    return this.normalizeClone(this.enemyModel, { width: 1.6, height: 2.4, depth: 1.6 })
  }

  public getEntitySprite(type: 'schrotty' | 'chromlilie' | 'drone' | 'heavy' | 'golem' | 'mireking'): THREE.Texture | null {
    if (type === 'schrotty') return this.schrottyTex
    if (type === 'chromlilie') return this.chromTex
    if (type === 'drone') return this.droneTex
    if (type === 'heavy') return this.heavyTex
    if (type === 'golem') return this.golemTex
    if (type === 'mireking') return this.mirekingTex
    return null
  }

  public getGroundTexture(type: 'asphalt' | 'sand'): THREE.Texture | null {
    return type === 'asphalt' ? this.asphaltTex : this.sandTex
  }

  public getLootTexture(): THREE.Texture | null { return this.lootTex }
  public getExtractTexture(): THREE.Texture | null { return this.extractTex }
  public getPropsTexture(): THREE.Texture | null { return this.propsTex }

  // --- NEW DYNAMIC OPEN WORLD ASSET METHODS ---

  public async loadGLB(path: string): Promise<THREE.Group | null> {
    const fullPath = assetPath(path);
    if (this.glbCache.has(fullPath)) {
      return this.glbCache.get(fullPath)!.clone();
    }

    try {
      const gltf = await this.glbLoader.loadAsync(fullPath);
      const model = gltf.scene;
      
      // Enable shadows and apply flat shading to all meshes in the Synty model
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
             // Synty assets usually look best with rough, flat materials
             if (Array.isArray(mesh.material)) {
                mesh.material.forEach(m => {
                  if ((m as THREE.MeshStandardMaterial).roughness !== undefined) {
                    (m as THREE.MeshStandardMaterial).roughness = 0.8;
                  }
                });
             } else {
                if ((mesh.material as THREE.MeshStandardMaterial).roughness !== undefined) {
                  (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
                }
             }
          }
        }
      });

      this.glbCache.set(fullPath, model);
      return model.clone();
    } catch (e) {
      console.warn(`Failed to load GLB: ${fullPath}`, e);
      return null;
    }
  }

  /**
   * Helper to create an InstancedMesh from a loaded GLB.
   * Crucial for rendering 10,000 trees/rocks in the open world with 1 draw call.
   */
  public createInstancedMesh(sourceGroup: THREE.Group, count: number): THREE.InstancedMesh | null {
    let found: THREE.Mesh | null = null;
    
    // Find the first actual Mesh in the GLB hierarchy
    sourceGroup.traverse((child) => {
      if (!found && (child as THREE.Mesh).isMesh) {
        found = child as THREE.Mesh;
      }
    });

    const targetMesh = found as THREE.Mesh | null;
    if (!targetMesh) return null;

    const geometry = targetMesh.geometry.clone();
    const material = targetMesh.material;
    
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    return instancedMesh;
  }
}
