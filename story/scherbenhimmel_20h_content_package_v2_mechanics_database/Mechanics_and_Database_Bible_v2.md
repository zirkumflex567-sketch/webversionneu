# Scherbenhimmel v2 - Mechanics, Vehicle Combat und Content-Datenbank

**Ziel:** Diese Erweiterung macht aus der 20h-Story-Bible eine produktionsnahe Content-Datenbank: Charaktere, Faehigkeiten, Upgrades, Vehicle Combat, Drops, Bosse, Gegner, Crafting und Multiplayer-Synergien.

## 1. Harte Design-Entscheidung: Vehicle Combat bleibt Kernspiel


Scherbenhimmel ist in dieser Version kein normales Fantasy-ARPG mit ein paar Reittieren. Es ist ein **on-foot + vehicle combat RPG**. Jede Figur hat eine Kampfidentitaet zu Fuss und ein dazu passendes Rissfahrzeug. Das Fahrzeug ist kein Taxi, sondern ein zweiter Skilltree: Chassis, Kern, Frontwaffe, Seitenwaffe, Heckmodul, Mobilitaet, Panzerung und Crew-Relikt.

Der Kerntrick: Dieselben Storythemen tauchen mechanisch wieder auf. Lyra faehrt aggressiv und schneidet durch Luecken. Mira legt Sigile auf die Fahrbahn. Tarek baut falsche Routen. Brannok reißt Gegner mit Harpunen in Rammwinkel. Edda wird zur mobilen Wand. Kael spielt Tunnel, Nebel und Sabotage. So bleibt Vehicle Combat nicht generisch, sondern charaktergetrieben.

## 2. Vehicle Combat Grundregeln


**Lenkung:** Fahrzeuge haben Gewicht, aber keine Simulationstraegheit, die Spielbarkeit killt. Driften, Ankerkurven und Rissspruenge sind bewusst ueberzeichnet.

**Hitze:** Jedes offensive Modul erzeugt Hitze. Hohe Hitze gibt mehr Schaden, aber macht den Kern anfaelliger. Gute Spieler fahren nicht nur schneller, sie fahren im roten Bereich kontrolliert.

**Resonanz:** Teamressource. Entsteht durch perfektes Ausweichen, Rammschaden, Schwachpunkt-Treffer, Rettungsaktionen und Duo-Manoever. Resonanz startet Ultimates und Konvoi-Manoever.

**Fahrzeugzonen:** Front, Seite, Heck, Kern. Bosse besitzen eigene Zonen. Harpunen ziehen an Seitenplatten, Rammen treffen Frontplatten, Bohrer treffen Unterboden, Echoangriffe treffen Kern.

**Crew-Flow:** Solo steuert die KI Companion-Waffen nach einfachen Befehlen. Im Koop teilen Spieler Rollen nicht als starre Fahrer/Gunner-Klasse, sondern ueber Loadout: einer zieht, einer bricht, einer schuetzt, einer repariert.

## 3. Charaktere und Fahrzeuge

|id|name|role|weapon|vehicle|vehicle_class|unlock|playable_20h|
|---|---|---|---|---|---|---|---|
|char_lyra|Lyra Dorn|Interceptor / Duellantin|Doppelklinge + Funkenpistole|Dornwolf|leichter Rissjaeger|Prolog: Funken im Schlamm|True|
|char_mira|Mira Voss|Controller / Runenbrecherin|Runenklingen + Archivsigil|Archivspinne|Sigil-Legerin|Kapitel 1: Sumpfkathedrale|True|
|char_tarek|Tarek al-Sahir|Skirmisher / Taeuscher|Speer + Spiegelkoeder|Glasfuchs|Sandsegler|Kapitel 2: Salzschuld|True|
|char_siofra|Siofra Nhal|Ranger / Fallenbinderin|Harzbogen + lebende Fallen|Moorkaefer|Bio-Crawler|Kapitel 3: Der Wald vergisst|True|
|char_brannok|Brannok Reef|Bruiser / Harpunierer|Ankerklinge + Harpune|Riffbrecher|Rammbastion|Kapitel 4: Die Glocke unter der Brandung|True|
|char_edda|Edda Falkenlicht|Tank / Bannstandarte|Grossschwert + Eidbanner|Eidpanzer|Konvoi-Schild|Kapitel 5: Falken ohne Himmel|True|
|char_kael|Kael Nhar|Assassin / Debuffer|Dolche + Schachtgift|Schachtmaus|Tunnel-Sprinter|Kapitel 6: Schacht Null|True|
|char_oren|Oren Vale|Support / Heiler-Monk|Kettenstab + Wards|Pilgerglocke|Support-Kutsche|Kapitel 5 optional, voll ab Post-20h|False|
|char_yara|Yara Kest|Engineer / Drohnenkern|Schmiedehammer + Reparaturdrohne|Kranhexe|Werkstatt-Rig|Post-20h: Aschdock-Rebellion|False|
|char_neris|Neris Vael|Echo-Mage / Opfermagie|Sichel + Echoadern|Traumsaege|Echo-Risslaeufer|Post-20h: Stimme im Glas Nachhall|False|
|char_velka|Velka Sturmtritt|Lancer / Verfolgerin|Lanze + Sturmleine|Sturmwidder|Jagd-Rig|Post-20h: Kein Grab fuer Sturmreiter|False|
|char_cyr|Cyr Ohne Gestern|Adaptive / Formwechsel|Resonanzwaffe|Namenloser Kern|Transform-Rig|Post-20h: Asterhof-Geheimnis|False|


## 4. Status-Effekte

|id|name|type|detail|
|---|---|---|---|
|st_mondbrand|Mondbrand|damage_over_time|Brennt nicht auf Haut, sondern in Erinnerung. Stapelt bis 5; bei 5 Stapeln explodiert der Gegner in einem Lichtknall, der Illusionen enttarnt.|
|st_siegelriss|Siegelriss|armor_break|Schwaecht magische Panzerung und macht verborgene Schwachpunkte sichtbar. Besonders stark gegen Archivleiber und Echohuelsen.|
|st_schuldmarke|Schuldmarke|redirect|Markierte Gegner nehmen Zusatzschaden, wenn sie Verbundete angreifen. Bei Tod springt die Marke auf den naechsten Elitegegner.|
|st_harzbindung|Harzbindung|root_slow|Verlangsamt Bewegung, Geschossdrehung und Fahrzeuglenkung. Bei Kontakt mit Feuer wird daraus Harzbrand.|
|st_tiefenruf|Tiefenruf|taunt_vulnerability|Zwingt leichte Gegner kurz in Brannoks Richtung und erhoeht erhaltenen Rammschaden.|
|st_eidmarke|Eidmarke|guard_counter|Gegner mit Eidmarke loesen beim Angriff auf geschuetzte Ziele einen Gegenbann aus.|
|st_rostbruch|Rostbruch|weakness|Reduziert Reparatur, Schildgeneration und Fahrzeugpanzerung. Wird durch Schrottnebel stark verlaengert.|
|st_wundlicht|Wundlicht|heal_mark|Heilmarke auf Verbundeten. Der naechste schwere Treffer wird teilweise in Heilung ueber Zeit umgewandelt.|
|st_ueberladung|Ueberladung|charge|Erhoeht Schaden technischer Waffen, kann aber bei Ueberhitzung in eine kontrollierte Entladung verwandelt werden.|
|st_echohunger|Echohunger|life_trade|Neris opfert eigene Ressourcen, um Gegner mit fremden Erinnerungen zu vergiften. Bei Kill bekommt sie Echo zurueck.|
|st_sturmjagd|Sturmjagd|pursuit|Markiert ein Ziel als Beute. Je laenger es sich bewegt, desto staerker wird Velkas naechster Treffer.|
|st_formschock|Formschock|adaptive|Cyr destabilisiert gegnerische Muster. Wiederholte Angriffe desselben Gegners werden schwaecher, neue Attacken kurz staerker.|
|st_salzblind|Salzblind|accuracy_down|Wuesteneffekt. Reduziert Fernkampfgenauigkeit und verdunkelt Mini-Map-Pings.|
|st_namenriss|Namenriss|identity_damage|Quest- und Bossstatus. Blockiert bestimmte Heilungen, bis ein Echo-Objekt beruehrt oder ein Companion-Callout beantwortet wird.|
|st_laternenbarriere|Laternenbarriere|shield|Temporarer Schild, der im Koop durch gemeinsame Positionierung dicker wird statt nur durch Itemlevel.|


## 5. Faehigkeiten - Datenbankauszug

