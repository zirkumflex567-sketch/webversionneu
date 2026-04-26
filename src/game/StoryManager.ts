import { useStoryStore } from "../store/StoryStore"
import { useGameStore } from "../store"
import { t } from "../i18n"

export class StoryManager {
  private static instance: StoryManager

  private constructor() {}

  public static getInstance(): StoryManager {
    if (!StoryManager.instance) {
      StoryManager.instance = new StoryManager()
    }
    return StoryManager.instance
  }

  public update() {
    const story = useStoryStore.getState()
    const game = useGameStore.getState()

    const mq00 = story.quests.find((q) => q.id === "MQ-00")
    if (mq00 && mq00.status === "active") {
      if (game.scrap >= 10 && !mq00.objectives.find((o) => o.id === "oil")?.isCompleted) {
        story.updateObjective("MQ-00", "oil", true)
      }
      if (mq00.objectives.every((o) => o.isCompleted)) {
        story.updateQuestStatus("MQ-00", "completed")
        story.unlockQuest("MQ-01")
      }
    }

    const mq01 = story.quests.find((q) => q.id === "MQ-01")
    if (mq01 && mq01.status === "active") {
      if (game.wave >= 1 && !mq01.objectives.find((o) => o.id === "defend")?.isCompleted) {
        story.updateObjective("MQ-01", "defend", true)
      }
    }

    const mq04 = story.quests.find((q) => q.id === "MQ-04")
    if (mq04 && mq04.status === "active") {
      if (game.enemiesKilledThisRun >= 50 && !mq04.objectives.find((o) => o.id === "mira")?.isCompleted) {
        story.updateObjective("MQ-04", "mira", true)
        game.showCallout(t("callout.story.mira_found", undefined, game.locale), 4000, "normal")
      }
    }

    const mq11 = story.quests.find((q) => q.id === "MQ-11")
    if (mq11 && mq11.status === "active") {
      if (game.nightmareKills >= 5 && !mq11.objectives.find((o) => o.id === "child")?.isCompleted) {
        story.updateObjective("MQ-11", "child", true)
      }
    }

    const mq14 = story.quests.find((q) => q.id === "MQ-14")
    if (mq14 && mq14.status === "active") {
      if (game.totalKills >= 100 && !mq14.objectives.find((o) => o.id === "reef")?.isCompleted) {
        story.updateObjective("MQ-14", "reef", true)
      }
    }

    const mq05 = story.quests.find((q) => q.id === "MQ-05")
    if (mq05 && mq05.status === "active") {
      if (game.wave >= 2 && !mq05.objectives.find((o) => o.id === "posten1")?.isCompleted) {
        story.updateObjective("MQ-05", "posten1", true)
        game.showCallout(t("callout.story.wick_one", undefined, game.locale), 3000, "normal")
      }
      if (game.wave >= 4 && !mq05.objectives.find((o) => o.id === "posten2")?.isCompleted) {
        story.updateObjective("MQ-05", "posten2", true)
        game.showCallout(t("callout.story.wick_two", undefined, game.locale), 3000, "normal")
      }
      if (game.wave >= 6 && !mq05.objectives.find((o) => o.id === "posten3")?.isCompleted) {
        story.updateObjective("MQ-05", "posten3", true)
        game.showCallout(t("callout.story.wick_three", undefined, game.locale), 5000, "normal")
      }
    }
  }

  public interactWithNPC(npcId: string) {
    const story = useStoryStore.getState()
    const npc = story.npcs.find((n) => n.id === npcId)
    if (!npc) return

    if (npcId === "lyra") {
      const mq00 = story.quests.find((q) => q.id === "MQ-00")
      if (mq00?.status === "active") {
        story.startDialog({
          id: "lyra_mq00",
          speaker: "Lyra Dorn",
          text: "Pass auf da draußen. Der Sumpf ist heute unruhig. Hast du das Öl schon gefunden?",
          options: [{ text: "Ich bin dabei." }, { text: "Was weißt du über die Schatten?" }],
        })
      } else {
        story.startDialog({
          id: "lyra_idle",
          speaker: "Lyra Dorn",
          text: "Ein weiterer Tag in der Asche. Bleib wachsam.",
          options: [{ text: "Verstanden." }],
        })
      }
    }
  }
}
