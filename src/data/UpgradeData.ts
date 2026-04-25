import { GameState } from "../store"

export type UpgradeRarity = "Common" | "Rare" | "Epic" | "Legendary"
export type UpgradeRole = "foundation" | "glue" | "expression" | "scaler" | "converter" | "escalator" | "rulebreaker"

export interface UpgradeData {
  id: string
  name: string
  description: string
  rarity: UpgradeRarity
  role: UpgradeRole
  tags: string[]
  maxStacks: number
  apply: (state: GameState) => void
}

const add = (mod: (s: GameState) => void) => mod

export const UPGRADE_POOL: UpgradeData[] = [
  { id: "upg_burn_crit", name: "Burn on Crit", description: "Critical hits ignite targets.", rarity: "Common", role: "foundation", tags: ["burn", "crit"], maxStacks: 1, apply: add((s) => { s.modifiers.statusChance += 0.1; s.modifiers.critChance += 0.05 }) },
  { id: "upg_ember_trail", name: "Dash Ember Trail", description: "Dash leaves a burning trail.", rarity: "Common", role: "foundation", tags: ["burn", "dash"], maxStacks: 1, apply: add((s) => { s.modifiers.speedMult += 0.08; s.modifiers.statusChance += 0.06 }) },
  { id: "upg_chain_volt", name: "Chain Volt", description: "Projectiles can arc to nearby foes.", rarity: "Common", role: "foundation", tags: ["shock", "projectile", "chain"], maxStacks: 1, apply: add((s) => { s.modifiers.damageBonus += 4; s.modifiers.statusChance += 0.05 }) },
  { id: "upg_overheal_shield", name: "Overheal Shield", description: "Excess healing converts into shield.", rarity: "Rare", role: "foundation", tags: ["shield", "heal", "survival"], maxStacks: 1, apply: add((s) => { s.maxShield += 40; s.shield += 20 }) },

  { id: "upg_aftershock_pulse", name: "Aftershock Pulse", description: "Landing dash emits pulse.", rarity: "Rare", role: "expression", tags: ["dash", "pulse", "control"], maxStacks: 1, apply: add((s) => { s.modifiers.controlDuration += 0.12 }) },
  { id: "upg_arc_return", name: "Arc Return", description: "Projectiles return after first hit.", rarity: "Epic", role: "expression", tags: ["projectile", "shock", "return"], maxStacks: 1, apply: add((s) => { s.modifiers.fireRateMult += 0.08; s.modifiers.damageBonus += 6 }) },
  { id: "upg_shock_lattice", name: "Shock Lattice", description: "Shocks build a lingering lattice zone.", rarity: "Epic", role: "expression", tags: ["shock", "zone", "control"], maxStacks: 1, apply: add((s) => { s.modifiers.controlDuration += 0.2 }) },
  { id: "upg_chain_shields", name: "Chain Shields", description: "Shield pickups echo to nearby allies.", rarity: "Rare", role: "expression", tags: ["shield", "echo", "support"], maxStacks: 1, apply: add((s) => { s.modifiers.shieldOnPickup += 0.1 }) },

  { id: "upg_ash_detonation", name: "Ash Detonation", description: "Burning crits detonate on kill.", rarity: "Epic", role: "converter", tags: ["burn", "crit", "explode"], maxStacks: 1, apply: add((s) => { s.modifiers.damageBonus += 12 }) },
  { id: "upg_poison_to_slow", name: "Toxic Brake", description: "Poisoned enemies are slowed.", rarity: "Rare", role: "converter", tags: ["poison", "slow", "control"], maxStacks: 1, apply: add((s) => { s.modifiers.controlDuration += 0.25 }) },
  { id: "upg_kill_to_haste", name: "Kill Haste", description: "Kill streak grants temporary haste.", rarity: "Common", role: "glue", tags: ["streak", "speed"], maxStacks: 2, apply: add((s) => { s.modifiers.speedMult += 0.06 }) },
  { id: "upg_crit_focus", name: "Lethal Precision", description: "+10% Crit Chance.", rarity: "Rare", role: "glue", tags: ["crit"], maxStacks: 5, apply: add((s) => { s.modifiers.critChance += 0.1 }) },

  { id: "upg_cannons", name: "Autocannon Overclock", description: "+20% Fire Rate, +5 Damage.", rarity: "Common", role: "scaler", tags: ["projectile"], maxStacks: 10, apply: add((s) => { s.modifiers.fireRateMult += 0.2; s.modifiers.damageBonus += 5 }) },
  { id: "upg_scrap_magnet", name: "Magnetic Field", description: "+20% Pickup Radius.", rarity: "Common", role: "scaler", tags: ["economy", "pickup"], maxStacks: 5, apply: add((s) => { s.modifiers.pickupRadius += 0.2 }) },
  { id: "upg_armor", name: "Hull Reinforcement", description: "+50 Max Hull. Heals for 50.", rarity: "Common", role: "scaler", tags: ["survival"], maxStacks: 10, apply: add((s) => { s.maxHealth += 50; s.health = Math.min(s.health + 50, s.maxHealth) }) },
  { id: "upg_turbo", name: "Turbo Dash", description: "+10% Move Speed.", rarity: "Rare", role: "scaler", tags: ["dash", "speed"], maxStacks: 5, apply: add((s) => { s.modifiers.speedMult += 0.1 }) },

  { id: "upg_heat_threshold", name: "Heat Threshold", description: "Burn damage ramps after sustained pressure.", rarity: "Epic", role: "escalator", tags: ["burn", "threshold"], maxStacks: 1, apply: add((s) => { s.modifiers.damageBonus += 16 }) },
  { id: "upg_arc_resonance", name: "Arc Resonance", description: "Every third projectile emits chain shock.", rarity: "Epic", role: "escalator", tags: ["shock", "projectile", "chain"], maxStacks: 1, apply: add((s) => { s.modifiers.damageBonus += 14; s.modifiers.statusChance += 0.08 }) },
  { id: "upg_last_stand_gambit", name: "Last Stand Gambit", description: "Low HP massively boosts output.", rarity: "Legendary", role: "rulebreaker", tags: ["risk", "burst"], maxStacks: 1, apply: add((s) => { s.modifiers.damageBonus += 20; s.modifiers.incomingDamageMult *= 1.05 }) },
  { id: "upg_echo_overdrive", name: "Echo Overdrive", description: "Abilities echo once at reduced power.", rarity: "Legendary", role: "rulebreaker", tags: ["echo", "ability", "burst"], maxStacks: 1, apply: add((s) => { s.modifiers.fireRateMult += 0.12; s.modifiers.statusChance += 0.07 }) },
]

