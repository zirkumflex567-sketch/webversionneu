import * as THREE from 'three'

export interface ParticleLODConfig {
  stressMode?: boolean
  cameraPosition?: THREE.Vector3
}

/**
 * Level-of-Detail system for particles based on distance from camera.
 * Culls distant particles and reduces quality in stress mode to maintain 60 FPS.
 *
 * LOD Levels:
 * - Level 0: Distance < 30m, 100% quality
 * - Level 1: Distance 30-75m, 75% quality
 * - Level 2: Distance 75-150m, 50% quality
 * - Level 3: Distance > 150m, 25% quality (culled in stress mode)
 */
export class ParticleLOD {
  private stressMode = false
  private readonly LOD_DISTANCES = [30, 75, 150] // Distance thresholds in meters
  private readonly QUALITY_LEVELS = [1.0, 0.75, 0.5, 0.25] // Quality multipliers per LOD
  private cameraPosition = new THREE.Vector3()

  constructor(config: ParticleLODConfig = {}) {
    this.stressMode = config.stressMode || false
    if (config.cameraPosition) {
      this.cameraPosition.copy(config.cameraPosition)
    }
  }

  /**
   * Determine LOD level based on distance from camera.
   * @param distance Distance from camera in meters
   * @returns LOD level (0-3, where 3 is lowest quality)
   */
  getLODLevel(distance: number): number {
    if (distance < this.LOD_DISTANCES[0]) return 0
    if (distance < this.LOD_DISTANCES[1]) return 1
    if (distance < this.LOD_DISTANCES[2]) return 2
    return 3
  }

  /**
   * Get quality multiplier for a given LOD level.
   * @param lodLevel LOD level (0-3)
   * @returns Quality multiplier (0.25-1.0)
   */
  getQualityMultiplier(lodLevel: number): number {
    return this.QUALITY_LEVELS[Math.min(lodLevel, this.QUALITY_LEVELS.length - 1)]
  }

  /**
   * Determine if a particle at the given position should render.
   * In stress mode, culls particles beyond 150m.
   * In normal mode, renders all particles up to 500m (adjusts quality by LOD).
   * @param position Particle world position
   * @returns true if particle should be rendered, false if culled
   */
  shouldRender(position: THREE.Vector3): boolean {
    const distance = position.distanceTo(this.cameraPosition)

    if (this.stressMode) {
      // In stress mode, cull particles beyond 150m to maintain 60 FPS
      return distance < this.LOD_DISTANCES[2]
    }

    // Normal mode: render all particles, but adjust quality
    return distance < 500 // Max render distance
  }

  /**
   * Calculate max particles that should be emitted based on current active count.
   * Reduces emission rate when approaching pool capacity.
   * @param activeCount Current active particle count
   * @returns Recommended particle budget (0-activeCount)
   */
  getParticleBudget(activeCount: number): number {
    // Returns max particles to emit based on current frame rate
    if (activeCount > 800) {
      return Math.floor(activeCount * 0.5) // Reduce emission when near capacity
    }
    return activeCount
  }

  /**
   * Update camera position for distance calculations.
   * @param position New camera position
   */
  setCameraPosition(position: THREE.Vector3): void {
    this.cameraPosition.copy(position)
  }

  /**
   * Enable/disable stress mode for aggressive particle culling.
   * @param enabled true to enable stress mode (cull beyond 150m)
   */
  setStressMode(enabled: boolean): void {
    this.stressMode = enabled
  }
}
