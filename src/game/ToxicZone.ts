import * as THREE from 'three'
import { Enemy } from './Enemy'

/**
 * Toxic ground zone — left by Rixa's Alchemical Trail ability.
 * Damages enemies that walk through it for its duration.
 */
export class ToxicZone {
  readonly group = new THREE.Group()
  private mesh: THREE.Mesh
  private life: number
  private readonly maxLife: number
  private readonly radius: number
  private readonly dps: number

  constructor(pos: THREE.Vector3, radius = 6, duration = 5, dps = 8) {
    this.radius  = radius
    this.maxLife = duration
    this.life    = duration
    this.dps     = dps

    const geo = new THREE.CylinderGeometry(radius, radius, 0.15, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x00ff44,
      emissive: new THREE.Color(0x00cc33),
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.y = 0.08
    this.group.add(this.mesh)
    this.group.position.copy(pos)
    this.group.position.y = 0
  }

  get isDone(): boolean {
    return this.life <= 0
  }

  update(delta: number, enemies: Enemy[]): void {
    this.life -= delta
    const alpha = Math.max(0, this.life / this.maxLife)

    // Pulse opacity + slight scale pulse
    const mat = this.mesh.material as THREE.MeshStandardMaterial
    mat.opacity = alpha * 0.55
    const pulse = 1 + Math.sin(this.life * 6) * 0.04
    this.mesh.scale.setScalar(pulse)

    // Damage enemies inside
    for (const e of enemies) {
      if (e.position.distanceTo(this.group.position) < this.radius) {
        e.applyStatus('toxic', this.dps, 0.5)
      }
    }
  }

  dispose(scene: THREE.Scene): void {
    scene.remove(this.group)
    const mat = this.mesh.material as THREE.MeshStandardMaterial
    mat.dispose()
    this.mesh.geometry.dispose()
  }
}
