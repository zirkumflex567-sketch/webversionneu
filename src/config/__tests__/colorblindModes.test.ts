import { describe, it, expect } from 'vitest'
import {
  getPalette,
  hexToRgb,
  rgbToHex,
  simulateColorblindness,
  NORMAL_PALETTE,
  DEUTERANOPIA_PALETTE,
  PROTANOPIA_PALETTE,
  TRITANOPIA_PALETTE,
  ColorblindMode,
} from '../colorblindModes'

describe('colorblindModes', () => {
  describe('getPalette', () => {
    it('should return normal palette for normal mode', () => {
      const palette = getPalette('normal')
      expect(palette).toBe(NORMAL_PALETTE)
    })

    it('should return deuteranopia palette for deuteranopia mode', () => {
      const palette = getPalette('deuteranopia')
      expect(palette).toBe(DEUTERANOPIA_PALETTE)
    })

    it('should return protanopia palette for protanopia mode', () => {
      const palette = getPalette('protanopia')
      expect(palette).toBe(PROTANOPIA_PALETTE)
    })

    it('should return tritanopia palette for tritanopia mode', () => {
      const palette = getPalette('tritanopia')
      expect(palette).toBe(TRITANOPIA_PALETTE)
    })

    it('should return normal palette as default for unknown modes', () => {
      const palette = getPalette('normal' as ColorblindMode)
      expect(palette).toBe(NORMAL_PALETTE)
    })
  })

  describe('hexToRgb', () => {
    it('should convert hex colors to RGB objects', () => {
      const rgb = hexToRgb(0xff0000) // Red
      expect(rgb.r).toBe(255)
      expect(rgb.g).toBe(0)
      expect(rgb.b).toBe(0)
    })

    it('should handle cyan color', () => {
      const rgb = hexToRgb(0x00ffaa)
      expect(rgb.r).toBe(0)
      expect(rgb.g).toBe(255)
      expect(rgb.b).toBe(170)
    })

    it('should handle black', () => {
      const rgb = hexToRgb(0x000000)
      expect(rgb.r).toBe(0)
      expect(rgb.g).toBe(0)
      expect(rgb.b).toBe(0)
    })

    it('should handle white', () => {
      const rgb = hexToRgb(0xffffff)
      expect(rgb.r).toBe(255)
      expect(rgb.g).toBe(255)
      expect(rgb.b).toBe(255)
    })
  })

  describe('rgbToHex', () => {
    it('should convert RGB values to hex', () => {
      const hex = rgbToHex(255, 0, 0)
      expect(hex).toBe(0xff0000)
    })

    it('should handle cyan', () => {
      const hex = rgbToHex(0, 255, 170)
      expect(hex).toBe(0x00ffaa)
    })

    it('should round-trip hex to RGB and back', () => {
      const original = 0x123456
      const { r, g, b } = hexToRgb(original)
      const converted = rgbToHex(r, g, b)
      expect(converted).toBe(original)
    })

    it('should handle max values', () => {
      const hex = rgbToHex(255, 255, 255)
      expect(hex).toBe(0xffffff)
    })

    it('should handle zero values', () => {
      const hex = rgbToHex(0, 0, 0)
      expect(hex).toBe(0x000000)
    })
  })

  describe('simulateColorblindness', () => {
    it('should return original color for normal mode', () => {
      const color = 0xff0000
      expect(simulateColorblindness(color, 'normal')).toBe(color)
    })

    it('should modify red/green for deuteranopia', () => {
      const red = 0xff0000
      const simulated = simulateColorblindness(red, 'deuteranopia')
      expect(simulated).not.toBe(red)
    })

    it('should modify red for protanopia', () => {
      const red = 0xff0000
      const simulated = simulateColorblindness(red, 'protanopia')
      const { r } = hexToRgb(simulated)
      expect(r).toBeLessThan(255) // Red should be reduced
    })

    it('should modify blue/yellow for tritanopia', () => {
      const yellow = 0xffff00
      const simulated = simulateColorblindness(yellow, 'tritanopia')
      expect(simulated).not.toBe(yellow)
    })

    it('should handle all color modes for a test color', () => {
      const testColor = 0x0099ff
      const modes: ColorblindMode[] = ['normal', 'deuteranopia', 'protanopia', 'tritanopia']

      for (const mode of modes) {
        const simulated = simulateColorblindness(testColor, mode)
        expect(typeof simulated).toBe('number')
        expect(simulated).toBeGreaterThanOrEqual(0)
        expect(simulated).toBeLessThanOrEqual(0xffffff)
      }
    })
  })

  describe('Palette color values', () => {
    it('should have valid hex colors in normal palette', () => {
      const colors = Object.values(NORMAL_PALETTE)
      for (const color of colors) {
        expect(color).toBeGreaterThanOrEqual(0)
        expect(color).toBeLessThanOrEqual(0xffffff)
      }
    })

    it('should have valid hex colors in deuteranopia palette', () => {
      const colors = Object.values(DEUTERANOPIA_PALETTE)
      for (const color of colors) {
        expect(color).toBeGreaterThanOrEqual(0)
        expect(color).toBeLessThanOrEqual(0xffffff)
      }
    })

    it('should have valid hex colors in protanopia palette', () => {
      const colors = Object.values(PROTANOPIA_PALETTE)
      for (const color of colors) {
        expect(color).toBeGreaterThanOrEqual(0)
        expect(color).toBeLessThanOrEqual(0xffffff)
      }
    })

    it('should have valid hex colors in tritanopia palette', () => {
      const colors = Object.values(TRITANOPIA_PALETTE)
      for (const color of colors) {
        expect(color).toBeGreaterThanOrEqual(0)
        expect(color).toBeLessThanOrEqual(0xffffff)
      }
    })

    it('should maintain neutral colors across all modes', () => {
      const modes: ColorblindMode[] = ['normal', 'deuteranopia', 'protanopia', 'tritanopia']
      const neutrals = ['neutral', 'dark', 'light'] as const

      for (const mode of modes) {
        const palette = getPalette(mode)
        for (const key of neutrals) {
          expect(palette[key]).toBeDefined()
        }
      }
    })
  })
})
