import * as THREE from 'three'
import { HordeDirector } from './HordeDirector'
import { ExtractionZone } from './ExtractionZone'
import { useGameStore } from '../store'
import { SFX } from '../audio/SFX'

export class RunController {
  private hordeDirector: HordeDirector
  private extractionZone: ExtractionZone
  
  // E.g., we extract at wave 4
  private targetExtractionWave = 4
  private extractionDeployed = false

  constructor(hordeDirector: HordeDirector, extractionZone: ExtractionZone) {
    this.hordeDirector = hordeDirector
    this.extractionZone = extractionZone
  }

  update(delta: number): void {
    const state = useGameStore.getState()
    
    if (state.phase === "InPlay") {
      // 1. If we reached extraction wave, deploy extraction zone (don't wait for enemies to be 0)
      if (state.wave >= this.targetExtractionWave && !this.extractionDeployed) {
        this.extractionDeployed = true
        // Deploy at a random edge position (radius 25–35, avoiding the dead-centre spawn)
        const angle = Math.random() * Math.PI * 2
        const radius = 25 + Math.random() * 10
        const pos = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
        this.extractionZone.activate(pos)
        this.hordeDirector.spawnBoss() // Extraction Guardian
        useGameStore.getState().showCallout("EXTRACTION GUARDIAN INCOMING!", 4000, 'boss')
        try { SFX.bossSting() } catch { /* audio not ready */ }
      }
      
      // 2. Continually run the horde director so enemies keep spawning during the 30s hold!
      this.hordeDirector.update(delta)
    }
  }
}
