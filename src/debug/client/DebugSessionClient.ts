import type { DebugEventInput, DebugSeverity } from '../types'
import { buildAuthApiBase } from '../../auth/authUrl'

const API_BASE = buildAuthApiBase({
  explicitApiUrl: process.env.NEXT_PUBLIC_API_URL,
  explicitBasePath: process.env.NEXT_PUBLIC_BASE_PATH,
})

export interface RuntimeSnapshot {
  phase?: string
  wave?: number
  health?: number
  score?: unknown
  telemetry?: unknown
  runtime?: unknown
}

export class DebugSessionClient {
  private readonly token: string
  private sessionId: string | null = null
  private sessionStartMs = 0
  private pauseStartedAt = 0
  private pausedDurationMs = 0
  private flushTimer: ReturnType<typeof setInterval> | null = null
  private eventsBuffer: DebugEventInput[] = []

  constructor(token: string) {
    this.token = token
  }

  get id(): string | null {
    return this.sessionId
  }

  get running(): boolean {
    return Boolean(this.sessionId)
  }

  getTimestampMs(): number {
    if (!this.sessionStartMs) return 0
    const base = Date.now() - this.sessionStartMs - this.pausedDurationMs
    return Math.max(0, base)
  }

  async start(meta?: Record<string, unknown>): Promise<string> {
    const res = await fetch(`${API_BASE}/debug/session/start`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        appVersion: 'dev',
        buildId: 'local',
        userAgent: navigator.userAgent,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        ...meta,
      }),
    })

    if (!res.ok) throw new Error(await res.text())

    const data = (await res.json()) as { sessionId: string }
    this.sessionId = data.sessionId
    this.sessionStartMs = Date.now()
    this.pausedDurationMs = 0
    this.pauseStartedAt = 0
    this.startFlushLoop()
    return data.sessionId
  }

  async pause(): Promise<void> {
    if (!this.sessionId) return
    this.pauseStartedAt = Date.now()
    await fetch(`${API_BASE}/debug/session/${this.sessionId}/pause`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ timestampMs: this.getTimestampMs() }),
    })
  }

  async resume(): Promise<void> {
    if (!this.sessionId) return
    if (this.pauseStartedAt > 0) {
      this.pausedDurationMs += Date.now() - this.pauseStartedAt
      this.pauseStartedAt = 0
    }

    await fetch(`${API_BASE}/debug/session/${this.sessionId}/resume`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ timestampMs: this.getTimestampMs() }),
    })
  }

  queueEvent(event: Omit<DebugEventInput, 'timestampMs' | 'stateSnapshot'> & { timestampMs?: number; stateSnapshot?: Record<string, unknown> }): void {
    if (!this.sessionId) return
    this.eventsBuffer.push({
      ...event,
      timestampMs: event.timestampMs ?? this.getTimestampMs(),
    })
  }

  async flush(): Promise<void> {
    if (!this.sessionId || this.eventsBuffer.length === 0) return

    const copy = [...this.eventsBuffer]
    this.eventsBuffer = []

    try {
      const res = await fetch(`${API_BASE}/debug/session/${this.sessionId}/events/batch`, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({ events: copy }),
      })

      if (!res.ok) {
        this.eventsBuffer = [...copy, ...this.eventsBuffer]
      }
    } catch {
      this.eventsBuffer = [...copy, ...this.eventsBuffer]
    }
  }

  async addNote(payload: {
    title?: string
    description?: string
    category?: string
    severity?: DebugSeverity
    tags?: string[]
    reproMarked?: boolean
    stateSnapshot?: Record<string, unknown>
  }): Promise<void> {
    this.queueEvent({
      eventType: payload.reproMarked ? 'bug_marked' : 'note_added',
      category: payload.category,
      severity: payload.severity,
      title: payload.title,
      description: payload.description,
      tags: payload.tags,
      reproMarked: payload.reproMarked,
      stateSnapshot: payload.stateSnapshot,
    })

    await this.flush()
  }

  async uploadScreenshot(payload: {
    image: string
    description?: string
    category?: string
    severity?: DebugSeverity
    tags?: string[]
    stateSnapshot?: Record<string, unknown>
  }): Promise<void> {
    if (!this.sessionId) return

    await fetch(`${API_BASE}/debug/session/${this.sessionId}/screenshot`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        timestampMs: this.getTimestampMs(),
        image: payload.image,
        description: payload.description,
        category: payload.category,
        severity: payload.severity,
        tags: payload.tags,
        stateSnapshot: payload.stateSnapshot,
      }),
    })
  }

  async stop(summary: string): Promise<{ downloadUrl: string | null }> {
    if (!this.sessionId) return { downloadUrl: null }
    await this.flush()
    const id = this.sessionId

    const res = await fetch(`${API_BASE}/debug/session/${id}/stop`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ summary, timestampMs: this.getTimestampMs() }),
    })

    this.clearRuntimeState()

    if (!res.ok) throw new Error(await res.text())

    const payload = (await res.json()) as { downloadUrl?: string }
    return { downloadUrl: payload.downloadUrl ?? null }
  }

  destroy(): void {
    this.clearRuntimeState()
  }

  private headers(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
  }

  private startFlushLoop(): void {
    if (this.flushTimer) clearInterval(this.flushTimer)
    this.flushTimer = setInterval(() => {
      void this.flush()
    }, 7000)
  }

  private clearRuntimeState(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    this.sessionId = null
    this.sessionStartMs = 0
    this.pauseStartedAt = 0
    this.pausedDurationMs = 0
    this.eventsBuffer = []
  }
}
