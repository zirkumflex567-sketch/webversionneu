import { create } from 'zustand'
import { SaveManager, computeBankedResources } from './save/SaveManager'
import { MetaProgress, RunData, RunOutcome, CharacterId, defaultRunData } from './save/SaveSchema'
import { CHARACTERS, computeSkillStats, computeSynergyBonuses, computeNPCBonuses } from './data/CharacterData'
import { useStoryStore } from './store/StoryStore'
import { aggregateBountyEffects, BountyRuntimeMultipliers } from './data/BountyData'
import { SHOP_ITEMS } from './data/ShopData'
import { UpgradeData, UPGRADE_POOL, rollRandomUpgrades } from './data/UpgradeData'
import { authAPI } from './auth/AuthAPI'
import { useAuthStore } from './auth/AuthStore'
import { getSocket } from './multiplayerStore'
import { t, type Locale } from './i18n'

export type GamePhase =
  | "Auth"               // Login gate
  | "Loading"
  | "Hub"               // Garage hub (character select, shop, skill tree)
  | "BountySelection"   // Select pre-match modifiers (bounties)
  | "WaitingToStart"    // Loadout confirmed, entering arena
  | "InPlay"
  | "Extraction"
  | "GameOver"
  | "RunSummary"
  | "UpgradeSelection"

export interface RunModifiers {
  speedMult: number
  damageBonus: number
  fireRateMult: number
  scrapMult: number
  techMult: number
  armor: number
  critChance: number
  critDamage: number
  pickupRadius: number
  incomingDamageMult: number
  droneCount: number
  shieldOnPickup: number
  lifesteal: number
  statusChance: number
  controlDuration: number
}

function defaultModifiers(): RunModifiers {
  return {
    speedMult: 1.0,
    damageBonus: 0,
    fireRateMult: 1.0,
    scrapMult: 1.0,
    techMult: 1.0,
    armor: 0,
    critChance: 0,
    critDamage: 0,
    pickupRadius: 0,
    incomingDamageMult: 1.0,
    droneCount: 0,
    shieldOnPickup: 0,
    lifesteal: 0,
    statusChance: 0,
    controlDuration: 0,
  }
}

export interface RunLoadout {
  character: CharacterId
  vehicleId: string
  weaponId: string
  bountyIds: string[]
}

export interface EnemyMarker {
  id: string
  x: number
  y: number
  hpPct: number
  count: number
  isBoss: boolean
  offscreen: boolean
  angle: number
  distance: number
}

export interface EnemyTelemetry {
  total: number
  visible: number
  offscreen: number
  markers: EnemyMarker[]
  bossLabel: string | null
  bossHp: number
  bossMaxHp: number
}

function defaultEnemyTelemetry(): EnemyTelemetry {
  return {
    total: 0,
    visible: 0,
    offscreen: 0,
    markers: [],
    bossLabel: null,
    bossHp: 0,
    bossMaxHp: 0,
  }
}

export interface GameState {
  // Horde Survival State
  wave: number
  enemiesAlive: number
  totalKills: number
  nightmareKills: number
  enemiesKilledThisRun: number
  health: number
  maxHealth: number
  scrap: number         // In-run scrap
  tech: number          // In-run tech
  experience: number    // In-run XP (resets each run)
  level: number
  xpToNextLevel: number
  phase: GamePhase
  character: CharacterId | null
  runStartMs: number
  abilityUses: number
  shield: number
  maxShield: number

  isPaused: boolean

  // Nitro Dash HUD state (set each frame by Vehicle)
  nitroCharges: number
  nitroChargesMax: number
  nitroCooldown: number
  nitroCooldownMax: number

  runUpgrades: Record<string, number>
  offeredUpgrades: UpgradeData[]

  // Meta / persistent (mirrored from SaveManager)
  meta: MetaProgress

  // UI
  callout: string | null
  calloutKey: number
  calloutVariant: 'normal' | 'boss' | 'warning'
  enemyTelemetry: EnemyTelemetry

  // Settings
  locale: Locale
  polygonMode: boolean
  audioEnabled: boolean
  volume: number

  modifiers: RunModifiers
  loadout: RunLoadout | null
  bountyMult: BountyRuntimeMultipliers

  // Auth
  userId: string | null

  // -------- actions --------
  showCallout: (text: string, duration?: number, variant?: 'normal' | 'boss' | 'warning') => void
  setMatchState: (state: Partial<GameState>) => void
  bootFromSave: () => void
  setPhase: (phase: GamePhase) => void