|id|character|name|slot|cooldown|cost|status|unlock|
|---|---|---|---|---|---|---|---|
|ab_char_lyra_basic|Lyra Dorn|Lyras Grundkette|basic|0|keine|Mondbrand|Start|
|ab_char_lyra_heavy|Lyra Dorn|Lyras Brecher|heavy|4|keine|Mondbrand|Start|
|ab_char_lyra_skill_1|Lyra Dorn|Funkenstoss|skill_1|8|1 Fokus|Mondbrand|Prolog: Funken im Schlamm / Bindung 1|
|ab_char_lyra_skill_2|Lyra Dorn|Dornschritt|skill_2|12|2 Fokus|Mondbrand|Prolog: Funken im Schlamm / Bindung 1|
|ab_char_lyra_skill_3|Lyra Dorn|Klingenregen|skill_3|16|1 Resonanz|Mondbrand|Prolog: Funken im Schlamm / Bindung 2|
|ab_char_lyra_skill_4|Lyra Dorn|Letzter Blick|skill_4|20|2 Resonanz|Mondbrand|Prolog: Funken im Schlamm / Bindung 3|
|ab_char_lyra_ultimate|Lyra Dorn|Hausbrand|ultimate|90|volle Resonanz|Mondbrand|Bindung 3 oder Story-Schluessel fuer Lyra Dorn|
|ab_char_lyra_passive_1|Lyra Dorn|Narbeninstinkt|passive_1|0|passiv|Mondbrand|Talentreihe 1|
|ab_char_lyra_passive_2|Lyra Dorn|Regionale Handschrift|passive_2|0|passiv|Mondbrand|Talentreihe 2|
|ab_char_lyra_passive_3|Lyra Dorn|Bindungsschwur|passive_3|0|passiv|Mondbrand|Talentreihe 3|
|ab_char_lyra_vehicle_1|Lyra Dorn|Rissdrift|vehicle_skill_1|10|Hitze 20|Mondbrand|Dornwolf Modulstufe 1|
|ab_char_lyra_vehicle_2|Lyra Dorn|Pistolenkuppel|vehicle_skill_2|18|Hitze 35|Mondbrand|Dornwolf Modulstufe 2|
|ab_char_lyra_vehicle_3|Lyra Dorn|Dornramme|vehicle_skill_3|30|Resonanzkern|Mondbrand|Dornwolf Modulstufe 3|
|ab_char_mira_basic|Mira Voss|Miras Grundkette|basic|0|keine|Siegelriss|Start|
|ab_char_mira_heavy|Mira Voss|Miras Brecher|heavy|4|keine|Siegelriss|Start|
|ab_char_mira_skill_1|Mira Voss|Siegelbruch|skill_1|8|1 Fokus|Siegelriss|Kapitel 1: Sumpfkathedrale / Bindung 1|
|ab_char_mira_skill_2|Mira Voss|Archivschnitt|skill_2|12|2 Fokus|Siegelriss|Kapitel 1: Sumpfkathedrale / Bindung 1|
|ab_char_mira_skill_3|Mira Voss|Nullfeld|skill_3|16|1 Resonanz|Siegelriss|Kapitel 1: Sumpfkathedrale / Bindung 2|
|ab_char_mira_skill_4|Mira Voss|Wahrheitsnaht|skill_4|20|2 Resonanz|Siegelriss|Kapitel 1: Sumpfkathedrale / Bindung 3|
|ab_char_mira_ultimate|Mira Voss|Offenes Archiv|ultimate|90|volle Resonanz|Siegelriss|Bindung 3 oder Story-Schluessel fuer Mira Voss|
|ab_char_mira_passive_1|Mira Voss|Narbeninstinkt|passive_1|0|passiv|Siegelriss|Talentreihe 1|
|ab_char_mira_passive_2|Mira Voss|Regionale Handschrift|passive_2|0|passiv|Siegelriss|Talentreihe 2|
|ab_char_mira_passive_3|Mira Voss|Bindungsschwur|passive_3|0|passiv|Siegelriss|Talentreihe 3|
|ab_char_mira_vehicle_1|Mira Voss|Runenminen|vehicle_skill_1|10|Hitze 20|Siegelriss|Archivspinne Modulstufe 1|
|ab_char_mira_vehicle_2|Mira Voss|Gedaechtnisnetz|vehicle_skill_2|18|Hitze 35|Siegelriss|Archivspinne Modulstufe 2|
|ab_char_mira_vehicle_3|Mira Voss|Spiegelanker|vehicle_skill_3|30|Resonanzkern|Siegelriss|Archivspinne Modulstufe 3|
|ab_char_tarek_basic|Tarek al-Sahir|Tareks Grundkette|basic|0|keine|Schuldmarke|Start|
|ab_char_tarek_heavy|Tarek al-Sahir|Tareks Brecher|heavy|4|keine|Schuldmarke|Start|
|ab_char_tarek_skill_1|Tarek al-Sahir|Spiegelkoeder|skill_1|8|1 Fokus|Schuldmarke|Kapitel 2: Salzschuld / Bindung 1|
|ab_char_tarek_skill_2|Tarek al-Sahir|Karawanensprung|skill_2|12|2 Fokus|Schuldmarke|Kapitel 2: Salzschuld / Bindung 1|
|ab_char_tarek_skill_3|Tarek al-Sahir|Salzspeerstich|skill_3|16|1 Resonanz|Schuldmarke|Kapitel 2: Salzschuld / Bindung 2|
|ab_char_tarek_skill_4|Tarek al-Sahir|Falscher Tod|skill_4|20|2 Resonanz|Schuldmarke|Kapitel 2: Salzschuld / Bindung 3|
|ab_char_tarek_ultimate|Tarek al-Sahir|Hundert Vertraege|ultimate|90|volle Resonanz|Schuldmarke|Bindung 3 oder Story-Schluessel fuer Tarek al-Sahir|
|ab_char_tarek_passive_1|Tarek al-Sahir|Narbeninstinkt|passive_1|0|passiv|Schuldmarke|Talentreihe 1|
|ab_char_tarek_passive_2|Tarek al-Sahir|Regionale Handschrift|passive_2|0|passiv|Schuldmarke|Talentreihe 2|
|ab_char_tarek_passive_3|Tarek al-Sahir|Bindungsschwur|passive_3|0|passiv|Schuldmarke|Talentreihe 3|
|ab_char_tarek_vehicle_1|Tarek al-Sahir|Sandsegelboost|vehicle_skill_1|10|Hitze 20|Schuldmarke|Glasfuchs Modulstufe 1|
|ab_char_tarek_vehicle_2|Tarek al-Sahir|Koederfackel|vehicle_skill_2|18|Hitze 35|Schuldmarke|Glasfuchs Modulstufe 2|
|ab_char_tarek_vehicle_3|Tarek al-Sahir|Schuldenpflug|vehicle_skill_3|30|Resonanzkern|Schuldmarke|Glasfuchs Modulstufe 3|
|ab_char_siofra_basic|Siofra Nhal|Siofras Grundkette|basic|0|keine|Harzbindung|Start|
|ab_char_siofra_heavy|Siofra Nhal|Siofras Brecher|heavy|4|keine|Harzbindung|Start|
|ab_char_siofra_skill_1|Siofra Nhal|Namenspfeil|skill_1|8|1 Fokus|Harzbindung|Kapitel 3: Der Wald vergisst / Bindung 1|
|ab_char_siofra_skill_2|Siofra Nhal|Wurzelfalle|skill_2|12|2 Fokus|Harzbindung|Kapitel 3: Der Wald vergisst / Bindung 1|
|ab_char_siofra_skill_3|Siofra Nhal|Moosmantel|skill_3|16|1 Resonanz|Harzbindung|Kapitel 3: Der Wald vergisst / Bindung 2|
|ab_char_siofra_skill_4|Siofra Nhal|Chor der Dornen|skill_4|20|2 Resonanz|Harzbindung|Kapitel 3: Der Wald vergisst / Bindung 3|
|ab_char_siofra_ultimate|Siofra Nhal|Der Wald nennt dich|ultimate|90|volle Resonanz|Harzbindung|Bindung 3 oder Story-Schluessel fuer Siofra Nhal|
|ab_char_siofra_passive_1|Siofra Nhal|Narbeninstinkt|passive_1|0|passiv|Harzbindung|Talentreihe 1|
|ab_char_siofra_passive_2|Siofra Nhal|Regionale Handschrift|passive_2|0|passiv|Harzbindung|Talentreihe 2|
|ab_char_siofra_passive_3|Siofra Nhal|Bindungsschwur|passive_3|0|passiv|Harzbindung|Talentreihe 3|
|ab_char_siofra_vehicle_1|Siofra Nhal|Sumpfgriff|vehicle_skill_1|10|Hitze 20|Harzbindung|Moorkaefer Modulstufe 1|
|ab_char_siofra_vehicle_2|Siofra Nhal|Sporenwolke|vehicle_skill_2|18|Hitze 35|Harzbindung|Moorkaefer Modulstufe 2|
|ab_char_siofra_vehicle_3|Siofra Nhal|Herzwurzelzug|vehicle_skill_3|30|Resonanzkern|Harzbindung|Moorkaefer Modulstufe 3|
|ab_char_brannok_basic|Brannok Reef|Brannoks Grundkette|basic|0|keine|Tiefenruf|Start|
|ab_char_brannok_heavy|Brannok Reef|Brannoks Brecher|heavy|4|keine|Tiefenruf|Start|
|ab_char_brannok_skill_1|Brannok Reef|Harpunenwurf|skill_1|8|1 Fokus|Tiefenruf|Kapitel 4: Die Glocke unter der Brandung / Bindung 1|
|ab_char_brannok_skill_2|Brannok Reef|Ankerkonter|skill_2|12|2 Fokus|Tiefenruf|Kapitel 4: Die Glocke unter der Brandung / Bindung 1|
|ab_char_brannok_skill_3|Brannok Reef|Sturmtritt|skill_3|16|1 Resonanz|Tiefenruf|Kapitel 4: Die Glocke unter der Brandung / Bindung 2|
|ab_char_brannok_skill_4|Brannok Reef|Riffspalter|skill_4|20|2 Resonanz|Tiefenruf|Kapitel 4: Die Glocke unter der Brandung / Bindung 3|
|ab_char_brannok_ultimate|Brannok Reef|Die Glocke antwortet|ultimate|90|volle Resonanz|Tiefenruf|Bindung 3 oder Story-Schluessel fuer Brannok Reef|
|ab_char_brannok_passive_1|Brannok Reef|Narbeninstinkt|passive_1|0|passiv|Tiefenruf|Talentreihe 1|
|ab_char_brannok_passive_2|Brannok Reef|Regionale Handschrift|passive_2|0|passiv|Tiefenruf|Talentreihe 2|
|ab_char_brannok_passive_3|Brannok Reef|Bindungsschwur|passive_3|0|passiv|Tiefenruf|Talentreihe 3|
|ab_char_brannok_vehicle_1|Brannok Reef|Bugramme|vehicle_skill_1|10|Hitze 20|Tiefenruf|Riffbrecher Modulstufe 1|
|ab_char_brannok_vehicle_2|Brannok Reef|Kettenharpune|vehicle_skill_2|18|Hitze 35|Tiefenruf|Riffbrecher Modulstufe 2|
|ab_char_brannok_vehicle_3|Brannok Reef|Brandungswalze|vehicle_skill_3|30|Resonanzkern|Tiefenruf|Riffbrecher Modulstufe 3|
|ab_char_edda_basic|Edda Falkenlicht|Eddas Grundkette|basic|0|keine|Eidmarke|Start|
|ab_char_edda_heavy|Edda Falkenlicht|Eddas Brecher|heavy|4|keine|Eidmarke|Start|
|ab_char_edda_skill_1|Edda Falkenlicht|Bannstandarte|skill_1|8|1 Fokus|Eidmarke|Kapitel 5: Falken ohne Himmel / Bindung 1|
|ab_char_edda_skill_2|Edda Falkenlicht|Falkenhieb|skill_2|12|2 Fokus|Eidmarke|Kapitel 5: Falken ohne Himmel / Bindung 1|
|ab_char_edda_skill_3|Edda Falkenlicht|Schildschwur|skill_3|16|1 Resonanz|Eidmarke|Kapitel 5: Falken ohne Himmel / Bindung 2|
|ab_char_edda_skill_4|Edda Falkenlicht|Urteilslinie|skill_4|20|2 Resonanz|Eidmarke|Kapitel 5: Falken ohne Himmel / Bindung 3|
|ab_char_edda_ultimate|Edda Falkenlicht|Haus ohne Herren|ultimate|90|volle Resonanz|Eidmarke|Bindung 3 oder Story-Schluessel fuer Edda Falkenlicht|
|ab_char_edda_passive_1|Edda Falkenlicht|Narbeninstinkt|passive_1|0|passiv|Eidmarke|Talentreihe 1|
|ab_char_edda_passive_2|Edda Falkenlicht|Regionale Handschrift|passive_2|0|passiv|Eidmarke|Talentreihe 2|
|ab_char_edda_passive_3|Edda Falkenlicht|Bindungsschwur|passive_3|0|passiv|Eidmarke|Talentreihe 3|
|ab_char_edda_vehicle_1|Edda Falkenlicht|Eidschild|vehicle_skill_1|10|Hitze 20|Eidmarke|Eidpanzer Modulstufe 1|
|ab_char_edda_vehicle_2|Edda Falkenlicht|Konvoiwand|vehicle_skill_2|18|Hitze 35|Eidmarke|Eidpanzer Modulstufe 2|
|ab_char_edda_vehicle_3|Edda Falkenlicht|Falkensturz|vehicle_skill_3|30|Resonanzkern|Eidmarke|Eidpanzer Modulstufe 3|
|ab_char_kael_basic|Kael Nhar|Kaels Grundkette|basic|0|keine|Rostbruch|Start|
|ab_char_kael_heavy|Kael Nhar|Kaels Brecher|heavy|4|keine|Rostbruch|Start|


