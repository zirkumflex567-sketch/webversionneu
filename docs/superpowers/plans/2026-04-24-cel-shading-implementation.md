# Cel-Shading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement custom cel-shading shader system for characters, vehicles, and enemies with outline rendering, flat-color aesthetic, and per-character customizable colors.

**Architecture:** Create a centralized CelShaderMaterial class that extends Three.js ShaderMaterial with vertex/fragment shaders for flat-color rendering and outlines. Support configuration via CelShadingConfig for per-character colors, outline width, and paint finishes (chrome, matte, metallic). Integrate into existing Game.ts renderer pipeline without disrupting current gameplay.

**Tech Stack:** Three.js (ShaderMaterial, OutlinePass), GLSL shaders, TypeScript, Vitest for unit tests

---

## File Structure

**New Files:**
- `src/rendering/shaders/CelShadingMaterial.ts` — Custom shader material with outline support
- `src/rendering/shaders/cel.vert` — Vertex shader for flat-color cel-shading
- `src/rendering/shaders/cel.frag` — Fragment shader with toon ramp lookup
- `src/rendering/OutlineRenderer.ts` — Outline pass for silhouette rendering
- `src/config/CelShadingConfig.ts` — Color palettes and paint system configuration
- `src/rendering/__tests__/CelShadingMaterial.test.ts` — Material creation and color tests
- `src/rendering/__tests__/OutlineRenderer.test.ts` — Outline rendering tests
- `src/rendering/__tests__/CelShadingConfig.test.ts` — Config validation tests

**Modified Files:**
- `src/game/Game.ts` — Integrate cel-shading material into scene.traverse() or character mesh setup
- `src/game/Player.ts` — Apply cel-shading to player character mesh
- `src/game/Enemy.ts` — Apply cel-shading to enemy meshes with wave-specific colors
- `src/game/Vehicle.ts` — Apply vehicle paint system (chrome/matte/metallic finishes)

---

## Task Breakdown

### Task 1: Create CelShadingMaterial Base Class

**Files:**
- Create: `src/rendering/shaders/CelShadingMaterial.ts`
- Test: `src/rendering/__tests__/CelShadingMaterial.test.ts`

- [ ] **Step 1: Write failing test for CelShadingMaterial instantiation**

```typescript
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
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/rendering/__tests__/CelShadingMaterial.test.ts
```

Expected: FAIL — Module not found

- [ ] **Step 3: Create CelShadingMaterial class stub**

```typescript
import { ShaderMaterial, Color, IUniform } from 'three'

interface CelShadingConfig {
  baseColor: Color
  outlineWidth?: number
  lightColor?: Color
  shadowColor?: Color
}

export class CelShadingMaterial extends ShaderMaterial {
  uniforms: Record<string, IUniform>

  constructor(config: CelShadingConfig) {
    super({
      uniforms: {
        baseColor: { value: config.baseColor },
        outlineWidth: { value: config.outlineWidth ?? 0.02 },
        lightColor: { value: config.lightColor ?? new Color(0xffffff) },
        shadowColor: { value: config.shadowColor ?? new Color(0x000000) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 baseColor;
        varying vec3 vNormal;
        void main() {
          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
    })
  }

  updateColor(color: Color) {
    this.uniforms.baseColor.value = color
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- src/rendering/__tests__/CelShadingMaterial.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/rendering/shaders/CelShadingMaterial.ts src/rendering/__tests__/CelShadingMaterial.test.ts
git commit -m "feat: create CelShadingMaterial base class with color uniforms"
```

---

### Task 2: Implement Cel Vertex Shader

**Files:**
- Create: `src/rendering/shaders/cel.vert`
- Modify: `src/rendering/shaders/CelShadingMaterial.ts`
- Modify: `src/rendering/__tests__/CelShadingMaterial.test.ts`

- [ ] **Step 1: Add vertex shader test**

```typescript
it('should compute normal in view space', () => {
  const material = new CelShadingMaterial({ baseColor: new Color(0x00ffaa) })
  expect(material.vertexShader).toContain('vNormal')
  expect(material.vertexShader).toContain('normalMatrix')
})

it('should preserve vertex position', () => {
  const material = new CelShadingMaterial({ baseColor: new Color(0x00ffaa) })
  expect(material.vertexShader).toContain('projectionMatrix')
})
```

