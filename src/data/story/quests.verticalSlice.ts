import type { Quest } from "../../game/StoryTypes"

export const VERTICAL_SLICE_QUESTS: Quest[] = [
  {
    id: "SQ-GM-01",
    title: "Chemischer Morgen",
    description: "Sichere die Filterspulen der Chemiefabrik und extrahiere mit den Datenkernen.",
    region: "Graumarsch",
    type: "side",
    giver: "Mara Esch",
    requirements: ["MQ-05"],
    rewards: [
      { type: "unlock", value: "sq_graumarsch_chemfog_complete", description: "Questflag" },
      { type: "scrap", value: 300, description: "Abschlussbelohnung" },
      { type: "tech", value: 2, description: "Nur bei Extraktion" },
    ],
    objectives: [
      { id: "collect_spools", description: "3 Filterspulen sichern", isCompleted: false },
      { id: "extract_payload", description: "Mit Nutzlast extrahieren", isCompleted: false },
    ],
    status: "locked",
  },
  {
    id: "CQ-EDDA-01",
    title: "Funken unter Schnee",
    description: "Begleite Edda durch das alte Umspannwerk und stabilisiere den Kern.",
    region: "Hochkamm",
    type: "companion",
    giver: "Edda Falkenlicht",
    requirements: ["MQ-15"],
    rewards: [
      { type: "unlock", value: "char_edda_overdrive_node_1", description: "Tech-Lab Knoten" },
      { type: "reputation", value: 1, description: "Falkenlicht-Vertrauen" },
    ],
    objectives: [
      { id: "escort_edda", description: "Edda bis zur Schaltkammer eskortieren", isCompleted: false },
      { id: "stabilize_core", description: "Stromkern stabilisieren", isCompleted: false },
    ],
    status: "locked",
  },
]
