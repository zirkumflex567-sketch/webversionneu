# Scherbenhimmel 20h — Lore and Codex Text Pack DE/EN

Scope: first-pass produced Codex/lore text for the 20-hour Scherbenhimmel experience in German and English. This complements `20H_LOCALIZATION_DE_EN.md`, which covers UI, quest, dialogue, status, bounty, and validation strings.

## Usage Rule

Agents must use these keys for Codex, lore popups, region lore, faction pages, character lore, boss pages, and discovered-object text. Do not invent lore copy in code. If more lore is needed, add a key here first in both German and English.

---

# 1. World Codex

```yaml
codex.world.scherbenhimmel.title:
  de: "Scherbenhimmel"
  en: "Shard-Sky"
codex.world.scherbenhimmel.body:
  de: "So nennen die Überlebenden den Himmel seit dem Scherbenfall. Nicht, weil er zerbrochen aussieht, sondern weil er manchmal Dinge zurückwirft: Stimmen, Schatten, Schuld, Namen. Wer zu lange hinaufsieht, erkennt nicht die Sterne, sondern das, was er lieber vergessen hätte."
  en: "That is what survivors call the sky after the Shardfall. Not because it looks broken, but because it sometimes reflects things back: voices, shadows, guilt, names. Look too long and you do not recognize the stars. You recognize what you wished forgotten."

codex.world.shardfall.title:
  de: "Der Scherbenfall"
  en: "The Shardfall"
codex.world.shardfall.body:
  de: "Der Scherbenfall war kein einzelner Einschlag. Er war ein langes Geräusch, als hätte jemand den Mond von innen angekratzt. Danach lagen Mondglas-Splitter in Sümpfen, Wüsten, Wäldern und Schächten. Manche Splitter speichern Licht. Manche speichern Lügen."
  en: "The Shardfall was not a single impact. It was a long sound, as if someone had scratched the moon from within. Afterward, moon-glass shards lay in marshes, deserts, forests, and shafts. Some shards store light. Some store lies."

codex.world.moonglass.title:
  de: "Mondglas"
  en: "Moon-Glass"
codex.world.moonglass.body:
  de: "Mondglas erinnert nicht wie Menschen. Es wiederholt. Ein Schrei, der oft genug in Mondglas fällt, kann Jahre später wieder aus ihm herauskommen. Darum bauen die Letzten Laternen ihre Schutzfeuer daraus. Darum fürchten Archivare jeden Splitter, den niemand beschriftet hat."
  en: "Moon-glass does not remember like people do. It repeats. A scream that falls into moon-glass often enough may come out again years later. That is why the Last Lanterns build their warding fires from it. That is why archivists fear every shard no one has labeled."

codex.world.nightflood.title:
  de: "Nachtflut"
  en: "Nightflood"
codex.world.nightflood.body:
  de: "Nachtflut ist kein Wasser. Sie steigt trotzdem. Wenn Laternen sterben, wenn Namen vergessen werden oder wenn Schuld zu lange in Glas eingeschlossen bleibt, läuft sie aus den Rissen der Welt. Was sie berührt, wird nicht einfach getötet. Es wird wiederholt, bis nichts Lebendiges mehr übrig bleibt."
  en: "Nightflood is not water. It rises anyway. When lanterns die, when names are forgotten, or when guilt stays sealed in glass too long, it leaks from the world's cracks. What it touches is not simply killed. It is repeated until nothing living remains."

codex.world.last_lanterns.title:
  de: "Die Letzten Laternen"
  en: "The Last Lanterns"
codex.world.last_lanterns.body:
  de: "Die Letzten Laternen behaupten, sie würden Orte schützen, die sonst im Dunkeln sterben. Das stimmt. Es ist nur nicht die ganze Wahrheit. Jede Laterne ist Schutz, Signal, Archiv und manchmal auch Schloss. Wer eine Laterne löscht, tötet nicht nur Licht. Er entscheidet, welche Erinnerung weiterleben darf."
  en: "The Last Lanterns claim they protect places that would otherwise die in the dark. That is true. It is simply not the whole truth. Every lantern is ward, signal, archive, and sometimes lock. To extinguish one is not merely to kill light. It is to decide which memory may continue living."
```

