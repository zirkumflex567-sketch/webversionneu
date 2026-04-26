# Scherbenhimmel 20h - Documentation Index and Traceability Guide

This file is the master navigation layer for agents. It explains which document owns which detail, how documents link together, and how to decide whether an implementation has enough information to proceed.

## Mandatory Agent Rules

Before changing code, docs, quests, content, localization, multiplayer, rewards, persistence, extraction, UI, QA, or architecture:

1. Read `docs/README.md`.
2. Read `docs/preproduction/20H_DOCUMENTATION_INDEX.md`.
3. Read the feature owner document listed in the index.
4. Check `docs/SOURCE_OF_TRUTH.md`.
5. Check `docs/STATUS_VERIFICATION.md`.
6. If documents conflict, stop and fix docs before coding.

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
## Absolute Rules

1. The 20h campaign is hub-driven and area-instanced, not a seamless open world.
2. German and English localization are mandatory for shipped player-facing text.
3. Agent/code instructions are written in English.
4. Player-facing copy exists in German and English localization documents.
5. No implementation may invent missing behavior silently. If a detail is missing, update docs first.
6. Legacy story docs are inspiration unless explicitly referenced by a preproduction contract.
7. The current stack is Next.js 15, React 19, TypeScript 6, Three.js, Zustand, Socket.io, SQLite/Redis-capable server tooling, Vitest, and Playwright smoke/perf scripts.

## Source-of-Truth Stack

| Priority | Document | Owns |
|---:|---|---|
| 1 | `20H_AREA_PROGRESSION_MODEL.md` | Campaign structure, area states, Free Run unlock rules |
| 2 | `COMPLETE_GAME_FUNCTION_SPEC.md` | Screens, menus, run flow, extraction, rewards, persistence, debug |
| 3 | `Technical_Architecture.md` | Current stack, runtime layers, architecture rules, testing strategy, senior-dev pitfalls |
| 4 | `20H_AGENT_IMPLEMENTATION_PLAYBOOK.md` | How agents must implement, validate, and stop when docs are missing |
| 5 | `20H_SYSTEMS_AND_DATA_CONTRACTS.md` | Data models and detailed system behavior for save, inventory, economy, settings, codex, shop, tech-lab, QA |
| 6 | `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` | Implementable content database schemas and seed examples for areas, quests, characters, rewards, statuses, bounties, items, codex, shop, tech-lab |
| 7 | `20H_IMPLEMENTATION_EXAMPLES_AND_ANTI_PATTERNS.md` | Concrete implementation examples, PR template, and senior-dev anti-patterns |
| 8 | `20H_QUEST_BIBLE.md` | Main/side/companion quests, objectives, rewards, flags, choices, dialogue beats |
| 9 | `20H_REGION_PAGES.md` | Regions/areas, hazards, loot bias, extraction modifiers, world-state |
| 10 | `20H_NORMAL_ENEMY_BIBLE.md` | Normal (non-elite) biome enemy archetypes, spawn roles, hazard interactions, and ID contracts |
| 11 | `20H_CHARACTER_PAGES.md` | Playable roster, abilities, unlocks, arcs, companion hooks |
| 12 | `20H_BOUNTY_CATALOG.md` | Bounties, modifiers, rewards, failure conditions |
| 13 | `20H_STATUS_EFFECT_CATALOG.md` | Status effects, tooltips, boss behavior, VFX/SFX expectations |
| 14 | `20H_MULTIPLAYER_WIREFRAMES.md` | Co-op and 2v2 adaptation of same area/extraction model |
| 15 | `20H_LOCALIZATION_DE_EN.md` | Core UI, quest, region, character, bounty, status, dialogue, debug strings DE/EN |
| 16 | `20H_LOCALIZATION_SYSTEMS_DE_EN.md` | System UI strings DE/EN: shop, inventory, settings, accessibility, save, codex, economy |
| 17 | `20H_LORE_CODEX_DE_EN.md` | World/region/faction/character/boss/item/hub codex lore DE/EN |
| 18 | `20H_AREA_MODEL_DOCUMENT_AUDIT.md` | Audit that overrides any open-world interpretation |
| 19 | `DOCUMENTATION_COMPLETENESS_AUDIT.md` | Historical doc audit from the beginning of this branch |

## Agent Start Checklist

Before coding any feature, open:

1. `20H_DOCUMENTATION_INDEX.md`
2. `20H_AGENT_IMPLEMENTATION_PLAYBOOK.md`
3. `20H_AREA_PROGRESSION_MODEL.md`
4. `docs/Technical_Architecture.md`
5. The specific content doc for the feature
6. The relevant localization doc
7. `20H_SYSTEMS_AND_DATA_CONTRACTS.md` if the feature touches data, save, economy, UI state, settings, rewards, or validation
8. `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` if the feature needs authored content or seed data
9. `20H_IMPLEMENTATION_EXAMPLES_AND_ANTI_PATTERNS.md` before writing implementation logic
10. `20H_NORMAL_ENEMY_BIBLE.md` if the feature touches enemy rosters, spawn tables, combat readability, or biome combat identity

