# Scherbenhimmel 20h — Localization Bible DE/EN

Scope: first 20-hour Scherbenhimmel experience. This file pre-produces German and English player-facing text for core UI, campaign structure, Deploy, extraction, Run Summary, quests, companion quests, bounties, regions, characters, status effects, errors, and debug. German and English are required for all shipped strings.

## Localization Rules

- German (`de`) is the primary writing language and tone reference.
- English (`en`) is a natural adaptation, not a literal word-for-word translation.
- Every player-facing string must use a stable localization key.
- Keys must not change when copy is edited.
- Use placeholders for variables: `{scrap}`, `{tech}`, `{area}`, `{seconds}`, `{character}`, `{quest}`.
- No player-facing text may be hardcoded in React, game logic, quest data, or debug UI.
- Missing-key fallback may show the key in development but must never ship in production.

## Tone Rules

### German

Direct, tactile, slightly poetic, never generic fantasy filler. Avoid over-explaining. The world speaks through concrete objects: Laternen, Scherben, Salz, Harz, Rost, Glocken, Namen.

### English

Keep the same mood without awkward literal constructions. Some names remain German when they are proper nouns: Laternenhof, Graumarsch, Wurzelwald Nhal, Scherbenhimmel. Translate functional nouns when helpful.

## Format

Each entry uses:

```yaml
key:
  de: "..."
  en: "..."
  note: "optional implementation/context note"
```

---

# 1. Global UI

```yaml
ui.language.de:
  de: "Deutsch"
  en: "German"
ui.language.en:
  de: "Englisch"
  en: "English"
ui.common.continue:
  de: "Weiter"
  en: "Continue"
ui.common.back:
  de: "Zurück"
  en: "Back"
ui.common.cancel:
  de: "Abbrechen"
  en: "Cancel"
ui.common.confirm:
  de: "Bestätigen"
  en: "Confirm"
ui.common.close:
  de: "Schließen"
  en: "Close"
ui.common.locked:
  de: "Gesperrt"
  en: "Locked"
ui.common.unlocked:
  de: "Freigeschaltet"
  en: "Unlocked"
ui.common.ready:
  de: "Bereit"
  en: "Ready"
ui.common.not_ready:
  de: "Nicht bereit"
  en: "Not ready"
ui.common.reward:
  de: "Belohnung"
  en: "Reward"
ui.common.rewards:
  de: "Belohnungen"
  en: "Rewards"
ui.common.objective:
  de: "Ziel"
  en: "Objective"
ui.common.objectives:
  de: "Ziele"
  en: "Objectives"
ui.common.requirement:
  de: "Voraussetzung"
  en: "Requirement"
ui.common.warning:
  de: "Warnung"
  en: "Warning"
ui.common.failed:
  de: "Gescheitert"
  en: "Failed"
ui.common.completed:
  de: "Abgeschlossen"
  en: "Completed"
ui.common.extracted:
  de: "Extrahiert"
  en: "Extracted"
ui.common.lost:
  de: "Verloren"
  en: "Lost"
ui.common.bank:
  de: "Einlagern"
  en: "Bank"
ui.common.retry:
  de: "Erneut versuchen"
  en: "Retry"
```

---

# 2. Boot and Main Menu

```yaml
menu.boot.title:
  de: "BIFA: Scherbenhimmel"
  en: "BIFA: Shard-Sky"
menu.boot.subtitle:
  de: "Fahr schnell. Bau Synergien. Extrahiere lebend. Behalte die Beute."
  en: "Drive fast. Build synergies. Extract alive. Keep the loot."
menu.boot.continue_campaign:
  de: "Kampagne fortsetzen"
  en: "Continue Campaign"
menu.boot.new_campaign:
  de: "Neue Kampagne"
  en: "New Campaign"
menu.boot.settings:
  de: "Einstellungen"
  en: "Settings"
menu.boot.credits:
  de: "Credits & Version"
  en: "Credits & Version"
menu.boot.no_save_primary:
  de: "Neue Kampagne starten"
  en: "Start New Campaign"
menu.boot.save_load_failed.title:
  de: "Speicherstand konnte nicht geladen werden"
  en: "Save could not be loaded"
menu.boot.save_load_failed.body:
  de: "Der Speicherstand ist beschädigt oder unvollständig. Du kannst erneut versuchen, ihn exportieren oder neu beginnen."
  en: "The save is damaged or incomplete. You can retry, export it, or start over."
menu.boot.save_load_failed.retry:
  de: "Erneut laden"
  en: "Retry Load"
menu.boot.save_load_failed.export:
  de: "Defekten Speicherstand exportieren"
  en: "Export Broken Save"
menu.boot.save_load_failed.reset:
  de: "Speicherstand zurücksetzen"
  en: "Reset Save"
```

---

# 3. Campaign Structure and Hub

```yaml
campaign.structure.not_open_world:
  de: "Scherbenhimmel ist keine große offene Welt. Du bereitest dich im Laternenhof vor, wählst eine Quest, startest ein Gebiet über Deploy, extrahierst oder scheiterst und kehrst danach in den Hub zurück."
  en: "Scherbenhimmel is not a large open world. You prepare in Laternenhof, choose a quest, launch an area through Deploy, extract or fail, then return to the Hub."
campaign.structure.area_locked:
  de: "Dieses Gebiet ist noch nicht erreichbar. Schließe zuerst: {quest}."
  en: "This area is not reachable yet. Complete first: {quest}."
campaign.structure.area_active_quest:
  de: "Gebietsquest aktiv. Freies Farmen wird erst nach Abschluss dieser Questline freigeschaltet."
  en: "Area quest active. Free farming unlocks only after this questline is completed."
campaign.structure.area_cleared:
  de: "Gebietsquest abgeschlossen. Free Run, Bounties und Farming sind verfügbar."
  en: "Area questline completed. Free Run, bounties, and farming are available."
hub.dashboard.title:
  de: "Laternenhof"
  en: "Laternenhof"
hub.dashboard.subtitle:
  de: "Was noch brennt, ist noch nicht verloren."
  en: "What still burns is not yet lost."
hub.dashboard.next_action:
  de: "Nächster Schritt"
  en: "Next Step"
hub.dashboard.active_quest:
  de: "Aktive Quest"
  en: "Active Quest"
hub.dashboard.last_run:
  de: "Letzter Lauf"
  en: "Last Run"
hub.tabs.dashboard:
  de: "Übersicht"
  en: "Dashboard"
hub.tabs.deploy:
  de: "Deploy"
  en: "Deploy"
hub.tabs.shop:
  de: "Shop"
  en: "Shop"
hub.tabs.tech_lab:
  de: "Tech-Lab"
  en: "Tech Lab"
hub.tabs.roster:
  de: "Roster"
  en: "Roster"
hub.tabs.codex:
  de: "Kodex"
  en: "Codex"
hub.tabs.settings:
  de: "Einstellungen"
  en: "Settings"
```

