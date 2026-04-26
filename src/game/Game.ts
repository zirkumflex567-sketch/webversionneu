import * as THREE from 'three'
import { Input } from './Input'
import { Vehicle } from './Vehicle'
import { HUD } from './HUD'
import { useGameStore, EnemyTelemetry } from '../store'
import { HordeDirector } from './HordeDirector'
import { Enemy } from './Enemy'
import { ExtractionZone } from './ExtractionZone'
import { RunController } from './RunController'
import { Weapon } from './Weapon'
import { Projectile } from './Projectile'
import { Scrap } from './Scrap'
import { AssetManager } from './AssetManager'
import { FXManager } from './FXManager'
import { ToxicZone } from './ToxicZone'
import { Sentry } from './Sentry'
import { Minefield } from './Minefield'
import { HeavyEnemy } from './HeavyEnemy'
import { Boss } from './Boss'
import { FpsProfiler } from './FpsProfiler'
import { NetworkManager } from './NetworkManager'
import { StoryManager } from './StoryManager'
import { applyCharacterTraitDamage } from './CharacterTraits'
import { ParticleSystem } from '../rendering/particles/ParticleSystem'
import { ParticleMaterial } from '../rendering/particles/ParticleMaterial'
import { ParticleLOD } from '../rendering/particles/ParticleLOD'
import { PerformanceMonitor } from '../rendering/performance/PerformanceMonitor'
import { t } from '../i18n'

const EMPTY_TELEMETRY: EnemyTelemetry = {
  total: 0,
  visible: 0,
  offscreen: 0,
  markers: [],
  bossLabel: null,
  bossHp: 0,
  bossMaxHp: 0,
}

function readStressFlag(): boolean {
  try {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    const s = params.get('stress')
    return s === 'heavy' || s === '1' || s === 'true'
  } catch { return false }
}

export class Game {
  private readonly container: HTMLElement
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene: THREE.Scene
  private readonly camera: THREE.PerspectiveCamera
  private readonly clock = new THREE.Clock()
  private readonly input = new Input()
  private readonly stressMode = readStressFlag()

  private vehicle!: Vehicle
  private hud!: HUD
  
  private hordeDirector!: HordeDirector
  private extractionZone!: ExtractionZone
  private runController!: RunController
  
  // Screen shake
  private cameraShakeIntensity = 0
  private readonly maxShake = 0.5
  
  private readonly weapon = new Weapon()
  private readonly projectiles: Projectile[] = []
  private readonly scraps: Scrap[] = []
  private readonly toxicZones: ToxicZone[] = []
  private readonly sentries: Sentry[] = []
  private minefield!: Minefield
  private networkManager!: NetworkManager

  private particleSystem!: ParticleSystem
  private particleMesh!: THREE.Points
  private particleLOD!: ParticleLOD
  private performanceMonitor!: PerformanceMonitor

  private cameraDistance = 60 // Cinematic combat distance
  private cameraHeight = 30   // High-angle tactical view

  private emptyEnemyTelemetry(): EnemyTelemetry {
    return EMPTY_TELEMETRY
  }

  private syncEnemyCount(): void {
    useGameStore.getState().setMatchState({ enemiesAlive: this.hordeDirector?.enemies.filter(e => !e.isDead()).length ?? 0 })
  }

  private spawnDebugEnemy(kind: 'mob' | 'heavy' | 'boss', x: number, z: number, hpPct = 1, freeze = true): boolean {
    if (!this.hordeDirector) return false

    const position = new THREE.Vector3(x, 0, z)
    const enemy =
      kind === 'boss'
        ? new Boss(position, 'mireking')
        : kind === 'heavy'
          ? new HeavyEnemy(position)
          : new Enemy(position)

    enemy.hp = Math.max(1, enemy.maxHp * THREE.MathUtils.clamp(hpPct, 0.05, 1))
    if (freeze) enemy.speed = 0
    enemy.group.position.copy(position)
    this.hordeDirector.enemies.push(enemy)
    this.scene.add(enemy.group)
    this.syncEnemyCount()
    return true
  }

