# Scherbenhimmel 20h — Character Pages

Scope: first 20 hours of the single-player Scherbenhimmel experience. This file defines the playable roster, companion roles, exact unlock moments, gameplay fantasy, story arc, ability kit, quest integration, reward hooks, tutorial needs, and implementation notes.

## Character Page Format

Each character must be represented in UI, data, quest scripting, codex, and QA with:

- Stable ID
- Display name
- Role and difficulty
- Unlock chapter / quest
- Vehicle affinity
- Weapon fantasy
- Passive, Technique, Ultimate
- Status effects applied or consumed
- Duo synergy hooks
- Skill-tree branches for the first 20h
- Tutorial encounter
- Companion quest
- Key dialogue voice
- Rewards and cosmetics
- Fail/edge states

---

## CH-01 — Lyra Dorn

**ID:** `char_lyra_dorn`  
**Unlock:** Start character, Prolog MQ-00  
**Role:** Duelist / Interceptor / Starter DPS  
**Difficulty:** 2/5  
**Vehicle affinity:** Dornwolf  
**Weapon affinity:** Doppelklinge + Funkenpistole  
**Narrative theme:** Rache vs Verantwortung  
**Combat promise:** Fast, readable, aggressive. Lyra teaches movement, dodge timing, close-range burst, and first extraction pressure.

### UI Card

**Short text:** Überlebende von Fackelruh. Klingen, Pistole, Mondbrand und riskante Nahkampffenster.  
**Long text:** Lyra gewinnt Kämpfe, indem sie Gegner markiert, schnell die Flanke wechselt und mit Funkenstoß Mondglasadern überlädt. Sie ist nicht zerbrechlich, aber Fehler werden bestraft: wer stehen bleibt, stirbt.

### Kit

**Passive — Dornherz**  
Lyra erhält +8% Bewegungstempo für 2.5 Sekunden, wenn sie einem Angriff knapp entgeht oder einen markierten Gegner tötet. Stackt bis 3, fällt einzeln ab.

**Basic — Grundkette**  
Kurze Klingenserie vor dem Fahrzeug. Jeder dritte Treffer setzt 1 Stack `Mondbrand`.

**Technique — Funkenstoß**  
Kurzer gerichteter Pistolenschuss. Trifft der Schuss einen Gegner mit Mondbrand, springt ein Funke auf bis zu 3 nahe Gegner über. Gegen Nachtflut-Gegner zusätzlich kurzer Stun.

**Ultimate — Hausbrand**  
Lyra rammt beide Klingen in Mondglas-Splitter am Boden. Nach 0.8 Sekunden detoniert ein Kreis. Schaden skaliert mit aktiven Mondbrand-Stacks im Umkreis. Danach ist Lyra 1.2 Sekunden verwundbar; UI muss das Risiko zeigen.

**Status:** applies `Mondbrand`, benefits from `Siegelriss`, `Schuldmarke`.

### 20h Skill Branches

**A: Klingen im Regen** — reliable starter DPS  
- A1: Grundkette +1 Meter Reichweite.
- A2: Dritter Treffer zieht kleine Gegner leicht heran.
- A3: Hausbrand hinterlässt 4 Sekunden Glutspur.

**B: Funkenlesen** — status/synergy  
- B1: Funkenstoß springt +1 Mal.
- B2: Mondbrand-Gegner zeigen Schwachpunktpfeile.
- B3: Funkenstoß gegen Siegelriss erzeugt Mini-Explosion.

**C: Nicht zurücksehen** — mobility/survival  
- C1: Dornherz hält +1 Sekunde.
- C2: Nitro-Dash entfernt Slow.
- C3: Bei tödlichem Schaden einmal pro Run 1 HP, 2 Sekunden Speed, aber Tech-Drop-Magnetismus wird 10 Sekunden deaktiviert.

### Story Arc

Lyra beginnt als Dorftochter mit Wut. MQ-01 zerstört Fackelruh und bindet ihre Motivation an den Mann im Regenmantel. MQ-04 zeigt, dass das Zeichen in Fackelruh kein Naturphänomen war, sondern ein Löschprotokoll. Im Finale MQ-19 erfährt Lyra, dass ihr Vater nicht nur Opfer war: Er half, ein Archiv zu versiegeln.

### Companion Quest

