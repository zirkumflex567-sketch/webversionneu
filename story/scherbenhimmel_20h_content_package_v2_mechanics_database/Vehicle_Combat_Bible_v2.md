# Scherbenhimmel v2 - Vehicle Combat Bible


## Zielbild
Vehicle Combat soll sich nicht wie ein Minigame anfuehlen, sondern wie die zweite Haelfte jedes Charakters. Die Fahrzeuge sind schmutzige, mystische Kampfmaschinen: halb Karre, halb Monster, halb Reliquie. Sie fahren durch Moor, Glaswueste, Hafensturm, Alpenpass, Tunnel und Scherbenkrone - und jede Region veraendert die Regeln.

## Slots
1. Chassis: Grundbewegung und Gewicht.
2. Kern: Hitze, Resonanz, Spezialenergie.
3. Frontwaffe: Rammen, Bohrer, Kanonen, Pfluege.
4. Seitenwaffe: Drive-by-Schaden, Minen, Bannlaternen.
5. Heckmodul: Rauch, Reparatur, Koeder, Anker.
6. Mobilitaet: Risssprung, Kletterkette, Sturmsegel.
7. Panzerung: Schild, Platten, Spiegelung.
8. Crew-Relikt: Charakterbindung und Duo-Fenster.

## Fahrgefuehl nach Region
- Graumarsch: Schlamm bremst, Wasserlinien werden mit Moorlaeufer-Mods zu Vorteilen.
- Sonnenglasweite: Weite Drifts, Hitze-Management, Sandstuerme als Sicht- und Boostspiel.
- Wurzelwald: Enge Pfade, lebende Hindernisse, Harzfallen.
- Eisenbrandkueste: Hafenrampen, Wellen, Krane, Harpunenwinkel.
- Hochkamm: Eis, Steigung, Lawinen, Falkenangriffe.
- Dunkelgrund: Tunnel, Waende, Abkuerzungen, Bohrer und Schrottnebel.
- Scherbenkrone: Gravitation bricht, Rissspruenge und Archivtore dominieren.

## Module