  private spawnDebugRing(
    kind: 'mob' | 'heavy' | 'boss',
    count: number,
    radiusMin: number,
    radiusMax: number,
    hpPct = 1,
    freeze = true,
  ): number {
    if (!this.hordeDirector || !this.vehicle) return 0

    const safeCount = Math.max(0, Math.floor(count))
    const minRadius = Math.max(3, Math.min(radiusMin, radiusMax))
    const maxRadius = Math.max(minRadius, Math.max(radiusMin, radiusMax))
    let spawned = 0

    for (let i = 0; i < safeCount; i++) {
      const angle = (i / Math.max(safeCount, 1)) * Math.PI * 2
      const radius = THREE.MathUtils.lerp(minRadius, maxRadius, safeCount === 1 ? 0.5 : (i % safeCount) / Math.max(safeCount - 1, 1))
      const x = this.vehicle.position.x + Math.cos(angle) * radius
      const z = this.vehicle.position.z + Math.sin(angle) * radius
      if (this.spawnDebugEnemy(kind, x, z, hpPct, freeze)) spawned++
    }

    return spawned
  }

  constructor(container: HTMLElement) {
    this.container = container

    // 1. Scene setup
    this.scene = new THREE.Scene()
    ;(window as unknown as { __GAME_SCENE__?: THREE.Scene }).__GAME_SCENE__ = this.scene

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(40, 1, 2.0, 500)
    // Add audio listener after preloading, but we can do it later.
    // Actually, AssetManager getInstance doesn't require preloading to get listener!
    this.camera.add(AssetManager.getInstance().getAudioListener())

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.8  // ACES is dark at 1.0
    container.appendChild(this.renderer.domElement)

    // 4. Particle system setup
    this.particleSystem = new ParticleSystem(1000)
    const particleMaterial = new ParticleMaterial({ blending: 'additive' })
    this.particleMesh = new THREE.Points(this.particleSystem.geometry, particleMaterial)
    this.scene.add(this.particleMesh)

    // Initialize LOD and performance monitoring
    this.particleLOD = new ParticleLOD()
    this.performanceMonitor = new PerformanceMonitor()

    // ── Event listeners ──
    window.addEventListener('resize', this.onResize)
    window.addEventListener('wheel', this.onWheel, { passive: true })
    window.addEventListener('WEAPON_FIRED', this.onWeaponFired as EventListener)
    window.addEventListener('keydown', this.onGlobalKeyDown)

    this.onResize()
    
    // 4. Multiplayer setup
    this.networkManager = new NetworkManager()
    this.networkManager.connect()

    // Dev test API — expose under globalThis.__GAME__ for Playwright E2E
    if (typeof globalThis !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(globalThis as any).__GAME__ = {
        // Jump horde director to wave N (triggers boss logic at multiples of 10)
        skipToWave: (n: number) => {
          if (!this.hordeDirector) return false
          this.hordeDirector.wave = Math.max(1, Math.floor(n) - 1)
          this.hordeDirector.enemies.forEach(e => (e.hp = 0))
          // force wave transition on next update
          ;(this.hordeDirector as unknown as { enemiesLeftToSpawn: number }).enemiesLeftToSpawn = 0
          useGameStore.getState().setMatchState({ wave: Math.max(1, Math.floor(n) - 1), enemiesAlive: 0 })
          return true
        },
        spawnBoss: () => {
          this.hordeDirector?.spawnBoss()
          this.syncEnemyCount()
          return true
        },
        killAllEnemies: () => {
          this.hordeDirector?.enemies.forEach(e => (e.hp = 0))
          return this.hordeDirector?.enemies.length ?? 0
        },
        collectAllScrap: () => {
          const collected = this.scraps.reduce((sum, scrap) => sum + scrap.debugCollect(), 0)
          this.scraps.length = 0
          return collected
        },
        killAndCollectAllEnemies: () => {
          const before = this.hordeDirector?.enemies.length ?? 0
          this.hordeDirector?.enemies.forEach(e => (e.hp = 0))
          this.flushEnemyDrops()
          const collected = this.scraps.reduce((sum, scrap) => sum + scrap.debugCollect(), 0)
          this.scraps.length = 0
          return { killed: before, collected }
        },
        killVehicle: () => {
          useGameStore.getState().setMatchState({ health: 0 })
          useGameStore.getState().endRun("Died")
          return true
        },
        forceExtraction: () => {
          if (!this.runController) return false
          ;(this.runController as unknown as { extractionDeployed: boolean; targetExtractionWave: number })
            .targetExtractionWave = 1
          return true
        },
        debugClearEnemies: () => {
          if (!this.hordeDirector) return false
          for (const enemy of this.hordeDirector.enemies) {
            this.scene.remove(enemy.group)
          }
          this.hordeDirector.enemies.length = 0
          this.hordeDirector.scrapSpawnQueue.length = 0
          this.syncEnemyCount()
          return true
        },
        debugSpawnEnemy: (kind: 'mob' | 'heavy' | 'boss', x: number, z: number, hpPct?: number, freeze?: boolean) =>
          this.spawnDebugEnemy(kind, x, z, hpPct ?? 1, freeze ?? true),
        debugSpawnRing: (
          kind: 'mob' | 'heavy' | 'boss',
          count: number,
          radiusMin: number,
          radiusMax: number,
          hpPct?: number,
          freeze?: boolean,
        ) => this.spawnDebugRing(kind, count, radiusMin, radiusMax, hpPct ?? 1, freeze ?? true),
        debugSetRemainingSpawns: (count: number) => {
          if (!this.hordeDirector) return false
          ;(this.hordeDirector as unknown as { enemiesLeftToSpawn: number }).enemiesLeftToSpawn = Math.max(0, Math.floor(count))
          return true
        },
        snapshot: () => ({
          enemies: this.hordeDirector?.enemies.length ?? 0,
          bosses:  this.hordeDirector?.enemies.filter(e => e.isBoss).length ?? 0,
          sentries: this.sentries.length,
          toxicZones: this.toxicZones.length,
          projectiles: this.projectiles.length,
          scraps: this.scraps.length,
          hordeWave: this.hordeDirector?.wave,
          vehiclePos: this.vehicle ? { x: this.vehicle.position.x, z: this.vehicle.position.z } : null,
        }),
      }
    }
  }

