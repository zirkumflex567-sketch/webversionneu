# Startprompt für Codex/Agenten – Scherbenhimmel 20h Content implementieren

Arbeite direkt im Filesystem des htown-combat-web Projekts. Ziel ist nicht, alles sofort als fertiges AAA-RPG zu bauen, sondern die 20h-Contentstruktur technisch sauber als datengetriebenes Quest-/Lore-/NPC-System vorzubereiten.

## Quellen
- Nutze `Scherbenhimmel_20h_Content_Bible.md` als Kanon.
- Nutze `quest_index.csv` als Questliste.
- Nutze `npc_roster.json` als NPC-Basis.
- Nutze `quest_flags.json` als Entscheidungs-/World-State-Grundlage.

## Aufgaben
1. Lege einen Datenordner für Story Content an, z.B. `src/data/story/`.
2. Erzeuge TypeScript-Interfaces für Quest, NPC, Reward, Region, WorldStateFlag.
3. Importiere/konvertiere die Questliste in ein maschinenlesbares Format.
4. Baue ein kleines Debug-UI oder Dev-Panel, das Quests, aktuelle Flags und freigeschaltete NPCs anzeigen kann.
5. Implementiere keine generischen Placeholder-Texte. Nutze die echten Titel, Beschreibungen und Flags aus dem Content-Paket.
6. Setze das System so auf, dass später Dialoge, Rewards und World-State-Reaktionen erweitert werden können.

## Akzeptanzkriterien
- Das Projekt startet ohne TypeScript-Fehler.
- Quests sind aus Daten ladbar, nicht hardcodiert in Komponenten.
- NPCs und Quests referenzieren Regionen sauber.
- Questflags können im Dev-Panel gesetzt/geändert werden.
- Mindestens MQ-00 bis MQ-05 sind als spielbarer/prototypischer Flow sichtbar oder testbar.
