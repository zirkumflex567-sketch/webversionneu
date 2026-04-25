import { ShaderMaterial, Color, IUniform } from 'three'
import celVertexShader from './cel.vert?raw'
import celFragmentShader from './cel.frag?raw'

interface CelShadingConfig {
  baseColor: Color
  outlineWidth?: number
  lightColor?: Color
  shadowColor?: Color
}

export class CelShadingMaterial extends ShaderMaterial {
  uniforms: Record<string, IUniform>

  constructor(config: CelShadingConfig) {
    const uniforms = {
      baseColor: { value: config.baseColor },
      outlineWidth: { value: config.outlineWidth ?? 0.02 },
      lightColor: { value: config.lightColor ?? new Color(0xffffff) },
      shadowColor: { value: config.shadowColor ?? new Color(0x000000) },
    }

    super({
      uniforms,
      vertexShader: celVertexShader,
      fragmentShader: celFragmentShader,
    })

    this.uniforms = uniforms
  }

  updateColor(color: Color) {
    this.uniforms.baseColor.value = color
  }
}
