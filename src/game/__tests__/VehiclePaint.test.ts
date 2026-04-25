import { describe, it, expect } from 'vitest'
import { getPaintFinish } from '../../config/CelShadingConfig'

describe('VehiclePaint', () => {
  it('should apply chrome finish with high gloss', () => {
    const chrome = getPaintFinish('chrome')
    expect(chrome.gloss).toBe(1.0)
    expect(chrome.metalness).toBe(1.0)
  })

  it('should apply matte finish with low gloss', () => {
    const matte = getPaintFinish('matte')
    expect(matte.gloss).toBeLessThan(0.3)
  })

  it('should apply metallic finish with moderate properties', () => {
    const metallic = getPaintFinish('metallic')
    expect(metallic.gloss).toBeGreaterThan(0.5)
    expect(metallic.metalness).toBeGreaterThan(0.5)
  })
})
