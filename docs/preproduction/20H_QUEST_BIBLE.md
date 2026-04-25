# Scherbenhimmel 20h — Complete Quest Bible

Scope: the first 20-hour single-player campaign. This is the implementation-grade quest reference for narrative, objectives, gameplay beats, dialogue samples, rewards, world-state flags, unlocks, failure behavior, and QA. It consolidates and expands the earlier Scherbenhimmel story work into a concrete pre-coding contract.

## Quest Contract

Every quest must define:

- Stable ID
- Title
- Type: Main, Side, Companion, Bounty, Tutorial
- Chapter / region
- Unlock condition
- Recommended character and required character if any
- Estimated duration
- Objective chain
- Required menus/screens
- Combat/extraction rules
- Rewards and whether they require extraction
- World-state flags
- Dialogue/cinematic beats
- Failure/cancel behavior
- QA acceptance checks

## Persistence Rules

- Main story progression normally persists only after quest completion and required extraction.
- Lore-only codex discoveries can persist immediately if marked `persistent_lore`.
- Physical proof, Relic Tech, modules, weapons, cosmetics, bounties, and quest reward items require successful extraction unless explicitly marked otherwise.
- If a quest objective is completed but extraction fails, Quest Log must show: `Objective completed, extraction failed, reward lost / retry available`.

## 20h Quest Arc Overview

| Segment | Main Quests | Side Quests | Companion Quests | Purpose |
|---|---|---|---|---|
| Prolog | MQ-00 to MQ-02 | — | — | attachment, disaster, first horror |
| Chapter 1 | MQ-03 to MQ-05 | SQ-GR-01 to SQ-GR-03 | CQ-LY-01, CQ-MI-01 unlock | hub, Mira, first world-state |
| Chapter 2 | MQ-06 to MQ-09 | SQ-SG-01 to SQ-SG-03 | CQ-TA-01 | debt, Tarek, trade routes |
| Chapter 3 | MQ-10 to MQ-11 | SQ-WN-01 to SQ-WN-02 | CQ-SI-01 | names, Siofra, alchemy |
| Chapter 4 | MQ-12 to MQ-14 | SQ-EB-01 to SQ-EB-02 | CQ-BR-01 | labor, Brannok, cult ambiguity |
| Chapter 5 | MQ-15 to MQ-16 | SQ-HK-01 to SQ-HK-02 | CQ-ED-01 | oath politics, Edda |
| Chapter 6 | MQ-17 to MQ-18 | SQ-DG-01 to SQ-DG-02 | CQ-KA-01 | underworld, Kael, relic pressure |
| Chapter 7 | MQ-19 to MQ-20 | SQ-AH-01 | finale follow-ups | truth, Ivara, Sereth hook |

---

# Main Questline

## Prolog

### MQ-00 — Der Abend vor dem Regen

**Type:** Main / Prologue  
**Region:** Graumarsch / Fackelruh before disaster  
**Unlock:** New Campaign  
**Required character:** Lyra  
**Duration:** 20–25 min  
**Purpose:** Make Fackelruh feel alive before it burns.

#### Objectives

1. Bring Sumpföl to the village lantern.
2. Talk to at least 3 villagers; 8 optional conversations available.
3. Help with 3 village tasks:
   - light the Aalräucherei fire,
   - bring Toma down from the broken pier,
   - repair a cracked lantern glass.
4. Return to village square for evening bell.
5. Watch Mareths Scherbe flicker black.

#### Dialogue Beats

```text
Toma:
Lyra, wenn der Mond nochmal bricht, fällt dann der Himmel ganz runter?

Lyra:
Dann halte ich ihn eben mit beiden Händen fest.

Toma:
Du hast nur zwei.

Lyra:
Dann musst du helfen.
```

```text
Jorik:
Eine Laterne schützt nicht, weil sie hell ist. Sie schützt, weil Leute glauben, dass jemand sie wieder anzündet.
```

#### Rewards