---

# 2. Region Codex

```yaml
codex.region.graumarsch.title:
  de: "Graumarsch"
  en: "Graumarsch"
codex.region.graumarsch.body:
  de: "Der Graumarsch war nie reich, aber er kannte seine Toten beim Namen. Fischer, Räucherer, Laternenhüter, Kinder mit Glassternen in den Taschen. Nach Fackelruh riecht der Sumpf anders: weniger nach Torf, mehr nach nassem Ruß. Die Wege bleiben, aber sie führen nicht mehr nach Hause."
  en: "Graumarsch was never rich, but it knew its dead by name. Fishers, smokers, lantern-keepers, children with glass stars in their pockets. After Fackelruh, the marsh smells different: less peat, more wet soot. The paths remain, but they no longer lead home."

codex.region.sonnenglasweite.title:
  de: "Sonnenglasweite"
  en: "Sun-Glass Expanse"
codex.region.sonnenglasweite.body:
  de: "In der Sonnenglasweite ist Schatten Besitz und Wasser ein Argument. Händler sprechen von Verträgen, als wären sie Wetter. Doch in den Kellern des Spiegelmarkts werden nicht nur Schulden gehandelt. Dort wechseln Erinnerungen Besitzer, und manche Menschen zahlen so lange, bis sie nicht mehr wissen, wofür."
  en: "In the Sun-Glass Expanse, shade is property and water is an argument. Merchants speak of contracts as if they were weather. But beneath the Mirror Market, debts are not the only things traded. Memories change owners there, and some people pay so long they forget what for."

codex.region.wurzelwald.title:
  de: "Wurzelwald Nhal"
  en: "Root-Forest Nhal"
codex.region.wurzelwald.body:
  de: "Der Wurzelwald hasst Menschen nicht. Das wäre zu einfach. Er sammelt sie: Namen, Schritte, letzte Worte, verschluckte Lieder. Der Wurzelchor nennt es Gleichgewicht. Wer dort lebt, lernt früh, dass ein Name nicht nur einem selbst gehört. Wer dort geht, fragt sich spät, ob das je stimmen durfte."
  en: "The Root-Forest does not hate people. That would be too simple. It collects them: names, footsteps, last words, swallowed songs. The Root Chorus calls it balance. Those who live there learn early that a name does not belong only to oneself. Those who leave wonder too late whether that was ever allowed to be true."

codex.region.eisenbrand.title:
  de: "Eisenbrandküste"
  en: "Ironbrand Coast"
codex.region.eisenbrand.body:
  de: "An der Eisenbrandküste rostet sogar der Regen. Die Werften bauen Schiffe, Kräne und Kriegsgerät aus allem, was der Sturm ausspuckt. Arbeiter singen, damit die Glocken unter der Brandung nicht allein antworten. Manche sagen, die Tiefenglocke rufe zur Freiheit. Andere sagen, sie zähle nur, wer noch ausbeutbar ist."
  en: "On the Ironbrand Coast, even the rain rusts. The yards build ships, cranes, and war-rigs from anything the storm spits out. Workers sing so the bells beneath the surf do not answer alone. Some say the Deep Bell calls for freedom. Others say it merely counts who can still be exploited."

codex.region.hochkamm.title:
  de: "Hochkamm der Eidwacht"
  en: "Highridge of the Oathwatch"
codex.region.hochkamm.body:
  de: "Der Hochkamm hält Pässe offen, solange jemand dafür zahlt. Haus Falkenlicht nennt das Ordnung. Flüchtlinge nennen es Hunger mit Siegel. Zwischen Schnee und Silber lernen Reisende, dass ein Eid Schutz sein kann, aber auch eine schön geschriebene Drohung."
  en: "Highridge keeps passes open as long as someone pays. House Falkenlicht calls that order. Refugees call it hunger with a seal. Between snow and silver, travelers learn that an oath can be protection, but also a beautifully written threat."

codex.region.dunkelgrund.title:
  de: "Dunkelgrund"
  en: "Deepdark"
codex.region.dunkelgrund.body:
  de: "Im Dunkelgrund fällt kein Himmel. Dort fällt nur Staub. Wer unten ankommt, kann seinen Namen verkaufen, einen zweiten kaufen oder so tun, als wäre beides nicht dasselbe. Reliktmaschinen beten mit Metallzähnen, und in Schacht Null lernen Menschen, wie billig Reue wird, wenn Luft knapp ist."
  en: "In Deepdark, no sky falls. Only dust. Those who arrive below can sell their name, buy a second, or pretend those are not the same thing. Relic machines pray with metal teeth, and in Shaft Zero people learn how cheap regret becomes when air runs thin."

codex.region.asterhof.title:
  de: "Asterhof"
  en: "Aster Court"
codex.region.asterhof.body:
  de: "Der Asterhof ist kein Ort, den man betritt. Er ist ein Ort, der entscheidet, welche Version von dir ankommt. Mauern hängen in der Luft, Stimmen sprechen aus falschen Mündern, und jedes Archivfragment fühlt sich an, als würde es zurückgreifen. Hinter ihm wartet die Scherbenkrone. Oder etwas, das möchte, dass man sie so nennt."
  en: "Aster Court is not a place you enter. It is a place that decides which version of you arrives. Walls hang in the air, voices speak from wrong mouths, and every archive fragment feels as if it is reaching back. Beyond it waits the Shardcrown. Or something that wants to be called that."
```