|id|name|slot|tier|source|effect|
|---|---|---|---|---|---|
|vm_001|Moorlaeufer-Rahmen|chassis|gewoehnlich|Sonnenglasweite|Sumpf und flaches Wasser verlieren fast alle Bremswirkung.|
|vm_002|Rissjaeger-Rahmen|chassis|gewoehnlich|Wurzelwald|Sehr leichter Rahmen fuer Drift, Sprung und seitliche Ausweichfenster.|
|vm_003|Eidpanzer-Rahmen|chassis|gewoehnlich|Eisenbrandkueste|Langsam, aber Verbundete koennen hinter dir Schildladung aufbauen.|
|vm_004|Sandsegler-Rahmen|chassis|gewoehnlich|Hochkamm|Auf Glas, Salz und Sand gewinnt das Fahrzeug bei Drift Tempo statt es zu verlieren.|
|vm_005|Schachtspinne-Rahmen|chassis|gewoehnlich|Dunkelgrund|Kann kurz an Waenden und Tunnelkanten haften.|
|vm_006|Werftbastion-Rahmen|chassis|gewoehnlich|Scherbenkrone|Ramm- und Harpunenmodule verursachen mehr Haltungsbruch.|
|vm_007|Echo-Rahmen|chassis|gewoehnlich|Graumarsch|Erlaubt kurze Phasenverschiebung, aber macht den Kern hitzeanfaellig.|
|vm_008|Konvoi-Rahmen|chassis|gewoehnlich|Sonnenglasweite|Skaliert im Koop: nahe Fahrzeuge bekommen kleine Laternenbarriere.|
|vm_009|Mondglas-Kern|core|veredelt|Wurzelwald|Allround-Kern mit stabiler Hitze und guter Resonanzgeneration.|
|vm_010|Salzspiegel-Kern|core|veredelt|Eisenbrandkueste|Staerker bei hoher Geschwindigkeit; schwach bei Stillstand.|
|vm_011|Harzherz-Kern|core|veredelt|Hochkamm|Regeneriert in Naturzonen, kann aber durch Feuer ueberhitzen.|
|vm_012|Tiefenglocken-Kern|core|veredelt|Dunkelgrund|Rammangriffe erzeugen Schockwellen und ziehen leichte Gegner an.|
|vm_013|Eidkern|core|veredelt|Scherbenkrone|Schild staerker, Schaden niedriger, perfekte Blocks geben Teamenergie.|
|vm_014|Schrottfunken-Kern|core|veredelt|Graumarsch|Billig zu reparieren, aber instabil. Kritische Treffer koennen Module resetten.|
|vm_015|Archivkern|core|veredelt|Sonnenglasweite|Sigile bleiben laenger auf der Strecke, Gegnerdaten werden markiert.|
|vm_016|Kettenramme|front_weapon|veredelt|Wurzelwald|Kurze schwere Frontattacke, bricht Barrikaden und Panzerplatten.|
|vm_017|Funkenkanone|front_weapon|veredelt|Eisenbrandkueste|Mittlere Reichweite, baut Mondbrand auf.|
|vm_018|Harpunenlanze|front_weapon|selten|Hochkamm|Zieht Ziele oder zieht dich an schwere Ziele heran.|
|vm_019|Runenpflug|front_weapon|selten|Dunkelgrund|Legt beim Driften Sigillinien auf den Boden.|
|vm_020|Salzstreuer|front_weapon|selten|Scherbenkrone|Blendet Fahrer, Schuetzen und fliegende Gegner.|
|vm_021|Dornenwalze|front_weapon|selten|Graumarsch|Fuegt Harzbindung zu und zerfetzt Reifen/Beine.|
|vm_022|Schachtbohrer|front_weapon|selten|Sonnenglasweite|Fuegt Panzerbruch zu und oeffnet Tunnelabkuerzungen.|
|vm_023|Falkenspeer|front_weapon|selten|Wurzelwald|Praezise Frontlanze mit hohem Schaden gegen markierte Ziele.|
|vm_024|Seitensense|side_weapon|selten|Eisenbrandkueste|Schneidet beim Vorbeifahren durch leichte Gegnergruppen.|
|vm_025|Nietwerfer|side_weapon|selten|Hochkamm|Schneller Seitenbeschuss, skaliert mit Ueberladung.|
|vm_026|Echozunge|side_weapon|selten|Dunkelgrund|Greift durch Illusionsschilde, kostet aber Kernstabilitaet.|
|vm_027|Wurzelwerfer|side_weapon|signatur|Scherbenkrone|Setzt organische Minen auf der Strecke ab.|
|vm_028|Schrapnellorgel|side_weapon|signatur|Graumarsch|Breite Streuung gegen Schwarmgegner.|
|vm_029|Bannlaterne|side_weapon|signatur|Sonnenglasweite|Verlangsamt Projektile im Nahbereich des Fahrzeugs.|
|vm_030|Rauchfass|rear_utility|signatur|Wurzelwald|Bricht Zielerfassung und legt Rostbruch.|
|vm_031|Reparaturkran|rear_utility|signatur|Eisenbrandkueste|Heilt ein nahes Fahrzeug oder eigenes Heckmodul.|
|vm_032|Koederfackel|rear_utility|signatur|Hochkamm|Lockt Nachtflut-Schwarm und Raketen auf eine falsche Spur.|
|vm_033|Konvoianker|rear_utility|signatur|Dunkelgrund|Verbindet zwei Fahrzeuge fuer Schleuder- oder Rettungsmanoever.|
|vm_034|Risssprung-Duese|mobility|signatur|Scherbenkrone|Kurzer Sprung ueber Graben, Wellen und Risslinien.|
|vm_035|Ankerkurve|mobility|signatur|Graumarsch|Extrem enge Kurve, wenn kurz vorher gebremst wird.|
|vm_036|Kletterkette|mobility|relikt|Sonnenglasweite|Haelt an vertikalen Kanten, besonders in Dunkelgrund.|
|vm_037|Sturmsegel|mobility|relikt|Wurzelwald|Nutzt Windzonen fuer Boost statt Kontrollverlust.|
|vm_038|Laternenpanzer|armor|relikt|Eisenbrandkueste|Schild regeneriert nach 4 Sekunden ohne Schaden.|
|vm_039|Schlackeplatten|armor|relikt|Hochkamm|Sehr hohe Frontpanzerung, schwache Seiten.|
|vm_040|Harzschicht|armor|relikt|Dunkelgrund|Schluckt kleine Treffer und repariert sich langsam.|
|vm_041|Spiegellack|armor|relikt|Scherbenkrone|Chance, Zielmarkierungen auf Gegner zurueckzuwerfen.|

