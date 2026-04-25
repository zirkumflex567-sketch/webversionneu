import { useGameStore, GamePhase, GameState } from '../store'

interface MatchHUDData {
  scoreA: number
  scoreB: number
  timer: number
  half: number
  matchPhase: number
  penaltyPower: number
}

export class HUD {
  update(wave: number, enemies: number, health: number, phase: GamePhase, matchData?: MatchHUDData): void {
    const stateUpdate: Partial<GameState> = {
      wave,
      enemiesAlive: enemies,
      health,
      phase,
    }

    if (matchData) {
      Object.assign(stateUpdate, {
        scoreA: matchData.scoreA,
        scoreB: matchData.scoreB,
        matchTimer: matchData.timer,
        matchHalf: matchData.half,
        matchPhase: matchData.matchPhase,
        penaltyPower: matchData.penaltyPower,
      })
    }

    useGameStore.getState().setMatchState(stateUpdate)
  }

  showCallout(text: string, duration = 2000): void {
    useGameStore.getState().showCallout(text, duration)
  }
}
