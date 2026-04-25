export type QuestStatus = 'locked' | 'available' | 'active' | 'ready_to_turn_in' | 'completed' | 'failed';

export interface Quest {
  id: string;
  title: string;
  description: string;
  region: string;
  type: 'main' | 'side' | 'companion' | 'event';
  giver?: string;
  requirements: string[]; // List of flag IDs or other quest IDs
  rewards: Reward[];
  objectives: Objective[];
  status: QuestStatus;
}

export interface Objective {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface Reward {
  type: 'scrap' | 'tech' | 'item' | 'reputation' | 'unlock';
  value: unknown;
  description: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  region: string;
  arc: string;
  status: 'alive' | 'dead' | 'unknown' | 'recruited';
  bonus?: { stat: string; value: number };
}

export interface WorldState {
  flags: Record<string, boolean | number | string>;
  reputation: Record<string, number>; // factionId -> level
}

export interface Region {
  id: string;
  name: string;
  colorTheme: string;
  soundscape: string;
  unlocked: boolean;
}
