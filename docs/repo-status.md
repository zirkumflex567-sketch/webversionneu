# Repo-Status dieses Arbeitsstands (Update: Kapitel 2 Vorbereitung)

## Was hier gemacht wurde

- **Content System**: Umstellung auf datengetriebene Architektur (`src/content/schema.ts`).
- **Datenbank**: Vollständige Synchronisation mit Scherbenhimmel v2 Bibles (12 Charaktere, >100 Loot-Items, alle Hauptbosse, Fahrzeug-Module, Multiplayer-Kombos).
- **Content Browser**: Internes Tool zur Verifizierung der Charakter-Kits, Drop-Tables und Modul-Synergien.
- **Fahrzeug-System**: 12 charakter-spezifische Rigs mit 8 Modul-Slots (Front, Side, Rear, Mobility, Core, Chassis, Weapon 1/2) definiert.
- **Multiplayer-Synergien**: Duo/Trio Kombos und Konvoi-Manöver in der Datenbank gemappt.
- **Deployment**: Combat-Web aktiv unter /combat; HUD und Hub-Logik für 12 Piloten vorbereitet.

## Aktueller technischer Stand

- **Branch**: `main` (nach GitHub gepusht).
- **Engine**: Three.js + Custom HordeDirector.
- **State**: Zustand über StoryStore (Zustand & Flags) und GameStore (Stats & Combat).

## Was noch offen ist

- **Kapitel 2 Content**: MQ-07 bis MQ-10 detaillieren (Salzschuld-Arc).
- **Asset-Integration**: Finale Synty-GLB Modelle für die Glass-Enemies ersetzen.
- **Mechanik**: Polarisations-Linse als echtes Item mit Gameplay-Effekt (Sichtweite im Nebel).

## Übersicht Narrative Flags
- `mq01_saved_school` / `mq01_saved_smokehouse`
- `mq03_hub_rebuilt` (schaltet Archiv frei)
- `mq04_boss_defeated` (schaltet Lore im Archiv frei)
