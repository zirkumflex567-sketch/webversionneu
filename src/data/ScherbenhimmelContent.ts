export type ContentCategory = "character" | "vehicle" | "boss" | "loot" | "combo" | "quest" | "event"

export interface ContentTag {
  label: string
  tone?: "default" | "danger" | "rare" | "system" | "story"
}

export interface ContentRecord {
  id: string
  category: ContentCategory
  name: string
  subtitle: string
  region: string
  summary: string
  mechanics: string[]
  rewards: string[]
  tags: ContentTag[]
  implementationNotes: string
}

export const SCHERBENHIMMEL_CONTENT: ContentRecord[] = [
  {
    id: "char_lyra_dorn",
    category: "character",
    name: "Lyra Dorn",
    subtitle: "Klingenpistolen-Jaegerin der Graumarsch",
    region: "Graumarsch",
    summary: "Starterfigur mit schneller Vehicle-Jagd, hoher Mobilitaet und emotionalem Rachebogen. Lyra jagt Nachtflut-Spuren, bis sie begreift, dass ihr Vater Teil der alten Laternenluege war.",
    mechanics: ["Dash-Schuesse markieren Ziele fuer Folgetreffer", "Vehicle: Risshirsch-Bike mit Seitwaertssprung", "Ultimate: Laternenbruch detoniert alle Markierungen"],
    rewards: ["Signaturwaffe Dornsplitter", "Vehicle-Mod Schwurdaempfer", "Housing-Trophaee Fackelruher Windlampe"],
    tags: [{ label: "Starter", tone: "story" }, { label: "Mobility" }, { label: "Mark" }],
    implementationNotes: "Als naechste spielbare Figur nach Rixa/Marek vorbereiten; braucht CharacterId-Erweiterung und SkillTree-Migration."
  },
  {
    id: "char_mira_voss",
    category: "character",
    name: "Mira Voss",
    subtitle: "Exil-Archivarin mit Runenklingen",
    region: "Laternenhof",
    summary: "Kontroll- und Analysefigur. Mira liest Gegnerzustaende, bricht Schilde und oeffnet alternative Dialogloesungen bei Archiv-, Eid- und Mondglasquests.",
    mechanics: ["Runenschnitt reduziert Boss-Resistenzen", "Echo-Lupe deckt versteckte Questspuren auf", "Vehicle: Archivgleiter stabilisiert Risszonen"],
    rewards: ["Skillpfad Wahrheitsbruch", "Codex-Eintraege als Progression", "Relikt Affix: Erinnerungsschnitt"],
    tags: [{ label: "Control" }, { label: "Lore Key", tone: "story" }, { label: "Debuff" }],
    implementationNotes: "Perfekt fuer Content-Browser-Demo, weil sie Datenbank/Quest-Codex narrativ legitimiert."
  },
  {
    id: "char_tarek_al_sahir",
    category: "character",
    name: "Tarek al-Sahir",
    subtitle: "Karawanenspeer und Schuldentrickser",
    region: "Sonnenglasweite",
    summary: "Hit-and-run Speerkaempfer fuer Konvoi- und Vehicle-Combat. Tarek kann Schuldscheine faelschen, Handelsrouten drehen und Gegner in Spiegelduplikate locken.",
    mechanics: ["Speerwurf zieht Fahrzeug in Zielrichtung", "Spiegelkoeder splittert Aggro", "Konvoi-Bonus bei unbeschaedigter Fracht"],
    rewards: ["Glasrochen-Chassis", "Karawanenruf", "Drop-Table: Schuldmarken"],
    tags: [{ label: "Vehicle Core", tone: "system" }, { label: "Deception" }, { label: "Economy" }],
    implementationNotes: "Konvoi-Techniken spaeter mit Escort-Event-Controller verbinden."
  },
  {
    id: "vehicle_risshirsch_bike",
    category: "vehicle",
    name: "Risshirsch-Bike",
    subtitle: "Sprung- und Verfolgungsfahrzeug",
    region: "Graumarsch / Hochkamm",
    summary: "Ein duennes, nervoeses Jagdfahrzeug mit Mondglas-Geweih. Es springt ueber Graben, Wracks und Risslinien und fuehlt sich wie ein Raubtier auf Raedern an.",
    mechanics: ["Doppelsprung ueber Terrain-Kanten", "Geweihramme bricht leichte Boss-Panzerung", "Perfektes Ausweichen laedt Nitro sofort nach"],
    rewards: ["Skin: Moorlaterne", "Mod: Schockgeweih", "Passive: +8% Scout-Reichweite"],
    tags: [{ label: "Traversal", tone: "system" }, { label: "Scout" }, { label: "Nitro" }],
    implementationNotes: "Chassis als Erweiterung der vorhandenen vehicleId-Loadouts; Startwerte in store.applyLoadoutAndStart ergaenzen."
  },
  {
    id: "vehicle_glasrochen",
    category: "vehicle",
    name: "Glasrochen",
    subtitle: "Wuestengleiter fuer Drift-Combat",
    region: "Sonnenglasweite",
    summary: "Breiter Gleiter, der ueber Glasboden surft, Sandstuerme schneidet und Gegner mit Reflexionsminen in Kurven zwingt.",
    mechanics: ["Drift baut Spiegelbarriere auf", "Gleitflug ueber Glasbruch-Schluchten", "Koop-Hook: Allies koennen Windschatten fuer Crit-Bonus nutzen"],
    rewards: ["Mount-Farbe Azhar-Kobaltblau", "Mod: Reflexionskiel", "Questunlock: Wettfahrt der Glasrochen"],
    tags: [{ label: "Drift" }, { label: "Racing" }, { label: "Coop Buff", tone: "system" }],
    implementationNotes: "Braucht spaeter Steering-Model mit Drift-Scalar; vorerst als Loadout-Datensatz im Browser."
  },
  {
    id: "boss_tiefenglocke_hadrassa",
    category: "boss",
    name: "Hadrassa, Mutter der Tiefenglocke",
    subtitle: "Leviathan-Boss unter dem Glockenriff",
    region: "Eisenbrandkueste",
    summary: "Riesiger Kuestenboss, dessen Glockenschlaege Wasser, Metall und Spielerfahrzeuge aus dem Takt bringen. Der Kampf wechselt zwischen Dock-Arena und Vehicle-Verfolgung ueber brechende Stege.",
    mechanics: ["Phase 1: Glockenwellen muessen hinter Kranwracks geblockt werden", "Phase 2: Vehicle-Harpunen oeffnen Panzerplatten", "Phase 3: Koop-Spieler teilen Resonanzstacks, sonst Mass-Stun"],
    rewards: ["Relikt: Herz der Tiefenglocke", "Brannok-Bindung +2", "Vehicle-Mod: Leviathan-Harpune"],
    tags: [{ label: "World Boss", tone: "danger" }, { label: "Vehicle Phase", tone: "system" }, { label: "Coop" }],
    implementationNotes: "Als erster Boss-Prototyp geeignet: klare Telegraphed Rings, Weakpoints, Add-Wellen und Chase-Sequenz."
  },
  {
    id: "boss_sankt_ival",
    category: "boss",
    name: "Sankt Ival der Maschinenheilige",
    subtitle: "Defekter Untergrund-Guardian",
    region: "Dunkelgrund",
    summary: "Eine heilige Bohrmaschine mit Pilzchor im Reaktor. Ival betet in Fehlermeldungen und zwingt Spieler, zwischen Schaden, Reparatur und Abschalten zu entscheiden.",
    mechanics: ["Bohrarme erzeugen rotierende Safe-Lanes", "Hack-Terminals verschieben Boss-Aggro", "Moralisches Ende: reinigen, versklaven oder zerlegen"],
    rewards: ["Crafting-Core Maschinenlitanei", "Kael-Questabschluss", "Housing: singender Reaktorschrein"],
    tags: [{ label: "Dungeon Boss", tone: "danger" }, { label: "Moral Choice", tone: "story" }, { label: "Crafting" }],
    implementationNotes: "Gut fuer Boss-State-Machine mit drei Endausgaengen und unterschiedlicher Drop-Tabelle."
  },
  {
    id: "loot_mondglas_zuender",
    category: "loot",
    name: "Mondglas-Zuender",
    subtitle: "Seltener Vehicle-Mod",
    region: "Alle Nachtflut-Zonen",
    summary: "Ein kleiner Splitter, der Nitro nicht schneller, sondern gefaehrlicher macht: Jeder Boost laesst ein kurzes Echo des Fahrzeugs zurueck.",
    mechanics: ["Nach Boost entsteht ein Echo-Trail mit 35% Waffenschaden", "Echo zaehlt als zweiter Treffer fuer Markierungsbuilds", "Ueberhitzt bei drei Boosts in fuenf Sekunden"],
    rewards: ["Dropchance: 2.5% aus Nachtflut-Elites", "Pity: garantiert nach 30 Elite-Kills", "Crafting: 8 Scherbenglimm + 2 Laternenfunken"],
    tags: [{ label: "Rare Drop", tone: "rare" }, { label: "Vehicle" }, { label: "Echo" }],
    implementationNotes: "Als LootData-Eintrag mit deterministic pity counter speichern."
  },
  {
    id: "loot_schuldhaken",
    category: "loot",
    name: "Schuldhaken von Azhar",
    subtitle: "Tarek-Signaturrelikt",
    region: "Sonnenglasweite",
    summary: "Ein Speerhaken aus Vertragsglas. Je hoeher das Risiko eines aktiven Bounties, desto staerker zieht der Haken Gegner und Belohnungen an.",
    mechanics: ["+12% Schaden pro aktivem Bounty", "Pull-Effekt auf geschwaechte Elites", "Bei Tod: verliert Bonus bis naechste Extraktion"],
    rewards: ["Drop aus Quest Der Preis des Salzes", "Alternative: Rufhaendler Karawanenhaus Stufe 4"],
    tags: [{ label: "Signature", tone: "rare" }, { label: "Risk Reward" }, { label: "Bounty" }],
    implementationNotes: "Verzahnt mit vorhandenen BOUNTIES und RunOutcome-Logik."
  },
  {
    id: "combo_lyra_mira_splitterurteil",
    category: "combo",
    name: "Splitterurteil",
    subtitle: "Lyra + Mira Koop-Technik",
    region: "Alle Regionen",
    summary: "Mira fixiert eine Archivrune auf einem markierten Ziel; Lyra schiesst durch die Rune und teilt den Treffer auf alle Gegner, die dieselbe Erinnerungsspur tragen.",
    mechanics: ["Braucht Mark + Exposed innerhalb von 4s", "Verteilt 60% Crit-Schaden auf bis zu 8 Ziele", "Bossvariante: bricht eine Schildschicht statt AoE"],
    rewards: ["Bindungslevel Lyra/Mira 3", "Achievement: Wahrheit tut weh"],
    tags: [{ label: "Coop Combo", tone: "system" }, { label: "Mark" }, { label: "Exposed" }],
    implementationNotes: "Combo-Resolver prueft Status-Tags und feuert CombatEvent combo_activated."
  },
  {
    id: "combo_marek_tarek_konvoiamboss",
    category: "combo",
    name: "Konvoiamboss",
    subtitle: "Marek + Tarek Vehicle-Kombo",
    region: "Sonnenglasweite / Dunkelgrund",
    summary: "Tarek lockt Gegner in eine Karawanenlinie, Marek magnetisiert Schrott und presst alles in einen rollenden Amboss.",
    mechanics: ["Tareks Koeder setzt Bait", "Mareks Magnetfeld konsumiert Bait fuer Pull + Stun", "Konvoi-Fracht erleidet 50% weniger Schaden waehrend der Kombo"],
    rewards: ["Freischaltung durch Konvoi durch die Glassenke S-Rang", "Vehicle-Mod: Karawanenplatte"],
    tags: [{ label: "Vehicle Combo", tone: "system" }, { label: "Escort" }, { label: "Crowd Control" }],
    implementationNotes: "Direkt fuer Escort-Prototyp wertvoll, da die Kombo Schutz statt nur DPS liefert."
  },
  {
    id: "quest_garten_namen_friss",
    category: "quest",
    name: "Ein Garten, der Namen frisst",
    subtitle: "Wurzelwald-Nebenquest mit starkem Nachhall",
    region: "Wurzelwald Nhal",
    summary: "Ein Dorf erinnert sich an die Liebe zu einem Kind, aber nicht an seinen Namen. Spieler entscheiden, ob Namen verbrannt, besungen oder konserviert werden.",
    mechanics: ["Detektiv-Quest ohne Pflichtkampf", "Entscheidung veraendert NPC-Anreden", "Siofra und Neris bekommen alternative Bindungsdialoge"],
    rewards: ["Harzsalbe-Rezept", "Housing-Gartenplot", "Flag: namen_kind_entscheidung"],
    tags: [{ label: "Side Quest", tone: "story" }, { label: "Choice" }, { label: "Housing" }],
    implementationNotes: "Als Questflag-Demo sehr gut geeignet: drei Enden, drei kleine World-State-Texte."
  },
  {
    id: "event_damm_bricht",
    category: "event",
    name: "Der Damm bricht",
    subtitle: "Graumarsch-Metaevent",
    region: "Graumarsch",
    summary: "Nachtflut drueckt gegen alte Torfdaemme. Spieler reparieren Laternen, eskortieren Dorfbewohner, kaempfen gegen Wassergeister und entscheiden, welches Viertel zuerst gerettet wird.",
    mechanics: ["Oeffentliches Event mit Sieg/Niederlage", "Repair-, Escort- und Combat-Ziele parallel", "World-State: Markt offen, ueberflutet oder Trauerdock"],
    rewards: ["Laternenfunken", "Moorlaeufer-Mods", "Fackelruh-Ruf"],
    tags: [{ label: "Meta Event", tone: "system" }, { label: "World State" }, { label: "Public Coop" }],
    implementationNotes: "Prototypierbar mit Timer, drei Objective-Balken und Ergebnisbanner."
  }
]

export const CONTENT_CATEGORY_LABELS: Record<ContentCategory, string> = {
  character: "Charaktere",
  vehicle: "Vehicle Combat",
  boss: "Bosse",
  loot: "Loot & Drops",
  combo: "Multiplayer-Kombos",
  quest: "Quests",
  event: "World Events",
}

export function getContentStats() {
  return SCHERBENHIMMEL_CONTENT.reduce<Record<ContentCategory, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1
    return acc
  }, {
    character: 0,
    vehicle: 0,
    boss: 0,
    loot: 0,
    combo: 0,
    quest: 0,
    event: 0,
  })
}
