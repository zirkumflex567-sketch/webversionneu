import { BossDefinition } from "./schema";

export const BOSSES: BossDefinition[] = [
  {
    id: "boss_nasser_faehnrich",
    name: "Der Nasse Fähnrich",
    title: "Gefallener Laternenoffizier",
    description: "Ein gefallener Laternenoffizier, dessen Banner noch immer Befehle an Tote gibt.",
    region: "Graumarsch",
    phases: [
      { id: "p1", name: "Muster lesen", hpThreshold: 1.0, abilities: ["Bannermarken"], description: "Spieler lernen das Hauptmuster." },
      { id: "p2", name: "Bruch", hpThreshold: 0.65, abilities: ["Risslinien"], description: "Die Arena verändert sich." },
      { id: "p3", name: "Entscheidung", hpThreshold: 0.3, abilities: ["Rettungswahl"], description: "Risiko oder Rettung eines NPCs." },
    ],
    dropTableId: "dt_boss_nasser_faehnrich",
  },
  {
    id: "boss_laternenwurm_mutter",
    name: "Mutter der Laternenwürmer",
    title: "Brutkönigin des Sumpfes",
    description: "Eine Brutkönigin, die Laternenlicht frisst und in blinde Wärme verwandelt.",
    region: "Graumarsch",
    phases: [
      { id: "p1", name: "Lichtfrass", hpThreshold: 1.0, abilities: ["Wurmruf"], description: "Beschwört Adds." },
    ],
    dropTableId: "dt_boss_laternenwurm_mutter",
  },
  {
    id: "boss_noret",
    name: "Noret",
    title: "Schuldbuchhalter aus Glas",
    description: "Ein Mensch, der seine Schuld in Verträge ausgelagert hat; jeder Treffer ist eine Klausel.",
    region: "Sonnenglasweite",
    phases: [
      { id: "p1", name: "Vertragsprüfung", hpThreshold: 1.0, abilities: ["Schuldscheine"], description: "Zwanghafter Handel." },
    ],
    dropTableId: "dt_boss_noret",
  },
  {
    id: "boss_namenloser_garten",
    name: "Der Namenlose Garten",
    title: "Echo des Vergessens",
    description: "Kein einzelnes Monster, sondern ein Ort, der dich aus den Köpfen deiner Freunde schneidet.",
    region: "Wurzelwald Nhal",
    phases: [
      { id: "p1", name: "Namensraub", hpThreshold: 1.0, abilities: ["Vergessen"], description: "UI-Verzerrungen." },
    ],
    dropTableId: "dt_boss_namenloser_garten",
  },
  {
    id: "boss_tiefenglocke",
    name: "Malrec und die Tiefenglocke",
    title: "Prediger des Abgrunds",
    description: "Prediger, Sturmmaschine und Leviathan-Ableger in einem Hafenkrieg.",
    region: "Eisenbrandküste",
    phases: [
      { id: "p1", name: "Glockenradius", hpThreshold: 1.0, abilities: ["Schallwelle"], description: "Periodische Ringe." },
    ],
    dropTableId: "dt_boss_tiefenglocke",
  },
  {
    id: "boss_falkenlinie",
    name: "Fall der Falkenlinie",
    title: "Duell der Ehre",
    description: "Ein Duell gegen ein Haus, nicht nur gegen einen Ritter: Banner, Schützen, Falken und Eidmagie.",
    region: "Hochkamm der Eidwacht",
    phases: [
      { id: "p1", name: "Eidketten", hpThreshold: 1.0, abilities: ["Falkenflug"], description: "Haus-Wachen unterstützen." },
    ],
    dropTableId: "dt_boss_falkenlinie",
  },
  {
    id: "boss_sankt_ival",
    name: "Sankt Ival, Maschinenheiliger",
    title: "Sortierer der Defekten",
    description: "Eine alte Reparaturmaschine, die Menschen wie defekte Bauteile sortiert.",
    region: "Dunkelgrund",
    phases: [
      { id: "p1", name: "Arbeitsbefehl", hpThreshold: 1.0, abilities: ["Heben", "Knien"], description: "Spieler müssen Befehlen folgen." },
    ],
    dropTableId: "dt_boss_sankt_ival",
  },
  {
    id: "boss_sereth_hand",
    name: "Sereths Hand",
    title: "Die Gläserne Regentin",
    description: "Ein Avatar des Leeren Archivs, gebaut aus den Entscheidungen, die Spieler bisher getroffen haben.",
    region: "Scherbenkrone",
    phases: [
      { id: "p1", name: "Entscheidungs-Spiegel", hpThreshold: 1.0, abilities: ["Archivstrahlen"], description: "Spiegelt frühere Quests." },
    ],
    dropTableId: "dt_boss_sereth_hand",
  },
  {
    id: "boss_schrottkoenig",
    name: "Der Schrottkönig von Rußmarkt",
    title: "Arena-Champion",
    description: "Ein illegaler Arena-Champion, dessen Fahrzeug aus verlorenen Questbelohnungen gebaut ist.",
    region: "Dunkelgrund",
    phases: [
      { id: "p1", name: "Arena-Kampf", hpThreshold: 1.0, abilities: ["Schrottramme"], description: "Harter Nahkampf." },
    ],
    dropTableId: "dt_boss_schrottkoenig",
  },
  {
    id: "boss_glassrochen_alpha",
    name: "Glasrochen Alpha",
    title: "Wilder Rissläufer",
    description: "Ein halbwilder Rissrochen, den man nicht tötet, sondern durch perfektes Fahren zähmt.",
    region: "Sonnenglasweite",
    phases: [
      { id: "p1", name: "Zähmung", hpThreshold: 1.0, abilities: ["Glasdrift"], description: "Fahrzeug-Prüfung." },
    ],
    dropTableId: "dt_boss_glassrochen_alpha",
  },
];
