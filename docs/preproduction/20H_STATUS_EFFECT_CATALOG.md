# Scherbenhimmel 20h — Status Effect Catalog

Scope: status effects, marks, world-state debuffs, buffs, and extraction-specific states used during the first 20 hours. This file is a design/data contract for UI, combat logic, content, QA, VFX, SFX, and tutorial text.

## Global Status Rules

- Every status effect must have an icon, tooltip, duration, stack behavior, source list, cleanse behavior, VFX cue, SFX cue, and Run Summary stat attribution.
- Bosses can have reduced duration or altered effect but must never silently ignore a status. Tooltip should show `Boss: reduced` or `Boss: converted`.
- Statuses are divided into: Combat, Control, Utility, Narrative/Quest, Extraction, and Hazard.
- If a status changes reward retention or quest outcome, it must appear in Run Summary.
- Max stack rules must be visible in tooltip.

## Tooltip Template

`Name — Type. Duration. Stacking. Effect. Boss behavior. Cleansed by. Sources.`

---

## Core Combat Statuses

### ST-01 — Mondbrand

**Type:** Damage mark / combo primer  
**Primary source:** Lyra  
**Duration:** 8s  
**Stacking:** up to 10 stacks; refreshes per stack group  
**Effect:** Each stack deals minor burn/tick damage and increases Lyra/Hausbrand scaling. At 5+ stacks, affected enemy emits visible glass-heat cracks.  
**Boss behavior:** max 5 effective stacks for damage scaling, visual stacks still visible.  
**Cleansed by:** rare water/cleanse events, some boss phase changes.  
**VFX:** orange-blue glass cracks under armor.  
**SFX:** small glass ping on application, low crackle on high stacks.  
**UI:** stack number on enemy plate when targeted.  
**Synergies:** Mira `Siegelriss` can detonate; Tarek decoy can spread via salt-mirror node.

### ST-02 — Siegelriss

**Type:** Vulnerability / reveal / control primer  
**Primary source:** Mira  
**Duration:** 6s  
**Stacking:** up to 5; each stack increases reveal/vulnerability slightly  
**Effect:** Reveals hidden traits, extends telegraphs, increases ally damage by small amount if upgraded.  
**Boss behavior:** reveals next attack tell; damage vulnerability reduced.  
**Cleansed by:** boss phase transition, anti-rune elites.  
**VFX:** pale runic fracture ring.  
**SFX:** paper tear + chime.  
**Synergies:** Lyra burns through seals; Tarek decoys explode harder in seal fields.

### ST-03 — Schuldmarke

**Type:** Mark / delayed burst / enemy behavior manipulation  
**Primary source:** Tarek  
**Duration:** 10s  
**Stacking:** up to 8  
**Effect:** Marked enemies are counted for `Vertrag brechen`; can be made to switch target to decoys.  
**Boss behavior:** stack cap 4, burst reduced, taunt ignored by major bosses but affects adds.  
**Cleansed by:** contract-burn elites, extraction completion.  
**VFX:** floating red contract seal and chain hairline.  
**SFX:** stamp hit, chain tick at high stacks.

### ST-04 — Harzbindung

**Type:** Slow / root / trap primer  
**Primary source:** Siofra  
**Duration:** 12s  
**Stacking:** up to 6; root triggers at threshold depending enemy size  
**Effect:** slows, increases trap damage, can heal allies in upgraded fields.  
**Boss behavior:** no full root; converts to short attack delay or turn-speed slow.  
**Cleansed by:** fire hazard, boss stomp, solvent elites.  
**VFX:** gold resin on wheels/legs.  
**SFX:** sticky stretch.

### ST-05 — Tiefenruf

**Type:** Pull mark / interrupt primer  
**Primary source:** Brannok  
**Duration:** 5s  
**Stacking:** up to 3  
**Effect:** marked enemies take increased damage from pulls, slams, and interrupts. Small enemies become pullable even during some attacks.  
**Boss behavior:** creates anchor point instead of pulling boss.  
**Cleansed by:** phase shift, anchor break.  
**VFX:** blue-black hook sigil.  
**SFX:** chain under water.

