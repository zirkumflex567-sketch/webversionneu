# Scherbenhimmel 20h — Multiplayer Wireframes and Mode Contracts

Scope: multiplayer-facing design prepared during the 20-hour single-player preproduction pass. The first 20h experience remains single-player first, but these wireframes define how the same campaign systems later translate into co-op PvE and 2v2 PvPvE without redesigning extraction, rewards, UI, or quest logic.

## Design Rule

The single-player campaign is canonical. Multiplayer must reuse the same verbs: Deploy, survive, scale, boss/elite event, extract, bank rewards, update quests. Multiplayer adds team state, contesting, revive, lobby, and fairness rules; it must not create a second incompatible game.

---

## MP-00 — Mode Select Wireframe

```text
+---------------------------------------------------------------+
| SCHERBENHIMMEL                                                |
| Continue Campaign                                             |
|                                                               |
| [Single Player]  Canon story run, full dialogue, full choices  |
| [Co-op PvE]      Shared run, host story state, squad rewards   |
| [2v2 PvPvE]      Competitive extraction, no story choices      |
| [Practice]       No permanent rewards/losses                  |
+---------------------------------------------------------------+
| Current Chapter: 3 - Der Wald vergisst                        |
| Next Main Quest: MQ-11 Ein Garten, der Namen frisst           |
+---------------------------------------------------------------+
```

### Rules

- Single Player is the default CTA during first 20h.
- Co-op PvE uses host quest/world state.
- 2v2 PvPvE uses unlocked regions as arenas but does not advance main quest decisions.
- Practice never grants permanent rewards.

---

## MP-01 — Co-op Lobby Wireframe

```text
+---------------------------------------------------------------+
| CO-OP DEPLOY: Graumarsch / Free Extraction                    |
+----------------------+----------------------+-----------------+
| Player 1             | Player 2             | Squad Contract  |
| Lyra / Dornwolf      | Mira / Archivspinne  | Der Damm aecht  |
| Ready: YES           | Ready: NO            | Risk: Medium    |
+----------------------+----------------------+-----------------+
| Story State: Host controls chapter and choices                |
| Rewards: personal pickups + shared objective rewards          |
| Extraction: all non-downed players inside for final 5 seconds |
+---------------------------------------------------------------+
| [Invite] [Change Region] [Ready] [Launch]                     |
+---------------------------------------------------------------+
```

### Required Elements

- Host marker.
- Player cards with character, vehicle, loadout, readiness.
- Compatibility warnings: duplicate roles allowed, duplicate story choice authority not allowed.
- Squad contract / bounty slot.
- Extraction rule preview.
- Voice/text ping reminder optional.

### Co-op Rules

- Host controls story decisions and world-state changes.
- Guests keep personal run rewards that are compatible with their own progression.
- Main quest completion can optionally mark guest quest as `assisted` but does not overwrite their story choice flags.
- Cutscenes are host-synced; guests can vote skip, host finalizes.

---

## MP-02 — 2v2 Lobby Wireframe

```text
+---------------------------------------------------------------+
| 2v2 PVPVE EXTRACTION                                          |
+-----------------------------+---------------------------------+
| TEAM LANTERN                | TEAM ASH                        |
| P1 Lyra / DPS / Ready       | P3 Tarek / Skirmisher / Ready   |
| P2 Brannok / Bruiser / ...  | P4 Siofra / Traps / Ready      |
+-----------------------------+---------------------------------+
| Arena: Sonnenglasweite - Glassenke                            |
| Objective: Defeat elite convoy, claim Tech, extract            |
| Contest rule: enemy in zone pauses countdown                   |
| Reward rule: personal bank only on team extraction             |
+---------------------------------------------------------------+
| [Change Loadout] [Ready] [Queue]                              |
+---------------------------------------------------------------+
```

### Rules

- No main story choices in 2v2.
- Regions and characters are unlocked from single-player progression unless testing override is active.
- Teams spawn on opposite map edges.
- PvE enemies target both teams based on proximity/threat.
- Friendly fire off by default for readability.

---

## MP-03 — Shared Run HUD Wireframe

```text
+--------------------------------------------------------------------------------+
| Wave 3/4   Squad Scrap: 482   Personal Tech: 2   Objective: Kill Elite Captain  |
|                                                                                |
| [P1 Lyra HP Shield Ability] [P2 Mira HP Shield Ability]                         |
|                                                                                |
| Minimap: teammate arrow, downed marker, extraction preview                      |
|                                                                                |
| Event Feed: Mira applied Siegelriss | Lyra detonated Mondbrand x6               |
+--------------------------------------------------------------------------------+
```

### HUD Requirements

- Teammate health/shield/downs.
- Personal vs squad loot split.
- Shared objective progress.
- Ping markers.
- Extraction status: not spawned, spawned, holding, contested, failed, extracted.
- Clear attribution for duo synergies.

---

## MP-04 — Downed / Revive Wireframe