---

# 4. Deploy and Area Selection

```yaml
deploy.title:
  de: "Deploy vorbereiten"
  en: "Prepare Deploy"
deploy.character_slot:
  de: "Charakter"
  en: "Character"
deploy.vehicle_slot:
  de: "Fahrzeug"
  en: "Vehicle"
deploy.loadout_slot:
  de: "Loadout"
  en: "Loadout"
deploy.area_slot:
  de: "Gebiet / Mission"
  en: "Area / Mission"
deploy.threat_slot:
  de: "Bedrohung"
  en: "Threat"
deploy.bounty_slot:
  de: "Bounty"
  en: "Bounty"
deploy.reward_preview:
  de: "Belohnungsvorschau"
  en: "Reward Preview"
deploy.launch:
  de: "Starten"
  en: "Launch"
deploy.launch_disabled.missing_character:
  de: "Wähle zuerst einen Charakter."
  en: "Choose a character first."
deploy.launch_disabled.missing_vehicle:
  de: "Wähle zuerst ein Fahrzeug."
  en: "Choose a vehicle first."
deploy.launch_disabled.area_locked:
  de: "Dieses Gebiet ist noch gesperrt."
  en: "This area is still locked."
deploy.mission_type.story:
  de: "Story-Quest"
  en: "Story Quest"
deploy.mission_type.side:
  de: "Nebenquest"
  en: "Side Quest"
deploy.mission_type.companion:
  de: "Companion-Quest"
  en: "Companion Quest"
deploy.mission_type.bounty:
  de: "Bounty-Run"
  en: "Bounty Run"
deploy.mission_type.free_run:
  de: "Free Run"
  en: "Free Run"
deploy.mission_type.boss_hunt:
  de: "Boss Hunt"
  en: "Boss Hunt"
deploy.mission_type.practice:
  de: "Training"
  en: "Practice"
deploy.confirm.title:
  de: "Deploy bestätigen"
  en: "Confirm Deploy"
deploy.confirm.risk:
  de: "Bei Niederlage behältst du 50% Scrap, verlierst aber 100% unextrahierte Relikt-Tech und alle nicht extrahierten Items."
  en: "On defeat, you keep 50% Scrap but lose 100% of unextracted Relic Tech and all unextracted items."
deploy.confirm.start:
  de: "In Gebiet starten"
  en: "Launch Area"
```

---

# 5. Run, Extraction, Summary

```yaml
run.drop.title:
  de: "Ankunft: {area}"
  en: "Arrival: {area}"
run.objective.new:
  de: "Neues Ziel"
  en: "New Objective"
run.wave.start:
  de: "Welle {wave}"
  en: "Wave {wave}"
run.level_up.title:
  de: "Upgrade wählen"
  en: "Choose Upgrade"
run.level_up.reroll:
  de: "Neu würfeln"
  en: "Reroll"
run.pause.title:
  de: "Pause"
  en: "Paused"
run.pause.resume:
  de: "Fortsetzen"
  en: "Resume"
run.pause.abandon:
  de: "Run aufgeben"
  en: "Abandon Run"
run.pause.abandon_warning:
  de: "Aufgeben zählt als Niederlage. Du behältst 50% Scrap und verlierst unextrahierte Relikt-Tech."
  en: "Abandoning counts as defeat. You keep 50% Scrap and lose unextracted Relic Tech."
extraction.spawned:
  de: "Extraktionszone erschienen"
  en: "Extraction zone appeared"
extraction.reach_zone:
  de: "Erreiche die Extraktionszone"
  en: "Reach the extraction zone"
extraction.hold:
  de: "Zone halten: {seconds}s"
  en: "Hold zone: {seconds}s"
extraction.return_to_zone:
  de: "Zurück in die Zone"
  en: "Return to the zone"
extraction.contested:
  de: "Extraktion umkämpft"
  en: "Extraction contested"
extraction.success:
  de: "Extraktion erfolgreich"
  en: "Extraction successful"
extraction.failed:
  de: "Extraktion gescheitert"
  en: "Extraction failed"
summary.title.success:
  de: "Run abgeschlossen"
  en: "Run Complete"
summary.title.failure:
  de: "Run gescheitert"
  en: "Run Failed"
summary.tabs.rewards:
  de: "Belohnungen"
  en: "Rewards"
summary.tabs.build:
  de: "Build"
  en: "Build"
summary.tabs.quest:
  de: "Questfortschritt"
  en: "Quest Progress"
summary.tabs.stats:
  de: "Statistiken"
  en: "Stats"
summary.reward.scrap_banked:
  de: "Scrap eingelagert: {scrap}"
  en: "Scrap banked: {scrap}"
summary.reward.tech_banked:
  de: "Relikt-Tech extrahiert: {tech}"
  en: "Relic Tech extracted: {tech}"
summary.reward.tech_lost:
  de: "Relikt-Tech verloren: {tech}"
  en: "Relic Tech lost: {tech}"
summary.return_hub:
  de: "Zurück zum Laternenhof"
  en: "Return to Laternenhof"
summary.retry_region:
  de: "Gebiet erneut starten"
  en: "Retry Area"
```

---

# 6. Region Names, Taglines, Area State Text