### ST-06 — Eidmarke

**Type:** Defensive/team buff  
**Primary source:** Edda  
**Duration:** 14s or while inside banner aura  
**Stacking:** up to 3  
**Effect:** armor, stagger resistance, extraction grace extension if upgraded.  
**Boss behavior:** not applicable to enemies.  
**Cleansed by:** leaving banner for too long, oathbreaker curse.  
**VFX:** silver-gold shield lines.  
**SFX:** cloth snap + low horn.

### ST-07 — Rostbruch

**Type:** Poison / anti-cast / debuff amplifier  
**Primary source:** Kael  
**Duration:** 15s  
**Stacking:** up to 12; high stacks reduce enemy damage output slightly  
**Effect:** poison tick, increased interrupt damage, synergy with Kael passive.  
**Boss behavior:** poison reduced, interrupt window amplification remains.  
**Cleansed by:** repair enemies, holy/machine purge.  
**VFX:** rust-red cracks and black smoke.  
**SFX:** metal corrosion hiss.

---

## Control Statuses

### ST-08 — Stun

**Duration:** 0.4–2.0s depending source  
**Stacking:** no; repeated stuns add diminishing returns.  
**Effect:** enemy cannot move or attack.  
**Boss behavior:** converted to micro-stagger / telegraph extension.  
**Sources:** Lyra against Nachtflut, heavy collisions, boss-specific counters.

### ST-09 — Root

**Duration:** 1–4s  
**Effect:** enemy cannot move but can attack if in range.  
**Boss behavior:** converted to turn-speed slow.  
**Sources:** Siofra traps, Wurzelgriff hazards.

### ST-10 — Slow

**Duration:** variable  
**Stacking:** strongest source wins unless specifically additive.  
**Effect:** speed and turn speed reduced.  
**Boss behavior:** reduced magnitude.  
**Sources:** Harzbindung, Tiefschlamm, Siegelbruch, Salzbrand fatigue.

### ST-11 — Blind / False Target

**Duration:** 1–5s  
**Effect:** enemy targeting picks decoys or last known position. For player, UI shows false objective callout only in specific Asterhof events.  
**Boss behavior:** affects adds; bosses may mis-aim one telegraphed attack if upgraded.  
**Sources:** Tarek decoy, Spiegelboden, Asterhof false voices.

### ST-12 — Confusion

**Duration:** 2–6s  
**Effect:** AI pathing degraded; player input inversion only from explicit hazards and must respect accessibility toggle.  
**Boss behavior:** no direct confusion; converted to add misdirection.  
**Sources:** Pilzatem, Secco/Chaos upgrades, Wurzelwald hazards.

---

## Defensive / Utility Buffs

### ST-13 — Dornherz

**Type:** Lyra self buff  
**Duration:** 2.5s base  
**Stacking:** up to 3  
**Effect:** movement speed and slight dodge recovery.  
**UI:** character buff row with stack pips.

### ST-14 — Archivblick

**Type:** Mira reveal buff  
**Duration:** contextual / passive  
**Effect:** reveals hidden pickups, illusions, weak points.  
**UI:** eye/rune marker on revealable objects.

### ST-15 — Schrottschild

**Type:** shield buff, especially Marek/future systems  
**Duration:** until depleted or 8s  
**Stacking:** shield value stacks up to cap.  
**Effect:** absorbs damage before HP.  
**20h use:** NPC/upgrade/bounty-compatible even if Marek is not core 20h protagonist.

### ST-16 — Standhaft

**Type:** anti-displacement  
**Duration:** during heavy attacks or banner aura  
**Effect:** reduces knockback/push from Sturmflut, Kranhaken near-miss, small rams.  
**Sources:** Brannok passive, Edda banner, heavy vehicle modules.

### ST-17 — Heilschlamm

