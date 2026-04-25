import * as THREE from 'three'

export interface ParticleMaterialConfig {
  blending?: 'additive' | 'transparent'
  sizeAttenuation?: boolean
  colorMultiplier?: THREE.Color
}

export class ParticleMaterial extends THREE.ShaderMaterial {
  constructor(config: ParticleMaterialConfig = {}) {
    const blending = config.blending === 'additive' ? THREE.AdditiveBlending : THREE.NormalBlending

    super({
      blending,
      transparent: true,
      vertexColors: true,
      uniforms: {
        scale: { value: 1 },
        colorMultiplier: { value: config.colorMultiplier || new THREE.Color(0xffffff) },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D texture;
        uniform vec3 colorMultiplier;
        varying vec3 vColor;

        void main() {
          // Circular particle shape using texture
          vec2 uv = gl_PointCoord;
          float dist = distance(uv, vec2(0.5, 0.5));

          // Soft edge for smoother particles
          float alpha = 1.0 - smoothstep(0.4, 0.5, dist);

          // Apply vertex color and multiplier
          vec3 finalColor = vColor * colorMultiplier;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    })
  }
}
