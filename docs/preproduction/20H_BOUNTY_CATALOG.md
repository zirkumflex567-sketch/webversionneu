# Scherbenhimmel 20h — Bounty Catalog

Scope: Bounties available during the first 20-hour single-player campaign. Bounties are optional run contracts that add tactical pressure, narrative texture, and extraction tension. They must never feel like generic chores; every bounty should reveal something about a region, faction, enemy family, or companion.

## Bounty Rules

- Default: one active bounty per run.
- Bounty rewards are paid only on successful extraction unless explicitly marked `immediate`.
- If a bounty objective is complete but the player dies before extraction, Scrap partials may remain, but Relic Tech, modules, cosmetics, and contract reputation are lost.
- Story bounties can be replayed after completion as lower-lore repeatables, but the first completion owns the meaningful dialogue/codex unlock.
- Bounties must show: objective, modifier, reward, extraction dependency, failure condition, recommended character, region, and narrative hook.

## Bounty UI Card Fields

- ID
- Title
- Region
- Unlock condition
- Difficulty
- Objective
- Run modifier
- Failure condition
- Reward preview
- Extraction dependency
- Recommended character / build
- First completion text
- Repeat completion text
- Codex / world-state effect

---

## Tier 1 — Graumarsch Bounties

### BO-GR-01 — „Der Damm ächzt“

**Unlock:** after MQ-05  
**Region:** Graumarsch  
**Difficulty:** 1/5  
**Recommended:** Lyra or Mira  
**Narrative hook:** The old flood dam protecting Laternenhof is not breaking from water pressure; something underneath keeps knocking in a rhythm that matches the dead Fackelruh bell.

**Objective:** Survive 4 waves while repairing 3 dam valves, then extract.  
**Run modifier:** Water rises every 90 seconds. Tiefschlamm zones expand.  
**Failure:** A valve is destroyed or extraction fails.  
**Reward:** 220 Scrap, 1 Relic Tech, module `Moorläufer-Rahmen I`, Codex `Dammherz`.  
**Extraction dependency:** All rewards require extraction.

**First completion text:**
```text
Jorik:
Das Klopfen war kein Monster.

Mira:
Nein. Ein Signal. Alt. Militärisch.

Lyra:
Aus Fackelruh?

Jorik:
Aus der Zeit, als wir noch behauptet haben, Laternen retten jeden.
```

**Repeat text:** The dam holds another night.

---

### BO-GR-02 — „Aale im Rauchhaus“

**Unlock:** after SQ-GR-01 or MQ-05  
**Region:** Graumarsch  
**Difficulty:** 1/5  
**Recommended:** Lyra  
**Objective:** Lure and kill the Spiegelaal brood without letting it destroy the stored food crates. Extract with at least 2 crates intact.  
**Run modifier:** Spiegelaale ignore player until crates are hit; player must intercept.  
**Failure:** all crates destroyed or extraction fails.  
**Reward:** 180 Scrap, food-stock hub buff for next 3 runs, cosmetic `Räucherfahne`.  
**Extraction dependency:** Food buff and cosmetic require extraction; partial Scrap on defeat.

**Hook:** If the player saved the school in MQ-01, this bounty repairs the early food shortage. If the player saved the smokehouse, this bounty protects that choice.

---

### BO-GR-03 — „Keine Laterne für Feiglinge“

**Unlock:** after first defeat in Graumarsch or after MQ-05  
**Difficulty:** 2/5  
**Objective:** Complete a Graumarsch extraction without using a healing pickup.  
**Modifier:** Healing pickups convert to small shields.  
**Failure:** healing pickup used, player dies, or extraction fails.  
**Reward:** 1 Relic Tech, title `Nasse Zähne`, Lyra bond +1 if Lyra active.  
**Narrative hook:** This is Jorik’s harsh veteran training, later softened if Oren challenges him.

---

## Tier 2 — Sonnenglasweite Bounties

### BO-SG-01 — „Wasser ist kein Luxus“

**Unlock:** after MQ-08  
**Region:** Sonnenglasweite  
**Difficulty:** 2/5  
**Recommended:** Tarek or Mira  
**Objective:** Escort 3 water carts through an extraction run; at least 2 must survive.  
**Modifier:** Player speed reduced while close to carts; enemies prioritize carts during storms.  
**Failure:** fewer than 2 carts survive or extraction fails.  
**Reward:** 300 Scrap, 2 Relic Tech, hub vendor `Brunnenstand`, Zahir citizen reputation.  
**Extraction dependency:** all but dialogue requires extraction.

