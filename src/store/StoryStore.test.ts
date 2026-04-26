import { beforeEach, describe, expect, it } from "vitest"
import { useStoryStore } from "./StoryStore"
import { QUESTS } from "../data/story/quests"
import type { Quest } from "../game/StoryTypes"
import type { AreaProgressState } from "../data/AreaData"

function resetStoryStore() {
  useStoryStore.setState({
    quests: structuredClone(QUESTS),
    activeQuests: structuredClone(QUESTS).filter((q) => q.status === "active"),
    worldState: {
      flags: {},
      reputation: {
        "Letzte Laternen": 0,
        Zahir: 0,
        Nhal: 0,
        "Werftzuenfte": 0,
        Falkenlicht: 0,
        "Russmarkt": 0,
      },
    },
    areaProgress: {
      graumarsch: "active_quest",
      sonnenglasweite: "locked",
      "wurzelwald-nhal": "locked",
    } as Record<string, AreaProgressState>,
  })
}

describe("StoryStore area progression", () => {
  beforeEach(() => resetStoryStore())

  it("marks mapped area as cleared_free_run when main quest is completed", () => {
    useStoryStore.getState().updateQuestStatus("MQ-00", "completed")

    const state = useStoryStore.getState()
    expect(state.areaProgress.graumarsch).toBe("cleared_free_run")
  })

  it("marks mapped area as active_quest when non-main quest is completed", () => {
    const sideQuest: Quest = {
      id: "SQ-TEST-1",
      title: "Test Side Quest",
      description: "Test Description",
      region: "Sonnenglasweite",
      type: "side",
      requirements: [],
      rewards: [],
      objectives: [{ id: "o1", description: "x", isCompleted: false }],
      status: "active",
    }
    useStoryStore.setState((state) => ({
      quests: [...state.quests, sideQuest],
      activeQuests: [...state.activeQuests, sideQuest],
    }))

    useStoryStore.getState().updateQuestStatus("SQ-TEST-1", "completed")

    const state = useStoryStore.getState()
    expect(state.areaProgress.sonnenglasweite).toBe("active_quest")
  })
})