Vollstaendige Liste: `database/abilities.json` und `database_csv/abilities.csv`.


## 6. Upgrades - System


Jeder Charakter hat 12 definierte Upgrade-Knoten. Keine reinen +5 Prozent Tabellen als Hauptfantasie: Jeder Knoten veraendert Timing, Risiko, Fahrzeugkopplung, Companion-Nutzen oder Questloesungen. Die Zahlen koennen spaeter gebalanced werden, die Knotenfantasie bleibt.

|id|character|name|tier|cost|unlock|effect|
|---|---|---|---|---|---|---|
|up_char_lyra_01|Lyra Dorn|Taktischer Einstieg: Lyra|1|3 Laternenfunken|Level 2 oder Bindung 1|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_02|Lyra Dorn|Sicherer Rhythmus: Lyra|1|4 Laternenfunken|Level 4 oder Bindung 1|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_03|Lyra Dorn|Statusmeisterschaft: Lyra|1|5 Laternenfunken|Level 6 oder Bindung 1|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_04|Lyra Dorn|Riskanter Vorteil: Lyra|2|8 Laternenfunken|Level 8 oder Bindung 2|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_05|Lyra Dorn|Fahrzeugkopplung: Lyra|2|9 Laternenfunken|Level 10 oder Bindung 2|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_06|Lyra Dorn|Companion-Callout: Lyra|2|10 Laternenfunken|Level 12 oder Bindung 2|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_07|Lyra Dorn|Regionale Praxis: Lyra|3|13 Laternenfunken|Level 14 oder Bindung 3|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_08|Lyra Dorn|Signaturmod: Lyra|3|14 Laternenfunken|Level 16 oder Bindung 3|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_09|Lyra Dorn|Meisterschaftsknoten: Lyra|3|15 Laternenfunken|Level 18 oder Bindung 3|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_10|Lyra Dorn|Koop-Resonanz: Lyra|4|18 Laternenfunken|Level 20 oder Bindung 4|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_11|Lyra Dorn|Schicksalswahl A: Lyra|4|19 Laternenfunken|Level 22 oder Bindung 4|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_lyra_12|Lyra Dorn|Schicksalswahl B: Lyra|4|20 Laternenfunken|Level 24 oder Bindung 4|Verbessert Lyra Dorns Mondbrand-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch.|
|up_char_mira_01|Mira Voss|Taktischer Einstieg: Mira|1|3 Laternenfunken|Level 2 oder Bindung 1|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_02|Mira Voss|Sicherer Rhythmus: Mira|1|4 Laternenfunken|Level 4 oder Bindung 1|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_03|Mira Voss|Statusmeisterschaft: Mira|1|5 Laternenfunken|Level 6 oder Bindung 1|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_04|Mira Voss|Riskanter Vorteil: Mira|2|8 Laternenfunken|Level 8 oder Bindung 2|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_05|Mira Voss|Fahrzeugkopplung: Mira|2|9 Laternenfunken|Level 10 oder Bindung 2|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_06|Mira Voss|Companion-Callout: Mira|2|10 Laternenfunken|Level 12 oder Bindung 2|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_07|Mira Voss|Regionale Praxis: Mira|3|13 Laternenfunken|Level 14 oder Bindung 3|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_08|Mira Voss|Signaturmod: Mira|3|14 Laternenfunken|Level 16 oder Bindung 3|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_09|Mira Voss|Meisterschaftsknoten: Mira|3|15 Laternenfunken|Level 18 oder Bindung 3|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_10|Mira Voss|Koop-Resonanz: Mira|4|18 Laternenfunken|Level 20 oder Bindung 4|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_11|Mira Voss|Schicksalswahl A: Mira|4|19 Laternenfunken|Level 22 oder Bindung 4|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_mira_12|Mira Voss|Schicksalswahl B: Mira|4|20 Laternenfunken|Level 24 oder Bindung 4|Verbessert Mira Vosss Siegelriss-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Graumarsch/Scherbenkrone.|
|up_char_tarek_01|Tarek al-Sahir|Taktischer Einstieg: Tarek|1|3 Laternenfunken|Level 2 oder Bindung 1|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_02|Tarek al-Sahir|Sicherer Rhythmus: Tarek|1|4 Laternenfunken|Level 4 oder Bindung 1|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_03|Tarek al-Sahir|Statusmeisterschaft: Tarek|1|5 Laternenfunken|Level 6 oder Bindung 1|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_04|Tarek al-Sahir|Riskanter Vorteil: Tarek|2|8 Laternenfunken|Level 8 oder Bindung 2|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_05|Tarek al-Sahir|Fahrzeugkopplung: Tarek|2|9 Laternenfunken|Level 10 oder Bindung 2|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_06|Tarek al-Sahir|Companion-Callout: Tarek|2|10 Laternenfunken|Level 12 oder Bindung 2|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_07|Tarek al-Sahir|Regionale Praxis: Tarek|3|13 Laternenfunken|Level 14 oder Bindung 3|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_08|Tarek al-Sahir|Signaturmod: Tarek|3|14 Laternenfunken|Level 16 oder Bindung 3|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_09|Tarek al-Sahir|Meisterschaftsknoten: Tarek|3|15 Laternenfunken|Level 18 oder Bindung 3|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_10|Tarek al-Sahir|Koop-Resonanz: Tarek|4|18 Laternenfunken|Level 20 oder Bindung 4|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_11|Tarek al-Sahir|Schicksalswahl A: Tarek|4|19 Laternenfunken|Level 22 oder Bindung 4|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_tarek_12|Tarek al-Sahir|Schicksalswahl B: Tarek|4|20 Laternenfunken|Level 24 oder Bindung 4|Verbessert Tarek al-Sahirs Schuldmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Sonnenglasweite.|
|up_char_siofra_01|Siofra Nhal|Taktischer Einstieg: Siofra|1|3 Laternenfunken|Level 2 oder Bindung 1|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_02|Siofra Nhal|Sicherer Rhythmus: Siofra|1|4 Laternenfunken|Level 4 oder Bindung 1|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_03|Siofra Nhal|Statusmeisterschaft: Siofra|1|5 Laternenfunken|Level 6 oder Bindung 1|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_04|Siofra Nhal|Riskanter Vorteil: Siofra|2|8 Laternenfunken|Level 8 oder Bindung 2|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_05|Siofra Nhal|Fahrzeugkopplung: Siofra|2|9 Laternenfunken|Level 10 oder Bindung 2|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_06|Siofra Nhal|Companion-Callout: Siofra|2|10 Laternenfunken|Level 12 oder Bindung 2|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_07|Siofra Nhal|Regionale Praxis: Siofra|3|13 Laternenfunken|Level 14 oder Bindung 3|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_08|Siofra Nhal|Signaturmod: Siofra|3|14 Laternenfunken|Level 16 oder Bindung 3|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_09|Siofra Nhal|Meisterschaftsknoten: Siofra|3|15 Laternenfunken|Level 18 oder Bindung 3|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_10|Siofra Nhal|Koop-Resonanz: Siofra|4|18 Laternenfunken|Level 20 oder Bindung 4|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_11|Siofra Nhal|Schicksalswahl A: Siofra|4|19 Laternenfunken|Level 22 oder Bindung 4|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_siofra_12|Siofra Nhal|Schicksalswahl B: Siofra|4|20 Laternenfunken|Level 24 oder Bindung 4|Verbessert Siofra Nhals Harzbindung-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Wurzelwald Nhal.|
|up_char_brannok_01|Brannok Reef|Taktischer Einstieg: Brannok|1|3 Laternenfunken|Level 2 oder Bindung 1|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_02|Brannok Reef|Sicherer Rhythmus: Brannok|1|4 Laternenfunken|Level 4 oder Bindung 1|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_03|Brannok Reef|Statusmeisterschaft: Brannok|1|5 Laternenfunken|Level 6 oder Bindung 1|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_04|Brannok Reef|Riskanter Vorteil: Brannok|2|8 Laternenfunken|Level 8 oder Bindung 2|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_05|Brannok Reef|Fahrzeugkopplung: Brannok|2|9 Laternenfunken|Level 10 oder Bindung 2|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_06|Brannok Reef|Companion-Callout: Brannok|2|10 Laternenfunken|Level 12 oder Bindung 2|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_07|Brannok Reef|Regionale Praxis: Brannok|3|13 Laternenfunken|Level 14 oder Bindung 3|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_08|Brannok Reef|Signaturmod: Brannok|3|14 Laternenfunken|Level 16 oder Bindung 3|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_09|Brannok Reef|Meisterschaftsknoten: Brannok|3|15 Laternenfunken|Level 18 oder Bindung 3|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_10|Brannok Reef|Koop-Resonanz: Brannok|4|18 Laternenfunken|Level 20 oder Bindung 4|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_11|Brannok Reef|Schicksalswahl A: Brannok|4|19 Laternenfunken|Level 22 oder Bindung 4|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_brannok_12|Brannok Reef|Schicksalswahl B: Brannok|4|20 Laternenfunken|Level 24 oder Bindung 4|Verbessert Brannok Reefs Tiefenruf-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Eisenbrandkueste.|
|up_char_edda_01|Edda Falkenlicht|Taktischer Einstieg: Edda|1|3 Laternenfunken|Level 2 oder Bindung 1|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_02|Edda Falkenlicht|Sicherer Rhythmus: Edda|1|4 Laternenfunken|Level 4 oder Bindung 1|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_03|Edda Falkenlicht|Statusmeisterschaft: Edda|1|5 Laternenfunken|Level 6 oder Bindung 1|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_04|Edda Falkenlicht|Riskanter Vorteil: Edda|2|8 Laternenfunken|Level 8 oder Bindung 2|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_05|Edda Falkenlicht|Fahrzeugkopplung: Edda|2|9 Laternenfunken|Level 10 oder Bindung 2|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_06|Edda Falkenlicht|Companion-Callout: Edda|2|10 Laternenfunken|Level 12 oder Bindung 2|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_07|Edda Falkenlicht|Regionale Praxis: Edda|3|13 Laternenfunken|Level 14 oder Bindung 3|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_08|Edda Falkenlicht|Signaturmod: Edda|3|14 Laternenfunken|Level 16 oder Bindung 3|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_09|Edda Falkenlicht|Meisterschaftsknoten: Edda|3|15 Laternenfunken|Level 18 oder Bindung 3|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|
|up_char_edda_10|Edda Falkenlicht|Koop-Resonanz: Edda|4|18 Laternenfunken|Level 20 oder Bindung 4|Verbessert Edda Falkenlichts Eidmarke-Spiel: mehr Kontrolle, sauberere Fahrzeugkopplung und ein zusaetzlicher Quest-/Dialog-Nutzen in Hochkamm der Eidwacht.|