## Feature-to-Document Matrix

| Feature | Required docs |
|---|---|
| Boot / Continue / New Campaign | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_LOCALIZATION_SYSTEMS_DE_EN.md` |
| Hub / Laternenhof | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_AREA_PROGRESSION_MODEL.md`, `20H_LORE_CODEX_DE_EN.md`, `20H_LOCALIZATION_DE_EN.md` |
| Deploy | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_AREA_PROGRESSION_MODEL.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_LOCALIZATION_DE_EN.md` |
| Area unlock | `20H_AREA_PROGRESSION_MODEL.md`, `20H_REGION_PAGES.md`, `20H_QUEST_BIBLE.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Free Run unlock | `20H_AREA_PROGRESSION_MODEL.md`, `20H_REGION_PAGES.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Main quest | `20H_QUEST_BIBLE.md`, `20H_AREA_PROGRESSION_MODEL.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_LORE_CODEX_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Side quest | `20H_QUEST_BIBLE.md`, `20H_REGION_PAGES.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Companion quest | `20H_QUEST_BIBLE.md`, `20H_CHARACTER_PAGES.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Normal enemy roster / spawn mix | `20H_NORMAL_ENEMY_BIBLE.md`, `20H_REGION_PAGES.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md` |
| Character | `20H_CHARACTER_PAGES.md`, `20H_STATUS_EFFECT_CATALOG.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_LORE_CODEX_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Ability / status | `20H_CHARACTER_PAGES.md`, `20H_STATUS_EFFECT_CATALOG.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Bounty | `20H_BOUNTY_CATALOG.md`, `20H_AREA_PROGRESSION_MODEL.md`, `20H_LOCALIZATION_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Reward / loot / inventory | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_LOCALIZATION_SYSTEMS_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Shop | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_LOCALIZATION_SYSTEMS_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Tech-Lab | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_LOCALIZATION_SYSTEMS_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Codex | `20H_LORE_CODEX_DE_EN.md`, `20H_LOCALIZATION_SYSTEMS_DE_EN.md`, `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` |
| Settings / Accessibility | `20H_SYSTEMS_AND_DATA_CONTRACTS.md`, `20H_LOCALIZATION_SYSTEMS_DE_EN.md` |
| Debug Suite | `COMPLETE_GAME_FUNCTION_SPEC.md`, `20H_AGENT_IMPLEMENTATION_PLAYBOOK.md`, `20H_LOCALIZATION_DE_EN.md` |
| Multiplayer | `20H_MULTIPLAYER_WIREFRAMES.md`, `20H_AREA_PROGRESSION_MODEL.md`, `COMPLETE_GAME_FUNCTION_SPEC.md` |
| Architecture / stack / implementation examples | `docs/Technical_Architecture.md`, `20H_IMPLEMENTATION_EXAMPLES_AND_ANTI_PATTERNS.md`, `20H_SYSTEMS_AND_DATA_CONTRACTS.md` |

## Content ID Matrix

### Areas

| ID | Name key | First entry | Free Run unlock | Primary docs |
|---|---|---|---|---|
| `area_graumarsch` | `region.graumarsch.name` | MQ-00 / MQ-01 | MQ-05 | Region Pages, Quest Bible, Content DB Schema |
| `area_sonnenglasweite` | `region.sonnenglasweite.name` | MQ-06 | MQ-09 | Region Pages, Quest Bible, Content DB Schema |
| `area_wurzelwald_nhal` | `region.wurzelwald.name` | MQ-10 | MQ-11 | Region Pages, Quest Bible, Content DB Schema |
| `area_eisenbrandkueste` | `region.eisenbrand.name` | MQ-12 | MQ-14 | Region Pages, Quest Bible, Content DB Schema |
| `area_hochkamm_eidwacht` | `region.hochkamm.name` | MQ-15 | MQ-16 | Region Pages, Quest Bible, Content DB Schema |
| `area_dunkelgrund` | `region.dunkelgrund.name` | MQ-17 | MQ-18 | Region Pages, Quest Bible, Content DB Schema |
| `area_asterhof` | `region.asterhof.name` | MQ-19 | post MQ-20 midgame route | Region Pages, Quest Bible, Content DB Schema |

### Normal Enemy Archetypes

| ID pattern | Ownership | Primary docs |
|---|---|---|
| `enemy_<areaCode>_<slug>` | Normal enemy archetype IDs by biome/area | Normal Enemy Bible, Region Pages, Content DB Schema |

### Playable Characters

| ID | Name key | Unlock | Primary docs |
|---|---|---|---|
| `char_lyra_dorn` | `character.lyra.name` | Start | Character Pages, Quest Bible, Content DB Schema |
| `char_mira_voss` | `character.mira.name` | MQ-04 | Character Pages, Quest Bible, Content DB Schema |
| `char_tarek_al_sahir` | `character.tarek.name` | MQ-07 | Character Pages, Quest Bible, Content DB Schema |
| `char_siofra_nhal` | `character.siofra.name` | MQ-11 | Character Pages, Quest Bible, Content DB Schema |
| `char_brannok_reef` | `character.brannok.name` | MQ-13 | Character Pages, Quest Bible, Content DB Schema |
| `char_edda_falkenlicht` | `character.edda.name` | MQ-15 | Character Pages, Quest Bible, Content DB Schema |
| `char_kael_nhar` | `character.kael.name` | MQ-17 | Character Pages, Quest Bible, Content DB Schema |

### Main Quests

| ID | Title key | Area | Completion impact |
|---|---|---|---|
| `mq00` | `quest.main.mq00.title` | Graumarsch | prologue attachment |
| `mq01` | `quest.main.mq01.title` | Graumarsch | Fackelruh burned, Lyra ability |
| `mq02` | `quest.main.mq02.title` | Graumarsch | Echo-Lupe, Mara |
| `mq03` | `quest.main.mq03.title` | Laternenhof | Hub level 1 |
| `mq04` | `quest.main.mq04.title` | Graumarsch / Sumpfkathedrale | Mira unlock |
| `mq05` | `quest.main.mq05.title` | Graumarsch | Graumarsch Free Run |
| `mq06` | `quest.main.mq06.title` | Sonnenglasweite | Tarek temp |
| `mq07` | `quest.main.mq07.title` | Sonnenglasweite | Tarek unlock |
| `mq08` | `quest.main.mq08.title` | Sonnenglasweite | well world-state |
| `mq09` | `quest.main.mq09.title` | Sonnenglasweite | Sonnenglasweite Free Run |
| `mq10` | `quest.main.mq10.title` | Wurzelwald | Siofra temp/name choice |
| `mq11` | `quest.main.mq11.title` | Wurzelwald | Siofra unlock, Free Run |
| `mq12` | `quest.main.mq12.title` | Eisenbrand | Brannok temp |
| `mq13` | `quest.main.mq13.title` | Eisenbrand | Brannok unlock |
| `mq14` | `quest.main.mq14.title` | Eisenbrand | Free Run, Werft crafting |
| `mq15` | `quest.main.mq15.title` | Hochkamm | Edda unlock |
| `mq16` | `quest.main.mq16.title` | Hochkamm | Free Run, pass route |
| `mq17` | `quest.main.mq17.title` | Dunkelgrund | Kael unlock path, Reliktprägung |
| `mq18` | `quest.main.mq18.title` | Dunkelgrund | Free Run, Asterhof key |
| `mq19` | `quest.main.mq19.title` | Asterhof | finale carry choice |
| `mq20` | `quest.main.mq20.title` | Asterhof | midgame route unlock |

## Link Completeness Expectations

Every new document must include at least one of:

- a source-of-truth statement,
- a link/path to its parent authority document,
- a cross-reference to the specific content doc it depends on,
- a QA checklist that points back to implementation expectations.

Every implementation PR must reference which docs it used.

## What Counts as Missing Information

A detail is missing if an agent cannot answer any of these without inventing:

- Where is the feature entered from?
- Which screen opens next?
- What can the player select?
- What is disabled and why?
- What happens on confirm?
- What happens on cancel/back?
- What happens on success?
- What happens on failure?
- What rewards are immediate/completion/extraction/choice/lost?
- Which save flags change?
- Which localization keys are used?
- Which content database entry owns it?
- Which validation rule catches invalid data?
- Which QA checks prove it works?

If any answer is missing, the agent must update the relevant doc before coding.

## Current Coverage Assessment

As of this branch, the docs cover:

- Campaign structure
- Current technical stack and architecture
- Player flow
- Hub/Deploy/Run/Extraction/Run Summary
- Quests
- Areas/regions
- Characters
- Bounties
- Status effects
- Localization DE/EN
- Lore/Codex DE/EN
- Multiplayer preparation
- Debug suite
- System/data contracts
- Content database schemas and seed examples
- Implementation examples and senior-dev anti-patterns
- Agent workflow and validation rules

Future expansions beyond the 20h scope require new docs or extensions following this same structure.

