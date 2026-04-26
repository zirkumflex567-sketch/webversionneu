import * as THREE from 'three'
import { Vehicle } from './Vehicle'
import { Enemy } from './Enemy'
import { ARENA_BOUNDS } from './World'
import { useGameStore } from '../store'
import { getWaveConfig, WaveData } from './WaveConfig'
import { Boss } from './Boss'
import { HeavyEnemy } from './HeavyEnemy'
import { FXManager } from './FXManager'
import { SFX } from '../audio/SFX'
import { NightmareEnemy } from './NightmareEnemy'
import { useStoryStore } from '../store/StoryStore'
import { GlassShard, CrystalFiend } from './GlassEnemy'
import { t } from '../i18n'

export interface HordeOptions {
  /** Stress mode: seed wave 4 + pre-burst maxAlive enemies + spawn boss + disable auto-extraction. */
  stress?: boolean
}

export class HordeDirector {
  enemies: Enemy[] = []
  private scene: THREE.Scene
  private vehicle: Vehicle

  private spawnTimer = 0
  public wave = 1
  private config: WaveData
  private enemiesLeftToSpawn = 0
  public scrapSpawnQueue: {pos: THREE.Vector3, isLegendary: boolean, value: number}[] = []

  /** If true, wave-5 auto-extraction is suppressed so profiling can continue. */
  public readonly stressMode: boolean

  constructor(scene: THREE.Scene, vehicle: Vehicle, opts: HordeOptions = {}) {
    this.scene = scene
    this.vehicle = vehicle
    this.stressMode = !!opts.stress

    if (this.stressMode) {
      // Start at wave 4 (maxAlive 30, heavyRatio 0.25) and immediately
      // spawn the full maxAlive roster + a boss. Profiling-only.
      this.wave = 4
      this.config = getWaveConfig(this.wave)
      const burst = this.config.maxAlive
      for (let i = 0; i < burst; i++) this.spawnEnemy()
      this.enemiesLeftToSpawn = Math.max(0, this.config.enemiesToSpawn - burst)
      this.spawnTimer = this.config.spawnInterval
      try { this.spawnBoss() } catch { /* boss system not ready yet */ }
    } else {
      this.config = getWaveConfig(this.wave)
      this.enemiesLeftToSpawn = this.config.enemiesToSpawn
      this.spawnTimer = this.config.spawnInterval
    }

    useGameStore.getState().setMatchState({ wave: this.wave, enemiesAlive: this.enemies.length })
  }

  update(delta: number): void {
    const state = useGameStore.getState()
    if (state.phase !== "InPlay" || state.isPaused) return
    
    // Spawning logic (respect bounty enemyMaxAliveMult)
    const maxAlive = Math.ceil(this.config.maxAlive * state.bountyMult.enemyMaxAliveMult)
    
    if (this.enemiesLeftToSpawn > 0) {
      if (this.enemies.length < maxAlive) {
        this.spawnTimer -= delta
        if (this.spawnTimer <= 0) {
          this.spawnEnemy()
          this.enemiesLeftToSpawn--
          this.spawnTimer = this.config.spawnInterval
          useGameStore.getState().setMatchState({ enemiesAlive: this.enemies.length })
        }
      }
    } else if (this.enemies.length === 0) {
      this.startNextWave()
    }
    
    // Update active enemies
    const deadEnemies: Enemy[] = []

    for (const enemy of this.enemies) {
      enemy.update(delta, this.vehicle, this.enemies)

      if (enemy.isDead()) {
        deadEnemies.push(enemy)
        this.scrapSpawnQueue.push({ pos: enemy.position.clone(), isLegendary: enemy.isBoss, value: enemy.scrapValue })
        useGameStore.getState().recordKill(enemy instanceof NightmareEnemy)
        
        // --- FX: EXPLOSION ---
        const isHeavy = enemy instanceof HeavyEnemy
        const fxColor = enemy.isBoss ? 0xffaa00 : isHeavy ? 0xff6600 : 0x00ff88
        FXManager.getInstance().spawnExplosion(enemy.position, fxColor, enemy.isBoss || isHeavy)
      } else {
        // Basic collision / damage to player
        const dist = enemy.position.distanceTo(this.vehicle.position)
        if (dist < 1.5) {
          this.dealDamageToVehicle(enemy.damage * delta)
        }
      }
    }

    // Cleanup dead enemies
    let diedThisFrame = false
    for (const dead of deadEnemies) {
      this.scene.remove(dead.group)
      const idx = this.enemies.indexOf(dead)
      if (idx !== -1) this.enemies.splice(idx, 1)
      diedThisFrame = true
    }
    
    if (diedThisFrame) {
      useGameStore.getState().setMatchState({ enemiesAlive: this.enemies.length })
    }
  }