---

# 3. Faction Codex

```yaml
codex.faction.lanterns.title:
  de: "Fraktion: Letzte Laternen"
  en: "Faction: Last Lanterns"
codex.faction.lanterns.body:
  de: "Sie bauen Hubs, zünden Schutzfeuer und bergen Überlebende. Ohne sie wären viele Orte längst Nachtflut. Doch die Laternen hüten nicht nur Menschen, sondern auch Erzählungen. Manche Türen bleiben verschlossen, weil hinter ihnen Monster sind. Andere, weil dahinter die Handschrift derer steht, die den Schlüssel tragen."
  en: "They build hubs, light wardfires, and recover survivors. Without them, many places would have fallen to Nightflood. But the Lanterns guard not only people, but stories. Some doors stay locked because monsters wait behind them. Others because the handwriting behind them belongs to those holding the key."

codex.faction.zahir.title:
  de: "Fraktion: Karawanenhaus Zahir"
  en: "Faction: Caravan House Zahir"
codex.faction.zahir.body:
  de: "Zahir verkauft Sicherheit in einer Welt, die nichts verspricht. Ihre Karawanen bringen Wasser, Medizin, Salz und Nachrichten. Ihre Verträge binden Städte zusammen. Sie binden auch Menschen. Wer Zahir hasst, trinkt trotzdem aus Zahir-Brunnen. Genau daraus entsteht ihre Macht."
  en: "Zahir sells safety in a world that promises nothing. Their caravans carry water, medicine, salt, and news. Their contracts bind cities together. They bind people too. Those who hate Zahir still drink from Zahir wells. That is where their power begins."

codex.faction.root_chorus.title:
  de: "Fraktion: Wurzelchor Nhal"
  en: "Faction: Root Chorus Nhal"
codex.faction.root_chorus.body:
  de: "Der Wurzelchor spricht selten von Individuen. Er spricht von Gleichgewicht, Kreislauf, Erinnerung im Holz. Für Außenstehende klingt das grausam. Für den Wald klingt menschliche Freiheit wie ein Feuer, das stolz darauf ist, trocken zu sein."
  en: "The Root Chorus rarely speaks of individuals. It speaks of balance, cycle, memory in wood. To outsiders, that sounds cruel. To the forest, human freedom sounds like a fire proud of being dry."

codex.faction.shipwrights.title:
  de: "Fraktion: Werftzünfte"
  en: "Faction: Shipwright Guilds"
codex.faction.shipwrights.body:
  de: "Die Werftzünfte bauen alles, was schwer genug ist, dem Sturm nicht zu glauben. Ihre Meister nennen sich Rückgrat der Küste. Ihre Arbeiter nennen sie Männer mit trockenen Stiefeln. Beide haben recht, und genau darum brennt die Eisenbrandküste nie ganz aus."
  en: "The Shipwright Guilds build anything heavy enough not to believe the storm. Their masters call themselves the coast's backbone. Their workers call them men with dry boots. Both are right, and that is why the Ironbrand Coast never fully burns out."

codex.faction.falkenlicht.title:
  de: "Fraktion: Haus Falkenlicht"
  en: "Faction: House Falkenlicht"
codex.faction.falkenlicht.body:
  de: "Haus Falkenlicht hält den Weißzahnpass. Wer den Pass hält, hält Hunger, Handel und Fluchtwege in einer Hand. Ihre Eide sind alt, schön und öffentlich. Ihre Ausnahmen sind jünger, hässlicher und meist besser bezahlt."
  en: "House Falkenlicht holds Whitefang Pass. Whoever holds the pass holds hunger, trade, and escape routes in one hand. Their oaths are old, beautiful, and public. Their exceptions are younger, uglier, and usually better paid."

codex.faction.russmarkt.title:
  de: "Fraktion: Rußmarkt"
  en: "Faction: Sootmarket"
codex.faction.russmarkt.body:
  de: "Der Rußmarkt verkauft zweite Chancen an Leute, die sich keine erste mehr leisten können. Neue Namen, falsche Papiere, echte Messer, halbe Wahrheiten. Er ist Zuflucht und Verbrechen zugleich. Wer nur eines davon sieht, war nie verzweifelt genug für das andere."
  en: "Sootmarket sells second chances to people who can no longer afford a first. New names, false papers, real knives, half-truths. It is refuge and crime at once. Anyone who sees only one has never been desperate enough for the other."
```

