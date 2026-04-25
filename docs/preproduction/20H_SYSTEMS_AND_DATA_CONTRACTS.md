# Scherbenhimmel 20h — Systems and Data Contracts

This document fills the implementation-detail layer between the high-level game-function spec and the content bibles. It is written for agents and developers. Player-facing strings belong in DE/EN localization documents.

## Scope

Covers:

- Save data
- Profile data
- Area state
- Quest state
- Run state
- Inventory and loot
- Currency/economy
- Shop
- Tech-Lab
- Roster
- Codex
- Settings and accessibility
- Reward persistence
- Content validation
- Error handling
- QA gates

## Global Data Principles

1. Stable IDs are mandatory.
2. Player-facing text must be referenced by localization keys.
3. Runtime state and authored content must be separate.
4. Run state is temporary until extraction/defeat resolution.
5. Save writes must be explicit and recoverable.
6. Every reward has a persistence category.
7. Every unlock has a source flag.
8. Every user-facing error has a localization key.

---

# 1. Save Data Contract

## Save Slots

Minimum supported save behavior:

- One default campaign save is enough for first implementation.
- Future multi-slot support must not change the internal save schema.
- Autosave after Hub actions and Run Summary resolution.
- Do not autosave in the middle of an unresolved extraction reward calculation.

## Save Shape

```ts
interface CampaignSave {
  schemaVersion: number;
  saveId: string;
  profile: PlayerProfileState;
  campaign: CampaignState;
  hub: HubState;
  areas: Record<AreaId, AreaProgressState>;
  quests: Record<QuestId, QuestProgressState>;
  characters: Record<CharacterId, CharacterProgressState>;
  inventory: InventoryState;
  currencies: CurrencyState;
  codex: CodexState;
  settings: SettingsState;
  debug?: DebugState;
  updatedAt: string;
}
```

## Save Migration

```ts
interface SaveMigration {
  fromVersion: number;
  toVersion: number;
  migrate(save: unknown): CampaignSave;
}
```

Rules:

- Invalid or missing optional fields get defaults.
- Missing required identity fields fail load and show save error UI.
- Migration must never silently mark quests complete.
- Migration must never grant Relic Tech unless old data explicitly contained it.

## Save Failure UX

If save load fails:

1. Show localized load failure modal.
2. Offer Retry.
3. Offer Export Broken Save.
4. Offer Reset Save behind confirmation.
5. Log debug metadata if debug mode is available.

---

# 2. Campaign and Area State

## Campaign State

```ts
interface CampaignState {
  currentChapterId: string;
  currentMainQuestId: string;
  completedMainQuestIds: string[];
  majorChoiceFlags: Record<string, boolean>;
  unlockedSystemIds: string[];
  activeTutorialIds: string[];
}
```

## Area Progress State

```ts
interface AreaProgressState {
  areaId: AreaId;
  state: 'locked' | 'active_quest' | 'cleared_free_run';
  firstEntryQuestId: QuestId;
  activeQuestIds: QuestId[];
  completedQuestIds: QuestId[];
  freeRunUnlocked: boolean;
  freeRunUnlockQuestId: QuestId;
  availableModes: AreaMode[];
  worldStateFlags: Record<string, boolean>;
  discoveredLocations: string[];
  discoveredBossIds: string[];
  unlockedBountyIds: string[];
}
```

## Area State Rules

- Locked areas cannot be launched.
- Active quest areas can launch only allowed current story/side/companion missions.
- Cleared areas can launch Free Run, Bounty, Boss Hunt, Farm, or Practice variants if available.
- Asterhof is special: after MQ-20 it opens a midgame route, not a normal 20h farm zone.

---

# 3. Quest State

```ts
interface QuestProgressState {
  questId: QuestId;
  status: 'locked' | 'available' | 'accepted' | 'in_progress' | 'ready_to_extract' | 'completed' | 'failed_retryable' | 'failed_locked';
  currentObjectiveId?: string;
  completedObjectiveIds: string[];
  failedObjectiveIds: string[];
  selectedChoiceId?: string;
  flagsSet: string[];
  rewardsPreview: QuestReward[];
  rewardsGranted: QuestReward[];
  rewardsLost: QuestReward[];
  requiresExtractionForCompletion: boolean;
  lastAttemptRunId?: string;
}
```

## Quest Status Transitions

```text
locked -> available -> accepted -> in_progress -> ready_to_extract -> completed
                                               -> failed_retryable
                                               -> failed_locked
```

Rules:

- A quest requiring extraction is not completed until extraction succeeds.
- A quest objective may be completed inside the area instance but still fail reward banking if extraction fails.
- Retryable failure preserves major story choice only if the story choice was explicitly marked persistent before extraction.
- Side and companion quests can be abandoned from the Hub unless a doc marks them as locked-in.

---

# 4. Run State