No mechanical reward. Unlocks emotional anchors used later: `anchor_toma_glass_star`, `anchor_ellin_ledger`, `anchor_jorik_lantern_mark`.

#### Flags

- `mq00_complete`
- `fackelruh_known_preburn`
- `village_task_smokehouse_done`
- `village_task_toma_done`
- `village_task_lantern_done`

#### QA

- Player cannot skip first village pass.
- All optional NPCs have post-disaster reference hooks.
- Quest completion autosaves before MQ-01 disaster.

---

### MQ-01 — Wenn die Laterne stirbt

**Type:** Main  
**Region:** Graumarsch / Fackelruh burning  
**Unlock:** MQ-00 complete  
**Required character:** Lyra  
**Duration:** 25–35 min  
**Purpose:** First combat, first impossible rescue, first moral scar.

#### Objectives

1. Reach village square.
2. Defeat first Nachtflut-Schemen.
3. Choose rescue route:
   - **Aalräucherei**: preserve food stores.
   - **Schulsteg**: save children.
4. Reach main lantern with Jorik.
5. Survive the memory storm for 90 seconds.
6. Defeat `Der Mann im Regenmantel` until phase break.
7. Escape collapse cinematic.

#### Choice Consequence

| Choice | Immediate | Later hub effect |
|---|---|---|
| Aalräucherei | food survives; school loss implied | early food buff, memorial guilt dialogue |
| Schulsteg | children survive; food burns | more NPCs in hub, early supply shortage |

#### Boss

`Der Mann im Regenmantel`  
Phase 1: slow melee.  
Phase 2: rain-wall teleport.  
Phase 3: uses father-voice line and ends fight by scripted collapse.

#### Key Dialogue

```text
Regenmantel:
Nicht die Laterne.

Lyra:
Was?

Regenmantel:
Das Archiv.
```

#### Rewards

- Ability: `Funkenstoß`
- Title: `Überlebende von Fackelruh`
- Unlock: basic combat tutorial complete

#### Flags

- `mq01_complete`
- `fackelruh_burned`
- `choice_fackelruh_saved_smokehouse` OR `choice_fackelruh_saved_school`
- `lyra_unlocked_funkenstoss`

#### QA

- Rescue choice is irreversible and shown in Quest Log.
- Boss cannot be fully killed; phase break must trigger collapse.
- The chosen saved location visibly differs in later return map.

---

### MQ-02 — Asche schwimmt nicht

**Type:** Main  
**Region:** Graumarsch / Fluchtkanal  
**Unlock:** MQ-01 complete  
**Required character:** Lyra  
**Duration:** 20 min  
**Purpose:** First aftermath, Echo-Lupe, grief as gameplay.

#### Objectives

1. Board Mara Esch’s escape boat.
2. Collect 3 floating memory objects.
3. Use Echo-Lupe on each object.
4. Repel Spiegelaal swarms.
5. Watch Fackelruh lights extinguish.

#### Rewards

- Tool: `Echo-Lupe`
- Codex: `Mondglas erinnert nicht. Es wiederholt.`
- NPC: Mara Esch recruited as transport/logistics NPC

#### Flags

- `mq02_complete`
- `tool_echo_lupe_unlocked`
- `npc_mara_recruited`

#### Failure

If player dies during eel attacks, restart at boat checkpoint; story objects remain collected.

---

## Chapter 1 — Die Letzten Laternen

### MQ-03 — Der Hof, der noch brennt

**Region:** Laternenhof  
**Duration:** 35–45 min  
**New systems:** Garage Hub, Lagerfeuer, Companion Slot, first upgrade choice

#### Objectives

1. Enter Laternenhof.
2. Meet Meisterin Ivara, Oren Vale, Jorik.
3. Inspect three broken hub buildings.
4. Choose first repair priority: Schlafsaal, Werkbank, Krankenstube.
5. Open Garage Dashboard.
6. Accept Sumpfkathedrale investigation.

#### Hub Choice

