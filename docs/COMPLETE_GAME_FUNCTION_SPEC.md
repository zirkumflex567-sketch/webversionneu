# H-Town Combat 67 — Complete Game Function Specification

This is the implementation-grade reference for all player-facing game functions, menus, modes, story hooks, reward states, failure states, and documentation expectations. It is intentionally explicit so design, code, art, QA, and agentic implementation can work without guessing.

## 0. Current Documentation Audit

Checked from the repository on `main` before this branch:

| Area | Existing source | Status | Action in this spec |
|---|---|---:|---|
| Project overview | `README.md`, `docs/archive/2026-04-26/docs-cleanup/MASTER_DOCUMENTATION.md` | Present | Keep as index / overview. |
| Core loop | `docs/archive/2026-04-26/docs-cleanup/MASTER_DOCUMENTATION.md`, `docs/GDD.md` | Present but too brief | Define exact run states, extraction, reward banking. |
| Menus | scattered README / Garage descriptions | Incomplete | Define every required screen and transitions. |
| Extraction | overview only | Incomplete | Define trigger, zone behavior, hold rules, success/failure, multiplayer contesting. |
| Shop / Tech-Lab | overview only | Incomplete | Define cards, validation, purchase/unlock outcomes. |
| Story / quests | story docs exist | Needs implementation contract | Define quest log, triggers, persistence rules. |
| Multiplayer | roadmap-level only | Incomplete | Define lobby, co-op, 2v2, extraction ownership, disconnect handling. |
| Debug / QA | not central in existing docs | Missing as game function | Define admin-only debug run flow. |

## 1. Non-Negotiable Design Rules

1. **Extraction is the core risk.** Scrap is partially retained on defeat; Relic Tech and extracted items are only banked on successful extraction unless an item explicitly says otherwise.
2. **Every menu choice must show consequence before commit.** Cost, requirement, reward, lock reason, refund/respec state, and extraction dependency must be visible.
3. **Permanent and temporary progression must never be confused.** Garage/Tech-Lab changes are permanent. Run upgrades are temporary. Run loot becomes permanent only after extraction.
4. **Story state must be visible.** Quest progress, NPC recruitment, region unlocks, codex unlocks, and dialogue unlocks must appear in Run Summary and Quest Log.
5. **Multiplayer ownership must be obvious.** UI must distinguish personal loot, squad loot, team extraction, contested extraction, teammate revive state, and disconnect forfeits.

## 2. Top-Level Screen Map

### 2.1 Landing / Boot

Opened when the player visits the app or after a hard reload.

Required options:
- **Continue**: loads current save and opens Garage Dashboard.
- **New Campaign**: creates/reset save after confirmation.
- **Settings**: audio, video, controls, accessibility, account, debug.
- **Version / Credits**: build version, changelog, credits.

Rules:
- If no save exists, primary CTA is **Start New Campaign**.
- If a save exists, primary CTA is **Continue** and shows chapter, region, scrap, tech, last character.
- If save load fails, show modal: Retry, Export Broken Save, Reset Save.

### 2.2 Garage Hub

Opened after Continue, after extraction/defeat, or when aborting pre-run setup.

Tabs:
- **Dashboard**: profile, current chapter, active quests, currencies, recommended next action, last run result.
- **Deploy**: character, vehicle, loadout, region, difficulty, bounty, launch.
- **Shop**: vehicles, weapons, modules, bounties, cosmetics, housing/flavor if enabled.
- **Tech-Lab**: permanent skill-tree upgrades using extracted Tech.
- **Roster**: playable characters, roles, unlock states, companion quest status.
- **Codex**: lore, regions, enemies, bosses, status effects, loot, tutorials.
- **Settings**: audio/video/controls/accessibility/account/debug.

Invariant: leaving a tab must not silently discard a pending purchase, skill unlock, or loadout change. Either auto-save immediately or show Save / Discard.

## 3. Deploy Flow

### 3.1 Deploy Screen

Required panels:
1. Character slot.
2. Vehicle slot.
3. Weapon/module loadout.
4. Region / mission.
5. Difficulty / threat.
6. Optional bounty.
7. Reward preview.
8. Launch button.

Validation:
- Launch disabled until all required slots are valid.
- Locked items show exact unlock path.
- Reward preview must state what is retained on extraction and what is lost on defeat.

### 3.2 Character Selection

Each character card shows: name, role, vehicle affinity, weapon affinity, passive, technique, ultimate, skill tree investment, difficulty, story/recruitment state.

On selection:
1. Character becomes active deploy character.
2. Recommended vehicle/module presets update.
3. Companion quest panel refreshes.
4. If a tutorial is unfinished, offer Practice / Skip / Launch anyway.

### 3.3 Vehicle and Loadout Selection

