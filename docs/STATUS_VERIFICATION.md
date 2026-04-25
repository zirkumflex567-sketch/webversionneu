# Status Verification

Last verified: 2026-04-25
Commit: e32350f + working tree

Status taxonomy:

- `Authored` = documented/design exists
- `Seeded` = data/schema/seed exists
- `Implemented` = code path exists
- `Integrated` = reachable in real player flow
- `Tested` = verified by named test/manual check
- `Build-verified` = production build passed
- `Shipped` = deployed/released
- `Planned` = not implemented yet
- `Blocked` = cannot proceed until blocker is resolved
- `Deprecated` = retained for historical reference
- `Archived` = moved out of active docs

## Command Snapshot (2026-04-25)

| Command | Result | Notes |
|---|---|---|
| `git status --short` | pass | repo modified by audit/cleanup changes |
| `npm ci` | pass with warnings | install complete; deprecation warnings; 2 moderate advisories reported |
| `npm test` | pass | 32 files, 333 tests passed |
| `npm run build` | pass with warnings | build + type check pass; lint warnings only |
| `npm run lint` | pass with warnings | no lint errors, Next-specific warnings remain (`img`, font, plugin-detection notice) |
| `npm run test:viewport` | pass | auto-start local server; 6/6 viewports pass |
| `npm run test:fps` | pass with caveat | auto-start local server; passive auth/idle profile because `__GAME_STORE__` not available in auth-first flow |
| `npm audit --audit-level=high` | pass | no high/critical vulnerabilities; 2 moderate remain (postcss via Next dependency tree) |

## Area Status Matrix

| Area | Authored | Seeded | Implemented | Integrated | Tested | Build-verified | Shipped | Evidence |
|------|----------|--------|-------------|------------|--------|----------------|---------|----------|
| Documentation hierarchy and agent governance | Yes | n/a | Yes | Yes | Yes | n/a | No | `docs/README.md`, `docs/SOURCE_OF_TRUTH.md`, synchronized rule blocks |
| Campaign area model (Hub->Quest->Area Instance->Extraction->Hub) | Yes | Yes | Yes | Yes | Partial | n/a | No | preproduction contracts + architecture docs + code path inspection |
| Character roster and trait systems | Yes | Yes | Yes | Partial | Yes | n/a | No | unit tests pass; integration coverage still partial |
| Bounty and skill tree systems | Yes | Yes | Yes | Partial | Partial | n/a | No | components/tests exist; no full run-through automation |
| Rendering and particle stack | Yes | n/a | Yes | Yes | Yes | n/a | No | build/test now pass after type and particle fixes |
| Auth/API URL behavior | Yes | n/a | Yes | Yes | Yes | n/a | No | local default `/api` aligned in code/tests |
| Build pipeline | Yes | n/a | Yes | Yes | Yes | Yes | No | build succeeds with lint/type checks active |
| Lint quality gate | Yes | n/a | Yes | Yes | Yes | n/a | No | `npm run lint` exits 0 (warnings only) |
| Security dependency posture | Yes | n/a | Yes | Yes | Partial | n/a | No | `npm audit --audit-level=high` passes; moderate issues remain |
| Deployment / CORS boundary safety | Yes | n/a | Yes | Partial | Partial | n/a | No | centralized CORS allowlist + tests; deployment multi-project risk still open |

## Policy Notes

- `Complete`, `production-ready`, `tests pass`, `green build`, and `CI clean` are invalid unless this file has matching evidence for the current commit/date.
- Open critical security issues or failing required checks block any `Shipped`/`production-ready` status claim.