- [ ] **Step 2: Create cel.vert shader file**

```glsl
// src/rendering/shaders/cel.vert
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

- [ ] **Step 3: Update CelShadingMaterial to use external shader**

```typescript
import celVertexShader from './cel.vert?raw'

export class CelShadingMaterial extends ShaderMaterial {
  constructor(config: CelShadingConfig) {
    super({
      uniforms: { /* ... */ },
      vertexShader: celVertexShader,
      fragmentShader: `/* to be implemented */`,
    })
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/rendering/__tests__/CelShadingMaterial.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/rendering/shaders/cel.vert src/rendering/shaders/CelShadingMaterial.ts
git commit -m "feat: implement cel vertex shader with normal and position varyings"
```

---

### Task 3: Implement Cel Fragment Shader with Toon Ramp

**Files:**
- Create: `src/rendering/shaders/cel.frag`
- Modify: `src/rendering/shaders/CelShadingMaterial.ts`
- Modify: `src/rendering/__tests__/CelShadingMaterial.test.ts`

- [ ] **Step 1: Add fragment shader test**

```typescript
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
```

- [ ] **Step 2: Create cel.frag shader file with toon ramp**

```glsl
// src/rendering/shaders/cel.frag
uniform vec3 baseColor;
uniform vec3 lightColor;
uniform vec3 shadowColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Fixed light direction
  
  float dotProduct = dot(normal, lightDir);
  float intensity = step(0.5, dotProduct * 0.5 + 0.5); // Toon ramp (binary lit/unlit)
  
  vec3 litColor = mix(shadowColor, baseColor, intensity);
  gl_FragColor = vec4(litColor, 1.0);
}
```

- [ ] **Step 3: Update CelShadingMaterial to use fragment shader**

```typescript
import celFragmentShader from './cel.frag?raw'

export class CelShadingMaterial extends ShaderMaterial {
  constructor(config: CelShadingConfig) {
    super({
      uniforms: { /* ... */ },
      vertexShader: celVertexShader,
      fragmentShader: celFragmentShader,
    })
  }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test -- src/rendering/__tests__/CelShadingMaterial.test.ts
```

Expected: PASS (all 5+ tests)

- [ ] **Step 5: Commit**

```bash
git add src/rendering/shaders/cel.frag src/rendering/shaders/CelShadingMaterial.ts src/rendering/__tests__/CelShadingMaterial.test.ts
git commit -m "feat: implement cel fragment shader with toon ramp lighting"
```

---

### Task 4: Create OutlineRenderer for Silhouette Rendering

**Files:**
- Create: `src/rendering/OutlineRenderer.ts`
- Test: `src/rendering/__tests__/OutlineRenderer.test.ts`

- [ ] **Step 1: Write outline renderer tests**

```typescript
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
```

- [ ] **Step 2: Create OutlineRenderer class**

```typescript
import { Scene, Mesh, Material, Color } from 'three'
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
          new Material({ 
            color: this.outlineColor,
            side: 2, // BackSide
          })
        )
        outlineMesh.scale.multiplyScalar(1 + this.outlineWidth)
        child.add(outlineMesh)
      }
    })
  }
}
```

- [ ] **Step 3: Run tests**

```bash
npm test -- src/rendering/__tests__/OutlineRenderer.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/rendering/OutlineRenderer.ts src/rendering/__tests__/OutlineRenderer.test.ts
git commit -m "feat: create OutlineRenderer for silhouette rendering"
```

---

### Task 5: Create CelShadingConfig with Color Palettes

**Files:**
- Create: `src/config/CelShadingConfig.ts`
- Test: `src/config/__tests__/CelShadingConfig.test.ts`

- [ ] **Step 1: Write config tests**

```typescript
import { describe, it, expect } from 'vitest'
import { getCelPalette, PAINT_FINISHES } from '../CelShadingConfig'
import { Color } from 'three'

