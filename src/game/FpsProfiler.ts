/**
 * FpsProfiler — lightweight runtime frame-time + entity-count sampler.
 *
 * Integration:
 *   - Call `FpsProfiler.beginFrame()` at the top of the game loop.
 *   - Call `FpsProfiler.endFrame(counts)` at the bottom with entity counts.
 *   - The instance is auto-exposed on `globalThis.__FPS_PROFILE__` for
 *     Playwright / DevTools scraping.
 *
 * Design:
 *   - Ring-buffer of N frame durations (ms) for percentile computation.
 *   - Long-run cumulative stats (since last reset) for full-session reports.
 *   - Zero allocations per frame (reuses typed array).
 */

export interface FrameCounts {
  enemies: number
  projectiles: number
  scraps: number
  toxicZones: number
  sentries: number
  hordeWave: number
}

export interface FpsStats {
  sampleCount: number
  windowMs: number
  avgMs: number
  p50Ms: number
  p95Ms: number
  p99Ms: number
  maxMs: number
  avgFps: number
  minFps: number
  peakCounts: FrameCounts
  lastCounts: FrameCounts
  startedAt: number
  durationMs: number
}

const RING_SIZE = 600 // ~10 s at 60 fps

/** Frames slower than this are recorded as spike events for post-hoc analysis. */
const SPIKE_THRESHOLD_MS = 30
/** Max number of spike events retained (FIFO). */
const SPIKE_LOG_SIZE = 128

export interface SpikeEvent {
  tMs: number         // ms since profiler reset
  dtMs: number        // frame duration
  enemies: number
  projectiles: number
  scraps: number
  toxicZones: number
  sentries: number
  /** Delta vs. previous recorded frame's counts. */
  deltaEnemies: number
  deltaProjectiles: number
  deltaScraps: number
}

const ZERO_COUNTS: FrameCounts = {
  enemies: 0, projectiles: 0, scraps: 0,
  toxicZones: 0, sentries: 0, hordeWave: 0,
}

class FpsProfilerImpl {
  private readonly ring = new Float32Array(RING_SIZE)
  private ringHead = 0
  private ringCount = 0

  private lastTimestamp = 0
  private startedAt = 0
  private totalFrames = 0
  private totalMs = 0
  private maxMs = 0

  private peak: FrameCounts = { ...ZERO_COUNTS }
  private last: FrameCounts = { ...ZERO_COUNTS }
  private prev: FrameCounts = { ...ZERO_COUNTS }
  private pendingDtMs = 0
  private readonly spikes: SpikeEvent[] = []

  reset(): void {
    this.ringHead = 0
    this.ringCount = 0
    this.lastTimestamp = 0
    this.startedAt = typeof performance !== 'undefined' ? performance.now() : Date.now()
    this.totalFrames = 0
    this.totalMs = 0
    this.maxMs = 0
    this.peak = { ...ZERO_COUNTS }
    this.last = { ...ZERO_COUNTS }
    this.prev = { ...ZERO_COUNTS }
    this.pendingDtMs = 0
    this.spikes.length = 0
  }

  beginFrame(): void {
    const ts = typeof performance !== 'undefined' ? performance.now() : Date.now()
    if (this.lastTimestamp === 0) {
      this.lastTimestamp = ts
      if (this.startedAt === 0) this.startedAt = ts
      return
    }
    const dt = ts - this.lastTimestamp
    this.lastTimestamp = ts

    // Record frame duration
    this.ring[this.ringHead] = dt
    this.ringHead = (this.ringHead + 1) % RING_SIZE
    if (this.ringCount < RING_SIZE) this.ringCount += 1

    this.totalFrames += 1
    this.totalMs += dt
    if (dt > this.maxMs) this.maxMs = dt
    this.pendingDtMs = dt
  }

  endFrame(counts: FrameCounts): void {
    // Record spike if the frame was unusually long.
    if (this.pendingDtMs >= SPIKE_THRESHOLD_MS) {
      const spike: SpikeEvent = {
        tMs: this.lastTimestamp - this.startedAt,
        dtMs: this.pendingDtMs,
        enemies: counts.enemies,
        projectiles: counts.projectiles,
        scraps: counts.scraps,
        toxicZones: counts.toxicZones,
        sentries: counts.sentries,
        deltaEnemies: counts.enemies - this.prev.enemies,
        deltaProjectiles: counts.projectiles - this.prev.projectiles,
        deltaScraps: counts.scraps - this.prev.scraps,
      }
      if (this.spikes.length >= SPIKE_LOG_SIZE) this.spikes.shift()
      this.spikes.push(spike)
    }
    this.prev = counts
    this.last = counts
    if (counts.enemies    > this.peak.enemies)    this.peak.enemies    = counts.enemies
    if (counts.projectiles > this.peak.projectiles) this.peak.projectiles = counts.projectiles
    if (counts.scraps     > this.peak.scraps)     this.peak.scraps     = counts.scraps
    if (counts.toxicZones > this.peak.toxicZones) this.peak.toxicZones = counts.toxicZones
    if (counts.sentries   > this.peak.sentries)   this.peak.sentries   = counts.sentries
    if (counts.hordeWave  > this.peak.hordeWave)  this.peak.hordeWave  = counts.hordeWave
  }

  getStats(): FpsStats {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
    const samples = this.ringCount
    if (samples === 0) {
      return {
        sampleCount: 0, windowMs: 0,
        avgMs: 0, p50Ms: 0, p95Ms: 0, p99Ms: 0, maxMs: 0,
        avgFps: 0, minFps: 0,
        peakCounts: { ...this.peak }, lastCounts: { ...this.last },
        startedAt: this.startedAt, durationMs: Math.max(0, now - this.startedAt),
      }
    }
    const sorted = new Float32Array(samples)
    for (let i = 0; i < samples; i++) sorted[i] = this.ring[i]
    sorted.sort()

    let sum = 0
    for (let i = 0; i < samples; i++) sum += sorted[i]
    const avgMs = sum / samples
    const p = (q: number): number => sorted[Math.min(samples - 1, Math.floor(samples * q))]
    const maxRing = sorted[samples - 1]

    return {
      sampleCount: samples,
      windowMs: sum,
      avgMs,
      p50Ms: p(0.50),
      p95Ms: p(0.95),
      p99Ms: p(0.99),
      maxMs: Math.max(this.maxMs, maxRing),
      avgFps: 1000 / avgMs,
      minFps: 1000 / maxRing,
      peakCounts: { ...this.peak },
      lastCounts: { ...this.last },
      startedAt: this.startedAt,
      durationMs: Math.max(0, now - this.startedAt),
    }
  }

  /** Full-session dump suitable for saving to disk. */
  dump(): Record<string, unknown> {
    const stats = this.getStats()
    return {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      session: {
        startedAt: stats.startedAt,
        durationMs: stats.durationMs,
        totalFrames: this.totalFrames,
        cumulativeAvgMs: this.totalFrames > 0 ? this.totalMs / this.totalFrames : 0,
        cumulativeAvgFps: this.totalFrames > 0 ? (this.totalFrames / this.totalMs) * 1000 : 0,
        cumulativeMaxMs: this.maxMs,
      },
      rolling: stats,
      spikes: this.spikes.slice(),
      spikeThresholdMs: SPIKE_THRESHOLD_MS,
    }
  }
}

export const FpsProfiler = new FpsProfilerImpl()
FpsProfiler.reset()

// Dev / Playwright hook — expose for headed profiling runs.
if (typeof globalThis !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).__FPS_PROFILE__ = FpsProfiler
}