Vollstaendige Liste: `database/upgrades.json`.


## 7. Vehicle Module - Datenbankauszug

|id|name|slot|tier|power_budget|heat_change|handling_change|source|effect|
|---|---|---|---|---|---|---|---|---|
|vm_001|Moorlaeufer-Rahmen|chassis|gewoehnlich|13|-1|-1|Sonnenglasweite|Sumpf und flaches Wasser verlieren fast alle Bremswirkung.|
|vm_002|Rissjaeger-Rahmen|chassis|gewoehnlich|16|0|1|Wurzelwald|Sehr leichter Rahmen fuer Drift, Sprung und seitliche Ausweichfenster.|
|vm_003|Eidpanzer-Rahmen|chassis|gewoehnlich|19|1|3|Eisenbrandkueste|Langsam, aber Verbundete koennen hinter dir Schildladung aufbauen.|
|vm_004|Sandsegler-Rahmen|chassis|gewoehnlich|22|2|-2|Hochkamm|Auf Glas, Salz und Sand gewinnt das Fahrzeug bei Drift Tempo statt es zu verlieren.|
|vm_005|Schachtspinne-Rahmen|chassis|gewoehnlich|25|-2|0|Dunkelgrund|Kann kurz an Waenden und Tunnelkanten haften.|
|vm_006|Werftbastion-Rahmen|chassis|gewoehnlich|28|-1|2|Scherbenkrone|Ramm- und Harpunenmodule verursachen mehr Haltungsbruch.|
|vm_007|Echo-Rahmen|chassis|gewoehnlich|10|0|-3|Graumarsch|Erlaubt kurze Phasenverschiebung, aber macht den Kern hitzeanfaellig.|
|vm_008|Konvoi-Rahmen|chassis|gewoehnlich|13|1|-1|Sonnenglasweite|Skaliert im Koop: nahe Fahrzeuge bekommen kleine Laternenbarriere.|
|vm_009|Mondglas-Kern|core|veredelt|16|2|1|Wurzelwald|Allround-Kern mit stabiler Hitze und guter Resonanzgeneration.|
|vm_010|Salzspiegel-Kern|core|veredelt|19|-2|3|Eisenbrandkueste|Staerker bei hoher Geschwindigkeit; schwach bei Stillstand.|
|vm_011|Harzherz-Kern|core|veredelt|22|-1|-2|Hochkamm|Regeneriert in Naturzonen, kann aber durch Feuer ueberhitzen.|
|vm_012|Tiefenglocken-Kern|core|veredelt|25|0|0|Dunkelgrund|Rammangriffe erzeugen Schockwellen und ziehen leichte Gegner an.|
|vm_013|Eidkern|core|veredelt|28|1|2|Scherbenkrone|Schild staerker, Schaden niedriger, perfekte Blocks geben Teamenergie.|
|vm_014|Schrottfunken-Kern|core|veredelt|10|2|-3|Graumarsch|Billig zu reparieren, aber instabil. Kritische Treffer koennen Module resetten.|
|vm_015|Archivkern|core|veredelt|13|-2|-1|Sonnenglasweite|Sigile bleiben laenger auf der Strecke, Gegnerdaten werden markiert.|
|vm_016|Kettenramme|front_weapon|veredelt|16|-1|1|Wurzelwald|Kurze schwere Frontattacke, bricht Barrikaden und Panzerplatten.|
|vm_017|Funkenkanone|front_weapon|veredelt|19|0|3|Eisenbrandkueste|Mittlere Reichweite, baut Mondbrand auf.|
|vm_018|Harpunenlanze|front_weapon|selten|22|1|-2|Hochkamm|Zieht Ziele oder zieht dich an schwere Ziele heran.|
|vm_019|Runenpflug|front_weapon|selten|25|2|0|Dunkelgrund|Legt beim Driften Sigillinien auf den Boden.|
|vm_020|Salzstreuer|front_weapon|selten|28|-2|2|Scherbenkrone|Blendet Fahrer, Schuetzen und fliegende Gegner.|
|vm_021|Dornenwalze|front_weapon|selten|10|-1|-3|Graumarsch|Fuegt Harzbindung zu und zerfetzt Reifen/Beine.|
|vm_022|Schachtbohrer|front_weapon|selten|13|0|-1|Sonnenglasweite|Fuegt Panzerbruch zu und oeffnet Tunnelabkuerzungen.|
|vm_023|Falkenspeer|front_weapon|selten|16|1|1|Wurzelwald|Praezise Frontlanze mit hohem Schaden gegen markierte Ziele.|
|vm_024|Seitensense|side_weapon|selten|19|2|3|Eisenbrandkueste|Schneidet beim Vorbeifahren durch leichte Gegnergruppen.|
|vm_025|Nietwerfer|side_weapon|selten|22|-2|-2|Hochkamm|Schneller Seitenbeschuss, skaliert mit Ueberladung.|
|vm_026|Echozunge|side_weapon|selten|25|-1|0|Dunkelgrund|Greift durch Illusionsschilde, kostet aber Kernstabilitaet.|
|vm_027|Wurzelwerfer|side_weapon|signatur|28|0|2|Scherbenkrone|Setzt organische Minen auf der Strecke ab.|
|vm_028|Schrapnellorgel|side_weapon|signatur|10|1|-3|Graumarsch|Breite Streuung gegen Schwarmgegner.|
|vm_029|Bannlaterne|side_weapon|signatur|13|2|-1|Sonnenglasweite|Verlangsamt Projektile im Nahbereich des Fahrzeugs.|
|vm_030|Rauchfass|rear_utility|signatur|16|-2|1|Wurzelwald|Bricht Zielerfassung und legt Rostbruch.|
|vm_031|Reparaturkran|rear_utility|signatur|19|-1|3|Eisenbrandkueste|Heilt ein nahes Fahrzeug oder eigenes Heckmodul.|
|vm_032|Koederfackel|rear_utility|signatur|22|0|-2|Hochkamm|Lockt Nachtflut-Schwarm und Raketen auf eine falsche Spur.|
|vm_033|Konvoianker|rear_utility|signatur|25|1|0|Dunkelgrund|Verbindet zwei Fahrzeuge fuer Schleuder- oder Rettungsmanoever.|
|vm_034|Risssprung-Duese|mobility|signatur|28|2|2|Scherbenkrone|Kurzer Sprung ueber Graben, Wellen und Risslinien.|
|vm_035|Ankerkurve|mobility|signatur|10|-2|-3|Graumarsch|Extrem enge Kurve, wenn kurz vorher gebremst wird.|
|vm_036|Kletterkette|mobility|relikt|13|-1|-1|Sonnenglasweite|Haelt an vertikalen Kanten, besonders in Dunkelgrund.|
|vm_037|Sturmsegel|mobility|relikt|16|0|1|Wurzelwald|Nutzt Windzonen fuer Boost statt Kontrollverlust.|
|vm_038|Laternenpanzer|armor|relikt|19|1|3|Eisenbrandkueste|Schild regeneriert nach 4 Sekunden ohne Schaden.|
|vm_039|Schlackeplatten|armor|relikt|22|2|-2|Hochkamm|Sehr hohe Frontpanzerung, schwache Seiten.|
|vm_040|Harzschicht|armor|relikt|25|-2|0|Dunkelgrund|Schluckt kleine Treffer und repariert sich langsam.|
|vm_041|Spiegellack|armor|relikt|28|-1|2|Scherbenkrone|Chance, Zielmarkierungen auf Gegner zurueckzuwerfen.|


## 8. Loot und Zufallsdrops


Die Datenbank enthaelt **187 konkrete Loot-Eintraege**. Jeder Drop hat ID, Name, Kategorie, Tier, Region, Quelle, Effekt, Lore, Zerlegungswert und Drop-Regel. Zufallsloot ist damit nicht unendlich vage, sondern kuratiert. RNG entscheidet aus bekannten Pools; Fokusbeute und Pity-Regeln verhindern Frust.

Tier-Regel:
- gewoehnlich: Stabilitaet, Crafting-Futter, fruehe Sets.
- veredelt: erste kleine Build-Wahl.
- selten: spuerbarer Effekt, regionale Identitaet.
- signatur: charakter- oder bossnah, gezielt farmbar.
- relikt: veraendert Spielweise.
- mythisch: Langzeitziel, nie Pflicht fuer Storyabschluss.

