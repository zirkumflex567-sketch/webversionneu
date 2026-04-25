/**
 * Housing System Data
 * Garage furniture and customization items for player cosmetics
 */

export interface FurnitureItem {
  id: string
  name: string
  description: string
  category: 'seating' | 'decor' | 'lighting' | 'tech' | 'storage'
  scrapCost: number
  techCost: number
  icon: string // emoji or asset path
  width: number // grid units
  height: number // grid units
  color?: number // hex color for preview
}

export interface PlacedFurniture {
  id: string
  furnitureId: string
  x: number
  y: number
  rotation: number // 0, 90, 180, 270
}

export const FURNITURE_CATALOG: FurnitureItem[] = [
  // Seating
  {
    id: 'seat_chrome',
    name: 'Chrome Throne',
    description: 'High-tech pilot seat with servo motors',
    category: 'seating',
    scrapCost: 250,
    techCost: 15,
    icon: '🪑',
    width: 1,
    height: 1,
    color: 0xcccccc,
  },
  {
    id: 'seat_wasteland',
    name: 'Salvage Bench',
    description: 'Welded from scrap metal and worn leather',
    category: 'seating',
    scrapCost: 100,
    techCost: 5,
    icon: '🪑',
    width: 2,
    height: 1,
    color: 0x664422,
  },

  // Lighting
  {
    id: 'light_neon_cyan',
    name: 'Neon Glow (Cyan)',
    description: 'H-Town signature cyan lighting strip',
    category: 'lighting',
    scrapCost: 150,
    techCost: 10,
    icon: '💡',
    width: 1,
    height: 1,
    color: 0x00ffaa,
  },
  {
    id: 'light_neon_red',
    name: 'Neon Glow (Red)',
    description: 'Warning red neon strip for danger aesthetic',
    category: 'lighting',
    scrapCost: 150,
    techCost: 10,
    icon: '💡',
    width: 1,
    height: 1,
    color: 0xff0000,
  },

  // Decorative
  {
    id: 'decor_vehicle_chassis',
    name: 'Vehicle Chassis Wall',
    description: 'Mounted vehicle frame as wall art',
    category: 'decor',
    scrapCost: 300,
    techCost: 20,
    icon: '🚗',
    width: 2,
    height: 2,
    color: 0x333333,
  },
  {
    id: 'decor_weapons_rack',
    name: 'Weapons Rack',
    description: 'Display stand for arsenal collection',
    category: 'decor',
    scrapCost: 200,
    techCost: 12,
    icon: '🔫',
    width: 1,
    height: 2,
    color: 0x666666,
  },
  {
    id: 'decor_tech_billboard',
    name: 'Tech Billboard',
    description: 'Holographic display with cycle animations',
    category: 'decor',
    scrapCost: 400,
    techCost: 30,
    icon: '📺',
    width: 2,
    height: 1,
    color: 0x0099ff,
  },

  // Storage
  {
    id: 'storage_locker',
    name: 'Equipment Locker',
    description: 'Steel storage cabinet for supplies',
    category: 'storage',
    scrapCost: 180,
    techCost: 8,
    icon: '🔒',
    width: 1,
    height: 1,
    color: 0x444444,
  },
  {
    id: 'storage_shelving',
    name: 'Industrial Shelving',
    description: 'Multi-tier storage unit for organization',
    category: 'storage',
    scrapCost: 250,
    techCost: 12,
    icon: '📦',
    width: 1,
    height: 2,
    color: 0x555555,
  },

  // Tech
  {
    id: 'tech_server_tower',
    name: 'Server Tower',
    description: 'Processing unit with cooling systems',
    category: 'tech',
    scrapCost: 500,
    techCost: 40,
    icon: '🖥️',
    width: 1,
    height: 2,
    color: 0x00ff00,
  },
  {
    id: 'tech_workbench',
    name: 'Tech Workbench',
    description: 'Advanced maintenance and upgrade station',
    category: 'tech',
    scrapCost: 350,
    techCost: 25,
    icon: '⚙️',
    width: 2,
    height: 1,
    color: 0xff9900,
  },
]

/**
 * Default garage layout for new players
 */
export function getDefaultHousing(): PlacedFurniture[] {
  return [
    { id: '1', furnitureId: 'seat_chrome', x: 1, y: 1, rotation: 0 },
    { id: '2', furnitureId: 'light_neon_cyan', x: 0, y: 0, rotation: 0 },
    { id: '3', furnitureId: 'storage_locker', x: 3, y: 0, rotation: 0 },
  ]
}

/**
 * Garage grid dimensions
 */
export const HOUSING_GRID = {
  width: 6,
  height: 5,
  cellSize: 80, // pixels per cell in UI
}