  // Hub
  enterHub: () => void
  configureLoadout: (loadout: RunLoadout) => void
  startBountySelection: () => void

  // Run lifecycle
  startGame: (character: CharacterId) => void  // legacy quick-start (used by old overlay)
  startRun: () => void
  endRun: (outcome: RunOutcome) => void

  // In-run updates
  addScrapInRun: (baseAmount: number) => void
  addTechInRun: (baseAmount: number) => void
  recordKill: (isNightmare?: boolean) => void

  // Upgrade choice (level-up)
  applyUpgrade: (id: string) => void

  // Meta
  refreshMeta: () => void
  tryBuyShop: (id: string) => boolean
  tryRankUpSkill: (char: CharacterId, nodeId: string) => boolean

  // Settings
  isSettingsOpen: boolean
  setPolygonMode: (enabled: boolean) => void
  setAudioEnabled: (enabled: boolean) => void
  setLocale: (locale: Locale) => void
  toggleSettings: () => void
  togglePause: () => void
  useAbility: () => CharacterId | null

  // Auth sync
  setUserId: (id: string | null) => void
  syncProgress: () => Promise<void>
  loadProgressFromServer: () => Promise<void>
}

// Playwright / dev test hook — expose store on window for inspection.
// This is a zero-cost read hook: it does not interfere with normal gameplay.
declare global {
  var __GAME_STORE__: { getState: () => GameState; setState: (s: Partial<GameState>) => void } | undefined
}