**CQ-LY-01 — „Was man aus brennenden Häusern trägt“**  
Unlock: nach MQ-03. Lyra will drei Gegenstände aus Fackelruh bergen. Kein großer Boss; Schmerzquest.  
Reward: Garage-Deko `Tomas Glasstern`, passive Codex-Kategorie „Fackelruh“.  
Choice: Gegenstände ausstellen oder privat in Lyras Zimmer lassen. Öffentlich erhöht NPC-Moral, privat erhöht Lyra-Bindung.

### Tutorial Need

Tutorial must cover: movement, basic chain, Funkenstoß, Mondbrand, extraction hold. Lyra is the default first-run tutorial.

### Voice Rules

Short sentences. Dry humor. Rarely says what she feels. When she is afraid, she becomes practical.

---

## CH-02 — Mira Voss

**ID:** `char_mira_voss`  
**Unlock:** MQ-04 „Die Sumpfkathedrale“  
**Role:** Runebringer / Controller / Seal DPS  
**Difficulty:** 4/5  
**Vehicle affinity:** Archivspinne  
**Weapon affinity:** Runenklingen  
**Narrative theme:** Wahrheit um jeden Preis vs Verantwortung für Folgen  
**Combat promise:** Mira controls space, reveals hidden mechanics, and makes enemies vulnerable for allies.

### Kit

**Passive — Archivblick**  
Hidden weak points, traps, and illusion enemies reveal 1.5 seconds earlier. Against revealed enemies, Mira deals +10% damage.

**Basic — Runenschnitt**  
Medium-range blade arc. Consecutive hits build `Siegelriss`.

**Technique — Siegelbruch**  
Places a glyph field for 6 seconds. Enemies inside are slowed and gain `Siegelriss`. If a boss crosses the boundary, the next phase tell is extended by 0.5 seconds.

**Ultimate — Palimpsest**  
Rewrites the last 4 seconds of battlefield marks: all active seals pulse, dealing damage and refreshing their duration. Does not rewind HP or player position.

### 20h Skill Branches

**A: Kaltes Archiv** — control  
- A1: Siegelbruch radius +15%.
- A2: First enemy entering seal is rooted.
- A3: Seals remain as weak slow zones after expiring.

**B: Verbotene Lesart** — reveal/lore  
- B1: More hidden pickups shown.
- B2: Codex unlock chance from bosses +1 roll.
- B3: Revealed elites drop +5% Tech if extracted.

**C: Schnitt im Siegel** — duo DPS  
- C1: Lyra hitting a sealed target spreads Mondbrand.
- C2: Tarek decoys inside seals explode on death.
- C3: Seal pulse grants allies 1 second damage reduction.

### Story Arc

Mira is rescued from a seal she may have helped design. She knows the term „Löschprotokoll“ and hides that Sereth’s voice has reached her before. Her arc is not betrayal for shock value; it is fear that telling the truth too early destroys the group.

### Companion Quest

**CQ-MI-01 — „Randnotizen einer Lügnerin“**  
Mira asks the player to recover three torn archive leaves. Each contradicts her previous version of Fackelruh.  
Reward: Technique mod `Doppeltes Siegel`.  
Final choice: force confession at campfire, keep it private, or archive it in Codex. This changes Lyra/Mira banter.

### Tutorial Need

Must teach field placement, reveal mechanics, seal duration, and combo with Lyra.

---

## CH-03 — Tarek al-Sahir

**ID:** `char_tarek_al_sahir`  
**Unlock:** MQ-07 „Der Preis des Salzes“  
**Role:** Deceiver / Skirmisher / Decoy Utility  
**Difficulty:** 3/5  
**Vehicle affinity:** Glasfuchs  
**Weapon affinity:** Speer  
**Narrative theme:** Schuld, Charme, Flucht  
**Combat promise:** Tarek survives by misdirection, repositioning, and converting enemy aggression into opportunity.

### Kit

**Passive — Schuldlächeln**  
When an enemy switches target from Tarek to a decoy or ally, Tarek gains a short crit window against that enemy.

**Basic — Speerzirkel**  
Forward thrust with wide return sweep. Bonus damage from behind or against distracted targets.

**Technique — Fata Morgana**  
Creates a decoy that taunts nearby enemies. On destruction, applies `Schuldmarke` and drops salt shards.

