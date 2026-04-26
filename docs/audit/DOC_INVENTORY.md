# Documentation and Repo Inventory

Last generated: 2026-04-25
Commit baseline: `e32350f`

Note: this inventory is a historical snapshot from 2026-04-25.
For current-state reconciliation, see `docs/audit/FULL_REPO_DOCS_CODE_AUDIT_2026-04-26.md`.

This inventory captures all high-impact documentation and relevant code/config files in audit scope, with classification for source-of-truth governance.

## Legend

- `authoritative`: implementation contract / governing rule
- `active`: in-use supporting documentation
- `summary`: convenience overview; not authoritative
- `legacy`: historical; may be useful with caution
- `archive-candidate`: should be archived or converted to stub
- `unrelated`: not part of H-Town Combat 67 active scope
- `generated`: output artifact
- `unknown`: ownership unclear

## Core Governance and Entry Docs

| Path | Type | Owner topic | Last updated | Referenced by | Links to | Conflicts found | Recommended action |
|---|---|---|---|---|---|---|---|
| `docs/README.md` | authoritative | agent entrypoint | 2026-04-25 | README, SoT, skill flow | SoT + status verification | none | keep authoritative |
| `docs/SOURCE_OF_TRUTH.md` | authoritative | doc hierarchy | 2026-04-25 | docs/README | all core docs | previous competing masters | keep authoritative |
| `docs/STATUS_VERIFICATION.md` | authoritative | status evidence | 2026-04-25 | docs/README, report | audit report | initially missing | keep authoritative |
| `README.md` | summary | repo overview | 2026-04-25 | root entry | docs/README, SoT | had stale status claims | keep as summary only |
| `MASTER_DOCUMENTATION.md` | summary | historical overview | 2026-04-25 | legacy links | SoT + status | previously conflicting status/structure | keep non-authoritative banner |
| `ROADMAP_DETAILED.md` | summary | planning tracker | 2026-04-25 | planning references | SoT + status | conflicting completion statements | keep planning-only |

## Preproduction Contract Docs

| Path | Type | Owner topic | Last updated | Referenced by | Links to | Conflicts found | Recommended action |
|---|---|---|---|---|---|---|---|
| `docs/preproduction/20H_DOCUMENTATION_INDEX.md` | authoritative | contract routing | active | README, skill, playbook | all owner docs | missing mandatory-rule block (fixed) | keep authoritative |
| `docs/preproduction/20H_AGENT_IMPLEMENTATION_PLAYBOOK.md` | authoritative | implementation guardrails | active | index, skill | core contracts | missing synchronized rule block (fixed) | keep authoritative |
| `docs/preproduction/20H_AREA_PROGRESSION_MODEL.md` | authoritative | area model | active | README, architecture | quest/region docs | none critical | keep authoritative |
| `docs/preproduction/20H_SYSTEMS_AND_DATA_CONTRACTS.md` | authoritative | data contracts | active | index/playbook | schema + systems docs | none critical | keep authoritative |
| `docs/preproduction/20H_LOCALIZATION_DE_EN.md` | authoritative | player text DE/EN | active | index/playbook | localization systems | contains BIFA naming remnants | patch in follow-up |
| `docs/preproduction/20H_LOCALIZATION_SYSTEMS_DE_EN.md` | authoritative | systems localization | active | index | systems/contracts | none critical | keep authoritative |
| `docs/preproduction/20H_LORE_CODEX_DE_EN.md` | active | lore localization | active | index | codex contracts | none critical | keep active |
| `docs/preproduction/20H_QUEST_BIBLE.md` | authoritative | quest contracts | active | index | contracts/localization | none critical | keep authoritative |
| `docs/preproduction/20H_CHARACTER_PAGES.md` | authoritative | character contracts | active | index | quest/status docs | claim consistency must be tied to verification | keep authoritative |
| `docs/preproduction/20H_BOUNTY_CATALOG.md` | authoritative | bounty contracts | active | index | quest/contracts | status wording can imply completeness | keep, tie to status verification |
| `docs/preproduction/20H_STATUS_EFFECT_CATALOG.md` | active | status effects | active | index | character/combat docs | none critical | keep active |
| `docs/preproduction/20H_REGION_PAGES.md` | authoritative | region contracts | active | index | area/quest docs | none critical | keep authoritative |
| `docs/preproduction/README.md` | authoritative | preproduction entry | 2026-04-25 | docs/README | index/playbook | previously missing | keep authoritative |

## Technical / Deployment / Config

