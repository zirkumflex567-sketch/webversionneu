# Graceful Leaping Crown - Buildcraft Hub & Infinite Combo Pool (v2)

Ausgangspunkt war die vorhandene Design-Notiz zum Meta-Hub, Run-Layer und Combo-System fileciteturn3file0.  
Diese Version trifft jetzt die fehlenden Produktentscheidungen klarer und priorisiert ein Ziel ueber alles:

> **Die ersten 5 Runden muessen sich wie eine steigende Entdeckungsleiter anfuehlen.**  
> Jede Runde zeigt dem Spieler etwas Neues, Staerkeres oder Ueberraschenderes, sodass der Run nicht nur "besser", sondern spuerbar **cooler** wird.

---

## North Star

Wir bauen **kein Loot-System, das einfach Sachen ausspuckt**.  
Wir bauen ein **Discovery-System fuer Builds**.

Das Kerngefuehl soll sein:

1. **Runde 1:** "Okay, das ist schon stark."
2. **Runde 2:** "Oh, das kombiniert sich ja."
3. **Runde 3:** "Wait, jetzt veraendert sich mein Spielstil."
4. **Runde 4:** "Holy shit, jetzt fuehlt sich mein Build wirklich einzigartig an."
5. **Runde 5:** "Ich muss wissen, wie krank das noch werden kann."

Wenn diese Kurve nicht sitzt, ist das System trotz vieler Nodes nicht geil.

---

## Harte Produktentscheidung: Wir nehmen kein reines A/B/C-Modell

In der vorherigen Notiz wurden drei Drop-Modelle als Kandidaten genannt, aber noch nicht sauber erklaert oder entschieden fileciteturn3file0.  
Hier ist jetzt die klare Entscheidung:

## Gewaehlt wird: **Directed Milestone Flow**
Ein Hybrid mit **Milestone-Rueckgrat** und **leichtem Flow-Noise**.

### Was das bedeutet
- **Fruehe Runden sind garantiert kuratiert und lesbar.**
- **Spaeter wird das System offener, chaotischer und emergenter.**
- Der Spieler hat **frueh Discovery-Sicherheit** und **spaeter Build-Freiheit**.

### Warum nicht reines Model A?
**Model A = Flow / Timer / Pity**  
Fuehlt sich gut im Fluss an, ist aber frueh oft zu zufaellig.  
Problem: Es kann passieren, dass der Spieler in den ersten Minuten zwar irgendwas bekommt, aber nichts, was wirklich "wow" ist.

### Warum nicht reines Model B?
**Model B = Skill Reward / Streak basiert**  
Cool fuer Mastery, aber gefaehrlich fuer das Ziel-Fuehlprofil.  
Problem: Schlechtere oder neue Spieler kriegen dann ausgerechnet **weniger geile Momente**, obwohl sie die am meisten brauchen.

### Warum nicht reines Model C?
**Model C = Milestones / Planbar**  
Sehr gut fuer Discovery, aber kann spaeter zu berechenbar wirken.  
Problem: Wenn alles nur milestone-getrieben ist, fehlt spaeter das wilde "was passiert als Naechstes?"-Gefuehl.

### Deshalb Hybrid:
- **Runden 1-5:** stark milestone-gesteuert
- **ab dann:** milestone + director + relevance bias + spice picks + wenige random sprinkles

---

# 1) Discovery Curve fuer die ersten 5 Runden

Das ist die wichtigste neue Design-Festlegung.

## Ziel
In den ersten 5 Runden bekommt der Spieler **nicht einfach 5 kleine Stat-Upgrades**, sondern 5 aufeinander aufbauende Aha-Momente:

### Runde 1 - Foundation
Der Spieler bekommt eine klar lesbare Basis-Power.  
Beispiel:
- Burn on Crit
- Dash leaves Trail
- Ricochet Chance
- Overheal -> Shield
- Kill streak grants haste

