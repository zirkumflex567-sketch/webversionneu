import { create } from 'zustand';
import { Quest, NPC, WorldState, QuestStatus } from '../game/StoryTypes';
import { QUESTS, NPCS } from '../data/story/quests';
import { DIALOGS } from '../data/story/dialogs';
import { SaveManager } from '../save/SaveManager';
import { CharacterId } from '../save/SaveSchema';
import { AREA_DEFINITIONS, AreaProgressState } from '../data/AreaData';

const STORY_UNLOCK_TO_CHARACTER: Record<string, CharacterId> = {
  'Lyra Dorn': 'lyra',
  'Mira Voss': 'mira',
  'Tarek al-Sahir': 'tarek',
  'Siofra Nhal': 'siofra',
  'Brannok Reef': 'brannok',
  'Edda Falkenlicht': 'edda',
  'Kael Nhar': 'kael',
}

const POST_20H_UNLOCKS: CharacterId[] = ['oren', 'yara', 'neris', 'velka', 'cyr']

function syncCharacterUnlocksFromStory(quests: Quest[]): void {
  const completed = quests.filter(q => q.status === 'completed')

  for (const quest of completed) {
    for (const reward of quest.rewards) {
      if (reward.type !== 'unlock') continue
      const charId = STORY_UNLOCK_TO_CHARACTER[String(reward.value)]
      if (charId) SaveManager.ensureCharacterUnlocked(charId)
    }
  }

  // Post-20h roster: unlock once campaign finale quest is completed.
  if (completed.some(q => q.id === 'MQ-22')) {
    SaveManager.ensureCharactersUnlocked(POST_20H_UNLOCKS)
  }
}


export interface DialogOption {
  text: string;
  nextId?: string;
  action?: () => void;
  requirement?: string;
}

export interface DialogNode {
  id: string;
  speaker: string;
  text: string;
  options: DialogOption[];
}

interface StoryState {
  quests: Quest[];
  npcs: NPC[];
  worldState: WorldState;
  currentDialog: DialogNode | null;
  dialogs: Record<string, DialogNode>;
  activeQuests: Quest[];
  characterBonuses: Record<string, { critChancePercent?: number; moveSpeedPercent?: number; armor?: number; loreAccess?: boolean }>;
  areaProgress: Record<string, AreaProgressState>;

  // Actions
  updateQuestStatus: (id: string, status: QuestStatus) => void;
  updateObjective: (questId: string, objectiveId: string, completed: boolean) => void;
  setFlag: (flag: string, value: boolean | string | number) => void;
  setReputation: (faction: string, level: number) => void;
  unlockQuest: (id: string) => void;
  startDialog: (node: DialogNode) => void;
  startDialogById: (id: string) => void;
  endDialog: () => void;
  notifyEvent: (type: string, value: unknown) => void;
  checkRequirements: () => void;
  addCharacterBonus: (characterId: string, bonus: { critChancePercent?: number; moveSpeedPercent?: number; armor?: number; loreAccess?: boolean }) => void;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  quests: QUESTS,
  npcs: NPCS,
  worldState: {
    flags: {},
    reputation: {
      'Letzte Laternen': 0,
      'Zahir': 0,
      'Nhal': 0,
      'Werftzünfte': 0,
      'Falkenlicht': 0,
      'Rußmarkt': 0
    }
  },
  currentDialog: null,
  dialogs: DIALOGS,
  activeQuests: QUESTS.filter(q => q.status === 'active'),
  characterBonuses: {},
  areaProgress: Object.fromEntries(AREA_DEFINITIONS.map((a) => [a.id, a.state])) as Record<string, AreaProgressState>,

  updateQuestStatus: (id, status) => {
    set((state) => {
      const newQuests: Quest[] = state.quests.map((q): Quest => (q.id === id ? { ...q, status } : q));
      
      // Handle rewards if completed
      if (status === 'completed') {
        const quest = state.quests.find(q => q.id === id);
        if (quest) {
          quest.rewards.forEach(reward => {
            if (reward.type === 'unlock') {
              // We'll unlock the next quest in the chain
              const targetQuest = newQuests.find(q => q.id === reward.value);
              if (targetQuest && targetQuest.status === 'locked') {
                targetQuest.status = 'available';
              }
            }
          });
        }
      }

      const areaProgress = { ...state.areaProgress }
      if (status === 'completed') {
        const quest = state.quests.find(q => q.id === id)
        if (quest) {
          const regionToAreaId: Record<string, string> = {
            Graumarsch: 'graumarsch',
            Sonnenglasweite: 'sonnenglasweite',
            Wurzelwald: 'wurzelwald-nhal',
          }
          const areaId = regionToAreaId[quest.region]
          if (areaId) {
            areaProgress[areaId] = quest.type === 'main' ? 'cleared_free_run' : 'active_quest'
          }
        }
      }

      syncCharacterUnlocksFromStory(newQuests);

      return {
        quests: newQuests,
        activeQuests: newQuests.filter(q => q.status === 'active'),
        areaProgress,
      };
    });
    
    // After status update, check if other quests can be unlocked based on new state
    get().checkRequirements();
  },

