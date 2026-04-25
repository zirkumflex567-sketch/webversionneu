# Scherbenhimmel 20h — Area Model Document Audit

Audit date: 2026-04-25  
Branch: `docs/complete-game-function-spec`

## Purpose

This file records the documentation pass requested after the first 20h preproduction pack: the campaign must not be interpreted as one big open world. The authoritative structure is now:

```text
Hub / Laternenhof
  -> quest, lore, dialogue, upgrades, shopping, preparation
  -> Deploy
  -> selected area instance
  -> quest/extraction/defeat
  -> Run Summary
  -> Hub
  -> area becomes Free Run/farming only after its area questline is resolved
```

The canonical source for this rule is:

- `docs/preproduction/20H_AREA_PROGRESSION_MODEL.md`

## Global Reading Rule

Any older phrase like `world map`, `route`, `area access`, `region unlock`, `return map`, `open route`, or `fast travel` must be read as **node-based mission access / area-instance access**, not seamless open-world traversal.

The game may feel like a world through Hub changes, NPCs, travel vignettes, recurring areas, Codex, and world-state changes. It must not be implemented as one continuous open-world map for the first 20h campaign.

## Documents Checked

| Document | Status after this pass | Required interpretation / change |
|---|---:|---|
| `README.md` | Updated | Now explicitly states: not a seamless open world; Hub → Quest → Area Instance → Extraction → Hub; Free Run after area questline clear. |
| `docs/preproduction/20H_AREA_PROGRESSION_MODEL.md` | Added | New authoritative model. Defines locked/active/cleared area states, player flows, terminology, forbidden phrasing, and unlock table. |
| `docs/COMPLETE_GAME_FUNCTION_SPEC.md` | Covered by authority | Existing Deploy/Run/Quest sections already match mission launches. Any `Region / Mission Selection`, `Free Run`, or `World Map` reference is governed by the new area model. |
| `docs/preproduction/20H_REGION_PAGES.md` | Covered by authority | Region pages describe areas as quest containers. They must now be implemented as area instances with Locked → Active Quest → Cleared/Free Run states from the area model. |
| `docs/preproduction/20H_QUEST_BIBLE.md` | Covered by authority | Quest steps such as `reach`, `route`, `access`, or `enter` mean launched mission instances or travel vignettes, not continuous overworld walking. |
| `docs/preproduction/20H_BOUNTY_CATALOG.md` | Already compatible | Bounties are selected from Hub/Deploy and run inside unlocked area instances. |
| `docs/preproduction/20H_CHARACTER_PAGES.md` | Already compatible | Character unlocks and companion quests are Hub/Quest driven. |
| `docs/preproduction/20H_STATUS_EFFECT_CATALOG.md` | Already compatible | No open-world assumptions. Extraction states remain instance-scoped. |
| `docs/preproduction/20H_MULTIPLAYER_WIREFRAMES.md` | Already compatible | Lobby/Deploy structure already uses selected arena/area instances. |
| `docs/DOCUMENTATION_COMPLETENESS_AUDIT.md` | Superseded in part | Its old `remaining risks` about region/quest docs are now mostly closed by the preproduction pack plus area model. |
| `story/Scherbenhimmel_20h_Content_Bible.md` | Legacy source, not implementation authority | Narrative content remains valuable, but campaign structure must follow the new area model when translated into implementation docs. |
| `story/STORY_PROGRESSION.md` | Legacy summary | Quest list remains valid; movement/access assumptions must follow Hub/Deploy/area-instance flow. |

## Concrete Corrections Applied by This Model

### 1. No large seamless open world

The player does not drive freely from Graumarsch to Sonnenglasweite to Wurzelwald as one contiguous map.

Correct behavior:

1. The player unlocks/accepts the next quest in the Hub.
2. Deploy shows the next mission and area.
3. The selected area instance loads.
4. The quest explores a specific area subset.
5. Extraction resolves progress.
6. The player returns to the Hub.

### 2. Regions are not always freely available

Each region begins locked or story-gated. The first visits are tied to main quests. Repeatable access comes later.

Correct states:

- **Locked:** teaser only, cannot launch.
- **Active Quest Area:** can launch only the current story/side/companion mission.
- **Cleared / Free Run Enabled:** can launch Free Run, bounty, boss hunt, farm, codex cleanup, practice.

### 3. “Explore” means area-instance exploration

Exploration still matters. Area instances can contain optional pockets, hidden lore, side objectives, alternate lanes, puzzle rooms, minibosses, secret resources, and traversal choices.

It does **not** mean free-roaming one persistent world.

### 4. Hub carries continuity

Because there is no seamless open world, the Hub must visibly carry continuity:

- NPCs move in after recruitment.
- Memorials and buildings change.
- Vendors unlock.
- Dialogue reflects choices.
- Region cards show world-state.
- Codex records discovered history.
- Quest Log shows active and completed area arcs.

### 5. Free Run is a reward/unlock, not default access

An area becomes farmable only after the core area questline has been resolved enough to justify repeat visits.

Example:

- Graumarsch Free Run after MQ-05.
- Sonnenglasweite Free Run after MQ-09.
- Wurzelwald Free Run after MQ-11.
- Eisenbrandkueste Free Run after MQ-14.
- Hochkamm Free Run after MQ-16.
- Dunkelgrund Free Run after MQ-18.
- Asterhof becomes a post-20h midgame route after MQ-20, not a standard farm zone during the 20h story.

## Required Future Edits When Coding Starts

When turning these docs into code/data, every quest object should include:

```ts
areaAccessStateBefore: 'locked' | 'active_quest' | 'cleared_free_run';
launchedFrom: 'hub_quest_log' | 'hub_npc' | 'deploy_story' | 'deploy_side' | 'deploy_bounty' | 'deploy_free_run';
areaInstanceId: string;
freeRunUnlocksAfterCompletion?: boolean;
returnDestination: 'hub_lanternhof';
```

Every region object should include:

```ts
unlockQuestId: string;
activeQuestlineIds: string[];
freeRunUnlockQuestId: string;
availableModesWhenCleared: ('free_run' | 'bounty' | 'boss_hunt' | 'farm' | 'practice')[];
```

Every Deploy card must show:

- locked/active/cleared state,
- current quest if active,
- free-run lock reason if not cleared,
- extraction reward/loss rule,
- world-state summary.

## QA Checklist

- No UI copy says or implies `big open world` for the 20h campaign.
- Region map is node-based or card-based, not a seamless navigable overworld.
- Quest start always happens from Hub/Quest Log/Deploy or a controlled prologue scene.
- Quest completion always returns to Hub through Run Summary unless a scripted chapter transition says otherwise.
- Free Run button is locked until the area questline completion flag is set.
- Bounty/Boss/Farm variants do not appear for locked/active-only areas unless explicitly story-required.
- World-state changes are visible in Hub and region cards after extraction.
- Travel language in dialogue is flavor; implementation is area-instance launch.

## Final Authority Statement

If any document appears to imply a big open world, this audit and `20H_AREA_PROGRESSION_MODEL.md` override that interpretation. The intended 20h structure is hub-driven, quest-gated, area-instanced, and extraction-resolved.
