# Scherbenhimmel 20h — Region Pages

Scope: the first 20-hour single-player campaign. These pages define each region as a playable map, story space, extraction arena, quest container, and world-state system.

## Required Region Fields

Every implemented region must expose: visual identity, audio identity, hazards, enemy families, boss pool, loot bias, quest gates, extraction modifiers, world-state changes, hub impact, and codex unlocks.

---

## RG-01 — Graumarsch

**Chapters:** Prolog, Chapter 1  
**Playtime:** 0:00–4:00 plus return content  
**Tone:** wet grief, broken home, old lantern guilt  
**Main locations:** Fackelruh, Fluchtkanal, Laternenhof, Wehrmühle Halwyr, Sumpfkathedrale, Drei Dochte

### Identity

Cold green water, black reeds, grey rain, lantern-yellow halos, oil slicks, wet wheels. Before MQ-01, Fackelruh must feel inhabited: warm windows, tools, fishing nets, children, food smoke. After MQ-01, the same space becomes a trauma map: collapsed roofs, floating furniture, soot, toy glass-stars, silent docks.

### Gameplay

Starter region. Teaches movement, first combat, pickups, Echo-Lupe, hub, first boss tells, first extraction. Hazards are readable and emotional.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Tiefschlamm | Slows vehicles and enemies; heavy vehicles less affected | mud splash + speed icon |
| Laternenbrand | Burning oil patches deal DoT | orange ground telegraph |
| Erinnerungsnebel | Hides enemies until Echo-Lupe or Mira reveal | grey pulse at screen edge |
| Morschsteg | Collapses after weight/time | cracked plank highlight |

### Enemies and Bosses

Enemy families: Nachtflut-Schemen, Spiegelaal-Schwärme, Laternenlose, Archivhüter ohne Gesicht.  
Boss pool: Der Mann im Regenmantel, Archivhüter ohne Gesicht, Der Nasse Fähnrich, Mutter der Laternenwürmer.

### Loot Bias

Starter modules, low-tier Mondglas, lantern parts, mobility mods, early Scrap, first Relic Tech. Rare: `Dornfunke`, `Laternenmarke`, `Nasses Offizierssiegel`.

### Quest Gates

Fackelruh pre-destruction exists only in MQ-00. Laternenhof unlocks in MQ-03. Sumpfkathedrale requires MQ-03. Fast travel between lit lanterns requires MQ-05.

### Extraction Modifier

Small extraction zones with cover. Default hold: 30 seconds. Fog pulses can briefly hide enemy silhouettes. If Krankenstube was built first, downed-state tutorial can trigger here.

### World-State Changes

| Trigger | Change |
|---|---|
| MQ-01 complete | Fackelruh becomes burned return map |
| MQ-03 hub choice | first visible Laternenhof building appears |
| MQ-05 complete | fog retreats, fast travel opens, side quests visible |
| SQ-GR-01 complete | Aalräucherei or school memorial appears depending MQ-01 choice |

### Hub Impact and Codex

Graumarsch supplies emotional hub objects: glass star, broken lantern mark, smoke-stained ledger. Codex: Mondglas, Letzte Laternen, Fackelruh casualties, Löschprotokoll fragment.

---

## RG-02 — Sonnenglasweite

**Chapters:** Chapter 2  
**Playtime:** 4:00–7:00  
**Tone:** bright cruelty, commerce, debt as violence  
**Main locations:** Glass Road, Spiegelmarkt Azhar, Brunnenviertel, Glassenke, old salt wells

### Identity

White salt flats, copper sky, mirror plates, hard shadows, blue glass light at night. Audio: glass wind, chain stamps, auction chants, paper seals, distant storms.

### Gameplay

Introduces reputation, social solutions, convoy routes, decoy combat, exposed extractions, and storm timing.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Scherbensturm | strips shields, lowers visibility | horizon wall + storm timer |
| Spiegelboden | creates afterimages and false targets | reflection shimmer |
| Salzbrand | standing still causes DoT buildup | white crust vignette |
| Schuldanker | slows debt-marked objective carriers | chain-contract icon |

### Enemies and Bosses

Enemy families: Schuldkollektoren, Salzräuber, Spiegeltiere, Karawanen-Söldner.  
Boss pool: Noret der Schuldbuchhalter, Glasrochen Alpha, Auktionswächter Hamar.

