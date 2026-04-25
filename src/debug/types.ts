export type DebugEventType =
  | 'session_started'
  | 'session_paused'
  | 'session_resumed'
  | 'session_stopped'
  | 'note_added'
  | 'screenshot_taken'
  | 'bug_marked'
  | 'warning_captured'
  | 'error_captured'
  | 'perf_drop'
  | 'scene_changed'
  | 'custom_marker'

export type DebugSeverity = 'info' | 'minor' | 'major' | 'critical'

export interface DebugEvent {
  id: string
  sessionId: string
  timestampMs: number
  eventType: DebugEventType
  category?: string
  severity?: DebugSeverity
  title?: string
  description?: string
  tags?: string[]
  reproMarked?: boolean
  stateSnapshot?: Record<string, unknown>
  screenshotPath?: string
  createdAt: string
}

export type DebugSessionStatus = 'running' | 'paused' | 'completed'

export interface DebugSession {
  id: string
  userEmail: string
  status: DebugSessionStatus
  startedAt: string
  endedAt?: string
  durationMs?: number
  appVersion?: string
  buildId?: string
  userAgent?: string
  viewportWidth?: number
  viewportHeight?: number
  summary?: string
  createdAt: string
  updatedAt: string
  eventCount: number
  screenshotCount: number
}

export interface DebugSessionStartRequest {
  appVersion?: string
  buildId?: string
  userAgent?: string
  viewportWidth?: number
  viewportHeight?: number
}

export interface DebugEventInput {
  timestampMs: number
  eventType: DebugEventType
  category?: string
  severity?: DebugSeverity
  title?: string
  description?: string
  tags?: string[]
  reproMarked?: boolean
  stateSnapshot?: Record<string, unknown>
  screenshotPath?: string
}