|id|name|category|tier|character|region|effect|
|---|---|---|---|---|---|---|
|loot_char_lyra_1|Doppelklinge + Funkenpistole - Feldfassung|character_gear|gewoehnlich|Lyra Dorn|Graumarsch|Verbessert Lyra Dorns Mondbrand-Loop und fuegt eine kleine Interaktion mit Dornwolf hinzu.|
|loot_char_lyra_2|Doppelklinge + Funkenpistole - Laternenfassung|character_gear|veredelt|Lyra Dorn|Graumarsch|Verbessert Lyra Dorns Mondbrand-Loop und fuegt eine kleine Interaktion mit Dornwolf hinzu.|
|loot_char_lyra_3|Doppelklinge + Funkenpistole - Mondbrand-Mod|character_gear|selten|Lyra Dorn|Graumarsch|Verbessert Lyra Dorns Mondbrand-Loop und fuegt eine kleine Interaktion mit Dornwolf hinzu.|
|loot_char_lyra_4|Lyras Signaturgriff|character_gear|signatur|Lyra Dorn|Graumarsch|Verbessert Lyra Dorns Mondbrand-Loop und fuegt eine kleine Interaktion mit Dornwolf hinzu.|
|loot_char_lyra_5|Relikt: Hausbrand|character_gear|relikt|Lyra Dorn|Graumarsch|Verbessert Lyra Dorns Mondbrand-Loop und fuegt eine kleine Interaktion mit Dornwolf hinzu.|
|loot_char_lyra_6|Mythos: Dornwolf Herzsplitter|character_gear|mythisch|Lyra Dorn|Graumarsch|Verbessert Lyra Dorns Mondbrand-Loop und fuegt eine kleine Interaktion mit Dornwolf hinzu.|
|loot_char_mira_1|Runenklingen + Archivsigil - Feldfassung|character_gear|gewoehnlich|Mira Voss|Graumarsch/Scherbenkrone|Verbessert Mira Vosss Siegelriss-Loop und fuegt eine kleine Interaktion mit Archivspinne hinzu.|
|loot_char_mira_2|Runenklingen + Archivsigil - Laternenfassung|character_gear|veredelt|Mira Voss|Graumarsch/Scherbenkrone|Verbessert Mira Vosss Siegelriss-Loop und fuegt eine kleine Interaktion mit Archivspinne hinzu.|
|loot_char_mira_3|Runenklingen + Archivsigil - Siegelriss-Mod|character_gear|selten|Mira Voss|Graumarsch/Scherbenkrone|Verbessert Mira Vosss Siegelriss-Loop und fuegt eine kleine Interaktion mit Archivspinne hinzu.|
|loot_char_mira_4|Miras Signaturgriff|character_gear|signatur|Mira Voss|Graumarsch/Scherbenkrone|Verbessert Mira Vosss Siegelriss-Loop und fuegt eine kleine Interaktion mit Archivspinne hinzu.|
|loot_char_mira_5|Relikt: Offenes Archiv|character_gear|relikt|Mira Voss|Graumarsch/Scherbenkrone|Verbessert Mira Vosss Siegelriss-Loop und fuegt eine kleine Interaktion mit Archivspinne hinzu.|
|loot_char_mira_6|Mythos: Archivspinne Herzsplitter|character_gear|mythisch|Mira Voss|Graumarsch/Scherbenkrone|Verbessert Mira Vosss Siegelriss-Loop und fuegt eine kleine Interaktion mit Archivspinne hinzu.|
|loot_char_tarek_1|Speer + Spiegelkoeder - Feldfassung|character_gear|gewoehnlich|Tarek al-Sahir|Sonnenglasweite|Verbessert Tarek al-Sahirs Schuldmarke-Loop und fuegt eine kleine Interaktion mit Glasfuchs hinzu.|
|loot_char_tarek_2|Speer + Spiegelkoeder - Laternenfassung|character_gear|veredelt|Tarek al-Sahir|Sonnenglasweite|Verbessert Tarek al-Sahirs Schuldmarke-Loop und fuegt eine kleine Interaktion mit Glasfuchs hinzu.|
|loot_char_tarek_3|Speer + Spiegelkoeder - Schuldmarke-Mod|character_gear|selten|Tarek al-Sahir|Sonnenglasweite|Verbessert Tarek al-Sahirs Schuldmarke-Loop und fuegt eine kleine Interaktion mit Glasfuchs hinzu.|
|loot_char_tarek_4|Tareks Signaturgriff|character_gear|signatur|Tarek al-Sahir|Sonnenglasweite|Verbessert Tarek al-Sahirs Schuldmarke-Loop und fuegt eine kleine Interaktion mit Glasfuchs hinzu.|
|loot_char_tarek_5|Relikt: Hundert Vertraege|character_gear|relikt|Tarek al-Sahir|Sonnenglasweite|Verbessert Tarek al-Sahirs Schuldmarke-Loop und fuegt eine kleine Interaktion mit Glasfuchs hinzu.|
|loot_char_tarek_6|Mythos: Glasfuchs Herzsplitter|character_gear|mythisch|Tarek al-Sahir|Sonnenglasweite|Verbessert Tarek al-Sahirs Schuldmarke-Loop und fuegt eine kleine Interaktion mit Glasfuchs hinzu.|
|loot_char_siofra_1|Harzbogen + lebende Fallen - Feldfassung|character_gear|gewoehnlich|Siofra Nhal|Wurzelwald Nhal|Verbessert Siofra Nhals Harzbindung-Loop und fuegt eine kleine Interaktion mit Moorkaefer hinzu.|
|loot_char_siofra_2|Harzbogen + lebende Fallen - Laternenfassung|character_gear|veredelt|Siofra Nhal|Wurzelwald Nhal|Verbessert Siofra Nhals Harzbindung-Loop und fuegt eine kleine Interaktion mit Moorkaefer hinzu.|
|loot_char_siofra_3|Harzbogen + lebende Fallen - Harzbindung-Mod|character_gear|selten|Siofra Nhal|Wurzelwald Nhal|Verbessert Siofra Nhals Harzbindung-Loop und fuegt eine kleine Interaktion mit Moorkaefer hinzu.|
|loot_char_siofra_4|Siofras Signaturgriff|character_gear|signatur|Siofra Nhal|Wurzelwald Nhal|Verbessert Siofra Nhals Harzbindung-Loop und fuegt eine kleine Interaktion mit Moorkaefer hinzu.|
|loot_char_siofra_5|Relikt: Der Wald nennt dich|character_gear|relikt|Siofra Nhal|Wurzelwald Nhal|Verbessert Siofra Nhals Harzbindung-Loop und fuegt eine kleine Interaktion mit Moorkaefer hinzu.|
|loot_char_siofra_6|Mythos: Moorkaefer Herzsplitter|character_gear|mythisch|Siofra Nhal|Wurzelwald Nhal|Verbessert Siofra Nhals Harzbindung-Loop und fuegt eine kleine Interaktion mit Moorkaefer hinzu.|
|loot_char_brannok_1|Ankerklinge + Harpune - Feldfassung|character_gear|gewoehnlich|Brannok Reef|Eisenbrandkueste|Verbessert Brannok Reefs Tiefenruf-Loop und fuegt eine kleine Interaktion mit Riffbrecher hinzu.|
|loot_char_brannok_2|Ankerklinge + Harpune - Laternenfassung|character_gear|veredelt|Brannok Reef|Eisenbrandkueste|Verbessert Brannok Reefs Tiefenruf-Loop und fuegt eine kleine Interaktion mit Riffbrecher hinzu.|
|loot_char_brannok_3|Ankerklinge + Harpune - Tiefenruf-Mod|character_gear|selten|Brannok Reef|Eisenbrandkueste|Verbessert Brannok Reefs Tiefenruf-Loop und fuegt eine kleine Interaktion mit Riffbrecher hinzu.|
|loot_char_brannok_4|Brannoks Signaturgriff|character_gear|signatur|Brannok Reef|Eisenbrandkueste|Verbessert Brannok Reefs Tiefenruf-Loop und fuegt eine kleine Interaktion mit Riffbrecher hinzu.|
|loot_char_brannok_5|Relikt: Die Glocke antwortet|character_gear|relikt|Brannok Reef|Eisenbrandkueste|Verbessert Brannok Reefs Tiefenruf-Loop und fuegt eine kleine Interaktion mit Riffbrecher hinzu.|
|loot_char_brannok_6|Mythos: Riffbrecher Herzsplitter|character_gear|mythisch|Brannok Reef|Eisenbrandkueste|Verbessert Brannok Reefs Tiefenruf-Loop und fuegt eine kleine Interaktion mit Riffbrecher hinzu.|
|loot_char_edda_1|Grossschwert + Eidbanner - Feldfassung|character_gear|gewoehnlich|Edda Falkenlicht|Hochkamm der Eidwacht|Verbessert Edda Falkenlichts Eidmarke-Loop und fuegt eine kleine Interaktion mit Eidpanzer hinzu.|
|loot_char_edda_2|Grossschwert + Eidbanner - Laternenfassung|character_gear|veredelt|Edda Falkenlicht|Hochkamm der Eidwacht|Verbessert Edda Falkenlichts Eidmarke-Loop und fuegt eine kleine Interaktion mit Eidpanzer hinzu.|
|loot_char_edda_3|Grossschwert + Eidbanner - Eidmarke-Mod|character_gear|selten|Edda Falkenlicht|Hochkamm der Eidwacht|Verbessert Edda Falkenlichts Eidmarke-Loop und fuegt eine kleine Interaktion mit Eidpanzer hinzu.|
|loot_char_edda_4|Eddas Signaturgriff|character_gear|signatur|Edda Falkenlicht|Hochkamm der Eidwacht|Verbessert Edda Falkenlichts Eidmarke-Loop und fuegt eine kleine Interaktion mit Eidpanzer hinzu.|
|loot_char_edda_5|Relikt: Haus ohne Herren|character_gear|relikt|Edda Falkenlicht|Hochkamm der Eidwacht|Verbessert Edda Falkenlichts Eidmarke-Loop und fuegt eine kleine Interaktion mit Eidpanzer hinzu.|
|loot_char_edda_6|Mythos: Eidpanzer Herzsplitter|character_gear|mythisch|Edda Falkenlicht|Hochkamm der Eidwacht|Verbessert Edda Falkenlichts Eidmarke-Loop und fuegt eine kleine Interaktion mit Eidpanzer hinzu.|
|loot_char_kael_1|Dolche + Schachtgift - Feldfassung|character_gear|gewoehnlich|Kael Nhar|Dunkelgrund|Verbessert Kael Nhars Rostbruch-Loop und fuegt eine kleine Interaktion mit Schachtmaus hinzu.|
|loot_char_kael_2|Dolche + Schachtgift - Laternenfassung|character_gear|veredelt|Kael Nhar|Dunkelgrund|Verbessert Kael Nhars Rostbruch-Loop und fuegt eine kleine Interaktion mit Schachtmaus hinzu.|
|loot_char_kael_3|Dolche + Schachtgift - Rostbruch-Mod|character_gear|selten|Kael Nhar|Dunkelgrund|Verbessert Kael Nhars Rostbruch-Loop und fuegt eine kleine Interaktion mit Schachtmaus hinzu.|
|loot_char_kael_4|Kaels Signaturgriff|character_gear|signatur|Kael Nhar|Dunkelgrund|Verbessert Kael Nhars Rostbruch-Loop und fuegt eine kleine Interaktion mit Schachtmaus hinzu.|
|loot_char_kael_5|Relikt: Niemand zahlt fuer mich|character_gear|relikt|Kael Nhar|Dunkelgrund|Verbessert Kael Nhars Rostbruch-Loop und fuegt eine kleine Interaktion mit Schachtmaus hinzu.|
|loot_char_kael_6|Mythos: Schachtmaus Herzsplitter|character_gear|mythisch|Kael Nhar|Dunkelgrund|Verbessert Kael Nhars Rostbruch-Loop und fuegt eine kleine Interaktion mit Schachtmaus hinzu.|
|loot_char_oren_1|Kettenstab + Wards - Feldfassung|character_gear|gewoehnlich|Oren Vale|Hochkamm|Verbessert Oren Vales Wundlicht-Loop und fuegt eine kleine Interaktion mit Pilgerglocke hinzu.|
|loot_char_oren_2|Kettenstab + Wards - Laternenfassung|character_gear|veredelt|Oren Vale|Hochkamm|Verbessert Oren Vales Wundlicht-Loop und fuegt eine kleine Interaktion mit Pilgerglocke hinzu.|
|loot_char_oren_3|Kettenstab + Wards - Wundlicht-Mod|character_gear|selten|Oren Vale|Hochkamm|Verbessert Oren Vales Wundlicht-Loop und fuegt eine kleine Interaktion mit Pilgerglocke hinzu.|
|loot_char_oren_4|Orens Signaturgriff|character_gear|signatur|Oren Vale|Hochkamm|Verbessert Oren Vales Wundlicht-Loop und fuegt eine kleine Interaktion mit Pilgerglocke hinzu.|
|loot_char_oren_5|Relikt: Barmherzigkeit steht|character_gear|relikt|Oren Vale|Hochkamm|Verbessert Oren Vales Wundlicht-Loop und fuegt eine kleine Interaktion mit Pilgerglocke hinzu.|
|loot_char_oren_6|Mythos: Pilgerglocke Herzsplitter|character_gear|mythisch|Oren Vale|Hochkamm|Verbessert Oren Vales Wundlicht-Loop und fuegt eine kleine Interaktion mit Pilgerglocke hinzu.|
|loot_char_yara_1|Schmiedehammer + Reparaturdrohne - Feldfassung|character_gear|gewoehnlich|Yara Kest|Eisenbrandkueste|Verbessert Yara Kests Ueberladung-Loop und fuegt eine kleine Interaktion mit Kranhexe hinzu.|
|loot_char_yara_2|Schmiedehammer + Reparaturdrohne - Laternenfassung|character_gear|veredelt|Yara Kest|Eisenbrandkueste|Verbessert Yara Kests Ueberladung-Loop und fuegt eine kleine Interaktion mit Kranhexe hinzu.|
|loot_char_yara_3|Schmiedehammer + Reparaturdrohne - Ueberladung-Mod|character_gear|selten|Yara Kest|Eisenbrandkueste|Verbessert Yara Kests Ueberladung-Loop und fuegt eine kleine Interaktion mit Kranhexe hinzu.|
|loot_char_yara_4|Yaras Signaturgriff|character_gear|signatur|Yara Kest|Eisenbrandkueste|Verbessert Yara Kests Ueberladung-Loop und fuegt eine kleine Interaktion mit Kranhexe hinzu.|
|loot_char_yara_5|Relikt: Die Werft erhebt sich|character_gear|relikt|Yara Kest|Eisenbrandkueste|Verbessert Yara Kests Ueberladung-Loop und fuegt eine kleine Interaktion mit Kranhexe hinzu.|
|loot_char_yara_6|Mythos: Kranhexe Herzsplitter|character_gear|mythisch|Yara Kest|Eisenbrandkueste|Verbessert Yara Kests Ueberladung-Loop und fuegt eine kleine Interaktion mit Kranhexe hinzu.|
|loot_char_neris_1|Sichel + Echoadern - Feldfassung|character_gear|gewoehnlich|Neris Vael|Scherbenkrone/Wurzelwald|Verbessert Neris Vaels Echohunger-Loop und fuegt eine kleine Interaktion mit Traumsaege hinzu.|
|loot_char_neris_2|Sichel + Echoadern - Laternenfassung|character_gear|veredelt|Neris Vael|Scherbenkrone/Wurzelwald|Verbessert Neris Vaels Echohunger-Loop und fuegt eine kleine Interaktion mit Traumsaege hinzu.|
|loot_char_neris_3|Sichel + Echoadern - Echohunger-Mod|character_gear|selten|Neris Vael|Scherbenkrone/Wurzelwald|Verbessert Neris Vaels Echohunger-Loop und fuegt eine kleine Interaktion mit Traumsaege hinzu.|
|loot_char_neris_4|Neriss Signaturgriff|character_gear|signatur|Neris Vael|Scherbenkrone/Wurzelwald|Verbessert Neris Vaels Echohunger-Loop und fuegt eine kleine Interaktion mit Traumsaege hinzu.|
|loot_char_neris_5|Relikt: Ich bin nicht sie|character_gear|relikt|Neris Vael|Scherbenkrone/Wurzelwald|Verbessert Neris Vaels Echohunger-Loop und fuegt eine kleine Interaktion mit Traumsaege hinzu.|
|loot_char_neris_6|Mythos: Traumsaege Herzsplitter|character_gear|mythisch|Neris Vael|Scherbenkrone/Wurzelwald|Verbessert Neris Vaels Echohunger-Loop und fuegt eine kleine Interaktion mit Traumsaege hinzu.|
|loot_char_velka_1|Lanze + Sturmleine - Feldfassung|character_gear|gewoehnlich|Velka Sturmtritt|Graumarsch/Eisenbrandkueste|Verbessert Velka Sturmtritts Sturmjagd-Loop und fuegt eine kleine Interaktion mit Sturmwidder hinzu.|
|loot_char_velka_2|Lanze + Sturmleine - Laternenfassung|character_gear|veredelt|Velka Sturmtritt|Graumarsch/Eisenbrandkueste|Verbessert Velka Sturmtritts Sturmjagd-Loop und fuegt eine kleine Interaktion mit Sturmwidder hinzu.|
|loot_char_velka_3|Lanze + Sturmleine - Sturmjagd-Mod|character_gear|selten|Velka Sturmtritt|Graumarsch/Eisenbrandkueste|Verbessert Velka Sturmtritts Sturmjagd-Loop und fuegt eine kleine Interaktion mit Sturmwidder hinzu.|
|loot_char_velka_4|Velkas Signaturgriff|character_gear|signatur|Velka Sturmtritt|Graumarsch/Eisenbrandkueste|Verbessert Velka Sturmtritts Sturmjagd-Loop und fuegt eine kleine Interaktion mit Sturmwidder hinzu.|
|loot_char_velka_5|Relikt: Kein Weg bleibt offen|character_gear|relikt|Velka Sturmtritt|Graumarsch/Eisenbrandkueste|Verbessert Velka Sturmtritts Sturmjagd-Loop und fuegt eine kleine Interaktion mit Sturmwidder hinzu.|
|loot_char_velka_6|Mythos: Sturmwidder Herzsplitter|character_gear|mythisch|Velka Sturmtritt|Graumarsch/Eisenbrandkueste|Verbessert Velka Sturmtritts Sturmjagd-Loop und fuegt eine kleine Interaktion mit Sturmwidder hinzu.|
|loot_char_cyr_1|Resonanzwaffe - Feldfassung|character_gear|gewoehnlich|Cyr Ohne Gestern|Scherbenkrone|Verbessert Cyr Ohne Gesterns Formschock-Loop und fuegt eine kleine Interaktion mit Namenloser Kern hinzu.|
|loot_char_cyr_2|Resonanzwaffe - Laternenfassung|character_gear|veredelt|Cyr Ohne Gestern|Scherbenkrone|Verbessert Cyr Ohne Gesterns Formschock-Loop und fuegt eine kleine Interaktion mit Namenloser Kern hinzu.|
|loot_char_cyr_3|Resonanzwaffe - Formschock-Mod|character_gear|selten|Cyr Ohne Gestern|Scherbenkrone|Verbessert Cyr Ohne Gesterns Formschock-Loop und fuegt eine kleine Interaktion mit Namenloser Kern hinzu.|
|loot_char_cyr_4|Cyrs Signaturgriff|character_gear|signatur|Cyr Ohne Gestern|Scherbenkrone|Verbessert Cyr Ohne Gesterns Formschock-Loop und fuegt eine kleine Interaktion mit Namenloser Kern hinzu.|
|loot_char_cyr_5|Relikt: Ich waehle meinen Namen|character_gear|relikt|Cyr Ohne Gestern|Scherbenkrone|Verbessert Cyr Ohne Gesterns Formschock-Loop und fuegt eine kleine Interaktion mit Namenloser Kern hinzu.|
|loot_char_cyr_6|Mythos: Namenloser Kern Herzsplitter|character_gear|mythisch|Cyr Ohne Gestern|Scherbenkrone|Verbessert Cyr Ohne Gesterns Formschock-Loop und fuegt eine kleine Interaktion mit Namenloser Kern hinzu.|
|loot_vm_001|Moorlaeufer-Rahmen|vehicle_module|gewoehnlich|alle|Sonnenglasweite|Sumpf und flaches Wasser verlieren fast alle Bremswirkung.|
|loot_vm_002|Rissjaeger-Rahmen|vehicle_module|gewoehnlich|alle|Wurzelwald|Sehr leichter Rahmen fuer Drift, Sprung und seitliche Ausweichfenster.|
|loot_vm_003|Eidpanzer-Rahmen|vehicle_module|gewoehnlich|alle|Eisenbrandkueste|Langsam, aber Verbundete koennen hinter dir Schildladung aufbauen.|
|loot_vm_004|Sandsegler-Rahmen|vehicle_module|gewoehnlich|alle|Hochkamm|Auf Glas, Salz und Sand gewinnt das Fahrzeug bei Drift Tempo statt es zu verlieren.|
|loot_vm_005|Schachtspinne-Rahmen|vehicle_module|gewoehnlich|alle|Dunkelgrund|Kann kurz an Waenden und Tunnelkanten haften.|
|loot_vm_006|Werftbastion-Rahmen|vehicle_module|gewoehnlich|alle|Scherbenkrone|Ramm- und Harpunenmodule verursachen mehr Haltungsbruch.|
|loot_vm_007|Echo-Rahmen|vehicle_module|gewoehnlich|alle|Graumarsch|Erlaubt kurze Phasenverschiebung, aber macht den Kern hitzeanfaellig.|
|loot_vm_008|Konvoi-Rahmen|vehicle_module|gewoehnlich|alle|Sonnenglasweite|Skaliert im Koop: nahe Fahrzeuge bekommen kleine Laternenbarriere.|
|loot_vm_009|Mondglas-Kern|vehicle_module|veredelt|alle|Wurzelwald|Allround-Kern mit stabiler Hitze und guter Resonanzgeneration.|
|loot_vm_010|Salzspiegel-Kern|vehicle_module|veredelt|alle|Eisenbrandkueste|Staerker bei hoher Geschwindigkeit; schwach bei Stillstand.|
|loot_vm_011|Harzherz-Kern|vehicle_module|veredelt|alle|Hochkamm|Regeneriert in Naturzonen, kann aber durch Feuer ueberhitzen.|
|loot_vm_012|Tiefenglocken-Kern|vehicle_module|veredelt|alle|Dunkelgrund|Rammangriffe erzeugen Schockwellen und ziehen leichte Gegner an.|
|loot_vm_013|Eidkern|vehicle_module|veredelt|alle|Scherbenkrone|Schild staerker, Schaden niedriger, perfekte Blocks geben Teamenergie.|
|loot_vm_014|Schrottfunken-Kern|vehicle_module|veredelt|alle|Graumarsch|Billig zu reparieren, aber instabil. Kritische Treffer koennen Module resetten.|
|loot_vm_015|Archivkern|vehicle_module|veredelt|alle|Sonnenglasweite|Sigile bleiben laenger auf der Strecke, Gegnerdaten werden markiert.|
|loot_vm_016|Kettenramme|vehicle_module|veredelt|alle|Wurzelwald|Kurze schwere Frontattacke, bricht Barrikaden und Panzerplatten.|
|loot_vm_017|Funkenkanone|vehicle_module|veredelt|alle|Eisenbrandkueste|Mittlere Reichweite, baut Mondbrand auf.|
|loot_vm_018|Harpunenlanze|vehicle_module|selten|alle|Hochkamm|Zieht Ziele oder zieht dich an schwere Ziele heran.|
|loot_vm_019|Runenpflug|vehicle_module|selten|alle|Dunkelgrund|Legt beim Driften Sigillinien auf den Boden.|
|loot_vm_020|Salzstreuer|vehicle_module|selten|alle|Scherbenkrone|Blendet Fahrer, Schuetzen und fliegende Gegner.|
|loot_vm_021|Dornenwalze|vehicle_module|selten|alle|Graumarsch|Fuegt Harzbindung zu und zerfetzt Reifen/Beine.|
|loot_vm_022|Schachtbohrer|vehicle_module|selten|alle|Sonnenglasweite|Fuegt Panzerbruch zu und oeffnet Tunnelabkuerzungen.|
|loot_vm_023|Falkenspeer|vehicle_module|selten|alle|Wurzelwald|Praezise Frontlanze mit hohem Schaden gegen markierte Ziele.|
|loot_vm_024|Seitensense|vehicle_module|selten|alle|Eisenbrandkueste|Schneidet beim Vorbeifahren durch leichte Gegnergruppen.|
|loot_vm_025|Nietwerfer|vehicle_module|selten|alle|Hochkamm|Schneller Seitenbeschuss, skaliert mit Ueberladung.|
|loot_vm_026|Echozunge|vehicle_module|selten|alle|Dunkelgrund|Greift durch Illusionsschilde, kostet aber Kernstabilitaet.|
|loot_vm_027|Wurzelwerfer|vehicle_module|signatur|alle|Scherbenkrone|Setzt organische Minen auf der Strecke ab.|
|loot_vm_028|Schrapnellorgel|vehicle_module|signatur|alle|Graumarsch|Breite Streuung gegen Schwarmgegner.|


