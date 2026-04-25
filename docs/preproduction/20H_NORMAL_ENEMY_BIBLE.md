# Scherbenhimmel 20h - Normal Enemy Bible

Source-of-truth scope: This document defines the standard non-elite combat enemies for each campaign biome/area in the 20h preproduction scope.

Parent authority docs:
- `20H_REGION_PAGES.md` owns region fantasy, hazards, and boss pools.
- `20H_AREA_PROGRESSION_MODEL.md` owns campaign progression and area unlock order.
- `20H_CONTENT_DATABASE_SCHEMA_AND_SEEDS.md` owns data shape and seed integration.

This file only covers normal enemy archetypes (trash/standard units), not bosses and not unique elites.

## Design Contract

Every area must ship with at least 3 normal enemy archetypes that satisfy:
- one frontline pressure archetype (close range or lane denial)
- one ranged or harassment archetype
- one utility/control archetype (debuff, reposition, summon, shield, objective pressure)

Combat readability contract for every normal enemy:
- max 2 signature attacks per archetype in the first encounter chapter
- telegraph lead time >= 450 ms for heavy hits
- weak point or punish window is visible in silhouette and animation
- hazard interactions are explicit (enemy either ignores, exploits, or is punished by a hazard)

## Area Progression Difficulty Bands

| Area ID | Intended chapter window | Normal enemy threat band | Spawn pressure guideline |
|---|---|---|---|
| `area_graumarsch` | MQ-00 to MQ-05 | Tier 1 | low to medium, onboarding waves |
| `area_sonnenglasweite` | MQ-06 to MQ-09 | Tier 2 | medium, open sightline pressure |
| `area_wurzelwald_nhal` | MQ-10 to MQ-11 | Tier 3 | medium-high, control and traps |
| `area_eisenbrandkueste` | MQ-12 to MQ-14 | Tier 3.5 | high, push and displacement |
| `area_hochkamm_eidwacht` | MQ-15 to MQ-16 | Tier 4 | high, formation and buffs |
| `area_dunkelgrund` | MQ-17 to MQ-18 | Tier 4.5 | high, burst and disruption |
| `area_asterhof` | MQ-19 to MQ-20 | Tier 5 | finale pressure, mixed memory packs |

## Biome Enemy Catalog (Normal)

### RG-01 Graumarsch (`area_graumarsch`)

#### `enemy_gr_nightflood_shade`
- Role: melee flanker
- Family: Nachtflut-Schemen
- Readability: tall drowned silhouette, lantern-eye glow, dragging gait then burst lunge
- Signature actions:
  - Mire Lunge: short dash strike, punishable on miss
  - Drown Grasp: close snare for 1.0s if player is in mud
- Hazard interaction: gains move speed in `Tiefschlamm`, takes bonus stagger in `Laternenbrand`
- Spawn weight: 0.45

#### `enemy_gr_lanternless_raider`
- Role: mid-range pressure
- Family: Laternenlose
- Readability: scavenger rifle + oil flask silhouette
- Signature actions:
  - Oil Pitch: throws ignitable patch, low direct damage
  - Panic Shot: inaccurate burst while retreating
- Hazard interaction: can ignite `Laternenbrand`; reduced accuracy in `Erinnerungsnebel`
- Spawn weight: 0.35

#### `enemy_gr_mire_skitter`
- Role: utility/disruption
- Family: Spiegelaal-Schwärme (small skitter variant)
- Readability: low profile eel-crab hybrid, reflective spine strip
- Signature actions:
  - Skitter Arc: fast lateral hop to objective line
  - Static Nibble: short interrupt bite that cancels channel if unbroken
- Hazard interaction: ignores `Morschsteg` collapse warning, vulnerable to splash damage
- Spawn weight: 0.20

### RG-02 Sonnenglasweite (`area_sonnenglasweite`)

#### `enemy_sg_debt_collector`
- Role: frontline enforcer
- Family: Schuldkollektoren
- Readability: shield ledger, chain-spear, contract seals hanging from armor
- Signature actions:
  - Seal Bash: forward shove with armor break chip
  - Debt Mark: applies short slow if hit from front
- Hazard interaction: stable in `Scherbensturm`, reduced turn rate on `Spiegelboden`
- Spawn weight: 0.40

#### `enemy_sg_salt_raider`
- Role: ranged harassment
- Family: Salzräuber
- Readability: light cloak, salt-blaster, mirrored goggles
- Signature actions:
  - Saltburst Volley: cone spray that stacks minor chip
  - Dune Slide: sideways dash before firing
