# Implementation Startprompt - Scherbenhimmel v2 Mechanics Database

Du arbeitest im htowncombat/scherbenhimmel Repo. Ziel: Die Dateien aus diesem Paket als datengetriebene Content-Grundlage integrieren.

## Scope
- JSON-Content unter `database/` importieren.
- TypeScript-Typen fuer Characters, Abilities, Upgrades, VehicleModules, LootItems, DropTables, Bosses, Enemies und MultiplayerCombos bauen.
- Dev-only Database Browser im Spiel erstellen: Suche, Filter nach Region/Tier/Charakter, Detailansicht.
- Vehicle Combat nicht als Nebensystem bauen: Jede Ability hat `onfoot_effect`, `vehicle_effect`, `multiplayer_hook`.

## Empfohlene Struktur
- `src/data/content/characters.ts`
- `src/data/content/abilities.ts`
- `src/data/content/upgrades.ts`
- `src/data/content/vehicleModules.ts`
- `src/data/content/lootItems.ts`
- `src/data/content/dropTables.ts`
- `src/data/content/bosses.ts`
- `src/data/content/multiplayerCombos.ts`
- `src/systems/drop/rollDrop.ts`
- `src/systems/vehicle/vehicleLoadout.ts`
- `src/systems/combat/statusEffects.ts`
- `src/ui/dev/ContentDatabasePanel.tsx`

## Harte Regeln
1. Keine Power im Premium/Kosmetikpfad.
2. Jeder Drop muss in `loot_items.json` existieren, bevor er in einer Drop Table referenziert wird.
3. Jede Ability muss zu Fuss und im Vehicle-Kontext eine lesbare Funktion haben.
4. Bosse skalieren Koop ueber Zusatzrollen, nicht nur HP.
5. Debug-Panel soll fehlende IDs, tote Drop-References und leere Unlocks anzeigen.

## Validation Tasks
- Lade alle JSONs und pruefe ID-Eindeutigkeit.
- Pruefe Drop Tables: Summe der Weights > 0, alle item_id existieren.
- Pruefe Abilities: character_id existiert.
- Pruefe Upgrades: character_id existiert.
- Pruefe Boss Phases: Jeder Boss hat mindestens 3 Phasen.

## Content Counts
- Characters: 12
- Abilities: 156
- Upgrades: 144
- Vehicle Modules: 41
- Loot Items: 187
- Enemies: 42
- Bosses: 10
- Multiplayer Combos: 86
- Drop Tables: 52