```yaml
region.graumarsch.name:
  de: "Graumarsch"
  en: "Graumarsch"
region.graumarsch.tagline:
  de: "Nasser Schlamm, gelbe Laternen, ein Zuhause, das nicht aufgehört hat zu brennen."
  en: "Wet mud, yellow lanterns, and a home that never stopped burning."
region.graumarsch.free_run_unlock:
  de: "Free Run verfügbar nach MQ-05: Drei Dochte für eine Flamme."
  en: "Free Run available after MQ-05: Three Wicks for One Flame."
region.sonnenglasweite.name:
  de: "Sonnenglasweite"
  en: "Sun-Glass Expanse"
region.sonnenglasweite.tagline:
  de: "Salz, Spiegel und Verträge, die Menschen länger halten als Ketten."
  en: "Salt, mirrors, and contracts that hold people longer than chains."
region.sonnenglasweite.free_run_unlock:
  de: "Free Run verfügbar nach MQ-09: Konvoi durch die Glassenke."
  en: "Free Run available after MQ-09: Convoy Through the Glass Hollow."
region.wurzelwald.name:
  de: "Wurzelwald Nhal"
  en: "Root-Forest Nhal"
region.wurzelwald.tagline:
  de: "Ein Wald, der Namen wie Wasser trinkt."
  en: "A forest that drinks names like water."
region.wurzelwald.free_run_unlock:
  de: "Free Run verfügbar nach MQ-11: Ein Garten, der Namen frisst."
  en: "Free Run available after MQ-11: A Garden That Eats Names."
region.eisenbrand.name:
  de: "Eisenbrandküste"
  en: "Ironbrand Coast"
region.eisenbrand.tagline:
  de: "Rost, Sturm und Glocken unter der Brandung."
  en: "Rust, storm, and bells beneath the surf."
region.eisenbrand.free_run_unlock:
  de: "Free Run verfügbar nach MQ-14: Die Glocke unter der Brandung."
  en: "Free Run available after MQ-14: The Bell Beneath the Surf."
region.hochkamm.name:
  de: "Hochkamm der Eidwacht"
  en: "Highridge of the Oathwatch"
region.hochkamm.tagline:
  de: "Schnee, Silber und Eide, die wärmer klingen als sie sind."
  en: "Snow, silver, and oaths that sound warmer than they are."
region.hochkamm.free_run_unlock:
  de: "Free Run verfügbar nach MQ-16: Der Pass, der bezahlt werden will."
  en: "Free Run available after MQ-16: The Pass That Demands Payment."
region.dunkelgrund.name:
  de: "Dunkelgrund"
  en: "Deepdark"
region.dunkelgrund.tagline:
  de: "Unter der Erde kosten zweite Namen mehr als Blut."
  en: "Below ground, second names cost more than blood."
region.dunkelgrund.free_run_unlock:
  de: "Free Run verfügbar nach MQ-18: Sankt Ival schläft nicht."
  en: "Free Run available after MQ-18: Saint Ival Does Not Sleep."
region.asterhof.name:
  de: "Asterhof"
  en: "Aster Court"
region.asterhof.tagline:
  de: "Ein Vorhof aus Glas, Stimmen und Wahrheiten, die schneiden."
  en: "A forecourt of glass, voices, and truths that cut."
region.asterhof.free_run_unlock:
  de: "Asterhof wird nach MQ-20 als Midgame-Route geöffnet, nicht als normales Farmgebiet der ersten 20 Stunden."
  en: "Aster Court opens after MQ-20 as a midgame route, not as a standard farming area during the first 20 hours."
```

---

# 7. Character UI Text

```yaml
character.lyra.name:
  de: "Lyra Dorn"
  en: "Lyra Dorn"
character.lyra.role:
  de: "Duellantin / Interceptor"
  en: "Duelist / Interceptor"
character.lyra.short:
  de: "Überlebende von Fackelruh. Schnell, wütend, präzise."
  en: "Survivor of Fackelruh. Fast, furious, precise."
character.lyra.passive.name:
  de: "Dornherz"
  en: "Thornheart"
character.lyra.technique.name:
  de: "Funkenstoß"
  en: "Sparkshot"
character.lyra.ultimate.name:
  de: "Hausbrand"
  en: "Housefire"
character.mira.name:
  de: "Mira Voss"
  en: "Mira Voss"
character.mira.role:
  de: "Runenbringerin / Kontrolle"
  en: "Runebringer / Controller"
character.mira.short:
  de: "Archivgelehrte mit Klingen aus Wahrheit und schlechten Entscheidungen."
  en: "Archivist with blades made of truth and bad decisions."
character.mira.passive.name:
  de: "Archivblick"
  en: "Archive Sight"
character.mira.technique.name:
  de: "Siegelbruch"
  en: "Sealbreak"
character.mira.ultimate.name:
  de: "Palimpsest"
  en: "Palimpsest"
character.tarek.name:
  de: "Tarek al-Sahir"
  en: "Tarek al-Sahir"
character.tarek.role:
  de: "Täuscher / Skirmisher"
  en: "Deceiver / Skirmisher"
character.tarek.short:
  de: "Lächelt wie ein Lügner und kämpft wie jemand, der Flucht geübt hat."
  en: "Smiles like a liar and fights like someone trained by escape."
character.tarek.passive.name:
  de: "Schuldlächeln"
  en: "Debt-Smile"
character.tarek.technique.name:
  de: "Fata Morgana"
  en: "Fata Morgana"
character.tarek.ultimate.name:
  de: "Vertrag brechen"
  en: "Break Contract"
character.siofra.name:
  de: "Siofra Nhal"
  en: "Siofra Nhal"
character.siofra.role:
  de: "Fallenbinderin / Ranger"
  en: "Trapbinder / Ranger"
character.siofra.short:
  de: "Spricht für den Chor, bis sie merkt, dass ihre eigene Stimme fehlt."
  en: "Speaks for the chorus until she notices her own voice is missing."
character.siofra.technique.name:
  de: "Harzfänger"
  en: "Resin Snare"
character.brannok.name:
  de: "Brannok Reef"
  en: "Brannok Reef"
character.brannok.role:
  de: "Harpunier / Bruiser"
  en: "Harpooner / Bruiser"
character.brannok.short:
  de: "Ein Mann wie ein Anker: schwer, wütend, schwer loszuwerden."
  en: "A man like an anchor: heavy, furious, hard to shake loose."
character.edda.name:
  de: "Edda Falkenlicht"
  en: "Edda Falkenlicht"
character.edda.role:
  de: "Banner-Ritterin / Tank"
  en: "Banner-Knight / Tank"
character.edda.short:
  de: "Trägt Eide wie Rüstung und weiß, dass Rüstung drücken kann."
  en: "Wears oaths like armor and knows armor can bruise."
character.kael.name:
  de: "Kael Nhar"
  en: "Kael Nhar"
character.kael.role:
  de: "Gift-Rogue / Assassine"
  en: "Poison-Rogue / Assassin"
character.kael.short:
  de: "Hat überlebt, wo Gewissen ein Luxus war."
  en: "Survived where conscience was a luxury."
```