- Hazard interaction: takes self-chip when standing in active `Salzbrand` too long
- Spawn weight: 0.35

#### `enemy_sg_mirror_hound`
- Role: utility/chaser
- Family: Spiegeltiere
- Readability: quadruped glass-hide beast with split reflection trail
- Signature actions:
  - Reflection Feint: spawns one fake image for 2.5s
  - Hamstring Bite: brief mobility debuff
- Hazard interaction: gains extra clone in `Spiegelboden`; fragile in storms
- Spawn weight: 0.25

### RG-03 Wurzelwald Nhal (`area_wurzelwald_nhal`)

#### `enemy_wn_name_husk`
- Role: melee control
- Family: Namenshüllen
- Readability: bark-wrapped humanoid with carved blank nameplate
- Signature actions:
  - Name Scrape: short silence on player ability buttons
  - Root Jab: medium poke with long recovery
- Hazard interaction: immune to `Namenloser Nebel` confusion; burns in ignited `Harzsee`
- Spawn weight: 0.40

#### `enemy_wn_resin_runner`
- Role: ranged trapper
- Family: Harzläufer
- Readability: lean scout silhouette, resin canisters and dart tube
- Signature actions:
  - Resin Dart: marks ground with sticky patch
  - Spore Puff: low damage blind pulse
- Hazard interaction: empowered around natural `Harzsee`, weak in open dry lanes
- Spawn weight: 0.35

#### `enemy_wn_root_warden`
- Role: utility anchor
- Family: Wurzelwächter
- Readability: heavy tree-plate body, rooted feet animation
- Signature actions:
  - Rootline Snare: telegraphed line snare from ground
  - Bark Guard: temporary frontal damage reduction aura
- Hazard interaction: can trigger `Wurzelgriff` faster; slow target for back attacks
- Spawn weight: 0.25

### RG-04 Eisenbrandkueste (`area_eisenbrandkueste`)

#### `enemy_ei_dock_bruiser`
- Role: frontline bruiser
- Family: Dockschläger
- Readability: heavy dock armor, chain gauntlet, hook shoulder
- Signature actions:
  - Hook Yank: short pull toward danger lane
  - Bilge Slam: ground shockwave cone
- Hazard interaction: knockback combo with `Sturmflut`; vulnerable during whiffed yank
- Spawn weight: 0.40

#### `enemy_ei_bell_disciple`
- Role: ranged pressure
- Family: Tiefenglocken-Jünger
- Readability: bell harness backpack, sonar lantern helm
- Signature actions:
  - Bell Pulse: delayed circular hit ring
  - Tide Beacon: marks extraction edge for pressure wave
- Hazard interaction: amplifies `Tiefenklang`, interrupted by direct stun
- Spawn weight: 0.30

#### `enemy_ei_guild_breaker`
- Role: utility anti-cover
- Family: Zunftbrecher
- Readability: saw-pole weapon, demolition satchel silhouette
- Signature actions:
  - Brace Splitter: destroys light cover pieces
  - Spark Net: short root on vehicles
- Hazard interaction: can ignite `Funkenregen` oil pools; poor mobility in flooded lanes
- Spawn weight: 0.30

### RG-05 Hochkamm der Eidwacht (`area_hochkamm_eidwacht`)

#### `enemy_hk_oath_guard`
- Role: frontline formation
- Family: Eidwächter
- Readability: tower shield and oath ribbon pennants
- Signature actions:
  - Oath Wall: temporary linked shield with nearby guard
  - Verdict Thrust: armor-piercing spear poke
- Hazard interaction: receives buff in active `Eidkreis`; exposed from rear arc
- Spawn weight: 0.40

#### `enemy_hk_falcon_lancer`
- Role: mobile ranged diver
- Family: Falkenreiter
- Readability: polearm + falcon drone silhouette
- Signature actions:
  - Falcon Mark: reveals player briefly through light cover
  - Lancer Dive: diagonal leap strike
- Hazard interaction: displacement increased by `Hoehenwind`
- Spawn weight: 0.30

#### `enemy_hk_silver_thrall`
- Role: utility illusion pressure
- Family: Prozess-Schemen / Silberknechte support
- Readability: mirrored court mask, silver chains around wrists
- Signature actions:
  - Testimony Echo: delayed clone attack line
  - Chain Censure: short-range interrupt whip