**First completion text:**
```text
Mina:
They will call this theft.

Tarek:
Good. Theft is what rich men call it when hunger learns arithmetic.
```

---

### BO-SG-02 — „Auktion ohne Hammer“

**Unlock:** MQ-07 complete with public reading or destroyed debt path  
**Difficulty:** 3/5  
**Objective:** Steal three illegal memory contracts during a run without killing more than 12 human guards.  
**Modifier:** Human guards flee and call reinforcements if damaged below 30%.  
**Failure:** kill limit exceeded, contract carrier escapes, extraction fails.  
**Reward:** 2 Relic Tech, Codex `Erinnerungsverpfändung`, Tarek bond +1, Shop discount on decoy modules.  
**Recommended:** Tarek.

**Design intent:** Non-lethal pressure in a vehicle combat game: target priority, restraint, extraction tension.

---

### BO-SG-03 — „Glasrochen Alpha: Spur im Himmel“

**Unlock:** after MQ-09  
**Difficulty:** 3/5  
**Objective:** Track and wound Glasrochen Alpha across 3 storm phases; extract a scale sample.  
**Modifier:** The boss escapes if not damaged during exposed glide windows.  
**Failure:** lose track twice, storm timer expires, extraction fails.  
**Reward:** `Glasfuchs` mount part, 350 Scrap, 2 Relic Tech, Codex `Glasrochen migration`.  
**Recommended:** Lyra/Tarek high mobility.

---

## Tier 3 — Wurzelwald Bounties

### BO-WN-01 — „Drei Namen, kein Grab“

**Unlock:** after MQ-11  
**Difficulty:** 3/5  
**Objective:** Recover 3 name-ribbons from moving root shrines and extract them without letting Namenloser Nebel erase them.  
**Modifier:** Quest items decay outside lit/root-safe zones.  
**Failure:** any ribbon decays to zero or extraction fails.  
**Reward:** 2 Relic Tech, alchemy recipe `Namebinder-Harz`, Siofra bond +1.  
**Recommended:** Siofra or Mira.

**First completion text:**
```text
Siofra:
A name is not proof that someone lived.

Lyra:
No. But it is proof that someone refused to let them disappear quietly.
```

---

### BO-WN-02 — „Pilzatem“

**Unlock:** after first Wurzelwald free run  
**Difficulty:** 2/5  
**Objective:** Destroy 5 spore hearts before extraction.  
**Modifier:** Input confusion pulses every 45 seconds until a spore heart is destroyed.  
**Failure:** extraction before all hearts destroyed, death, extraction fail.  
**Reward:** 260 Scrap, module `Spore Filter`, Codex `Pilzatem`.  
**Recommended:** Mira reveal or Siofra traps.

---

### BO-WN-03 — „Der Chor hört zu“

**Unlock:** Siofra unlocked  
**Difficulty:** 4/5  
**Objective:** Complete extraction while never letting Chorbruch enemies enter the zone.  
**Modifier:** Chorbruch enemies spawn fewer but stronger and try to walk into extraction rather than kill player.  
**Failure:** any Chorbruch enters extraction, extraction fails.  
**Reward:** 3 Relic Tech, Siofra cosmetic `Harzkrone`, trap branch node discount.  
**Recommended:** Siofra/Edda later.

---

## Tier 4 — Eisenbrandküste Bounties

### BO-EB-01 — „Streikposten“

**Unlock:** after MQ-12  
**Difficulty:** 3/5  
**Objective:** Defend 4 worker barricades until extraction appears. At least 3 must stand.  
**Modifier:** Dockschläger carry firebombs; Brannok can harpoon them away.  
**Failure:** more than 1 barricade destroyed or extraction fails.  
**Reward:** 420 Scrap, 2 Relic Tech, Werftzunft reputation, crafting material `Glockenstahl`.  
**Recommended:** Brannok.

---

### BO-EB-02 — „Keine Glocke unter Wasser“

**Unlock:** after Brannok unlock  
**Difficulty:** 4/5  
**Objective:** Interrupt 7 Tiefenglocke channel casts and defeat the bell carrier.  
**Modifier:** Every completed cast buffs all enemies.  
**Failure:** 3 casts complete, death, extraction fail.  
**Reward:** Harpoon mod `Stummer Haken`, 3 Relic Tech, Brannok bond +1.  
**Recommended:** Brannok/Kael later.

---

### BO-EB-03 — „Kranhexe-Prototyp“

**Unlock:** after dock route stabilized  
**Difficulty:** 4/5  
**Objective:** Disable a rogue crane rig by destroying anchors in order, then extract its core.  
**Modifier:** Kranhaken hazards become boss attacks.  
**Failure:** core overheats or extraction fails.  
**Reward:** Utility module `Reparaturkran I`, 500 Scrap, 3 Relic Tech, future Yara teaser.  
**Recommended:** Mira for reveal, Brannok for anchors.