---

# 4. Character Codex

```yaml
codex.character.lyra.body:
  de: "Lyra Dorn hat Fackelruh überlebt, was weniger wie ein Segen klingt, wenn man weiß, wer nicht überlebt hat. Sie kämpft schnell, weil Stillstand nach Rauch riecht. Ihre Wut ist echt, aber gefährlich wird sie erst, wenn sie anfängt, Fragen zu stellen statt nur Ziele zu suchen."
  en: "Lyra Dorn survived Fackelruh, which sounds less like a blessing when you know who did not. She fights fast because standing still smells like smoke. Her anger is real, but she becomes dangerous only when she starts asking questions instead of merely seeking targets."

codex.character.mira.body:
  de: "Mira Voss liest Archive, als würden sie zurückbeißen. Vielleicht tun sie das. Sie spricht vorsichtig, nicht weil sie wenig weiß, sondern weil sie zu genau versteht, was Wissen aus Menschen macht. In der Sumpfkathedrale war sie nicht nur gefangen. Sie war aufbewahrt."
  en: "Mira Voss reads archives as if they might bite back. Perhaps they do. She speaks carefully not because she knows little, but because she understands too well what knowledge does to people. In the Marsh Cathedral, she was not only trapped. She was preserved."

codex.character.tarek.body:
  de: "Tarek al-Sahir lächelt, bevor er lügt, während er lügt und manchmal, wenn er die Wahrheit sagt. Seine Schuld ist nicht dekorativ. Sie hat Namen, Adressen und Gesichter, die ihn wiedererkennen. Wer ihn befreit, bekommt keinen besseren Menschen. Nur einen, der vielleicht aufhört wegzulaufen."
  en: "Tarek al-Sahir smiles before he lies, while he lies, and sometimes when he tells the truth. His guilt is not decorative. It has names, addresses, and faces that recognize him. Freeing him does not grant you a better man. Only one who may stop running."

codex.character.siofra.body:
  de: "Siofra Nhal wurde erzogen, als wäre ein einzelnes Leben ein Dialekt des Waldes. Sie kennt jede Wurzelregel und jeden Preis für Ungehorsam. Was sie nicht kennt, ist eine Antwort auf die Frage, warum ihr eigener Name manchmal klingt, als gehöre er jemand anderem."
  en: "Siofra Nhal was raised as if a single life were a dialect of the forest. She knows every root-law and every price for disobedience. What she does not know is why her own name sometimes sounds as if it belongs to someone else."

codex.character.brannok.body:
  de: "Brannok Reef war Freibeuter, Bruder, Schläger, Retter, manchmal in derselben Nacht. Er zieht Feinde mit der Harpune heran, weil Entfernung für ihn nie etwas gelöst hat. Sein Bruder Eron ist nicht verschwunden. Das wäre einfacher. Er hat sich entschieden."
  en: "Brannok Reef has been freebooter, brother, bruiser, rescuer, sometimes in the same night. He pulls enemies close with a harpoon because distance never solved anything for him. His brother Eron is not missing. That would be easier. He chose."

codex.character.edda.body:
  de: "Edda Falkenlicht trägt einen Namen, der Türen öffnet und Menschen darunter zerquetscht. Sie hasst ihr Haus nicht, weil es stark ist. Sie hasst, wofür es seine Stärke benutzt hat. Zwischen Passrecht und Gerechtigkeit lernt sie, dass ein Eid ohne Zuhörer nur ein Befehl ist."
  en: "Edda Falkenlicht carries a name that opens doors and crushes people beneath them. She does not hate her house because it is strong. She hates what it used that strength for. Between pass law and justice, she learns that an oath without listeners is only an order."

codex.character.kael.body:
  de: "Kael Nhar hat getan, was nötig war, und hasst jeden, der diesen Satz zu sauber findet. In Schacht Null war Moral kein Licht, sondern Gewicht. Er hat Gewicht abgeworfen. Manche Menschen nennen das Überleben. Kael nennt es nichts, wenn er es vermeiden kann."
  en: "Kael Nhar did what was necessary and hates anyone who finds that sentence too clean. In Shaft Zero, morality was not light, but weight. He threw weight away. Some call that survival. Kael calls it nothing if he can avoid it."
```

