import type { TranslationKey } from "../i18n"

export interface AreaDefinition {
  id: string
  biome: "wasteland" | "glass" | "forest"
  mapX: number
  mapY: number
  color: string
  threat: "low" | "medium" | "high"
  nameKey: TranslationKey
  descriptionKey: TranslationKey
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
  },
]
