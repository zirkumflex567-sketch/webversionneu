/**
 * Colorblind-friendly palette system
 * Provides color schemes optimized for different types of color blindness
 */

export type ColorblindMode = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia'

interface ColorPalette {
  primary: number      // Main accent color (cyan/teal)
  secondary: number    // Secondary accent (red/orange)
  success: number      // Positive feedback (green)
  danger: number       // Warning/danger (red)
  warning: number      // Caution (yellow/orange)
  neutral: number      // Neutral UI (gray/white)
  dark: number         // Dark background
  light: number        // Light text
}

/**
 * Normal color vision palette
 * Standard RGB colors optimized for typical vision
 */
export const NORMAL_PALETTE: ColorPalette = {
  primary: 0x00ffaa,   // Cyan (H-Town signature)
  secondary: 0xff00ff, // Magenta
  success: 0x00ff00,   // Green
  danger: 0xff0000,    // Red
  warning: 0xffaa00,   // Orange
  neutral: 0xcccccc,   // Light gray
  dark: 0x0a0a0a,      // Near black
  light: 0xffffff,     // White
}

/**
 * Deuteranopia palette (Red-Green, ~1% of males)
 * Difficulty distinguishing red and green
 * Uses blue/yellow contrast instead
 */
export const DEUTERANOPIA_PALETTE: ColorPalette = {
  primary: 0x0099cc,   // Blue (instead of cyan)
  secondary: 0xffcc00, // Yellow (instead of magenta)
  success: 0x0099cc,   // Blue (was green)
  danger: 0xffcc00,    // Yellow (was red)
  warning: 0xff6600,   // Orange-brown (was orange)
  neutral: 0xcccccc,   // Light gray (unchanged)
  dark: 0x0a0a0a,      // Near black (unchanged)
  light: 0xffffff,     // White (unchanged)
}

/**
 * Protanopia palette (Red-Green, ~0.5% of males)
 * Difficulty seeing red tones
 * Uses blue/yellow with increased saturation
 */
export const PROTANOPIA_PALETTE: ColorPalette = {
  primary: 0x0099ff,   // Bright blue
  secondary: 0xffff00, // Pure yellow
  success: 0x0099ff,   // Blue (was green)
  danger: 0xffff00,    // Yellow (was red)
  warning: 0xff9900,   // Orange (was red-orange)
  neutral: 0xcccccc,   // Light gray (unchanged)
  dark: 0x0a0a0a,      // Near black (unchanged)
  light: 0xffffff,     // White (unchanged)
}

/**
 * Tritanopia palette (Blue-Yellow, ~0.001% population, rare)
 * Difficulty distinguishing blue and yellow
 * Uses red/cyan contrast
 */
export const TRITANOPIA_PALETTE: ColorPalette = {
  primary: 0xff0099,   // Magenta-red (instead of cyan)
  secondary: 0x00ffff, // Cyan (instead of magenta)
  success: 0x00ffff,   // Cyan (was green)
  danger: 0xff0099,    // Red-magenta (was red)
  warning: 0xff6600,   // Orange (was yellow-orange)
  neutral: 0xcccccc,   // Light gray (unchanged)
  dark: 0x0a0a0a,      // Near black (unchanged)
  light: 0xffffff,     // White (unchanged)
}

/**
 * Get palette for a given colorblind mode
 */
export function getPalette(mode: ColorblindMode): ColorPalette {
  switch (mode) {
    case 'deuteranopia':
      return DEUTERANOPIA_PALETTE
    case 'protanopia':
      return PROTANOPIA_PALETTE
    case 'tritanopia':
      return TRITANOPIA_PALETTE
    case 'normal':
    default:
      return NORMAL_PALETTE
  }
}

/**
 * Convert hex color to RGB object for easier manipulation
 */
export function hexToRgb(hex: number): { r: number; g: number; b: number } {
  return {
    r: (hex >> 16) & 255,
    g: (hex >> 8) & 255,
    b: hex & 255,
  }
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b
}

/**
 * Simulate colorblind vision on a given hex color
 * This is approximate and for testing purposes
 */
export function simulateColorblindness(hex: number, mode: ColorblindMode): number {
  if (mode === 'normal') return hex

  const { r, g, b } = hexToRgb(hex)

  switch (mode) {
    case 'deuteranopia': {
      // Simplified: average red and green
      const avg = Math.round((r + g) / 2)
      return rgbToHex(avg, avg, b)
    }
    case 'protanopia': {
      // Simplified: reduce red channel
      const newR = Math.round(r * 0.5)
      return rgbToHex(newR, g, b)
    }
    case 'tritanopia': {
      // Simplified: shift blue/yellow
      const avg = Math.round((b + g) / 2)
      return rgbToHex(r, avg, avg)
    }
    default:
      return hex
  }
}
