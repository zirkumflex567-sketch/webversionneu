/**
 * Character Trait Implementation
 * Special passive abilities that modify gameplay mechanics
 */

import { Enemy } from './Enemy'

/**
 * Apply Rixa's Chromrausch trait bonus
 * +3% damage per active status effect on nearby enemies (max 10 stacks, 3s duration)
 * @param baseDamage Base damage value
 * @param character Character ID
 * @param enemies List of enemies to check for status effects
 * @param position Vector3 position of the character/vehicle
 * @param range Detection range in meters (default 15)
 * @returns Damage multiplier (1.0 = no bonus, 1.3 = 10 stacks)
 */
export function applyCharacterTraitDamage(
  baseDamage: number,
  character: string | null,
  enemies: Enemy[],
  position: { x: number; y: number; z: number },
  range: number = 15
): number {
  if (!character || !enemies || enemies.length === 0) {
    return baseDamage
  }

  const statusCount = getActiveStatusCount(enemies, position, range)
  const nearbyCount = getNearbyEnemyCount(enemies, position, range)

  let multiplier: number
  switch (character) {
    case 'rixa':
      // +3% per status, max 10
      multiplier = 1.0 + Math.min(10, statusCount) * 0.03
      break
    case 'marek':
      // +1.5% per nearby enemy, max 20 stacks
      multiplier = 1.0 + Math.min(20, nearbyCount) * 0.015
      break
    case 'lyra':
      // +2% per nearby enemy, max 8
      multiplier = 1.0 + Math.min(8, nearbyCount) * 0.02
      break
    case 'mira':
      // +2% per nearby status, max 8
      multiplier = 1.0 + Math.min(8, statusCount) * 0.02
      break
    case 'tarek':
      // Close-range skirmisher: +1.5% per enemy within tighter range, max 10
      multiplier = 1.0 + Math.min(10, getNearbyEnemyCount(enemies, position, Math.min(range, 10))) * 0.015
      break
    case 'siofra':
      // +2% per status, max 10
      multiplier = 1.0 + Math.min(10, statusCount) * 0.02
      break
    case 'brannok':
      // Brawler spike in crowded fights
      multiplier = nearbyCount >= 3 ? 1.12 : 1.0
      break
    case 'edda':
      // +1% per nearby enemy, max 10
      multiplier = 1.0 + Math.min(10, nearbyCount) * 0.01
      break
    case 'kael':
      // Duelist bonus when isolating one target
      multiplier = nearbyCount === 1 ? 1.03 : 1.0
      break
    case 'oren':
      multiplier = nearbyCount >= 2 ? 1.0 + Math.min(10, nearbyCount) * 0.01 : 1.0
      break
    case 'yara':
      multiplier = 1.0 + Math.min(8, nearbyCount) * 0.02
      break
    case 'neris':
      multiplier = 1.0 + Math.min(10, statusCount) * 0.02
      break
    case 'velka':
      multiplier = nearbyCount === 1 ? 1.03 : 1.0 + Math.min(10, nearbyCount) * 0.015
      break
    case 'cyr':
      multiplier = 1.0 + Math.min(8, nearbyCount) * 0.01 + Math.min(8, statusCount) * 0.01
      break
    default:
      multiplier = 1.0
  }

  return baseDamage * multiplier
}

/**
 * Get trait bonus multiplier without applying to damage
 * Useful for UI display and calculations
 * @returns Multiplier value (1.0 to 1.3 for chromrausch)
 */
export function getCharacterTraitMultiplier(
  character: string | null,
  enemies: Enemy[],
  position: { x: number; y: number; z: number },
  range: number = 15
): number {
  if (!character || !enemies || enemies.length === 0) {
    return 1.0
  }

  const traitAppliedDamage = applyCharacterTraitDamage(100, character, enemies, position, range)
  return traitAppliedDamage / 100
}

/**
 * Get active status effect count on nearby enemies
 * Used for debugging and trait UI display
 * @returns Total count of active status effects
 */
export function getActiveStatusCount(
  enemies: Enemy[],
  position: { x: number; y: number; z: number },
  range: number = 15
): number {
  if (!enemies || enemies.length === 0) {
    return 0
  }

  let statusCount = 0
  for (const enemy of enemies) {
    const distance = Math.sqrt(
      Math.pow(enemy.position.x - position.x, 2) +
      Math.pow(enemy.position.z - position.z, 2)
    )

    if (distance < range && enemy.activeStatuses) {
      statusCount += enemy.activeStatuses.length
    }
  }

  return statusCount
}

function getNearbyEnemyCount(
  enemies: Enemy[],
  position: { x: number; y: number; z: number },
  range: number = 15
): number {
  if (!enemies || enemies.length === 0) {
    return 0
  }

  let count = 0
  for (const enemy of enemies) {
    const distance = Math.sqrt(
      Math.pow(enemy.position.x - position.x, 2) +
      Math.pow(enemy.position.z - position.z, 2)
    )

    if (distance < range) count += 1
  }

  return count
}
