# Scherbenhimmel 20h - Agent Implementation Playbook

This document tells coding, design, QA, content, and implementation agents exactly how to work from the 20h documentation pack.
## Mandatory Agent Rules

Before changing code, docs, quests, content, localization, multiplayer, rewards, persistence, extraction, UI, QA, or architecture:

1. Read `.chatgpt/skills/htown-combat-dev/SKILL.md`.
2. Read `docs/README.md`.
3. Read `docs/preproduction/20H_DOCUMENTATION_INDEX.md`.
4. Read the feature owner document listed in the index.
5. Check `docs/SOURCE_OF_TRUTH.md`.
6. Check `docs/STATUS_VERIFICATION.md`.
7. If documents conflict, stop and fix docs before coding.

### Hard prohibitions

- Do not treat Scherbenhimmel as a seamless open world.
- Do not bypass the Hub -> Quest -> Area Instance -> Extraction -> Hub structure.
- Do not hardcode player-facing text.
- Do not add player-facing text without DE/EN localization keys.
- Do not create client-authoritative rewards, loot, extraction, competitive multiplayer state, or progression.
- Do not change save/persistence contracts without migration notes.
- Do not mark work complete without test/build evidence.
- Do not use legacy docs when they conflict with current preproduction contracts.
- Do not keep duplicate source-of-truth documents with conflicting claims.
## Source of Truth Order

When documents overlap, use this order:

1. `docs/preproduction/20H_AREA_PROGRESSION_MODEL.md`
   - Campaign structure authority: Hub -> Quest -> Area Instance -> Extraction -> Hub.
   - Overrides any open-world interpretation.
2. `docs/COMPLETE_GAME_FUNCTION_SPEC.md`
   - Player-facing behavior authority: screens, menus, Deploy, match, extraction, rewards, persistence, debug.
3. `docs/preproduction/20H_QUEST_BIBLE.md`
   - Quest content authority: quests, objectives, rewards, flags, dialogue beats.
4. `docs/preproduction/20H_REGION_PAGES.md`
   - Region content authority: hazards, unlock states, loot bias, extraction modifiers, world-state.
5. `docs/preproduction/20H_CHARACTER_PAGES.md`
   - Character content authority: unlocks, kits, arcs, companion hooks.
6. `docs/preproduction/20H_BOUNTY_CATALOG.md`
   - Optional contract authority.
7. `docs/preproduction/20H_STATUS_EFFECT_CATALOG.md`
   - Status and tooltip authority.
8. `docs/preproduction/20H_LOCALIZATION_DE_EN.md`
   - Text/key/string authority for German and English.
9. Legacy story docs under `story/`
   - Use for flavor and inspiration only. If they conflict with any file above, update or adapt to the new model.

## Agent Work Rule

Agents must not invent core behavior if it is documented. If behavior is missing, agents must add or update a documentation entry first, then implement.

Required implementation order:

1. Read source-of-truth docs above.
2. Identify feature scope: quest, region, character, bounty, status, UI screen, localization, or system.
3. Verify area model: is this Hub, Deploy, Area Instance, Run Summary, or post-run Hub state?
4. Create/modify data structures using stable IDs from docs.
5. Use localization keys; do not hardcode player-facing text.
6. Implement behavior.
7. Add tests/QA checks matching the relevant doc's QA checklist.
8. Update docs if implementation changes behavior.

## Non-Negotiable Architecture Rules

### Campaign Structure

The 20h campaign is not a seamless open world. It is:

```text
Hub / Laternenhof
  -> quest/lore/dialogue/upgrades/prep
  -> Deploy
  -> area instance
  -> objective + extraction/defeat
  -> Run Summary
  -> Hub
```

Free Run and farming unlock only after the area's questline is resolved.

### Text and Localization

- All player-facing text must use localization keys.
- German and English are required for every shipped string.
- German is the primary writing language for Scherbenhimmel tone.
- English must preserve meaning and mood, not translate word-for-word when that would sound awkward.
- Keys must remain stable even if copy changes.

### Quest Implementation

Every quest must be represented as data with:

```ts
id: string;
type: 'main' | 'side' | 'companion' | 'bounty' | 'tutorial';
chapterId: string;
areaId: string;
areaInstanceId: string;
unlockCondition: string;
freeRunUnlocksAfterCompletion?: boolean;
requiredCharacterId?: string;
recommendedCharacterIds: string[];
objectives: QuestObjective[];
rewards: QuestReward[];
flagsSetOnCompletion: string[];
flagsSetOnChoice: Record<string, string[]>;
requiresExtractionForCompletion: boolean;
localizationKeyPrefix: string;
```

Quest objectives must never be vague. Use exact verbs:

- Talk to
- Inspect
- Collect
- Escort
- Defend
- Survive
- Defeat
- Choose
- Extract
- Return to Hub

Avoid generic objectives like `Explore the area` unless it is immediately followed by exact sub-objectives.

### Area Implementation

Every area must be represented as data with:

```ts
id: string;
firstEntryQuestId: string;
areaQuestlineCompletionQuestId: string;
freeRunUnlockQuestId: string;
state: 'locked' | 'active_quest' | 'cleared_free_run';
availableModesWhenCleared: AreaMode[];
hazards: string[];
enemyFamilies: string[];
bossPool: string[];
lootBias: string[];
extractionModifierId: string;
worldStateFlags: string[];
localizationKeyPrefix: string;
```