  private spawnEnemy(): void {
    const boundX = ARENA_BOUNDS.halfLength - 2
    const boundZ = ARENA_BOUNDS.halfWidth - 2

    const playerPos = this.vehicle.position.clone()
    let startPos = new THREE.Vector3(boundX, 0, boundZ) // Fallback

    for (let attempt = 0; attempt < 12; attempt++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 25 + Math.random() * 15 // Increased for visibility
      const candidate = new THREE.Vector3(
        THREE.MathUtils.clamp(playerPos.x + Math.cos(angle) * radius, -boundX, boundX),
        0,
        THREE.MathUtils.clamp(playerPos.z + Math.sin(angle) * radius, -boundZ, boundZ),
      )

      if (candidate.distanceTo(playerPos) >= 20) {
        startPos = candidate
        break
      }
    }

    // Determine enemy type
    const storyState = useStoryStore.getState();
    const isGlassPlains = storyState.activeQuests.some(
      (q) => q.region === 'Sonnenglasweite'
    );
    
    const isNachtflutQuest = storyState.activeQuests.some(q => 
      ['MQ-01', 'MQ-11', 'MQ-14', 'MQ-19', 'MQ-21', 'MQ-22'].includes(q.id)
    );
    
    const nightmareRatio = isNachtflutQuest ? 0.2 : (this.wave > 10 ? 0.1 : 0.0);
    const heavyRatio = this.config.heavyRatio;

    let enemy: Enemy;
    const r = Math.random();
    
    if (isGlassPlains) {
       if (r < 0.4) {
         enemy = new GlassShard(startPos);
       } else if (r < 0.6) {
         enemy = new CrystalFiend(startPos);
       } else if (r < 0.6 + heavyRatio) {
         enemy = new HeavyEnemy(startPos);
       } else {
         enemy = new Enemy(startPos);
       }
    } else {
      if (r < nightmareRatio) {
        enemy = new NightmareEnemy(startPos, Math.random() > 0.7 ? 'heavy' : 'drone');
      } else if (r < nightmareRatio + heavyRatio) {
        enemy = new HeavyEnemy(startPos);
      } else {
        enemy = new Enemy(startPos);
      }
    }

    enemy.speed *= this.config.enemySpeedModifier
    enemy.hp    *= this.config.enemyHpModifier
    enemy.maxHp = enemy.hp

    this.enemies.push(enemy)
    this.scene.add(enemy.group)
  }

  private startNextWave(): void {
    this.wave++
    this.config = getWaveConfig(this.wave)
    this.enemiesLeftToSpawn = this.config.enemiesToSpawn
    this.spawnTimer = this.config.spawnInterval
    
    useGameStore.getState().setMatchState({ wave: this.wave })
    useStoryStore.getState().notifyEvent('wave', this.wave - 1)

    // Extraction is driven by ExtractionZone (5 s hold). HordeDirector keeps
    // spawning waves indefinitely so pressure continues while the player holds.

    if (this.wave === 3 || this.wave % 10 === 0) {
      const locale = useGameStore.getState().locale
      useGameStore.getState().showCallout(t("callout.boss.incoming", undefined, locale), 4000, 'boss')
      try { SFX.bossSting() } catch { /* audio not ready */ }
      this.spawnBoss()
    } else {
      const locale = useGameStore.getState().locale
      useGameStore.getState().showCallout(t("callout.wave.number", { wave: this.wave }, locale), 2000)
    }
  }

  public spawnBoss(): void {
    // Alternate boss types based on wave
    const type = Math.floor(this.wave / 10) % 2 === 0 ? 'mireking' : 'golem'
    const startPos = new THREE.Vector3(0, 0, 20)
    const boss = new Boss(startPos, type)
    
    boss.hp *= this.config.enemyHpModifier
    boss.maxHp = boss.hp
    
    this.enemies.push(boss)
    this.scene.add(boss.group)
    useGameStore.getState().setMatchState({ enemiesAlive: this.enemies.length })
  }

  private dealDamageToVehicle(amount: number): void {
    const state = useGameStore.getState()
    if (state.phase !== "InPlay") return

    // Marek Passive / Tech-Lab shield logic: Shield takes damage first
    if (state.shield > 0) {
      const shieldDmg = amount // shield is 1:1 for now
      let newShield = state.shield - shieldDmg
      if (newShield < 0) {
          // Carry over to health
          const remainder = -newShield
          newShield = 0
          this.applyHealthDamage(remainder)
      }
      useGameStore.getState().setMatchState({ shield: newShield })
      // FX: Impact
      FXManager.getInstance().spawnImpact(this.vehicle.position, 0xc9b7ff)
    } else {
      this.applyHealthDamage(amount)
      // FX: Metal sparks
      FXManager.getInstance().spawnImpact(this.vehicle.position, 0xffaa00)
    }
  }

  private applyHealthDamage(amount: number): void {
    const state = useGameStore.getState()
    const mitigation = Math.max(0, 1 - state.modifiers.armor * 0.01)
    const effective = amount * state.modifiers.incomingDamageMult * mitigation
    let newHealth = state.health - effective
    
    if (newHealth <= 0) {
      useGameStore.getState().setMatchState({ health: 0 })
      const locale = useGameStore.getState().locale
      useGameStore.getState().showCallout(t("callout.vehicle.destroyed", undefined, locale), 3000)
      useGameStore.getState().endRun("Died")
    } else {
      useGameStore.getState().setMatchState({ health: newHealth })
    }
  }
}