---

# 8. Main Quest Localization

```yaml
quest.main.mq00.title:
  de: "Der Abend vor dem Regen"
  en: "The Evening Before the Rain"
quest.main.mq00.summary:
  de: "Hilf in Fackelruh aus, bevor der Himmel schwarz flackert."
  en: "Help around Fackelruh before the sky flickers black."
quest.main.mq00.objective.01:
  de: "Bringe Sumpföl zur Dorflaterne."
  en: "Bring marsh oil to the village lantern."
quest.main.mq00.objective.02:
  de: "Sprich mit mindestens drei Dorfbewohnern."
  en: "Speak with at least three villagers."
quest.main.mq00.objective.03:
  de: "Hilf bei drei Dorfaufgaben."
  en: "Help with three village tasks."
quest.main.mq00.objective.04:
  de: "Kehre zum Dorfplatz zurück."
  en: "Return to the village square."

quest.main.mq01.title:
  de: "Wenn die Laterne stirbt"
  en: "When the Lantern Dies"
quest.main.mq01.summary:
  de: "Fackelruh brennt. Rette, wen du retten kannst. Nicht alle."
  en: "Fackelruh is burning. Save who you can. Not everyone."
quest.main.mq01.objective.01:
  de: "Erreiche den Dorfplatz."
  en: "Reach the village square."
quest.main.mq01.objective.02:
  de: "Besiege die ersten Nachtflut-Schemen."
  en: "Defeat the first Nightflood shades."
quest.main.mq01.objective.03:
  de: "Wähle: Aalräucherei oder Schulsteg."
  en: "Choose: eel smokehouse or school pier."
quest.main.mq01.objective.04:
  de: "Erreiche mit Jorik die Hauptlaterne."
  en: "Reach the main lantern with Jorik."
quest.main.mq01.reward.funke:
  de: "Fähigkeit freigeschaltet: Funkenstoß"
  en: "Ability unlocked: Sparkshot"

quest.main.mq02.title:
  de: "Asche schwimmt nicht"
  en: "Ash Does Not Float"
quest.main.mq02.summary:
  de: "Mara bringt die Überlebenden fort. Das Wasser trägt mehr als Leichen."
  en: "Mara ferries the survivors away. The water carries more than bodies."
quest.main.mq02.objective.01:
  de: "Steig in Maras Kahn."
  en: "Board Mara's skiff."
quest.main.mq02.objective.02:
  de: "Sammle drei Erinnerungsstücke aus dem Wasser."
  en: "Collect three memory objects from the water."
quest.main.mq02.objective.03:
  de: "Benutze die Echo-Lupe auf jedem Fund."
  en: "Use the Echo Lens on each find."

quest.main.mq03.title:
  de: "Der Hof, der noch brennt"
  en: "The Court That Still Burns"
quest.main.mq03.summary:
  de: "Der Laternenhof ist kein Zuhause. Noch nicht."
  en: "Laternenhof is not a home. Not yet."
quest.main.mq03.objective.01:
  de: "Betritt den Laternenhof."
  en: "Enter Laternenhof."
quest.main.mq03.objective.02:
  de: "Sprich mit Ivara, Oren und Jorik."
  en: "Speak with Ivara, Oren, and Jorik."
quest.main.mq03.objective.03:
  de: "Wähle das erste Gebäude, das repariert wird."
  en: "Choose the first building to repair."

quest.main.mq04.title:
  de: "Die Sumpfkathedrale"
  en: "The Marsh Cathedral"
quest.main.mq04.summary:
  de: "In der Ruine wartet eine Frau, die zu viel weiß und zu wenig sagt."
  en: "In the ruin waits a woman who knows too much and says too little."
quest.main.mq04.objective.01:
  de: "Starte den Deploy zur Sumpfkathedrale."
  en: "Deploy to the Marsh Cathedral."
quest.main.mq04.objective.02:
  de: "Aktiviere die drei Glockenerinnerungen."
  en: "Activate the three bell memories."
quest.main.mq04.objective.03:
  de: "Befreie Mira aus dem Siegelkreis."
  en: "Free Mira from the seal circle."
quest.main.mq04.objective.04:
  de: "Besiege den Archivhüter ohne Gesicht."
  en: "Defeat the Faceless Archive Warden."
quest.main.mq04.objective.05:
  de: "Extrahiere mit Mira und dem Archivfragment."
  en: "Extract with Mira and the archive fragment."

quest.main.mq05.title:
  de: "Drei Dochte für eine Flamme"
  en: "Three Wicks for One Flame"
quest.main.mq05.summary:
  de: "Entzünde die Außenposten und mach aus Fluchtwegen wieder Wege."
  en: "Light the outposts and turn escape routes back into roads."
quest.main.mq05.reward.free_run:
  de: "Graumarsch Free Run freigeschaltet."
  en: "Graumarsch Free Run unlocked."

quest.main.mq06.title:
  de: "Der Weg aus Glas"
  en: "The Road of Glass"
quest.main.mq07.title:
  de: "Der Preis des Salzes"
  en: "The Price of Salt"
quest.main.mq08.title:
  de: "Brunnen, die lügen"
  en: "Wells That Lie"
quest.main.mq09.title:
  de: "Konvoi durch die Glassenke"
  en: "Convoy Through the Glass Hollow"
quest.main.mq10.title:
  de: "Wo Namen wurzeln"
  en: "Where Names Take Root"
quest.main.mq11.title:
  de: "Ein Garten, der Namen frisst"
  en: "A Garden That Eats Names"
quest.main.mq12.title:
  de: "Dock aus Eisenbrand"
  en: "Dock of Ironbrand"
quest.main.mq13.title:
  de: "Die Kette, die zurückzieht"
  en: "The Chain That Pulls Back"
quest.main.mq14.title:
  de: "Die Glocke unter der Brandung"
  en: "The Bell Beneath the Surf"
quest.main.mq15.title:
  de: "Falken ohne Himmel"
  en: "Falcons Without a Sky"
quest.main.mq16.title:
  de: "Der Pass, der bezahlt werden will"
  en: "The Pass That Demands Payment"
quest.main.mq17.title:
  de: "Schacht Null"
  en: "Shaft Zero"
quest.main.mq18.title:
  de: "Sankt Ival schläft nicht"
  en: "Saint Ival Does Not Sleep"
quest.main.mq19.title:
  de: "Der Asterhof"
  en: "The Aster Court"
quest.main.mq20.title:
  de: "Sereths Hand"
  en: "Sereth's Hand"
```

