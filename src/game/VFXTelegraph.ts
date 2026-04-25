import * as THREE from 'three'

interface TelegraphZone {
  mesh: THREE.Mesh
  duration: number
  elapsed: number
  color: number
}

/**
 * Visual telegraph system for ability and danger zones.
 * Displays pulsing circles to warn players of incoming damage or effects.
 */
export class VFXTelegraph {
  readonly group = new THREE.Group()
  private zones: TelegraphZone[] = []

  constructor() {
    this.group.position.y = 0.01 // Just above ground
  }

  /**
   * Spawn a warning telegraph zone (e.g., boss attack area)
   * @param pos Center position of the telegraph
   * @param radius Radius of the danger zone
   * @param color Hex color (0xff0000 for red, 0xff9900 for orange, etc.)
   * @param duration How long to display the telegraph in seconds
   */
  spawnTelegraph(pos: THREE.Vector3, radius: number, color: number, duration = 1.5): void {
    const geo = new THREE.RingGeometry(radius, radius + 0.2, 48)
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(pos)
    mesh.position.y = 0.01

    this.group.add(mesh)
    this.zones.push({
      mesh,
      duration,
      elapsed: 0,
      color,
    })
  }

  /**
   * Spawn an expanding telegraph (wave/knockback effect)
   */
  spawnExpandingWave(pos: THREE.Vector3, maxRadius: number, color: number, duration = 1.0): void {
    const startGeo = new THREE.RingGeometry(0.5, 0.7, 48)
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(startGeo, mat)
    mesh.position.copy(pos)
    mesh.position.y = 0.01
    mesh.userData.maxRadius = maxRadius

    this.group.add(mesh)
    this.zones.push({
      mesh,
      duration,
      elapsed: 0,
      color: color | 0x0080ff, // Add blue component for wave effect
    })
  }

  /**
   * Spawn a cone telegraph (directional attack)
   */
  spawnCone(origin: THREE.Vector3, direction: THREE.Vector3, angle: number, depth: number, color: number, duration = 1.2): void {
    // Create a simple triangle/cone shape using a Raycaster visualization
    const clampedAngle = THREE.MathUtils.clamp(angle, 0.1, Math.PI * 2)
    const geo = new THREE.CircleGeometry(depth * 0.5, 24, -clampedAngle / 2, clampedAngle)
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(origin)
    mesh.position.addScaledVector(direction, depth * 0.5)
    mesh.position.y = 0.01

    // Rotate to face direction
    const quat = new THREE.Quaternion()
    quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction)
    mesh.quaternion.copy(quat)

    this.group.add(mesh)
    this.zones.push({
      mesh,
      duration,
      elapsed: 0,
      color,
    })
  }

  update(delta: number): void {
    for (let i = this.zones.length - 1; i >= 0; i--) {
      const zone = this.zones[i]
      zone.elapsed += delta

      const progress = zone.elapsed / zone.duration
      if (progress >= 1.0) {
        this.group.remove(zone.mesh)
        zone.mesh.geometry.dispose()
        ;(zone.mesh.material as THREE.Material).dispose()
        this.zones.splice(i, 1)
        continue
      }

      // Pulsing opacity: fade out near end, pulse in middle
      let opacity: number
      if (progress < 0.3) {
        opacity = 0.3 + 0.4 * (progress / 0.3)
      } else if (progress > 0.7) {
        opacity = 0.6 * (1 - (progress - 0.7) / 0.3)
      } else {
        // Mid-duration: gentle pulse
        opacity = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(progress * Math.PI * 4))
      }

      const mat = zone.mesh.material as THREE.MeshBasicMaterial
      mat.opacity = opacity

      // Ring expansion for expanding waves
      if (zone.color & 0x0080ff) {
        const geo = zone.mesh.geometry as THREE.CircleGeometry
        const targetRadius = Number(zone.mesh.userData.maxRadius ?? 2)
        const radiusScale = 0.5 + progress * Math.max(0.5, targetRadius - 0.5)
        geo.dispose()
        zone.mesh.geometry = new THREE.CircleGeometry(radiusScale, 24)
      }
    }
  }

  dispose(scene: THREE.Scene): void {
    for (const zone of this.zones) {
      zone.mesh.geometry.dispose()
      ;(zone.mesh.material as THREE.Material).dispose()
    }
    scene.remove(this.group)
  }
}