Vollstaendige Liste: `database/loot_items.json`, Drop-Pools: `database/drop_tables.json`.


## 9. Multiplayer-Kombos


Die Datenbank enthaelt **86 Multiplayer-Kombos**: alle Duo-Paarungen, mehrere Trio-Techniken und 12 reine Konvoi-Manoever. Wichtig: Koop bekommt Zusatzmechaniken, nicht nur groessere HP-Balken. Gute Spieler lesen Statusfenster, Fahrzeugwinkel und Companion-Callouts.

|id|type|name|trigger|effect|
|---|---|---|---|---|
|combo_char_lyra_char_mira|duo|Lyra + Mira: Mondbrand trifft Siegelriss|Lyra Dorn setzt Mondbrand und Mira Voss trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Controller / Runenbrecherin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Archivspinne ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_tarek|duo|Lyra + Tarek: Mondbrand trifft Schuldmarke|Lyra Dorn setzt Mondbrand und Tarek al-Sahir trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Skirmisher / Taeuscher: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Glasfuchs ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_siofra|duo|Lyra + Siofra: Mondbrand trifft Harzbindung|Lyra Dorn setzt Mondbrand und Siofra Nhal trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Ranger / Fallenbinderin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Moorkaefer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_brannok|duo|Lyra + Brannok: Mondbrand trifft Tiefenruf|Lyra Dorn setzt Mondbrand und Brannok Reef trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Bruiser / Harpunierer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Riffbrecher ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_edda|duo|Lyra + Edda: Mondbrand trifft Eidmarke|Lyra Dorn setzt Mondbrand und Edda Falkenlicht trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Tank / Bannstandarte: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Eidpanzer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_kael|duo|Lyra + Kael: Mondbrand trifft Rostbruch|Lyra Dorn setzt Mondbrand und Kael Nhar trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Assassin / Debuffer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Schachtmaus ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_oren|duo|Lyra + Oren: Mondbrand trifft Wundlicht|Lyra Dorn setzt Mondbrand und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_yara|duo|Lyra + Yara: Mondbrand trifft Ueberladung|Lyra Dorn setzt Mondbrand und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_neris|duo|Lyra + Neris: Mondbrand trifft Echohunger|Lyra Dorn setzt Mondbrand und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_velka|duo|Lyra + Velka: Mondbrand trifft Sturmjagd|Lyra Dorn setzt Mondbrand und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_lyra_char_cyr|duo|Lyra + Cyr: Mondbrand trifft Formschock|Lyra Dorn setzt Mondbrand und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Interceptor / Duellantin mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Dornwolf und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_tarek|duo|Mira + Tarek: Siegelriss trifft Schuldmarke|Mira Voss setzt Siegelriss und Tarek al-Sahir trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Skirmisher / Taeuscher: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Glasfuchs ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_siofra|duo|Mira + Siofra: Siegelriss trifft Harzbindung|Mira Voss setzt Siegelriss und Siofra Nhal trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Ranger / Fallenbinderin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Moorkaefer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_brannok|duo|Mira + Brannok: Siegelriss trifft Tiefenruf|Mira Voss setzt Siegelriss und Brannok Reef trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Bruiser / Harpunierer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Riffbrecher ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_edda|duo|Mira + Edda: Siegelriss trifft Eidmarke|Mira Voss setzt Siegelriss und Edda Falkenlicht trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Tank / Bannstandarte: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Eidpanzer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_kael|duo|Mira + Kael: Siegelriss trifft Rostbruch|Mira Voss setzt Siegelriss und Kael Nhar trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Assassin / Debuffer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Schachtmaus ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_oren|duo|Mira + Oren: Siegelriss trifft Wundlicht|Mira Voss setzt Siegelriss und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_yara|duo|Mira + Yara: Siegelriss trifft Ueberladung|Mira Voss setzt Siegelriss und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_neris|duo|Mira + Neris: Siegelriss trifft Echohunger|Mira Voss setzt Siegelriss und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_velka|duo|Mira + Velka: Siegelriss trifft Sturmjagd|Mira Voss setzt Siegelriss und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_mira_char_cyr|duo|Mira + Cyr: Siegelriss trifft Formschock|Mira Voss setzt Siegelriss und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Controller / Runenbrecherin mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Archivspinne und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_siofra|duo|Tarek + Siofra: Schuldmarke trifft Harzbindung|Tarek al-Sahir setzt Schuldmarke und Siofra Nhal trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Ranger / Fallenbinderin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Moorkaefer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_brannok|duo|Tarek + Brannok: Schuldmarke trifft Tiefenruf|Tarek al-Sahir setzt Schuldmarke und Brannok Reef trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Bruiser / Harpunierer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Riffbrecher ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_edda|duo|Tarek + Edda: Schuldmarke trifft Eidmarke|Tarek al-Sahir setzt Schuldmarke und Edda Falkenlicht trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Tank / Bannstandarte: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Eidpanzer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_kael|duo|Tarek + Kael: Schuldmarke trifft Rostbruch|Tarek al-Sahir setzt Schuldmarke und Kael Nhar trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Assassin / Debuffer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Schachtmaus ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_oren|duo|Tarek + Oren: Schuldmarke trifft Wundlicht|Tarek al-Sahir setzt Schuldmarke und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_yara|duo|Tarek + Yara: Schuldmarke trifft Ueberladung|Tarek al-Sahir setzt Schuldmarke und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_neris|duo|Tarek + Neris: Schuldmarke trifft Echohunger|Tarek al-Sahir setzt Schuldmarke und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_velka|duo|Tarek + Velka: Schuldmarke trifft Sturmjagd|Tarek al-Sahir setzt Schuldmarke und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_tarek_char_cyr|duo|Tarek + Cyr: Schuldmarke trifft Formschock|Tarek al-Sahir setzt Schuldmarke und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Skirmisher / Taeuscher mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Glasfuchs und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_brannok|duo|Siofra + Brannok: Harzbindung trifft Tiefenruf|Siofra Nhal setzt Harzbindung und Brannok Reef trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Bruiser / Harpunierer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Riffbrecher ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_edda|duo|Siofra + Edda: Harzbindung trifft Eidmarke|Siofra Nhal setzt Harzbindung und Edda Falkenlicht trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Tank / Bannstandarte: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Eidpanzer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_kael|duo|Siofra + Kael: Harzbindung trifft Rostbruch|Siofra Nhal setzt Harzbindung und Kael Nhar trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Assassin / Debuffer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Schachtmaus ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_oren|duo|Siofra + Oren: Harzbindung trifft Wundlicht|Siofra Nhal setzt Harzbindung und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_yara|duo|Siofra + Yara: Harzbindung trifft Ueberladung|Siofra Nhal setzt Harzbindung und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_neris|duo|Siofra + Neris: Harzbindung trifft Echohunger|Siofra Nhal setzt Harzbindung und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_velka|duo|Siofra + Velka: Harzbindung trifft Sturmjagd|Siofra Nhal setzt Harzbindung und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_siofra_char_cyr|duo|Siofra + Cyr: Harzbindung trifft Formschock|Siofra Nhal setzt Harzbindung und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Ranger / Fallenbinderin mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Moorkaefer und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_edda|duo|Brannok + Edda: Tiefenruf trifft Eidmarke|Brannok Reef setzt Tiefenruf und Edda Falkenlicht trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Tank / Bannstandarte: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Eidpanzer ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_kael|duo|Brannok + Kael: Tiefenruf trifft Rostbruch|Brannok Reef setzt Tiefenruf und Kael Nhar trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Assassin / Debuffer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Schachtmaus ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_oren|duo|Brannok + Oren: Tiefenruf trifft Wundlicht|Brannok Reef setzt Tiefenruf und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_yara|duo|Brannok + Yara: Tiefenruf trifft Ueberladung|Brannok Reef setzt Tiefenruf und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_neris|duo|Brannok + Neris: Tiefenruf trifft Echohunger|Brannok Reef setzt Tiefenruf und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_velka|duo|Brannok + Velka: Tiefenruf trifft Sturmjagd|Brannok Reef setzt Tiefenruf und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_brannok_char_cyr|duo|Brannok + Cyr: Tiefenruf trifft Formschock|Brannok Reef setzt Tiefenruf und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Bruiser / Harpunierer mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Riffbrecher und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_edda_char_kael|duo|Edda + Kael: Eidmarke trifft Rostbruch|Edda Falkenlicht setzt Eidmarke und Kael Nhar trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Tank / Bannstandarte mit Assassin / Debuffer: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Eidpanzer und Schachtmaus ihre Module fuer ein Konvoi-Manoever.|
|combo_char_edda_char_oren|duo|Edda + Oren: Eidmarke trifft Wundlicht|Edda Falkenlicht setzt Eidmarke und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Tank / Bannstandarte mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Eidpanzer und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_edda_char_yara|duo|Edda + Yara: Eidmarke trifft Ueberladung|Edda Falkenlicht setzt Eidmarke und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Tank / Bannstandarte mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Eidpanzer und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_edda_char_neris|duo|Edda + Neris: Eidmarke trifft Echohunger|Edda Falkenlicht setzt Eidmarke und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Tank / Bannstandarte mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Eidpanzer und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_edda_char_velka|duo|Edda + Velka: Eidmarke trifft Sturmjagd|Edda Falkenlicht setzt Eidmarke und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Tank / Bannstandarte mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Eidpanzer und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_edda_char_cyr|duo|Edda + Cyr: Eidmarke trifft Formschock|Edda Falkenlicht setzt Eidmarke und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Tank / Bannstandarte mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Eidpanzer und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_kael_char_oren|duo|Kael + Oren: Rostbruch trifft Wundlicht|Kael Nhar setzt Rostbruch und Oren Vale trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Assassin / Debuffer mit Support / Heiler-Monk: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Schachtmaus und Pilgerglocke ihre Module fuer ein Konvoi-Manoever.|
|combo_char_kael_char_yara|duo|Kael + Yara: Rostbruch trifft Ueberladung|Kael Nhar setzt Rostbruch und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Assassin / Debuffer mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Schachtmaus und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_kael_char_neris|duo|Kael + Neris: Rostbruch trifft Echohunger|Kael Nhar setzt Rostbruch und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Assassin / Debuffer mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Schachtmaus und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_kael_char_velka|duo|Kael + Velka: Rostbruch trifft Sturmjagd|Kael Nhar setzt Rostbruch und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Assassin / Debuffer mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Schachtmaus und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_kael_char_cyr|duo|Kael + Cyr: Rostbruch trifft Formschock|Kael Nhar setzt Rostbruch und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Assassin / Debuffer mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Schachtmaus und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_oren_char_yara|duo|Oren + Yara: Wundlicht trifft Ueberladung|Oren Vale setzt Wundlicht und Yara Kest trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Support / Heiler-Monk mit Engineer / Drohnenkern: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Pilgerglocke und Kranhexe ihre Module fuer ein Konvoi-Manoever.|
|combo_char_oren_char_neris|duo|Oren + Neris: Wundlicht trifft Echohunger|Oren Vale setzt Wundlicht und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Support / Heiler-Monk mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Pilgerglocke und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_oren_char_velka|duo|Oren + Velka: Wundlicht trifft Sturmjagd|Oren Vale setzt Wundlicht und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Support / Heiler-Monk mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Pilgerglocke und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_oren_char_cyr|duo|Oren + Cyr: Wundlicht trifft Formschock|Oren Vale setzt Wundlicht und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Support / Heiler-Monk mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Pilgerglocke und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_yara_char_neris|duo|Yara + Neris: Ueberladung trifft Echohunger|Yara Kest setzt Ueberladung und Neris Vael trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Engineer / Drohnenkern mit Echo-Mage / Opfermagie: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Kranhexe und Traumsaege ihre Module fuer ein Konvoi-Manoever.|
|combo_char_yara_char_velka|duo|Yara + Velka: Ueberladung trifft Sturmjagd|Yara Kest setzt Ueberladung und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Engineer / Drohnenkern mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Kranhexe und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_yara_char_cyr|duo|Yara + Cyr: Ueberladung trifft Formschock|Yara Kest setzt Ueberladung und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Engineer / Drohnenkern mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Kranhexe und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_neris_char_velka|duo|Neris + Velka: Echohunger trifft Sturmjagd|Neris Vael setzt Echohunger und Velka Sturmtritt trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Echo-Mage / Opfermagie mit Lancer / Verfolgerin: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Traumsaege und Sturmwidder ihre Module fuer ein Konvoi-Manoever.|
|combo_char_neris_char_cyr|duo|Neris + Cyr: Echohunger trifft Formschock|Neris Vael setzt Echohunger und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Echo-Mage / Opfermagie mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Traumsaege und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_char_velka_char_cyr|duo|Velka + Cyr: Sturmjagd trifft Formschock|Velka Sturmtritt setzt Sturmjagd und Cyr Ohne Gestern trifft innerhalb von 3 Sekunden mit einer Kerntechnik.|Kombiniert Lancer / Verfolgerin mit Adaptive / Formwechsel: erzeugt Extra-Stagger, ein kurzes Zeitlupenfenster und einen Teamfunken. Im Vehicle Combat koppeln Sturmwidder und Namenloser Kern ihre Module fuer ein Konvoi-Manoever.|
|combo_trio_01|trio|Letzte Laternen Dreieck|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Mira fixiert die Arena, Tarek legt Koeder, Lyra springt durch die Luecke. Ideal gegen schnelle Bosse.|
|combo_trio_02|trio|Wald und Werft|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Harz bindet, Harpune zieht, Drohne nietet. Vehicle-Variante baut eine mobile Barrikade.|
|combo_trio_03|trio|Eidbruch-Konvoi|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Edda haelt Eidwand, Kael schneidet Reparaturen, Oren wandelt Schaden in Wundlicht.|
|combo_trio_04|trio|Sturm ueber Glas|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Hochgeschwindigkeits-Verfolgung: Koeder, Jagdmarke, Harpunenramme.|
|combo_trio_05|trio|Namenloses Archiv|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Echo, Sigil und Formwechsel destabilisieren Archivgegner. Sehr stark, aber riskant.|
|combo_trio_06|trio|Schacht-Notdienst|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Tunnelkontrolle, Drohnenreparatur und Runenminen fuer Dungeon-Engstellen.|
|combo_trio_07|trio|Fackelruh-Rache|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Jagd, Frontlinie und Duellschaden. Perfekt fuer offene Feldbosse.|
|combo_trio_08|trio|Barmherzige Maschine|Drei Spieler oder zwei Spieler plus Companion-AI treffen ihre Callout-Fenster in richtiger Reihenfolge.|Post-Boss-Tech: Reparatur wird zu Heilung, Heilung zu Schild, Schild zu Rammschaden.|
|combo_convoy_01|vehicle_convoy|Laternenzug|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Drei Fahrzeuge fahren innerhalb einer Laternenbarriere. Der vorderste blockt Projektile, die hinteren laden Ultimates.|
|combo_convoy_02|vehicle_convoy|Harpunenkarussell|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Zwei Harpunenfahrzeuge verankern ein Bossfahrzeug, ein drittes rammt durch den Zugwinkel.|
|combo_convoy_03|vehicle_convoy|Spiegelgasse|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Runenminen und Spiegelkoeder bauen eine falsche Strasse, in die Verfolger hineinbremsen.|
|combo_convoy_04|vehicle_convoy|Schachtquetsche|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Kettenbohrer oeffnet Engstelle, Eidpanzer versperrt Rueckweg, Schrottnebel nimmt Reparatur.|
|combo_convoy_05|vehicle_convoy|Brandungsbrecher|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Riffbrecher schiebt Gegner in Wasserlinien, Siofra bindet, Yara ueberlaedt.|
|combo_convoy_06|vehicle_convoy|Falkensturz-Konvoi|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Edda markiert von oben, Velka jagt, Lyra schliesst mit Rissdrift.|
|combo_convoy_07|vehicle_convoy|Echo-Umleitung|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Neris oeffnet Echoportal, Cyr kopiert das Modul, Mira fixiert Ausstieg.|
|combo_convoy_08|vehicle_convoy|Rettungsleine|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Oren verbindet ein zerstoertes Fahrzeug mit seinem Support-Rig und zieht es aus der Todeszone.|
|combo_convoy_09|vehicle_convoy|Salzsturm-Sprint|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Tarek fuehrt durch Blindzonen, alle Fahrzeuge erhalten Boost, aber Sicht ist reduziert.|
|combo_convoy_10|vehicle_convoy|Dammbruch|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Graumarsch-Konvoi bricht Barrikade, Wasserstrom wird kurz zur Waffe.|
|combo_convoy_11|vehicle_convoy|Glockenritt|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Tiefenglocken-Kern zieht Schwarmgegner an, dann loesen alle AoE-Module aus.|
|combo_convoy_12|vehicle_convoy|Asterhof-Spindel|Positionierung, Geschwindigkeit und Modul-Timing innerhalb eines 6-Sekunden-Fensters.|Endgame-Manoever: Vier Fahrzeuge aktivieren nacheinander Gravitationstore.|


