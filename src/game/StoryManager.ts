import { useStoryStore } from '../store/StoryStore';
import { useGameStore } from '../store';

export class StoryManager {
  private static instance: StoryManager;

  private constructor() {}

  public static getInstance(): StoryManager {
    if (!StoryManager.instance) {
      StoryManager.instance = new StoryManager();
    }
    return StoryManager.instance;
  }

  /**
   * Check for quest progress based on gameplay events.
   * This should be called from the main game loop or event listeners.
   */
  public update() {
    const story = useStoryStore.getState();
    const game = useGameStore.getState();

    // MQ-00 Progression Logic
    const mq00 = story.quests.find(q => q.id === 'MQ-00');
    if (mq00 && mq00.status === 'active') {
      // Example: If player has enough scrap, consider "oil brought" (placeholder logic)
      if (game.scrap >= 10 && !mq00.objectives.find(o => o.id === 'oil')?.isCompleted) {
        story.updateObjective('MQ-00', 'oil', true);
        console.log('[Story] MQ-00 Objective: Oil brought!');
      }

      // If all objectives done, complete quest and unlock next
      if (mq00.objectives.every(o => o.isCompleted)) {
        story.updateQuestStatus('MQ-00', 'completed');
        story.unlockQuest('MQ-01');
        console.log('[Story] MQ-00 Completed! MQ-01 Unlocked.');
      }
    }

    // MQ-01 Progression Logic
    const mq01 = story.quests.find(q => q.id === 'MQ-01');
    if (mq01 && mq01.status === 'active') {
      if (game.wave >= 1 && !mq01.objectives.find(o => o.id === 'defend')?.isCompleted) {
        story.updateObjective('MQ-01', 'defend', true);
      }
    }

    // MQ-02 Progression Logic
    const mq02 = story.quests.find(q => q.id === 'MQ-02');
    if (mq02 && mq02.status === 'active') {
      // MQ-02 objectives are handled via dialogs/events for now
    }

    // MQ-04 Progression Logic (Mira Voss / GlassBeast)
    const mq04 = story.quests.find(q => q.id === 'MQ-04');
    if (mq04 && mq04.status === 'active') {
      // Proxy for boss kill: 50 kills in MQ-04 active run
      if (game.enemiesKilledThisRun >= 50 && !mq04.objectives.find(o => o.id === 'mira')?.isCompleted) {
        story.updateObjective('MQ-04', 'mira', true);
        useGameStore.getState().showCallout("MIRA VOSS GEFUNDEN!", 4000, 'normal');
      }
    }

    // MQ-11 Progression Logic (Ileth / Nightmare Kills)
    const mq11 = story.quests.find(q => q.id === 'MQ-11');
    if (mq11 && mq11.status === 'active') {
      if (game.nightmareKills >= 5 && !mq11.objectives.find(o => o.id === 'child')?.isCompleted) {
        story.updateObjective('MQ-11', 'child', true);
        console.log('[Story] MQ-11 Objective: Nightmare Echos defeated!');
      }
    }

    // MQ-14 Progression Logic (Reef / Total Kills)
    const mq14 = story.quests.find(q => q.id === 'MQ-14');
    if (mq14 && mq14.status === 'active') {
      if (game.totalKills >= 100 && !mq14.objectives.find(o => o.id === 'reef')?.isCompleted) {
        story.updateObjective('MQ-14', 'reef', true);
        console.log('[Story] MQ-14 Objective: Port cleared!');
      }
    }

    // MQ-05 Progression Logic (Three Wicks)
    const mq05 = story.quests.find(q => q.id === 'MQ-05');
    if (mq05 && mq05.status === 'active') {
      if (game.wave >= 2 && !mq05.objectives.find(o => o.id === 'posten1')?.isCompleted) {
        story.updateObjective('MQ-05', 'posten1', true);
        game.showCallout("ERSTER DOCHT ENTZÜNDET!", 3000, 'normal');
      }
      if (game.wave >= 4 && !mq05.objectives.find(o => o.id === 'posten2')?.isCompleted) {
        story.updateObjective('MQ-05', 'posten2', true);
        game.showCallout("ZWEITER DOCHT ENTZÜNDET!", 3000, 'normal');
      }
      if (game.wave >= 6 && !mq05.objectives.find(o => o.id === 'posten3')?.isCompleted) {
        story.updateObjective('MQ-05', 'posten3', true);
        game.showCallout("DRITTER DOCHT ENTZÜNDET! DER WEG IST FREI.", 5000, 'normal');
      }
    }
  }

  /**
   * Triggered when an NPC is interacted with
   */
  public interactWithNPC(npcId: string) {
    const story = useStoryStore.getState();
    const npc = story.npcs.find(n => n.id === npcId);

    if (!npc) return;

    console.log(`[Story] Interacting with NPC: ${npc.name}`);

    // Custom dialog logic based on world state and active quests
    if (npcId === 'lyra') {
      const mq00 = story.quests.find(q => q.id === 'MQ-00');
      if (mq00?.status === 'active') {
        story.startDialog({
          id: 'lyra_mq00',
          speaker: 'Lyra Dorn',
          text: 'Pass auf da draußen. Der Sumpf ist heute unruhig. Hast du das Öl schon gefunden?',
          options: [
            { text: 'Ich bin dabei.', action: () => console.log('Lyra encourages player') },
            { text: 'Was weißt du über die Schatten?' }
          ]
        });
      } else {
        story.startDialog({
          id: 'lyra_idle',
          speaker: 'Lyra Dorn',
          text: 'Ein weiterer Tag in der Asche. Bleib wachsam.',
          options: [{ text: 'Verstanden.' }]
        });
      }
    }
  }
}