Each vehicle shows speed, handling, armor, boost profile, vehicle ability, module slots, affinity bonuses, cosmetic skin.

Module slots: Chassis, Core, Front Weapon, Side Weapon, Utility, Mobility, Armor.

Rules:
- Invalid modules show reason and suggested alternatives.
- Stat deltas are visible before confirmation.
- Default ownership rule: account-owned modules can be reused across presets unless a future system states otherwise.

### 3.4 Region / Mission Selection

Each region card shows biome hazards, enemy families, boss pool, story/side/free-run label, loot bias, recommended power, extraction difficulty.

Mission types:
- **Story Run**: advances main quest if objectives are met.
- **Free Extraction**: standard loot run.
- **Bounty Run**: free run with a contract modifier.
- **Boss Hunt**: faster boss escalation, higher Tech risk/reward.
- **Practice Run**: no permanent rewards or losses.

### 3.5 Bounty Selection

Each bounty shows title, modifier, objective, failure condition, reward, whether reward requires extraction.

Default rules:
- 0–1 active bounty per run unless upgraded later.
- Bounty rewards pay only after extraction unless explicitly marked immediate.
- If completed but player dies before extraction, Tech/item rewards are lost; lore discovery may remain if marked persistent.

### 3.6 Launch Confirmation

Final modal shows character, vehicle, modules, region, threat, bounty, and risk statement: **On defeat: keep 50% Scrap, lose 100% unextracted Relic Tech.**

On Start:
1. Save loadout.
2. Create run seed.
3. Create run state: empty run inventory, empty temporary upgrades, quest snapshot.
4. Load match scene.

## 4. Match Flow

### 4.1 Required State Machine

1. **Loading**: assets and run state prepared.
2. **Drop Intro**: region banner, objective, short input lock.
3. **Wave Combat**: waves 1–4 with escalating spawn pressure.
4. **Boss / Elite Event**: boss or elite horde objective.
5. **Extraction Spawned**: extraction zone appears.
6. **Extraction Hold**: zone countdown.
7. **Run Complete**: rewards banked.
8. **Run Failed**: partial rewards and losses applied.
9. **Abort / Disconnect Resolution**: manual quit or network-loss handling.

### 4.2 Drop Intro

Shows region, mission objective, bounty objective, extraction rule reminder, character/story bark. Skip button advances to combat. Accessibility setting may disable intros.

### 4.3 Controls and Ability Feedback

Default bindings:
- WASD / left stick: drive.
- Mouse / right stick: aim if manual aim is active.
- Shift / bumper: Nitro Dash.
- Q / face button: Technique.
- E / face button: Utility / interact.
- R / ultimate button: Ultimate.
- Esc / Start: Pause.

Every cooldown must show icon, timer, ready state, charge count, and failure reason: cooldown, no charge, stunned, silenced, invalid target.

### 4.4 Waves

Wave start shows wave number, enemy family, new hazard warning, and spawn telegraphs.

During wave:
- Enemies use roles: chase, flank, ranged fire, ram, trap, support.
- Scrap and Tech are collected via pickup radius unless upgraded.
- XP comes from pickups by default, not kills, unless an upgrade changes this.

Wave complete:
- Next wave begins after short breathing window.
- Drops remain collectible during the window.

### 4.5 Level-Up / Run Upgrade Menu

Opened when run XP threshold is reached.

Single-player: pause or strong slow-motion. Competitive multiplayer: no global pause; player chooses through personal overlay.

Three choices show name, rarity, effect, tags, synergy highlights, current stack count, max stack.

On choice: apply temporary upgrade, close menu, announce in HUD feed, resume combat.

Rerolls only exist if player has a reroll resource/perk. Cost and remaining rerolls must be visible.

### 4.6 Loot Pickup Rules

Scrap:
- Common, frequent.
- Counts toward run XP and post-run currency.
- On defeat, 50% banked by default.

Relic Tech:
- Rare, from elites, bosses, bounty events, hidden objectives.
- Banked only on successful extraction.
- On defeat, 100% unextracted Tech lost by default.

Items/modules/blueprints:
- “Recovered on Extract” items become owned only after extraction.
- “Discovered” lore/codex entries may persist immediately if marked so.
- Duplicates convert after extraction unless stated otherwise.

### 4.7 Boss / Elite Event

Default spawn: after Wave 4 objective. Boss Hunt can spawn earlier. Story missions can replace boss with scripted elite event.

Boss intro shows nameplate, region title, phase count if known, and a one-line mechanic hint.

On boss defeat:
1. Drop boss rewards.
2. Trigger `boss_kill` quest/bounty events.
3. Spawn extraction zone.
4. Play extraction callout.

## 5. Extraction — Exact Behavior

### 5.1 Extraction Appears

Trigger: boss/elite objective complete.