### Loot Bias

Decoy mods, spear mods, salt shards, trade permits, glass mobility, contract artifacts. Rare: `Salzspalter`, `Fata-Morgana-Prisma`, `Ungestempelter Schuldschein`.

### Quest Gates

Spiegelmarkt requires MQ-06. Auction requires one access route in MQ-07. Brunnenviertel opens after MQ-07. Glassenke convoy opens after MQ-08.

### Extraction Modifier

Large exposed zones with long sightlines. Scherbensturm and extraction timers must both be visible. Decoys can draw enemy pressure but cannot complete extraction except Tarek’s late single-player perk.

### World-State Changes

| Trigger | Change |
|---|---|
| MQ-07 destroy debt | Zahir patrol hostility rises |
| MQ-07 buy debt | legal access improves; Tarek bond suffers |
| MQ-07 public reading | citizens aid player; auction house closes |
| MQ-08 citizen water | Brunnenviertel opens and later sends vendor to hub |

### Hub Impact and Codex

Trade route adds rotating Shop inventory. Mina can become vendor. Codex: Erinnerungsschuld, Karawanenhaus Zahir, Spiegelmarkt law, Glasrochen migration.

---

## RG-03 — Wurzelwald Nhal

**Chapters:** Chapter 3  
**Playtime:** 7:00–10:00  
**Tone:** beautiful body horror, memory ecology, names as living things  
**Main locations:** Waldsaum, Silberraunen, Tränenbecken, Wurzelgarten, Harzpfad

### Identity

Moss green, resin gold, violet fungi, huge roots, carved name-ribbons. Audio: wooden resonance, choral hums, sap drips, whispered names.

### Gameplay

Introduces traps, alchemy, name-state quests, identity enemies, anti-illusion reads, and terrain-preparation combat.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Harzsee | sticky slow zone; can be ignited | gold ripple |
| Namenloser Nebel | hides names and quest markers | nameplate glitch |
| Wurzelgriff | roots grab after telegraph | ground pulse lines |
| Pilzatem | confusion / inverted input if ignored | purple spore ring |

### Enemies and Bosses

Enemy families: Namenshüllen, Harzläufer, Wurzelwächter, Chorbruch.  
Boss pool: Die Tochter ohne Mund, Der Namenlose Garten, Chorbruch-Matronin.

### Loot Bias

Trap modules, healing zones, alchemy materials, anti-illusion sigils, Siofra gear. Rare: `Ileths Name`, `Harzfänger-Kern`, `Silberraunenbogen`.

### Quest Gates

Entry after MQ-09. Silberraunen requires MQ-10 name choice. Wurzelgarten requires three MQ-11 investigation anchors.

### Extraction Modifier

Roots cut the zone into safe lanes. Traps can create micro-safe pockets. If the player gave a full name in MQ-10, extraction illusions use personal dialogue.

### World-State Changes

| Trigger | Change |
|---|---|
| MQ-10 full name | later illusions know personal details |
| MQ-10 false name | fewer personal illusions, lower Siofra trust |
| MQ-11 name returned | Ileth appears, forest hazards become harder |
| MQ-11 name burned | routes stabilize, Siofra grief scenes unlock |
| MQ-11 name preserved | finale defensive relic option unlocks |

### Hub Impact and Codex

Alchemy table, greenhouse/memorial options, Siofra camp scenes. Codex: Wurzelchor, Namenfraß, Ileth state, Harzbindung.

---

## RG-04 — Eisenbrandküste

**Chapters:** Chapter 4  
**Playtime:** 10:00–13:30  
**Tone:** labor struggle, sea storm, cult sincerity, rust and thunder  
**Main locations:** Eisenbranddock, Werftzünfte, Sturmbrücke, Unterpier, Tiefenglocke chapel

### Identity

Rust red, black coal, storm blue, giant cranes, sparks in rain, shipbone silhouettes. Audio: harbor bells, chains, gulls, worker songs, thunder, underwater chanting.

### Gameplay

Introduces heavy pull/control, dock hazards, crafting politics, industrial encounters, and extraction push-out danger.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Kranhaken | sweeping lane hazard; can hit enemies | red hook shadow |
| Sturmflut | periodic wave pushes entities | siren cue |
| Funkenregen | falling sparks ignite oil | orange rain telegraph |
| Tiefenklang | slow/fear near bells | bell meter |