## Main Quest Objective Compact Set MQ-06 to MQ-20

These keys are sufficient for first implementation. Later passes can expand every objective into per-step variants and optional branch text.

```yaml
quest.main.mq06.summary:
  de: "Der Salzweg öffnet sich, und Tarek macht daraus sofort ein Problem."
  en: "The salt road opens, and Tarek immediately turns it into a problem."
quest.main.mq06.objective.01:
  de: "Durchquere den Glasweg."
  en: "Cross the glass road."
quest.main.mq06.objective.02:
  de: "Überstehe den ersten Scherbensturm."
  en: "Survive the first shardstorm."
quest.main.mq06.objective.03:
  de: "Entscheide, wie du mit Tareks Diebstahl umgehst."
  en: "Decide how to handle Tarek's theft."

quest.main.mq07.summary:
  de: "Tareks Schuldschein wird versteigert. Darin steht mehr als Geld."
  en: "Tarek's debt note is up for auction. It contains more than money."
quest.main.mq07.objective.01:
  de: "Finde einen Weg ins Auktionshaus."
  en: "Find a way into the auction house."
quest.main.mq07.objective.02:
  de: "Untersuche Tareks Erinnerungsvertrag."
  en: "Inspect Tarek's memory contract."
quest.main.mq07.objective.03:
  de: "Entscheide: zerstören, kaufen oder öffentlich verlesen."
  en: "Decide: destroy it, buy it, or read it publicly."
quest.main.mq07.objective.04:
  de: "Entkomme der Marktaufsicht und extrahiere."
  en: "Escape market enforcement and extract."

quest.main.mq08.summary:
  de: "Die Brunnen zeigen Wasser und geben Salz. Jemand verdient am Durst."
  en: "The wells show water and give salt. Someone profits from thirst."
quest.main.mq08.objective.01:
  de: "Untersuche die lügenden Brunnen."
  en: "Inspect the lying wells."
quest.main.mq08.objective.02:
  de: "Entferne drei Salzglas-Knoten."
  en: "Remove three salt-glass nodes."
quest.main.mq08.objective.03:
  de: "Entscheide über die Zukunft des Brunnens."
  en: "Decide the well's future."

quest.main.mq09.summary:
  de: "Ein Konvoi muss durch die Glassenke. Nicht alle Schatten gehören zu Menschen."
  en: "A convoy must cross the Glass Hollow. Not every shadow belongs to a person."
quest.main.mq09.objective.01:
  de: "Bereite die Karawanenroute im Deploy vor."
  en: "Prepare the caravan route in Deploy."
quest.main.mq09.objective.02:
  de: "Eskortiere den Konvoi durch drei Zwischenfälle."
  en: "Escort the convoy through three incidents."
quest.main.mq09.objective.03:
  de: "Identifiziere die echte Karawane unter den Spiegelbildern."
  en: "Identify the real caravan among the reflections."
quest.main.mq09.reward.free_run:
  de: "Sonnenglasweite Free Run freigeschaltet."
  en: "Sun-Glass Expanse Free Run unlocked."

quest.main.mq10.summary:
  de: "Der Wald fragt nach deinem Namen. Antworte vorsichtig."
  en: "The forest asks for your name. Answer carefully."
quest.main.mq10.objective.01:
  de: "Folge der gebrochenen Handelsroute in den Wurzelwald."
  en: "Follow the broken trade route into the Root-Forest."
quest.main.mq10.objective.02:
  de: "Überlebe den Namenlosen Nebel."
  en: "Survive the Nameless Fog."
quest.main.mq10.objective.03:
  de: "Entscheide, welchen Namen du den Wurzeln gibst."
  en: "Decide which name you give the roots."

quest.main.mq11.summary:
  de: "Ein Kind wurde vergessen, aber der Wald kaut noch auf seinem Namen."
  en: "A child was forgotten, but the forest is still chewing on her name."
quest.main.mq11.objective.01:
  de: "Befrage die Dorfbewohner über das namenlose Kind."
  en: "Question the villagers about the nameless child."
quest.main.mq11.objective.02:
  de: "Untersuche Spielzeug, Schlafplatz und Wurzelritzung."
  en: "Inspect the toy, sleeping mat, and root carving."
quest.main.mq11.objective.03:
  de: "Besiege die Tochter ohne Mund über drei Erinnerungsanker."
  en: "Defeat the Daughter Without a Mouth through three memory anchors."
quest.main.mq11.objective.04:
  de: "Entscheide über Ileths Namen."
  en: "Decide the fate of Ileth's name."
quest.main.mq11.reward.free_run:
  de: "Wurzelwald Nhal Free Run freigeschaltet."
  en: "Root-Forest Nhal Free Run unlocked."

quest.main.mq12.summary:
  de: "Am Dock kämpfen Arbeiter, Zünfte und Sturm um dieselben Knochen."
  en: "At the dock, workers, guilds, and storm fight over the same bones."
quest.main.mq13.summary:
  de: "Brannoks Kette führt zu seinem Bruder und zu einer Glocke, die nicht schweigt."
  en: "Brannok's chain leads to his brother and a bell that will not be silent."
quest.main.mq14.summary:
  de: "Unter der Brandung läutet etwas für die, die niemand bezahlt hat."
  en: "Beneath the surf, something tolls for those no one paid."
quest.main.mq14.reward.free_run:
  de: "Eisenbrandküste Free Run freigeschaltet."
  en: "Ironbrand Coast Free Run unlocked."

quest.main.mq15.summary:
  de: "Edda kennt den Preis der Eide, weil ihr Haus ihn anderen berechnet hat."
  en: "Edda knows the price of oaths because her house charged it to others."
quest.main.mq16.summary:
  de: "Der Pass muss offen bleiben. Die Frage ist, für wen."
  en: "The pass must stay open. The question is: for whom?"
quest.main.mq16.reward.free_run:
  de: "Hochkamm der Eidwacht Free Run freigeschaltet."
  en: "Highridge of the Oathwatch Free Run unlocked."

quest.main.mq17.summary:
  de: "Im Dunkelgrund kauft man zweite Namen und verkauft erste Gewissen."
  en: "In Deepdark, people buy second names and sell their first consciences."
quest.main.mq18.summary:
  de: "Sankt Ival schläft nicht. Maschinen schlafen nur, wenn niemand mehr betet."
  en: "Saint Ival does not sleep. Machines sleep only when no one keeps praying."
quest.main.mq18.reward.free_run:
  de: "Dunkelgrund Free Run freigeschaltet."
  en: "Deepdark Free Run unlocked."

quest.main.mq19.summary:
  de: "Der Asterhof zeigt Stimmen, die nie gesprochen haben, und Wahrheit, die trotzdem stimmt."
  en: "The Aster Court shows voices that never spoke and truths that are still true."
quest.main.mq20.summary:
  de: "Sereths Hand greift nicht nach dir. Sie hält dir nur hin, was du getragen hast."
  en: "Sereth's Hand does not reach for you. It simply offers back what you carried."
quest.main.mq20.reward.midgame:
  de: "Scherbenkrone-Midgame-Route freigeschaltet."
  en: "Shardcrown midgame route unlocked."
```

