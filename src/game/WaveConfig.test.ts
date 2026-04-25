import { describe, it, expect } from 'vitest'
import { getWaveConfig, WAVE_CONFIGS } from './WaveConfig'

describe('WaveConfig', () => {
  it('returns correct config for wave 1', () => {
    const c = getWaveConfig(1)
    expect(c.waveIndex).toBe(1)
    expect(c.heavyRatio).toBe(0)
  })

  it('heavyRatio increases with wave number', () => {
    const w2 = getWaveConfig(2)
    const w3 = getWaveConfig(3)
    const w4 = getWaveConfig(4)
    expect(w3.heavyRatio).toBeGreaterThan(w2.heavyRatio)
    expect(w4.heavyRatio).toBeGreaterThan(w3.heavyRatio)
  })

  it('extrapolates beyond defined waves', () => {
    const w10 = getWaveConfig(10)
    expect(w10.waveIndex).toBe(10)
    expect(w10.enemiesToSpawn).toBeGreaterThan(WAVE_CONFIGS[WAVE_CONFIGS.length - 1].enemiesToSpawn)
    expect(w10.heavyRatio).toBeGreaterThan(0)
  })

  it('caps heavy ratio at 0.5 for high waves', () => {
    const w100 = getWaveConfig(100)
    expect(w100.heavyRatio).toBeLessThanOrEqual(0.5)
  })

  it('spawn interval never goes below 0.2', () => {
    const w50 = getWaveConfig(50)
    expect(w50.spawnInterval).toBeGreaterThanOrEqual(0.2)
  })
})