### Reward Resolution

Rewards must be split into:

- Immediate lore/codex rewards
- On-completion rewards
- On-extraction rewards
- Choice-based rewards
- Lost-on-defeat rewards

Run Summary must explain each reward outcome.

### Extraction Implementation

Extraction is mandatory for banking Tech and physical rewards unless a doc says otherwise.

Default defeat behavior:

- Keep 50% Scrap.
- Lose 100% unextracted Relic Tech.
- Lose unextracted modules/weapons/blueprints/cosmetics.
- Persistent lore may remain if explicitly marked.

### UI Implementation

Every screen must have:

- Entry condition
- Exit routes
- Primary action
- Cancel/back behavior
- Disabled state reason
- Error state
- Localization keys
- QA checks

## Feature-by-Feature Agent Instructions

### To implement a Main Quest

1. Open `20H_QUEST_BIBLE.md`.
2. Copy the quest ID, title, unlock, objectives, rewards, flags, dialogue beats.
3. Open `20H_AREA_PROGRESSION_MODEL.md` and confirm the area state before/after quest.
4. Open `20H_LOCALIZATION_DE_EN.md` and use the quest localization keys.
5. Create quest data.
6. Create area instance data.
7. Wire Quest Log card.
8. Wire Deploy card.
9. Wire in-run objectives.
10. Wire extraction success/failure.
11. Wire Run Summary.
12. Set flags only at correct persistence moments.
13. Add QA acceptance from the quest doc.

### To implement a Side Quest or Companion Quest

Same as main quest, but verify:

- Is it accepted from Hub NPC, Quest Log, or region card?
- Does it require a specific character?
- Does it unlock a dialogue, cosmetic, skill mod, vendor, or world-state?
- Does it require extraction?
- Does failure allow retry?

### To implement a Region

1. Open `20H_REGION_PAGES.md`.
2. Open `20H_AREA_PROGRESSION_MODEL.md`.
3. Implement locked / active / cleared state.
4. Implement region card in Deploy.
5. Implement hazards and extraction modifier.
6. Add loot bias and boss pool.
7. Add Free Run only after unlock quest flag.
8. Add Hub world-state reactions.
9. Localize all region text.

### To implement a Bounty

1. Open `20H_BOUNTY_CATALOG.md`.
2. Confirm region is cleared or bounty unlock condition is met.
3. Add modifier.
4. Add objective tracker.
5. Add failure conditions.
6. Add reward split.
7. Add first-completion dialogue once.
8. Add repeat-completion text.

### To implement Status Effects

1. Open `20H_STATUS_EFFECT_CATALOG.md`.
2. Create ID, tooltip, icon, duration, stack behavior, boss behavior, cleanse, VFX/SFX.
3. Localize tooltip in DE/EN.
4. Add Run Summary attribution.
5. Test boss conversion behavior.

### To implement Localization

1. Do not write UI text inline.
2. Add a key under the correct namespace.
3. Provide both DE and EN.
4. Use placeholders for dynamic values.
5. Keep tone consistent.
6. Test missing-key fallback.

## Localization Key Namespaces

Use these namespaces:

- `ui.*`
- `menu.*`
- `deploy.*`
- `run.*`
- `extraction.*`
- `summary.*`
- `quest.main.*`
- `quest.side.*`
- `quest.companion.*`
- `bounty.*`
- `character.*`
- `region.*`
- `status.*`
- `codex.*`
- `dialogue.*`
- `debug.*`
- `error.*`

Example:

```ts
localize('quest.main.mq04.title')
localize('quest.main.mq04.objective.03')
localize('dialogue.mq04.mira.not_protection_seal.01')
```

## Data Validation Requirements

A build/content validation script should fail if:

- a quest has no localization key prefix,
- a player-facing key is missing DE or EN,
- a Free Run mode exists for an uncleared area,
- a quest has no extraction rule,
- a reward lacks persistence category,
- a status has no boss behavior,
- a Deploy card has no locked/active/cleared state text,
- a Run Summary reward cannot explain why it was banked/lost.

## QA Acceptance for Agent Work

Before any feature is marked done:

- It follows Hub -> Deploy -> Area Instance -> Extraction -> Hub if it is campaign content.
- All text is localized DE/EN.
- Quest Log, Deploy, HUD, Run Summary, and Codex use the same stable IDs.
- Success/failure/cancel/retry states are documented and implemented.
- Rewards are split into immediate/completion/extraction/choice/lost-on-defeat.
- World-state is visible in Hub after completion.
- No implementation implies a seamless open world.

## Agent Stop Conditions

Stop and update docs first if:

- the feature needs a new quest not in the Quest Bible,
- the feature changes extraction banking rules,
- the feature changes area unlock/free-run rules,
- the feature adds a player-facing text without localization,
- the feature introduces a new status effect,
- the feature creates a new reward category,
- the feature changes a character kit or unlock condition.

## Final Agent Instruction

The 20h docs are not mood boards. Treat them as implementation contracts. If code and docs disagree, either fix the code to match the docs or update the docs in the same PR with a clear reason.


