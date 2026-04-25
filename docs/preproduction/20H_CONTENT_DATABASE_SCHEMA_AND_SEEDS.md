# Scherbenhimmel 20h — Content Database Schema and Seed Blueprint

This document defines how all 20h authored content should be represented as database/content entries. It is written for agents and developers. Player-facing text must use localization keys from the DE/EN localization documents.

## Purpose

The 20h docs contain narrative and design detail. This file turns that detail into implementable content database shapes and seed examples for:

- areas,
- area instances,
- quests,
- objectives,
- choices,
- rewards,
- characters,
- abilities,
- statuses,
- bounties,
- items,
- codex,
- localization,
- shop entries,
- tech-lab nodes,
- validation.

## Recommended Storage Approach

For first implementation, use typed TypeScript content modules instead of a runtime-editable database:

```text
src/content/*.ts
```

Reasons:

- version-controlled,
- easy to validate in CI,
- type-safe,
- simple for agents to edit,
- avoids premature CMS/database complexity.

Later, this can be migrated to SQLite/Postgres/admin tooling using the same schemas.

## Core ID Conventions

| Type | Pattern | Example |
|---|---|---|
| Area | `area_<slug>` | `area_graumarsch` |
| Area Instance | `inst_<area>_<purpose>` | `inst_graumarsch_mq05_final_lantern` |
| Main Quest | `mq##_slug` | `mq04_marsh_cathedral` |
| Side Quest | `sq_<area>_##` | `sq_gr_01_smokehouse` |
| Companion Quest | `cq_<character>_##` | `cq_ly_01_burning_houses` |
| Bounty | `bo_<area>_##` | `bo_gr_01_dam_groans` |
| Character | `char_<name>` | `char_lyra_dorn` |
| Ability | `abil_<character>_<slug>` | `abil_lyra_sparkshot` |
| Status | `status_<slug>` | `status_mondbrand` |
| Item | `item_<slug>` | `item_toma_glass_star` |
| Codex | `codex_<category>_<slug>` | `codex_world_moonglass` |
| Localization | dotted namespace | `quest.main.mq04.title` |

## Shared Types

```ts
export type Locale = 'de' | 'en';

export type RewardPersistenceCategory =
  | 'immediate_lore'
  | 'on_objective_completion'
  | 'on_extraction'
  | 'choice_based'
  | 'lost_on_defeat'
  | 'practice_only';

export type AreaState = 'locked' | 'active_quest' | 'cleared_free_run';

export type MissionMode =
  | 'story'
  | 'side'
  | 'companion'
  | 'bounty'
  | 'free_run'
  | 'boss_hunt'
  | 'farm'
  | 'practice';
```

---

# 1. Area Definitions

## Schema

```ts
export interface AreaDef {
  id: string;
  nameKey: string;
  taglineKey: string;
  firstEntryQuestId: string;
  areaQuestlineCompletionQuestId: string;
  freeRunUnlockQuestId: string;
  defaultState: AreaState;
  allowedModesWhenLocked: MissionMode[];
  allowedModesWhenActive: MissionMode[];
  allowedModesWhenCleared: MissionMode[];
  hazards: string[];
  enemyFamilies: string[];
  bossPool: string[];
  lootBias: string[];
  extractionModifierId: string;
  codexEntryIds: string[];
  worldStateFlagIds: string[];
}
```

## Seed Examples

