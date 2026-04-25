export type CharacterId =
  | "lyra_dorn"
  | "mira_voss"
  | "tarek_al_sahir"
  | "siofra_nhal"
  | "brannok_reef"
  | "edda_falkenlicht"
  | "oren_vale"
  | "yara_kest"
  | "kael_nhar"
  | "neris_vael"
  | "velka_sturmtritt"
  | "cyr_ohne_gestern"
  | "rixa"
  | "marek";

export type SkillType =
  | "basic"
  | "technique"
  | "ultimate"
  | "vehicle"
  | "passive"
  | "combo_hook";

export type Rarity =
  | "common"
  | "refined"
  | "rare"
  | "signature"
  | "relic"
  | "mythic";

export type VehicleModuleSlot =
  | "frame"
  | "engine"
  | "weapon"
  | "utility"
  | "defense"
  | "relic_core"
  | "cosmetic";

export type LootCategory =
  | "weapon"
  | "armor"
  | "trinket"
  | "crafting_material"
  | "housing"
  | "vehicle_part";

export type ModifierOperation = "add_flat" | "add_percent" | "multiply";

export interface SkillEffect {
  type: string;
  value: number;
  duration?: number;
  statKey?: string;
  statusEffectId?: string;
}

export interface StatModifier {
  stat: string;
  value: number;
  isPercent?: boolean;
  operation?: ModifierOperation;
}

export interface SkillDefinition {
  id: string;
  characterId: CharacterId;
  name: string;
  type: SkillType;
  input: string;
  cooldownMs: number;
  staminaCost: number;
  moonGlassCost?: number;
  tags: string[];
  description: string;
  effects: SkillEffect[];
  vehicleCompatible: boolean;
  comboTags: string[];
}

export interface UpgradeNode {
  id: string;
  name: string;
  description: string;
  tier: 1 | 2 | 3 | 4;
  statModifiers: StatModifier[];
  requirementIds?: string[];
}

export interface UpgradeNodeDefinition {
  id: string;
  characterId: CharacterId;
  name: string;
  tier: number;
  cost: number;
  requires: string[];
  description: string;
  modifiers: StatModifier[];
  tags: string[];
}

export interface VehicleModule {
  id: string;
  name: string;
  slot:
    | VehicleModuleSlot
    | "chassis"
    | "core"
    | "front_weapon"
    | "side_weapon"
    | "rear_utility"
    | "mobility"
    | "armor";
  tier: "common" | "uncommon" | "rare" | "signature" | "relic" | "mythic";
  effect: string;
  characterId: CharacterId | "all";
}

export interface VehicleModuleDefinition {
  id: string;
  name: string;
  slot: VehicleModuleSlot;
  rarity: Rarity;
  vehicleTags: string[];
  statModifiers: StatModifier[];
  activeAbilityId?: string;
  passiveEffect: string;
  dropSources: string[];
  tags: string[];
}

export interface VehicleDefinition {
  id: string;
  name: string;
  class: string;
  characterId: CharacterId;
  description: string;
  baseStats: Record<string, number>;
  supportedModuleSlots?: VehicleModuleSlot[];
}

export interface CharacterVehicleDefinition {
  id: string;
  characterId: CharacterId;
  name: string;
  role: string;
  signatureMove: string;
  handling: number;
  armor: number;
  speed: number;
  heatLimit: number;
  slots: VehicleModuleSlot[];
  unlockSource: string;
  tags: string[];
}

export interface LootItem {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  type: "material" | "module" | "currency" | "consumable";
  icon?: string;
}

export interface LootItemDefinition {
  id: string;
  name: string;
  rarity: Rarity;
  category: LootCategory;
  level: number;
  description: string;
  statModifiers: StatModifier[];
  bind: "none" | "character" | "account";
  tags: string[];
  sources: string[];
}

export interface DropTableEntry {
  itemId: string;
  weight: number;
  minLevel?: number;
  maxLevel?: number;
  characterBias?: CharacterId[];
  pityEligible?: boolean;
  guaranteedAfterRuns?: number;
}

export interface DropTable {
  id: string;
  name: string;
  entries: DropTableEntry[];
}

export interface DropTableDefinition {
  id: string;
  name: string;
  region: string;
  entries: DropTableEntry[];
  guaranteed: string[];
  tags: string[];
}

export interface BossPhase {
  id: string;
  name: string;
  hpThreshold: number;
  abilities: string[];
  description: string;
}

export interface BossPhaseDefinition {
  id: string;
  name: string;
  healthPercentStart: number;
  mechanics: string[];
}

export interface BossDefinition {
  id: string;
  name: string;
  title: string;
  description: string;
  region: string;
  phases: BossPhase[];
  dropTableId: string;
}

export interface ExtendedBossDefinition {
  id: string;
  name: string;
  region: string;
  theme: string;
  recommendedPlayers: string;
  recommendedLevel: number;
  health: number;
  armor: number;
  vehicleRequired: boolean;
  phases: BossPhaseDefinition[];
  dropTableId: string;
  signatureLootIds: string[];
  failureState: string;
  tags: string[];
}

export interface MultiplayerCombo {
  id: string;
  name: string;
  type: "duo" | "vehicle_convoy" | string;
  trigger: string;
  effect: string;
}

export interface MultiplayerComboDefinition {
  id: string;
  name: string;
  characterIds: CharacterId[];
  requiredTags: string[];
  triggerWindowMs: number;
  result: string;
  vehicleCompatible: boolean;
  effects: SkillEffect[];
  tags: string[];
}

export interface CharacterDefinition {
  id: CharacterId;
  name: string;
  region: string;
  archetype: string;
  combatIdentity: string;
  storyHook: string;
  unlockChapter: number;
  tags: string[];
}

export interface StatusEffectDefinition {
  id: string;
  name: string;
  description: string;
}

export interface QuestDefinition {
  id: string;
  name: string;
  type: "main" | "regional" | "companion" | "world_event";
  region: string;
  estimatedMinutes: number;
  unlocks: string[];
  rewardDropTableId: string;
  worldStateFlags: string[];
  description: string;
}

export interface ContentDatabase {
  characters: CharacterDefinition[];
  statusEffects: StatusEffectDefinition[];
  skills: SkillDefinition[];
  upgrades: UpgradeNodeDefinition[];
  vehicles: CharacterVehicleDefinition[];
  vehicleModules: VehicleModuleDefinition[];
  loot: LootItemDefinition[];
  dropTables: DropTableDefinition[];
  bosses: ExtendedBossDefinition[];
  multiplayerCombos: MultiplayerComboDefinition[];
  quests: QuestDefinition[];
}
