# Documentation Completeness Audit

Audit date: 2026-04-25  
Branch: `docs/complete-game-function-spec`

## Result

The repository already had strong overview and content-bible material, but not enough implementation-grade documentation for exact player flows. The missing layer was a single source that answers questions like:

- What exact menu opens after extraction?
- What can the player choose there?
- Which rewards are banked, lost, converted, or delayed?
- What happens if the player leaves the extraction zone?
- What changes between single-player, co-op, and 2v2 extraction?
- What does the Deploy flow validate before launch?
- Which systems must define success, failure, cancel, locked, and persistence states?

That gap is now covered by `docs/COMPLETE_GAME_FUNCTION_SPEC.md`.

## Files checked

| File | Finding |
|---|---|
| `README.md` | Good project index and status page, but too high-level for exact behavior. |
| `MASTER_DOCUMENTATION.md` | Good consolidated handbook, but extraction and menu behavior are summarized rather than specified step-by-step. |
| `docs/GDD.md` | Useful core design overview, but only covers the loop at concept level. |
| `docs/Technical_Architecture.md` | Documents modules and quality gates, but still references older REDLINE/Ball-era architecture terms in places and is not a player-flow spec. |
| Story/content docs | Rich lore/mechanics source, but not a UI/implementation contract for every game function. |

## Added file

`docs/COMPLETE_GAME_FUNCTION_SPEC.md`

Coverage added:

- Documentation audit baseline.
- Non-negotiable design rules.
- Top-level screen map.
- Landing/boot behavior.
- Garage Hub tabs and invariants.
- Deploy flow: character, vehicle, modules, region, mission, bounty, launch confirmation.
- Match state machine.
- Drop intro.
- Controls and ability feedback.
- Wave combat.
- Level-up/run-upgrade choices.
- Loot pickup and persistence rules.
- Boss/elite event rules.
- Exact extraction behavior: spawn, entering zone, hold rules, success, failure.
- Run Summary tabs and required information.
- Shop, Tech-Lab, Roster, Codex behavior.
- Quest log, triggers, persistence, dialogue consequences.
- Single-player, free run, boss hunt, practice, co-op, and competitive 2v2 modes.
- Pause, abort, and disconnect behavior.
- Settings structure.
- Admin-only debug suite behavior.
- Content database requirements.
- Definition of Done for future features.
- Immediate follow-up documentation TODOs.

## Remaining documentation risks

These are not fully closed because they require either implementation screenshots, exact balancing data, or future Phase 4 decisions:

1. Per-character pages for all 14 playable characters still need exact passive, technique, ultimate, skill-tree nodes, unlock path, and tutorial details.
2. Region pages still need exact hazard lists, boss pools, loot bias, quest gates, and extraction modifiers.
3. Bounty catalog still needs exact contracts, rewards, and failure rules.
4. Status-effect catalog needs complete duration, stacking, cleanse/immunity, UI icon, and VFX data.
5. Multiplayer lobby/matchmaking still needs wireframes and final network-state decisions.
6. Screenshots/wireframes are still needed for Deploy, Extraction Hold, Run Summary, Shop, Tech-Lab, Quest Log, and Codex.

## Recommendation

Treat `docs/COMPLETE_GAME_FUNCTION_SPEC.md` as the implementation contract. Future code or content changes should update it when they change a player-facing behavior, reward rule, menu transition, mode rule, or persistence rule.