## 10. Bosse - Kurzuebersicht

|id|name|region|tier|hour|vehicle_required|fantasy|
|---|---|---|---|---|---|---|
|boss_nasser_faehnrich|Der Nasse Faehnrich|Graumarsch|mini_boss|0:45|False|Ein gefallener Laternenoffizier, dessen Banner noch immer Befehle an Tote gibt.|
|boss_laternenwurm_mutter|Mutter der Laternenwuermer|Graumarsch|story_boss|2:40|False|Eine Brutkoenigin, die Laternenlicht frisst und in blinde Waerme verwandelt.|
|boss_noret|Noret, Schuldbuchhalter aus Glas|Sonnenglasweite|story_boss|6:30|True|Ein Mensch, der seine Schuld in Vertrage ausgelagert hat; jeder Treffer ist eine Klausel.|
|boss_namenloser_garten|Der Namenlose Garten|Wurzelwald Nhal|story_boss|9:10|False|Kein einzelnes Monster, sondern ein Ort, der dich aus den Koepfen deiner Freunde schneidet.|
|boss_tiefenglocke|Malrec und die Tiefenglocke|Eisenbrandkueste|major_vehicle_boss|12:50|True|Prediger, Sturmmaschine und Leviathan-Ableger in einem Hafenkrieg.|
|boss_falkenlinie|Fall der Falkenlinie|Hochkamm der Eidwacht|political_boss|15:30|True|Ein Duell gegen ein Haus, nicht nur gegen einen Ritter: Banner, Schuetzen, Falken und Eidmagie.|
|boss_sankt_ival|Sankt Ival, Maschinenheiliger|Dunkelgrund|dungeon_boss|17:50|True|Eine alte Reparaturmaschine, die Menschen wie defekte Bauteile sortiert.|
|boss_sereth_hand|Sereths Hand: Die Glaeserne Regentin|Scherbenkrone|midgame_finale|19:45|True|Ein Avatar des Leeren Archivs, gebaut aus den Entscheidungen, die Spieler bisher getroffen haben.|
|boss_schrottkoenig|Der Schrottkoenig von Ruessmarkt|Dunkelgrund|optional_world_boss|optional|True|Ein illegaler Arena-Champion, dessen Fahrzeug aus verlorenen Questbelohnungen gebaut ist.|
|boss_glassrochen_alpha|Glasrochen Alpha|Sonnenglasweite|optional_mount_boss|optional|True|Ein halbwilder Rissrochen, den man nicht toetet, sondern durch perfektes Fahren zaehmt.|


Jeder Boss hat 3 Phasen in `database/boss_phases.json`. Ausformuliert siehe `Boss_Encounter_Bible_v2.md`.