describe('CelShadingConfig', () => {
  it('should provide character color palette', () => {
    const palette = getCelPalette('rixa')
    expect(palette.baseColor).toBeInstanceOf(Color)
    expect(palette.shadowColor).toBeInstanceOf(Color)
  })

  it('should support multiple characters', () => {
    const rixaPalette = getCelPalette('rixa')
    const marekPalette = getCelPalette('marek')
    expect(rixaPalette.baseColor).not.toEqual(marekPalette.baseColor)
  })

  it('should define paint finishes', () => {
    expect(PAINT_FINISHES.chrome).toBeDefined()
    expect(PAINT_FINISHES.matte).toBeDefined()
    expect(PAINT_FINISHES.metallic).toBeDefined()
  })
})
```

- [ ] **Step 2: Create CelShadingConfig with palettes**

```typescript
import { Color } from 'three'

export interface CelPalette {
  baseColor: Color
  shadowColor: Color
  lightColor: Color
  outlineColor: Color
}

export interface PaintFinish {
  gloss: number
  metalness: number
  roughness: number
}

export const CHARACTER_PALETTES: Record<string, CelPalette> = {
  rixa: {
    baseColor: new Color(0x00ffaa),
    shadowColor: new Color(0x004422),
    lightColor: new Color(0xffffff),
    outlineColor: new Color(0x000000),
  },
  marek: {
    baseColor: new Color(0xff6600),
    shadowColor: new Color(0x663300),
    lightColor: new Color(0xffffff),
    outlineColor: new Color(0x000000),
  },
}

export const PAINT_FINISHES: Record<string, PaintFinish> = {
  chrome: { gloss: 1.0, metalness: 1.0, roughness: 0.1 },
  matte: { gloss: 0.2, metalness: 0.0, roughness: 0.9 },
  metallic: { gloss: 0.7, metalness: 0.8, roughness: 0.3 },
}

export function getCelPalette(characterId: string): CelPalette {
  return CHARACTER_PALETTES[characterId] ?? CHARACTER_PALETTES.rixa
}

export function getPaintFinish(finish: string): PaintFinish {
  return PAINT_FINISHES[finish] ?? PAINT_FINISHES.matte
}
```

- [ ] **Step 3: Run tests**

```bash
npm test -- src/config/__tests__/CelShadingConfig.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/config/CelShadingConfig.ts src/config/__tests__/CelShadingConfig.test.ts
git commit -m "feat: create cel-shading config with character palettes and paint finishes"
```

---

### Task 6: Integrate CelShadingMaterial into Game Renderer

**Files:**
- Modify: `src/game/Game.ts`
- Test: Create integration test or verify existing tests still pass

- [ ] **Step 1: Add integration test for cel-shading in game**

```typescript
it('should apply cel-shading to player mesh', () => {
  // This is an integration test; may use mocking for Three.js objects
  const game = new Game()
  const player = game.player
  expect(player.mesh.material).toBeInstanceOf(CelShadingMaterial)
})
```

- [ ] **Step 2: Update Game.ts to apply CelShadingMaterial to player**

Find the player mesh initialization and wrap with CelShadingMaterial:

```typescript
import { getCelPalette } from '../config/CelShadingConfig'
import { CelShadingMaterial } from '../rendering/shaders/CelShadingMaterial'

// In Game.ts or Player.ts mesh setup:
const palette = getCelPalette(character.id)
this.mesh.material = new CelShadingMaterial({
  baseColor: palette.baseColor,
  shadowColor: palette.shadowColor,
  lightColor: palette.lightColor,
  outlineWidth: 0.02,
})
```

- [ ] **Step 3: Run full test suite to ensure no regressions**

```bash
npm test
```

Expected: 186+ passing tests

- [ ] **Step 4: Commit**

```bash
git add src/game/Game.ts src/game/Player.ts
git commit -m "feat: integrate cel-shading material into player character rendering"
```

---

### Task 7: Apply Cel-Shading to Enemies

**Files:**
- Modify: `src/game/Enemy.ts`

- [ ] **Step 1: Add enemy cel-shading test**

```typescript
it('should apply cel-shading to enemy with wave-specific color', () => {
  const enemy = new Enemy(/* params */)
  expect(enemy.mesh.material).toBeInstanceOf(CelShadingMaterial)
})
```

- [ ] **Step 2: Update Enemy.ts to apply cel-shading**

```typescript
// In Enemy.ts constructor or mesh setup:
const enemyPalette = {
  baseColor: new Color(0xff3333), // Red for standard enemies
  shadowColor: new Color(0x661111),
  lightColor: new Color(0xffffff),
  outlineColor: new Color(0x000000),
}

