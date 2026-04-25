import { describe, it, expect } from 'vitest'
import { computeSkillStats, computeSynergyBonuses, CHARACTERS } from './CharacterData'

describe('computeSkillStats', () => {
  it('returns empty object when no ranks invested', () => {
    const stats = computeSkillStats('rixa', {})
    expect(Object.keys(stats).length).toBe(0)
  })

  it('accumulates a single node correctly', () => {
    const stats = computeSkillStats('rixa', { ca_1: 3 })
    // ca_1: valuePerRank=4, 3 ranks → 12
    expect(stats.damageBonus).toBe(12)
  })

  it('caps at maxRanks even if more invested', () => {
    const stats = computeSkillStats('rixa', { ca_1: 99 })
    // ca_1: maxRanks=5, valuePerRank=4 → cap at 20
    expect(stats.damageBonus).toBe(20)
  })

  it('accumulates same statKey across multiple nodes', () => {
    // ca_1 (damageBonus, 5×4=20) + ca_cap (damageBonus, 1×20=20)
    const stats = computeSkillStats('rixa', { ca_1: 5, ca_cap: 1 })
    expect(stats.damageBonus).toBe(40)
  })

  it('handles marek nodes correctly', () => {
    const stats = computeSkillStats('marek', { bw_1: 2 })
    // bw_1: armor, valuePerRank=2, 2 ranks → 4
    expect(stats.armor).toBe(4)
  })

  it('supports newly wired characters (lyra template tree)', () => {
    const stats = computeSkillStats('lyra', { ly_o1: 3, ly_s2: 2 })
    expect(stats.damageBonus).toBe(9)
    expect(stats.armor).toBe(2)
  })

  it('contains all save-schema characters in gameplay roster', () => {
    expect(Object.keys(CHARACTERS).sort()).toEqual([
      'brannok', 'cyr', 'edda', 'kael', 'lyra', 'marek', 'mira', 'neris', 'oren', 'rixa', 'siofra', 'tarek', 'velka', 'yara'
    ])
  })
})

describe('computeSynergyBonuses', () => {
  const raixTier1AllMaxed = { ca_1: 5, sc_1: 5, hb_1: 5 }
  const rixaTier1Partial  = { ca_1: 5, sc_1: 4, hb_1: 5 }

  it('returns no bonus when nothing is maxed', () => {
    const syn = computeSynergyBonuses('rixa', {})
    expect(Object.keys(syn).length).toBe(0)
  })

  it('grants tier-1 speedMult bonus when all tier-1 nodes maxed', () => {
    const syn = computeSynergyBonuses('rixa', raixTier1AllMaxed)
    expect(syn.speedMult).toBe(5)
  })

  it('does NOT grant bonus when one tier-1 node is short', () => {
    const syn = computeSynergyBonuses('rixa', rixaTier1Partial)
    expect(syn.speedMult).toBeUndefined()
  })

  it('grants tier-2 scrapMult bonus when all tier-2 nodes maxed', () => {
    const ranks = { ca_2: 5, sc_2: 5, hb_2: 5 }
    const syn = computeSynergyBonuses('rixa', ranks)
    expect(syn.scrapMult).toBe(8)
  })

  it('grants tier-3 damageBonus when all tier-3 nodes maxed', () => {
    const ranks = { ca_3: 3, sc_3: 3, hb_3: 3 }
    const syn = computeSynergyBonuses('rixa', ranks)
    expect(syn.damageBonus).toBe(10)
  })

  it('grants tier-4 fireRateMult bonus when all capstones maxed', () => {
    const ranks = { ca_cap: 1, sc_cap: 1, hb_cap: 1 }
    const syn = computeSynergyBonuses('rixa', ranks)
    expect(syn.fireRateMult).toBe(15)
  })

  it('can grant multiple tier synergies simultaneously', () => {
    const ranks = { ca_1: 5, sc_1: 5, hb_1: 5, ca_2: 5, sc_2: 5, hb_2: 5 }
    const syn = computeSynergyBonuses('rixa', ranks)
    expect(syn.speedMult).toBe(5)
    expect(syn.scrapMult).toBe(8)
  })
})
