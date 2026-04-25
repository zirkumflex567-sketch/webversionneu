import { Object3D, AnimationMixer, AnimationAction, AnimationClip, LoopOnce, LoopRepeat } from 'three'

export interface AnimationConfig {
  timeScale?: number
  loop?: boolean
}

export class AnimationManager {
  mixer: AnimationMixer
  currentAction: AnimationAction | null = null
  currentClip: string | null = null
  clips: AnimationClip[] = []
  config: AnimationConfig

  constructor(mesh: Object3D & { animations?: AnimationClip[] }, config: AnimationConfig = {}) {
    this.mixer = new AnimationMixer(mesh)
    this.config = { timeScale: 1.0, loop: true, ...config }
    this.mixer.timeScale = this.config.timeScale || 1.0

    // Extract clips from mesh if available
    if (mesh.animations && mesh.animations.length > 0) {
      this.clips = mesh.animations
    }
  }

  play(clipName: string): AnimationAction | null {
    const clip = AnimationClip.findByName(this.clips, clipName)
    if (!clip) return null

    // Stop current action if any
    if (this.currentAction) {
      this.currentAction.stop()
    }

    this.currentAction = this.mixer.clipAction(clip)
    this.currentAction.setLoop(this.config.loop ? LoopRepeat : LoopOnce, this.config.loop ? Infinity : 1)
    this.currentAction.play()
    this.currentClip = clipName
    return this.currentAction
  }

  stop(): void {
    if (this.currentAction) {
      this.currentAction.stop()
      this.currentAction = null
    }
    this.currentClip = null
  }

  update(deltaTime: number): void {
    this.mixer.update(deltaTime)
  }

  dispose(): void {
    if (this.currentAction) {
      this.currentAction.stop()
      this.currentAction = null
    }
    this.mixer.uncacheRoot(this.mixer.getRoot())
    this.clips = []
    this.currentClip = null
  }

  getClips(): AnimationClip[] {
    return this.clips
  }

  setTimeScale(scale: number): void {
    this.mixer.timeScale = scale
  }
}
