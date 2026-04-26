# H-Town Combat: Phase 2 Roadmap

**Current State**: Phase 1 (Core Prototype) Complete. UI Overhaul (Visual Identity) Integrated.
**Last Updated**: 2026-04-19

## Phase 2: Combat Depth & Progression (Sprinting)

### [P0] Active Ability Expansion
- **Objective**: Implement unique activated abilities for all pilot/vehicle combinations.
- **Tasks**:
    - [x] Nitro Dash — Shift key, 2 charges, 8 s cooldown, HUD bar.
    - [x] Alchemical Trail (Rixa) — AoE blast + lingering ToxicZone ground hazard.
    - [x] Magnetic Pulse (Marek) — stuns & pushes nearby enemies in 15-unit radius.
    - [x] Deployable Sentry (Drohnen-Wacht) — 15 s turret, fires Projectiles, self-destructs.
- **Goal**: Give the player tactical agency during combat spikes. ✅ **DONE**

### [P1] Tech-Lab Progression System
- **Objective**: Fully wire the Tech-Lab UI to the SaveManager and Game Logic.
- **Tasks**:
    - [x] Implement permanent stat bonuses from Tech-Lab purchases (`computeSkillStats`).
    - [x] Validate character-specific skill branches (Chaos vs. Lifesteal, etc.) — CharacterData.test.ts.
    - [x] Add "Synergy" bonuses when completing a node tier (`computeSynergyBonuses`).

### [P1] Horde Director 2.0
- **Objective**: More varied and challenging enemy waves.
- **Tasks**:
    - [x] Implement "Heavy" units (HeavyEnemy — 200 HP, orange blocky, high scrap value).
    - [x] Implement Boss Spawns every 10 waves (Golem / Bruiser alternating).
    - [x] Add environmental hazards: Minefield (6 mines per arena) + ToxicZone (Rixa ability).
    - [x] Data-driven `heavyRatio` in WaveConfig with extrapolation and cap at 0.5.

### [P2] Extraction & Rewards
- **Objective**: Formalize the "Extraction" loop.
- **Tasks**:
    - [x] Add Extraction Point spawning after surviving X waves (ExtractionZone).
    - [x] Randomise extraction zone position per-run (radius 25–35, random angle).
    - [x] Banked Scrap bonus for extraction: +30 scrap × wave survived; death keeps 50% scrap, 0 tech.

## Testing
- [x] Vitest set up (`npm run test`).
- [x] WaveConfig unit tests (5 tests — extrapolation, caps, intervals).
- [x] CharacterData unit tests (12 tests — skill stats accumulation, synergy bonuses).
- [x] SaveManager unit tests (8 tests — banking math, extraction bonus, level-up while-loop).
- [ ] Game-loop smoke test (entity counts after N updates) — requires Three.js DOM, deferred.

## Documentation Maintenance
- [x] Full purge of legacy football documentation from KNOWN_ISSUES.md.
- [x] Update `PHASE_1_STATUS.md` with Phase 2 progress section.
- [x] Finalise `KNOWN_ISSUES.md` based on current H-Town Combat state.