  private onWeaponFired = (): void => {
    this.cameraShakeIntensity = Math.min(this.cameraShakeIntensity + 0.1, this.maxShake)
  }

  private onGlobalKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape') return

    const state = useGameStore.getState()
    if (state.isSettingsOpen) {
      event.preventDefault()
      state.toggleSettings()
      return
    }

    if (state.phase === 'InPlay' || state.isPaused) {
      event.preventDefault()
      state.togglePause()
    }
  }

  private unsubscribePhase?: () => void
  private prevPhase: string = "Loading"

  private initGameplay(): void {
    // 4. Vehicle & HUD
    this.vehicle = new Vehicle(new THREE.Vector3(0, 0, 0))
    this.scene.add(this.vehicle.group)

    this.hud = new HUD()

    // 5. Horde Logic
    this.hordeDirector = new HordeDirector(this.scene, this.vehicle, { stress: this.stressMode })
    this.extractionZone = new ExtractionZone()
    this.scene.add(this.extractionZone.group)

    this.runController = new RunController(this.hordeDirector, this.extractionZone)

    // Environmental hazards
    this.minefield = new Minefield(12)
    this.scene.add(this.minefield.group)

    this.scene.add(FXManager.getInstance().visualGroup)
    

    this.updateCamera(true)
  }

  private resetArena(): void {
    // Remove all enemies
    for (const e of this.hordeDirector.enemies) this.scene.remove(e.group)
    this.hordeDirector.enemies.length = 0
    this.hordeDirector.scrapSpawnQueue.length = 0
    // Remove projectiles
    for (const p of this.projectiles) this.scene.remove(p.group)
    this.projectiles.length = 0
    // Remove scraps
    for (const s of this.scraps) this.scene.remove(s.group)
    this.scraps.length = 0
    // Remove toxic zones
    for (const tz of this.toxicZones) tz.dispose(this.scene)
    this.toxicZones.length = 0
    // Remove sentries
    for (const s of this.sentries) s.dispose(this.scene)
    this.sentries.length = 0
    // Reset vehicle
    this.vehicle.group.position.set(0, 0, 0)
    // Reset extraction + run controller + horde director by rebuilding
    this.scene.remove(this.extractionZone.group)
    this.hordeDirector = new HordeDirector(this.scene, this.vehicle, { stress: this.stressMode })
    this.extractionZone = new ExtractionZone()
    this.scene.add(this.extractionZone.group)
    this.runController = new RunController(this.hordeDirector, this.extractionZone)
    // Rebuild minefield with fresh mine positions
    this.minefield.dispose(this.scene)
    this.minefield = new Minefield(12)
    this.scene.add(this.minefield.group)
    this.cameraShakeIntensity = 0
  }

  async start(): Promise<void> {
    try {
      await AssetManager.getInstance().preloadAll()
      this.initGameplay()
      useGameStore.getState().bootFromSave()
      useGameStore.getState().enterHub()
      this.renderer.setAnimationLoop(this.loop)
    } catch(e) {
      console.error(e)
      useGameStore.getState().bootFromSave()
      useGameStore.getState().enterHub()
      this.renderer.setAnimationLoop(this.loop)
    }

    // Subscribe to phase transitions: reset arena on Hub → InPlay
    this.unsubscribePhase = useGameStore.subscribe((state) => {
      const cur = state.phase
      if (this.prevPhase !== cur) {
        const old = this.prevPhase
        this.prevPhase = cur // Update BEFORE potentially triggering another state update
        if (cur === "InPlay" && (old === "Hub" || old === "WaitingToStart")) {
          this.resetArena()
        }
      }
    })
  }

  private flushEnemyDrops(): void {
    this.hordeDirector.update(0)
    while (this.hordeDirector.scrapSpawnQueue.length > 0) {
      const item = this.hordeDirector.scrapSpawnQueue.pop()!
      const scrap = new Scrap(item.pos, item.isLegendary, item.value)
      this.scraps.push(scrap)
      this.scene.add(scrap.group)
    }
  }

  private buildEnemyTelemetry(): EnemyTelemetry {
    const enemies = this.hordeDirector?.enemies.filter(e => !e.isDead()) ?? []
    if (enemies.length === 0) {
      return this.emptyEnemyTelemetry()
    }

    this.camera.updateMatrixWorld()

    const rawMarkers = enemies.map((enemy, index) => {
      const anchor = enemy.position.clone()
      anchor.y += enemy.isBoss ? 4.8 : enemy.radius + 1.7
      const cameraSpace = this.camera.worldToLocal(anchor.clone())
      const projected = anchor.project(this.camera)

      const inClip = projected.z > -1 && projected.z < 1
      const onScreen = inClip && Math.abs(projected.x) <= 0.92 && Math.abs(projected.y) <= 0.86

      let x = projected.x * 0.5 + 0.5
      let y = projected.y * -0.5 + 0.5
      let angle = 0

      if (!onScreen) {
        const dir = new THREE.Vector2(projected.x, projected.y)
        if (cameraSpace.z > 0) dir.multiplyScalar(-1)
        if (dir.lengthSq() < 0.0001) dir.set(0, -1)
        dir.normalize()
        angle = Math.atan2(dir.y, dir.x)
        x = THREE.MathUtils.clamp(0.5 + dir.x * 0.43, 0.08, 0.92)
        y = THREE.MathUtils.clamp(0.5 - dir.y * 0.34, 0.16, 0.8)
      }

      return {
        id: `${enemy.isBoss ? 'boss' : 'mob'}-${index}`,
        x,
        y,
        hpPct: enemy.getHpRatio(),
        count: 1,
        isBoss: enemy.isBoss,
        offscreen: !onScreen,
        angle,
        distance: enemy.position.distanceTo(this.vehicle.position),
      }
    })

    const visibleMarkers = rawMarkers.filter(marker => !marker.offscreen)
    const offscreenGroups = new Map<number, EnemyTelemetry['markers'][number]>()

    for (const marker of rawMarkers.filter(candidate => candidate.offscreen)) {
      const sector = Math.round(marker.angle / (Math.PI / 4))
      const existing = offscreenGroups.get(sector)
      if (!existing) {
        offscreenGroups.set(sector, { ...marker })
        continue
      }

      existing.count += 1
      existing.hpPct = Math.max(existing.hpPct, marker.hpPct)
      existing.distance = Math.min(existing.distance, marker.distance)
      if (marker.isBoss) existing.isBoss = true
    }

    const markers = [
      ...visibleMarkers,
      ...Array.from(offscreenGroups.values()),
    ]

    const boss = enemies.find(enemy => enemy.isBoss) as ({ hp: number; maxHp: number; type?: string } & typeof enemies[number]) | undefined

    return {
      total: enemies.length,
      visible: visibleMarkers.length,
      offscreen: rawMarkers.length - visibleMarkers.length,
      markers: markers
        .sort((a, b) => Number(a.offscreen) - Number(b.offscreen) || Number(b.isBoss) - Number(a.isBoss) || a.distance - b.distance),
      bossLabel: boss ? ((boss.type ?? 'boss').replace(/_/g, ' ').toUpperCase()) : null,
      bossHp: boss?.hp ?? 0,
      bossMaxHp: boss?.maxHp ?? 0,
    }
  }

  destroy(): void {
    this.renderer.setAnimationLoop(null)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('WEAPON_FIRED', this.onWeaponFired as EventListener)
    window.removeEventListener('keydown', this.onGlobalKeyDown)
    this.unsubscribePhase?.()
    this.renderer.dispose()
  }

  /* ───────────────────────────── Game Loop ───────────────────────────── */

  private readonly loop = (): void => {
    FpsProfiler.beginFrame()
    const delta = Math.min(this.clock.getDelta(), 0.05)
    // Optional global time scale
    const timeScale = 1.0
    const scaledDelta = delta * timeScale
    const state = useGameStore.getState()
    
    // 1. Play state
    if (state.phase === "InPlay" && !state.isPaused) {
       // -- FX Init (one time check) --
       FXManager.getInstance().setScene(this.scene)

      // Show/Hide Performance optimization: ensure entities are shown
      this.hordeDirector.enemies.forEach(e => e.group.visible = true)
      this.projectiles.forEach(p => p.group.visible = true)
      this.scraps.forEach(s => s.group.visible = true)

      // -- FX Update --
      FXManager.getInstance().update(scaledDelta)
      this.particleSystem.update(scaledDelta)

      // Update LOD based on camera position
      this.particleLOD.setCameraPosition(this.camera.position)

      // Record performance metrics
      this.performanceMonitor.recordFrame(delta * 1000) // Convert to ms
      this.performanceMonitor.recordParticles(1000 - this.particleSystem.availableCount) // Active particles

      // Check for frame drops and enable stress mode if needed
      if (this.performanceMonitor.isDropping) {
        this.particleLOD.setStressMode(true)
      }

      // -- Active Ability Check --
      if (this.input.wasAbilityPressed) {
        const actingChar = useGameStore.getState().useAbility()
        
        if (actingChar === "rixa") {
          // Rixa: "Chrom-Alchemie" Blast (15 aoe damage, 10 radius)
          this.cameraShakeIntensity = Math.max(this.cameraShakeIntensity, 0.4)
          useGameStore.getState().showCallout(t("callout.ability.rixa", undefined, useGameStore.getState().locale), 1500)
          
          // FX: Radioactive Green Blast
          AssetManager.getInstance().playSound('levelup') // Heavy boom
          FXManager.getInstance().spawnExplosion(this.vehicle.position, 0x00ffaa, true)

          const storeState = useGameStore.getState()
          const baseDamage = 30
          const finalDamage = applyCharacterTraitDamage(
            baseDamage,
            storeState.character,
            this.hordeDirector.enemies,
            this.vehicle.position,
            12
          )

          for (const e of this.hordeDirector.enemies) {
            if (e.position.distanceTo(this.vehicle.position) < 12) {
              e.takeDamage(finalDamage)
            }
          }

          // Alchemical Trail — leave a lingering toxic ground zone
          const trail = new ToxicZone(this.vehicle.position.clone(), 7, 5, 10)
          this.scene.add(trail.group)
          this.toxicZones.push(trail)
        } else if (actingChar === "marek") {
          // Marek: "DROHNEN-WACHT" — deploy a sentry turret + magnetic pulse
          this.cameraShakeIntensity = Math.max(this.cameraShakeIntensity, 0.5)
          useGameStore.getState().showCallout(t("callout.ability.marek", undefined, useGameStore.getState().locale), 1500)

          AssetManager.getInstance().playSound('levelup')
          FXManager.getInstance().spawnExplosion(this.vehicle.position, 0xc9b7ff, true)

          // Magnetic pulse: push nearby enemies away
          for (const e of this.hordeDirector.enemies) {
            const dist = e.position.distanceTo(this.vehicle.position)
            if (dist < 15) {
              e.stunTimer = 2.0
              const pushDir = e.position.clone().sub(this.vehicle.position).normalize()
              e.group.position.addScaledVector(pushDir, 4.0)
            }
          }

          // Deploy sentry at current position
          const sentry = new Sentry(this.vehicle.position.clone())
          this.scene.add(sentry.group)
          this.sentries.push(sentry)
        }
      }

      this.vehicle.update(scaledDelta, this.input)

      // Sync network
      this.networkManager.sendUpdate(this.vehicle.position, this.vehicle.quaternion)
      this.networkManager.update(scaledDelta)

      // Sync nitro state to store for HUD
      useGameStore.getState().setMatchState({
        nitroCharges:    this.vehicle.nitroCharges,
        nitroChargesMax: this.vehicle.nitroChargesMax,
        nitroCooldown:   this.vehicle.nitroCooldown,
        nitroCooldownMax: this.vehicle.nitroCooldownMax,
      })
      
      // Spark trail if moving fast
      if (Math.abs(this.vehicle.speed) > 10) {
        FXManager.getInstance().spawnSparkTrail(this.vehicle.position)
      }
      
      // Update Weapon auto-shoot
      this.weapon.update(scaledDelta, this.vehicle, this.hordeDirector.enemies, this.projectiles, this.scene)
      
      // Update Projectiles
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i]
        p.update(scaledDelta, this.hordeDirector.enemies)
        if (p.isDead) {
          this.scene.remove(p.group)
          this.projectiles.splice(i, 1)
        }
      }
      
      // Spawning scrap from HordeDirector queue
      this.flushEnemyDrops()
      
      // Update Scrap
      for (let i = this.scraps.length - 1; i >= 0; i--) {
        const s = this.scraps[i]
        s.update(scaledDelta, this.vehicle)
        if (s.isCollected) {
          this.scene.remove(s.group)
          this.scraps.splice(i, 1)
        }
      }

      // Update Toxic Zones (Alchemical Trail)
      for (let i = this.toxicZones.length - 1; i >= 0; i--) {
        const tz = this.toxicZones[i]
        tz.update(scaledDelta, this.hordeDirector.enemies)
        if (tz.isDone) {
          tz.dispose(this.scene)
          this.toxicZones.splice(i, 1)
        }
      }

      // Update Sentries (Drohnen-Wacht)
      for (let i = this.sentries.length - 1; i >= 0; i--) {
        const sentry = this.sentries[i]
        const proj = sentry.update(scaledDelta, this.hordeDirector.enemies)
        if (proj) {
          this.projectiles.push(proj)
          this.scene.add(proj.group)
        }
        if (sentry.isDone) {
          sentry.dispose(this.scene)
          this.sentries.splice(i, 1)
        }
      }

      this.minefield.update(scaledDelta, this.vehicle)
      this.runController.update(scaledDelta)
      this.extractionZone.update(scaledDelta, this.vehicle)
      
      // -- Story Logic --
      StoryManager.getInstance().update()
      
      // -- Sprite Updates (Pseudo-3D) --
      this.vehicle.updateSprite(this.camera)
      for (const e of this.hordeDirector.enemies) {
        e.updateSprite(this.camera)
      }

      // Decay camera shake
      if (this.cameraShakeIntensity > 0) {
        this.cameraShakeIntensity -= scaledDelta * 1.5
        if (this.cameraShakeIntensity < 0) this.cameraShakeIntensity = 0
      }
    } else {
      // PERFORMANCE: Hide entities when not in active play
      this.hordeDirector.enemies.forEach(e => e.group.visible = false)
      this.projectiles.forEach(p => p.group.visible = false)
      this.scraps.forEach(s => s.group.visible = false)
    }


    // 3. Camera (Chase Cam P0.1)
    this.updateCamera(false)
    const enemyTelemetry = state.phase === "InPlay" ? this.buildEnemyTelemetry() : this.emptyEnemyTelemetry()
    useGameStore.getState().setMatchState({ enemyTelemetry })

      this.hud.update(
        this.hordeDirector.wave, 
        this.hordeDirector.enemies.length, 
        state.health, 
        state.phase
      )

    // 5. Render
    this.renderer.render(this.scene, this.camera)

    // 6. Clear input
    this.input.endFrame()

    // 7. FPS profiling sample
    FpsProfiler.endFrame({
      enemies: this.hordeDirector?.enemies.length ?? 0,
      projectiles: this.projectiles.length,
      scraps: this.scraps.length,
      toxicZones: this.toxicZones.length,
      sentries: this.sentries.length,
      hordeWave: this.hordeDirector?.wave ?? 0,
    })
  }


  /* ─────────────────────── Camera ────────────────────────── */

  private updateCamera(snap: boolean): void {
    // Chase camera follows the vehicle's backend continuously
    const carPos = this.vehicle.position.clone()
    
    // We want to look behind the direction the car is FACING, not moving
    const facing = this.vehicle.facingDir
    
    // Position camera behind and above
    const offset = facing.clone().multiplyScalar(-this.cameraDistance)
    offset.y += this.cameraHeight
    
    const desiredPos = carPos.clone().add(offset)
    
    // Look at slightly above the car
    const lookTarget = carPos.clone()
    lookTarget.y += 1.5

    if (snap) {
      this.camera.position.copy(desiredPos)
      this.camera.lookAt(lookTarget)
    } else {
      // Smooth interpolation for camera position
      this.camera.position.lerp(desiredPos, 0.1)
      this.camera.lookAt(lookTarget)
    }

    // Apply Shake Offset
    if (this.cameraShakeIntensity > 0) {
      const offsetX = (Math.random() - 0.5) * this.cameraShakeIntensity
      const offsetY = (Math.random() - 0.5) * this.cameraShakeIntensity
      const offsetZ = (Math.random() - 0.5) * this.cameraShakeIntensity
      this.camera.position.x += offsetX
      this.camera.position.y += offsetY
      this.camera.position.z += offsetZ
    }
  }

  /* ─────────────────────── Resize / Wheel ────────────────────────── */

  private readonly onResize = (): void => {
    const w = this.container.clientWidth || window.innerWidth
    const h = this.container.clientHeight || window.innerHeight
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  private readonly onWheel = (e: WheelEvent): void => {
    this.cameraDistance = THREE.MathUtils.clamp(
      this.cameraDistance + e.deltaY * 0.05,
      20, 150
    )
  }

  /* ─────────────────────── Public Accessors ────────────────────────── */

  getParticleSystem(): ParticleSystem {
    return this.particleSystem
  }

  getPerformanceMonitor(): PerformanceMonitor {
    return this.performanceMonitor
  }

  getParticleLOD(): ParticleLOD {
    return this.particleLOD
  }
}