---

# 9. Side and Companion Quest Titles

```yaml
quest.side.sq_gr_01.title:
  de: "Die letzte Aalräucherei"
  en: "The Last Eel Smokehouse"
quest.side.sq_gr_02.title:
  de: "Joriks Laternenmarke"
  en: "Jorik's Lantern Mark"
quest.side.sq_gr_03.title:
  de: "Toma zählt Sterne"
  en: "Toma Counts Stars"
quest.side.sq_sg_01.title:
  de: "Mina braucht drei Unterschriften"
  en: "Mina Needs Three Signatures"
quest.side.sq_sg_02.title:
  de: "Der Brunnen singt rückwärts"
  en: "The Well Sings Backward"
quest.side.sq_sg_03.title:
  de: "Karawane ohne Schatten"
  en: "Caravan Without Shadows"
quest.side.sq_wn_01.title:
  de: "Harz für die Krankenstube"
  en: "Resin for the Ward"
quest.side.sq_wn_02.title:
  de: "Wer spricht für Ileth?"
  en: "Who Speaks for Ileth?"
quest.side.sq_eb_01.title:
  de: "Lohn in Rost"
  en: "Wages in Rust"
quest.side.sq_eb_02.title:
  de: "Der Kranführer schläft nicht"
  en: "The Crane-Driver Does Not Sleep"
quest.side.sq_hk_01.title:
  de: "Briefe unter Schnee"
  en: "Letters Under Snow"
quest.side.sq_hk_02.title:
  de: "Der Falke frisst zuerst"
  en: "The Falcon Eats First"
quest.side.sq_dg_01.title:
  de: "Ein zweiter Name kostet"
  en: "A Second Name Has a Price"
quest.side.sq_dg_02.title:
  de: "Pilzbahnhof 7"
  en: "Mushroom Station 7"
quest.side.sq_ah_01.title:
  de: "Was Ivara verbrannte"
  en: "What Ivara Burned"

quest.companion.cq_ly_01.title:
  de: "Was man aus brennenden Häusern trägt"
  en: "What You Carry from Burning Houses"
quest.companion.cq_mi_01.title:
  de: "Randnotizen einer Lügnerin"
  en: "Marginalia of a Liar"
quest.companion.cq_ta_01.title:
  de: "Zinsen auf Namen"
  en: "Interest on Names"
quest.companion.cq_si_01.title:
  de: "Der Name, den du behältst"
  en: "The Name You Keep"
quest.companion.cq_br_01.title:
  de: "Eron singt nicht mehr"
  en: "Eron No Longer Sings"
quest.companion.cq_ed_01.title:
  de: "Der Eid, der niemandem gehört"
  en: "The Oath That Belongs to No One"
quest.companion.cq_ka_01.title:
  de: "Keine Absolution"
  en: "No Absolution"
```

---

# 10. Bounty Localization

