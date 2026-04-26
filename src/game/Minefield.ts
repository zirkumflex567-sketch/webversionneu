import * as THREE from 'three'
import { Vehicle } from './Vehicle'
import { FXManager } from './FXManager'
import { AssetManager } from './AssetManager'
import { useGameStore } from '../store'
import { t } from '../i18n'

const MINE_RADIUS    = 1.2   // trigger distance
const MINE_DAMAGE    = 25
const MINE_COUNT     = 6
const MINE_PULSE_HZ  = 2.0   // visual pulse frequency

interface Mine {
  mesh: THREE.Group
  pos: THREE.Vector3
  triggered: boolean
  blastTimer: number
}

/**
 * Minefield — spawned once per arena, remains active for the run.
 * Mines detonate when the player drives over them, dealing damage
 * and a camera shake. Blown mines disappear.
 */
export class Minefield {
  readonly group = new THREE.Group()
  private mines: Mine[] = []
  private clock = 0

  constructor(avoidCenter = 12) {
    for (let i = 0; i < MINE_COUNT; i++) {
      const mine = this.buildMine()
      // Scatter around the arena avoiding centre spawn
      let x: number, z: number
      do {
        x = (Math.random() - 0.5) * 60
        z = (Math.random() - 0.5) * 60
      } while (Math.sqrt(x * x + z * z) < avoidCenter)

      mine.mesh.position.set(x, 0, z)
      this.group.add(mine.mesh)
      this.mines.push({ mesh: mine.mesh, pos: new THREE.Vector3(x, 0, z), triggered: false, blastTimer: 0 })
    }
  }

  private buildMine(): { mesh: THREE.Group } {
    const g = new THREE.Group()

    // Body disc
    const bodyGeo = new THREE.CylinderGeometry(0.5, 0.55, 0.2, 12)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.9,
      roughness: 0.3,
    })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    body.position.y = 0.1
    body.castShadow = true
    g.add(body)

    // Warning ring on ground
    const ringGeo = new THREE.RingGeometry(0.65, 0.75, 24)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff4400, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
    const ring    = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.01
    g.add(ring)

    // LED blink
    const ledGeo = new THREE.SphereGeometry(0.1, 8, 8)
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: new THREE.Color(0xff0000),
      emissiveIntensity: 3,
    })
    const led = new THREE.Mesh(ledGeo, ledMat)
    led.position.y = 0.22
    g.add(led)

    return { mesh: g }
  }

  update(delta: number, vehicle: Vehicle): void {
    this.clock += delta

    for (const mine of this.mines) {
      if (mine.triggered) {
        mine.blastTimer -= delta
        if (mine.blastTimer <= 0) {
          mine.mesh.visible = false
        }
        continue
      }

      // Pulse warning ring opacity
      const ring = mine.mesh.children[1] as THREE.Mesh
      const ringMat = ring.material as THREE.MeshBasicMaterial
      ringMat.opacity = 0.4 + 0.3 * Math.sin(this.clock * Math.PI * 2 * MINE_PULSE_HZ)

      // LED blink
      const led = mine.mesh.children[2] as THREE.Mesh
      const ledMat = led.material as THREE.MeshStandardMaterial
      ledMat.emissiveIntensity = this.clock % (1 / MINE_PULSE_HZ) < 0.15 ? 6 : 1

      // Trigger check
      if (vehicle.position.distanceTo(mine.pos) < MINE_RADIUS) {
        this.triggerMine(mine)
      }
    }
  }

  private triggerMine(mine: Mine): void {
    mine.triggered = true
    mine.blastTimer = 0.3

    // Damage player
    const state = useGameStore.getState()
    const newHealth = Math.max(0, state.health - MINE_DAMAGE)
    state.setMatchState({ health: newHealth })
    state.showCallout(t("callout.mine.warning", undefined, state.locale), 800)

    // FX
    FXManager.getInstance().spawnExplosion(mine.pos, 0xff4400, false)
    AssetManager.getInstance().playSound('hit')
  }

  dispose(scene: THREE.Scene): void {
    scene.remove(this.group)
  }
}