---

## Tier 5 — Hochkamm Bounties

### BO-HK-01 — „Passrecht“

**Unlock:** after entering Hochkamm  
**Difficulty:** 3/5  
**Objective:** Escort a refugee convoy through avalanche lanes and extract with at least 70% survivors.  
**Modifier:** Heavy snow reduces turn speed; enemies try to split convoy.  
**Failure:** survivor count below threshold or extraction fails.  
**Reward:** 450 Scrap, 2 Relic Tech, pass reputation, Codex `Passrecht`.  
**Recommended:** Edda once unlocked.

---

### BO-HK-02 — „Silberner Zeuge“

**Unlock:** MQ-15 investigation step  
**Difficulty:** 4/5  
**Objective:** Keep a witness NPC alive through 4 waves, then extract them.  
**Modifier:** Witness panics and runs if enemies get too close unless protected by banners or cleared lanes.  
**Failure:** witness dies, flees beyond arena, or extraction fails.  
**Reward:** quest evidence flag, 3 Relic Tech, Edda bond +1.  
**Recommended:** Edda/Siofra.

---

## Tier 6 — Dunkelgrund Bounties

### BO-DG-01 — „Zweiter Name“

**Unlock:** after Rußmarkt entry  
**Difficulty:** 4/5  
**Objective:** Recover identity masks from 3 elite Reliktjäger and extract them.  
**Modifier:** Each mask carried increases enemy aggression and Reliktdruck.  
**Failure:** mask destroyed by overpressure or extraction fails.  
**Reward:** 4 Relic Tech, Codex `Second names`, Kael trust route.  
**Recommended:** Kael/Mira.

---

### BO-DG-02 — „Schacht ohne Licht“

**Unlock:** after MQ-17  
**Difficulty:** 5/5  
**Objective:** Complete a run with visibility reduced and kill 5 casting elites using interrupts.  
**Modifier:** Rußwolke covers most of arena; reveal pulses are limited.  
**Failure:** fewer than 5 interrupt kills, death, extraction fail.  
**Reward:** Dagger mod `Schuldkerbe`, 5 Relic Tech, Kael bond +1.  
**Recommended:** Kael.

---

## Finale Bounties — Asterhof

### BO-AH-01 — „Beweislast“

**Unlock:** Chapter 7 pre-finale  
**Difficulty:** 5/5  
**Objective:** Carry 3 archive proofs through the Asterhof and extract at least 2.  
**Modifier:** Proofs occupy reward capacity and attract Serethblick marks.  
**Failure:** fewer than 2 proofs extracted.  
**Reward:** finale truth-path advantage, 5 Relic Tech, Codex `Fackelruh-Protokoll`.  
**Recommended:** Mira/Lyra.

### BO-AH-02 — „Person vor Wahrheit“

**Unlock:** Chapter 7 when key NPC is trapped  
**Difficulty:** 5/5  
**Objective:** Extract a trapped NPC instead of archive proof.  
**Modifier:** NPC must be escorted and can be targeted by false voices.  
**Failure:** NPC dies or extraction fails.  
**Reward:** saved NPC finale path, companion bond spread, lower proof count.  
**Recommended:** Edda/Siofra.

## Bounty QA Checklist

- Bounty only appears after unlock flag.
- Deploy preview states modifier and reward retention.
- HUD objective tracks progress clearly.
- Failure reasons are explicit and logged.
- Extraction dependency works: completed objective without extraction does not grant full reward.
- Run Summary separates objective completion from reward banking.
- First completion triggers unique dialogue/codex once.
- Repeatable completion uses repeat text and does not duplicate unique rewards.

## Vertical Slice Add-on Contract
- id: 
- nameKey: 
- descriptionKey: 
- unlockConditions: 
- difficulty: high
- runModifier: , 
- failureConditions: player defeated, no extraction
- rewards: extraction-only tech package + completion scrap
- extractionDependency: extraction

## Vertical Slice Add-on Contract
- id: bounty_chemfog_blackout
- nameKey: bounty.chemfog_blackout.title
- descriptionKey: bounty.chemfog_blackout.description
- unlockConditions: sq_graumarsch_chemfog_complete
- difficulty: high
- runModifier: IncomingDamageMultiplier=1.25, TechMultiplier=1.50
- failureConditions: player defeated, no extraction
- rewards: extraction-only tech package + completion scrap
- extractionDependency: extraction