### Enemies and Bosses

Enemy families: Dockschläger, Rostkrabben, Tiefenglocken-Jünger, Zunftbrecher.  
Boss pool: Malrec & Tiefenglocke, Eron Reef, Kranhexe-Prototyp.

### Loot Bias

Harpoons, armor, crafting resources, repair modules, heavy vehicle parts, Brannok gear. Rare: `Bruderhaken`, `Werftbrief`, `Glockenstahl`.

### Quest Gates

Dock access after MQ-12. Unterpier after worker/zünfte decision. Tiefenglocke chapel after Brannok thread or investigation.

### Extraction Modifier

Sturmflut can push players out of zone. UI must show wave warning. Brannok’s anchors and Edda’s later banners counter this.

### World-State Changes

| Trigger | Change |
|---|---|
| Support workers | cheaper crafting, stronger dock hostility |
| Support zünfte | safer docks, higher shop prices |
| Let Eron speak | cult recruitment lowers, workers split |
| Silence Eron | Brannok bond shifts, cult becomes violent |

### Hub Impact and Codex

Werft crafting upgrades, repair cranes, Brannok scenes. Codex: Werftzünfte, Tiefenglocke, labor oaths, storm salvage.

---

## RG-05 — Hochkamm der Eidwacht

**Chapters:** Chapter 5  
**Playtime:** 13:30–16:00  
**Tone:** snow, law, noble rot, honor as weapon  
**Main locations:** Weißzahnpass, Falkenlicht keep, oath courts, avalanche road

### Identity

Snow white, falcon red, silver banners, black cliffs, thin air. Audio: wind, falcons, paper, bells, boots on snow.

### Gameplay

Introduces faction decision pressure, banner protection, convoy/political routes, avalanche hazards, and public-duel structure.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Lawinenbruch | delayed area collapse | snow crack lines |
| Eidkreis | buffs enemies unless broken by objective | silver rune circle |
| Höhenwind | pushes light vehicles | wind arrow overlay |
| Spiegelprozess | false testimony illusions | UI witness flicker |

### Enemies and Bosses

Enemy families: Eidwächter, Falkenreiter, Silberknechte, Prozess-Schemen.  
Boss pool: Fall der Falkenlinie, Der Zeuge aus Silber, Weißzahn-Convoy Captain.

### Loot Bias

Banner modules, armor/support nodes, silver relics, Edda gear, oath/counter-oath mods. Rare: `Standarte der Stillen`, `Falkensiegel`, `Passrecht`.

### Quest Gates

Hochkamm opens after Eisenbrand main resolution. Falkenlicht keep requires Edda trust or political access.

### Extraction Modifier

Extraction zone can be split by avalanche lanes. Banner protection can extend grace period by 1 second if unlocked.

### World-State Changes

| Trigger | Change |
|---|---|
| Expose house publicly | pass unrest, justice morale up |
| Private compromise | pass remains safe, Edda distrust rises |
| New council | hard fight, best long-term hub route |

### Hub Impact and Codex

Pass trade, Edda quarters, banner forge. Codex: Eidwacht, Haus Falkenlicht, Passrecht, silver courts.

---

## RG-06 — Dunkelgrund

**Chapters:** Chapter 6  
**Playtime:** 16:00–18:30  
**Tone:** underworld, guilt economy, second names, relic machinery  
**Main locations:** Rußmarkt, Schacht Null, Pilzbahnhof, Maschinenkapelle

### Identity

Coal black, mushroom neon, lava cracks, candle markets, rails, masks. Audio: chains, carts, drops, machinery prayers, market haggling.

### Gameplay

Introduces high-risk elite enemies, Reliktprägung, stealth/interruption, moral ambiguity, and dense underground arenas.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Rußwolke | lowers accuracy/reveal | black edge smoke |
| Schachtzug | fast rail hazard | rail bell + light |
| Reliktdruck | unstable Tech pulses damage if carried too long | Tech pressure meter |
| Pilzlicht | reveals hidden paths but attracts enemies | neon glow |

### Enemies and Bosses

Enemy families: Schachtknechte, Rußschneider, Maschinenpilger, Reliktjäger.  
Boss pool: Sankt Ival Maschinenheiliger, Der Schrottkönig, Kaels Alter Gläubiger.

