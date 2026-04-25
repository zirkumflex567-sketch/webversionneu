import * as THREE from 'three'

export interface SpriteSheetConfig {
  cols: number   // number of columns in the sheet
  rows: number   // number of rows in the sheet
  frames: number // total valid frames (may be less than cols*rows)
}

/** Default 4x2 = 8-direction layout */
export const SPRITE_CONFIG_4x2: SpriteSheetConfig = { cols: 4, rows: 2, frames: 8 }
/** Golem uses 3x3 = 9 cells, but only 8 are valid directions */
export const SPRITE_CONFIG_3x3: SpriteSheetConfig = { cols: 3, rows: 3, frames: 8 }
/** Drone/MireKing fixed sheet came out as 3x4 = 12 cells — use all 8 main directions */
export const SPRITE_CONFIG_3x4: SpriteSheetConfig = { cols: 3, rows: 4, frames: 8 }
/** MireKing fixed sheet is 4x4 = 16 cells */
export const SPRITE_CONFIG_4x4: SpriteSheetConfig = { cols: 4, rows: 4, frames: 8 }

export class SpriteEntity {
  readonly mesh: THREE.Mesh
  private readonly material: THREE.MeshStandardMaterial
  private readonly texture: THREE.Texture

  private readonly cols: number
  private readonly rows: number

  constructor(
    texture: THREE.Texture,
    size: { width: number, height: number },
    config: SpriteSheetConfig = SPRITE_CONFIG_4x2
  ) {
    this.texture = texture
    this.cols = config.cols
    this.rows = config.rows

    this.texture.wrapS = THREE.ClampToEdgeWrapping
    this.texture.wrapT = THREE.ClampToEdgeWrapping
    this.texture.repeat.set(1 / this.cols, 1 / this.rows)

    this.material = new THREE.MeshStandardMaterial({
      map: this.texture,
      transparent: true,
      alphaTest: 0.15,
      side: THREE.FrontSide,
      metalness: 0.2,
      roughness: 0.8,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0
    })

    const geometry = new THREE.PlaneGeometry(size.width, size.height)
    this.mesh = new THREE.Mesh(geometry, this.material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = false
  }

  /**
   * Updates the sprite frame based on the world angle between entity forward and camera view.
   * Selects from the first 8 valid frames arranged in a column-major grid.
   */
  update(entityForward: THREE.Vector3, cameraPosition: THREE.Vector3, entityPosition: THREE.Vector3): void {
    // 1. Calculate angle from entity to camera on XZ plane
    const toCamera = cameraPosition.clone().sub(entityPosition)
    toCamera.y = 0
    toCamera.normalize()

    const forwardAngle = Math.atan2(entityForward.x, entityForward.z)
    const cameraAngle  = Math.atan2(toCamera.x, toCamera.z)

    // 2. Relative angle normalised to [-PI, PI]
    let relAngle = cameraAngle - forwardAngle
    while (relAngle >  Math.PI) relAngle -= Math.PI * 2
    while (relAngle < -Math.PI) relAngle += Math.PI * 2

    // 3. Map to frame index 0-7 (S=0, SE=1, E=2, NE=3, N=4, NW=5, W=6, SW=7)
    let frameIndex = Math.round(relAngle / (Math.PI / 4))
    if (frameIndex < 0) frameIndex += 8
    frameIndex = frameIndex % 8

    // 4. Map frame index to (col, row) inside the actual sheet
    const col = frameIndex % this.cols
    const row = Math.floor(frameIndex / this.cols)

    // UV offset — THREE.js UV origin is bottom-left, so flip row
    const uOffset = col / this.cols
    const vOffset = (this.rows - 1 - row) / this.rows
    this.texture.offset.set(uOffset, vOffset)

    // 5. Billboard: rotate plane to always face camera
    const lookDir = cameraPosition.clone().sub(entityPosition).normalize()
    lookDir.y = 0
    if (lookDir.lengthSq() > 0.001) {
      const angle = Math.atan2(lookDir.x, lookDir.z)
      this.mesh.rotation.set(0, angle, 0)
    }
  }

  setFlash(intensity: number, color: number = 0xffffff): void {
    this.material.emissive.setHex(color)
    this.material.emissiveIntensity = intensity
  }
}