Player sees extraction beacon, HUD objective **Reach Extraction Zone**, direction arrow/minimap ping, optional deadline, warning that enemy pressure increases.

World behavior: existing enemies may remain, new enemies spawn more aggressively, high-value drops remain collectible until extraction completes or run fails.

### 5.2 Entering the Zone

When player enters:
- HUD changes to **Hold Extraction**.
- Default countdown starts at 30 seconds.
- Zone boundary brightens.
- Audio changes to extraction tension cue.

If player leaves:
- Countdown pauses for 3 seconds, then slowly decays by default.
- HUD says **Return to zone**.
- Multiplayer shows each teammate’s in-zone state.

### 5.3 Hold Rules

Single-player:
- Player must remain in zone until countdown reaches zero.
- Brief exits are allowed via grace period.
- Death during hold fails run unless revive system is active.

Co-op campaign:
- Recommended default: all non-downed players must be inside for final 5 seconds.
- Downed teammate can be extracted if inside zone when countdown ends.

Competitive 2v2:
- Each team has extraction eligibility after objective completion.
- Enemy team contests by entering zone.
- Contest pauses countdown and UI shows **Contested**.

### 5.4 Successful Extraction

Sequence:
1. Countdown reaches zero.
2. Input locks.
3. Extraction animation/convoy/beam plays.
4. Run state seals.
5. Rewards calculate.
6. Run Summary opens.

Banked:
- 100% collected Scrap.
- 100% collected Relic Tech.
- Extracted modules, weapons, blueprints, cosmetics.
- Completed bounty rewards.
- Quest rewards.
- NPC bond changes and region unlocks.

Post-extraction buttons: Continue to Garage, Retry Region, Share/Export Run, Report Bug if debug enabled.

### 5.5 Defeat / Failed Extraction

Failure triggers:
- HP zero with no revive.
- Team wipe.
- Extraction deadline expires.
- Manual abandon after confirmation.
- Disconnect resolution forfeits run.

Retained by default:
- 50% collected Scrap.
- 0% unextracted Relic Tech.
- No extracted items/modules/blueprints unless insured or marked discovered.
- Lore discoveries can remain if their story flag is persistent.

Buttons: Return to Garage, Retry with same loadout, Open Tech-Lab if relevant, Open Debug Report if debug mode active.

## 6. Run Summary

Tabs:

### Rewards
Shows scrap collected, penalties/bonuses, banked amount, Tech extracted/lost, items found/extracted/lost/converted, bounty rewards, quest rewards, unlocks.

### Build
Shows character, vehicle, starting modules, run upgrades chosen in order, final stats, damage sources, damage taken, healing, shields, revives.

### Quest Progress
Shows main quest, side quest, companion quest, NPC recruitment/bond, region flags, dialogue/codex unlocks.

### Stats
Shows duration, waves cleared, boss killed, enemy kills by type, scrap/minute, Tech risked, extraction hold time, multiplayer assists/revives/contest time.

## 7. Garage Systems

### 7.1 Shop

Categories: vehicles, weapons, modules, bounty licenses, cosmetics, housing/flavor.

Purchase card shows item name, category, rarity, cost, prerequisites, effect, compatibility, owned/locked/affordable state.

On purchase: confirm if significant, deduct currency, add inventory item, success toast, optional Equip Now.

### 7.2 Tech-Lab

Spend extracted Relic Tech on permanent character nodes.

Skill tree UI shows character selector, branches, nodes, costs, prerequisites, current/next effect, synergy/row bonuses.

On unlock: validate currency and prerequisites, confirm if expensive, deduct Tech, save node, refresh stats/deploy preview.

Respec: if present, show cost/refund. If absent, UI states **Permanent choice**.

### 7.3 Roster

Each profile shows role, difficulty, affinities, passive, technique, ultimate, skill-tree progression, recruitment state, companion quest, unlock requirement.

### 7.4 Codex

Sections: lore, regions, characters/NPCs, enemies, bosses, status effects, loot/modules, tutorials.

Unknown entries show silhouette/name hint only when discovered. Spoiler-sensitive entries remain hidden until quest flag unlocks them.

## 8. Story and Quest Functionality

### 8.1 Quest Log

Each quest shows ID, title, type, current objective, region, required character/NPC, reward, extraction dependency, completion status.

Quest types: Main, Companion, Side, Bounty, Tutorial.

### 8.2 Trigger Types

Supported triggers:
- `run_start`
- `wave_start`
- `wave_complete`
- `pickup`
- `level_up`
- `npc_talk`
- `boss_kill`
- `extract`
- `defeat`
- `region_unlock`
- `codex_unlock`

Every quest must define whether trigger progress persists immediately or only after extraction.

### 8.3 Dialogue

