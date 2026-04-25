# Documentation Conflict Register

Last updated: 2026-04-25

## C-001

- Severity: high
- Files involved: `README.md`, `MASTER_DOCUMENTATION.md`, `ROADMAP_DETAILED.md`
- Conflicting statements: multiple files presented themselves as current source of truth with overlapping status claims.
- Current authoritative answer: `docs/SOURCE_OF_TRUTH.md` defines hierarchy; summaries cannot override owner contracts.
- Decision made: converted README to concise summary; marked MASTER and ROADMAP as non-authoritative trackers.
- Files changed: `README.md`, `MASTER_DOCUMENTATION.md`, `ROADMAP_DETAILED.md`, `docs/SOURCE_OF_TRUTH.md`, `docs/README.md`
- Evidence / command output: read-only inspection + `rg` conflict scan.
- Remaining follow-up: keep summaries synced after each major release.

## C-002

- Severity: high
- Files involved: `README.md`, `ROADMAP_DETAILED.md`, `MASTER_DOCUMENTATION.md`
- Conflicting statements: `Phase 2 in progress` vs `Phase 2 complete`; multiple `tests pass`/`green` claims.
- Current authoritative answer: status must come from command evidence in `docs/STATUS_VERIFICATION.md`.
- Decision made: removed unsupported claims from summary docs and introduced mandatory taxonomy.
- Files changed: `README.md`, `ROADMAP_DETAILED.md`, `MASTER_DOCUMENTATION.md`, `docs/STATUS_VERIFICATION.md`
- Evidence / command output: `npm test` failed 1 test; `npm run lint` failed with many errors.
- Remaining follow-up: resolved for current snapshot; keep evidence snapshot current after each major change.

## C-003

- Severity: high
- Files involved: `README.md`, `docs/preproduction/*`, `story/deep-research-report (2).md`
- Conflicting statements: area-instance campaign model vs large open-world framing in legacy story research.
- Current authoritative answer: first 20h uses `Hub -> Quest -> Area Instance -> Extraction -> Hub`.
- Decision made: reinforced model in entry docs and mandatory rules; flagged deep research file as archive candidate.
- Files changed: `docs/README.md`, `docs/preproduction/20H_DOCUMENTATION_INDEX.md`, `docs/preproduction/20H_AGENT_IMPLEMENTATION_PLAYBOOK.md`, `.chatgpt/skills/htown-combat-dev/SKILL.md`, `docs/audit/DOC_INVENTORY.md`
- Evidence / command output: `rg -n "open world|seamless" docs story README.md`.
- Remaining follow-up: archive or hard-banner `story/deep-research-report (2).md`.

## C-004

- Severity: high
- Files involved: `README.md`, `MASTER_DOCUMENTATION.md`, `ROADMAP_DETAILED.md`
- Conflicting statements: `production-ready`, `tests pass`, `green build`, `CI clean` claims.
- Current authoritative answer: command-based evidence snapshot dated 2026-04-25.
- Decision made: consolidated status to taxonomy and verification table.
- Files changed: `docs/STATUS_VERIFICATION.md`, summary docs.
- Evidence / command output: current snapshot shows `npm test`, `npm run lint`, `npm run build` all pass (warnings only).
- Remaining follow-up: resolved for current snapshot; maintain with CI enforcement.

## C-005

- Severity: medium
- Files involved: `tailwind.config.ts`, older docs mentioning `src/app`
- Conflicting statements: docs described `src/app`, config scans `./app/**/*`.
- Current authoritative answer: repository currently uses Next App Router under `app/`.
- Decision made: treated docs as stale where `src/app` is mentioned; recorded as structure mismatch resolved by SoT.
- Files changed: `docs/audit/DOC_INVENTORY.md`, `docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md`
- Evidence / command output: `tailwind.config.ts` content + `rg -n "src/app|./app"`.
- Remaining follow-up: clean remaining `src/app` textual remnants in secondary docs.

## C-006

