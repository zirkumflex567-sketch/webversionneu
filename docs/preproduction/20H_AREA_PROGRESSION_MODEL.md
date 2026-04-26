# Scherbenhimmel 20h — Hub-Driven Area Progression Model

This document is the authoritative structure rule for the first 20-hour Scherbenhimmel experience.

## Core Statement

Scherbenhimmel is **not** a large continuous open world.

The 20-hour campaign is built around a **hub-driven, quest-gated area model**:

1. The player returns to the Hub / Laternenhof.
2. The player talks to NPCs, reads lore, upgrades, shops, checks quests, and prepares a loadout.
3. The player accepts or selects a quest, bounty, boss hunt, side mission, companion mission, or free run.
4. The Deploy screen opens.
5. The player selects character, vehicle, modules, difficulty/threat, optional bounty, and launch confirmation.
6. The game loads the selected **area instance**.
7. The player explores the required part of that area for the selected mission.
8. The mission ends through extraction, defeat, or abandon.
9. Run Summary resolves rewards, story flags, unlocks, and quest progress.
10. The player returns to the Hub.
11. When an area's main area questline is completed, the area becomes available for Free Run / farming / bounty / boss-hunt variants.

The game should feel adventurous and exploratory, but the structure is closer to **mission-based expedition zones** than a single seamless open world.

## Terminology

Use these terms consistently:

| Term | Meaning | Do not confuse with |
|---|---|---|
| Hub / Laternenhof | Safe base for dialogue, upgrades, quests, prep, shop, tech-lab | combat area |
| Area | A themed region such as Graumarsch or Sonnenglasweite | seamless open world |
| Area Instance | A loaded run/mission version of an area | permanent overworld cell |
| Area Questline | The main quest chain that unlocks and resolves an area | generic side checklist |
| Mission | Any quest/bounty/boss/free-run selection loaded from Deploy | walking around forever |
| Free Run | Repeatable post-quest run in an unlocked area | main story exploration |
| Region Map | A node/selection map showing unlocked areas and missions | seamless world map |
| World-State | Hub/area flags that change after quests | real-time persistent open world simulation |

Forbidden or discouraged phrasing for 20h docs:

- big open world
- seamless open world
- free roam as the primary campaign structure
- walk from one region to another in real time
- persistent overworld traversal

Allowed phrasing:

- hub-driven progression
- quest-gated areas
- expedition zones
- area instances
- mission-based regions
- node-based region map
- free run after area quest completion

## Player Flow: First-Time Area Quest

```text
Hub Dashboard
  -> NPC / Quest Log offers area quest
  -> Player accepts quest
  -> Quest details explain story, objective, risk, reward, extraction rule
  -> Deploy screen
  -> Loadout validation
  -> Launch confirmation
  -> Area instance loads
  -> Intro / travel vignette / arrival bark
  -> Explore required area lanes/objectives
  -> Combat, puzzle, dialogue, boss, or escort beats
  -> Extraction appears or finale objective resolves
  -> Extraction / defeat / abandon
  -> Run Summary
  -> Hub returns with changed NPCs, flags, rewards, next quest
```

## Player Flow: Returning to Completed Area

```text
Hub Dashboard or Deploy
  -> Select unlocked area
  -> Select Free Run / Bounty / Boss Hunt / Practice
  -> Pick optional contract and loadout
  -> Launch area instance
  -> Farm, complete bounty, hunt boss, discover remaining codex entries
  -> Extract or fail
  -> Run Summary
  -> Hub
```

## Area Unlock Rules

Each area has three high-level states:

### 1. Locked

The player can see only a teaser or rumor. The area cannot be launched.

UI must show:
- area name if known,
- why it is locked,
- which quest unlocks it,
- whether it is story-critical or optional.

Example:

```text
Sonnenglasweite — Locked
Requirement: Complete MQ-05 Drei Dochte fuer eine Flamme.
Rumor: Salt roads beyond the northern lantern are reflecting fires that never happened.
```

### 2. Quest-Gated / Active

The area can be launched only through its current quest step or required mission. The player is not free-farming yet.

UI must show:
- current area quest,
- required objective,
- recommended character/loadout,
- expected duration,
- extraction requirement,
- reward stakes.

Example:

```text
Wurzelwald Nhal — Active Quest Area
Current: MQ-10 Wo Namen wurzeln
Goal: Earn entry to Silberraunen.
Free Run: Locked until MQ-11 is completed.
```

### 3. Cleared / Free-Run Enabled

The area questline is completed. The player may launch repeatable content there.

Available post-clear modes may include:
- Free Extraction
- Bounty Run
- Boss Hunt
- Material Farm
- Codex Sweep
- Practice Variant

UI must still show story consequences and changed world-state.

Example:

```text
Graumarsch — Cleared
Free Run available.
World-State: Fackelruh burned, Laternen fast travel online, Damm event active.
Available: Free Extraction, Der Damm aecht, Aale im Rauchhaus, Boss Hunt: Mutter der Laternenwuermer.
```

## Exploration Rules Inside Area Instances

Area instances should not be tiny corridors. They are explorable mission spaces with lanes, side pockets, optional objectives, hidden lore, and local traversal choices. The difference is structural:

- The player explores **inside the loaded area instance**.
- The player does not roam a continuous world between all regions.
- Region transitions happen through Hub/Deploy, travel vignettes, quest launches, or explicit route unlocks.
- Optional pockets can remain locked until later quests or character abilities reveal them.

Each area instance should support:

- primary quest route,
- 1–3 optional side pockets,
- at least one lore discovery,
- one extraction layout,
- region-specific hazards,
- repeatable Free Run variant after clearing.

## Quest Design Consequences

Every quest must define:

- where it is accepted, usually Hub/NPC/Quest Log,
- which area instance it launches,
- what parts of the area are available during that quest,
- whether the quest unlocks the next lane/pocket of the same area,
- whether successful extraction is required,
- whether the area changes state after completion,
- whether Free Run unlocks after this quest or later.

Quest text must avoid implying that the player simply walks across a seamless world to continue.

## Region Design Consequences

Each Region Page must define:

- Locked state,
- Active quest state,
- Cleared / Free Run state,
- first entry quest,
- area questline completion quest,
- Free Run unlock condition,
- available repeatable modes after clear,
- how world-state is shown in Hub and Deploy.

## Hub Design Consequences

The Hub is not just a menu. It is the narrative and mechanical center.

Between runs the player should:

- receive quests from NPCs,
- choose active mission from Quest Log or Deploy,
- hear consequences of previous choices,
- upgrade characters and vehicles,
- buy equipment,
- prepare bounties,
- inspect codex/lore,
- see unlocked areas on a node-based region map.

The Hub should carry the emotional continuity that a seamless open world would otherwise provide.

## Deploy Screen Consequences

Deploy must make area structure obvious:

```text
Select Mission Type:
[Story Quest] MQ-11 Ein Garten, der Namen frisst
[Side Quest] SQ-WN-01 Harz fuer die Krankenstube
[Bounty] Drei Namen, kein Grab
[Free Run] Locked until MQ-11 complete
[Boss Hunt] Locked until Der Namenlose Garten discovered
```

The player should never wonder: “Can I just drive there?” The answer is: **you launch the relevant area instance from Hub/Deploy.**

## Free Run / Farming Rules

Free Run unlocks only after the area's area questline is narratively resolved enough that repeat visits make sense.

Free Run is used for:

- Scrap farming,
- Relic Tech risk runs,
- material farming,
- bounty completions,
- boss rematches,
- codex cleanup,
- character build testing,
- optional world-event variants.

Free Run should reflect world-state. Example: Fackelruh does not revert to pre-burn village; it remains burned or memorialized based on choices.

## 20h Area Unlock Table

| Area | First entry | Active questline resolved by | Free Run unlock |
|---|---|---|---|
| Graumarsch | MQ-00 / MQ-01 | MQ-05 Drei Dochte fuer eine Flamme | after MQ-05 |
| Sonnenglasweite | MQ-06 Der Weg aus Glas | MQ-09 Konvoi durch die Glassenke | after MQ-09 |
| Wurzelwald Nhal | MQ-10 Wo Namen wurzeln | MQ-11 Ein Garten, der Namen frisst | after MQ-11 |
| Eisenbrandkueste | MQ-12 Dock aus Eisenbrand | MQ-14 Die Glocke unter der Brandung | after MQ-14 |
| Hochkamm der Eidwacht | MQ-15 Falken ohne Himmel | MQ-16 Der Pass, der bezahlt werden will | after MQ-16 |
| Dunkelgrund | MQ-17 Schacht Null | MQ-18 Sankt Ival schlaeft nicht | after MQ-18 |
| Asterhof | MQ-19 Der Asterhof | MQ-20 Sereths Hand | post-20h midgame route |

## Documentation Update Rule

Any document that mentions regions, quests, map, travel, free runs, world-state, exploration, or campaign structure must follow this model.

When in doubt, write:

> The player accepts/chooses the mission in the Hub, launches an area instance through Deploy, completes objectives inside that instance, resolves extraction, then returns to the Hub. Cleared areas become available for Free Run and farming variants.

## Vertical Slice Instance Progression
- New instance: 
- State model: 
- Story entry: Side Quest 
- Bounty availability: after side quest completion and extraction

## Vertical Slice Instance Progression
- New instance: graumarsch-chemiefabrik
- State model: locked -> active_quest -> cleared_free_run
- Story entry: Side Quest SQ-GM-01
- Bounty availability: after side quest completion and extraction
