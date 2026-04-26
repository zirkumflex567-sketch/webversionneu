/**
 * Housing System Data
 * Garage furniture and customization items for player cosmetics.
 *
 * Player-facing labels live in src/i18n/index.ts. Data keeps stable keys only.
 */
import type { TranslationKey } from "../i18n"

export interface FurnitureItem {
  id: string
  nameKey: TranslationKey
  descriptionKey: TranslationKey
  category: "seating" | "decor" | "lighting" | "tech" | "storage"
  scrapCost: number
  techCost: number
  icon: string
  width: number
  height: number
  color?: number
}

export interface PlacedFurniture {
  id: string
  furnitureId: string
  x: number
  y: number
  rotation: number
}

export const FURNITURE_CATALOG: FurnitureItem[] = [
  {
    id: "seat_chrome",
    nameKey: "housing.item.seat_chrome.name",
    descriptionKey: "housing.item.seat_chrome.description",
    category: "seating",
    scrapCost: 250,
    techCost: 15,
    icon: "",
    width: 1,
    height: 1,
    color: 0xcccccc,
  },
  {
    id: "seat_wasteland",
    nameKey: "housing.item.seat_wasteland.name",
    descriptionKey: "housing.item.seat_wasteland.description",
    category: "seating",
    scrapCost: 100,
    techCost: 5,
    icon: "",
    width: 2,
    height: 1,
    color: 0x664422,
  },
  {
    id: "light_neon_cyan",
    nameKey: "housing.item.light_neon_cyan.name",
    descriptionKey: "housing.item.light_neon_cyan.description",
    category: "lighting",
    scrapCost: 150,
    techCost: 10,
    icon: "",
    width: 1,
    height: 1,
    color: 0x00ffaa,
  },
  {
    id: "light_neon_red",
    nameKey: "housing.item.light_neon_red.name",
    descriptionKey: "housing.item.light_neon_red.description",
    category: "lighting",
    scrapCost: 150,
    techCost: 10,
    icon: "",
    width: 1,
    height: 1,
    color: 0xff0000,
  },
  {
    id: "decor_vehicle_chassis",
    nameKey: "housing.item.decor_vehicle_chassis.name",
    descriptionKey: "housing.item.decor_vehicle_chassis.description",
    category: "decor",
    scrapCost: 300,
    techCost: 20,
    icon: "",
    width: 2,
    height: 2,
    color: 0x333333,
  },
  {
    id: "decor_weapons_rack",
    nameKey: "housing.item.decor_weapons_rack.name",
    descriptionKey: "housing.item.decor_weapons_rack.description",
    category: "decor",
    scrapCost: 200,
    techCost: 12,
    icon: "",
    width: 1,
    height: 2,
    color: 0x666666,
  },
  {
    id: "decor_tech_billboard",
    nameKey: "housing.item.decor_tech_billboard.name",
    descriptionKey: "housing.item.decor_tech_billboard.description",
    category: "decor",
    scrapCost: 400,
    techCost: 30,
    icon: "",
    width: 2,
    height: 1,
    color: 0x0099ff,
  },
  {
    id: "storage_locker",
    nameKey: "housing.item.storage_locker.name",
    descriptionKey: "housing.item.storage_locker.description",
    category: "storage",
    scrapCost: 180,
    techCost: 8,
    icon: "",
    width: 1,
    height: 1,
    color: 0x444444,
  },
  {
    id: "storage_shelving",
    nameKey: "housing.item.storage_shelving.name",
    descriptionKey: "housing.item.storage_shelving.description",
    category: "storage",
    scrapCost: 250,
    techCost: 12,
    icon: "",
    width: 1,
    height: 2,
    color: 0x555555,
  },
  {
    id: "tech_server_tower",
    nameKey: "housing.item.tech_server_tower.name",
    descriptionKey: "housing.item.tech_server_tower.description",
    category: "tech",
    scrapCost: 500,
    techCost: 40,
    icon: "SRV",
    width: 1,
    height: 2,
    color: 0x00ff00,
  },
  {
    id: "tech_workbench",
    nameKey: "housing.item.tech_workbench.name",
    descriptionKey: "housing.item.tech_workbench.description",
    category: "tech",
    scrapCost: 350,
    techCost: 25,
    icon: "GEAR",
    width: 2,
    height: 1,
    color: 0xff9900,
  },
]

export function getDefaultHousing(): PlacedFurniture[] {
  return [
    { id: "1", furnitureId: "seat_chrome", x: 1, y: 1, rotation: 0 },
    { id: "2", furnitureId: "light_neon_cyan", x: 0, y: 0, rotation: 0 },
    { id: "3", furnitureId: "storage_locker", x: 3, y: 0, rotation: 0 },
  ]
}

export const HOUSING_GRID = {
  width: 6,
  height: 5,
  cellSize: 80,
}