```ts
interface RunState {
  runId: string;
  seed: string;
  mode: 'story' | 'side' | 'companion' | 'bounty' | 'free_run' | 'boss_hunt' | 'practice';
  areaId: AreaId;
  areaInstanceId: string;
  questId?: QuestId;
  bountyId?: BountyId;
  characterId: CharacterId;
  vehicleId: VehicleId;
  loadout: LoadoutState;
  startedAt: string;
  elapsedSeconds: number;
  phase: RunPhase;
  temporaryUpgrades: RunUpgradeState[];
  runInventory: RunInventoryState;
  objectiveState: ObjectiveRuntimeState;
  extractionState?: ExtractionRuntimeState;
  debugTimeline?: DebugTimelineEntry[];
}
```

## Run Phases

```ts
type RunPhase =
  | 'loading'
  | 'drop_intro'
  | 'combat'
  | 'level_up_choice'
  | 'boss_event'
  | 'extraction_spawned'
  | 'extraction_hold'
  | 'success_resolution'
  | 'failure_resolution'
  | 'abandoned';
```

## Run Inventory

```ts
interface RunInventoryState {
  scrapCollected: number;
  relicTechCollected: number;
  itemsCollected: RunItemStack[];
  codexDiscoveries: string[];
  questProofItems: string[];
  carrySlotsUsed: number;
  carrySlotsMax: number;
}
```

Rules:

- Run inventory is not account inventory.
- Run inventory is resolved only at Run Summary.
- Practice runs discard all permanent rewards.

---

# 5. Extraction Runtime

```ts
interface ExtractionRuntimeState {
  status: 'not_spawned' | 'spawned' | 'holding' | 'contested' | 'success' | 'failed';
  countdownSeconds: number;
  graceSecondsRemaining: number;
  playerInsideZone: boolean;
  contestants: string[];
  deadlineSecondsRemaining?: number;
  extractionModifierId?: string;
}
```

## Extraction Resolution

```ts
interface RewardResolutionResult {
  banked: RewardEntry[];
  lost: RewardEntry[];
  converted: RewardEntry[];
  persistentLore: string[];
  flagsSet: string[];
  nextUnlocks: UnlockEntry[];
}
```

Default resolution:

| Outcome | Scrap | Relic Tech | Items | Lore | Quest progress |
|---|---:|---:|---|---|---|
| Extract | 100% banked | 100% banked | banked | persistent | completed if conditions met |
| Defeat | 50% banked | 0% banked | lost | persistent only if marked | failed/retryable unless doc says otherwise |
| Abandon | same as defeat | same as defeat | lost | persistent only if marked | failed/retryable |
| Practice | 0 permanent | 0 permanent | none | tutorial lore only | tutorial flags only |

---

# 6. Inventory and Item Contract

```ts
interface InventoryState {
  ownedItems: Record<ItemId, InventoryItemState>;
  ownedVehicles: Record<VehicleId, OwnedVehicleState>;
  ownedModules: Record<ModuleId, OwnedModuleState>;
  ownedWeapons: Record<WeaponId, OwnedWeaponState>;
  ownedCosmetics: Record<CosmeticId, OwnedCosmeticState>;
  unlockedBlueprints: Record<BlueprintId, BlueprintState>;
}

interface InventoryItemState {
  itemId: string;
  quantity: number;
  acquiredFrom: string[];
  firstAcquiredAt: string;
  lastAcquiredAt: string;
}
```

## Item Authored Data

```ts
interface ItemDef {
  id: string;
  type: 'material' | 'module' | 'weapon' | 'vehicle' | 'cosmetic' | 'blueprint' | 'quest_proof' | 'codex_lore';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'story';
  nameKey: string;
  descriptionKey: string;
  sourceIds: string[];
  persistenceCategory: RewardPersistenceCategory;
  stackable: boolean;
  maxStack?: number;
}
```

```ts
type RewardPersistenceCategory =
  | 'immediate_lore'
  | 'on_objective_completion'
  | 'on_extraction'
  | 'choice_based'
  | 'lost_on_defeat'
  | 'practice_only';
```

Rules:

- Quest proof items default to `on_extraction` unless marked `immediate_lore`.
- Codex lore can be immediate only if it does not grant currency/power.
- Duplicate modules convert only after extraction.
- Conversion output must be shown in Run Summary.

---

# 7. Currency and Economy

```ts
interface CurrencyState {
  scrap: number;
  relicTech: number;
  specialCurrencies: Record<string, number>;
}
```

## Currency Rules

### Scrap

- Common meta currency.
- Earned frequently.
- 50% retained on defeat by default.
- Used for Shop purchases, repairs, basic unlocks.

### Relic Tech

- Rare extraction currency.
- Earned from elites, bosses, bounties, story objectives.
- 0% retained on defeat by default.
- Used for Tech-Lab nodes and late unlocks.

### Special Currency

Only add if needed. Must define:

- source,
- sink,
- retention rule,
- localization keys,
- UI icon.

---

# 8. Shop Contract