| Building | Immediate gameplay | Narrative impact |
|---|---|---|
| Schlafsaal | faster bond XP | more refugees visible |
| Werkbank | early weapon/module mods | Mara praises practicality |
| Krankenstube | stronger healing pickups | one wounded NPC survives |

#### Key Dialogue

```text
Ivara:
Wir retten nicht jeden. Wir halten nur genug Licht, damit die nächsten nicht im Dunkeln sterben.

Lyra:
Das klingt wie etwas, das sich jemand sagt, wenn er schon entschieden hat, wen er nicht rettet.
```

#### Rewards

- Hub: Laternenhof Stufe 1
- Menus: Garage Dashboard, Deploy, Roster, Quest Log
- Unlocks: SQ-GR-01, CQ-LY-01

#### Flags

- `mq03_complete`
- `hub_lanternhof_level_1`
- `hub_choice_first_building_*`

---

### MQ-04 — Die Sumpfkathedrale

**Region:** Sumpfkathedrale  
**Duration:** 40–50 min  
**New character:** Mira Voss

#### Objectives

1. Deploy to Sumpfkathedrale.
2. Open cathedral gate using Echo-Lupe on 3 bell memories.
3. Find Mira inside seal circle.
4. Optional: read Mira’s notes before freeing her.
5. Defeat `Archivhüter ohne Gesicht`.
6. Extract with Mira and recovered archive fragment.

#### Optional Choice

| Choice | Effect |
|---|---|
| Free Mira immediately | Mira bond +1, less early lore |
| Read notes first | Codex unlock early, Mira distrust line |

#### Boss Mechanics

Archivhüter copies last used ability. Player must alternate basic, Technique, movement, and environmental bells.

#### Dialogue

```text
Mira:
Das ist kein Schutzsiegel.

Lyra:
Sondern?

Mira:
Eine Tür, die von innen abgeschlossen wurde.
```

#### Rewards

- Mira playable
- Duo-Skill system unlocked
- Codex: `Löschprotokoll Fragment A`
- Tech: 1 Relic Tech on extraction

#### Flags

- `mq04_complete`
- `char_mira_unlocked`
- `codex_loeschprotokoll_a`
- `duo_skill_system_unlocked`

---

### MQ-05 — Drei Dochte für eine Flamme

**Region:** Graumarsch open route  
**Duration:** 30–40 min  
**New systems:** fast travel, world events, extraction standardization

#### Objectives

1. Light Moorposten: combat encounter.
2. Light Mühlenposten: waterwheel puzzle.
3. Light Grabposten: dialogue with nameless ghost.
4. Survive extraction rush at final lantern.
5. Return to Laternenhof for map update.

#### Rewards

- World map level 1
- Fast travel between lit lanterns
- Bounties: BO-GR-01, BO-GR-02, BO-GR-03
- Regions: route toward Sonnenglasweite

#### Flags

- `mq05_complete`
- `fast_travel_lanterns_unlocked`
- `graumarsch_world_events_unlocked`

---

## Chapter 2 — Salzschuld

### MQ-06 — Der Weg aus Glas

**Region:** Graumarsch border / Sonnenglasweite  
**Duration:** 30 min  
**Purpose:** Transition to desert, introduce Tarek and debt theme.

#### Objectives

1. Cross the glass road.
2. Shelter from first Scherbensturm.
3. Encounter Tarek stealing from a caravan.
4. Choose response: confront, help, observe.
5. Escape Schuldkollektor ambush.
6. Reach Spiegelmarkt gates.

#### Choice Effects

- Confront: Tarek starts defensive, Lyra approves.
- Help: Tarek bond +1, Zahir suspicion +1.
- Observe: Mira approves if present, gives extra evidence.

#### Rewards

- Tarek temporary companion
- Codex: `Schuldgebunden`
- Access: Spiegelmarkt exterior

---

### MQ-07 — Der Preis des Salzes

**Region:** Spiegelmarkt Azhar  
**Duration:** 55–70 min  
**New systems:** reputation, social route, debt decision  
**Unlocks character:** Tarek

#### Objectives