**Zielgefuehl:**  
"Mein Build hat jetzt eine Richtung."

### Runde 2 - Confirmation
Der naechste Offer bestaetigt oder erweitert die Richtung.  
Nicht nur "mehr von derselben Zahl", sondern:
- gleicher Tag, neuer Trigger
- gleicher Trigger, neuer Effekt
- erste kleine Synergie

**Zielgefuehl:**  
"Ah, das stackt wirklich. Ich verstehe, wo das hingeht."

### Runde 3 - Expression
Jetzt soll der Build etwas **sichtbar Neues tun**:
- Pulse
- Chain
- Aura
- Explode
- Echo
- Zone
- Shield conversion
- Projectile return

**Zielgefuehl:**  
"Nicht nur staerker - anders."

### Runde 4 - Signature Move
Hier wird 1 Kernmechanik des Builds deutlich build-definierend:
- Burn crit detonates
- Dash emits slam pulse
- Overheal chain-shields
- Poison slows into trap control
- Every third projectile chains shock

**Zielgefuehl:**  
"Das ist jetzt MEIN Run."

### Runde 5 - Escalation / Holy Shit Moment
Der Spieler bekommt einen Effect, der nicht nur skaliert, sondern den Build "aufdreht":
- threshold unlock
- first transmutation
- first echo effect
- first rarity-spiked node
- first mini rule-breaker

**Zielgefuehl:**  
"Okay, jetzt will ich sehen, wie weit das gehen kann."

---

# 2) Konkretes Drop-Modell

## Early Game (Runden 1-5)
Fruehe Runden laufen ueber ein **stark gelenktes Offer-Script**, aber **ohne sichtbar geskriptet zu wirken**.

### Regeln
- Jede Runde 1-5 gibt **mindestens 1 Offer**
- Jedes Offer hat **3 Optionen**
- In jeder Runde ist **mindestens 1 Pick build-relevant**
- In jeder Runde ist **mindestens 1 Pick discovery-orientiert**
- In Runde 3 oder 4 muss mindestens ein Offer einen **sichtbaren Ausdruckswechsel** erlauben
- In Runde 5 muss mindestens eine Option ein **escalation piece** sein

### Offer-Komposition pro frueher Runde
Jedes fruehe Offer besteht aus drei Rollen:

#### Slot A - Continuation
Passt klar zu deinem aktuellen Build-Cluster.

#### Slot B - Discovery
Passt halb zu dir, fuehrt aber in eine neue Mechanik oder einen neuen Ausdruck.

#### Slot C - Wildcard Spice
Etwas Unerwartetes, aber nicht useless.  
Soll nicht "trash" sein, sondern "vielleicht der wahre Build".

---

## Mid/Late Game (ab Runde 6)
Ab hier oeffnen wir das System.

### Director-Regeln
- milestone rewards bleiben bestehen
- zusaetzlich kleine random sprinkles
- wave-end/boss-end offers sind hochwertiger
- current build tags bekommen relevance bias
- off-build spice bleibt erhalten
- dead-picks werden aktiv unterdrueckt

### Langfristiges Ziel
Frueh starkes Kuratieren, spaeter starke Emergenz.

---

# 3) Was "neue Entdeckung" konkret heisst

"Neues entdecken" heisst nicht nur:
- anderer Tooltip
- andere Farbe
- groessere Zahl

Sondern mindestens eins davon:

## A. Neuer Ausdruck
Der Build sieht oder fuehlt sich anders an.
- neue Spur
- neue Zone
- neue Kette
- neue Explosion
- neuer Burst
- neuer Echo

## B. Neue Logik
Ein bestehender Effekt bekommt eine neue Regel.
- overheal wird shield
- poison wird slow
- burn wird crit-burst
- onKill kopiert onHit
- dash macht pulse on land

## C. Neuer Rhythmus
Die Art, wie der Spieler spielt, aendert sich.
- aggressiver
- riskanter
- mobiler
- combo-fokussierter
- streak-orientierter
- low-HP gambler

