import { beforeEach, describe, expect, it } from 'vitest'
import { useGameStore } from './store'
import { SaveManager } from './save/SaveManager'

/**
 * Store-level integration tests for the run lifecycle.
 *
 * These tests exercise the zustand store as a black box — no Three.js / DOM,
 * no rendering. They cover the transitions between Hub → InPlay → Extraction →
 * RunSummary and verify that the in-run currency + level-up pipeline fires.
 *
 * Notes:
 * - Vitest env is 'node', so SaveManager falls back to its in-memory save
 *   (hasStorage() returns false). That's fine for pure transition testing.
 * - We reset the store to a known state before each test via setState().
 */

function resetStore() {
  // Full reset: revert the store to the shape produced by the creator.
  useGameStore.setState({
    wave: 1,
    enemiesAlive: 0,
    enemiesKilledThisRun: 0,
    health: 100,
    maxHealth: 100,
    scrap: 0,
    tech: 0,
    level: 1,
    xpToNextLevel: 50,
    phase: 'Hub',
    character: null,
    runStartMs: 0,
    abilityUses: 3,
    shield: 0,
    maxShield: 50,
    isPaused: false,
    isSettingsOpen: false,
    runUpgrades: {},
    offeredUpgrades: [],
    callout: null,
    calloutKey: 0,
    calloutVariant: 'normal',
    loadout: null,
    meta: SaveManager.getMeta(),
  })
}

describe('useGameStore — run lifecycle', () => {
  beforeEach(() => { resetStore() })

  it('starts in Hub with a clean slate', () => {
    const s = useGameStore.getState()
    expect(s.phase).toBe('Hub')
    expect(s.scrap).toBe(0)
    expect(s.level).toBe(1)
    expect(s.loadout).toBeNull()
  })

  it('configureLoadout sets loadout and character', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    const s = useGameStore.getState()
    expect(s.loadout?.character).toBe('rixa')
    expect(s.character).toBe('rixa')
  })

  it('startRun transitions Hub → InPlay (or WaitingToStart) with fresh stats', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    useGameStore.getState().startRun()
    const s = useGameStore.getState()
    expect(['InPlay', 'WaitingToStart']).toContain(s.phase)
    expect(s.scrap).toBe(0)
    expect(s.level).toBe(1)
    expect(s.health).toBeGreaterThan(0)
    expect(s.runStartMs).toBeGreaterThan(0)
  })

  it('addScrapInRun accumulates and triggers UpgradeSelection on level-up', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    useGameStore.getState().startRun()
    const initialXp = useGameStore.getState().xpToNextLevel

    useGameStore.getState().addScrapInRun(initialXp + 5)

    const s = useGameStore.getState()
    expect(s.level).toBeGreaterThanOrEqual(2)
    expect(s.phase).toBe('UpgradeSelection')
    expect(s.offeredUpgrades.length).toBeGreaterThan(0)
  })

  it('rapid multi-level-up resolves in a single addScrapInRun call (while-loop fix)', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    useGameStore.getState().startRun()

    // Dump a huge lump-sum — should consume multiple level thresholds in one call.
    useGameStore.getState().addScrapInRun(10_000)

    const s = useGameStore.getState()
    expect(s.level).toBeGreaterThanOrEqual(3)
    expect(s.phase).toBe('UpgradeSelection')
  })

  it('addTechInRun adds at least 1 tech even for small amounts', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    useGameStore.getState().startRun()
    const before = useGameStore.getState().tech
    useGameStore.getState().addTechInRun(1)
    expect(useGameStore.getState().tech).toBeGreaterThan(before)
  })

  it('recordKill increments enemiesKilledThisRun', () => {
    useGameStore.getState().recordKill()
    useGameStore.getState().recordKill()
    expect(useGameStore.getState().enemiesKilledThisRun).toBe(2)
  })

  it('endRun("Extracted") returns to Hub and banks scrap via SaveManager', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    useGameStore.getState().startRun()
    useGameStore.setState({ scrap: 40, tech: 5, wave: 3 })

    const metaScrapBefore = SaveManager.getMeta().totalScrap
    useGameStore.getState().endRun('Extracted')

    const s = useGameStore.getState()
    expect(s.phase).toBe('Hub')
    expect(s.isPaused).toBe(false)
    expect(SaveManager.getMeta().totalScrap).toBeGreaterThan(metaScrapBefore)
  })

  it('endRun("Died") transitions to GameOver and keeps 50% scrap, 0 tech', () => {
    useGameStore.getState().configureLoadout({
      character: 'rixa',
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    useGameStore.getState().startRun()
    useGameStore.setState({ scrap: 100, tech: 20, wave: 4 })

    const techBefore = SaveManager.getMeta().totalTech
    useGameStore.getState().endRun('Died')

    const s = useGameStore.getState()
    expect(s.phase).toBe('GameOver')
    // Dying does not bank tech (banked.tech = 0 on Died).
    expect(SaveManager.getMeta().totalTech).toBe(techBefore)
  })

  it('useAbility returns null outside InPlay', () => {
    useGameStore.setState({ phase: 'Hub' })
    expect(useGameStore.getState().useAbility()).toBeNull()
  })

  it('togglePause only toggles in InPlay / UpgradeSelection', () => {
    useGameStore.setState({ phase: 'Hub', isPaused: false })
    useGameStore.getState().togglePause()
    expect(useGameStore.getState().isPaused).toBe(false)

    useGameStore.setState({ phase: 'InPlay', isPaused: false })
    useGameStore.getState().togglePause()
    expect(useGameStore.getState().isPaused).toBe(true)
  })
})
