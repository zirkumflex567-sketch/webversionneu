import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type { DebugEvent, DebugEventInput, DebugSession, DebugSessionStartRequest, DebugSessionStatus } from '../types'

const dataRoot = path.join(process.cwd(), '.data', 'debug-data')
const sessionsRoot = path.join(dataRoot, 'sessions')

function nowIso(): string {
  return new Date().toISOString()
}

function sessionDir(sessionId: string): string {
  return path.join(sessionsRoot, sessionId)
}

function sessionFile(sessionId: string): string {
  return path.join(sessionDir(sessionId), 'session.json')
}

function timelineFile(sessionId: string): string {
  return path.join(sessionDir(sessionId), 'timeline.json')
}

function metricsFile(sessionId: string): string {
  return path.join(sessionDir(sessionId), 'metrics.json')
}

function screenshotsDir(sessionId: string): string {
  return path.join(sessionDir(sessionId), 'screenshots')
}

export function getSessionDir(sessionId: string): string {
  return sessionDir(sessionId)
}

async function ensureBase(): Promise<void> {
  await mkdir(sessionsRoot, { recursive: true })
}

async function ensureSessionDirs(sessionId: string): Promise<void> {
  await mkdir(sessionDir(sessionId), { recursive: true })
  await mkdir(screenshotsDir(sessionId), { recursive: true })
}

async function readJsonOr<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

export async function createDebugSession(userEmail: string, payload: DebugSessionStartRequest): Promise<DebugSession> {
  await ensureBase()
  const id = `dbg_${Date.now()}_${randomUUID().slice(0, 8)}`
  const now = nowIso()
  const session: DebugSession = {
    id,
    userEmail,
    status: 'running',
    startedAt: now,
    createdAt: now,
    updatedAt: now,
    appVersion: payload.appVersion,
    buildId: payload.buildId,
    userAgent: payload.userAgent,
    viewportWidth: payload.viewportWidth,
    viewportHeight: payload.viewportHeight,
    eventCount: 0,
    screenshotCount: 0,
  }

  await ensureSessionDirs(id)
  await Promise.all([
    writeJson(sessionFile(id), session),
    writeJson(timelineFile(id), []),
    writeJson(metricsFile(id), []),
  ])

  await addEvent(id, {
    timestampMs: 0,
    eventType: 'session_started',
    title: 'Debug session started',
    severity: 'info',
    category: 'session',
  })

  return getSession(id) as Promise<DebugSession>
}

export async function getSession(sessionId: string): Promise<DebugSession | null> {
  const session = await readJsonOr<DebugSession | null>(sessionFile(sessionId), null)
  return session
}

export async function updateSessionStatus(
  sessionId: string,
  status: DebugSessionStatus,
  options?: { summary?: string; end?: boolean; timestampMs?: number },
): Promise<DebugSession | null> {
  const session = await getSession(sessionId)
  if (!session) return null

  const now = nowIso()
  session.status = status
  session.updatedAt = now

  if (options?.summary !== undefined) session.summary = options.summary
  if (options?.end) {
    session.endedAt = now
    const started = new Date(session.startedAt).getTime()
    session.durationMs = Math.max(0, Date.now() - started)
  }

  await writeJson(sessionFile(sessionId), session)

  if (status === 'paused') {
    await addEvent(sessionId, {
      timestampMs: options?.timestampMs ?? 0,
      eventType: 'session_paused',
      title: 'Session paused',
      category: 'session',
      severity: 'info',
    })
  }

  if (status === 'running') {
    await addEvent(sessionId, {
      timestampMs: options?.timestampMs ?? 0,
      eventType: 'session_resumed',
      title: 'Session resumed',
      category: 'session',
      severity: 'info',
    })
  }

  if (status === 'completed') {
    await addEvent(sessionId, {
      timestampMs: options?.timestampMs ?? session.durationMs ?? 0,
      eventType: 'session_stopped',
      title: 'Session stopped',
      category: 'session',
      severity: 'info',
      description: options?.summary,
    })
  }

  return getSession(sessionId)
}

export async function listSessions(): Promise<DebugSession[]> {
  await ensureBase()
  const entries = await readdir(sessionsRoot, { withFileTypes: true })
  const out: DebugSession[] = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const session = await getSession(entry.name)
    if (session) out.push(session)
  }

  return out.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
}

export async function getTimeline(sessionId: string): Promise<DebugEvent[]> {
  return readJsonOr<DebugEvent[]>(timelineFile(sessionId), [])
}

export async function addEvent(sessionId: string, input: DebugEventInput): Promise<DebugEvent | null> {
  const session = await getSession(sessionId)
  if (!session) return null

  const timeline = await getTimeline(sessionId)
  const event: DebugEvent = {
    id: `evt_${randomUUID().slice(0, 12)}`,
    sessionId,
    timestampMs: Math.max(0, Math.floor(input.timestampMs)),
    eventType: input.eventType,
    category: input.category,
    severity: input.severity,
    title: input.title,
    description: input.description,
    tags: input.tags,
    reproMarked: input.reproMarked,
    stateSnapshot: input.stateSnapshot,
    screenshotPath: input.screenshotPath,
    createdAt: nowIso(),
  }

  timeline.push(event)
  timeline.sort((a, b) => a.timestampMs - b.timestampMs)
  await writeJson(timelineFile(sessionId), timeline)

  session.eventCount = timeline.length
  session.screenshotCount = timeline.filter((entry) => Boolean(entry.screenshotPath)).length
  session.updatedAt = nowIso()
  await writeJson(sessionFile(sessionId), session)

  return event
}

export async function addEventsBatch(sessionId: string, inputs: DebugEventInput[]): Promise<number> {
  let created = 0
  for (const input of inputs) {
    const event = await addEvent(sessionId, input)
    if (event) created += 1
  }
  return created
}

export async function writeScreenshot(sessionId: string, timestampMs: number, rawBase64: string): Promise<string> {
  await ensureSessionDirs(sessionId)
  const safePayload = rawBase64.replace(/^data:image\/png;base64,/, '')
  const file = `${String(Math.max(0, Math.floor(timestampMs))).padStart(6, '0')}_${randomUUID().slice(0, 6)}.png`
  const fullPath = path.join(screenshotsDir(sessionId), file)
  await writeFile(fullPath, Buffer.from(safePayload, 'base64'))
  return `screenshots/${file}`
}