1. Learn Tarek’s memory contract is being auctioned.
2. Choose one access route:
   - raid warehouse,
   - help Mina recover forgery tools,
   - escort water delivery for legal pass.
3. Enter auction house.
4. Investigate contract terms using Echo-Lupe / Mira.
5. Decide: destroy, buy, or publicly read contract.
6. Escape market enforcement.
7. Extract with Tarek and contract remains if applicable.

#### Decision Matrix

| Decision | Cost | Result | Reputation |
|---|---:|---|---|
| Destroy | combat-heavy | Tarek free, illegal evidence gone | citizens +, Zahir -- |
| Buy | high Scrap | legal freedom, Tarek discomfort | Zahir +, Tarek - |
| Public reading | hardest escape | exposes illegal memory-debt | citizens ++, Zahir --- |

#### Key Dialogue

```text
Tarek:
If I am property, at least let me be stolen by someone with taste.

Lyra:
I am not stealing you.

Tarek:
That is a shame. It would be the most honest contract in this building.
```

#### Rewards

- Tarek playable
- Spear: `Salzspalter`
- Reputation branch in Sonnenglasweite
- Unlocks MQ-08, CQ-TA-01, BO-SG-01/02 depending choice

#### Flags

- `mq07_complete`
- `char_tarek_unlocked`
- `choice_tarek_contract_destroyed|bought|public_reading`

---

### MQ-08 — Brunnen, die lügen

**Region:** Brunnenviertel  
**Duration:** 35–45 min

#### Objectives

1. Inspect dry/wet illusion wells.
2. Use Echo-Lupe on 3 salt-glass nodes.
3. Defeat Karawanen-Söldner patrol.
4. Decide well future: clean, seal, citizen council.
5. Extract with water core sample.

#### Rewards

- Healing upgrade: `Brunnenwasser I`
- Hub vendor if citizen council route
- Codex: `Wasserrecht Azhar`
- Unlock MQ-09

#### Flags

- `choice_well_cleaned|sealed|citizen_council`

---

### MQ-09 — Konvoi durch die Glassenke

**Region:** Glassenke  
**Duration:** 25–35 min  
**New system:** convoy route and mount probe

#### Objectives

1. Prepare caravan route in Deploy.
2. Escort convoy through three incidents.
3. Ride Glasrochen probe through storm lane.
4. Identify real caravan among mirrored copies.
5. Extract with at least 60% convoy intact.

#### Incidents

- Medicine raiders: fight or give supplies.
- Forbidden cargo: expose or conceal.
- Child recognizes Tarek: apology, bribe, silence.

#### Rewards

- Trade route to Laternenhof
- Mount quest teaser: `Risshirsch-Spur`
- Tarek bond +1 if apology path
- Access: Wurzelwald route

---

## Chapter 3 — Der Wald vergisst

### MQ-10 — Wo Namen wurzeln

**Region:** Wurzelwald Nhal  
**Duration:** 30–40 min  
**Introduces:** Siofra, name choice

#### Objectives

1. Follow broken trade road into Wurzelwald.
2. Survive Namenloser Nebel.
3. Meet Siofra during Harz ambush.
4. Choose entry method: full name, false name, silence.
5. Reach Silberraunen.

#### Choice Effects

| Choice | Benefit | Cost |
|---|---|---|
| Full name | Chor trust | personal illusions later |
| False name | stealth against illusions | Siofra distrust |
| Silence | Mira respect | guardian fight |

#### Rewards

- Siofra temporary companion
- Access Silberraunen
- Codex: `Namenfraß`

---

### MQ-11 — Ein Garten, der Namen frisst

**Region:** Tränenbecken / Wurzelgarten  
**Duration:** 55–70 min  
**Unlocks:** Siofra

#### Objectives

1. Interview three villagers about the nameless child.
2. Inspect toy, sleep mat, root carving.
3. Use Echo-Lupe to reveal Ileth.
4. Enter Wurzelgarten.
5. Defeat `Die Tochter ohne Mund` by activating three memory anchors.
6. Choose Ileth’s name fate.
7. Extract with result.

