export interface WaveData {
  waveIndex: number
  maxAlive: number
  enemiesToSpawn: number
  spawnInterval: number
  enemyHpModifier: number
  enemySpeedModifier: number
  /** 0–1 fraction of spawns that are Heavy units */
  heavyRatio: number
}

// Equivalent to designer-defined inspector values (P1.3)
export const WAVE_CONFIGS: WaveData[] = [
  { waveIndex: 1, maxAlive: 8,  enemiesToSpawn: 10, spawnInterval: 2.0, enemyHpModifier: 1.0, enemySpeedModifier: 0.6, heavyRatio: 0.00 },
  { waveIndex: 2, maxAlive: 15, enemiesToSpawn: 25, spawnInterval: 1.5, enemyHpModifier: 1.1, enemySpeedModifier: 0.8, heavyRatio: 0.05 },
  { waveIndex: 3, maxAlive: 25, enemiesToSpawn: 50, spawnInterval: 1.0, enemyHpModifier: 1.4, enemySpeedModifier: 1.0, heavyRatio: 0.15 },
  { waveIndex: 4, maxAlive: 30, enemiesToSpawn: 80, spawnInterval: 0.8, enemyHpModifier: 1.8, enemySpeedModifier: 1.2, heavyRatio: 0.25 },
]

export function getWaveConfig(wave: number): WaveData {
  if (wave >= WAVE_CONFIGS.length) {
    // Extrapolate for endless scaling
    const last = WAVE_CONFIGS[WAVE_CONFIGS.length - 1]
    const extra = wave - WAVE_CONFIGS.length
    return {
      waveIndex: wave,
      maxAlive: last.maxAlive + extra * 5,
      enemiesToSpawn: last.enemiesToSpawn + extra * 20,
      spawnInterval: Math.max(0.2, last.spawnInterval - extra * 0.1),
      enemyHpModifier: last.enemyHpModifier + extra * 0.5,
      enemySpeedModifier: last.enemySpeedModifier + extra * 0.1,
      heavyRatio: Math.min(0.5, last.heavyRatio + extra * 0.05),
    }
  }
  return WAVE_CONFIGS[wave - 1]
}