```ts
export const areas: AreaDef[] = [
  {
    id: 'area_graumarsch',
    nameKey: 'region.graumarsch.name',
    taglineKey: 'region.graumarsch.tagline',
    firstEntryQuestId: 'mq00_evening_before_rain',
    areaQuestlineCompletionQuestId: 'mq05_three_wicks',
    freeRunUnlockQuestId: 'mq05_three_wicks',
    defaultState: 'active_quest',
    allowedModesWhenLocked: [],
    allowedModesWhenActive: ['story', 'side', 'companion'],
    allowedModesWhenCleared: ['free_run', 'bounty', 'boss_hunt', 'farm', 'practice'],
    hazards: ['hazard_deep_mud', 'hazard_lantern_fire', 'hazard_memory_fog', 'hazard_rotten_walkway'],
    enemyFamilies: ['enemy_family_nightflood_shades', 'enemy_family_mirror_eels', 'enemy_family_lanternless'],
    bossPool: ['boss_raincoat_man', 'boss_faceless_archive_warden', 'boss_wet_ensign'],
    lootBias: ['loot_moonglass_low', 'loot_lantern_parts', 'loot_mobility_mods'],
    extractionModifierId: 'extract_graumarsch_fog_pressure',
    codexEntryIds: ['codex_region_graumarsch', 'codex_world_moonglass'],
    worldStateFlagIds: ['flag_fackelruh_burned', 'flag_graumarsch_fast_travel_lit'],
  },
  {
    id: 'area_sonnenglasweite',
    nameKey: 'region.sonnenglasweite.name',
    taglineKey: 'region.sonnenglasweite.tagline',
    firstEntryQuestId: 'mq06_road_of_glass',
    areaQuestlineCompletionQuestId: 'mq09_convoy_glass_hollow',
    freeRunUnlockQuestId: 'mq09_convoy_glass_hollow',
    defaultState: 'locked',
    allowedModesWhenLocked: [],
    allowedModesWhenActive: ['story', 'side', 'companion'],
    allowedModesWhenCleared: ['free_run', 'bounty', 'boss_hunt', 'farm', 'practice'],
    hazards: ['hazard_shardstorm', 'hazard_mirror_floor', 'hazard_saltburn', 'hazard_debt_anchor'],
    enemyFamilies: ['enemy_family_debt_collectors', 'enemy_family_salt_raiders', 'enemy_family_mirror_beasts'],
    bossPool: ['boss_noret_debt_bookkeeper', 'boss_glass_ray_alpha'],
    lootBias: ['loot_decoy_mods', 'loot_spear_mods', 'loot_contract_artifacts'],
    extractionModifierId: 'extract_sonnenglasweite_exposed_storm',
    codexEntryIds: ['codex_region_sonnenglasweite', 'codex_faction_zahir'],
    worldStateFlagIds: ['flag_tarek_contract_resolved', 'flag_trade_route_open'],
  },
];
```

---

# 2. Area Instance Definitions

Area instances define the loaded mission map variant.

## Schema

```ts
export interface AreaInstanceDef {
  id: string;
  areaId: string;
  mode: MissionMode;
  questId?: string;
  bountyId?: string;
  titleKey: string;
  introKey: string;
  allowedLocationIds: string[];
  primaryObjectiveIds: string[];
  optionalObjectiveIds: string[];
  extractionLayoutId: string;
  spawnTableId: string;
  hazardSetId: string;
  lootTableId: string;
  musicCueId: string;
}
```

## Seed Example

```ts
export const areaInstances: AreaInstanceDef[] = [
  {
    id: 'inst_graumarsch_mq04_marsh_cathedral',
    areaId: 'area_graumarsch',
    mode: 'story',
    questId: 'mq04_marsh_cathedral',
    titleKey: 'quest.main.mq04.title',
    introKey: 'quest.main.mq04.summary',
    allowedLocationIds: ['loc_sumpfkathedrale_gate', 'loc_sumpfkathedrale_nave', 'loc_seal_circle'],
    primaryObjectiveIds: ['mq04_obj_activate_bells', 'mq04_obj_free_mira', 'mq04_obj_defeat_warden', 'mq04_obj_extract'],
    optionalObjectiveIds: ['mq04_obj_read_mira_notes'],
    extractionLayoutId: 'extract_layout_cathedral_causeway',
    spawnTableId: 'spawn_graumarsch_archive_warden',
    hazardSetId: 'hazards_graumarsch_cathedral',
    lootTableId: 'loot_graumarsch_story_mq04',
    musicCueId: 'music_marsh_cathedral_tension',
  },
];
```

