/**
 * Animation clip definitions for BIFA characters, enemies, vehicles, and abilities.
 * These constants ensure consistent animation naming across the game.
 */

export const CHARACTER_ANIMATIONS = {
  IDLE: 'idle',
  WALK: 'walk',
  RUN: 'run',
  JUMP: 'jump',
  FALL: 'fall',
  LAND: 'land',
  DASH: 'dash',
} as const

export const ENEMY_ANIMATIONS = {
  IDLE: 'idle',
  WALK: 'walk',
  ATTACK: 'attack',
  DAMAGED: 'damaged',
  DEATH: 'death',
} as const

export const VEHICLE_ANIMATIONS = {
  IDLE: 'idle',
  ACCELERATE: 'accelerate',
  DECELERATE: 'decelerate',
  TURN_LEFT: 'turn_left',
  TURN_RIGHT: 'turn_right',
  DAMAGE: 'damage',
  DESTRUCTION: 'destruction',
} as const

export const ABILITY_ANIMATIONS = {
  BASIC_ATTACK: 'basic_attack',
  TECHNIQUE: 'technique',
  ULTIMATE: 'ultimate',
  DODGE: 'dodge',
  SHIELD: 'shield',
  HEAL: 'heal',
} as const

export interface AnimationState {
  name: string
  priority: number
  canInterrupt: boolean
  duration: number
}

export const ANIMATION_PRIORITIES = {
  IDLE: 0,
  WALK: 5,
  RUN: 10,
  ABILITY_BASIC: 20,
  ABILITY_TECHNIQUE: 30,
  ABILITY_ULTIMATE: 40,
  DODGE: 50,
  DAMAGE: 15,
  DEATH: 100,
} as const

export const ANIMATION_DURATIONS = {
  IDLE: 1.0,
  WALK: 1.5,
  RUN: 1.0,
  JUMP: 0.8,
  DASH: 0.6,
  BASIC_ATTACK: 0.8,
  TECHNIQUE: 1.2,
  ULTIMATE: 2.0,
  DODGE: 0.5,
  DEATH: 2.5,
} as const

export function getAnimationState(
  name: string,
  overrides?: Partial<AnimationState>
): AnimationState {
  const priority =
    ANIMATION_PRIORITIES[name as keyof typeof ANIMATION_PRIORITIES] ?? 0
  const duration =
    ANIMATION_DURATIONS[name as keyof typeof ANIMATION_DURATIONS] ?? 1.0

  return {
    name,
    priority,
    canInterrupt: priority < 20,
    duration,
    ...overrides,
  }
}
