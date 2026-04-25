import * as THREE from 'three'
import { Vehicle } from './Vehicle'
import { useGameStore } from '../store'
import { AssetManager } from './AssetManager'

export class ExtractionZone {
  readonly group = new THREE.Group()
  private pad: THREE.Mesh
  
  private active = false
  private holdTimer = 0
  private lastAnnouncedSecond = -1
  private readonly requiredHoldTime = 5.0 // 5 seconds to extract
  private radius = 5.0

  constructor() {
    const tex = AssetManager.getInstance().getExtractTexture()
    const geo = new THREE.PlaneGeometry(this.radius * 2.2, this.radius * 2.2)
    const mat = new THREE.MeshBasicMaterial({ 
      map: tex,
      transparent: true, 
      opacity: 0.8,
      side: THREE.DoubleSide
    })
    
    this.pad = new THREE.Mesh(geo, mat)
    this.pad.rotation.x = -Math.PI / 2
    this.pad.position.y = 0.05
    this.group.add(this.pad)
    
    // Hidden by default until activated
    this.group.visible = false
  }

  activate(position: THREE.Vector3): void {
    this.active = true
    this.group.visible = true
    this.group.position.copy(position)
    this.group.position.y = 0
    this.holdTimer = 0
    this.lastAnnouncedSecond = -1
    useGameStore.getState().showCallout("EXTRACTION ZONE DEPLOYED — HOLD 5s", 3000)
  }

  update(delta: number, vehicle: Vehicle): void {
    if (!this.active) return
    
    const state = useGameStore.getState()
    if (state.phase !== "InPlay") return

    const dist = this.group.position.distanceTo(vehicle.position)
    
    if (dist < this.radius) {
      this.holdTimer += delta;
      
      // Animate pad pulse
      (this.pad.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(Date.now() * 0.008) * 0.4;
      this.pad.scale.setScalar(1 + Math.sin(Date.now() * 0.01) * 0.05)

      const remaining = Math.ceil(this.requiredHoldTime - this.holdTimer)
      if (remaining !== this.lastAnnouncedSecond && remaining > 0) {
        this.lastAnnouncedSecond = remaining
        useGameStore.getState().showCallout(`EXTRACTING... ${remaining}`, 900)
      }

      if (this.holdTimer >= this.requiredHoldTime) {
        this.triggerExtraction()
      }
    } else {
      if (this.holdTimer > 0) {
        useGameStore.getState().showCallout("EXTRACTION INTERRUPTED", 1500)
      }
      this.holdTimer = 0;
      this.lastAnnouncedSecond = -1;
      (this.pad.material as THREE.MeshBasicMaterial).opacity = 0.8;
      this.pad.scale.setScalar(1);
    }
  }

  private triggerExtraction(): void {
    this.active = false
    this.group.visible = false

    useGameStore.getState().showCallout("EXTRACTION SUCCESSFUL", 3000)
    useGameStore.getState().endRun("Extracted")
  }
}