export const useGameStore = create<GameState>((set, get) => ({
  wave: 1,
  enemiesAlive: 0,
  totalKills: 0,
  nightmareKills: 0,
  enemiesKilledThisRun: 0,
  health: 100,
  maxHealth: 100,
  scrap: 0,
  tech: 0,
  experience: 0,
  level: 1,
  xpToNextLevel: 50,
  phase: "Auth",
  character: null,
  runStartMs: 0,
  abilityUses: 3,
  shield: 0,
  maxShield: 50,

  isPaused: false,
  isSettingsOpen: false,
  nitroCharges: 2,
  nitroChargesMax: 2,
  nitroCooldown: 0,
  nitroCooldownMax: 8,

  runUpgrades: {},
  offeredUpgrades: [],

  meta: SaveManager.getMeta(),

  callout: null,
  calloutKey: 0,
  calloutVariant: 'normal',
  enemyTelemetry: defaultEnemyTelemetry(),

  locale: "de",
  polygonMode: false,
  audioEnabled: true,
  volume: 0.5,

  modifiers: defaultModifiers(),
  loadout: null,
  bountyMult: aggregateBountyEffects([]),

  userId: null,

  // ----- callout -----
  showCallout: (text, duration = 3000, variant = 'normal') => {
    set((state) => ({ callout: text, calloutKey: state.calloutKey + 1, calloutVariant: variant }))
    setTimeout(() => {
      set((state) => (state.callout === text ? { callout: null, calloutVariant: 'normal' } : state))
    }, duration)
  },

  setMatchState: (stateUpdate) => set(stateUpdate),
  setPhase: (phase) => set({ phase }),

  // ----- boot -----
  bootFromSave: () => {
    const save = SaveManager.getSave()
    SaveManager.markSessionStart()
    set({ meta: save.metaProgress })
  },

  refreshMeta: () => set({ meta: { ...SaveManager.getMeta() } }),

  enterHub: () => {
    set({ phase: "Hub", callout: null, isPaused: false, isSettingsOpen: false, enemyTelemetry: defaultEnemyTelemetry() })
  },

  configureLoadout: (loadout) => {
    set({ loadout, character: loadout.character })
  },

  startBountySelection: () => {
    const loadout = get().loadout
    if (loadout) {
      set({ phase: "BountySelection" })
    }
  },

  // ----- run start -----
  startRun: () => {
    const loadout = get().loadout
    if (!loadout) {
      console.warn("startRun called without loadout; falling back to rixa starter")
      get().configureLoadout({
        character: "rixa",
        vehicleId: "vehicle_schrotty",
        weaponId: "weapon_autocannon",
        bountyIds: [],
      })
    }
    applyLoadoutAndStart(set, get)
  },

  // Legacy quick-start (for old overlay path). Assembles a minimal loadout.
  startGame: (character) => {
    get().configureLoadout({
      character,
      vehicleId: "vehicle_schrotty",
      weaponId: "weapon_autocannon",
      bountyIds: [],
    })
    applyLoadoutAndStart(set, get)
  },

  // ----- run end -----
  endRun: (outcome) => {
    const state = get()
    const loadout = state.loadout
    const run: RunData = {
      ...defaultRunData(),
      dateUnixMs: Date.now(),
      durationSeconds: Math.max(0, (Date.now() - state.runStartMs) / 1000),
      wave: state.wave,
      enemiesKilled: state.enemiesKilledThisRun,
      scrapEarned: state.scrap,
      techEarned: state.tech,
      experienceEarned: state.level,
      selectedCharacterId: loadout?.character ?? state.character ?? null,
      selectedVehicleId: loadout?.vehicleId ?? null,
      selectedBountyIds: loadout?.bountyIds ?? [],
      wasExtracted: outcome === "Extracted",
      outcome,
      playerCount: 1,
    }
    SaveManager.recordRun(run)
    const banked = computeBankedResources(run)
    const extracted = outcome === "Extracted"
    
    // Send score to leaderboard (score = enemiesKilled + (wave * 10) + scrapEarned)
    const socket = getSocket()
    if (socket && socket.connected) {
      const score = run.enemiesKilled + (run.wave * 10) + banked.scrap;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const playerName = (state.meta as any).displayName || `Pilot_${Math.floor(Math.random() * 1000)}`;
      socket.emit('update_score', { name: playerName, score });
    }

    set({
      phase: extracted ? "Hub" : "GameOver",
      isPaused: false,
      isSettingsOpen: false,
      enemyTelemetry: defaultEnemyTelemetry(),
      meta: { ...SaveManager.getMeta() },
      // keep run stats on state for summary display
      // (scrap/tech already show earned values)
      // expose banked via callout
    })
    state.showCallout(
      extracted
        ? t("callout.run.extracted", { scrap: banked.scrap, bonus: banked.extractionBonus, tech: banked.tech }, state.locale)
        : t("callout.run.wiped", { scrap: banked.scrap, techLost: banked.techLost }, state.locale),
      4000,
    )
  },

  // ----- in-run currency -----
  addScrapInRun: (baseAmount) => {
    const { scrap, modifiers, bountyMult, level, experience, xpToNextLevel, runUpgrades } = get()
    const gained = Math.floor(baseAmount * modifiers.scrapMult * bountyMult.scrapMult)

    let newExp = experience + gained
    let newLevel = level
    let newXpToNext = xpToNextLevel
    let newPhase = get().phase
    let newOffered = get().offeredUpgrades

    while (newExp >= newXpToNext) {
      newExp -= newXpToNext
      newLevel += 1
      newXpToNext = Math.floor(newXpToNext * 1.3)
      newPhase = "UpgradeSelection"
      newOffered = rollRandomUpgrades(3, runUpgrades)
    }

    set({
      scrap: scrap + gained,
      experience: newExp,
      level: newLevel,
      xpToNextLevel: newXpToNext,
      phase: newPhase,
      offeredUpgrades: newOffered,
    })
  },

  addTechInRun: (baseAmount) => {
    const { tech, modifiers, bountyMult } = get()
    const gained = Math.max(1, Math.floor(baseAmount * modifiers.techMult * bountyMult.techMult))
    set({ tech: tech + gained })
  },

  recordKill: (isNightmare?: boolean) => {
    const { experience, level, xpToNextLevel, enemiesKilledThisRun, runUpgrades, totalKills, nightmareKills } = get()
    // 10 XP per kill baseline
    let newExp = experience + 10
    let newLevel = level
    let newXpToNext = xpToNextLevel
    let newPhase = get().phase
    let newOffered = get().offeredUpgrades

    while (newExp >= newXpToNext) {
      newExp -= newXpToNext
      newLevel += 1
      // Quadratic scaling for XP: +30% per level
      newXpToNext = Math.floor(newXpToNext * 1.3)
      newPhase = "UpgradeSelection"
      newOffered = rollRandomUpgrades(3, runUpgrades)
    }

    set({ 
      enemiesKilledThisRun: enemiesKilledThisRun + 1,
      totalKills: totalKills + 1,
      nightmareKills: isNightmare ? nightmareKills + 1 : nightmareKills,
      experience: newExp,
      level: newLevel,
      xpToNextLevel: newXpToNext,
      phase: newPhase,
      offeredUpgrades: newOffered
    })
  },

  // ----- upgrade (level-up choice) -----
  applyUpgrade: (id) => set((state) => {
    const upgrade = UPGRADE_POOL.find(u => u.id === id)
    if (!upgrade) return state

    // Increment stack count
    const runUpgrades = { ...state.runUpgrades }
    runUpgrades[id] = (runUpgrades[id] || 0) + 1

    // Apply the logic mutating a draft
    const draftState = { ...state, modifiers: { ...state.modifiers }, runUpgrades, phase: "InPlay" as const, offeredUpgrades: [] as UpgradeData[] }
    upgrade.apply(draftState as unknown as GameState)

    return draftState as unknown as GameState
  }),

  // ----- meta economy -----
  tryBuyShop: (id) => {
    const item = SHOP_ITEMS.find(i => i.id === id)
    if (!item) return false
    if (SaveManager.isUnlocked(item.id, item.unlockType)) return false
    const ok = SaveManager.tryUnlock(item.id, item.unlockType, item.scrapCost, item.techCost)
    if (ok) set({ meta: { ...SaveManager.getMeta() } })
    return ok
  },

  tryRankUpSkill: (char, nodeId) => {
    const data = CHARACTERS[char]
    let node = null as null | (typeof data.branches[number]['nodes'][number])
    for (const b of data.branches) {
      const n = b.nodes.find(x => x.id === nodeId)
      if (n) { node = n; break }
    }
    if (!node) return false
    const current = SaveManager.getSkillRank(char, nodeId)
    if (current >= node.maxRanks) return false
    const ok = SaveManager.trySpendSkillTech(char, nodeId, node.techCost)
    if (ok) set({ meta: { ...SaveManager.getMeta() } })
    return ok
  },

  setPolygonMode: (enabled: boolean) => set({ polygonMode: enabled }),
  setAudioEnabled: (enabled: boolean) => set({ audioEnabled: enabled }),
  setLocale: (locale: Locale) => set({ locale }),
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  togglePause: () => {
    const { phase, isPaused } = get()
    if (phase === "InPlay" || phase === "UpgradeSelection") {
      set({ isPaused: !isPaused })
    }
  },
  useAbility: () => {
    const { phase, isPaused, abilityUses, character } = get()
    if (phase !== "InPlay" || isPaused || abilityUses <= 0 || !character) return null
    set({ abilityUses: abilityUses - 1 })
    return character
  },

  setUserId: (id) => set({ userId: id }),

  syncProgress: async () => {
    const state = get()
    if (!state.userId) return

    const token = useAuthStore.getState().token
    if (!token) return

    try {
      await authAPI.saveProgress(token, {
        meta: state.meta,
        health: state.health,
        maxHealth: state.maxHealth,
        scrap: state.scrap,
        tech: state.tech,
        level: state.level,
        wave: state.wave,
        enemiesKilledThisRun: state.enemiesKilledThisRun,
      })
    } catch (e) {
      console.error('Failed to sync progress:', e)
    }
  },

  loadProgressFromServer: async () => {
    const token = useAuthStore.getState().token
    if (!token) return

    try {
      const serverData = await authAPI.loadProgress(token) as Record<string, unknown>
      if (serverData) {
        const currentMeta = get().meta
        set({
          meta: (serverData.meta as MetaProgress) || currentMeta,
          health: (serverData.health as number) || 100,
          maxHealth: (serverData.maxHealth as number) || 100,
          scrap: (serverData.scrap as number) || 0,
          tech: (serverData.tech as number) || 0,
          level: (serverData.level as number) || 1,
          wave: (serverData.wave as number) || 1,
          enemiesKilledThisRun: (serverData.enemiesKilledThisRun as number) || 0,
        })
      }
    } catch (e) {
      console.error('Failed to load progress:', e)
    }
  },
}))