interface RollOptions {
  rng?: () => number
}

const EARLY_STAGE_MAX = 5

function inferStage(currentUpgrades: Record<string, number>): number {
  const picks = Object.values(currentUpgrades).reduce((acc, n) => acc + n, 0)
  return Math.min(EARLY_STAGE_MAX, picks + 1)
}

function inferBuildTags(currentUpgrades: Record<string, number>): Set<string> {
  const counts = new Map<string, number>()
  for (const [id, stacks] of Object.entries(currentUpgrades)) {
    const upg = UPGRADE_POOL.find((u) => u.id === id)
    if (!upg) continue
    for (const tag of upg.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + stacks)
    }
  }
  return new Set(Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([tag]) => tag))
}

function rarityScore(rarity: UpgradeRarity): number {
  if (rarity === "Legendary") return 4
  if (rarity === "Epic") return 3
  if (rarity === "Rare") return 2
  return 1
}

function pickBest(
  pool: UpgradeData[],
  selected: Set<string>,
  rng: () => number,
  score: (u: UpgradeData) => number,
): UpgradeData | null {
  const candidates = pool.filter((u) => !selected.has(u.id))
  if (!candidates.length) return null
  let best = candidates[0]
  let bestScore = score(best)
  for (let i = 1; i < candidates.length; i++) {
    const candidate = candidates[i]
    const s = score(candidate)
    if (s > bestScore || (s === bestScore && rng() > 0.5)) {
      best = candidate
      bestScore = s
    }
  }
  return best
}

function includesAny(tags: string[], wanted: Set<string>): boolean {
  return tags.some((t) => wanted.has(t))
}

export function rollRandomUpgrades(count: number, currentUpgrades: Record<string, number>, options: RollOptions = {}): UpgradeData[] {
  const rng = options.rng ?? Math.random
  const available = UPGRADE_POOL.filter((u) => (currentUpgrades[u.id] || 0) < u.maxStacks)
  if (!available.length || count <= 0) return []

  const stage = inferStage(currentUpgrades)
  const buildTags = inferBuildTags(currentUpgrades)
  const selected = new Set<string>()
  const offer: UpgradeData[] = []

  const continuation = pickBest(available, selected, rng, (u) => {
    const tagBonus = buildTags.size > 0 && includesAny(u.tags, buildTags) ? 8 : 0
    const roleBonus = u.role === "foundation" || u.role === "glue" || u.role === "scaler" ? 3 : 0
    return tagBonus + roleBonus + rarityScore(u.rarity)
  })
  if (continuation) {
    offer.push(continuation)
    selected.add(continuation.id)
  }

  const requiredRoleByStage: Partial<Record<number, UpgradeRole[]>> = {
    1: ["foundation", "glue"],
    2: ["glue", "converter", "expression"],
    3: ["expression"],
    4: ["converter", "expression", "escalator"],
    5: ["escalator", "converter", "rulebreaker"],
  }

  const stageRoles = new Set(requiredRoleByStage[stage] ?? [])
  const discovery = pickBest(available, selected, rng, (u) => {
    const requiredBoost = stageRoles.has(u.role) ? 30 : 0
    const buildBoost = buildTags.size > 0 && includesAny(u.tags, buildTags) ? 6 : 0
    const noveltyBoost = !buildBoost ? 4 : 0
    return requiredBoost + buildBoost + noveltyBoost + rarityScore(u.rarity)
  })
  if (discovery) {
    offer.push(discovery)
    selected.add(discovery.id)
  }

  const wildcard = pickBest(available, selected, rng, (u) => {
    const offBuild = buildTags.size > 0 && !includesAny(u.tags, buildTags) ? 8 : 1
    const avoidDead = u.role === "foundation" || u.role === "expression" || u.role === "converter" || u.role === "escalator" || u.role === "rulebreaker" ? 4 : 0
    return offBuild + avoidDead + rarityScore(u.rarity)
  })
  if (wildcard) {
    offer.push(wildcard)
    selected.add(wildcard.id)
  }

  while (offer.length < count) {
    const fill = pickBest(available, selected, rng, (u) => {
      const relevance = buildTags.size > 0 && includesAny(u.tags, buildTags) ? 5 : 0
      return relevance + rarityScore(u.rarity)
    })
    if (!fill) break
    offer.push(fill)
    selected.add(fill.id)
  }

  return offer.slice(0, count)
}