- Hazard interaction: stronger during `Spiegelprozess`, low poise outside it
- Spawn weight: 0.30

### RG-06 Dunkelgrund (`area_dunkelgrund`)

#### `enemy_dg_shaft_laborer`
- Role: melee disruptor
- Family: Schachtknechte
- Readability: mining exo-frame, ore hammer, soot lamp
- Signature actions:
  - Rail Ram: shoulder charge in straight line
  - Burden Swing: slow heavy arc with large stagger
- Hazard interaction: pathfinds around `Schachtzug` lines better than other units
- Spawn weight: 0.35

#### `enemy_dg_soot_cutter`
- Role: ranged assassin
- Family: Rußschneider
- Readability: twin cutter blades, smoke cloak emitter
- Signature actions:
  - Soot Burst: short invisibility plus flank step
  - Throatline Toss: fast projectile causing brief anti-heal
- Hazard interaction: thrives in `Rußwolke`; revealed by `Pilzlicht`
- Spawn weight: 0.35

#### `enemy_dg_relic_hunter`
- Role: utility objective pressure
- Family: Reliktjäger / Maschinenpilger overlap
- Readability: relic siphon backpack and grabbing claw arm
- Signature actions:
  - Tech Siphon: drains objective progress if uninterrupted
  - Pressure Spike: detonates unstable tech residue
- Hazard interaction: empowered by `Reliktdruck`, fragile if siphon is interrupted
- Spawn weight: 0.30

### RG-07 Asterhof (`area_asterhof`)

#### `enemy_as_archive_echo`
- Role: frontline memory echo
- Family: Asterhof memory entities
- Readability: fractured silhouette mixing prior faction traits
- Signature actions:
  - Echo Cleave: replay of a previously seen attack pattern
  - False Recover: fake stagger bait into counter
- Hazard interaction: can mutate via `Archivbruch`
- Spawn weight: 0.40

#### `enemy_as_shard_bailiff`
- Role: ranged lane control
- Family: Scherbenkrone tribunal remnants
- Readability: floating shard gavel and split robes
- Signature actions:
  - Verdict Volley: shard spread with lane denial
  - Seal of Silence: short cast lock zone
- Hazard interaction: stronger when `Serethblick` is active on player
- Spawn weight: 0.30

#### `enemy_as_oath_wraith`
- Role: utility pressure
- Family: broken witness court phantoms
- Readability: ribbon-like ghost body, oath glyph chest core
- Signature actions:
  - Witness Drag: pulls players toward false objective marker
  - Grief Pulse: morale debuff reducing outgoing damage briefly
- Hazard interaction: can trigger fake `Falsche Stimme` callout sequences
- Spawn weight: 0.30

## Spawn Composition Templates

| Template ID | Intended use | Composition |
|---|---|---|
| `spawn_tpl_intro_balanced` | first runs per area | 50% frontline, 35% ranged, 15% utility |
| `spawn_tpl_objective_pressure` | extraction defense phases | 35% frontline, 30% ranged, 35% utility |
| `spawn_tpl_high_risk_speedrun` | late free run / bounty pressure | 30% frontline, 40% ranged, 30% utility |

## Encounter Rules

- Do not spawn more than 2 utility archetypes simultaneously before MQ-10.
- First appearance of a new archetype must be announced by wave intro UI.
- At least one punish window per archetype must be testable in tutorialized or low-stress context.
- Enemy family telegraph VFX colors may overlap with hazards, but shapes must stay unique.

## Data Integration Contract

Use these IDs in content seeds and spawn table references:
- enemy archetype id pattern: `enemy_<areaCode>_<slug>`
- area code mapping: `gr`, `sg`, `wn`, `ei`, `hk`, `dg`, `as`
- role enum: `frontline`, `ranged`, `utility`

Minimum archetype data fields:
- `id`
- `areaId`
- `familyId`
- `role`
- `tierBand`
- `signatureActions[]`
- `hazardAffinity[]`
- `weaknessTags[]`
- `spawnWeight`

## QA Checklist

- Every playable area has exactly 3 documented normal archetypes before content freeze.
- Every archetype has at least one unique silhouette cue and one unique telegraph cue.
- Spawn tables in seeds reference only existing archetype IDs.
- Run summary can attribute kills by archetype ID.
- Hazard interactions match `20H_REGION_PAGES.md` hazard list without contradiction.
- Asset prompt IDs for enemies are kept in sync with `docs/assets/asset-prompts/` manifests.
