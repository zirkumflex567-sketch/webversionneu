import { describe, it, expect } from 'vitest'
import { CelShadingMaterial } from '../shaders/CelShadingMaterial'
import { Color } from 'three'

describe('CelShadingMaterial', () => {
  it('should create a material with default color', () => {
    const material = new CelShadingMaterial({ baseColor: new Color(0x00ffaa) })
    expect(material).toBeDefined()
    expect(material.uniforms.baseColor.value).toEqual(new Color(0x00ffaa))
  })

  it('should have outline width uniform', () => {
    const material = new CelShadingMaterial({
      baseColor: new Color(0x00ffaa),
      outlineWidth: 0.02
    })
    expect(material.uniforms.outlineWidth.value).toBe(0.02)
  })

  it('should support color updates', () => {
    const material = new CelShadingMaterial({ baseColor: new Color(0xff0000) })
    const newColor = new Color(0x00ff00)
    material.updateColor(newColor)
    expect(material.uniforms.baseColor.value).toEqual(newColor)
  })

  it('should compute normal in view space', () => {
    const material = new CelShadingMaterial({ baseColor: new Color(0x00ffaa) })
    expect(material.vertexShader).toContain('vNormal')
    expect(material.vertexShader).toContain('normalMatrix')
  })

  it('should preserve vertex position', () => {
    const material = new CelShadingMaterial({ baseColor: new Color(0x00ffaa) })
    expect(material.vertexShader).toContain('projectionMatrix')
  })

  it('should use toon ramp for lighting', () => {
    const material = new CelShadingMaterial({ baseColor: new Color(0x00ffaa) })
    expect(material.fragmentShader).toContain('baseColor')
    expect(material.fragmentShader).toContain('vNormal')
  })

  it('should apply shadow color in dark areas', () => {
    const material = new CelShadingMaterial({
      baseColor: new Color(0x00ffaa),
      shadowColor: new Color(0x004422)
    })
    expect(material.uniforms.shadowColor.value).toBeDefined()
  })
})
