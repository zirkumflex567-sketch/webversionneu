import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AnimationManager } from '../AnimationManager'
import { Mesh, AnimationMixer, AnimationClip, LoopOnce, LoopRepeat } from 'three'

describe('AnimationManager', () => {
  let mesh: Mesh
  let manager: AnimationManager

  beforeEach(() => {
    mesh = new Mesh()
    manager = new AnimationManager(mesh)
  })

  describe('constructor', () => {
    it('should create AnimationMixer for skeletal mesh', () => {
      expect(manager.mixer).toBeInstanceOf(AnimationMixer)
    })

    it('should extract clips from mesh.animations on construction', () => {
      const clip1 = new AnimationClip('idle', 1, [])
      const clip2 = new AnimationClip('walk', 2, [])
      const meshWithClips = new Mesh()
      meshWithClips.animations = [clip1, clip2]

      const mgr = new AnimationManager(meshWithClips)
      expect(mgr.getClips()).toHaveLength(2)
      expect(mgr.getClips()[0].name).toBe('idle')
    })

    it('should initialize with empty clips if mesh has no animations', () => {
      expect(manager.getClips()).toEqual([])
    })
  })

  describe('play()', () => {
    it('should return null when clip not found', () => {
      const result = manager.play('nonexistent')
      expect(result).toBeNull()
    })

    it('should play animation when clip exists', () => {
      const clip = new AnimationClip('idle', 1, [])
      const meshWithClip = new Mesh()
      meshWithClip.animations = [clip]
      const mgr = new AnimationManager(meshWithClip)

      const action = mgr.play('idle')
      expect(action).not.toBeNull()
      expect(mgr.currentClip).toBe('idle')
    })

    it('should stop previous action before playing new one', () => {
      const clip1 = new AnimationClip('idle', 1, [])
      const clip2 = new AnimationClip('walk', 2, [])
      const meshWithClips = new Mesh()
      meshWithClips.animations = [clip1, clip2]
      const mgr = new AnimationManager(meshWithClips)

      const action1 = mgr.play('idle')
      expect(action1).not.toBeNull()
      const stopSpy1 = vi.spyOn(action1!, 'stop')

      const action2 = mgr.play('walk')
      expect(stopSpy1).toHaveBeenCalled()
      expect(mgr.currentClip).toBe('walk')
    })

    it('should apply loop configuration to animation action', () => {
      const clip = new AnimationClip('idle', 1, [])
      const meshWithClip = new Mesh()
      meshWithClip.animations = [clip]

      // With loop enabled (default)
      const mgrLoop = new AnimationManager(meshWithClip, { loop: true })
      const actionLoop = mgrLoop.play('idle')
      expect(actionLoop?.loop).toBe(LoopRepeat)

      // With loop disabled
      const mgrNoLoop = new AnimationManager(meshWithClip, { loop: false })
      const actionNoLoop = mgrNoLoop.play('idle')
      expect(actionNoLoop?.loop).toBe(LoopOnce)
    })
  })

  describe('stop()', () => {
    it('should stop current animation', () => {
      const clip = new AnimationClip('idle', 1, [])
      const meshWithClip = new Mesh()
      meshWithClip.animations = [clip]
      const mgr = new AnimationManager(meshWithClip)

      mgr.play('idle')
      expect(mgr.currentClip).toBe('idle')

      mgr.stop()
      expect(mgr.currentClip).toBeNull()
      expect(mgr.currentAction).toBeNull()
    })

    it('should handle stop when no animation is playing', () => {
      expect(() => manager.stop()).not.toThrow()
      expect(manager.currentClip).toBeNull()
    })
  })

  describe('update()', () => {
    it('should update mixer with delta time', () => {
      const updateSpy = vi.spyOn(manager.mixer, 'update')
      manager.update(0.016)
      expect(updateSpy).toHaveBeenCalledWith(0.016)
    })

    it('should accept various delta time values', () => {
      const updateSpy = vi.spyOn(manager.mixer, 'update')
      manager.update(0.032)
      expect(updateSpy).toHaveBeenCalledWith(0.032)
    })
  })

  describe('dispose()', () => {
    it('should stop current action and clear state', () => {
      const clip = new AnimationClip('idle', 1, [])
      const meshWithClip = new Mesh()
      meshWithClip.animations = [clip]
      const mgr = new AnimationManager(meshWithClip)

      mgr.play('idle')
      mgr.dispose()

      expect(mgr.currentAction).toBeNull()
      expect(mgr.currentClip).toBeNull()
      expect(mgr.getClips()).toEqual([])
    })

    it('should uncache mixer root', () => {
      const uncacheSpy = vi.spyOn(manager.mixer, 'uncacheRoot')
      manager.dispose()
      expect(uncacheSpy).toHaveBeenCalled()
    })
  })

  describe('utility methods', () => {
    it('should return clips via getClips()', () => {
      const clip = new AnimationClip('idle', 1, [])
      const meshWithClip = new Mesh()
      meshWithClip.animations = [clip]
      const mgr = new AnimationManager(meshWithClip)

      expect(mgr.getClips()).toHaveLength(1)
      expect(mgr.getClips()[0].name).toBe('idle')
    })

    it('should set animation timeScale via setTimeScale()', () => {
      manager.setTimeScale(2.0)
      expect(manager.mixer.timeScale).toBe(2.0)
    })
  })
})