```yaml
bounty.bo_gr_01.title:
  de: "Der Damm ächzt"
  en: "The Dam Groans"
bounty.bo_gr_01.summary:
  de: "Halte die Ventile, während unter dem Wasser etwas im Takt der alten Dorfglocke klopft."
  en: "Hold the valves while something beneath the water knocks in time with the old village bell."
bounty.bo_gr_02.title:
  de: "Aale im Rauchhaus"
  en: "Eels in the Smokehouse"
bounty.bo_gr_03.title:
  de: "Keine Laterne für Feiglinge"
  en: "No Lantern for Cowards"
bounty.bo_sg_01.title:
  de: "Wasser ist kein Luxus"
  en: "Water Is Not a Luxury"
bounty.bo_sg_02.title:
  de: "Auktion ohne Hammer"
  en: "Auction Without a Hammer"
bounty.bo_sg_03.title:
  de: "Glasrochen Alpha: Spur im Himmel"
  en: "Glass Ray Alpha: Trail in the Sky"
bounty.bo_wn_01.title:
  de: "Drei Namen, kein Grab"
  en: "Three Names, No Grave"
bounty.bo_wn_02.title:
  de: "Pilzatem"
  en: "Spore Breath"
bounty.bo_wn_03.title:
  de: "Der Chor hört zu"
  en: "The Chorus Is Listening"
bounty.bo_eb_01.title:
  de: "Streikposten"
  en: "Strike Line"
bounty.bo_eb_02.title:
  de: "Keine Glocke unter Wasser"
  en: "No Bell Underwater"
bounty.bo_eb_03.title:
  de: "Kranhexe-Prototyp"
  en: "Crane-Witch Prototype"
bounty.bo_hk_01.title:
  de: "Passrecht"
  en: "Pass Right"
bounty.bo_hk_02.title:
  de: "Silberner Zeuge"
  en: "Silver Witness"
bounty.bo_dg_01.title:
  de: "Zweiter Name"
  en: "Second Name"
bounty.bo_dg_02.title:
  de: "Schacht ohne Licht"
  en: "Shaft Without Light"
bounty.bo_ah_01.title:
  de: "Beweislast"
  en: "Burden of Proof"
bounty.bo_ah_02.title:
  de: "Person vor Wahrheit"
  en: "Person Before Truth"
```

---

# 11. Status Tooltip Localization

```yaml
status.mondbrand.name:
  de: "Mondbrand"
  en: "Moonburn"
status.mondbrand.tooltip:
  de: "Brennt in Mondglasadern. Stapel erhöhen Schaden und verstärken Lyras Hausbrand. Bosse nehmen reduzierte Stapelwirkung."
  en: "Burns through moon-glass veins. Stacks increase damage and empower Lyra's Housefire. Bosses suffer reduced stack effects."
status.siegelriss.name:
  de: "Siegelriss"
  en: "Seal Fracture"
status.siegelriss.tooltip:
  de: "Reißt Schutz- und Tarnzeichen auf. Enthüllt Schwachstellen, verlängert Telegraphen und ermöglicht Runen-Kombos."
  en: "Splits protective and hidden sigils. Reveals weak points, extends telegraphs, and enables rune combos."
status.schuldmarke.name:
  de: "Schuldmarke"
  en: "Debt Mark"
status.schuldmarke.tooltip:
  de: "Markiert Ziele für Tareks Vertragsbruch. Decoys und Täuschungen nutzen diese Schuld als Zündschnur."
  en: "Marks targets for Tarek's Break Contract. Decoys and tricks use this debt as a fuse."
status.harzbindung.name:
  de: "Harzbindung"
  en: "Resin Bind"
status.harzbindung.tooltip:
  de: "Klebt Gegner fest, verlangsamt sie und verstärkt Siofras Fallen. Bosse werden nicht verwurzelt, aber gebremst."
  en: "Sticks enemies in place, slows them, and strengthens Siofra's traps. Bosses are not rooted, but slowed."
status.tiefenruf.name:
  de: "Tiefenruf"
  en: "Depthcall"
status.tiefenruf.tooltip:
  de: "Setzt einen Anker für Brannoks Harpune. Kleine Gegner werden gezogen; Bosse werden zum Ankerpunkt."
  en: "Sets an anchor for Brannok's harpoon. Small enemies are pulled; bosses become anchor points."
status.eidmarke.name:
  de: "Eidmarke"
  en: "Oath Mark"
status.eidmarke.tooltip:
  de: "Schützt Verbündete in Eddas Nähe. Erhöht Rüstung, Standhaftigkeit und kann Extraktionsgnade verlängern."
  en: "Protects allies near Edda. Increases armor, stability, and can extend extraction grace."
status.rostbruch.name:
  de: "Rostbruch"
  en: "Rustbreak"
status.rostbruch.tooltip:
  de: "Frisst durch Panzerung und Zauberfenster. Kael verursacht mehr Schaden gegen geschwächte oder wirkende Ziele."
  en: "Eats through armor and casting windows. Kael deals more damage to weakened or casting targets."
status.extraction_ready.name:
  de: "Extraktionsbereit"
  en: "Extraction Ready"
status.extraction_ready.tooltip:
  de: "Das Hauptziel ist erfüllt. Erreiche die Extraktionszone, bevor dich das Gebiet verschluckt."
  en: "The main objective is complete. Reach the extraction zone before the area swallows you."
status.extraction_contested.name:
  de: "Extraktion umkämpft"
  en: "Extraction Contested"
status.extraction_contested.tooltip:
  de: "Ein Feind oder gegnerisches Team blockiert die Zone. Der Countdown pausiert."
  en: "An enemy or opposing team is blocking the zone. The countdown is paused."
status.reliktdruck.name:
  de: "Reliktdruck"
  en: "Relic Pressure"
status.reliktdruck.tooltip:
  de: "Instabile Relikt-Tech baut Druck auf. Bei Überladung geht sie verloren oder explodiert."
  en: "Unstable Relic Tech is building pressure. If overloaded, it is lost or detonates."
status.serethblick.name:
  de: "Serethblick"
  en: "Sereth's Gaze"
status.serethblick.tooltip:
  de: "Sereth sieht, was du trägst. Feinde fokussieren dich stärker, und falsche Ziele werden wahrscheinlicher."
  en: "Sereth sees what you carry. Enemies focus you harder, and false objectives become more likely."
```

---

# 12. Dialogue Localization — Core Produced Lines