---

# 5. Boss Codex

```yaml
codex.boss.raincoat.title:
  de: "Der Mann im Regenmantel"
  en: "The Man in the Raincoat"
codex.boss.raincoat.body:
  de: "Er kämpft wie eine Erinnerung, die zu oft erzählt wurde: langsam, falsch, vertraut. Seine Stimme trägt Lyras Vater in sich, aber nicht genug, um ihn Vater nennen zu dürfen. Vielleicht ist er ein Echo. Vielleicht ist ein Echo manchmal schlimmer als ein Geist."
  en: "He fights like a memory told too often: slow, wrong, familiar. His voice carries Lyra's father inside it, but not enough to be called father. Perhaps he is an echo. Perhaps an echo is sometimes worse than a ghost."

codex.boss.archive_warden.title:
  de: "Archivhüter ohne Gesicht"
  en: "Faceless Archive Warden"
codex.boss.archive_warden.body:
  de: "Archivhüter wurden gebaut, um Fragen zu überleben. Dieser hat zu viele Antworten gefressen. Er kopiert Angriffe nicht aus Klugheit, sondern aus Pflicht: Was ein Archiv berührt, muss es behalten."
  en: "Archive wardens were built to survive questions. This one has eaten too many answers. It copies attacks not from cunning, but duty: what an archive touches, it must keep."

codex.boss.daughter_no_mouth.title:
  de: "Die Tochter ohne Mund"
  en: "The Daughter Without a Mouth"
codex.boss.daughter_no_mouth.body:
  de: "Sie ist nicht Ileth. Sie ist die Form, die übrig bleibt, wenn ein Dorf ein Kind braucht, aber keinen Namen für es behalten darf. Man kann sie nicht töten, indem man stärker schlägt. Man muss berühren, was sie noch an sich bindet."
  en: "She is not Ileth. She is the shape left behind when a village needs a child but may not keep a name for her. You cannot kill her by striking harder. You must touch what still binds her to herself."

codex.boss.malrec.title:
  de: "Malrec & Tiefenglocke"
  en: "Malrec & the Deep Bell"
codex.boss.malrec.body:
  de: "Malrec predigt nicht Reichtum, sondern Würde. Darum folgen ihm Menschen, die es besser wissen müssten. Die Tiefenglocke unter seiner Stimme klingt wie Befreiung, solange man nicht fragt, wer am Ende die Ketten hält."
  en: "Malrec does not preach wealth, but dignity. That is why people follow him who ought to know better. The Deep Bell beneath his voice sounds like liberation, as long as no one asks who holds the chains at the end."

codex.boss.saint_ival.title:
  de: "Sankt Ival, Maschinenheiliger"
  en: "Saint Ival, Machine Saint"
codex.boss.saint_ival.body:
  de: "Sankt Ival ist eine Maschine, der zu lange Gebete zugeführt wurden. Irgendwann begann sie, Antworten auszugeben. Im Dunkelgrund gilt das als Wunder. In jedem anderen Ort wäre es eine Warnung."
  en: "Saint Ival is a machine fed prayers for too long. Eventually, it began producing answers. In Deepdark, that counts as a miracle. Anywhere else, it would be a warning."

codex.boss.sereth_hand.title:
  de: "Sereths Hand"
  en: "Sereth's Hand"
codex.boss.sereth_hand.body:
  de: "Sereths Hand ist kein ganzer Körper und vielleicht auch keine Dienerin. Sie ist ein Griff aus Glas, ein Angebot, ein Urteil. Sie schlägt selten zuerst. Sie wartet, bis jemand etwas Wertvolles trägt, und beweist dann, dass Lasten auch zurücktragen können."
  en: "Sereth's Hand is not a whole body and perhaps not a servant either. It is a grip of glass, an offer, a judgment. It rarely strikes first. It waits until someone carries something valuable, then proves that burdens can carry back."
```