---

# 3. Quest Definitions

## Schema

```ts
export interface QuestDef {
  id: string;
  type: 'main' | 'side' | 'companion' | 'bounty' | 'tutorial';
  chapterId: string;
  areaId: string;
  areaInstanceId: string;
  titleKey: string;
  summaryKey: string;
  unlockCondition: UnlockCondition;
  requiredCharacterId?: string;
  recommendedCharacterIds: string[];
  objectives: QuestObjectiveDef[];
  choices: QuestChoiceDef[];
  rewards: RewardDef[];
  flagsSetOnCompletion: string[];
  requiresExtractionForCompletion: boolean;
  freeRunUnlocksAfterCompletion?: boolean;
  codexUnlockIds: string[];
  dialogueBeatIds: string[];
}

export interface QuestObjectiveDef {
  id: string;
  order: number;
  textKey: string;
  type: 'talk' | 'inspect' | 'collect' | 'escort' | 'defend' | 'survive' | 'defeat' | 'choose' | 'extract' | 'return_to_hub';
  requiredCount?: number;
  targetIds?: string[];
  failConditions?: string[];
  persistence: 'run_only' | 'persistent_immediate' | 'persistent_on_extraction';
}
```

## Seed Example: MQ-04

```ts
export const mq04: QuestDef = {
  id: 'mq04_marsh_cathedral',
  type: 'main',
  chapterId: 'chapter_01_last_lanterns',
  areaId: 'area_graumarsch',
  areaInstanceId: 'inst_graumarsch_mq04_marsh_cathedral',
  titleKey: 'quest.main.mq04.title',
  summaryKey: 'quest.main.mq04.summary',
  unlockCondition: { type: 'quest_completed', questId: 'mq03_court_still_burns' },
  requiredCharacterId: 'char_lyra_dorn',
  recommendedCharacterIds: ['char_lyra_dorn'],
  objectives: [
    {
      id: 'mq04_obj_deploy',
      order: 1,
      textKey: 'quest.main.mq04.objective.01',
      type: 'return_to_hub',
      persistence: 'run_only',
    },
    {
      id: 'mq04_obj_activate_bells',
      order: 2,
      textKey: 'quest.main.mq04.objective.02',
      type: 'inspect',
      requiredCount: 3,
      targetIds: ['bell_memory_01', 'bell_memory_02', 'bell_memory_03'],
      persistence: 'run_only',
    },
    {
      id: 'mq04_obj_free_mira',
      order: 3,
      textKey: 'quest.main.mq04.objective.03',
      type: 'inspect',
      targetIds: ['seal_circle_mira'],
      persistence: 'run_only',
    },
    {
      id: 'mq04_obj_defeat_warden',
      order: 4,
      textKey: 'quest.main.mq04.objective.04',
      type: 'defeat',
      targetIds: ['boss_faceless_archive_warden'],
      persistence: 'run_only',
    },
    {
      id: 'mq04_obj_extract',
      order: 5,
      textKey: 'quest.main.mq04.objective.05',
      type: 'extract',
      persistence: 'persistent_on_extraction',
    },
  ],
  choices: [
    {
      id: 'mq04_choice_free_mira_immediately',
      textKey: 'choice.mq04.free_mira_immediately',
      consequencePreviewKey: 'choice.mq04.free_mira_immediately.preview',
      flagsSet: ['flag_mira_trust_plus_1'],
    },
    {
      id: 'mq04_choice_read_notes_first',
      textKey: 'choice.mq04.read_notes_first',
      consequencePreviewKey: 'choice.mq04.read_notes_first.preview',
      flagsSet: ['flag_mira_notes_read', 'flag_mira_trust_minus_1'],
    },
  ],
  rewards: [
    {
      id: 'reward_mq04_unlock_mira',
      type: 'character_unlock',
      targetId: 'char_mira_voss',
      persistence: 'on_extraction',
    },
    {
      id: 'reward_mq04_relic_tech_1',
      type: 'currency',
      currencyId: 'relicTech',
      amount: 1,
      persistence: 'on_extraction',
    },
    {
      id: 'reward_mq04_codex_protocol_a',
      type: 'codex',
      targetId: 'codex_world_loeschprotokoll_a',
      persistence: 'immediate_lore',
    },
  ],
  flagsSetOnCompletion: ['mq04_complete', 'char_mira_unlocked', 'duo_skill_system_unlocked'],
  requiresExtractionForCompletion: true,
  codexUnlockIds: ['codex_world_loeschprotokoll_a'],
  dialogueBeatIds: ['dialogue.mq04.mira.seal.01', 'dialogue.mq04.lyra.seal.02', 'dialogue.mq04.mira.seal.03'],
};
```