```ts
interface ShopItemDef {
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

## Shop Card States

- `locked`: prerequisites missing.
- `unaffordable`: currency missing.
- `available`: can buy.
- `owned`: already owned.
- `equipped`: owned and active.

Every card must show:

- cost,
- lock reason,
- compatibility,
- stat delta if applicable,
- purchase confirmation for expensive items,
- success toast,
- Equip Now option if relevant.

---

# 9. Tech-Lab Contract

```ts
interface TechNodeDef {
  id: string;
  characterId: CharacterId;
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

Rules:

- Tech-Lab uses extracted Relic Tech only.
- Nodes are permanent unless respec is explicitly enabled.
- Locked nodes must show exact missing prerequisite.
- Unlock modifies Deploy/Roster previews immediately.
- Unlock must autosave after success.

---

# 10. Roster Contract

```ts
interface CharacterProgressState {
  characterId: CharacterId;
  unlocked: boolean;
  unlockQuestId?: QuestId;
  bondLevel: number;
  completedCompanionQuestIds: QuestId[];
  unlockedSkillNodeIds: string[];
  tutorialCompleted: boolean;
  cosmeticsUnlocked: string[];
}
```

Roster card must show:

- character name,
- role,
- unlock state,
- passive/technique/ultimate,
- bond level,
- companion quest state,
- tutorial state,
- skill node progress.

---

# 11. Codex Contract

```ts
interface CodexEntryDef {
  id: string;
  category: 'world' | 'region' | 'faction' | 'character' | 'boss' | 'enemy' | 'item' | 'system' | 'tutorial';
  titleKey: string;
  bodyKey: string;
  unlockCondition: string;
  spoilerLevel: 'none' | 'minor' | 'major' | 'finale';
  relatedIds: string[];
}
```

```ts
interface CodexState {
  unlockedEntryIds: string[];
  seenEntryIds: string[];
  newlyUnlockedEntryIds: string[];
}
```

Rules:

- Unknown entries show silhouette/hint only if allowed.
- Major spoilers stay hidden until unlock condition.
- Codex unlock toasts use localization keys.
- Codex can unlock immediately only for lore; power rewards follow extraction rules.

---

# 12. Settings and Accessibility

```ts
interface SettingsState {
  language: 'de' | 'en';
  audio: AudioSettings;
  video: VideoSettings;
  controls: ControlSettings;
  accessibility: AccessibilitySettings;
  account: AccountSettings;
}
```

## Required Settings

### Audio

- master volume
- music volume
- SFX volume
- UI volume
- voice volume

### Video

- quality preset
- resolution scaling
- outlines on/off
- particles level
- screen shake intensity
- damage numbers on/off

### Controls

- keyboard bindings
- gamepad bindings
- aim sensitivity
- invert aim
- hold/toggle modes

### Accessibility

- subtitle size
- colorblind mode
- reduce flash
- reduce screen shake
- input confusion replacement
- hold-to-toggle option
- skip repeated intros
- high-contrast objective markers

## Accessibility Rule for Confusion Effects

If input inversion is disabled, confusion must be replaced by:

- UI distortion,
- aim drift,
- reduced lock-on,
- false target markers,
- or other non-inversion feedback.

The game must never depend on inaccessible confusion effects to complete a quest.

---

# 13. Localization Data Contract

```ts
interface LocalizedString {
  de: string;
  en: string;
  note?: string;
}

type LocalizationTable = Record<string, LocalizedString>;
```

Validation rules:

- Every key must have `de` and `en`.
- Placeholder sets must match between languages.
- No player-facing raw strings in authored gameplay data.
- Lore text belongs in localization/codex tables, not in code.
- Dev fallback may display missing key; production must log and show safe fallback.

---

# 14. Error Handling Contract

Errors must be player-safe and localized.

| Error | Player behavior | Dev behavior |
|---|---|---|
| missing localization | safe fallback text | log key and stack |
| invalid loadout | show disabled launch reason | log validation payload |
| locked area | show required quest | log area state |
| reward resolution failure | prevent save, show retry/report | log run state |
| save failure | show save modal | export broken save option |
| network disconnect | show reconnect state | log disconnect reason |

---

# 15. Content Validation Contract

A content validation script should check:

## Quest Validation

- every quest has ID, title key, summary key, area ID, unlock condition,
- objectives are ordered and localized,
- rewards have persistence category,
- extraction rule exists,
- flags are named consistently,
- area-state changes are valid.

## Area Validation

- every area has locked/active/cleared state text,
- Free Run unlock quest exists,
- hazards exist in region page and status/effects where needed,
- extraction modifier exists,
- region name/tagline are localized.

## Character Validation

- every playable character has name, role, short text,
- passive/technique/ultimate keys exist,
- unlock quest exists,
- companion quest exists if listed.

## Reward Validation

- all rewards have category,
- all currencies have icon/name keys,
- items requiring extraction are not granted early,
- conversion rules exist for duplicates.

## Localization Validation

- all keys have DE/EN,
- placeholders match,
- no duplicate keys with different meaning,
- no raw player-facing strings in content data.

---

# 16. QA Gate for Any Implementation PR

An implementation PR is incomplete unless it includes:

- relevant doc references,
- tests or manual QA checklist,
- localization keys in DE/EN,
- reward persistence validation,
- area-state validation if region/quest involved,
- Run Summary validation if rewards/quests involved,
- save migration note if save schema changed.

## Final Rule

If an agent cannot implement a feature directly from these contracts, that is a documentation bug. Fix the docs first.
