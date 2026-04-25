# Scherbenhimmel 20h Content Package v2 - Mechanics Database

Dieses Paket erweitert die urspruengliche 20h-Content-Bible um konkrete Spielmechanik- und Datenbankinhalte.

## Wichtigste Dateien
- `Mechanics_and_Database_Bible_v2.md` - Gesamtueberblick ueber Combat, Vehicle Combat, Status, Upgrades, Loot, Multiplayer und Bosse.
- `Character_Ability_Bible_v2.md` - Alle Charaktere, Faehigkeiten, Vehicle-Techniken und Upgrade-Knoten.
- `Vehicle_Combat_Bible_v2.md` - Fahrzeugslots, Module, Fahrgefuehl, regionale Regeln.
- `Boss_Encounter_Bible_v2.md` - Bossphasen, Arena, Kooprollen, Vehicle-Mechaniken, Lootlogik.
- `Loot_Drop_Crafting_Bible_v2.md` - Voller Lootkatalog, Drop Tables, Crafting-Rezepte.
- `database/*.json` - Maschinenlesbare Content-Daten.
- `database_csv/*.csv` - Spreadsheet-freundliche Exporte.
- `scherbenhimmel_content_database.sqlite` - SQLite-Version der Datenbank.
- `database_schema.sql` - SQL-Schema.
- `implementation_startprompt_v2.md` - Startprompt fuer Codex/Agenten.

## Counts
- Characters: 12
- Abilities: 156
- Upgrades: 144
- Status Effects: 15
- Vehicle Modules: 41
- Loot Items: 187
- Enemies: 42
- Bosses: 10
- Boss Phases: 30
- Multiplayer Combos: 86
- Drop Tables: 52
- Crafting Recipes: 40

## Design-Fokus
Vehicle Combat bleibt Kernspiel. Jeder Charakter besitzt zu Fuss und im Fahrzeug eine klare Identitaet. Jeder Zufallsdrop ist katalogisiert. Bosse haben Phasen, Kooprollen, Fail-States und Lootlogik.
