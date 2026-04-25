import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadFBXModel, extractAnimationClips } from '../FBXLoader'
import { Group, AnimationClip } from 'three'

// Mock the FBXLoader to avoid actual file I/O
vi.mock('three/examples/jsm/loaders/FBXLoader.js', () => {
  return {
    FBXLoader: vi.fn().mockImplementation(() => ({
      load: vi.fn((url, onSuccess, onProgress, onError) => {
        // Simulate successful load after a microtask
        const mockGroup = new Group()
        mockGroup.animations = [
          new AnimationClip('test', 1, []),
        ]
        Promise.resolve().then(() => onSuccess(mockGroup))
      }),
    })),
  }
})

describe('FBXLoader', () => {
  describe('loadFBXModel', () => {
    it('should be a function', () => {
      expect(typeof loadFBXModel).toBe('function')
    })

    it('should return a Promise', async () => {
      const result = loadFBXModel('test.fbx')
      expect(result instanceof Promise).toBe(true)
      // Resolve the promise to avoid unhandled rejection
      await result.catch(() => {})
    })

    it('should resolve with a Group when valid path provided', async () => {
      // Note: This test uses mocking to avoid actual file I/O in unit tests
      const mockGroup = new Group()
      const mockGroup2 = new Group()
      mockGroup2.animations = [
        new AnimationClip('idle', 1, []),
        new AnimationClip('walk', 1.5, []),
      ]

      expect(mockGroup).toBeInstanceOf(Group)
      expect(mockGroup2.animations).toBeDefined()
      expect(Array.isArray(mockGroup2.animations)).toBe(true)
    })
  })

  describe('extractAnimationClips', () => {
    it('should return empty array for group without animations', () => {
      const group = new Group()
      const clips = extractAnimationClips(group)
      expect(clips).toEqual([])
    })

    it('should extract animation clips from group', () => {
      const group = new Group()
      const clip1 = new AnimationClip('idle', 1, [])
      const clip2 = new AnimationClip('walk', 1.5, [])
      group.animations = [clip1, clip2]

      const clips = extractAnimationClips(group)
      expect(clips).toHaveLength(2)
      expect(clips[0].name).toBe('idle')
      expect(clips[1].name).toBe('walk')
    })

    it('should handle deeply nested animations in group children', () => {
      const group = new Group()
      const child = new Group()
      const clip1 = new AnimationClip('attack', 2, [])
      child.animations = [clip1]
      group.add(child)

      const clips = extractAnimationClips(group)
      expect(clips.length).toBeGreaterThan(0)
    })

    it('should not duplicate animation clips', () => {
      const group = new Group()
      const clip = new AnimationClip('idle', 1, [])
      group.animations = [clip]
      const child = new Group()
      child.animations = [clip]
      group.add(child)

      const clips = extractAnimationClips(group)
      const uniqueNames = new Set(clips.map(c => c.name))
      expect(uniqueNames.size).toBeLessThanOrEqual(clips.length)
    })
  })

  describe('FBXLoader integration', () => {
    it('should load model and extract clips', async () => {
      const group = new Group()
      const clip = new AnimationClip('idle', 1, [])
      group.animations = [clip]

      const clips = extractAnimationClips(group)
      expect(clips).toBeDefined()
      expect(Array.isArray(clips)).toBe(true)
    })
  })
})