### Loot Bias

Relic tech, poison/debuff tools, stealth mods, underground vehicle parts, Kael gear. Rare: `Schuldkerbe`, `Reliktprägekern`, `Zweiter Name`.

### Quest Gates

Dunkelgrund after Hochkamm pass resolution. Schacht Null requires Rußmarkt trust or Kael contact.

### Extraction Modifier

Extraction may require carrying unstable Tech into the zone. Meter must be visible. If meter overfills, Tech explodes and becomes lost unless stabilized by objective.

### World-State Changes

| Trigger | Change |
|---|---|
| Hide Kael | Rußmarkt helps, companion trust divided |
| Expose Kael | justice path, harder Kael unlock |
| Make Kael repay | best long-term route, hardest combat |

### Hub Impact and Codex

Reliktprägung, underground vendor, Kael scenes. Codex: Rußmarkt, Schacht Null, second names, machine saints.

---

## RG-07 — Asterhof / Scherbenkrone-Vorstufe

**Chapters:** Chapter 7 finale  
**Playtime:** 18:30–20:00  
**Tone:** truth, glass, betrayal, midgame opening  
**Main locations:** Asterhof approach, floating archive road, Sereth gate, broken witness court

### Identity

Floating walls, glass dust, inverted stars, voices from earlier NPCs saying impossible things. Audio: reversed bells, heartbeat bass, archived whispers, sudden silence.

### Gameplay

Final 20h pressure test: combines extraction, story choices, boss phases, companion consequences, and route decisions.

### Hazards

| Hazard | Behavior | UI cue |
|---|---|---|
| Scherbenfall | falling shards split lanes | sky glint + shadow |
| Falsche Stimme | fake objective callouts | red subtitle underline |
| Archivbruch | rewrites enemy type mid-wave | glass page turn |
| Serethblick | marks player, increases Tech risk | eye glyph |

### Boss / Elite Pool

Sereths Hand is the main finale boss. Echoes of prior bosses can appear as phase memories depending on player choices.

### Loot Bias

Finale Tech, midgame unlock keys, truth codex entries, character cosmetics. Rare: `Sereth-Splitter`, `Asterhof-Schlüssel`, `Fackelruh-Protokoll`.

### Extraction Modifier

Final extraction is story extraction: player must choose what to carry out: proof, person, or power. This determines the chapter-end consequence path.

### World-State Changes

| Finale carry-out | Consequence |
|---|---|
| Proof | Letzte Laternen trust breaks, truth path opens |
| Person | save key NPC, lose some archive proof |
| Power | more Tech and midgame strength, moral fallout |

### Hub Impact and Codex

Laternenhof changes tone. Ivara confrontation unlocks. Midgame loop opens with Scherbenkrone route. Codex: Sereth, Asterhof, Fackelruh truth, first endgame lead.

## Region QA Checklist

- Region unlock flag and map marker appear at correct quest step.
- Hazards have readable telegraphs and tooltips.
- Extraction modifier appears in Deploy preview and during run.
- Loot bias is reflected in reward tables.
- World-state changes alter at least one visible NPC, prop, route, vendor, or dialogue.
- Codex entries unlock without spoilers before trigger.

## Vertical Slice Add-on: Graumarsch - Chemiefabrik
- Instance ID: 
- Hazards: , 
- Boss pool add-on: 
- Loot bias: +tech cache probability, -scrap crates
- Extraction modifier: enemy pressure +10% while extraction channeling
- Active content links: , 

## Vertical Slice Add-on: Graumarsch - Chemiefabrik
- Instance ID: graumarsch-chemiefabrik
- Hazards: haz_chemfog_tick, haz_overpressure_valve
- Boss pool add-on: boss_chemwarden
- Loot bias: +tech cache probability, -scrap crates
- Extraction modifier: enemy pressure +10% while extraction channeling
- Active content links: SQ-GM-01, bounty_chemfog_blackout

## Runtime Sync Snapshot (2026-04-26)
- Runtime area definitions include `graumarsch`, `sonnenglasweite`, `wurzelwald-nhal`, plus `graumarsch-chemiefabrik` as active extended instance.
- Area contracts now include progress state + state label key + available modes when cleared; these fields are authoritative for deploy/map UI state.
- Free-run and bounty availability are driven from area progress state and must remain domain-driven (not UI-local logic).
