import {
  SaveGame, MetaProgress, RunData, RunOutcome, UnlockType, CharacterId,
  SAVE_STORAGE_KEY, SAVE_VERSION, defaultSave, validateSave,
} from "./SaveSchema"

function now(): number { return Date.now() }
function hasStorage(): boolean {
  try { return typeof window !== "undefined" && !!window.localStorage } catch { return false }
}

class SaveManagerImpl {
  private save: SaveGame = defaultSave()
  private loaded = false
  private listeners = new Set<(s: SaveGame) => void>()

  load(): SaveGame {
    if (this.loaded) return this.save
    this.loaded = true
    if (!hasStorage()) return this.save
    try {
      const raw = window.localStorage.getItem(SAVE_STORAGE_KEY)
      if (!raw) return this.save
      const parsed = JSON.parse(raw)
      const validated = validateSave(parsed)
      if (validated) this.save = validated
    } catch (e) {
      console.warn("[SaveManager] failed to load, using defaults:", e)
    }
    return this.save
  }

  getSave(): SaveGame { return this.load() }
  getMeta(): MetaProgress { return this.load().metaProgress }

  subscribe(fn: (s: SaveGame) => void): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  private persist(): void {
    this.save.metadata.lastSaveTimeUnixMs = now()
    this.save.metadata.version = SAVE_VERSION
    if (hasStorage()) {
      try { window.localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(this.save)) }
      catch (e) { console.warn("[SaveManager] persist failed:", e) }
    }
    this.listeners.forEach(l => l(this.save))
  }

  // ----- currency -----
  addScrap(amount: number): void {
    if (amount === 0) return
    const meta = this.getMeta()
    meta.totalScrap = Math.max(0, meta.totalScrap + amount)
    this.persist()
  }

  addTech(amount: number): void {
    if (amount === 0) return
    const meta = this.getMeta()
    meta.totalTech = Math.max(0, meta.totalTech + amount)
    this.persist()
  }

  trySpend(scrapCost: number, techCost: number): boolean {
    const meta = this.getMeta()
    if (meta.totalScrap < scrapCost || meta.totalTech < techCost) return false
    meta.totalScrap -= scrapCost
    meta.totalTech -= techCost
    this.persist()
    return true
  }

  // ----- unlocks -----
  ensureCharacterUnlocked(id: CharacterId): boolean {
    const meta = this.getMeta()
    if (meta.unlockedCharacters.includes(id)) return false
    meta.unlockedCharacters.push(id)
    this.persist()
    return true
  }

  ensureCharactersUnlocked(ids: CharacterId[]): number {
    const meta = this.getMeta()
    const before = meta.unlockedCharacters.length
    for (const id of ids) {
      if (!meta.unlockedCharacters.includes(id)) meta.unlockedCharacters.push(id)
    }
    const added = meta.unlockedCharacters.length - before
    if (added > 0) this.persist()
    return added
  }

  isUnlocked(id: string, type: UnlockType): boolean {
    const meta = this.getMeta()
    const list = this.listFor(meta, type)
    return list.includes(id)
  }

  tryUnlock(id: string, type: UnlockType, scrapCost: number, techCost: number): boolean {
    if (!id) return false
    if (this.isUnlocked(id, type)) return false
    if (!this.trySpend(scrapCost, techCost)) return false
    const meta = this.getMeta()
    const list = this.listFor(meta, type)
    list.push(id)
    this.persist()
    return true
  }

  private listFor(meta: MetaProgress, type: UnlockType): string[] {
    switch (type) {
      case "Weapon": return meta.unlockedWeapons
      case "Upgrade": return meta.unlockedUpgrades
      case "Vehicle": return meta.unlockedVehicles
      case "Cosmetic": return meta.unlockedCosmetics
      case "Bounty": return meta.unlockedBounties
    }
  }

  // ----- skill tree -----
  getSkillRank(char: CharacterId, nodeId: string): number {
    return this.getMeta().skillTech[char]?.[nodeId] ?? 0
  }

  trySpendSkillTech(char: CharacterId, nodeId: string, techCost: number): boolean {
    if (!this.trySpend(0, techCost)) return false
    const meta = this.getMeta()
    const branch = meta.skillTech[char] ?? (meta.skillTech[char] = {})
    branch[nodeId] = (branch[nodeId] ?? 0) + 1
    this.persist()
    return true
  }

  // ----- run banking -----
  recordRun(run: RunData): void {
    const meta = this.getMeta()
    meta.runsCompleted += 1
    meta.totalEnemiesKilled += run.enemiesKilled
    if (run.durationSeconds > meta.bestTimeSeconds) {
      meta.bestTimeSeconds = run.durationSeconds
    }

    const banked = computeBankedResources(run)
    meta.totalScrap += banked.scrap
    meta.totalTech += banked.tech

    this.save.lastRun = run
    this.persist()
  }

  markSessionStart(): void {
    const meta = this.save.metadata
    meta.totalPlaySessions += 1
    this.persist()
  }

  resetAll(): void {
    this.save = defaultSave()
    this.persist()
  }
}

export const SaveManager = new SaveManagerImpl()

export function computeBankedResources(run: RunData): { scrap: number; tech: number; extractionBonus: number; scrapLost: number; techLost: number } {
  const o: RunOutcome = run.outcome
  if (o === "Extracted" || o === "Survivor") {
    // Extraction bonus: 30 scrap per wave survived — rewards staying in longer before extracting
    const extractionBonus = run.wave * 30
    return { scrap: run.scrapEarned + extractionBonus, tech: run.techEarned, extractionBonus, scrapLost: 0, techLost: 0 }
  }
  if (o === "Died") {
    const kept = Math.floor(run.scrapEarned * 0.5)
    return { scrap: kept, tech: 0, extractionBonus: 0, scrapLost: run.scrapEarned - kept, techLost: run.techEarned }
  }
  return { scrap: 0, tech: 0, extractionBonus: 0, scrapLost: 0, techLost: 0 }
}
