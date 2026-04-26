import * as THREE from 'three'
import { Vehicle } from './Vehicle'
import { useGameStore } from '../store'
import { AssetManager } from './AssetManager'
import { t } from '../i18n'

export class Scrap {
  readonly group = new THREE.Group()
  private sprite: THREE.Sprite
  public isCollected = false
  
  private value = 10
  private techValue = 0
  private readonly isLegendary: boolean
  private floatTime = 0

  constructor(startPos: THREE.Vector3, isLegendary = false, valueOverride?: number) {
    this.isLegendary = isLegendary
    this.value = valueOverride ?? (isLegendary ? 500 : 10)
    // GDD: Relic Tech is a rare drop from elite/boss encounters.
    this.techValue = isLegendary ? 1 : 0
    
    const tex = AssetManager.getInstance().getLootTexture()
    if (tex) {
      const spriteTex = tex.clone()
      spriteTex.needsUpdate = true
      spriteTex.repeat.set(0.25, 0.25)
      
      // Pick a random frame from the 4x4 sheet
      const frameX = Math.floor(Math.random() * 4)
      // Row 0 (top in image) = UV Y 0.75, Row 1 = 0.5, Row 2 = 0.25, Row 3 = 0
      spriteTex.offset.set(frameX * 0.25, isLegendary ? 0.5 : 0.75)

      const mat = new THREE.SpriteMaterial({ 
        map: spriteTex,
        transparent: true,
        color: isLegendary ? 0xffffff : 0x00ff88 // Slight tint
      })
      this.sprite = new THREE.Sprite(mat)
    } else {
      // Fallback: plain coloured sprite
      this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({ color: isLegendary ? 0xff0000 : 0x00ff88 }))
    }

    this.sprite.scale.set(1.5, 1.5, 1)
    if (isLegendary) this.sprite.scale.multiplyScalar(2.0)
    
    this.group.add(this.sprite)
    
    // Slight random offset from center
    const offset = new THREE.Vector3((Math.random() - 0.5), 0, (Math.random() - 0.5))
    if (isLegendary) {
      const locale = useGameStore.getState().locale
      useGameStore.getState().showCallout(t("callout.scrap.legendary", undefined, locale), 3000)
    }
    
    this.group.position.copy(startPos).add(offset)
    this.group.position.y = isLegendary ? 1.0 : 0.5
  }

  update(delta: number, vehicle: Vehicle): void {
    if (this.isCollected) return
    
    this.floatTime += delta
    this.sprite.position.y = Math.sin(this.floatTime * 3) * 0.3
    this.sprite.rotation.z = Math.sin(this.floatTime * 1.5) * 0.1 // Subtle tilt
    
    const state = useGameStore.getState()
    const pickupRadius = 2.5 * (1 + (state.modifiers.pickupRadius / 100))
    const dist = this.group.position.distanceTo(vehicle.position)
    if (dist < pickupRadius) {
      this.collect(state)
    }
  }

  debugCollect(): number {
    if (this.isCollected) return 0
    this.collect(useGameStore.getState())
    return this.value
  }

  private collect(state: ReturnType<typeof useGameStore.getState>): void {
    this.isCollected = true

    const prevLevel = state.level
    state.addScrapInRun(this.value)
    if (this.techValue > 0 || this.isLegendary) {
      state.addTechInRun(this.techValue || 1)
    }

    if (state.character === "marek") {
      const bonus = state.modifiers.shieldOnPickup || 5
      state.setMatchState({ shield: Math.min(state.maxShield, state.shield + bonus) })
    }

    const after = useGameStore.getState()
    if (after.level > prevLevel) {
      AssetManager.getInstance().playSound('levelup')
    }
  }
}