## D. Neue Hoffnung
Der Spieler sieht eine Richtung, die er weiterbauen will.
Das ist extrem wichtig:
> Der geilste Pick ist oft nicht der aktuell staerkste, sondern der, der sagt:  
> **"Wenn ich noch 2 Sachen dazu bekomme, wird das komplett absurd."**

---

# 4) Build Discovery statt statischem Loot

## Wir bauen keine simple Rarity-Pyramide
Common -> Rare -> Epic ist nur der Rahmen.

Das eigentliche Gefuehl entsteht aus:
- **Glue Nodes** = kleine Verbindungsstuecke
- **Expression Nodes** = sichtbare Style-Aenderung
- **Escalation Nodes** = machen das Ding krank
- **Rule-Breakers** = selten, run-definierend

### Neue Einteilung der Nodes
Jeder Node bekommt zusaetzlich zu Tags eine **Role**:

- `glue`
- `expression`
- `scaler`
- `converter`
- `escalator`
- `rulebreaker`

### Warum das wichtig ist
Der Drop-Director soll nicht nur auf Rarity schauen, sondern auf:
- "Hat der Spieler schon genug Glue?"
- "Hat der Build schon sichtbaren Ausdruck?"
- "Hat er schon ein Signature Moment?"
- "Fehlt ein Eskalationskick?"

So verhindert man Runs, die numerisch okay sind, aber emotional flach.

---

# 5) Fruehe Garantien, die wir explizit festnageln sollten

Diese Regeln sind absichtlich stark, weil sie direkt das Feel sichern.

## Garantie 1
**Bis Ende Runde 2 hat jeder Run eine erkennbare Richtung.**

## Garantie 2
**Bis Ende Runde 3 hat jeder Run mindestens einen sichtbaren Ausdruckswechsel.**

## Garantie 3
**Bis Ende Runde 5 hat jeder Run mindestens eine "holy shit, das stackt wirklich"-Interaktion.**

## Garantie 4
**Die ersten 5 Runden duerfen niemals mit 5 reinen +X%-Picks bestritten werden.**

## Garantie 5
**Der Spieler darf nie das Gefuehl haben, dass frueh nur Muell angeboten wird.**

---

# 6) Anti-Lame-System

Wenn das Buildcraft geil sein soll, muessen bestimmte Dinge aktiv verhindert werden.

## Keine Fake-Choices
Drei Optionen, die sich praktisch gleich anfuehlen, sind Mist.

## Keine Zahlenwuesste frueh
In Runde 1-5 duerfen reine Scalar-Upgrades nur als Beilage auftreten, nicht als gesamte Fantasie.

## Keine Dead Offers
Wenn der Spieler klar auf Dash + Burn + Crit geht, dann soll das System nicht dauernd Block-only / Pickup-only / Stationary-only reinkippen.

## Kein Ueberkuratieren
Der Spieler soll das Gefuehl haben:
"Ich finde krasse Sachen"
und nicht:
"Das Spiel scripted mich durch eine Demo"

---

# 7) Konkrete Offer-Regeln fuer den Director

## Fruehe Runden
### Runde 1 Offer
- 1 foundation pick
- 1 alternative foundation pick
- 1 spicy off-build hook

### Runde 2 Offer
- 1 continuation
- 1 same cluster, new trigger/effect
- 1 alternative branch

### Runde 3 Offer
- 1 expression pick
- 1 continuation
- 1 wildcard

### Runde 4 Offer
- 1 signature move enabler
- 1 continuation
- 1 risk/reward spike

### Runde 5 Offer
- 1 escalator / threshold unlock / converter
- 1 reliable continuation
- 1 high-risk high-hype option

---

# 8) Drop-Cadence

## Empfehlung
- **pro Runde garantiert 1 Major Offer**
- Elite/Boss/Event kann zusaetzliche Offers geben
- maximal **1 pending major offer**
- kleine Side-Rewards koennen separat existieren, aber ohne den Haupt-Drop zu ersetzen