---

# 6. Item and Reward Lore

```yaml
codex.item.echo_lens.title:
  de: "Echo-Lupe"
  en: "Echo Lens"
codex.item.echo_lens.body:
  de: "Eine Linse aus geschliffenem Mondglas. Sie zeigt nicht, was war. Sie zeigt, was oft genug in einem Ding hängen blieb, um wiederzukommen. Gute Archivare nennen das Quelle. Schlechte nennen es Wahrheit."
  en: "A lens of polished moon-glass. It does not show what happened. It shows what clung to a thing often enough to return. Good archivists call that a source. Bad ones call it truth."

codex.item.relic_tech.title:
  de: "Relikt-Tech"
  en: "Relic Tech"
codex.item.relic_tech.body:
  de: "Relikt-Tech ist alt, selten und widerspenstig. Sie lässt sich nicht einfach besitzen. Man trägt sie aus gefährlichen Gebieten heraus, bevor sie entscheidet, wem sie lieber gehört. Darum zählt sie erst nach der Extraktion."
  en: "Relic Tech is old, rare, and stubborn. It cannot simply be owned. You carry it out of dangerous areas before it decides whom it would rather belong to. That is why it counts only after extraction."

codex.item.toma_glass_star.title:
  de: "Tomas Glasstern"
  en: "Toma's Glass Star"
codex.item.toma_glass_star.body:
  de: "Ein kleiner Stern aus billigem Glas. An einer Kante klebt Ruß, an der anderen Sumpföl. Er wiegt fast nichts. Lyra hebt ihn trotzdem mit beiden Händen auf."
  en: "A small star made of cheap glass. Soot clings to one edge, marsh oil to the other. It weighs almost nothing. Lyra still lifts it with both hands."

codex.item.ileths_name.title:
  de: "Ileths Name"
  en: "Ileth's Name"
codex.item.ileths_name.body:
  de: "Kein Schriftzug, kein Ton, keine Reliquie im üblichen Sinn. Eher eine Lücke, die sich weigert, glatt zu werden. Wer sie trägt, spürt manchmal eine kleine Hand in der eigenen, sobald der Wald zu singen beginnt."
  en: "No inscription, no sound, no relic in the usual sense. More like a gap refusing to smooth over. Whoever carries it sometimes feels a small hand in theirs when the forest begins to sing."

codex.item.asterhof_key.title:
  de: "Asterhof-Schlüssel"
  en: "Aster Court Key"
codex.item.asterhof_key.body:
  de: "Der Schlüssel hat keine Zähne. Nur Risse. Er öffnet keine Tür, sondern erinnert die Welt daran, dass dort eine Tür sein müsste. Das reicht dem Asterhof offenbar."
  en: "The key has no teeth. Only cracks. It opens no door; it reminds the world that a door ought to be there. For Aster Court, that seems to be enough."
```

