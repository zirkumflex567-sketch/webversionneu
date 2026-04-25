import * as THREE from 'three'
import { Enemy } from './Enemy'

export class HeavyEnemy extends Enemy {
  constructor(startPosition: THREE.Vector3) {
    super(startPosition, 'heavy')
    
    // Stats specific to the Heavy Enemy
    this.hp = 120
    this.maxHp = 120
    this.speed = 4
    this.damage = 15
    this.radius = 1.8
    this.scrapValue = 30
  }
}