// Dev test hook — expose store to Playwright for functional verification
if (typeof globalThis !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).__GAME_STORE__ = {
    getState: useGameStore.getState,
    setState: useGameStore.setState,
  }
}

// Helper: apply loadout → modifiers → start run
function applyLoadoutAndStart(
  set: (partial: Partial<GameState>) => void,
  get: () => GameState,
): void {
  const loadout = get().loadout!
  const char = CHARACTERS[loadout.character]
  const meta = SaveManager.getMeta()
  const skillRanks = meta.skillTech[loadout.character] ?? {}
  const skillStats    = computeSkillStats(loadout.character, skillRanks)
  const synergyStats  = computeSynergyBonuses(loadout.character, skillRanks)
  const recruitedNPCs = useStoryStore.getState().npcs.filter(n => n.status === 'recruited' && n.bonus)
  const npcStats      = computeNPCBonuses(recruitedNPCs.map(n => n.bonus!))

  const mods = defaultModifiers()

  // character base stats
  mods.speedMult += char.baseStats.moveSpeedPercent / 100
  mods.critChance += char.baseStats.critChancePercent / 100
  mods.pickupRadius += char.baseStats.pickupRadiusPercent
  mods.armor += char.baseStats.armor

  // character-specific starter modifiers
  if (loadout.character === "rixa") {
    mods.damageBonus += 5
    mods.fireRateMult += 0.15
  } else if (loadout.character === "marek") {
    mods.scrapMult += 0.5
  }

  // skill stats (flat add per stat key)
  for (const [k, v] of Object.entries(skillStats)) {
    const key = k as keyof RunModifiers
    if (typeof v === "number" && typeof (mods as Record<keyof RunModifiers, number>)[key] === "number") {
      // If it's a multiplier (ends in Mult) or a percentage base stat, treat as percentage increase
      if (key.endsWith("Mult") || key === "speedMult" || key === "statusChance" || key === "critChance" || key === "lifesteal") {
        ;(mods as Record<keyof RunModifiers, number>)[key] += v / 100
      } else {
        // Otherwise treat as flat additive (armor, damageBonus, pickupRadius, shieldOnPickup)
        ;(mods as Record<keyof RunModifiers, number>)[key] += v
      }
    }
  }

  // Synergy bonuses (tier completion cross-branch bonuses)
  for (const [k, v] of Object.entries(synergyStats)) {
    const key = k as keyof RunModifiers
    if (typeof v === "number" && typeof (mods as Record<keyof RunModifiers, number>)[key] === "number") {
      if (key.endsWith("Mult") || key === "speedMult" || key === "fireRateMult") {
        ;(mods as Record<keyof RunModifiers, number>)[key] += v / 100
      } else {
        ;(mods as Record<keyof RunModifiers, number>)[key] += v
      }
    }
  }

  // NPC Story Bonuses (Permanent recruited characters)
  for (const [k, v] of Object.entries(npcStats)) {
    const key = k as keyof RunModifiers
    if (typeof v === "number" && typeof (mods as Record<keyof RunModifiers, number>)[key] === "number") {
      if (key.endsWith("Mult") || key === "speedMult" || key === "statusChance" || key === "critChance") {
        ;(mods as Record<keyof RunModifiers, number>)[key] += v / 100
      } else {
        ;(mods as Record<keyof RunModifiers, number>)[key] += v
      }
    }
  }

  const bountyMult = aggregateBountyEffects(loadout.bountyIds)
  mods.scrapMult *= bountyMult.scrapMult
  mods.techMult *= bountyMult.techMult
  mods.damageBonus += bountyMult.damageBonus * 10 // bounty damageBonus expressed as 0.2 → +2 flat
  mods.incomingDamageMult *= bountyMult.incomingDamageMult

  // Vehicle chassis stats — consume loadout.vehicleId so shop purchases matter ingame.
  const chassisStats: Record<string, { speed: number; hp: number; damage: number; fireRate: number }> = {
    vehicle_schrotty: { speed: 0,    hp: 0,    damage: 0, fireRate: 0 },
    vehicle_hornet:   { speed: 0.20, hp: -0.20, damage: 0, fireRate: 0 },
    vehicle_mammoth:  { speed: -0.15, hp: 0.50, damage: 0, fireRate: 0 },
    vehicle_dragoon:  { speed: 0.10, hp: 0.10, damage: 0.10, fireRate: 0.10 },
  }
  const chassis = chassisStats[loadout.vehicleId] ?? chassisStats.vehicle_schrotty
  mods.speedMult += chassis.speed
  mods.fireRateMult += chassis.fireRate
  mods.damageBonus += chassis.damage * 10 // +10% → +1 flat (baseline dmg ~15)

  const baseMaxHealth = char.baseStats.maxHealth + (skillStats.maxHealth ?? 0)
  const maxHealth = Math.max(1, Math.round(baseMaxHealth * (1 + chassis.hp)))

  set({
    phase: "InPlay",
    isPaused: false,
    enemyTelemetry: defaultEnemyTelemetry(),
    character: loadout.character,
    modifiers: mods,
    bountyMult,
    maxHealth,
    health: maxHealth,
    scrap: 0,
    totalKills: 0,
    nightmareKills: 0,
    tech: 0,
    experience: 0,
    level: 1,
    xpToNextLevel: 50,
    enemiesAlive: 0,
    enemiesKilledThisRun: 0,
    wave: 1,
    runStartMs: Date.now(),
    abilityUses: 3,
    runUpgrades: {},
    offeredUpgrades: [],
  })
}
