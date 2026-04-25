export class PerformanceMonitor {
  private frameTimes: number[] = []
  private readonly maxSamples = 120
  private _currentFPS = 60
  private _isDropping = false
  private _particleCount = 0

  get currentFPS(): number {
    return this._currentFPS
  }

  get isDropping(): boolean {
    return this._isDropping
  }

  get particleCount(): number {
    return this._particleCount
  }

  recordFrame(frameTimeMs: number): void {
    if (!Number.isFinite(frameTimeMs) || frameTimeMs <= 0) return

    this.frameTimes.push(frameTimeMs)
    if (this.frameTimes.length > this.maxSamples) {
      this.frameTimes.shift()
    }

    const avg = this.frameTimes.reduce((sum, v) => sum + v, 0) / this.frameTimes.length
    this._currentFPS = Math.max(1, 1000 / avg)

    // Treat <55 FPS as frame dropping for adaptive quality decisions
    this._isDropping = this._currentFPS < 55
  }

  recordParticles(activeParticles: number): void {
    this._particleCount = Math.max(0, Math.floor(activeParticles || 0))

    // If particle pressure is high, bias toward dropping=true to trigger stress mode.
    if (this._particleCount > 900) {
      this._isDropping = true
    }
  }
}
