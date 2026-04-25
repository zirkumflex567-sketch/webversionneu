import { CharacterId } from "../save/SaveSchema"

export interface CharacterBaseStats {
  maxHealth: number
  armor: number
  moveSpeedPercent: number
  critChancePercent: number
  pickupRadiusPercent: number
}

export interface CharacterTrait {
  id: string
  name: string
  description: string
}

export interface SkillNode {
  id: string
  tier: 1 | 2 | 3 | 4 // 4 = capstone
  name: string
  description: string
  maxRanks: number
  techCost: number
  valuePerRank: number
  isPercent: boolean
  statKey: StatKey
}

export type StatKey =
  | "damageBonus"
  | "fireRateMult"
  | "speedMult"
  | "scrapMult"
  | "techMult"
  | "maxHealth"
  | "armor"
  | "critChance"
  | "critDamage"
  | "pickupRadius"
  | "statusChance"
  | "controlDuration"
  | "lifesteal"
  | "droneCount"
  | "shieldOnPickup"

export interface SkillBranch {
  id: string
  name: string
  theme: string
  nodes: SkillNode[] // includes capstone as last entry (tier 4)
}

export interface CharacterData {
  id: CharacterId
  displayName: string
  title: string
  description: string
  shortLore: string
  baseStats: CharacterBaseStats
  passiveTrait: CharacterTrait
  branches: [SkillBranch, SkillBranch, SkillBranch] // exactly 3
}

// ---------------------------------------------------------------------------
// RIXA "Chromlilie" Voss — Glass Cannon / Alchemist
// ---------------------------------------------------------------------------