```text
+---------------------------------------------------------------+
| DOWNED                                                        |
| Bleedout: 18s                                                 |
| [Hold Ping] Need revive near extraction zone                   |
| Nearby: P2 Mira - 34m                                         |
| Retained if not revived: 50% Scrap, no Tech unless team extracts body           |
+---------------------------------------------------------------+
```

### Co-op Revive Rules

- Downed player can crawl slowly or ping.
- Revive requires channel time and clear interrupt rules.
- If extraction completes while downed player is inside zone, they extract with team.
- If downed player is outside zone, their personal Tech is lost unless future insurance exists.

### 2v2 Downed Rules

- Downed players can be finished or revived.
- Revive creates loud objective cue.
- Downed player in extraction zone counts as cargo, not active holder.

---

## MP-05 — Extraction Contest Wireframe

```text
+---------------------------------------------------------------+
| EXTRACTION: CONTESTED                                         |
| Team Lantern: 18.4s remaining                                 |
| Team Ash in zone: 1                                           |
| Clear enemy players or force them out                         |
| [Zone Ring: split color, pulsing red center]                   |
+---------------------------------------------------------------+
```

### Contest Rules

Single-player:
- Only special elites/boss mechanics can contest extraction.
- Contest source must be marked.

Co-op PvE:
- Enemy elites can contest if mission says so.
- Countdown resumes when zone is clear.

2v2:
- Any living enemy player inside zone contests.
- Downed enemy does not contest unless a perk explicitly says otherwise.
- If both teams complete objective eligibility, either team can hold extraction, but contest pauses both.

---

## MP-06 — Multiplayer Run Summary Wireframe

```text
+---------------------------------------------------------------+
| RUN SUMMARY — TEAM EXTRACTED                                  |
+------------------+------------------+-------------------------+
| Squad Rewards    | Player Rewards   | Quest / Mode Progress   |
| Scrap 1140       | Lyra Tech +3     | Bounty completed        |
| Boss Core        | Mira Module +1   | Guest assisted MQ flag  |
+------------------+------------------+-------------------------+
| Team Stats: revives, assists, contest time, extraction hold    |
| Personal Stats: damage, shielding, healing, loot carried       |
+---------------------------------------------------------------+
| [Return to Lobby] [Garage] [Replay Region] [Report Bug]        |
+---------------------------------------------------------------+
```

### Requirements

- Separate squad rewards and personal rewards.
- Show who extracted and who failed.
- Show what was lost due to death, non-extraction, disconnect, or objective failure.
- Show quest progress distinction: host advanced, guest assisted, no story progress.

---

## MP-07 — Disconnect / Reconnect Wireframe

```text
+---------------------------------------------------------------+
| CONNECTION LOST                                               |
| Reconnecting... 22s                                           |
| Your vehicle is protected for 5s, then AI-safe mode starts     |
| If timer expires: run resolves as disconnect defeat            |
+---------------------------------------------------------------+
```

### Rules

- Single-player: pause and recover locally.
- Co-op: 60s reconnect window recommended. Character becomes passive safe-mode if possible.
- 2v2: short reconnect window; after timeout, player is forfeited and loot drops or is lost based on mode balancing.
- Disconnect rules must be stated in Deploy/Lobby.

---

## MP-08 — Ping Wheel Wireframe

```text
            [Need Help]
[Go Here]                 [Danger]
            [Loot]
[Extract]                 [Boss]
            [Thanks]
```

### Rules

- Pings have world marker, minimap marker, subtitle line, and optional audio chirp.
- Pings must not spam; cooldown per player.
- Accessibility: ping text visible even without audio.

---

## Multiplayer Data Contracts

### Required Runtime Fields

- `mode`: singleplayer | coop_pve | pvpve_2v2 | practice
- `hostPlayerId`
- `teamId`
- `storyAuthorityPlayerId`
- `playerRewardState`
- `squadRewardState`
- `extractionEligibility`
- `zoneContestants`
- `downedState`
- `disconnectState`

### Reward Resolution Matrix

| Mode | Successful extraction | Defeat | Disconnect |
|---|---|---|---|
| Single-player | 100% Scrap, 100% Tech, items | 50% Scrap, 0 Tech | pause/recover; if abandon = defeat |
| Co-op PvE | personal + shared rewards if extracted | 50% personal Scrap, 0 personal Tech | reconnect window; unresolved = defeat for player |
| 2v2 PvPvE | team winners bank eligible rewards | losers follow defeat rules | forfeit rules; prevent abuse |
| Practice | no permanent rewards | no loss | no permanent outcome |

## Multiplayer QA Checklist

- Lobby readiness blocks launch until valid.
- Host story authority is clear.
- Guest story progress does not overwrite conflicting flags.
- Downed and extraction states are visible to all players.
- Contesting pauses countdown consistently.
- Run Summary explains every reward, loss, and quest result.
- Disconnect cannot be abused to protect Tech.
- 2v2 does not advance main quest choices.