#### Decision Matrix

| Choice | Result | Reward |
|---|---|---|
| Return name | Ileth NPC appears, harder forest hazards | Siofra bond +, Codex visible |
| Burn name | forest stabilizes, Siofra grief | defensive region modifier |
| Preserve in relic | Ileth unseen, finale protection option | relic `Ileths Name` |

#### Rewards

- Siofra playable
- Alchemy unlocked
- Trap module `Harzfänger I`
- Unlock CQ-SI-01, Wurzelwald bounties

---

## Chapter 4 — Die Glocke unter der Brandung

### MQ-12 — Dock aus Eisenbrand

**Region:** Eisenbrandküste  
**Duration:** 35–45 min

#### Objectives

1. Arrive during dock strike.
2. Speak with worker leader, zünftler foreman, Brannok.
3. Clear storm salvage route.
4. Choose temporary dock access sponsor: workers, zünfte, neutral Mara route.
5. Extract storm salvage.

#### Rewards

- Eisenbrand access
- Crafting queue preview
- Brannok temporary companion

---

### MQ-13 — Die Kette, die zurückzieht

**Region:** Unterpier  
**Duration:** 45–55 min  
**Unlocks:** Brannok

#### Objectives

1. Track stolen bell-chain.
2. Learn Eron Reef joined Tiefenglocke.
3. Use Brannok harpoon tutorial.
4. Interrupt 3 cult bell casts.
5. Defeat Eron encounter without killing him or choose lethal pressure if player insists.
6. Extract chain core.

#### Rewards

- Brannok playable
- Harpoon system tutorial complete
- Unlock CQ-BR-01
- Codex: `Tiefenglocke`

---

### MQ-14 — Die Glocke unter der Brandung

**Region:** Tiefenglocke chapel / storm dock  
**Duration:** 55–70 min

#### Objectives

1. Attend dock assembly.
2. Decide whether Eron may speak.
3. Fight through storm dock as cult and dock forces clash.
4. Boss: `Malrec & Tiefenglocke`.
5. Extract with either bell fragment, worker ledger, or Eron testimony.

#### Finale Choice

- Bell fragment: Tech/cult knowledge path.
- Worker ledger: labor reform path.
- Eron testimony: Brannok reconciliation path.

#### Rewards

- Werft crafting unlocked
- Brannok bond based on Eron handling
- Access Hochkamm route

---

## Chapter 5 — Falken ohne Himmel

### MQ-15 — Falken ohne Himmel

**Region:** Hochkamm  
**Duration:** 60 min  
**Unlocks:** Edda

#### Objectives

1. Escort first pass convoy.
2. Meet Edda as disgraced noble.
3. Investigate three witnesses: soldier, clerk, refugee.
4. Protect `Silberner Zeuge` or recover documents if witness dies.
5. Publicly accuse, privately negotiate, or form council route.
6. Extract from oath court ambush.

#### Rewards

- Edda playable
- Banner system tutorial
- Codex: `Passrecht`
- Unlock CQ-ED-01

---

### MQ-16 — Der Pass, der bezahlt werden will

**Region:** Weißzahnpass / Falkenlicht keep  
**Duration:** 45–55 min

#### Objectives

1. Choose pass governance plan.
2. Defend supply wagons from avalanche and oath troops.
3. Boss/event: `Fall der Falkenlinie`.
4. Extract pass seal or burn it.

#### Outcomes

| Outcome | Effect |
|---|---|
| Public justice | unrest, justice morale |
| Private compromise | stability, Edda distrust |
| New council | hardest fight, best long-term route |

#### Rewards

- Pass route to Dunkelgrund
- Banner upgrades
- Edda bond branch

---

## Chapter 6 — Schacht Null

### MQ-17 — Schacht Null

**Region:** Dunkelgrund / Rußmarkt  
**Duration:** 60 min  
**Unlocks:** Kael

#### Objectives