**Ultimate — Vertrag brechen**  
Consumes all active Schuldmarken in an area. Marked enemies take burst damage; if at least 5 marks are consumed, Tarek refunds part of the cooldown.

### 20h Skill Branches

**A: Spiegeltrick** — decoy  
- A1: Decoy lasts +2 seconds.
- A2: Decoy mimics last movement direction.
- A3: Decoy explosion blinds elites briefly.

**B: Schuldzins** — mark scaling  
- B1: Schuldmarke duration +3 seconds.
- B2: Marked enemies take +5% from allies.
- B3: Vertrag brechen drops bonus Scrap per elite mark consumed.

**C: Keine Zeugen** — mobility  
- C1: Nitro after decoy grants stealth frame.
- C2: Backstab hits reduce Technique cooldown.
- C3: Extraction-zone decoy contest counts as player presence for 2 seconds in single-player only.

### Story Arc

Tarek stole to undo a debt system that already ate his life. MQ-07 lets the player decide whether law, truth, or violence frees him. His humor should never erase the damage he caused.

### Companion Quest

**CQ-TA-01 — „Zinsen auf Namen“**  
Track three people harmed by Tarek’s old betrayal. No perfect apology.  
Reward: Spear skin `Glasreue`, passive branch unlock.  
Choice: public apology, private repayment, or document evidence against Zahir.

---

## CH-04 — Siofra Nhal

**ID:** `char_siofra_nhal`  
**Unlock:** MQ-11 „Ein Garten, der Namen frisst“  
**Role:** Trapbinder / Ranger / Bio-Control  
**Difficulty:** 4/5  
**Vehicle affinity:** Moorkäfer  
**Weapon affinity:** Harzbogen  
**Narrative theme:** Pflicht zum Kollektiv vs Liebe zu Einzelnen  
**Combat promise:** Siofra prepares terrain, controls lanes, and turns danger zones into healing zones.

### Kit

**Passive — Wurzelgedächtnis**  
Standing near traps or natural hazards grants aim stability and minor regen. Trap kills extend this buff.

**Basic — Harzpfeil**  
Projectile that slows on hit. Repeated hits build `Harzbindung`.

**Technique — Harzfänger**  
Places a sticky trap. Enemies are rooted; allies inside receive small healing pulses.

**Ultimate — Chor der tiefen Wurzeln**  
Creates a large root field that pulls enemies toward planted traps and detonates all Harzbindungen at the end.

### Skill Branches

**A: Fallenstellerin** — trap density  
**B: Heilschlamm** — sustain  
**C: Namensholz** — quest/codex synergy and anti-illusion tools

### Companion Quest

**CQ-SI-01 — „Der Name, den du behältst“**  
After MQ-11, Siofra questions whether the Chor owns her name. The player collects three private memories she never gave to the roots.  
Reward: Harzfänger mod `Eigener Boden`.

---

## CH-05 — Brannok Reef

**ID:** `char_brannok_reef`  
**Unlock:** MQ-13 „Dock aus Eisenbrand“  
**Role:** Harpooner / Bruiser / Pull-Control  
**Difficulty:** 3/5  
**Vehicle affinity:** Riffbrecher  
**Weapon affinity:** Ankerklinge  
**Narrative theme:** Wut, Bruderliebe, Loyalität  
**Combat promise:** Brannok turns positioning into damage: pull small targets, launch toward large ones, interrupt dangerous casts.

### Kit

**Passive — Schwerer Anker**  
Cannot be displaced by small enemies during attacks. Successful interrupts grant temporary armor.

**Basic — Ankerhieb**  
Slow cleave with stagger.

**Technique — Ankerzug**  
Harpoon. Pulls small/medium enemies to Brannok; against bosses, pulls Brannok to anchor point and triggers impact armor.

**Ultimate — Tiefenglocke schweigt**  
Wide slam that interrupts all non-boss casts and heavily damages enemies recently pulled.

### Companion Quest

**CQ-BR-01 — „Eron singt nicht mehr“**  
Brannok’s brother joined the Tiefenglocke cult. Player can expose, rescue, or let Eron speak at the dock assembly.  
Reward: Harpoon mod `Bruderhaken`.

---

## CH-06 — Edda Falkenlicht

