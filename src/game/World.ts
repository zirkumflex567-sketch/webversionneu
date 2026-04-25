import * as THREE from 'three'
import { AssetManager } from './AssetManager'

/* ═══════════════════════════════════════════════════════════════════════
   Arena Bounds
   ═══════════════════════════════════════════════════════════════════════ */

export const ARENA_BOUNDS = {
  length: 480,
  width: 480,
  halfLength: 240,
  halfWidth: 240,
} as const

export function createWorld(scene: THREE.Scene, region: string = 'Graumarsch'): void {
  // ── Biome Configs ──
  const isGlassPlains = region === 'Sonnenglasweite'
  
  const skyColor = isGlassPlains ? 0xd4a373 : 0x2a2a3c
  const groundColor = isGlassPlains ? 0xe9c46a : 0x5c5c6e
  const fogDensity = isGlassPlains ? 0.003 : 0.005

  // ── Sky / fog ──
  scene.background = new THREE.Color(skyColor)
  scene.fog = new THREE.FogExp2(skyColor, fogDensity)

  // ── Lights ──
  const ambient = new THREE.AmbientLight(0xffffff, isGlassPlains ? 2.0 : 1.5)
  scene.add(ambient)

  const moonColor = isGlassPlains ? 0xffeedd : 0xcce0ff
  const moon = new THREE.DirectionalLight(moonColor, isGlassPlains ? 4.0 : 3.0)
  moon.position.set(-20, 40, -10)
  moon.castShadow = true
  moon.shadow.mapSize.set(2048, 2048)
  moon.shadow.camera.left = -50
  moon.shadow.camera.right = 50
  moon.shadow.camera.top = 50
  moon.shadow.camera.bottom = -50
  moon.shadow.camera.near = 1
  moon.shadow.camera.far = 100
  scene.add(moon)

  // Fill light from opposite side to soften harsh shadows
  const fill = new THREE.DirectionalLight(0xffeedd, 1.2)
  fill.position.set(20, 20, 30)
  scene.add(fill)

  // Arena-style point lights in corners — stronger and more colourful
  const addSpot = (x: number, z: number, color: number) => {
    const spot = new THREE.PointLight(color, isGlassPlains ? 600 : 400, 100)
    spot.position.set(x, 15, z)
    scene.add(spot)
  }
  addSpot(-35, -35, isGlassPlains ? 0x00ffff : 0xff5533)   // Cyan in Glass Plains
  addSpot(35, 35, isGlassPlains ? 0xffffff : 0x3399ff)     // White in Glass Plains
  addSpot(-35, 35, isGlassPlains ? 0x00ffff : 0xffcc00)    
  addSpot(35, -35, isGlassPlains ? 0xffffff : 0x00ffaa)    

  // ── Ground / Dirt ──
  const groundGeo = new THREE.PlaneGeometry(480, 480, 32, 32)
  
  // slightly displacing the ground vertices for rough terrain
  const posAttribute = groundGeo.attributes.position
  for (let i = 0; i < posAttribute.count; i++) {
    const z = posAttribute.getZ(i)
    if (Math.random() > 0.5) posAttribute.setZ(i, z + (Math.random() * 0.5 - 0.25))
  }
  groundGeo.computeVertexNormals()

  const tex = AssetManager.getInstance().getGroundTexture('asphalt')
  if (tex) {
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(32, 32) // Tiling for the 480x480 arena
  }

  const groundMat = new THREE.MeshStandardMaterial({
    color: groundColor,
    map: tex,
    roughness: isGlassPlains ? 0.3 : 0.85, 
    metalness: isGlassPlains ? 0.4 : 0.1
  })
  const ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // ── Arena Boundary Walls (Hex/Cyber style) ──
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a4a,
    roughness: 0.7,
    metalness: 0.6,
    emissive: new THREE.Color(0x220011),
    emissiveIntensity: 0.4
  })

  const wallHeight = 4
  const wallThick = 1

  // Outer Box
  const NWall = new THREE.Mesh(new THREE.BoxGeometry(ARENA_BOUNDS.length + 2, wallHeight, wallThick), wallMat)
  NWall.position.set(0, wallHeight/2, -ARENA_BOUNDS.halfWidth - 0.5)
  NWall.castShadow = true
  scene.add(NWall)

  const SWall = new THREE.Mesh(new THREE.BoxGeometry(ARENA_BOUNDS.length + 2, wallHeight, wallThick), wallMat)
  SWall.position.set(0, wallHeight/2, ARENA_BOUNDS.halfWidth + 0.5)
  SWall.castShadow = true
  scene.add(SWall)

  const EWall = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallHeight, ARENA_BOUNDS.width + 2), wallMat)
  EWall.position.set(ARENA_BOUNDS.halfLength + 0.5, wallHeight/2, 0)
  EWall.castShadow = true
  scene.add(EWall)

  const WWall = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallHeight, ARENA_BOUNDS.width + 2), wallMat)
  WWall.position.set(-ARENA_BOUNDS.halfLength - 0.5, wallHeight/2, 0)
  WWall.castShadow = true
  scene.add(WWall)

  // ── Scraps & Obstacles (Industrial Debris) ──
  const propTex = AssetManager.getInstance().getPropsTexture()
  const obstacleMat = new THREE.MeshStandardMaterial({
    color: 0x6b7280,
    roughness: 0.9,
    metalness: 0.2,
  })
  
  for (let i = 0; i < 150; i++) {
    // Random position avoiding direct center (spawn)
    let rx: number, rz: number
    do {
      rx = (Math.random() - 0.5) * (ARENA_BOUNDS.length - 12)
      rz = (Math.random() - 0.5) * (ARENA_BOUNDS.width - 12)
    } while (Math.abs(rx) < 12 && Math.abs(rz) < 12)

    if (propTex) {
      // Create a billboard sprite for the debris
      const spriteTex = propTex.clone()
      spriteTex.needsUpdate = true
      
      const cols = 4
      const rows = 3
      spriteTex.repeat.set(1/cols, 1/rows)
      
      const frameX = Math.floor(Math.random() * cols)
      const frameY = Math.floor(Math.random() * rows)
      spriteTex.offset.set(frameX / cols, frameY / rows)

      const mat = new THREE.SpriteMaterial({ 
        map: spriteTex,
        transparent: true,
        alphaTest: 0.5
      })
      const prop = new THREE.Sprite(mat)
      const scale = 2 + Math.random() * 3
      prop.scale.set(scale, scale, 1)
      prop.position.set(rx, scale/2, rz)
      scene.add(prop)
    } else {
      // Fallback to simple boxes if texture load fails
      const s = 1 + Math.random() * 2
      const obs = new THREE.Mesh(new THREE.BoxGeometry(s, s*2, s), obstacleMat)
      obs.position.set(rx, s, rz)
      obs.rotation.y = Math.random() * Math.PI
      obs.castShadow = true
      scene.add(obs)
    }
  }
}