1. Enter Rußmarkt under temporary second name.
2. Meet Kael while he is selling false route papers.
3. Investigate prisoner ledger.
4. Choose Kael approach: hide, expose, force repayment.
5. Enter Schacht Null.
6. Survive Reliktdruck extraction with prisoner proof.

#### Rewards

- Kael playable if not fully alienated; if exposed, unlock after repayment step.
- Reliktprägung system
- Codex: `Zweiter Name`, `Schacht Null`
- Unlock CQ-KA-01

---

### MQ-18 — Sankt Ival schläft nicht

**Region:** Maschinenkapelle  
**Duration:** 45–55 min

#### Objectives

1. Stabilize relic pressure using 3 machine altars.
2. Fight Maschinenpilger waves.
3. Boss: `Sankt Ival Maschinenheiliger`.
4. Decide what to do with relic core: destroy, bind, extract.

#### Rewards

- Relic tech upgrade path
- Finale key: `Asterhof-Schlüssel`
- Access Chapter 7

---

## Chapter 7 — Stimme im Glas

### MQ-19 — Der Asterhof

**Region:** Asterhof / Scherbenkrone-Vorstufe  
**Duration:** 45–60 min

#### Objectives

1. Enter Asterhof with 3 chosen companions shown in briefing.
2. Survive false objective callouts.
3. Recover three Fackelruh protocol fragments.
4. Confront Ivara projection.
5. Decide whether to carry proof, person, or power into finale extraction.

#### Carry Choice

| Carry | Finale route |
|---|---|
| Proof | truth against Laternen |
| Person | save key NPC |
| Power | stronger midgame, moral fallout |

#### Rewards

- Finale path flag
- Codex: `Fackelruh-Protokoll`
- Unlock MQ-20

---

### MQ-20 — Sereths Hand

**Region:** Asterhof gate  
**Duration:** 45–60 min  
**Purpose:** Midgame finale, not full game ending.

#### Objectives

1. Boss phase 1: fight Sereths Hand through glass lanes.
2. Boss phase 2: prior choices summon echo complications.
3. Boss phase 3: extraction zone splits into three carry-out lanes.
4. Complete story extraction with chosen carry.
5. Return to Laternenhof changed.

#### Boss Choice Echoes

- If Fackelruh school saved: child voices challenge Lyra.
- If Tarek contract publicly read: false contracts attack player.
- If Ileth name preserved: relic can block one Serethblick pulse.
- If Eron testimony saved: Brannok can interrupt one bell echo.
- If Edda council route: extra ally banner appears.
- If Kael repayment route: underground smugglers open safer lane.

#### Rewards

- Chapter 7 complete
- Midgame loop unlocked: Scherbenkrone route
- 6 Relic Tech if extracted
- Character cosmetic based on carry choice
- Ivara confrontation scene

#### End Scene

```text
Ivara:
You think truth is clean because you have not had to wash blood with it.

Lyra:
No. I think lies are dirty because you made us sleep under them.
```

#### Flags

- `chapter_7_complete`
- `midgame_scherbenkrone_unlocked`
- `finale_carry_proof|person|power`

---

# Side Quests

## Graumarsch

### SQ-GR-01 — Die letzte Aalräucherei

**Unlock:** MQ-03  
**Duration:** 20–30 min  
**Objective:** recover smokehouse hooks, decide whether to rebuild as food store or memorial.  
**Reward:** food buff or morale buff; depends on MQ-01 choice.  
**Flags:** `sq_gr_01_complete`, `hub_smokehouse_food|memorial`.

### SQ-GR-02 — Joriks Laternenmarke

Recover Jorik’s old mark from a flooded guardhouse. Reveals he served during earlier Löschprotokoll operations.  
Reward: +2 armor mentor buff after confrontation, Codex `Joriks Dienst`.

### SQ-GR-03 — Toma zählt Sterne

If school saved, Toma asks for glass stars. If not, this becomes a memorial collection quest led by another child.  
Reward: Garage decoration, Lyra bond, Codex entry about Fackelruh children.

## Sonnenglasweite