**ID:** `char_edda_falkenlicht`  
**Unlock:** MQ-15 „Falken ohne Himmel“  
**Role:** Banner-Knight / Tank / Support  
**Difficulty:** 3/5  
**Vehicle affinity:** Eidpanzer  
**Weapon affinity:** Grossschwert  
**Narrative theme:** Pflicht vs Gerechtigkeit  
**Combat promise:** Edda creates safe ground and turns extraction holds into dramatic last stands.

### Kit

**Passive — Eidlast**  
Damage taken near allies charges Standarte faster. If Edda blocks lethal damage for an ally, she gains `Eidmarke`.

**Basic — Breiter Eid**  
Slow broad slash. Bonus threat.

**Technique — Standarte der Stillen**  
Plants a banner that grants armor to allies, weakens oathbreaker enemies, and slows contesting enemies in extraction.

**Ultimate — Urteil des Passes**  
Edda calls a line of falling silver banners. Enemies crossing take damage and lose buffs.

### Companion Quest

**CQ-ED-01 — „Der Eid, der niemandem gehört“**  
Investigate her house’s crimes without collapsing the pass economy.  
Reward: Banner cosmetic and Tech-Lab support node.

---

## CH-07 — Kael Nhar

**ID:** `char_kael_nhar`  
**Unlock:** MQ-17 „Schacht Null“  
**Role:** Poison-Rogue / Assassin / Debuff Mastery  
**Difficulty:** 5/5  
**Vehicle affinity:** Schachtmaus  
**Weapon affinity:** Dolche  
**Narrative theme:** Selbstschutz vs Opferbereitschaft  
**Combat promise:** Kael is precise, cruel, and rewarding: interrupt, poison, vanish, punish elites.

### Kit

**Passive — Kein zweiter Name**  
Kael gains bonus damage against enemies currently casting, shielded, or marked by another status. Taking damage removes this bonus briefly.

**Basic — Doppelschnitt**  
Two quick strikes. From behind applies `Rostbruch`.

**Technique — Rußschnitt**  
Short dash-slash that interrupts casts and applies heavy `Rostbruch` if timed during enemy wind-up.

**Ultimate — Schacht ohne Zeugen**  
Kael marks up to 5 enemies in a cone. After 1 second he reappears behind each marked target for a chain strike. Bosses count as one target and receive debuff amplification instead.

### Companion Quest

**CQ-KA-01 — „Keine Absolution“**  
Kael names the people he sold out. The player decides whether to hide him, expose him, or make him repay the Rußmarkt.  
Reward: Dagger mod `Schuldkerbe` and alternate campfire stance.

---

## Important Non-Playable 20h NPCs

### Mara Esch

Schifferin, practical rescuer, first transport backbone. Bonus: +5% overworld/travel speed. Acts as Deploy narrator for Graumarsch and later runs convoy logistics.

### Jorik Dammwächter

Veteran, damaged conscience, armor mentor. Bonus: +2 base armor after recruitment. Knows the old Laternen protocols but avoids naming them.

### Meisterin Ivara

Leader of the Letzten Laternen. Warm, competent, manipulative when afraid. Must never be written as a simple villain in the first 20h. Her lie: she knew Fackelruh’s archive risk existed.

### Oren Vale

Healer monk. Non-playable in first 20h but visible as future support character. Handles Krankenstube upgrades, grief scenes, revive tutorial.

### Mina vom Spiegelmarkt

Forger, social-route contact in Sonnenglasweite. Introduces economic oppression without exposition dumps. Can become a Laternenhof vendor if aided.

### Ileth

The forgotten child of Wurzelwald. Her state depends on MQ-11 decision: visible NPC, relic name, or absent memorial.

### Eron Reef

Brannok’s brother. Member of Tiefenglocke cult by conviction, not brainwashing. Used to complicate dock conflict.

## QA Checklist for Characters

- Unlock flag appears at correct quest completion.
- Character card changes from locked to playable.
- Tutorial prompt appears once and can be replayed from Codex.
- Passive is visible in Roster and active in combat.
- Technique and Ultimate show cooldown and failure reasons.
- Character-specific status effects display icon and tooltip.
- Companion quest starts only after unlock and required trust.
- Run Summary attributes stats to character abilities.
- Dialogue variants account for major choices that affect that character.
