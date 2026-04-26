import type { Quest } from "./StoryTypes"

export type RunOutcome = "extract" | "defeat" | "abandon" | "practice"

export interface QuestCompletionContext {
  requiredObjectivesComplete: boolean
  extractionSuccessful: boolean
}

export interface RewardBuckets {
  immediate: string[]
  completion: string[]
  extraction: string[]
  choice: string[]
  lostOnDefeat: string[]
}

export function canCompleteQuest(
  quest: Pick<Quest, "type" | "status"> & { requiresExtractionForCompletion?: boolean },
  ctx: QuestCompletionContext,
): boolean {
  if (quest.status !== "active" && quest.status !== "ready_to_turn_in") return false
  if (!ctx.requiredObjectivesComplete) return false
  if (quest.requiresExtractionForCompletion) return ctx.extractionSuccessful
  return true
}

export function resolveRunRewards(outcome: RunOutcome, rewards: RewardBuckets): RewardBuckets {
  if (outcome === "practice") {
    return {
      immediate: rewards.immediate,
      completion: [],
      extraction: [],
      choice: [],
      lostOnDefeat: [],
    }
  }

  if (outcome === "extract") {
    return rewards
  }

  return {
    immediate: rewards.immediate,
    completion: rewards.completion,
    extraction: [],
    choice: [],
    lostOnDefeat: rewards.lostOnDefeat,
  }
}
