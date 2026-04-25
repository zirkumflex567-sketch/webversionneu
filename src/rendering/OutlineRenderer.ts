import { Scene, Mesh, Color, MeshBasicMaterial, BackSide } from 'three'
import { CelShadingMaterial } from './shaders/CelShadingMaterial'

interface OutlineConfig {
  outlineWidth?: number
  outlineColor?: Color
}

export class OutlineRenderer {
  scene: Scene
  outlineWidth: number
  outlineColor: Color

  constructor(scene: Scene, config?: OutlineConfig) {
    this.scene = scene
    this.outlineWidth = config?.outlineWidth ?? 0.02
    this.outlineColor = config?.outlineColor ?? new Color(0x000000)
    this.createOutlines()
  }

  private createOutlines() {
    this.scene.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof CelShadingMaterial) {
        // Create outline geometry by duplicating and scaling
        const outlineMesh = new Mesh(
          child.geometry,
          new MeshBasicMaterial({
            color: this.outlineColor,
            side: BackSide,
          })
        )
        outlineMesh.scale.multiplyScalar(1 + this.outlineWidth)
        child.add(outlineMesh)
      }
    })
  }
}