- Severity: blocker
- Files involved: `src/auth/authUrl.ts`, `src/auth/authUrl.test.ts`
- Conflicting statements: test expects `http://localhost:3000/api`; implementation returns `/api` in local dev.
- Current authoritative answer: local default is relative `/api`; absolute URL only via explicit config.
- Decision made: aligned test and implementation contract to `/api` default.
- Files changed: `docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md`, `docs/STATUS_VERIFICATION.md`, final audit report.
- Evidence / command output: `npm test` now passes with updated `src/auth/authUrl.test.ts`.
- Remaining follow-up: none.

## C-007

- Severity: medium
- Files involved: `package.json`, `next.config.mjs`, `npm audit` output
- Conflicting statements: implied production readiness vs unresolved dependency advisories.
- Current authoritative answer: no high/critical advisories at current snapshot; moderate advisories still present.
- Decision made: upgraded Next.js and re-ran audit; production claims remain evidence-gated.
- Files changed: `package.json`, `package-lock.json`, `docs/STATUS_VERIFICATION.md`
- Evidence / command output: `npm audit --audit-level=high` passes; report still shows 2 moderate advisories.
- Remaining follow-up: monitor moderate advisory path and update when upstream dependency tree is patched.

## C-008

- Severity: high
- Files involved: `nginx.conf`, `middleware.ts`, `src/lib/cors.ts`
- Conflicting statements: single-project assumptions vs mixed multi-project paths/origins (`/combat`, `/bifa`, `/fifa`, `/fr-sieg`, wildcard duckdns origins).
- Current authoritative answer: deployment/cors is mixed and needs boundary documentation/hardening.
- Decision made: centralized CORS origin allowlist and removed broad wildcard origin logic; deployment path mix remains documented risk.
- Files changed: `src/config/corsOrigins.ts`, `src/config/__tests__/corsOrigins.test.ts`, `middleware.ts`, `src/lib/cors.ts`, audit docs.
- Evidence / command output: direct config inspection + `rg`.
- Remaining follow-up: split infra config or document explicit ownership boundaries per service in deployment docs.

## C-009

- Severity: medium
- Files involved: `docs/preproduction/20H_LOCALIZATION_DE_EN.md`, naming audit docs
- Conflicting statements: `BIFA: Scherbenhimmel` naming appears in active localization docs while naming policy prefers `H-Town Combat 67`.
- Current authoritative answer: H-Town Combat 67 naming should be primary unless historical context.
- Decision made: flag for focused localization naming cleanup in next pass.
- Files changed: inventory + traceability + final report.
- Evidence / command output: `rg -n "BIFA" docs/preproduction/20H_LOCALIZATION_DE_EN.md`.
- Remaining follow-up: rename relevant localization strings where player-facing.

## C-010

- Severity: medium
- Files involved: `index.html`, `prototype.html`
- Conflicting statements: root prototype files represented REDLINE football project identity.
- Current authoritative answer: these are unrelated legacy prototypes.
- Decision made: archive originals, leave stubs at old paths with pointers.
- Files changed: archived files + stubs + `docs/archive/README.md`.
- Evidence / command output: file inspection shows REDLINE football HUD/title.
- Remaining follow-up: confirm no deployment pipeline still references these files.

## C-011

- Severity: low
- Files involved: reported hypothesis `../../rendering/particles/ParticleSystem`
- Conflicting statements: possible missing import vs actual path presence.
- Current authoritative answer: import path exists and resolves in current sources/tests.
- Decision made: mark as verified-not-reproduced issue.
- Files changed: traceability + final report.
- Evidence / command output: `rg -n "../../rendering/particles/ParticleSystem|ParticleSystem" src tests`.
- Remaining follow-up: none unless regressions reappear.

## C-012

- Severity: medium
- Files involved: agent governance docs (`docs/README.md`, index, playbook, skill)
- Conflicting statements: mandatory stop/rule set was not synchronized in all required entry files.
- Current authoritative answer: unified Mandatory Agent Rules + Hard Prohibitions in all required locations.
- Decision made: synchronized rule block across mandatory files.
- Files changed: `docs/README.md`, `docs/preproduction/20H_DOCUMENTATION_INDEX.md`, `docs/preproduction/20H_AGENT_IMPLEMENTATION_PLAYBOOK.md`, `.chatgpt/skills/htown-combat-dev/SKILL.md`
- Evidence / command output: file inspection.
- Remaining follow-up: include regression check in future docs audits.