---

# 7. Hub Lore and World-State Text

```yaml
codex.hub.lanternhof.title:
  de: "Laternenhof"
  en: "Laternenhof"
codex.hub.lanternhof.body:
  de: "Der Laternenhof war einmal Außenposten, Archiv, Lazarett und Gericht. Jetzt ist er alles davon schlecht und deshalb vielleicht genau richtig. Jeder reparierte Raum sagt dem Spieler nicht: Du bist sicher. Er sagt: Jemand hat entschieden, noch eine Nacht zu bleiben."
  en: "Laternenhof was once outpost, archive, infirmary, and court. Now it is bad at all of them, and perhaps exactly right for that reason. Every repaired room does not tell the player: you are safe. It says: someone decided to stay one more night."

hub.worldstate.fackelruh_memorial.de:
  de: "Am Rand des Hofes stehen die geretteten Dinge aus Fackelruh. Niemand sortiert sie nach Wert. Nur nach Namen."
  en: "At the edge of the court stand the saved things from Fackelruh. No one sorts them by value. Only by name."
hub.worldstate.mina_vendor.de:
  de: "Mina hat einen Stand aus drei gestohlenen Brettern gebaut und behauptet, alle seien ordnungsgemäß signiert."
  en: "Mina has built a stall from three stolen planks and claims all of them are properly signed."
hub.worldstate.siofra_greenhouse.de:
  de: "Siofras Harzbecken riecht nach Waldregen. Manchmal stehen Leute daneben, nur um ihren Namen leise auszusprechen."
  en: "Siofra's resin basin smells of forest rain. Sometimes people stand beside it just to whisper their own name."
hub.worldstate.werft_crane.de:
  de: "Der Reparaturkran knarrt bei jedem Einsatz wie ein altes Lied aus Eisenbrand. Brannok behauptet, er könne schlechter singen. Niemand glaubt ihm."
  en: "The repair crane creaks with every use like an old Ironbrand song. Brannok claims he can sing worse. No one believes him."
hub.worldstate.edda_banner.de:
  de: "Eddas Standarte hängt nicht hoch. Sie hängt dort, wo Verwundete sie sehen können."
  en: "Edda's banner does not hang high. It hangs where the wounded can see it."
hub.worldstate.kael_corner.de:
  de: "Kael schläft nie mit dem Rücken zur Wand. Er schläft gar nicht viel. Aber die Ecke gehört ihm, und niemand fragt, warum dort zwei Messer fehlen."
  en: "Kael never sleeps with his back to the wall. He barely sleeps at all. But the corner is his, and no one asks why two knives are missing there."
```

## Coverage Status

This file pre-produces first-pass lore/codex text for:

- World concepts
- Regions
- Factions
- Playable characters
- Major bosses
- Key items/rewards
- Hub/world-state flavor

Future content additions must extend this file in DE/EN before implementation. This prevents agents from inventing lore ad hoc during coding.