### SQ-SG-01 — Mina braucht drei Unterschriften

Forge, steal, or legally obtain three signatures to free a water vendor from debt.  
Reward: Mina vendor route or Zahir discount depending method.

### SQ-SG-02 — Der Brunnen singt rückwärts

Puzzle quest with Echo-Lupe. Reconstruct the first lie told at the well.  
Reward: Codex `First water lie`, healing upgrade component.

### SQ-SG-03 — Karawane ohne Schatten

Track a missing caravan whose shadows still move.  
Reward: Decoy module, Tarek dialogue, bounty unlock.

## Wurzelwald

### SQ-WN-01 — Harz für die Krankenstube

Collect resin without killing guardian larvae if possible.  
Reward: Heilschlamm upgrade; pacifist bonus Siofra bond.

### SQ-WN-02 — Wer spricht für Ileth?

Only appears after MQ-11. Varies with Ileth decision.  
Reward: Codex closure, alchemy recipe, Siofra camp scene.

## Eisenbrandküste

### SQ-EB-01 — Lohn in Rost

Recover unpaid wage plates from a wreck. Decide whether to return to workers or use as evidence.  
Reward: crafting discount or legal evidence.

### SQ-EB-02 — Der Kranführer schläft nicht

Investigate crane accidents caused by an exhausted operator haunted by bell chants.  
Reward: Kran hazard codex, repair module component.

## Hochkamm

### SQ-HK-01 — Briefe unter Schnee

Recover letters from an avalanche field. Some implicate nobles, some reveal ordinary fear.  
Reward: Edda bond, public/private evidence route.

### SQ-HK-02 — Der Falke frisst zuerst

Expose food diversion at a noble checkpoint.  
Reward: convoy survival buff, Passrecht reputation.

## Dunkelgrund

### SQ-DG-01 — Ein zweiter Name kostet

Help an NPC buy a second name or expose the seller.  
Reward: Rußmarkt trust or justice flag.

### SQ-DG-02 — Pilzbahnhof 7

Find a missing train car full of unstable Relic Tech.  
Reward: Reliktprägung component, Reliktdruck tutorial.

## Asterhof

### SQ-AH-01 — Was Ivara verbrannte

Optional finale-prep quest. Recover one destroyed Ivara note, changing the confrontation tone but not fully absolving her.  
Reward: extra dialogue branch in MQ-20, Codex `Ivaras Randnotiz`.

---

# Companion Quests

### CQ-LY-01 — Was man aus brennenden Häusern trägt

**Unlock:** MQ-03  
**Objectives:** return to Fackelruh, recover three personal items, choose public memorial or private room.  
**Reward:** Lyra bond, cosmetic `Smoke-scarred blade`, memorial/housing object.  
**Core line:** `Manchmal ist Überleben nur ein anderes Wort für: Ich war näher an der Tür.`

### CQ-MI-01 — Randnotizen einer Lügnerin

**Unlock:** MQ-04  
**Objectives:** collect three archive leaves that contradict Mira. Decide confession method.  
**Reward:** `Doppeltes Siegel` mod, Mira bond changes, Lyra/Mira banter branch.  
**Core line:** `Wahrheit ist kein Licht. Sie ist ein Messer. Man muss entscheiden, wohin man es hält.`

### CQ-TA-01 — Zinsen auf Namen

**Unlock:** MQ-07  
**Objectives:** find three people harmed by Tarek’s betrayal; choose apology, repayment, or evidence route.  
**Reward:** Spear skin `Glasreue`, debt bounty discount, Tarek bond.  
**Core line:** `Ich habe gelogen, weil Wahrheit teurer war. Das macht sie nicht billiger.`

### CQ-SI-01 — Der Name, den du behältst

**Unlock:** MQ-11  
**Objectives:** recover three private Siofra memories not given to the Chor.  
**Reward:** Harzfänger mod `Eigener Boden`, Siofra bond.  
**Core line:** `Wenn der Chor alles von mir kennt, warum klingt mein Name dann fremd?`