---

# 4. Reward Definitions

## Schema

```ts
export interface RewardDef {
  id: string;
  type: 'currency' | 'item' | 'module' | 'weapon' | 'vehicle' | 'cosmetic' | 'character_unlock' | 'codex' | 'hub_upgrade' | 'area_unlock' | 'free_run_unlock';
  targetId?: string;
  currencyId?: 'scrap' | 'relicTech' | string;
  amount?: number;
  persistence: RewardPersistenceCategory;
  choiceId?: string;
  localizationKey?: string;
}
```

## Required Reward Resolution Output

```ts
export interface RewardResolutionLine {
  rewardId: string;
  state: 'banked' | 'lost' | 'converted' | 'already_owned' | 'not_earned';
  reasonKey: string;
  amount?: number;
}
```

---

# 5. Character Definitions

## Schema

```ts
export interface CharacterDef {
  id: string;
  nameKey: string;
  roleKey: string;
  shortKey: string;
  unlockQuestId?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  vehicleAffinityIds: string[];
  weaponAffinityIds: string[];
  passiveAbilityId: string;
  techniqueAbilityId: string;
  ultimateAbilityId: string;
  statusIds: string[];
  companionQuestId?: string;
  codexEntryId: string;
  tutorialId: string;
}
```

## Seed Example

```ts
export const lyra: CharacterDef = {
  id: 'char_lyra_dorn',
  nameKey: 'character.lyra.name',
  roleKey: 'character.lyra.role',
  shortKey: 'character.lyra.short',
  difficulty: 2,
  vehicleAffinityIds: ['vehicle_dornwolf'],
  weaponAffinityIds: ['weapon_dual_blades', 'weapon_spark_pistol'],
  passiveAbilityId: 'abil_lyra_thornheart',
  techniqueAbilityId: 'abil_lyra_sparkshot',
  ultimateAbilityId: 'abil_lyra_housefire',
  statusIds: ['status_mondbrand'],
  companionQuestId: 'cq_ly_01_burning_houses',
  codexEntryId: 'codex_character_lyra',
  tutorialId: 'tutorial_lyra_extraction_basics',
};
```

---

# 6. Status Definitions

## Schema

```ts
export interface StatusDef {
  id: string;
  nameKey: string;
  tooltipKey: string;
  type: 'damage' | 'control' | 'buff' | 'debuff' | 'quest' | 'extraction' | 'hazard';
  durationSeconds?: number;
  maxStacks?: number;
  stackingRule: 'refresh' | 'additive' | 'highest_wins' | 'unique';
  bossBehavior: 'normal' | 'reduced_duration' | 'reduced_effect' | 'converted' | 'immune_with_feedback';
  cleanseRules: string[];
  vfxCueId: string;
  sfxCueId: string;
  runSummaryStatKey?: string;
}
```

## Seed Example

