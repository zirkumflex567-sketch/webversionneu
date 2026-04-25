import * as THREE from 'three'
import { Enemy } from './Enemy'
import { Projectile } from './Projectile'

const SENTRY_RANGE   = 20
const SENTRY_FIRE_HZ = 1.5  // shots per second
const SENTRY_LIFE    = 15   // seconds

/**
 * Deployable Sentry — Marek's DROHNEN-WACHT ability.
 * Placed at deploy position, auto-targets nearest enemy within range,
 * fires projectiles for its lifespan.
 */
export class Sentry {
  readonly group = new THREE.Group()
  private fireTimer = 0
  private life = SENTRY_LIFE
  private barrel: THREE.Mesh

  constructor(pos: THREE.Vector3) {
    // Base
    const baseGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.4, 8)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xc9b7ff,
      metalness: 0.8,
      roughness: 0.3,
      emissive: new THREE.Color(0x6633cc),
      emissiveIntensity: 0.4,
    })
    const base = new THREE.Mesh(baseGeo, baseMat)
    base.position.y = 0.2
    base.castShadow = true
    this.group.add(base)

    // Body dome
    const domeGeo = new THREE.SphereGeometry(0.45, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2)
    const dome    = new THREE.Mesh(domeGeo, baseMat)
    dome.position.y = 0.4
    this.group.add(dome)

    // Barrel (points along +Z, rotated to face target each frame)
    const barrelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6)
    barrelGeo.rotateX(Math.PI / 2)
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 1, roughness: 0.2 })
    this.barrel = new THREE.Mesh(barrelGeo, barrelMat)
    this.barrel.position.set(0, 0.7, 0)
    this.group.add(this.barrel)

    // Glow eye
    const eyeGeo = new THREE.SphereGeometry(0.12, 8, 8)
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xc9b7ff,
      emissive: new THREE.Color(0xc9b7ff),
      emissiveIntensity: 4,
    })
    const eye = new THREE.Mesh(eyeGeo, eyeMat)
    eye.position.set(0, 0.7, 0.2)
    this.group.add(eye)

    this.group.position.copy(pos)
    this.group.position.y = 0
  }

  get isDone(): boolean {
    return this.life <= 0
  }

  /** Returns a projectile if the sentry fires this frame, null otherwise */
  update(delta: number, enemies: Enemy[]): Projectile | null {
    this.life -= delta
    if (this.life <= 0) return null

    // Lifespan pulse: speed up glow as it dies
    const urgency = 1 - this.life / SENTRY_LIFE
    const mat = (this.group.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.4 + urgency * 1.5

    // Find nearest enemy in range
    let nearest: Enemy | null = null
    let nearestDist = SENTRY_RANGE
    for (const e of enemies) {
      if (e.isDead()) continue
      const d = e.position.distanceTo(this.group.position)
      if (d < nearestDist) {
        nearestDist = d
        nearest = e
      }
    }

    if (!nearest) return null

    // Rotate barrel toward target
    const toTarget = nearest.position.clone().sub(this.group.position)
    toTarget.y = 0
    if (toTarget.length() > 0.01) {
      const angle = Math.atan2(toTarget.x, toTarget.z)
      this.barrel.parent!.rotation.y = angle
    }

    // Fire
    this.fireTimer -= delta
    if (this.fireTimer <= 0) {
      this.fireTimer = 1 / SENTRY_FIRE_HZ

      const origin = this.group.position.clone()
      origin.y = 0.7
      const dir = toTarget.normalize()
      const proj = new Projectile(origin, dir)
      proj.damage = 20
      return proj
    }

    return null
  }

  dispose(scene: THREE.Scene): void {
    scene.remove(this.group)
  }
}