**Type:** healing field buff  
**Duration:** while standing in field + 1s linger  
**Effect:** small heal over time.  
**Sources:** Siofra upgraded traps, Graumarsch hub upgrades.

---

## Narrative / Quest Statuses

### ST-18 — Erinnerungsrest

**Type:** Quest/codex state  
**Duration:** until inspected or extracted depending quest  
**Effect:** Object can be read by Echo-Lupe. May persist immediately if lore-only or require extraction if physical proof.  
**UI:** soft blue ghost outline.

### ST-19 — Namenlos

**Type:** Wurzelwald quest debuff  
**Duration:** quest-specific  
**Effect:** NPC/player nameplate is obscured; certain dialogue choices hidden or altered.  
**Cleansed by:** MQ-11 decision path.  
**Accessibility:** must not make objective impossible; provide journal fallback.

### ST-20 — Schuldgebunden

**Type:** Sonnenglasweite quest mark  
**Duration:** until contract resolved  
**Effect:** target can be tracked by collectors; may trigger special enemies.  
**Sources:** MQ-07, debt bounties.

### ST-21 — Zeuge

**Type:** escort/protection state  
**Duration:** bounty/quest run  
**Effect:** NPC must survive and extract. Panics under threat.  
**UI:** protected target HP and panic meter.

### ST-22 — Beweislast

**Type:** finale proof-carrying state  
**Duration:** until extraction/failure  
**Effect:** occupies carry slot, attracts Serethblick, determines finale route.  
**UI:** archive proof icons in objective tracker.

---

## Extraction and Run States

### ST-23 — Extraktionsbereit

**Type:** run objective state  
**Trigger:** boss/elite objective complete  
**Effect:** extraction zone appears; enemy pressure rises.  
**UI:** zone arrow, objective text, music shift.

### ST-24 — In Extraktionszone

**Type:** extraction state  
**Effect:** countdown active if not contested.  
**UI:** countdown ring, boundary glow.

### ST-25 — Extraktion umkämpft

**Type:** contest state  
**Effect:** countdown paused; enemy/team presence must be cleared.  
**Single-player:** elite enemies can contest if specified by mission.  
**2v2:** enemy players contest by entering zone.  
**UI:** red contested banner, source markers.

### ST-26 — Extraktionsgnade

**Type:** grace period  
**Duration:** 3s default after leaving zone  
**Effect:** countdown pauses before decay.  
**Modifiers:** Edda can extend; some finale hazards reduce.  
**UI:** small grace meter.

### ST-27 — Run-Gepäck

**Type:** reward carry state  
**Effect:** physical high-value items are carried and lost on defeat.  
**UI:** carry slots near minimap / objective tracker.

---

## Hazard Statuses

### ST-28 — Salzbrand

Builds while standing in exposed salt heat or storm residue. Deals small DoT and reduces shield regen. Cleansed by shade/water/heal field.

### ST-29 — Reliktdruck

Carrying unstable Tech in Dunkelgrund/Asterhof builds pressure. At max pressure, Tech ruptures and is lost unless stabilized. UI must show meter and warning audio.

### ST-30 — Sturmflut-Schub

Periodic push at Eisenbrand. Not a debuff on UI unless player is in danger lane; telegraph must be environmental first.

### ST-31 — Lawinenbruch

Hochkamm lane collapse. Marks ground before break; applies heavy damage and displacement if ignored.

### ST-32 — Serethblick

Asterhof/finale mark. Increases enemy focus and can increase Tech loss risk. If stacked with Beweislast, false objectives become more frequent.

## Status QA Checklist

- Tooltip includes duration, stacking, source, cleanse, boss behavior.
- Icon appears consistently in HUD, enemy plate, codex, and Run Summary.
- Boss conversion behavior is tested.
- Accessibility options reduce confusing screen effects without removing gameplay information.
- Extraction statuses are logged in Run Summary timeline.
- Quest statuses cannot softlock progress if UI text is obscured.
