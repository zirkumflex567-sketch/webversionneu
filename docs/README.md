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