const RIXA: CharacterData = {
  id: "rixa",
  displayName: "Rixa",
  title: "Chromlilie Voss",
  description: "Glass cannon pilot. Status-effect alchemist. Every affliction fuels her damage.",
  shortLore: "Once a back-alley chemist, Rixa turned her addiction to volatile compounds into a battlefield art form.",
  baseStats: {
    maxHealth: 100,
    armor: 0,
    moveSpeedPercent: 5,
    critChancePercent: 5,
    pickupRadiusPercent: 0,
  },
  passiveTrait: {
    id: "chromrausch",
    name: "Chromrausch",
    description: "+3% damage per active status effect on nearby enemies (max 10 stacks, 3s duration).",
  },
  branches: [
    {
      id: "chrom_alchemie",
      name: "Chrom-Alchemie",
      theme: "Burst damage & explosion chains",
      nodes: [
        { id: "ca_1", tier: 1, name: "Volatile Brew", description: "+X% damage to enemies afflicted with any status.", maxRanks: 5, techCost: 1, valuePerRank: 4, isPercent: true, statKey: "damageBonus" },
        { id: "ca_2", tier: 2, name: "Chain Fission", description: "+X% status proc chance.", maxRanks: 5, techCost: 2, valuePerRank: 3, isPercent: true, statKey: "statusChance" },
        { id: "ca_3", tier: 3, name: "Alchemic Surge", description: "+X% crit damage.", maxRanks: 3, techCost: 3, valuePerRank: 10, isPercent: true, statKey: "critDamage" },
        { id: "ca_cap", tier: 4, name: "CAPSTONE: Detonator", description: "Killing a status-afflicted enemy triggers an AoE explosion. +20% damage overall.", maxRanks: 1, techCost: 5, valuePerRank: 20, isPercent: true, statKey: "damageBonus" },
      ],
    },
    {
      id: "secco_chaos",
      name: "Secco & Chaos",
      theme: "Crowd control",
      nodes: [
        { id: "sc_1", tier: 1, name: "Charm Vial", description: "+X% control duration.", maxRanks: 5, techCost: 1, valuePerRank: 8, isPercent: true, statKey: "controlDuration" },
        { id: "sc_2", tier: 2, name: "Confuse Mist", description: "+X% status proc chance (stacks with Chain Fission).", maxRanks: 5, techCost: 2, valuePerRank: 2, isPercent: true, statKey: "statusChance" },
        { id: "sc_3", tier: 3, name: "Mass Hysteria", description: "+X% fire rate while any enemy is controlled.", maxRanks: 3, techCost: 3, valuePerRank: 5, isPercent: true, statKey: "fireRateMult" },
        { id: "sc_cap", tier: 4, name: "CAPSTONE: Pandemonium", description: "Controlled enemies damage each other. +30% control duration.", maxRanks: 1, techCost: 5, valuePerRank: 30, isPercent: true, statKey: "controlDuration" },
      ],
    },
    {
      id: "herzbrecherin",
      name: "Herzbrecherin",
      theme: "Lifesteal & survivability",
      nodes: [
        { id: "hb_1", tier: 1, name: "Bloodletting", description: "+X% lifesteal on debuffed targets.", maxRanks: 5, techCost: 1, valuePerRank: 2, isPercent: true, statKey: "lifesteal" },
        { id: "hb_2", tier: 2, name: "Iron Roses", description: "+X max health.", maxRanks: 5, techCost: 2, valuePerRank: 10, isPercent: false, statKey: "maxHealth" },
        { id: "hb_3", tier: 3, name: "Parasite's Grace", description: "+X% pickup radius.", maxRanks: 3, techCost: 3, valuePerRank: 15, isPercent: true, statKey: "pickupRadius" },
        { id: "hb_cap", tier: 4, name: "CAPSTONE: Vitality Siphon", description: "Kills heal for 5% max HP. +10% lifesteal overall.", maxRanks: 1, techCost: 5, valuePerRank: 10, isPercent: true, statKey: "lifesteal" },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// MAREK "Schrottanker" Graul — Tank / Engineer
// ---------------------------------------------------------------------------

const MAREK: CharacterData = {
  id: "marek",
  displayName: "Marek",
  title: "Schrottanker Graul",
  description: "Heavy armor engineer. Every piece of scrap tightens his hull.",
  shortLore: "A decorated salvage-marine who refused to leave his wreck behind — now the wreck pilots itself.",
  baseStats: {
    maxHealth: 150,
    armor: 5,
    moveSpeedPercent: -5,
    critChancePercent: 0,
    pickupRadiusPercent: 25,
  },
  passiveTrait: {
    id: "schrottkern",
    name: "Schrottkern",
    description: "Each pickup grants a temporary 5-HP shield (stacks up to 50 HP).",
  },
  branches: [
    {
      id: "magnetik",
      name: "Magnetik",
      theme: "Loot magnet & enemy slow",
      nodes: [
        { id: "mg_1", tier: 1, name: "Polarizer", description: "+X% pickup radius.", maxRanks: 5, techCost: 1, valuePerRank: 15, isPercent: true, statKey: "pickupRadius" },
        { id: "mg_2", tier: 2, name: "Scrap Tide", description: "+X% scrap gain.", maxRanks: 5, techCost: 2, valuePerRank: 8, isPercent: true, statKey: "scrapMult" },
        { id: "mg_3", tier: 3, name: "Iron Drag", description: "+X% control duration (slow auras).", maxRanks: 3, techCost: 3, valuePerRank: 10, isPercent: true, statKey: "controlDuration" },
        { id: "mg_cap", tier: 4, name: "CAPSTONE: Singularity", description: "Pickups pull all nearby enemies. +25% scrap.", maxRanks: 1, techCost: 5, valuePerRank: 25, isPercent: true, statKey: "scrapMult" },
      ],
    },
    {
      id: "drohnenwerk",
      name: "Drohnenwerk",
      theme: "Drones & automation",
      nodes: [
        { id: "dw_1", tier: 1, name: "Tin Companion", description: "+X drone count.", maxRanks: 3, techCost: 1, valuePerRank: 1, isPercent: false, statKey: "droneCount" },
        { id: "dw_2", tier: 2, name: "Overclock", description: "+X% drone fire rate.", maxRanks: 5, techCost: 2, valuePerRank: 6, isPercent: true, statKey: "fireRateMult" },
        { id: "dw_3", tier: 3, name: "Scrap Forge", description: "+X% tech gain.", maxRanks: 3, techCost: 3, valuePerRank: 8, isPercent: true, statKey: "techMult" },
        { id: "dw_cap", tier: 4, name: "CAPSTONE: Hive Protocol", description: "Drones explode on death. +1 drone.", maxRanks: 1, techCost: 5, valuePerRank: 1, isPercent: false, statKey: "droneCount" },
      ],
    },
    {
      id: "bollwerk",
      name: "Bollwerk",
      theme: "Damage reduction & taunt",
      nodes: [
        { id: "bw_1", tier: 1, name: "Plate Weaving", description: "+X armor.", maxRanks: 5, techCost: 1, valuePerRank: 2, isPercent: false, statKey: "armor" },
        { id: "bw_2", tier: 2, name: "Bulwark", description: "+X max health.", maxRanks: 5, techCost: 2, valuePerRank: 15, isPercent: false, statKey: "maxHealth" },
        { id: "bw_3", tier: 3, name: "Pickup Shield", description: "+X HP shield per pickup.", maxRanks: 3, techCost: 3, valuePerRank: 2, isPercent: false, statKey: "shieldOnPickup" },
        { id: "bw_cap", tier: 4, name: "CAPSTONE: Fortress Mode", description: "Taking damage taunts nearby enemies. +5 armor.", maxRanks: 1, techCost: 5, valuePerRank: 5, isPercent: false, statKey: "armor" },
      ],
    },
  ],
}

function createTemplateCharacter(config: {
  id: CharacterId
  displayName: string
  title: string
  description: string
  shortLore: string
  baseStats: CharacterBaseStats
  passiveTrait: CharacterTrait
  prefix: string
  branchNames: [string, string, string]
  branchThemes: [string, string, string]
}): CharacterData {
  const [b1, b2, b3] = config.branchNames
  const [t1, t2, t3] = config.branchThemes
  const p = config.prefix

  return {
    id: config.id,
    displayName: config.displayName,
    title: config.title,
    description: config.description,
    shortLore: config.shortLore,
    baseStats: config.baseStats,
    passiveTrait: config.passiveTrait,
    branches: [
      {
        id: `${p}_offense`,
        name: b1,
        theme: t1,
        nodes: [
          { id: `${p}_o1`, tier: 1, name: "Core Strike", description: "+X% damage.", maxRanks: 5, techCost: 1, valuePerRank: 3, isPercent: true, statKey: "damageBonus" },
          { id: `${p}_o2`, tier: 2, name: "Precision Loop", description: "+X% crit chance.", maxRanks: 5, techCost: 2, valuePerRank: 2, isPercent: true, statKey: "critChance" },
          { id: `${p}_o3`, tier: 3, name: "Relentless Cadence", description: "+X% fire rate.", maxRanks: 3, techCost: 3, valuePerRank: 5, isPercent: true, statKey: "fireRateMult" },
          { id: `${p}_oc`, tier: 4, name: "CAPSTONE: Pressure Break", description: "+20% damage while trait condition is active.", maxRanks: 1, techCost: 5, valuePerRank: 20, isPercent: true, statKey: "damageBonus" },
        ],
      },
      {
        id: `${p}_mobility`,
        name: b2,
        theme: t2,
        nodes: [
          { id: `${p}_m1`, tier: 1, name: "Light Chassis", description: "+X% move speed.", maxRanks: 5, techCost: 1, valuePerRank: 2, isPercent: true, statKey: "speedMult" },
          { id: `${p}_m2`, tier: 2, name: "Magnet Sweep", description: "+X% pickup radius.", maxRanks: 5, techCost: 2, valuePerRank: 10, isPercent: true, statKey: "pickupRadius" },
          { id: `${p}_m3`, tier: 3, name: "Control Window", description: "+X% control duration.", maxRanks: 3, techCost: 3, valuePerRank: 8, isPercent: true, statKey: "controlDuration" },
          { id: `${p}_mc`, tier: 4, name: "CAPSTONE: Momentum Lock", description: "+15% speed and +15% pickup radius.", maxRanks: 1, techCost: 5, valuePerRank: 15, isPercent: true, statKey: "speedMult" },
        ],
      },
      {
        id: `${p}_survival`,
        name: b3,
        theme: t3,
        nodes: [
          { id: `${p}_s1`, tier: 1, name: "Hull Stitch", description: "+X max health.", maxRanks: 5, techCost: 1, valuePerRank: 12, isPercent: false, statKey: "maxHealth" },
          { id: `${p}_s2`, tier: 2, name: "Reinforced Plating", description: "+X armor.", maxRanks: 5, techCost: 2, valuePerRank: 1, isPercent: false, statKey: "armor" },
          { id: `${p}_s3`, tier: 3, name: "Salvage Instinct", description: "+X% scrap gain.", maxRanks: 3, techCost: 3, valuePerRank: 8, isPercent: true, statKey: "scrapMult" },
          { id: `${p}_sc`, tier: 4, name: "CAPSTONE: Last Reserve", description: "+10 armor and +10% scrap gain.", maxRanks: 1, techCost: 5, valuePerRank: 10, isPercent: false, statKey: "armor" },
        ],
      },
    ],
  }
}

const LYRA = createTemplateCharacter({
  id: "lyra",
  displayName: "Lyra",
  title: "Dorn",
  description: "High-precision duelist with mark-and-burst gameplay.",
  shortLore: "Lyra hunts with discipline and converts target pressure into lethal finishers.",
  baseStats: { maxHealth: 95, armor: 2, moveSpeedPercent: 8, critChancePercent: 8, pickupRadiusPercent: 0 },
  passiveTrait: { id: "hunter_mark", name: "Hunter's Mark", description: "+2% damage per nearby enemy (max 8 stacks)." },
  prefix: "ly",
  branchNames: ["Marksmanship", "Flowstep", "Resolve"],
  branchThemes: ["Precision burst", "Mobility and angle control", "Sustain under pressure"],
})

const MIRA = createTemplateCharacter({
  id: "mira",
  displayName: "Mira",
  title: "Voss",
  description: "Controller support focused on statuses and utility uptime.",
  shortLore: "Mira bends battlefield tempo with archive-tech and controlled disruption.",
  baseStats: { maxHealth: 90, armor: 2, moveSpeedPercent: 5, critChancePercent: 4, pickupRadiusPercent: 10 },
  passiveTrait: { id: "archive_resonance", name: "Archive Resonance", description: "+2% damage per active nearby status effect (max 8 stacks)." },
  prefix: "mi",
  branchNames: ["Resonance", "Utility Grid", "Safeguards"],
  branchThemes: ["Status-driven offense", "Control and utility", "Defensive stabilization"],
})

const TAREK = createTemplateCharacter({
  id: "tarek",
  displayName: "Tarek",
  title: "Al-Sahir",
  description: "Skirmisher who spikes damage through close-range tempo.",
  shortLore: "Tarek thrives in motion, turning proximity and momentum into pressure.",
  baseStats: { maxHealth: 92, armor: 3, moveSpeedPercent: 12, critChancePercent: 6, pickupRadiusPercent: 0 },
  passiveTrait: { id: "sand_dancer", name: "Sand Dancer", description: "+1.5% damage per nearby enemy in close range (max 10 stacks)." },
  prefix: "ta",
  branchNames: ["Skirmish", "Footwork", "Grit"],
  branchThemes: ["Close-range aggression", "Positioning and speed", "Survivability"],
})

const SIOFRA = createTemplateCharacter({
  id: "siofra",
  displayName: "Siofra",
  title: "Nhal",
  description: "Status specialist that scales with control effects.",
  shortLore: "Siofra weaponizes the arena itself through layered afflictions.",
  baseStats: { maxHealth: 88, armor: 1, moveSpeedPercent: 10, critChancePercent: 6, pickupRadiusPercent: 5 },
  passiveTrait: { id: "rootsong", name: "Rootsong", description: "+2% damage per active nearby status effect (max 10 stacks)." },
  prefix: "si",
  branchNames: ["Affliction", "Roots", "Ward"],
  branchThemes: ["Status pressure", "Zone and control", "Defensive uptime"],
})

const BRANNOK = createTemplateCharacter({
  id: "brannok",
  displayName: "Brannok",
  title: "Reef",
  description: "Bruiser that excels when brawling multiple enemies.",
  shortLore: "Brannok breaks formations and gets deadlier in crowded fights.",
  baseStats: { maxHealth: 145, armor: 8, moveSpeedPercent: -4, critChancePercent: 2, pickupRadiusPercent: 15 },
  passiveTrait: { id: "breaker_instinct", name: "Breaker Instinct", description: "+12% damage when 3+ enemies are nearby." },
  prefix: "br",
  branchNames: ["Impact", "Anchor", "Endurance"],
  branchThemes: ["Brawler damage", "Space control", "Tank scaling"],
})

const EDDA = createTemplateCharacter({
  id: "edda",
  displayName: "Edda",
  title: "Falkenlicht",
  description: "Frontline protector with stable scaling in dense waves.",
  shortLore: "Edda turns defensive poise into relentless attrition damage.",
  baseStats: { maxHealth: 125, armor: 10, moveSpeedPercent: -2, critChancePercent: 3, pickupRadiusPercent: 10 },
  passiveTrait: { id: "oath_pressure", name: "Oath Pressure", description: "+1% damage per nearby enemy (max 10 stacks)." },
  prefix: "ed",
  branchNames: ["Oathsteel", "Formation", "Bastion"],
  branchThemes: ["Frontline offense", "Formation control", "Mitigation"],
})

const KAEL = createTemplateCharacter({
  id: "kael",
  displayName: "Kael",
  title: "Nhar",
  description: "Assassin-style duelist rewarded for isolated picks.",
  shortLore: "Kael thrives in surgical engagements and punishes lone targets.",
  baseStats: { maxHealth: 85, armor: 1, moveSpeedPercent: 14, critChancePercent: 10, pickupRadiusPercent: 0 },
  passiveTrait: { id: "solo_execution", name: "Solo Execution", description: "+3% damage when exactly one enemy is nearby." },
  prefix: "ka",
  branchNames: ["Execution", "Shadowline", "Escape"],
  branchThemes: ["Single-target burst", "Mobility and setup", "Glass-cannon sustain"],
})

const OREN = createTemplateCharacter({
  id: "oren",
  displayName: "Oren",
  title: "Vale",
  description: "Support monk with recovery-focused battlefield control.",
  shortLore: "Oren keeps runs alive through positioning, mitigation, and tactical sustain.",
  baseStats: { maxHealth: 105, armor: 4, moveSpeedPercent: 4, critChancePercent: 4, pickupRadiusPercent: 12 },
  passiveTrait: { id: "pilgrim_grace", name: "Pilgrim Grace", description: "+1% damage and +1 armor when 2+ enemies are nearby (max 10 stacks dmg)." },
  prefix: "or",
  branchNames: ["Vows", "Pilgrim Path", "Sanctuary"],
  branchThemes: ["Support pressure", "Movement utility", "Defensive sustain"],
})

const YARA = createTemplateCharacter({
  id: "yara",
  displayName: "Yara",
  title: "Kest",
  description: "Engineer with strong automation and salvage scaling.",
  shortLore: "Yara turns every pickup into momentum for a growing machine advantage.",
  baseStats: { maxHealth: 112, armor: 6, moveSpeedPercent: 2, critChancePercent: 3, pickupRadiusPercent: 20 },
  passiveTrait: { id: "forge_loop", name: "Forge Loop", description: "+2% damage per nearby enemy drone surrogate (modeled as nearby enemies, max 8)." },
  prefix: "ya",
  branchNames: ["Forge", "Automation", "Reinforcement"],
  branchThemes: ["Engineering offense", "Systems utility", "Hull stability"],
})

const NERIS = createTemplateCharacter({
  id: "neris",
  displayName: "Neris",
  title: "Vael",
  description: "Echo-mage that scales through status and attrition loops.",
  shortLore: "Neris weaponizes memory fractures into sustained kill pressure.",
  baseStats: { maxHealth: 90, armor: 2, moveSpeedPercent: 7, critChancePercent: 7, pickupRadiusPercent: 8 },
  passiveTrait: { id: "echo_hunger", name: "Echo Hunger", description: "+2% damage per nearby active status (max 10)." },
  prefix: "ne",
  branchNames: ["Echo", "Riftflow", "Harvest"],
  branchThemes: ["Echo damage", "Tempo control", "Sustain conversion"],
})

const VELKA = createTemplateCharacter({
  id: "velka",
  displayName: "Velka",
  title: "Sturmtritt",
  description: "High-mobility lancer with pursuit-based bonus windows.",
  shortLore: "Velka peaks when she isolates and relentlessly chases marked targets.",
  baseStats: { maxHealth: 120, armor: 7, moveSpeedPercent: 13, critChancePercent: 5, pickupRadiusPercent: 6 },
  passiveTrait: { id: "storm_hunt", name: "Storm Hunt", description: "+1.5% damage per nearby enemy (max 10), +3% if exactly one target." },
  prefix: "ve",
  branchNames: ["Lance", "Pursuit", "Shockplate"],
  branchThemes: ["Burst approach", "Chase control", "Aggressive defense"],
})

const CYR = createTemplateCharacter({
  id: "cyr",
  displayName: "Cyr",
  title: "Ohne Gestern",
  description: "Adaptive form-switcher with flexible all-round scaling.",
  shortLore: "Cyr mirrors the battlefield and gains power from chaotic engagements.",
  baseStats: { maxHealth: 102, armor: 5, moveSpeedPercent: 6, critChancePercent: 6, pickupRadiusPercent: 10 },
  passiveTrait: { id: "adaptive_form", name: "Adaptive Form", description: "+1% damage per nearby enemy and +1% per nearby status (both max 8)." },
  prefix: "cy",
  branchNames: ["Adaptation", "Mirrors", "Stability"],
  branchThemes: ["Flexible offense", "Reactive mobility", "Hybrid survivability"],
})

export const CHARACTERS: Record<CharacterId, CharacterData> = {
  rixa: RIXA,
  marek: MAREK,
  lyra: LYRA,
  mira: MIRA,
  tarek: TAREK,
  siofra: SIOFRA,
  brannok: BRANNOK,
  edda: EDDA,
  kael: KAEL,
  oren: OREN,
  yara: YARA,
  neris: NERIS,
  velka: VELKA,
  cyr: CYR,
}

export function getCharacter(id: CharacterId): CharacterData { return CHARACTERS[id] }

// Aggregate skill effects from allocated ranks into a stat modifier bag.
export function computeSkillStats(
  char: CharacterId,
  ranks: Record<string, number>,
): Partial<Record<StatKey, number>> {
  const out: Partial<Record<StatKey, number>> = {}
  const data = getCharacter(char)
  for (const branch of data.branches) {
    for (const node of branch.nodes) {
      const r = ranks[node.id] ?? 0
      if (r <= 0) continue
      const effective = Math.min(r, node.maxRanks) * node.valuePerRank
      out[node.statKey] = (out[node.statKey] ?? 0) + effective
    }
  }
  return out
}

/**
 * Synergy Bonus — activates when ALL nodes of the same tier across all 3 branches are maxed.
 * Rewards broad investment rather than single-branch stacking.
 *
 * Tier 1 synergy: +5% speed
 * Tier 2 synergy: +8% scrap gain
 * Tier 3 synergy: +10% damage bonus
 * Tier 4 (capstone) synergy: +15% fire rate
 */
export function computeSynergyBonuses(
  char: CharacterId,
  ranks: Record<string, number>,
): Partial<Record<StatKey, number>> {
  const out: Partial<Record<StatKey, number>> = {}
  const data = getCharacter(char)
  const tiers: Array<1 | 2 | 3 | 4> = [1, 2, 3, 4]

  for (const tier of tiers) {
    const tierNodes = data.branches.flatMap(b => b.nodes.filter(n => n.tier === tier))
    const allMaxed  = tierNodes.every(n => (ranks[n.id] ?? 0) >= n.maxRanks)
    if (!allMaxed || tierNodes.length === 0) continue

    if (tier === 1) out.speedMult    = (out.speedMult    ?? 0) + 5
    if (tier === 2) out.scrapMult    = (out.scrapMult    ?? 0) + 8
    if (tier === 3) out.damageBonus  = (out.damageBonus  ?? 0) + 10
    if (tier === 4) out.fireRateMult = (out.fireRateMult ?? 0) + 15
  }

  return out
}

/**
 * NPC Bonuses — activates based on recruited story characters.
 */
export function computeNPCBonuses(
  recruitedNPCs: Array<{ stat: string; value: number }>
): Partial<Record<StatKey, number>> {
  const out: Partial<Record<StatKey, number>> = {}
  for (const bonus of recruitedNPCs) {
    const key = bonus.stat as StatKey
    if (key) {
      out[key] = (out[key] ?? 0) + bonus.value
    }
  }
  return out
}
