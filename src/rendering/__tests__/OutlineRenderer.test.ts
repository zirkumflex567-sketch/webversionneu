import { describe, it, expect } from 'vitest'
import { OutlineRenderer } from '../OutlineRenderer'
import { Scene, Mesh, BoxGeometry, Material } from 'three'

describe('OutlineRenderer', () => {
  it('should create outlines for scene meshes', () => {
    const scene = new Scene()
    const mesh = new Mesh(new BoxGeometry(1, 1, 1))
    scene.add(mesh)

    const outlineRenderer = new OutlineRenderer(scene)
    expect(outlineRenderer.scene).toBeDefined()
  })

  it('should track outline width', () => {
    const scene = new Scene()
    const outlineRenderer = new OutlineRenderer(scene, { outlineWidth: 0.03 })
    expect(outlineRenderer.outlineWidth).toBe(0.03)
  })
})
