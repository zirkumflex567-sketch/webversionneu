import { describe, expect, it } from 'vitest'
import { rollRandomUpgrades } from './UpgradeData'

function pickMap(entries: Array<[string, number]>): Record<string, number> {
  return Object.fromEntries(entries)
}

describe('Directed Milestone Flow upgrade offers', () => {
  it('round 1 offers a clear foundation option', () => {
    const offer = rollRandomUpgrades(3, {}, { rng: () => 0.01 })
    expect(offer).toHaveLength(3)
    expect(offer.some((u) => u.role === 'glue' || u.role === 'foundation')).toBe(true)
  })

  it('round 3 guarantees an expression pick', () => {
    const current = pickMap([
      ['upg_burn_crit', 1],
      ['upg_ember_trail', 1],
    ])
    const offer = rollRandomUpgrades(3, current, { rng: () => 0.17 })
    expect(offer.some((u) => u.role === 'expression')).toBe(true)
  })

  it('round 5 guarantees an escalator/converter/rulebreaker option', () => {
    const current = pickMap([
      ['upg_burn_crit', 1],
      ['upg_ember_trail', 1],
      ['upg_aftershock_pulse', 1],
      ['upg_ash_detonation', 1],
    ])
    const offer = rollRandomUpgrades(3, current, { rng: () => 0.42 })
    expect(
      offer.some(
        (u) => u.role === 'escalator' || u.role === 'converter' || u.role === 'rulebreaker',
      ),
    ).toBe(true)
  })

  it('keeps one wildcard option even for established builds', () => {
    const current = pickMap([
      ['upg_chain_volt', 2],
      ['upg_arc_return', 1],
      ['upg_shock_lattice', 1],
    ])
    const offer = rollRandomUpgrades(3, current, { rng: () => 0.77 })
    const wildcard = offer.find((u) => !u.tags.includes('shock') && !u.tags.includes('projectile'))
    expect(wildcard).toBeTruthy()
  })
})
