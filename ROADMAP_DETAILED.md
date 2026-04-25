# ROADMAP_DETAILED (Planning Tracker, Non-Authoritative)

This document is a planning tracker and historical roadmap context.
It is not the implementation source of truth.

## Authority Boundary

For implementation truth, use `docs/SOURCE_OF_TRUTH.md`.
For current verified status, use `docs/STATUS_VERIFICATION.md`.

## Status Taxonomy

Roadmap status should use:

- `Authored`
- `Seeded`
- `Implemented`
- `Integrated`
- `Tested`
- `Build-verified`
- `Shipped`
- `Planned`
- `Blocked`
- `Deprecated`
- `Archived`

Terms like `complete`, `production-ready`, `tests pass`, `green`, or `CI clean` are invalid unless explicitly evidenced in `docs/STATUS_VERIFICATION.md`.

## Mandatory Project Constraints

- Campaign model: `Hub -> Quest -> Area Instance -> Extraction -> Hub`
- No seamless open-world model for first 20h
- No player-facing hardcoded strings; DE/EN localization keys required
- No client-authoritative rewards/loot/extraction/progression for competitive flow