## Charakter-Fahrzeuge


### Dornwolf - Lyra Dorn

**Klasse:** leichter Rissjaeger  
**Kernfantasie:** Interceptor / Duellantin als Fahrzeug.  
**Fahrstil:** schnell, schmutzig, direkt  
**Status:** Mondbrand

- **Rissdrift:** Signaturmodul, das Mondbrand in Bewegung bringt und Koop-Fenster oeffnet.

- **Pistolenkuppel:** Signaturmodul, das Mondbrand in Bewegung bringt und Koop-Fenster oeffnet.

- **Dornramme:** Signaturmodul, das Mondbrand in Bewegung bringt und Koop-Fenster oeffnet.


### Archivspinne - Mira Voss

**Klasse:** Sigil-Legerin  
**Kernfantasie:** Controller / Runenbrecherin als Fahrzeug.  
**Fahrstil:** kontrolliert, analytisch, gefaehrlich  
**Status:** Siegelriss

- **Runenminen:** Signaturmodul, das Siegelriss in Bewegung bringt und Koop-Fenster oeffnet.

- **Gedaechtnisnetz:** Signaturmodul, das Siegelriss in Bewegung bringt und Koop-Fenster oeffnet.

- **Spiegelanker:** Signaturmodul, das Siegelriss in Bewegung bringt und Koop-Fenster oeffnet.


### Glasfuchs - Tarek al-Sahir

**Klasse:** Sandsegler  
**Kernfantasie:** Skirmisher / Taeuscher als Fahrzeug.  
**Fahrstil:** mobil, taeuschend, riskant  
**Status:** Schuldmarke

- **Sandsegelboost:** Signaturmodul, das Schuldmarke in Bewegung bringt und Koop-Fenster oeffnet.

- **Koederfackel:** Signaturmodul, das Schuldmarke in Bewegung bringt und Koop-Fenster oeffnet.

- **Schuldenpflug:** Signaturmodul, das Schuldmarke in Bewegung bringt und Koop-Fenster oeffnet.


### Moorkaefer - Siofra Nhal

**Klasse:** Bio-Crawler  
**Kernfantasie:** Ranger / Fallenbinderin als Fahrzeug.  
**Fahrstil:** praezise, lauernd, organisch  
**Status:** Harzbindung

- **Sumpfgriff:** Signaturmodul, das Harzbindung in Bewegung bringt und Koop-Fenster oeffnet.

- **Sporenwolke:** Signaturmodul, das Harzbindung in Bewegung bringt und Koop-Fenster oeffnet.

- **Herzwurzelzug:** Signaturmodul, das Harzbindung in Bewegung bringt und Koop-Fenster oeffnet.


### Riffbrecher - Brannok Reef

**Klasse:** Rammbastion  
**Kernfantasie:** Bruiser / Harpunierer als Fahrzeug.  
**Fahrstil:** schwer, laut, brutal ehrlich  
**Status:** Tiefenruf

- **Bugramme:** Signaturmodul, das Tiefenruf in Bewegung bringt und Koop-Fenster oeffnet.

- **Kettenharpune:** Signaturmodul, das Tiefenruf in Bewegung bringt und Koop-Fenster oeffnet.

- **Brandungswalze:** Signaturmodul, das Tiefenruf in Bewegung bringt und Koop-Fenster oeffnet.


### Eidpanzer - Edda Falkenlicht

**Klasse:** Konvoi-Schild  
**Kernfantasie:** Tank / Bannstandarte als Fahrzeug.  
**Fahrstil:** standhaft, taktisch, ehrenhart  
**Status:** Eidmarke

- **Eidschild:** Signaturmodul, das Eidmarke in Bewegung bringt und Koop-Fenster oeffnet.

