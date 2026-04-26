import { describe, it, expect } from 'vitest'
import {
  FURNITURE_CATALOG,
  HOUSING_GRID,
  getDefaultHousing,
  type FurnitureItem,
  type PlacedFurniture,
} from '../HousingData'

describe('HousingData', () => {
  describe('FURNITURE_CATALOG', () => {
    it('should have furniture items', () => {
      expect(FURNITURE_CATALOG.length).toBeGreaterThan(0)
    })

    it('should have all required properties on furniture items', () => {
      for (const item of FURNITURE_CATALOG) {
        expect(item.id).toBeDefined()
        expect(item.nameKey).toBeDefined()
        expect(item.descriptionKey).toBeDefined()
        expect(item.category).toBeDefined()
        expect(item.scrapCost).toBeGreaterThan(0)
        expect(item.techCost).toBeGreaterThanOrEqual(0)
        expect(item.icon).toBeDefined()
        expect(item.width).toBeGreaterThan(0)
        expect(item.height).toBeGreaterThan(0)
      }
    })

    it('should have valid categories', () => {
      const validCategories = ['seating', 'decor', 'lighting', 'tech', 'storage']
      for (const item of FURNITURE_CATALOG) {
        expect(validCategories).toContain(item.category)
      }
    })

    it('should have unique item IDs', () => {
      const ids = FURNITURE_CATALOG.map(f => f.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have reasonable grid dimensions', () => {
      for (const item of FURNITURE_CATALOG) {
        expect(item.width).toBeLessThanOrEqual(HOUSING_GRID.width)
        expect(item.height).toBeLessThanOrEqual(HOUSING_GRID.height)
      }
    })

    it('should have different categories', () => {
      const categories = new Set(FURNITURE_CATALOG.map(f => f.category))
      expect(categories.size).toBeGreaterThan(1)
    })

    it('should have reasonable cost ranges', () => {
      for (const item of FURNITURE_CATALOG) {
        expect(item.scrapCost).toBeGreaterThanOrEqual(50)
        expect(item.scrapCost).toBeLessThanOrEqual(5000)
        expect(item.techCost).toBeGreaterThanOrEqual(0)
        expect(item.techCost).toBeLessThanOrEqual(500)
      }
    })
  })

  describe('HOUSING_GRID', () => {
    it('should have valid grid dimensions', () => {
      expect(HOUSING_GRID.width).toBeGreaterThan(0)
      expect(HOUSING_GRID.height).toBeGreaterThan(0)
      expect(HOUSING_GRID.cellSize).toBeGreaterThan(0)
    })

    it('should have reasonable cell size', () => {
      expect(HOUSING_GRID.cellSize).toBeGreaterThanOrEqual(50)
      expect(HOUSING_GRID.cellSize).toBeLessThanOrEqual(200)
    })

    it('should support minimum furniture placement', () => {
      const minFurniture = FURNITURE_CATALOG.reduce((min, f) =>
        f.width <= min.width && f.height <= min.height ? f : min
      )
      expect(minFurniture.width).toBeLessThanOrEqual(HOUSING_GRID.width)
      expect(minFurniture.height).toBeLessThanOrEqual(HOUSING_GRID.height)
    })
  })

  describe('getDefaultHousing', () => {
    it('should return an array of placed furniture', () => {
      const housing = getDefaultHousing()
      expect(Array.isArray(housing)).toBe(true)
    })

    it('should have valid placed furniture items', () => {
      const housing = getDefaultHousing()
      for (const placed of housing) {
        expect(placed.id).toBeDefined()
        expect(placed.furnitureId).toBeDefined()
        expect(typeof placed.x).toBe('number')
        expect(typeof placed.y).toBe('number')
        expect(typeof placed.rotation).toBe('number')
      }
    })

    it('should reference valid furniture catalog items', () => {
      const housing = getDefaultHousing()
      const catalogIds = new Set(FURNITURE_CATALOG.map(f => f.id))
      for (const placed of housing) {
        expect(catalogIds.has(placed.furnitureId)).toBe(true)
      }
    })

    it('should place furniture within grid bounds', () => {
      const housing = getDefaultHousing()
      for (const placed of housing) {
        const furniture = FURNITURE_CATALOG.find(f => f.id === placed.furnitureId)
        if (furniture) {
          expect(placed.x).toBeGreaterThanOrEqual(0)
          expect(placed.y).toBeGreaterThanOrEqual(0)
          expect(placed.x + furniture.width).toBeLessThanOrEqual(HOUSING_GRID.width)
          expect(placed.y + furniture.height).toBeLessThanOrEqual(HOUSING_GRID.height)
        }
      }
    })

    it('should have valid rotations', () => {
      const housing = getDefaultHousing()
      const validRotations = [0, 90, 180, 270]
      for (const placed of housing) {
        expect(validRotations).toContain(placed.rotation)
      }
    })

    it('should have unique placement IDs', () => {
      const housing = getDefaultHousing()
      const ids = housing.map(h => h.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('Furniture categories', () => {
    it('should have items in seating category', () => {
      const seating = FURNITURE_CATALOG.filter(f => f.category === 'seating')
      expect(seating.length).toBeGreaterThan(0)
    })

    it('should have items in decor category', () => {
      const decor = FURNITURE_CATALOG.filter(f => f.category === 'decor')
      expect(decor.length).toBeGreaterThan(0)
    })

    it('should have items in lighting category', () => {
      const lighting = FURNITURE_CATALOG.filter(f => f.category === 'lighting')
      expect(lighting.length).toBeGreaterThan(0)
    })

    it('should have items in tech category', () => {
      const tech = FURNITURE_CATALOG.filter(f => f.category === 'tech')
      expect(tech.length).toBeGreaterThan(0)
    })

    it('should have items in storage category', () => {
      const storage = FURNITURE_CATALOG.filter(f => f.category === 'storage')
      expect(storage.length).toBeGreaterThan(0)
    })
  })
})
