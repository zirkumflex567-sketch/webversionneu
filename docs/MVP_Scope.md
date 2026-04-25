# H-Town Combat 67 — MVP Scope

**Stack:** TypeScript + Next.js 15 + React 19 + Three.js 0.183 + Zustand + Vitest + Playwright
**Status (2026-04-22):** Phase 1 complete, Phase 2 sprint complete. See [ROADMAP.md](ROADMAP.md), [ROADMAP_NEXT.md](ROADMAP_NEXT.md), [PHASE_1_STATUS.md](PHASE_1_STATUS.md).

> Historical note: previous revisions of this file described a Unity-era "REDLINE FC" arcade-football MVP. That direction was retired — see [adr/0001-move-from-unity-to-web-stack.md](adr/0001-move-from-unity-to-web-stack.md). Legacy text is archived in git history.

## 1. Product Definition
An extraction-style arena combat loop: pilot a vehicle through escalating enemy hordes, bank Scrap and Tech by surviving waves or reaching the Extraction Zone. Single-player, browser-native, local persistence.

## 2. Included in MVP

### Platform
- Browser (desktop-first, mobile-aware)
- Single-player
- Local save (`localStorage`, key `bifa.save.v1`)

### Core loop
- Hub (Garage) → loadout (character / vehicle / weapon / bounty) → Arena run → Extraction or death → banked rewards → meta-upgrades
- Wave-based Horde Director with heavy units, bosses every 10 waves, hazards
- Extraction Zone spawns after N waves at random angle / radius
- Scrap feeds in-run level-ups (3-choice upgrade picker); Tech feeds permanent skill-tree ranks

### Combat systems
- Vehicle movement, sprint, facing, arena bounds
- Nitro Dash (2 charges, 8 s cooldown)
- Per-pilot active abilities:
  - Rixa — Alchemical Trail (AoE + ToxicZone DoT)
  - Marek — Magnetic Pulse (stun + push) + Drohnen-Wacht (deployable Sentry)
- Weapons (autocannon baseline), projectiles, crits, lifesteal
- Enemy archetypes: Standard, Heavy (200 HP), Boss (Golem/Bruiser alternating)
- Environmental hazards: Minefield (6 per arena), ToxicZone

### Meta systems
- Save system (Zod schema in [SaveSchema.ts](../src/save/SaveSchema.ts))
- Shop / Acquisitions (vehicles & weapons)
- Tech-Lab: branching skill tree per character with Synergy bonuses on completed tiers
- Bounty system: pre-run contracts that mutate scrap/tech/damage multipliers

### UI / Feel
- Wasteland-celshading visual identity (Nano Banan2 asset set, `style.css` utility classes)
- HUD: Hull/Shield bars, Nitro charges, ability tracker, enemy telemetry markers, callouts
- Overlays: Hub, Upgrade picker, Run summary, Game over, Settings

### Technical delivery
- Next.js App Router (`app/`), game engine modules (`src/game/`)
- Zustand store (`src/store.ts`) as single source of truth
- Vitest unit tests (pure logic) — 25 tests currently
- Playwright headless viewport/perf audit (`tmp/roadmap_viewport_perf_audit/`)

## 3. Strictly Excluded from MVP
- Online multiplayer / matchmaking / leaderboards (Phase 4)
- Additional arenas
- Replay system
- Account / cloud save
- Cross-device touch controls beyond keyboard fallback
- Full 3D positional audio (SFX.ts is procedural only)
- Custom cel-shading shader pipeline (visual identity is CSS + assets, not `ShaderMaterial`)

## 4. Scope Control Rules
- One playable character family at a time (Rixa + Marek for Phase 2)
- One arena
- One HUD style
- No progression systems beyond Shop + Tech-Lab
- No networking code in the runtime path

## 5. Success Criteria
MVP is successful if:
- A fresh run boots into the Hub in under 5 s on a mid-range laptop
- A run from Hub → Extraction completes without console errors
- Banked Scrap/Tech survives a reload (save round-trip)
- Unit-test suite (`npm run test`) passes cleanly
- Headless Playwright viewport audit produces stable telemetry across desktop / tablet / mobile breakpoints

## 6. Post-MVP Roadmap
See [ROADMAP.md](ROADMAP.md):
- Phase 3: Cel-shading shader pipeline, GPU particle pools, 3D positional audio
- Phase 4: WebSocket sync, 2v2 matchmaking, leaderboards, mobile touch controls

## 7. Known Gaps (tracked in [KNOWN_ISSUES.md](../KNOWN_ISSUES.md))
- Mobile layout validation on real hardware (Firefox/Safari/Edge + physical devices)
- In-match FPS profiling under heavy load
- Game-loop / store integration test coverage
