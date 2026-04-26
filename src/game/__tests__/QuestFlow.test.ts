import { describe, expect, it } from "vitest"
import { canCompleteQuest, resolveRunRewards } from "../QuestFlow"

describe("QuestFlow", () => {
  it("enforces extraction when quest requires it", () => {
    const quest = { type: "side" as const, status: "active" as const, requiresExtractionForCompletion: true }
    expect(canCompleteQuest(quest, { requiredObjectivesComplete: true, extractionSuccessful: false })).toBe(false)
    expect(canCompleteQuest(quest, { requiredObjectivesComplete: true, extractionSuccessful: true })).toBe(true)
  })

  it("allows completion without extraction when not required", () => {
    const quest = { type: "companion" as const, status: "ready_to_turn_in" as const, requiresExtractionForCompletion: false }
    expect(canCompleteQuest(quest, { requiredObjectivesComplete: true, extractionSuccessful: false })).toBe(true)
  })

  it("resolves reward buckets for extract and defeat outcomes", () => {
    const rewards = {
      immediate: ["codex_unlock"],
      completion: ["scrap_200"],
      extraction: ["tech_2"],
      choice: ["pick_one_mod"],
      lostOnDefeat: ["unbanked_tech"],
    }

    const extracted = resolveRunRewards("extract", rewards)
    expect(extracted.extraction).toEqual(["tech_2"])
    expect(extracted.choice).toEqual(["pick_one_mod"])

    const defeated = resolveRunRewards("defeat", rewards)
    expect(defeated.extraction).toEqual([])
    expect(defeated.choice).toEqual([])
    expect(defeated.lostOnDefeat).toEqual(["unbanked_tech"])
  })
})