```ts
export const mondbrand: StatusDef = {
  id: 'status_mondbrand',
  nameKey: 'status.mondbrand.name',
  tooltipKey: 'status.mondbrand.tooltip',
  type: 'damage',
  durationSeconds: 8,
  maxStacks: 10,
  stackingRule: 'refresh',
  bossBehavior: 'reduced_effect',
  cleanseRules: ['cleanse_water_event', 'boss_phase_transition'],
  vfxCueId: 'vfx_moonburn_cracks',
  sfxCueId: 'sfx_glass_crackle',
  runSummaryStatKey: 'summary.stat.mondbrand_damage',
};
```

---

# 7. Bounty Definitions

## Schema

```ts
export interface BountyDef {
  id: string;
  titleKey: string;
  summaryKey: string;
  areaId: string;
  unlockCondition: UnlockCondition;
  difficulty: 1 | 2 | 3 | 4 | 5;
  recommendedCharacterIds: string[];
  objectiveIds: string[];
  runModifierIds: string[];
  failureConditionIds: string[];
  rewards: RewardDef[];
  requiresExtractionForRewards: boolean;
  firstCompletionDialogueIds: string[];
  repeatCompletionKey: string;
}
```

## Seed Example

```ts
export const damGroans: BountyDef = {
  id: 'bo_gr_01_dam_groans',
  titleKey: 'bounty.bo_gr_01.title',
  summaryKey: 'bounty.bo_gr_01.summary',
  areaId: 'area_graumarsch',
  unlockCondition: { type: 'quest_completed', questId: 'mq05_three_wicks' },
  difficulty: 1,
  recommendedCharacterIds: ['char_lyra_dorn', 'char_mira_voss'],
  objectiveIds: ['bo_gr_01_obj_repair_valves', 'bo_gr_01_obj_survive', 'bo_gr_01_obj_extract'],
  runModifierIds: ['mod_rising_water', 'mod_expanding_deep_mud'],
  failureConditionIds: ['fail_valve_destroyed', 'fail_extraction_failed'],
  rewards: [
    { id: 'reward_bo_gr_01_scrap', type: 'currency', currencyId: 'scrap', amount: 220, persistence: 'on_extraction' },
    { id: 'reward_bo_gr_01_tech', type: 'currency', currencyId: 'relicTech', amount: 1, persistence: 'on_extraction' },
    { id: 'reward_bo_gr_01_module', type: 'module', targetId: 'module_moorwalker_frame_i', persistence: 'on_extraction' },
    { id: 'reward_bo_gr_01_codex', type: 'codex', targetId: 'codex_region_damheart', persistence: 'immediate_lore' },
  ],
  requiresExtractionForRewards: true,
  firstCompletionDialogueIds: ['dialogue.bounty.gr01.jorik.knocking.01'],
  repeatCompletionKey: 'bounty.bo_gr_01.repeat',
};
```

---

# 8. Item Definitions

## Schema

```ts
export interface ItemDef {
  id: string;
  type: 'material' | 'module' | 'weapon' | 'vehicle' | 'cosmetic' | 'blueprint' | 'quest_proof' | 'codex_lore';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'story';
  nameKey: string;
  descriptionKey: string;
  sourceIds: string[];
  persistenceCategory: RewardPersistenceCategory;
  stackable: boolean;
  maxStack?: number;
  duplicateConversionRewardId?: string;
}
```

## Seed Examples

```ts
export const items: ItemDef[] = [
  {
    id: 'item_toma_glass_star',
    type: 'quest_proof',
    rarity: 'story',
    nameKey: 'codex.item.toma_glass_star.title',
    descriptionKey: 'codex.item.toma_glass_star.body',
    sourceIds: ['cq_ly_01_burning_houses'],
    persistenceCategory: 'on_extraction',
    stackable: false,
  },
  {
    id: 'item_relic_tech',
    type: 'material',
    rarity: 'rare',
    nameKey: 'loot.relic_tech.name',
    descriptionKey: 'loot.relic_tech.description',
    sourceIds: ['elite_drops', 'boss_drops', 'bounty_rewards'],
    persistenceCategory: 'on_extraction',
    stackable: true,
    maxStack: 999,
  },
];
```