- **Konvoiwand:** Signaturmodul, das Eidmarke in Bewegung bringt und Koop-Fenster oeffnet.

- **Falkensturz:** Signaturmodul, das Eidmarke in Bewegung bringt und Koop-Fenster oeffnet.


### Schachtmaus - Kael Nhar

**Klasse:** Tunnel-Sprinter  
**Kernfantasie:** Assassin / Debuffer als Fahrzeug.  
**Fahrstil:** schmutzig, schnell, hinterhaeltig  
**Status:** Rostbruch

- **Tunnelhaken:** Signaturmodul, das Rostbruch in Bewegung bringt und Koop-Fenster oeffnet.

- **Schrottnebel:** Signaturmodul, das Rostbruch in Bewegung bringt und Koop-Fenster oeffnet.

- **Klingenreifen:** Signaturmodul, das Rostbruch in Bewegung bringt und Koop-Fenster oeffnet.


### Pilgerglocke - Oren Vale

**Klasse:** Support-Kutsche  
**Kernfantasie:** Support / Heiler-Monk als Fahrzeug.  
**Fahrstil:** ruhig, schuetzend, unbequem mutig  
**Status:** Wundlicht

- **Heilglocke:** Signaturmodul, das Wundlicht in Bewegung bringt und Koop-Fenster oeffnet.

- **Pilgerschild:** Signaturmodul, das Wundlicht in Bewegung bringt und Koop-Fenster oeffnet.

- **Rettungsleine:** Signaturmodul, das Wundlicht in Bewegung bringt und Koop-Fenster oeffnet.


### Kranhexe - Yara Kest

**Klasse:** Werkstatt-Rig  
**Kernfantasie:** Engineer / Drohnenkern als Fahrzeug.  
**Fahrstil:** technisch, aufladend, improvisierend  
**Status:** Ueberladung

- **Kranarm:** Signaturmodul, das Ueberladung in Bewegung bringt und Koop-Fenster oeffnet.

- **Reparaturfeld:** Signaturmodul, das Ueberladung in Bewegung bringt und Koop-Fenster oeffnet.

- **Schlackewerfer:** Signaturmodul, das Ueberladung in Bewegung bringt und Koop-Fenster oeffnet.


### Traumsaege - Neris Vael

**Klasse:** Echo-Risslaeufer  
**Kernfantasie:** Echo-Mage / Opfermagie als Fahrzeug.  
**Fahrstil:** zerbrechlich, unheimlich, explosiv  
**Status:** Echohunger

- **Traumspur:** Signaturmodul, das Echohunger in Bewegung bringt und Koop-Fenster oeffnet.

- **Echoportal:** Signaturmodul, das Echohunger in Bewegung bringt und Koop-Fenster oeffnet.

- **Seelenmotor:** Signaturmodul, das Echohunger in Bewegung bringt und Koop-Fenster oeffnet.


### Sturmwidder - Velka Sturmtritt

**Klasse:** Jagd-Rig  
**Kernfantasie:** Lancer / Verfolgerin als Fahrzeug.  
**Fahrstil:** verfolgend, kontrollierend, gnadenlos praezise  
**Status:** Sturmjagd

- **Verfolgungsseil:** Signaturmodul, das Sturmjagd in Bewegung bringt und Koop-Fenster oeffnet.

- **Sturmkamm:** Signaturmodul, das Sturmjagd in Bewegung bringt und Koop-Fenster oeffnet.

- **Rammgalopp:** Signaturmodul, das Sturmjagd in Bewegung bringt und Koop-Fenster oeffnet.


### Namenloser Kern - Cyr Ohne Gestern

**Klasse:** Transform-Rig  
**Kernfantasie:** Adaptive / Formwechsel als Fahrzeug.  
**Fahrstil:** adaptiv, fremd, lernend  
**Status:** Formschock

- **Kernwechsel:** Signaturmodul, das Formschock in Bewegung bringt und Koop-Fenster oeffnet.

- **Maskenpanzer:** Signaturmodul, das Formschock in Bewegung bringt und Koop-Fenster oeffnet.

- **Unmoeglicher Winkel:** Signaturmodul, das Formschock in Bewegung bringt und Koop-Fenster oeffnet.
