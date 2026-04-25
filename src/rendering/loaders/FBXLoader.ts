import { Group, AnimationClip, Mesh } from 'three'

// Type definition for FBX loaded model
export interface FBXModel {
  model: Group
  clips: AnimationClip[]
}

/**
 * Load an FBX model from a URL or file path.
 * Returns a promise that resolves to a Three.js Group with animations extracted.
 *
 * Note: Actual FBXLoader is loaded dynamically to avoid hard dependency.
 * In production, three/examples/jsm/loaders/FBXLoader.js is used.
 */
export async function loadFBXModel(url: string): Promise<Group> {
  // Dynamic import to avoid circular dependencies and hard Three.js example requirement
  const { FBXLoader: ThreeFBXLoader } = await import(
    'three/examples/jsm/loaders/FBXLoader.js'
  )

  return new Promise((resolve, reject) => {
    const loader = new ThreeFBXLoader()
    loader.load(
      url,
      (object: Group) => {
        resolve(object)
      },
      undefined,
      (error: unknown) => {
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    )
  })
}

/**
 * Extract all animation clips from a Group and its children.
 * Recursively searches the hierarchy and collects unique animation clips.
 */
export function extractAnimationClips(group: Group): AnimationClip[] {
  const clips: AnimationClip[] = []
  const seenNames = new Set<string>()

  function traverse(object: Group | Mesh) {
    // Extract clips from current object
    if ('animations' in object && Array.isArray(object.animations)) {
      for (const clip of object.animations) {
        if (!seenNames.has(clip.name)) {
          clips.push(clip)
          seenNames.add(clip.name)
        }
      }
    }

    // Traverse children
    if ('children' in object) {
      for (const child of object.children) {
        traverse(child as Group | Mesh)
      }
    }
  }

  traverse(group)
  return clips
}

/**
 * Load an FBX model and extract animation clips in one operation.
 */
export async function loadFBXModelWithClips(url: string): Promise<FBXModel> {
  const model = await loadFBXModel(url)
  const clips = extractAnimationClips(model)
  return { model, clips }
}