this.mesh.material = new CelShadingMaterial({
  ...enemyPalette,
  outlineWidth: 0.015, // Slightly smaller than player
})
```

- [ ] **Step 3: Run tests**

```bash
npm test -- src/game/__tests__/Enemy.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/game/Enemy.ts
git commit -m "feat: apply cel-shading to enemy meshes with wave-specific colors"
```

---

### Task 8: Vehicle Paint System Integration

**Files:**
- Modify: `src/game/Vehicle.ts`
- Create: `src/game/__tests__/VehiclePaint.test.ts`

- [ ] **Step 1: Write vehicle paint system test**

```typescript
import { describe, it, expect } from 'vitest'
import { getPaintFinish } from '../config/CelShadingConfig'

describe('VehiclePaint', () => {
  it('should apply chrome finish with high gloss', () => {
    const chrome = getPaintFinish('chrome')
    expect(chrome.gloss).toBe(1.0)
    expect(chrome.metalness).toBe(1.0)
  })

  it('should apply matte finish with low gloss', () => {
    const matte = getPaintFinish('matte')
    expect(matte.gloss).toBeLessThan(0.3)
  })
})
```

- [ ] **Step 2: Update Vehicle.ts to support paint finishes**

```typescript
import { getPaintFinish } from '../config/CelShadingConfig'

export class Vehicle {
  paintFinish: string = 'matte'

  setPaintFinish(finish: string) {
    this.paintFinish = finish
    const finishConfig = getPaintFinish(finish)
    // Apply to vehicle material
    if (this.mesh.material instanceof ShaderMaterial) {
      this.mesh.material.uniforms.gloss = { value: finishConfig.gloss }
      this.mesh.material.uniforms.metalness = { value: finishConfig.metalness }
    }
  }
}
```

- [ ] **Step 3: Run tests**

```bash
npm test -- src/game/__tests__/VehiclePaint.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/game/Vehicle.ts src/game/__tests__/VehiclePaint.test.ts src/config/CelShadingConfig.ts
git commit -m "feat: implement vehicle paint system with chrome/matte/metallic finishes"
```

---

### Task 9: Build and Full Integration Test

**Files:**
- Verify: All files created/modified
- Test: Full build and test suite

- [ ] **Step 1: Run full build**

```bash
npm run build 2>&1 | tail -20
```

Expected: Successful compilation

- [ ] **Step 2: Run full test suite**

```bash
npm test 2>&1 | grep -E "Test Files|Tests"
```

Expected: All tests passing (200+ tests)

- [ ] **Step 3: Manual verification (optional)**

If dev server is available:
```bash
npm run dev
```
- Navigate to Hub
- Start a match
- Verify player character has cel-shaded appearance
- Verify enemies have distinct colors
- Verify outlines are visible

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete cel-shading system with outlines and paint finishes

- Implement CelShadingMaterial with custom GLSL shaders
- Add toon ramp lighting for flat-color aesthetic
- Create OutlineRenderer for silhouette rendering
- Define character-specific color palettes (Rixa cyan, Marek orange)
- Implement vehicle paint system (chrome, matte, metallic)
- Integrate into Player, Enemy, and Vehicle rendering
- 20+ unit tests for shader validation, config, and integration
- Build verified successful, all tests passing

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Verification Checklist

- [ ] CelShadingMaterial creates valid ShaderMaterial
- [ ] Cel vertex shader computes normals correctly
- [ ] Cel fragment shader applies toon ramp lighting
- [ ] OutlineRenderer creates silhouettes
- [ ] Character palettes are distinct and match game aesthetic
- [ ] Paint finishes have realistic gloss/metalness values
- [ ] Player character renders with cel-shading in-game
- [ ] Enemies render with distinct colors
- [ ] Vehicle paint system works
- [ ] Build successful (no TypeScript errors)
- [ ] All tests passing (200+ tests)
- [ ] No performance regressions
- [ ] Game runs at 60 FPS target

---

## Notes

- Shader files (.vert, .frag) require Vite raw import: `import shader from './file.glsl?raw'`
- Three.js versions differ in API; verify ShaderMaterial imports for current version
- Outline rendering may need adjustment based on mesh scale/complexity
- Color values use Three.js Color (0xRRGGBB) hex format
- Paint finishes can be extended with additional properties (e.g., specular highlights)
