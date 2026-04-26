# Documentation Entry Point

This is the authoritative entry point for all implementation and documentation work in this repository.

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

## Source of Truth

Use `docs/SOURCE_OF_TRUTH.md` for document authority ranking.

## Active Documentation Map

### Core contracts

- [Technical Architecture](Technical_Architecture.md)
- [Complete Game Function Spec](COMPLETE_GAME_FUNCTION_SPEC.md)
- [GDD](GDD.md)
- [MVP Scope](MVP_Scope.md)
- [Roadmap](ROADMAP.md)
- [Deploy Standard](HTOWN_DEPLOY_STANDARD.md)
- [Documentation Completeness Audit](DOCUMENTATION_COMPLETENESS_AUDIT.md)
- [Naming Audit](NAMING_AUDIT_H_TOWN_COMBAT_67.md)

### Verification and QA

- [Status Verification](STATUS_VERIFICATION.md)
- [Web Release Checklist](web-release-checklist.md)
- [Manual Test Checklist](manual-test-checklist.md)
- [Viewport Validation Matrix](viewport-validation-matrix.md)
- [Performance Baseline](performance-baseline.md)

### Content and assets

- [Preproduction README](preproduction/README.md)
- [20H Documentation Index](preproduction/20H_DOCUMENTATION_INDEX.md)
- [20H Agent Implementation Playbook](preproduction/20H_AGENT_IMPLEMENTATION_PLAYBOOK.md)
- [20H Area Model Document Audit](preproduction/20H_AREA_MODEL_DOCUMENT_AUDIT.md)
- [20H Area Progression Model](preproduction/20H_AREA_PROGRESSION_MODEL.md)
- [20H Bounty Catalog](preproduction/20H_BOUNTY_CATALOG.md)
- [20H Character Pages](preproduction/20H_CHARACTER_PAGES.md)
- [20H Content Database Schema and Seeds](preproduction/20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md)
- [20H Implementation Examples and Anti Patterns](preproduction/20H_IMPLEMENTATION_EXAMPLES_AND_ANTI_PATTERNS.md)
- [20H Localization DE EN](preproduction/20H_LOCALIZATION_DE_EN.md)
- [20H Localization Systems DE EN](preproduction/20H_LOCALIZATION_SYSTEMS_DE_EN.md)
- [20H Lore Codex DE EN](preproduction/20H_LORE_CODEX_DE_EN.md)
- [20H Multiplayer Wireframes](preproduction/20H_MULTIPLAYER_WIREFRAMES.md)
- [20H Normal Enemy Bible](preproduction/20H_NORMAL_ENEMY_BIBLE.md)
- [20H Quest Bible](preproduction/20H_QUEST_BIBLE.md)
- [20H Region Pages](preproduction/20H_REGION_PAGES.md)
- [20H Status Effect Catalog](preproduction/20H_STATUS_EFFECT_CATALOG.md)
- [20H Systems and Data Contracts](preproduction/20H_SYSTEMS_AND_DATA_CONTRACTS.md)
- [Asset Manifest](ASSET_MANIFEST.md)
- [Asset Generation Report](ASSET_GENERATION_REPORT.md)
- [Assets README](assets/README.md)
- [Asset Prompts README](assets/asset-prompts/README.md)
- [Asset Prompts Style Guide](assets/asset-prompts/STYLE_GUIDE.md)
- [Asset Prompts Best Practices](assets/asset-prompts/BEST_PRACTICES.md)
- [All Asset Prompts](assets/asset-prompts/ALL_ASSET_PROMPTS.md)

### Audit records

- [Doc Conflict Register](audit/DOC_CONFLICT_REGISTER.md)
- [Code Doc Traceability Matrix](audit/CODE_DOC_TRACEABILITY_MATRIX.md)
- [Doc Inventory](audit/DOC_INVENTORY.md)
- [Full Repo Docs Code Audit 2026-04-25](audit/FULL_REPO_DOCS_CODE_AUDIT_2026-04-25.md)

### Historical archive

- [Archive Registry](archive/README.md)
- `docs/archive/2026-04-25/`
- `docs/archive/2026-04-26/docs-cleanup/`

## Status Claims

Use `docs/STATUS_VERIFICATION.md` for all current status evidence.

- `Complete`, `production-ready`, `tests pass`, `green build`, `CI clean` are invalid without current evidence.
- Status taxonomy is mandatory: `Authored`, `Seeded`, `Implemented`, `Integrated`, `Tested`, `Build-verified`, `Shipped`, `Planned`, `Blocked`, `Deprecated`, `Archived`.

## Legacy and Archive

- Archived files live under `docs/archive/`.
- Archived content is non-authoritative and cannot override active docs.

## Starting Sequence for New Contributors/Agents

1. `.chatgpt/skills/htown-combat-dev/SKILL.md`
2. `docs/README.md`
3. `docs/preproduction/20H_DOCUMENTATION_INDEX.md`
4. `docs/Technical_Architecture.md`
5. Feature-owner doc from the index
6. `docs/STATUS_VERIFICATION.md`
