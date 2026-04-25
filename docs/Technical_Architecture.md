# H-Town Combat 67 — Technical Architecture

This document describes the current web architecture for H-Town Combat 67 / Scherbenhimmel and replaces older REDLINE FC prototype assumptions. It is written for developers and implementation agents. Player-facing copy belongs in the DE/EN localization documents.

## 1. Architecture Goals

The architecture is designed for:

- fast browser-based gameplay iteration,
- deterministic and testable gameplay logic where practical,
- strict separation between authored content, runtime state, rendering, UI, persistence, and networking,
- hub-driven area-instance progression rather than a seamless open world,
- localization-first player-facing text,
- validation-first content development,
- future multiplayer without corrupting the single-player campaign contract.

## 2. Current Stack

Based on `package.json` in this repository:

| Layer | Technology | Purpose |
|---|---|---|
| Web framework | Next.js 15 | App routing, pages, server/runtime integration |
| UI runtime | React 19 / React DOM 19 | Hub, menus, HUD, dialogs, screens |
| Language | TypeScript 6 | Strict typed game/content/data contracts |
| Rendering | Three.js | Vehicle combat scene and 3D presentation |
| State | Zustand | Client UI/game session state where appropriate |
| Multiplayer | Socket.io / Socket.io Client | Future real-time co-op and 2v2 PvPvE |
| Persistence options | SQLite3, Redis/ioredis | Local/server persistence, sessions, matchmaking, transient multiplayer state |
| Auth/mail utilities | Google OAuth, JWT, Nodemailer | Account/admin/debug/support flows where required |
| Tests | Vitest, Playwright scripts | Unit/content validation and smoke/performance tests |
| Tooling | ESLint, TypeScript, PostCSS, Tailwind | Quality, typing, styling |

## 3. Canonical Runtime Model

The first 20-hour campaign is not a seamless open world. All architecture must support:

```text
Hub / Laternenhof
  -> accept/select quest, lore, dialogue, prep, upgrades
  -> Deploy
  -> selected area instance
  -> quest objectives + extraction/defeat
  -> Run Summary
  -> Hub
  -> area becomes Free Run / farming / bounty / boss-hunt zone only after its area questline is resolved
```

This means the engine should optimize for loaded area instances, not one persistent overworld simulation.

## 4. Recommended Source Layout

Recommended structure for implementation work:

```text
src/
├── app/                         # Next.js routes and route-level shells
│   ├── page.tsx                 # Boot / landing
│   ├── garage/                  # Hub / Laternenhof UI
│   ├── game/                    # Area instance game client route
│   └── api/                     # Server endpoints if needed
├── content/                     # Authored game content, no runtime mutation
│   ├── areas.ts
│   ├── quests.ts
│   ├── characters.ts
│   ├── bounties.ts
│   ├── statuses.ts
│   ├── items.ts
│   ├── codex.ts
│   └── localization/
│       ├── de.ts
│       └── en.ts
├── game/                        # Pure gameplay/domain logic
│   ├── run/                     # Run state, phases, extraction, rewards
│   ├── combat/                  # Damage, status effects, abilities
│   ├── progression/             # quests, flags, area unlocks, tech-lab
│   ├── inventory/               # items, currencies, reward resolution
│   ├── validation/              # content validators
│   └── __tests__/
├── rendering/                   # Three.js scene/rendering adapters
├── ui/                          # Shared React UI components
├── store/                       # Zustand stores / client state adapters
├── server/                      # persistence, auth, multiplayer server helpers
├── multiplayer/                 # Socket.io protocol, lobbies, match state
├── lib/                         # shared utilities
└── types/                       # shared TypeScript contracts
```

## 5. Layer Rules

### 5.1 Authored Content Layer

Files under `src/content/` should contain immutable authored data:

- quest definitions,
- area definitions,
- character definitions,
- status definitions,
- bounty definitions,
- item definitions,
- localization tables,
- codex entries.

Rules:

- No random runtime state in content files.
- No player-facing raw strings; use localization keys.
- Stable IDs are mandatory.
- Content must pass validation before build/release.

### 5.2 Domain/Game Logic Layer

Files under `src/game/` should be mostly pure TypeScript logic:

- run state machine,
- extraction state machine,
- reward resolution,
- quest objective evaluation,
- status effect behavior,
- area unlock state,
- save migration and validation.

Rules:

- Prefer pure functions for reward, unlock, validation, and quest checks.
- Keep React and Three.js out of domain logic.
- Add unit tests for state transitions and reward resolution.

### 5.3 Rendering Layer

Rendering adapts domain state to visuals.

Rules:

- Three.js should consume state; it should not own campaign truth.
- Rendering can interpolate, animate, and present, but not decide reward banking, quest completion, or save flags.
- Effects must have accessibility fallbacks for flash, shake, color, and confusion.

### 5.4 UI Layer

React UI handles:

- boot,
- Hub/Laternenhof,
- Deploy,
- Quest Log,
- Shop,
- Tech-Lab,
- Codex,
- Settings,
- Run Summary,
- HUD overlays.

Rules:

- UI must be driven by state/data contracts.
- Every disabled action must show a localized reason.
- All text uses localization keys.
- UI must not duplicate reward or quest logic.

### 5.5 Persistence Layer

Persistence stores campaign state, not authored content.

Rules:

- Save schema version is mandatory.
- Save migrations must be explicit.
- Run resolution should be atomic from the player's perspective.
- Do not save half-resolved extraction rewards.
- Export broken saves for debugging.

### 5.6 Multiplayer Layer

Multiplayer is future-facing and must not rewrite campaign contracts.

Rules:

- Single-player campaign remains canonical.
- Co-op uses host story authority.
- 2v2 PvPvE uses unlocked areas as arenas and must not advance story choices.
- Network state must never be the only source of durable campaign progression.

## 6. Required State Machines

### 6.1 Area State

```text
locked -> active_quest -> cleared_free_run
```

Never expose Free Run before the area questline completion flag.

### 6.2 Quest State

```text
locked -> available -> accepted -> in_progress -> ready_to_extract -> completed
                                               -> failed_retryable
                                               -> failed_locked
```

A quest requiring extraction is not completed until extraction succeeds.

### 6.3 Run State

```text
loading -> drop_intro -> combat -> boss_event -> extraction_spawned -> extraction_hold
                                                                  -> success_resolution
                                                                  -> failure_resolution
```

Level-up choice may temporarily interrupt combat but should not corrupt the run phase.

### 6.4 Extraction State

```text
not_spawned -> spawned -> holding -> success
                         -> contested -> holding
                         -> failed
```

## 7. Content Validation as a First-Class Build Gate

Content validation should fail if:

- a localization key is missing `de` or `en`,
- placeholders differ between languages,
- a quest lacks extraction rules,
- a reward lacks persistence category,
- a Free Run mode exists before its unlock quest,
- a status lacks boss behavior,
- a Deploy card cannot show locked/active/cleared state,
- a Run Summary cannot explain banked/lost/converted rewards,
- player-facing text is hardcoded in content data.

Recommended script path:

```text
scripts/validate-content.ts
```

Recommended package script:

```json
{
  "scripts": {
    "validate:content": "tsx scripts/validate-content.ts"
  }
}
```

If `tsx` is not added, use `node` against compiled JavaScript or a Vitest validation suite instead.

## 8. Testing Strategy

### Unit Tests

Use Vitest for:

- reward resolution,
- extraction transitions,
- quest objective completion,
- area unlock logic,
- status stack behavior,
- localization placeholder validation,
- save migration.

### Integration / Smoke

Use Playwright or existing smoke scripts for:

- boot to Hub,
- Hub to Deploy,
- Deploy locked reason,
- successful run summary,
- defeat run summary,
- settings/localization switch,
- codex unlock view.

### Performance

For gameplay:

- keep rendering adapters thin,
- avoid React state updates per frame for high-frequency combat data,
- batch HUD updates,
- profile enemy count / particles / outlines,
- preserve accessibility options for reducing particles/shake.

## 9. Senior-Dev Pitfalls to Avoid

- Do not let UI own game truth.
- Do not let Three.js objects own durable state.
- Do not hardcode player-facing text.
- Do not grant Tech before extraction.
- Do not mark a quest complete before extraction if it requires extraction.
- Do not imply seamless open world traversal.
- Do not duplicate quest/area definitions in UI components.
- Do not create new IDs without adding them to docs/content validation.
- Do not mix authored content with player save state.
- Do not allow save migrations to silently grant progression.
- Do not let multiplayer authority overwrite single-player campaign flags.
- Do not ship confusing accessibility-hostile effects without alternatives.

## 10. Implementation Readiness Checklist

A system is implementation-ready when all are true:

- relevant docs are linked from `20H_DOCUMENTATION_INDEX.md`,
- data contracts exist,
- localization keys exist in German and English,
- QA checks exist,
- reward persistence is explicit,
- save flags are explicit,
- failure/retry/cancel states are defined,
- content validation can catch missing required data,
- implementation examples or pseudo-code exist for non-trivial systems.

## 11. Related Documents

- `docs/preproduction/20H_DOCUMENTATION_INDEX.md`
- `docs/preproduction/20H_AGENT_IMPLEMENTATION_PLAYBOOK.md`
- `docs/preproduction/20H_SYSTEMS_AND_DATA_CONTRACTS.md`
- `docs/preproduction/20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md`
- `docs/preproduction/20H_IMPLEMENTATION_EXAMPLES_AND_ANTI_PATTERNS.md`
- `docs/preproduction/20H_LOCALIZATION_DE_EN.md`
- `docs/preproduction/20H_LOCALIZATION_SYSTEMS_DE_EN.md`
- `docs/preproduction/20H_LORE_CODEX_DE_EN.md`
