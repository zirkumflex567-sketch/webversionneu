import type { TranslationKey } from "../i18n"

export type AreaProgressState = "locked" | "active_quest" | "cleared_free_run"
export type AreaMode = "story" | "side" | "companion" | "bounty" | "free_run"

export interface AreaDefinition {
  id: string
  biome: "wasteland" | "glass" | "forest"
  mapX: number
  mapY: number
  color: string
  threat: "low" | "medium" | "high"
  nameKey: TranslationKey
  descriptionKey: TranslationKey
  state: AreaProgressState
  availableModesWhenCleared: AreaMode[]
  stateLabelKey: TranslationKey
}

export function getAvailableAreaModes(state: AreaProgressState, availableModesWhenCleared: AreaMode[]): AreaMode[] {
  switch (state) {
    case "locked":
      return []
    case "active_quest":
      return ["story", "side", "companion"]
    case "cleared_free_run":
      return availableModesWhenCleared
    default:
      return []
  }
}

export const AREA_DEFINITIONS: AreaDefinition[] = [
  {
    id: "graumarsch",
    biome: "wasteland",
    mapX: 42,
    mapY: 46,
    color: "#00ffaa",
    threat: "medium",
    nameKey: "area.graumarsch.name",
    descriptionKey: "area.graumarsch.description",
    state: "active_quest",
    availableModesWhenCleared: ["story", "side", "companion", "bounty", "free_run"],
    stateLabelKey: "ui.map.state.active_quest",
  },
  {
    id: "sonnenglasweite",
    biome: "glass",
    mapX: 70,
    mapY: 34,
    color: "#e9c46a",
    threat: "high",
    nameKey: "area.sonnenglasweite.name",
    descriptionKey: "area.sonnenglasweite.description",
    state: "locked",
    availableModesWhenCleared: ["story", "side", "companion", "bounty", "free_run"],
    stateLabelKey: "ui.map.state.locked",
  },
  {
    id: "wurzelwald-nhal",
    biome: "forest",
    mapX: 24,
    mapY: 62,
    color: "#4caf50",
    threat: "high",
    nameKey: "area.wurzelwald.name",
    descriptionKey: "area.wurzelwald.description",
    state: "locked",
    availableModesWhenCleared: ["story", "side", "companion", "bounty", "free_run"],
    stateLabelKey: "ui.map.state.locked",
  },
  {
    id: "graumarsch-chemiefabrik",
    biome: "wasteland",
    mapX: 53,
    mapY: 52,
    color: "#6cf0ff",
    threat: "high",
    nameKey: "area.graumarsch_chemiefabrik.name",
    descriptionKey: "area.graumarsch_chemiefabrik.description",
    state: "active_quest",
    availableModesWhenCleared: ["story", "side", "bounty", "free_run"],
    stateLabelKey: "ui.map.state.active_quest",
  },
]
