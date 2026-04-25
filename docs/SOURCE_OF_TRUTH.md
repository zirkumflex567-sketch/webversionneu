# Source of Truth Hierarchy

Last updated: 2026-04-25

This file defines which documents are authoritative when statements conflict.

## Active Hierarchy (highest to lowest)

1. `.chatgpt/skills/htown-combat-dev/SKILL.md`
2. `docs/README.md`
3. `docs/preproduction/20H_DOCUMENTATION_INDEX.md`
4. `docs/COMPLETE_GAME_FUNCTION_SPEC.md`
5. `docs/Technical_Architecture.md`
6. `docs/preproduction/20H_SYSTEMS_AND_DATA_CONTRACTS.md`
7. Feature-specific `docs/preproduction/*` owner docs
8. `README.md` (repo summary only)
9. `ROADMAP_DETAILED.md` (planning/status tracker only)
10. `MASTER_DOCUMENTATION.md` (non-authoritative overview; may be stale)
11. `story/*` legacy content only when compatible with active contracts
12. `docs/archive/**` historical only; never authoritative

## Conflict Resolution Rule

If two files conflict:

1. Use the higher-ranked file.
2. Record the conflict in `docs/audit/DOC_CONFLICT_REGISTER.md`.
3. Update lower-ranked files or archive them.
4. Do not continue implementation until conflict is resolved.

## Notes on Summary Documents

- `README.md` is a convenience overview and onboarding summary.
- `MASTER_DOCUMENTATION.md` and `ROADMAP_DETAILED.md` are retained for context and planning history; they do not override owner contracts.