### CQ-BR-01 — Eron singt nicht mehr

**Unlock:** MQ-13  
**Objectives:** decide whether Eron’s testimony is heard, hidden, or traded.  
**Reward:** `Bruderhaken`, Brannok bond, alternate MQ-14 outcome.  
**Core line:** `Ich wollte ihn retten. Er wollte, dass ich endlich zuhöre.`

### CQ-ED-01 — Der Eid, der niemandem gehört

**Unlock:** MQ-15  
**Objectives:** investigate house crimes and pass dependency; choose justice style.  
**Reward:** banner cosmetic, Edda support node, MQ-16 ally modifier.  
**Core line:** `Ein Eid, der nur den Mächtigen dient, ist kein Eid. Es ist eine Kette mit schöner Schrift.`

### CQ-KA-01 — Keine Absolution

**Unlock:** MQ-17  
**Objectives:** confront Kael’s betrayals; hide, expose, or repayment route.  
**Reward:** dagger mod `Schuldkerbe`, Kael bond, finale smuggler lane if repayment.  
**Core line:** `Vergebung ist für Leute, die genug Brot hatten, um Moral zu üben.`

---

# Quest UI Requirements

## Quest Log Card

Each quest card must show:

- Title, ID, type, chapter, region
- Current objective and next location
- Required character/companion if any
- Extraction dependency marker
- Reward preview split into `immediate`, `on extraction`, `on completion`, `choice-based`
- Active flags/choice consequences once revealed
- Retry state if extraction failed

## In-Run Objective Tracker

Must support:

- Primary objective
- Optional objective
- Bounty objective
- Carry item state
- Protected NPC HP/panic
- Extraction state
- Failure warning

## Run Summary Quest Tab

Must show:

- Objective completed or failed
- Extraction succeeded or failed
- Rewards banked/lost
- Flags set
- NPC bond changes
- Codex entries unlocked
- Follow-up quests unlocked

# Implementation Flags Index

Core chapter flags:

- `mq00_complete` through `mq20_complete`
- `chapter_1_complete` through `chapter_7_complete`
- `hub_lanternhof_level_1`
- `fast_travel_lanterns_unlocked`
- `alchemy_unlocked`
- `werft_crafting_unlocked`
- `reliktpraegung_unlocked`
- `midgame_scherbenkrone_unlocked`

Character flags:

- `char_mira_unlocked`
- `char_tarek_unlocked`
- `char_siofra_unlocked`
- `char_brannok_unlocked`
- `char_edda_unlocked`
- `char_kael_unlocked`

Major choice flags:

- `choice_fackelruh_saved_smokehouse`
- `choice_fackelruh_saved_school`
- `choice_tarek_contract_destroyed`
- `choice_tarek_contract_bought`
- `choice_tarek_contract_public_reading`
- `choice_well_cleaned`
- `choice_well_sealed`
- `choice_well_citizen_council`
- `choice_name_full`
- `choice_name_false`
- `choice_name_silence`
- `choice_ileth_returned`
- `choice_ileth_burned`
- `choice_ileth_preserved`
- `choice_eron_speaks`
- `choice_eron_silenced`
- `choice_hoch_public_justice`
- `choice_hoch_private_compromise`
- `choice_hoch_new_council`
- `choice_kael_hidden`
- `choice_kael_exposed`
- `choice_kael_repayment`
- `finale_carry_proof`
- `finale_carry_person`
- `finale_carry_power`

# Quest QA Acceptance

- Every main quest can be started, tracked, failed, retried, and completed.
- Every extraction-dependent reward is lost if extraction fails.
- Every choice listed above changes at least one visible later dialogue, prop, vendor, route, companion line, or reward.
- No quest says only “kill X”; combat objectives always have narrative framing.
- Quest Log never hides required mechanical information for spoiler reasons.
- Dialogue choices with consequences preview consequence category, not exact spoiler.
- All companion quests can be completed before MQ-20 but are not mandatory.
- MQ-20 finale accounts for at least five major prior choices in dialogue or encounter modifiers.
