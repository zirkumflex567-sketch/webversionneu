# Code vs Documentation Traceability Matrix

Last updated: 2026-04-25

| Feature | Doc owner | Code owner | Status | Tests | Gaps | Required action |
|---|---|---|---|---|---|---|
| Characters (14 roster entries) | `docs/preproduction/20H_CHARACTER_PAGES.md` | `src/data/CharacterData.ts` | Implemented | `src/data/CharacterData.test.ts` (pass) | docs previously mixed completion wording | keep status evidence-driven |
| Character traits | `docs/preproduction/20H_CHARACTER_PAGES.md` | `src/game/CharacterTraits.ts` | Implemented | `src/game/__tests__/CharacterTraits.test.ts` (pass) | integration coverage remains partial | keep integration checks in verification snapshots |
| Vehicles | `docs/preproduction/20H_CHARACTER_PAGES.md`, system contracts | `src/game/Vehicle.ts` and data modules | Implemented (partial verification) | vehicle animation tests exist | gameplay parity not fully e2e-covered | add scenario-level validation |
| Abilities | character pages + status catalog | `src/game/*`, `src/content/skills.ts` | Implemented (partial) | animation/integration tests | lint/type debt in ability content | refactor types and re-run lint |
| Bounties | `docs/preproduction/20H_BOUNTY_CATALOG.md` | `src/ui/BountySelectionUI.tsx` and related store/content | Integrated (UI level) | no dedicated bounty integration test in run | completeness claims in docs were too strong | add focused bounty flow test and status evidence |
| Quests | `docs/preproduction/20H_QUEST_BIBLE.md` | `src/store/StoryStore.ts`, quest-related content | Implemented (contract-aligned docs) | indirect coverage only | limited direct quest flow tests | add quest extraction-completion tests |
| Area model | `docs/preproduction/20H_AREA_PROGRESSION_MODEL.md` | app navigation + deploy flow + stores | Integrated (doc-governed) | manual/indirect | legacy docs still imply open-world in places | archive/banner legacy story files |
| Extraction flow | complete function spec + data contracts | gameplay/state logic and run summary paths | Implemented | stress/integration tests partial | no explicit end-to-end extraction automation in current suite | add extraction E2E/manual checklist run |
| Rewards | function spec + data contracts | store/save/economy modules | Implemented (partial) | unit tests partial | client-authority risk still possible for multiplayer | enforce server authority roadmap before ship |
| Shop | complete function spec + systems contracts | hub UI + content/store modules | Implemented | unit-level coverage partial | lint debt; no fresh integration evidence | add scenario tests + verification snapshot |
| Tech-Lab | function spec + systems contracts | skill tree UI and store logic | Implemented | `src/ui/__tests__/SkillTreeUI.test.ts` | old docs overstated completion quality | keep as Implemented/Integrated, not Shipped |
| Save/persistence | systems contracts | `src/save/SaveManager.ts`, schema | Implemented | `src/save/SaveManager.test.ts` | no migration-note enforcement automation | add migration checklist enforcement |
| Localization | localization docs | runtime localization key usage (partial), docs payload | Authored + partially Integrated | no key-completeness gate script | BIFA naming remnants; no hard gate for hardcoded strings | add localization lint/check script |
| Story flags | quest bible + systems contracts | story store/data flags | Implemented | indirect tests | old story package ambiguity | maintain SoT over story legacy |
| Multiplayer/server authority | multiplayer wireframes/contracts | `multiplayer-server.mjs`, socket paths | Planned/partial prototype | no authoritative anti-cheat validation | client-authority risk unresolved | treat as blocker for production readiness |
| Rendering/cel-shading/particles | architecture + rendering docs | `src/rendering/**`, `src/game/Game.ts` | Implemented | rendering and particle tests present | lint issue in `ParticleSystem.ts` (duplicate member) | fix lint + retest |
| Audio | docs + UI contracts | `src/audio/**`, `AudioManager` | Implemented | audio tests present | no e2e sound validation | add smoke/manual checklist |
| Accessibility | roadmap/docs + UI | colorblind config + UI | Implemented (partial verification) | `src/config/__tests__/colorblindModes.test.ts` | lint debt in broader codebase blocks clean gate | clean lint before claiming tested/ship |
| Auth/API base URL | auth docs/tests | `src/auth/authUrl.ts` | Implemented | `src/auth/authUrl.test.ts` (pass) | none for current local contract | keep `/api` as default; document absolute override config |
| Deployment paths/base paths | deployment docs + architecture | `next.config.mjs`, `nginx.conf`, middleware/cors | Implemented but inconsistent | manual config inspection + CORS unit test | mixed multiproject routes in nginx remain | split/clarify infra ownership in deployment docs |

## Special checks requested in audit

- `../../rendering/particles/ParticleSystem` missing import hypothesis: **not reproduced** (path exists in code/tests).
- Auth URL mismatch hypothesis: **resolved** (test and implementation aligned on `/api` default).
- `src/app` vs `app` mismatch: **observed in docs/history vs current config** (`tailwind.config.ts` scans `./app/**/*`).
- Localization key discipline: **partially enforced by docs, not hard-enforced in tooling**.