## Warum
Du willst:
- genug Buildcraft
- aber keinen UI-Stau
- und vor allem keine Situation, in der ein geiler Kampf durch 3 nacheinander kommende Menues zerhackt wird

---

# 9) Hub-Interaktion

Der Hub soll Richtung geben, aber die ersten 5 Runden nicht kaputt-kuratieren.

## Hub darf:
- 1 Fokus-Tag boosten
- 1 Start-Seed anbieten
- 1 Ban-Slot gegen nervige Pools geben

## Hub darf nicht:
- den ganzen Run deterministic machen
- Runde 1-5 in immer dieselben Pfade zwingen
- Discovery killen

### Faustregel
Der Hub gibt:
- **Richtung**
Der Run liefert:
- **Ueberraschung**
Die Combo-Engine erschafft:
- **Besitzgefuehl am Build**

---

# 10) Content-Authoring-Regeln fuer "praktisch einfach geil"

Wenn Content geil sein soll, muss schon beim Authoring klar sein, wofuer ein Node existiert.

Jeder Node braucht:

## 1. Fantasy
Was ist das emotionale Bild?
- "crit pyro detonation"
- "ghost dash tank"
- "poison kiting field"
- "orb vampire gambler"

## 2. Mechanical Job
Was macht der Node im Build?
- glue
- expression
- scaler
- converter
- escalator
- rulebreaker

## 3. Discovery Role
Wofuer ist er besonders gut?
- frueher erster Hook
- Midgame Ausdruck
- late escalation
- bridge zwischen zwei Tags
- risk/reward temptation

Wenn ein Node nur "plus damage" macht und nichts erzaehlt, ist er vermutlich kein guter frueher Pick.

---

# 11) Erfolgskriterien - neu priorisiert

Wir messen nicht nur Power, sondern **Wow-Dichte**.

## Neue Kernmetriken
- **time_to_first_build_identity**
- **time_to_first_expression_change**
- **time_to_first_holy_shit_combo**
- **round_1_to_5 novelty score**
- **offer regret rate**
- **dead offer frequency**

## Ziel
Die ersten 5 Runden muessen ueberdurchschnittlich hohe novelty score haben.

---

# 12) Umsetzungsempfehlung fuer das Vertical Slice

## Nicht alles auf einmal
Fuer den ersten spielbaren Slice brauchen wir keine 300 Nodes.

### Reicht fuer v1:
- 35-45 Nodes
- 6-8 Tags
- 3 Rarities
- 5 Roles
- 1 Directed Milestone Flow fuer Runde 1-5
- 1 einfacher Director ab Runde 6+
- 1 Live Build Panel
- 1 Synergy Toast System

## Besonders wichtig
Das Slice muss absichtlich **die ersten 5 Runden testen**.  
Nicht nur "ob das System technisch geht", sondern:
- ob Discovery fuehlbar ist
- ob Offers relevant sind
- ob Runde 3-5 wirklich eine Eskalation haben

---

# 13) Klare Schlussentscheidung

## Wir bauen:
### **Directed Milestone Flow**
mit:
- garantierten fruehen Discovery-Momenten
- relevance bias
- spice slot
- spaeter offener Emergenz

## Wir bauen NICHT:
- reines Timer-Loot
- reines Skill-Gating fuer coole Sachen
- reines Milestone-Skript ohne Chaos

---

# 14) Der eigentliche Satz, an dem wir alles pruefen sollten

Wenn wir ein System, einen Node oder einen Director-Tweak anschauen, fragen wir nicht:

> "Ist das balanced?"

sondern zuerst:

> **"Macht das die ersten 5 Runden geiler?"**

Und danach:

> **"Fuehrt es spaeter zu mehr verrueckten, lesbaren, eigenen Builds?"**

Wenn beides ja ist, ist es wahrscheinlich die richtige Richtung.