---

# 9. Codex Definitions

## Schema

```ts
export interface CodexEntryDef {
  id: string;
  category: 'world' | 'region' | 'faction' | 'character' | 'boss' | 'enemy' | 'item' | 'system' | 'tutorial';
  titleKey: string;
  bodyKey: string;
  unlockCondition: UnlockCondition;
  spoilerLevel: 'none' | 'minor' | 'major' | 'finale';
  relatedIds: string[];
}
```

## Seed Example

```ts
export const codexEntries: CodexEntryDef[] = [
  {
    id: 'codex_world_moonglass',
    category: 'world',
    titleKey: 'codex.world.moonglass.title',
    bodyKey: 'codex.world.moonglass.body',
    unlockCondition: { type: 'quest_completed', questId: 'mq02_ash_does_not_float' },
    spoilerLevel: 'none',
    relatedIds: ['item_relic_tech', 'area_graumarsch'],
  },
];
```

---

# 10. Shop and Tech-Lab Seeds

## Shop Entry Schema

```ts
export interface ShopItemDef {
  id: string;
  category: 'vehicle' | 'weapon' | 'module' | 'bounty_license' | 'cosmetic' | 'housing';
  itemId: string;
  cost: CurrencyCost[];
  prerequisiteFlags: string[];
  nameKey: string;
  descriptionKey: string;
  compatibilityRules: CompatibilityRule[];
  purchaseLimit?: number;
}
```

## Tech-Lab Node Schema

```ts
export interface TechNodeDef {
  id: string;
  characterId: string;
  branchId: string;
  tier: number;
  cost: CurrencyCost[];
  prerequisiteNodeIds: string[];
  nameKey: string;
  descriptionKey: string;
  effectDescriptionKey: string;
  permanent: boolean;
  respecCategory: 'none' | 'paid' | 'free_in_hub';
}
```

## Seed Example

```ts
export const techNodes: TechNodeDef[] = [
  {
    id: 'tech_lyra_blades_a1_reach',
    characterId: 'char_lyra_dorn',
    branchId: 'lyra_branch_blades_in_rain',
    tier: 1,
    cost: [{ currencyId: 'relicTech', amount: 1 }],
    prerequisiteNodeIds: [],
    nameKey: 'tech.lyra.blades.a1.name',
    descriptionKey: 'tech.lyra.blades.a1.description',
    effectDescriptionKey: 'tech.lyra.blades.a1.effect',
    permanent: true,
    respecCategory: 'none',
  },
];
```

---

# 11. Localization Table Shape

```ts
export interface LocalizedString {
  de: string;
  en: string;
  note?: string;
}

export type LocalizationTable = Record<string, LocalizedString>;
```

Rules:

- every player-facing key has `de` and `en`,
- placeholders match exactly,
- keys are stable,
- no raw player-facing strings in content definitions.

---

# 12. Validation Checklist for Seed Data

A content validation script must fail if:

- referenced IDs do not exist,
- localization keys are missing,
- DE/EN placeholder sets differ,
- quest objective order has gaps or duplicates,
- a quest lacks extraction rule,
- a reward lacks persistence category,
- an area has Free Run before unlock quest,
- a status has no boss behavior,
- a character lacks passive/technique/ultimate,
- a codex entry has title but no body,
- a shop item has no cost or unlock rule,
- a Tech-Lab node references missing prerequisites,
- a bounty has no failure condition,
- a Run Summary line cannot explain banked/lost/converted state.

## Final Rule

If a content entry cannot be represented with these schemas, the schema or docs are incomplete. Update the docs before implementing a workaround.