  updateObjective: (questId, objectiveId, completed) => set((state) => {
    const newQuests: Quest[] = state.quests.map((q): Quest => 
      q.id === questId 
        ? { ...q, objectives: q.objectives.map((o) => o.id === objectiveId ? { ...o, isCompleted: completed } : o) } 
        : q
    );
    
    // Auto-complete quest if all objectives done? 
    // Maybe not, some might need manual turn-in, but for prototype let's auto-complete MQ-00
    const quest = newQuests.find(q => q.id === questId);
    if (quest && quest.status === 'active' && quest.objectives.every(o => o.isCompleted)) {
      // In a real game we might wait for player action, but for now...
      // status = 'completed' will be handled by a separate call usually, 
      // but let's at least update activeQuests
    }

    return {
      quests: newQuests,
      activeQuests: newQuests.filter(q => q.status === 'active')
    };
  }),

  setFlag: (flag, value) => {
    set((state) => ({
      worldState: {
        ...state.worldState,
        flags: { ...state.worldState.flags, [flag]: value }
      }
    }));
    get().checkRequirements();
  },

  setReputation: (faction, level) => set((state) => ({
    worldState: {
      ...state.worldState,
      reputation: { ...state.worldState.reputation, [faction]: level }
    }
  })),

  unlockQuest: (id) => set((state) => {
    const newQuests: Quest[] = state.quests.map((q): Quest =>
      q.id === id && q.status === 'locked' ? { ...q, status: 'available' } : q
    );
    return {
      quests: newQuests,
      activeQuests: newQuests.filter(q => q.status === 'active')
    };
  }),

  startDialog: (node) => set({ currentDialog: node }),
  startDialogById: (id) => {
    const node = get().dialogs[id];
    if (node) set({ currentDialog: node });
  },
  endDialog: () => set({ currentDialog: null }),

  notifyEvent: (type, value) => {
    const state = get();
    let changed = false;
    
    const newQuests = state.quests.map(q => {
      if (q.status !== 'active') return q;
      
      let questChanged = false;
      const newObjectives = q.objectives.map(obj => {
        if (obj.isCompleted) return obj;
        
        // Simple event mapping
        if (type === 'kill' && obj.id === 'kills' && typeof value === 'number') {
          // This would need a 'target' value in the objective, but for now we'll just check if it matches
          // For simplicity, let's assume if it matches the ID it's a kill counter
        }
        
        // Specific quest logic for MQ-00/MQ-01
        if (q.id === 'MQ-01' && type === 'wave' && value === 1 && obj.id === 'defend') {
          questChanged = true;
          return { ...obj, isCompleted: true };
        }

        return obj;
      });

      if (questChanged) {
        changed = true;
        return { ...q, objectives: newObjectives };
      }
      return q;
    });

    if (changed) {
      set({ 
        quests: newQuests,
        activeQuests: newQuests.filter(q => q.status === 'active')
      });
      // If all objectives are completed, set status to ready_to_turn_in
      newQuests.forEach(q => {
        if (q.status === 'active' && q.objectives.every(o => o.isCompleted)) {
          get().updateQuestStatus(q.id, 'ready_to_turn_in');
        }
      });
    }
  },

  checkRequirements: () => {
    const state = get();
    let changed = false;
    const newQuests: Quest[] = state.quests.map((q): Quest => {
      if (q.status !== 'locked') return q;

      // Check if requirements (other quests or flags) are met
      const allMet = q.requirements.every(req => {
        // Is it a quest ID?
        const reqQuest = state.quests.find(rq => rq.id === req);
        if (reqQuest) return reqQuest.status === 'completed';

        // Is it a flag?
        return !!state.worldState.flags[req];
      });

      if (allMet && q.requirements.length > 0) {
        changed = true;
        return { ...q, status: 'available' as QuestStatus };
      }
      return q;
    });

    if (changed) {
      set({
        quests: newQuests,
        activeQuests: newQuests.filter(q => q.status === 'active')
      });
    }

    syncCharacterUnlocksFromStory(changed ? newQuests : state.quests);
  },

  addCharacterBonus: (characterId, bonus) => set((state) => ({
    characterBonuses: {
      ...state.characterBonuses,
      [characterId]: { ...state.characterBonuses[characterId], ...bonus }
    }
  }))
}));
