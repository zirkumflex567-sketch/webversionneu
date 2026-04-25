/**
 * Cel-shading color palettes for characters
 * Provides character-specific color schemes for cel-shading material
 */

import { Color } from 'three'

export interface CelPalette {
  baseColor: Color
  shadowColor: Color
  lightColor: Color
}

export interface PaintFinish {
  gloss: number
  metalness: number
  roughness: number
}

/**
 * Rixa's color palette (chromatic green)
 */
const RIXA_PALETTE: CelPalette = {
  baseColor: new Color(0x00ffaa),   // Chromatic green
  shadowColor: new Color(0x005544), // Dark teal
  lightColor: new Color(0xffffff),  // White
}

/**
 * Marek's color palette (industrial blue-gray)
 */
const MAREK_PALETTE: CelPalette = {
  baseColor: new Color(0x3b8bff),   // Tech blue
  shadowColor: new Color(0x1a3a66), // Dark blue
  lightColor: new Color(0xffffff),  // White
}

/**
 * Get cel-shading palette for a character ID
 * @param characterId Character identifier (e.g., 'rixa', 'marek')
 * @returns CelPalette with baseColor, shadowColor, and lightColor
 */
export function getCelPalette(characterId: string): CelPalette {
  switch (characterId) {
    case 'rixa':
      return RIXA_PALETTE
    case 'marek':
      return MAREK_PALETTE
    default:
      // Default to a neutral palette for unknown characters
      return {
        baseColor: new Color(0xcccccc),
        shadowColor: new Color(0x666666),
        lightColor: new Color(0xffffff),
      }
  }
}

/**
 * Vehicle paint finishes with different gloss, metalness, and roughness properties
 */
const PAINT_FINISHES: Record<string, PaintFinish> = {
  chrome: { gloss: 1.0, metalness: 1.0, roughness: 0.1 },
  matte: { gloss: 0.2, metalness: 0.0, roughness: 0.9 },
  metallic: { gloss: 0.7, metalness: 0.8, roughness: 0.3 },
}

/**
 * Get paint finish properties by name
 * @param finishName Paint finish name (chrome, matte, metallic)
 * @returns PaintFinish with gloss, metalness, and roughness values
 */
export function getPaintFinish(finishName: string): PaintFinish {
  return PAINT_FINISHES[finishName] || PAINT_FINISHES['matte']
}
