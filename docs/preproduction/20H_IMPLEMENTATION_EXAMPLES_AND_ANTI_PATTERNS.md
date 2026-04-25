# Scherbenhimmel 20h — Implementation Examples and Anti-Patterns

This document gives concrete implementation examples and senior-dev guardrails for agents. It is written in English because it targets code and implementation behavior. Player-facing copy must still be German and English localization keys.

## 1. Golden Path Example: Story Quest Flow

A main quest that requires extraction should resolve like this:

```ts
function completeObjective(run: RunState, objectiveId: string): RunState {
  return {
    ...run,
    objectiveState: markObjectiveComplete(run.objectiveState, objectiveId),
  };
}

function onBossDefeated(run: RunState): RunState {
  if (!allRequiredObjectivesComplete(run.objectiveState)) return run;

  return {
    ...run,
    phase: 'extraction_spawned',
    extractionState: createExtractionState(run.areaId, run.areaInstanceId),
  };
}

function onExtractionSuccess(save: CampaignSave, run: RunState): CampaignSave {
  const resolution = resolveRunRewards(run, 'extract');

  return applyRunResolution(save, run, resolution, {
    completeQuest: run.questId,
    updateAreaState: true,
    returnDestination: 'hub_lanternhof',
  });
}
```

Key point: objective completion inside the run is not the same as campaign quest completion if extraction is required.

## 2. Reward Resolution Example

```ts
export function resolveRunRewards(
  run: RunState,
  outcome: 'extract' | 'defeat' | 'abandon' | 'practice',
): RewardResolutionResult {
  if (outcome === 'practice') {
    return {
      banked: [],
      lost: [],
      converted: [],
      persistentLore: run.runInventory.codexDiscoveries.filter(isTutorialLore),
      flagsSet: [],
      nextUnlocks: [],
    };
  }

  if (outcome === 'extract') {
    return bankAllEligibleRunRewards(run);
  }

  return {
    banked: [bankScrap(Math.floor(run.runInventory.scrapCollected * 0.5))],
    lost: [
      loseRelicTech(run.runInventory.relicTechCollected),
      ...loseUnextractedItems(run.runInventory.itemsCollected),
    ],
    converted: [],
    persistentLore: run.runInventory.codexDiscoveries.filter(isPersistentLore),
    flagsSet: [],
    nextUnlocks: [],
  };
}
```

## 3. Localization Example

Correct:

```tsx
<Button disabled={!canLaunch} title={t(disabledReasonKey)}>
  {t('deploy.launch')}
</Button>
```

Incorrect:

```tsx
<Button disabled={!canLaunch} title="Area locked">
  Launch
</Button>
```

Why incorrect:

- raw English string,
- no German localization,
- no stable key,
- no content validation possible.

## 4. Area State Example

Correct:

```ts
function getAvailableAreaModes(area: AreaProgressState): MissionMode[] {
  switch (area.state) {
    case 'locked':
      return [];
    case 'active_quest':
      return ['story', 'side', 'companion'];
    case 'cleared_free_run':
      return area.availableModes;
  }
}
```

Incorrect:

```ts
const modes = ['story', 'free_run', 'bounty'];
```

Why incorrect:

- exposes Free Run before questline completion,
- ignores locked state,
- violates the hub-driven area model.

## 5. Quest Completion Example

Correct:

```ts
function canCompleteQuest(quest: QuestDef, run: RunState): boolean {
  const objectivesComplete = allRequiredObjectivesComplete(run.objectiveState);

  if (!objectivesComplete) return false;
  if (quest.requiresExtractionForCompletion) {
    return run.extractionState?.status === 'success';
  }

  return true;
}
```

Incorrect:

```ts
if (boss.dead) completeQuest(questId);
```

Why incorrect:

- boss death may only spawn extraction,
- rewards may still be lost,
- story flags may not persist until extraction.

## 6. Save Write Example

Correct:

```ts
async function resolveAndSaveRun(save: CampaignSave, run: RunState, outcome: RunOutcome) {
  const resolution = resolveRunRewards(run, outcome);
  const nextSave = applyRunResolution(save, run, resolution);
  await validateSave(nextSave);
  await writeSaveAtomically(nextSave);
  return nextSave;
}
```

Incorrect:

```ts
save.currencies.relicTech += run.relicTechCollected;
localStorage.setItem('save', JSON.stringify(save));
```

Why incorrect:

- grants Tech before checking outcome,
- no validation,
- no migration/schema version awareness,
- no atomicity,
- no Run Summary resolution.

## 7. Zustand Usage Example

Use Zustand for UI/session state, not as the permanent source of campaign truth.

Correct:

```ts
interface GarageUiState {
  selectedTab: 'dashboard' | 'deploy' | 'shop' | 'tech_lab' | 'roster' | 'codex';
  selectedAreaId?: string;
  selectedQuestId?: string;
}
```

Incorrect:

```ts
const useStore = create(() => ({
  completedQuests: {},
  relicTech: 999,
  areaStates: {},
}));
```

Why incorrect:

- durable campaign state needs save/schema/migration rules,
- UI state should not become hidden persistence.

## 8. Three.js Usage Example

Correct:

```ts
// Domain state decides what exists.
const enemies = selectVisibleEnemies(runState);
renderEnemies(scene, enemies, renderClock.delta);
```

Incorrect:

```ts
// Mesh death grants reward directly.
mesh.userData.onDeath = () => save.currencies.relicTech += 1;
```

Why incorrect:

- rendering owns durable reward logic,
- impossible to validate reward persistence,
- breaks tests and multiplayer authority.

## 9. Content Validation Example

```ts
for (const quest of quests) {
  assertLocalizationKey(quest.titleKey);
  assertLocalizationKey(quest.summaryKey);
  assert(quest.objectives.length > 0, `${quest.id} has no objectives`);
  assert(typeof quest.requiresExtractionForCompletion === 'boolean', `${quest.id} missing extraction rule`);

  for (const reward of quest.rewards) {
    assert(reward.persistence, `${quest.id}/${reward.id} missing persistence category`);
  }
}
```

## 10. Anti-Patterns

### Anti-Pattern: Big Open World Leakage

Bad signs:

- `walkToRegion()` as campaign transition,
- always-unlocked map areas,
- Free Run available by default,
- quest text implying seamless roaming.

Correct approach:

- use Hub/Deploy area instance selection,
- locked/active/cleared area states,
- travel vignettes for flavor only.

### Anti-Pattern: Hardcoded Player Copy

Bad signs:

- strings in JSX,
- strings in quest data,
- English-only debug/player messages,
- item names used as raw text.

Correct approach:

- localization keys in data,
- DE/EN entries in localization docs/content tables,
- validation for missing keys.

### Anti-Pattern: Reward Logic in UI

Bad signs:

- Run Summary calculates rewards independently,
- UI mutates currency,
- Shop updates inventory without domain purchase function.

Correct approach:

- domain functions resolve rewards and purchases,
- UI displays results,
- save persists only validated domain output.

### Anti-Pattern: Quest Flags Without Ownership

Bad signs:

- arbitrary string flags introduced in components,
- flags not documented,
- flags set before persistence moment.

Correct approach:

- flags defined in quest/content docs,
- flags set by domain progression logic,
- persistence moment explicit.

### Anti-Pattern: Status Effects Without Boss Rules

Bad signs:

- bosses silently ignore statuses,
- no tooltip explains reduced behavior,
- inconsistent stacking.

Correct approach:

- status definitions include `bossBehavior`,
- UI tooltip explains behavior,
- tests cover boss conversion/reduction.

### Anti-Pattern: Save Migration as Gameplay Reward

Bad signs:

- migration grants missing characters/currency to fix errors,
- migration marks old quests complete without explicit old data,
- migration rewrites choices.

Correct approach:

- migrations add schema defaults only,
- progression changes happen through gameplay or explicit admin/debug tools.

## 11. Pull Request Template for Implementation

```md
## Summary

Implemented: <feature IDs>

## Docs Used

- `20H_DOCUMENTATION_INDEX.md`
- `<specific docs>`

## Data / IDs

- Areas:
- Quests:
- Characters:
- Items:
- Statuses:
- Localization keys:

## Reward and Persistence

- Immediate:
- On extraction:
- Lost on defeat:
- Save flags:

## QA

- [ ] Unit tests
- [ ] Content validation
- [ ] Manual Hub -> Deploy -> Area -> Extraction -> Summary -> Hub check
- [ ] DE/EN localization check
- [ ] Accessibility check if UI/VFX/control touched

## Notes

Any docs changed:
```

## 12. Senior Dev Review Rule

If a feature is implemented without being expressible in content schemas, localization tables, reward resolution, save state, and QA checks, it is not ready. Do not merge clever code that bypasses the contracts.