```yaml
dialogue.mq00.toma.sky.01:
  de: "Lyra, wenn der Mond nochmal bricht, fällt dann der Himmel ganz runter?"
  en: "Lyra, if the moon breaks again, will the whole sky fall down?"
dialogue.mq00.lyra.sky.02:
  de: "Dann halte ich ihn eben mit beiden Händen fest."
  en: "Then I'll hold it up with both hands."
dialogue.mq00.toma.sky.03:
  de: "Du hast nur zwei."
  en: "You only have two."
dialogue.mq00.lyra.sky.04:
  de: "Dann musst du helfen."
  en: "Then you'll have to help."

dialogue.mq01.raincoat.archive.01:
  de: "Nicht die Laterne."
  en: "Not the lantern."
dialogue.mq01.lyra.archive.02:
  de: "Was?"
  en: "What?"
dialogue.mq01.raincoat.archive.03:
  de: "Das Archiv."
  en: "The archive."

dialogue.mq03.ivara.light.01:
  de: "Wir retten nicht jeden. Wir halten nur genug Licht, damit die nächsten nicht im Dunkeln sterben."
  en: "We do not save everyone. We keep just enough light so the next ones do not die in the dark."
dialogue.mq03.lyra.light.02:
  de: "Das klingt wie etwas, das sich jemand sagt, wenn er schon entschieden hat, wen er nicht rettet."
  en: "That sounds like something people say after they've already decided who not to save."

dialogue.mq04.mira.seal.01:
  de: "Das ist kein Schutzsiegel."
  en: "That is not a protection seal."
dialogue.mq04.lyra.seal.02:
  de: "Sondern?"
  en: "Then what is it?"
dialogue.mq04.mira.seal.03:
  de: "Eine Tür, die von innen abgeschlossen wurde."
  en: "A door locked from the inside."

dialogue.mq07.tarek.property.01:
  de: "Wenn ich Besitz bin, dann lass mich wenigstens von jemandem mit Geschmack stehlen."
  en: "If I am property, at least let someone with taste steal me."
dialogue.mq07.lyra.property.02:
  de: "Ich stehle dich nicht."
  en: "I am not stealing you."
dialogue.mq07.tarek.property.03:
  de: "Schade. Das wäre der ehrlichste Vertrag in diesem Gebäude."
  en: "Shame. It would be the most honest contract in this building."

dialogue.bounty.sg01.mina.water.01:
  de: "Sie werden das Diebstahl nennen."
  en: "They will call this theft."
dialogue.bounty.sg01.tarek.water.02:
  de: "Gut. Diebstahl nennen Reiche es, wenn Hunger rechnen lernt."
  en: "Good. Theft is what rich people call it when hunger learns arithmetic."

dialogue.mq20.ivara.truth.01:
  de: "Du glaubst, Wahrheit sei sauber, weil du noch nie Blut damit waschen musstest."
  en: "You think truth is clean because you have never had to wash blood with it."
dialogue.mq20.lyra.truth.02:
  de: "Nein. Ich glaube, Lügen sind schmutzig, weil du uns darunter schlafen lassen hast."
  en: "No. I think lies are dirty because you made us sleep beneath them."
```

---

# 13. Errors, Validation, Debug

```yaml
error.localization.missing_key:
  de: "Fehlender Textschlüssel: {key}"
  en: "Missing localization key: {key}"
error.deploy.invalid_loadout:
  de: "Dieses Loadout ist für {area} nicht gültig: {reason}"
  en: "This loadout is not valid for {area}: {reason}"
error.quest.locked:
  de: "Diese Quest ist noch gesperrt. Voraussetzung: {requirement}"
  en: "This quest is still locked. Requirement: {requirement}"
error.free_run.locked:
  de: "Free Run ist in diesem Gebiet noch gesperrt. Schließe zuerst die Gebietsquestline ab."
  en: "Free Run is still locked in this area. Complete the area questline first."
debug.title:
  de: "Debug Suite"
  en: "Debug Suite"
debug.start_run:
  de: "Debug-Lauf starten"
  en: "Start Debug Run"
debug.stop_run:
  de: "Debug-Lauf stoppen"
  en: "Stop Debug Run"
debug.screenshot:
  de: "Screenshot mit Zeitstempel"
  en: "Timestamped Screenshot"
debug.note.placeholder:
  de: "Was passiert gerade?"
  en: "What is happening right now?"
debug.export_report:
  de: "Debug-Report exportieren"
  en: "Export Debug Report"
debug.admin_only:
  de: "Debug-Funktionen sind nur für autorisierte Admins sichtbar."
  en: "Debug features are visible only to authorized admins."
```

---

# 14. Localization QA

- Every key above must exist in both `de` and `en`.
- Quest data must reference keys, not raw text.
- Deploy, Quest Log, HUD, Run Summary, Codex, Debug, and Settings must use the same localization backend.
- Placeholders must be validated at build time: if `de` has `{area}`, `en` must also have `{area}`.
- English should be reviewed for mood, not literalness.
- German should avoid modern slang unless a character intentionally uses it.
- Missing key in dev shows key name; production should show safe fallback and log error.

## Implementation Recommendation

Represent localization data as structured JSON or TypeScript object generated from this document. Example:

```ts
export const strings = {
  'quest.main.mq04.title': {
    de: 'Die Sumpfkathedrale',
    en: 'The Marsh Cathedral',
  },
};
```

Recommended runtime call:

```ts
t('quest.main.mq04.title')
t('extraction.hold', { seconds: 30 })
```

## Coverage Status

This file pre-produces the required first-pass text layer for:

- Core UI
- Boot menu
- Hub tabs
- Deploy
- Campaign structure
- Extraction
- Run Summary
- Region cards
- Character cards
- Main quest titles, summaries, and core objectives
- Side quest and companion quest titles
- Bounty titles
- Status names/tooltips
- Key dialogue lines already used in the Quest Bible
- Errors and Debug Suite

Future implementation may add more granular banter, alternate branch lines, NPC ambient lines, item flavor, and full Codex entries. Those additions must follow the same DE/EN key structure.

## Vertical Slice Localization Keys
-  (DE/EN)
-  (DE/EN)
-  (DE/EN)
-  selected/confirm/single-contract messaging

## Vertical Slice Localization Keys
- area.graumarsch_chemiefabrik.name (DE/EN)
- area.graumarsch_chemiefabrik.description (DE/EN)
- ui.map.state.* (DE/EN)
- ui.bounty.* selected/confirm/single-contract messaging