| Path | Type | Owner topic | Last updated | Referenced by | Links to | Conflicts found | Recommended action |
|---|---|---|---|---|---|---|---|
| `package.json` | authoritative | scripts/dependencies | active | CI/manual | npm commands | next 15.1.0 vulnerable | upgrade next + lockfile follow-up |
| `next.config.mjs` | active | build/runtime config | active | build | basePath `/combat` | lint/type checks ignored during build | keep but flag risk |
| `vite.config.ts` | active | test/tooling config | active | vitest | src tests | parallel framework split with Next | keep with clear scope |
| `tailwind.config.ts` | active | styling scan paths | active | app UI | `./app/**/*` | docs previously mentioned `src/app` | doc corrected in conflicts |
| `middleware.ts` | active | API CORS middleware | active | API routes | CORS behavior | wildcard `*.duckdns.org` + redline origins | harden follow-up |
| `src/lib/cors.ts` | active | OPTIONS CORS helper | active | API handlers | same origin policy | wildcard + legacy redline origins | harden follow-up |
| `nginx.conf` | legacy | host multiproject edge config | active external | deployment docs | multiple projects/paths | mixed `/combat`, `/bifa`, `/fifa`, `/fr-sieg`, wedding APIs | split or document ownership boundaries |
| `index.html` | unrelated | old prototype entry | archived 2026-04-25 | none active | archive pointer | REDLINE football identity | archived + stub |
| `prototype.html` | unrelated | old prototype | archived 2026-04-25 | none active | archive pointer | REDLINE football identity | archived + stub |

## Skill / Agent Files

| Path | Type | Owner topic | Last updated | Referenced by | Links to | Conflicts found | Recommended action |
|---|---|---|---|---|---|---|---|
| `.chatgpt/skills/htown-combat-dev/SKILL.md` | authoritative | agent guardrails | 2026-04-25 | docs/README, preproduction docs | references/* | missing synchronized mandatory-rule block (fixed) | keep authoritative |
| `.chatgpt/skills/htown-combat-dev/references/document-map.md` | active | helper map | active | SKILL.md | docs | may go stale | keep, periodic refresh |
| `.chatgpt/skills/htown-combat-dev/references/agent-checklists.md` | active | checklists | active | SKILL.md | docs | none critical | keep |
| `.chatgpt/skills/htown-combat-dev/references/localization-rules.md` | active | localization policy | active | SKILL.md | localization docs | must stay aligned with DE/EN mandate | keep |

## Story / Legacy Content

| Path | Type | Owner topic | Last updated | Referenced by | Links to | Conflicts found | Recommended action |
|---|---|---|---|---|---|---|---|
| `story/STORY_PROGRESSION.md` | legacy | narrative summary | active | some docs | story package | may imply legacy structure | keep as legacy-only |
| `story/Scherbenhimmel_20h_Content_Bible.md` | legacy | older content bible | active | references in docs | story datasets | not implementation authority | keep with legacy interpretation |
| `story/deep-research-report (2).md` | legacy | archived stub | 2026-04-25 | none authoritative | archive pointer | open-world framing conflicted with area-instance model | archived with stub |
| `story/implementation_startprompt.md` | legacy | old agent prompt | active | none authoritative | story package | may bypass new SoT workflow | keep as legacy; do not use for implementation authority |
| `story/scherbenhimmel_20h_content_package_v2_mechanics_database/*` | legacy | content package snapshot | active | docs mention as legacy source | json/csv/sqlite | mixed with implementation claims | keep as data source, non-authoritative for runtime behavior |

## Tests and Validation Scripts

| Path | Type | Owner topic | Last updated | Referenced by | Links to | Conflicts found | Recommended action |
|---|---|---|---|---|---|---|---|
| `npm test` (`vitest`) | authoritative evidence command | unit tests | 2026-04-25 run | status verification | test files | 1 failing test (`authUrl`) | mark `Tested=No` for affected area |
| `tests/viewport-smoke.mjs` | active | viewport smoke | active | npm script | localhost:3000 | fails without running dev server | document precondition |
| `tests/fps-profile-real.mjs` | active | fps profile | active | npm script | localhost:3000 | fails without running dev server | document precondition |
| `npm run lint` | authoritative evidence command | static analysis | 2026-04-25 run | status verification | ESLint config | many lint violations; plugin warning | mark not clean |
| `npm run build` | authoritative evidence command | prod build | 2026-04-25 run | status verification | next build | build passes while lint/types skipped in config | mark with caveat |
| `npm audit --audit-level=high` | authoritative evidence command | dependency security | 2026-04-25 run | status verification | npm advisories | critical Next.js vulnerability present | P0/P1 remediation required |

## Archived in this cleanup batch

See `docs/archive/README.md` and `docs/archive/2026-04-25/`.
