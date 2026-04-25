import { describe, it, expect } from 'vitest'
import { computeBankedResources } from './SaveManager'
import { defaultRunData } from './SaveSchema'

describe('computeBankedResources', () => {
  it('full scrap + tech + wave bonus on extraction', () => {
    const run = { ...defaultRunData(), scrapEarned: 200, techEarned: 10, wave: 4, outcome: 'Extracted' as const }
    const banked = computeBankedResources(run)
    expect(banked.extractionBonus).toBe(120) // 4 * 30
    expect(banked.scrap).toBe(320)           // 200 + 120
    expect(banked.tech).toBe(10)
    expect(banked.scrapLost).toBe(0)
    expect(banked.techLost).toBe(0)
  })

  it('50% scrap, no tech, no bonus on death', () => {
    const run = { ...defaultRunData(), scrapEarned: 200, techEarned: 10, wave: 4, outcome: 'Died' as const }
    const banked = computeBankedResources(run)
    expect(banked.scrap).toBe(100)
    expect(banked.tech).toBe(0)
    expect(banked.extractionBonus).toBe(0)
    expect(banked.scrapLost).toBe(100)
    expect(banked.techLost).toBe(10)
  })

  it('Survivor treated same as Extracted', () => {
    const run = { ...defaultRunData(), scrapEarned: 100, techEarned: 5, wave: 2, outcome: 'Survivor' as const }
    const banked = computeBankedResources(run)
    expect(banked.extractionBonus).toBe(60) // 2 * 30
    expect(banked.scrap).toBe(160)
  })

  it('higher waves yield bigger extraction bonus', () => {
    const wave4 = computeBankedResources({ ...defaultRunData(), wave: 4, outcome: 'Extracted' as const })
    const wave8 = computeBankedResources({ ...defaultRunData(), wave: 8, outcome: 'Extracted' as const })
    expect(wave8.extractionBonus).toBeGreaterThan(wave4.extractionBonus)
  })
})

// Pure level-up math (mirrors addScrapInRun while-loop logic)
function simulateLevelUp(startScrap: number, gain: number, startLevel: number, startXpToNext: number) {
  let scrap = startScrap + gain
  let level = startLevel
  let xpToNext = startXpToNext
  let levelUps = 0
  while (scrap >= xpToNext) {
    scrap -= xpToNext
    level += 1
    xpToNext = Math.floor(xpToNext * 1.5)
    levelUps++
  }
  return { scrap, level, xpToNext, levelUps }
}

describe('level-up while-loop math', () => {
  it('single level-up when scrap crosses threshold', () => {
    const result = simulateLevelUp(0, 60, 1, 50)
    expect(result.level).toBe(2)
    expect(result.scrap).toBe(10) // 60 - 50
    expect(result.levelUps).toBe(1)
  })

  it('multi level-up in one scrap gain', () => {
    // Level 1: need 50. Level 2: need 75. Gain 200 at once.
    const result = simulateLevelUp(0, 200, 1, 50)
    expect(result.level).toBeGreaterThanOrEqual(3) // should get at least 2 levels
    expect(result.levelUps).toBeGreaterThanOrEqual(2)
  })

  it('no level-up if scrap below threshold', () => {
    const result = simulateLevelUp(0, 30, 1, 50)
    expect(result.level).toBe(1)
    expect(result.levelUps).toBe(0)
    expect(result.scrap).toBe(30)
  })

  it('xpToNext grows by 1.5x each level', () => {
    const result = simulateLevelUp(0, 200, 1, 50)
    // After level-up from 50: xpToNext = floor(50 * 1.5) = 75
    // After level-up from 75: xpToNext = floor(75 * 1.5) = 112
    expect(result.xpToNext).toBe(112)
  })
})