Dialogue can open from Garage NPCs, Quest Log, run intro/outro, boss events, and codex replay.

Dialogue UI shows speaker, portrait, line, continue/choice buttons, skip, log, and whether a choice has gameplay consequences.

Choice consequence examples: accept quest, recruit NPC, unlock region, change bond, grant codex entry, start run modifier.

## 9. Modes

### 9.1 Single-Player Campaign: Scherbenhimmel

Purpose: 20-hour story progression through chapters, regions, NPCs, and unlocks.

Run completion can advance main quest only if required objectives and extraction rules are satisfied.

### 9.2 Free Run

Purpose: repeatable loot and build experimentation. No main quest blocking, but side/bounty/codex progress may occur.

### 9.3 Boss Hunt

Purpose: shorter, higher-stakes run focused on boss mechanics and rare Tech.

### 9.4 Practice / Tutorial

Purpose: learn character, vehicle, boss, extraction, or controls. No permanent reward/loss. Can still unlock tutorial codex entries.

### 9.5 Co-op PvE

Purpose: shared extraction campaign/free run. Rewards may be personal pickups plus shared objective rewards. Revive and extraction rules must be visible before launch.

### 9.6 Competitive 2v2 PvPvE

Purpose: two teams fight PvE pressure and each other around loot and extraction.

Required systems:
- Lobby / matchmaking.
- Team assignment.
- Shared map objective.
- Personal/squad loot distinction.
- Extraction contesting.
- Disconnect/AFK resolution.
- Post-match team and personal stats.

## 10. Pause, Abort, Disconnect

Pause menu options: Resume, Controls, Settings, Abandon Run, Report Bug if debug enabled, Return to Garage if safe.

Abandon confirmation must state exact reward loss. Default: abandon equals defeat.

Disconnect:
- Single-player: auto-pause and attempt local recovery.
- Co-op/competitive: reconnect window; after timeout, player becomes disconnected/forfeited according to mode.

## 11. Settings

Categories:
- Audio: master, music, SFX, UI, voice.
- Video: quality, resolution scaling, outlines, particles, screen shake, damage numbers.
- Controls: keybinds, gamepad, sensitivity, invert aim.
- Accessibility: colorblind modes, subtitle size, flash reduction, hold/toggle options, intro skip.
- Account/save: export/import save, reset save.
- Debug: visible only to allowed admin users.

## 12. Admin Debug Suite

Access rule: debug tools are only visible to the authorized admin account, currently intended as `kevin@sieg.me`.

Required debug run flow:
1. Start Debug Run from Settings or debug overlay.
2. Timer starts and records run seed, route, browser, build version, FPS samples, errors, key state changes.
3. Screenshot button captures current viewport timestamped into the log.
4. Note field allows manual observations tied to timestamp.
5. Stop Debug Run seals report.
6. Report is saved server-side where available and offered as download.

Report should include: metadata, timeline, screenshots, notes, console errors, performance stats, current save snapshot or redacted summary, run summary, reproduction steps if supplied.

## 13. Content Database Requirements

Every content entry must have:
- Stable ID.
- Display name.
- Type/category.
- Short description.
- Full mechanics description.
- Unlock condition.
- Rarity/tier if applicable.
- Affected stats.
- Compatible characters/vehicles/modules.
- Tags for synergy search.
- Source: shop, drop, quest, boss, codex, debug/test.

Applies to characters, vehicles, weapons, modules, run upgrades, skill nodes, loot, enemies, bosses, status effects, quests, NPCs, bounties, cosmetics.

## 14. Definition of Done for Future Game Features

A feature is not complete until all are true:
1. Player-facing behavior is documented here or in a linked spec.
2. Screen entry and exit states are defined.
3. Success, failure, cancel, locked, and error states are defined.
4. Rewards/costs and persistence rules are defined.
5. Quest/story interactions are defined if relevant.
6. Multiplayer behavior is defined or explicitly marked not applicable.
7. Debug/telemetry expectations are defined if relevant.
8. Tests or manual QA checklist exist for critical paths.

## 15. Immediate Documentation TODOs

These should be closed in follow-up passes as implementation matures:

- Add a per-character page for all 14 playable characters with exact passive, technique, ultimate, skill-tree nodes, unlock path, and tutorial.
- Add exact region pages with hazards, boss pools, loot bias, quest gates, extraction modifiers.
- Add exact bounty list with rewards and failure rules.
- Add complete status-effect table with duration, stacking, cleanse/immunity, UI icon, VFX cue.
- Add multiplayer lobby and matchmaking wireframes once Phase 4 work begins.
- Add screenshots/wireframes for Deploy, Extraction Hold, Run Summary, Shop, Tech-Lab, Quest Log, Codex.

---

Last updated: 2026-04-25 on `main`.
