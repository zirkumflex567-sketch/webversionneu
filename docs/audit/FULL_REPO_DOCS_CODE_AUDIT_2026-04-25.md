# Full Repo Docs + Code Audit

Date: 2026-04-25
Commit baseline: `e32350f`

## Executive Summary

- Overall readiness for AI agents: improved significantly through a single entrypoint, source-of-truth hierarchy, synchronized mandatory rules, and explicit conflict/status registries.
- Top blockers:
  - deployment ownership ambiguity in `nginx.conf` (multi-project routing in one config)
  - active project identity drift (`REDLINE FC` naming still present in runtime/UI content)
  - performance profile currently runs in passive auth/idle mode in default local flow (`__GAME_STORE__` not available from auth-first route)
- Top contradictions resolved:
  - competing authoritative docs (README/MASTER/ROADMAP) replaced by explicit hierarchy
  - unsupported status claims removed from summary docs
  - REDLINE football prototype files archived from root
- Remaining risks:
  - mixed multi-project deployment config in `nginx.conf`
  - moderate dependency advisories remain (`npm audit`), though no high/critical findings
  - legacy naming remnants (`BIFA`/`REDLINE`) in active docs/runtime text

## Scope Checked

- Docs: root docs, `docs/**`, `docs/preproduction/**`, archive policy
- Code: selected runtime/config paths under `src/**`, `app/**`, root configs
- Tests: `npm test`, viewport/fps scripts, lint/build
- Config: Next/Vite/Tailwind/middleware/nginx/package
- Deployment/security: npm audit, base paths, CORS, mixed routing paths
- Skills: `.chatgpt/skills/htown-combat-dev/**`
- Legacy/archive: story + root prototype + legacy docs

## Commands Run

| Command | Result | Notes |
|---------|--------|-------|
| `git status --short` | pass | baseline clean before edits; modified after audit changes |
| `npm ci` | pass with warnings | install succeeded; deprecation warnings; 2 moderate advisories |
| `npm test` | pass | 32 files, 333 tests passed |
| `npm run build` | pass with warnings | type/lint gates active; build successful |
| `npm run lint` | pass with warnings | warning-only (`img`/font and Next plugin-detection notice) |
| `npm run test:viewport` | pass | local server auto-start, 6/6 viewports pass |
| `npm run test:fps` | pass with caveat | runs and writes report; passive auth/idle profile in current local flow |
| `npm audit --audit-level=high` | pass | no high/critical advisories; 2 moderate remain |

## Source-of-Truth Decision

Active hierarchy is now centralized in `docs/SOURCE_OF_TRUTH.md`.

- Active hierarchy entrypoint: `docs/README.md`
- Authoritative preproduction routing: `docs/preproduction/20H_DOCUMENTATION_INDEX.md`
- Status evidence authority: `docs/STATUS_VERIFICATION.md`
- Non-authoritative summaries:
  - `README.md` (summary)
  - `MASTER_DOCUMENTATION.md` (non-authoritative overview)
  - `ROADMAP_DETAILED.md` (planning tracker)

## Conflicts Found and Resolved

See: `docs/audit/DOC_CONFLICT_REGISTER.md`

## Code-vs-Docs Gaps

See: `docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md`

## Archived Files

See: `docs/archive/README.md`

## Remaining Required Actions

### P0 blocker

- None in current verification snapshot.

### P1 high

- Clarify/split multiproject `nginx.conf` ownership (`/combat`, `/bifa`, `/fifa`, `/fr-sieg`, wedding routes).
- Resolve active `REDLINE FC` runtime branding/content where H-Town/Scherbenhimmel should be canonical.

### P2 medium

- Remove or contextualize active `BIFA` naming in localization docs if player-facing.
- Improve `test:fps` to drive authenticated/ingame flow (not only passive auth screen profile).
- Sweep residual `src/app` wording in documentation where stale.

### P3 cleanup

- Add lightweight docs checks (`docs:links`, `docs:rules`, `docs:status`) when aligned with project style.
- Extend traceability with explicit e2e extraction/reward test evidence.

## Agent Readiness Score

**88 / 100**

Rationale:

- + Strong governance improvements: clear entrypoint, SoT hierarchy, conflict register, status verification, archival trace.
- + Mandatory agent rules synchronized across required files.
- - Deployment ownership and product identity cleanup still incomplete.
- - Performance evidence is available but not yet full in-game under default auth gate.

## Final Recommendation

Can future agents safely work from this repo?

**Yes, with listed warnings.**

Safe for implementation planning and guarded development, but agents must still treat deployment-boundary and naming-governance items as unresolved and must follow `docs/STATUS_VERIFICATION.md` before claiming completion.

## Definition of Done Check

1. `docs/README.md` exists and is agent entry point: **Done**
2. `docs/SOURCE_OF_TRUTH.md` exists: **Done**
3. `docs/STATUS_VERIFICATION.md` exists: **Done**
4. `docs/audit/DOC_INVENTORY.md` exists: **Done**
5. `docs/audit/DOC_CONFLICT_REGISTER.md` exists: **Done**
6. `docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md` exists: **Done**
7. `docs/audit/FULL_REPO_DOCS_CODE_AUDIT_2026-04-25.md` exists: **Done**
8. Old/unused/conflicting docs archived or marked non-authoritative: **Done (core set)**
9. README/Master/Roadmap no longer competing truths: **Done**
10. Test/build/security claims evidence-backed or removed: **Done**
11. Hub->Quest->Area Instance->Extraction->Hub rule consistent in core governance docs: **Done**
12. Localization rules consistent in governance docs: **Done**
13. Agent stop-conditions consistent in core governance docs: **Done**
14. Root/prototype/deployment files checked for unrelated remnants: **Done**
15. Changes traceable in final report: **Done**
