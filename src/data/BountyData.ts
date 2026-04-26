export type BountyObjectiveType =
  | "KillEnemies"
  | "KillElites"
  | "CollectScrap"
  | "CollectTech"
  | "SurviveSeconds"
  | "ReachWave"

export type BountyEffectType =
  | "ScrapMultiplier"
  | "TechMultiplier"
  | "EnemyMaxAliveMultiplier"
  | "EliteExtraScrapDrops"
  | "DamageBonus"
  | "IncomingDamageMultiplier"

export interface BountyObjective {
  type: BountyObjectiveType
  targetCount: number
}

export interface BountyEffect {
  type: BountyEffectType
  value: number
}

export interface BountyData {
  id: string
  displayName: string
  description: string
  objectives: BountyObjective[]
  effects: BountyEffect[]
  rewardScrap: number
  rewardTech: number
  unlockCost: number
  unlockConditions?: string[]
  extractionDependency?: "choice" | "extraction"
  failureConditions?: string[]
}

export const BOUNTIES: BountyData[] = [
  {
    id: "bounty_scrap_rush",
    displayName: "Scrap Rush",
    description: "Collect 500 Scrap in one run. +25% Scrap gain, +15% enemy count.",
    objectives: [{ type: "CollectScrap", targetCount: 500 }],
    effects: [
      { type: "ScrapMultiplier", value: 1.25 },
      { type: "EnemyMaxAliveMultiplier", value: 1.15 },
    ],
    rewardScrap: 200,
    rewardTech: 1,
    unlockCost: 0,
    unlockConditions: [],
    extractionDependency: "choice",
    failureConditions: ["run_abandoned"],
  },
  {
    id: "bounty_tech_heist",
    displayName: "Tech Heist",
    description: "Collect 3 Tech in one run. +50% Tech gain, +30% incoming damage.",
    objectives: [{ type: "CollectTech", targetCount: 3 }],
    effects: [
      { type: "TechMultiplier", value: 1.5 },
      { type: "IncomingDamageMultiplier", value: 1.3 },
    ],
    rewardScrap: 0,
    rewardTech: 3,
    unlockCost: 500,
    unlockConditions: ["mq05_complete"],
    extractionDependency: "extraction",
    failureConditions: ["player_defeated"],
  },
  {
    id: "bounty_slaughter",
    displayName: "Slaughterhouse",
    description: "Kill 200 enemies. +20% damage, +50% enemy count.",
    objectives: [{ type: "KillEnemies", targetCount: 200 }],
    effects: [
      { type: "DamageBonus", value: 0.2 },
      { type: "EnemyMaxAliveMultiplier", value: 1.5 },
    ],
    rewardScrap: 400,
    rewardTech: 2,
    unlockCost: 800,
    unlockConditions: ["mq08_complete"],
    extractionDependency: "extraction",
    failureConditions: ["run_abandoned", "player_defeated"],
  },
  {
    id: "bounty_marathon",
    displayName: "Marathon",
    description: "Reach wave 6. Slow burn, huge payout.",
    objectives: [{ type: "ReachWave", targetCount: 6 }],
    effects: [
      { type: "ScrapMultiplier", value: 1.1 },
      { type: "TechMultiplier", value: 1.1 },
    ],
    rewardScrap: 600,
    rewardTech: 4,
    unlockCost: 1500,
    unlockConditions: ["mq09_complete"],
    extractionDependency: "choice",
    failureConditions: ["run_abandoned"],
  },
  {
    id: "bounty_chemfog_blackout",
    displayName: "Chemfog Blackout",
    description: "Survive 240s in Chemiefabrik fog. -25% shield margin, +50% Tech gain.",
    objectives: [{ type: "SurviveSeconds", targetCount: 240 }],
    effects: [
      { type: "IncomingDamageMultiplier", value: 1.25 },
      { type: "TechMultiplier", value: 1.5 },
    ],
    rewardScrap: 350,
    rewardTech: 5,
    unlockCost: 1200,
    unlockConditions: ["sq_graumarsch_chemfog_complete"],
    extractionDependency: "extraction",
    failureConditions: ["player_defeated", "no_extraction"],
  },
]

export function getBounty(id: string): BountyData | undefined {
  return BOUNTIES.find((b) => b.id === id)
}

export function canUnlockBounty(bounty: BountyData, completedFlags: string[]): boolean {
  if (!bounty.unlockConditions || bounty.unlockConditions.length === 0) return true
  return bounty.unlockConditions.every((f) => completedFlags.includes(f))
}

export function enforceSingleBountySelection(selectedBountyIds: string[]): string[] {
  if (selectedBountyIds.length <= 1) return selectedBountyIds
  return [selectedBountyIds[selectedBountyIds.length - 1]]
}

export interface BountyRuntimeMultipliers {
  scrapMult: number
  techMult: number
  enemyMaxAliveMult: number
  damageBonus: number
  incomingDamageMult: number
}

export function aggregateBountyEffects(bountyIds: string[]): BountyRuntimeMultipliers {
  const m: BountyRuntimeMultipliers = {
    scrapMult: 1.0,
    techMult: 1.0,
    enemyMaxAliveMult: 1.0,
    damageBonus: 0,
    incomingDamageMult: 1.0,
  }
  for (const id of enforceSingleBountySelection(bountyIds)) {
    const b = getBounty(id)
    if (!b) continue
    for (const e of b.effects) {
      switch (e.type) {
        case "ScrapMultiplier": m.scrapMult *= e.value; break
        case "TechMultiplier": m.techMult *= e.value; break
        case "EnemyMaxAliveMultiplier": m.enemyMaxAliveMult *= e.value; break
        case "DamageBonus": m.damageBonus += e.value; break
        case "IncomingDamageMultiplier": m.incomingDamageMult *= e.value; break
        case "EliteExtraScrapDrops": break
      }
    }
  }
  return m
}
