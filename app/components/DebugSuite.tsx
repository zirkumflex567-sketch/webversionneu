"use client"

import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/src/auth/AuthStore'
import { useGameStore } from '@/src/store'
import StoryPanel from './StoryPanel'
import { DebugSessionClient } from '@/src/debug/client/DebugSessionClient'
import type { DebugEventType, DebugSeverity } from '@/src/debug/types'

interface LocalTimelineItem {
  timestampMs: number
  eventType: DebugEventType
  title: string
  category?: string
  severity?: DebugSeverity
  hasScreenshot?: boolean
}

const ADMIN_EMAIL = 'kevin@sieg.me'

export default function DebugSuite() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const phase = useGameStore((s) => s.phase)
  const wave = useGameStore((s) => s.wave)
  const health = useGameStore((s) => s.health)
  const maxHealth = useGameStore((s) => s.maxHealth)
  const enemyTelemetry = useGameStore((s) => s.enemyTelemetry)
  const isPaused = useGameStore((s) => s.isPaused)

  const [open, setOpen] = useState(true)
  const [active, setActive] = useState(false)
  const [timeline, setTimeline] = useState<LocalTimelineItem[]>([])
  const [lastSavedAt, setLastSavedAt] = useState<number>(0)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [noteCategory, setNoteCategory] = useState('combat')
  const [noteSeverity, setNoteSeverity] = useState<DebugSeverity>('minor')
  const [noteTags, setNoteTags] = useState('')
  const [reproMarked, setReproMarked] = useState(false)
  const [summary, setSummary] = useState('')
  const [tab, setTab] = useState<'timeline' | 'story'>('timeline')

  const clientRef = useRef<DebugSessionClient | null>(null)

  const canUse = Boolean(user?.email?.toLowerCase() === ADMIN_EMAIL && token)

  const elapsedMs = active && clientRef.current ? clientRef.current.getTimestampMs() : 0

  const snapshotRef = useRef<Record<string, unknown> | undefined>(undefined)
  useEffect(() => {
    const runtime = (globalThis as unknown as { __GAME__?: { snapshot?: () => unknown } }).__GAME__?.snapshot?.()
    snapshotRef.current = {
      sessionTimeMs: elapsedMs,
      phase,
      wave,
      health,
      maxHealth,
      enemyTelemetry,
      runtime,
    }
  }, [elapsedMs, phase, wave, health, maxHealth, enemyTelemetry])

  useEffect(() => {
    if (!canUse || !token) return
    const client = new DebugSessionClient(token)
    clientRef.current = client
    return () => client.destroy()
  }, [canUse, token])

  useEffect(() => {
    const onErr = (ev: ErrorEvent) => {
      clientRef.current?.queueEvent({
        eventType: 'error_captured',
        category: 'runtime',
        severity: 'major',
        title: ev.message,
        description: `${ev.filename}:${ev.lineno}:${ev.colno}`,
        stateSnapshot: snapshotRef.current,
      })
    }

    const onReject = (ev: PromiseRejectionEvent) => {
      clientRef.current?.queueEvent({
        eventType: 'error_captured',
        category: 'runtime',
        severity: 'major',
        title: 'Unhandled rejection',
        description: String(ev.reason),
        stateSnapshot: snapshotRef.current,
      })
    }

    const oldWarn = console.warn
    console.warn = (...args: unknown[]) => {
      oldWarn(...args)
      clientRef.current?.queueEvent({
        eventType: 'warning_captured',
        category: 'runtime',
        severity: 'minor',
        title: 'console.warn',
        description: args.map((x) => String(x)).join(' '),
        stateSnapshot: snapshotRef.current,
      })
    }

    window.addEventListener('error', onErr)
    window.addEventListener('unhandledrejection', onReject)

    let lowFpsFrames = 0
    let last = performance.now()
    let rafId = 0
    const perfTick = () => {
      const now = performance.now()
      const dt = now - last
      last = now
      const fps = dt > 0 ? 1000 / dt : 120
      if (fps < 30) lowFpsFrames += 1
      else lowFpsFrames = 0

      if (lowFpsFrames >= 120 && active) {
        lowFpsFrames = 0
        const item: LocalTimelineItem = {
          timestampMs: clientRef.current?.getTimestampMs() ?? 0,
          eventType: 'perf_drop',
          category: 'performance',
          severity: 'major',
          title: 'FPS drop detected',
        }
        setTimeline((prev) => [item, ...prev].slice(0, 200))
        clientRef.current?.queueEvent({
          eventType: 'perf_drop',
          category: 'performance',
          severity: 'major',
          title: 'FPS < 30 for ~2s',
          stateSnapshot: snapshotRef.current,
        })
      }

      rafId = requestAnimationFrame(perfTick)
    }
    rafId = requestAnimationFrame(perfTick)

    return () => {
      window.removeEventListener('error', onErr)
      window.removeEventListener('unhandledrejection', onReject)
      console.warn = oldWarn
      cancelAnimationFrame(rafId)
    }
  }, [canUse, active])

  useEffect(() => {
    if (!canUse) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'F8') {
        ev.preventDefault()
        void takeScreenshot()
      }
      if (ev.key === 'F9') {
        ev.preventDefault()
        void addQuickMarker()
      }
      if (ev.key === 'F10') {
        ev.preventDefault()
        void togglePauseResume()
      }
      if (ev.key === 'F11') {
        ev.preventDefault()
        setNoteOpen((v) => !v)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canUse, active])

  if (!canUse) return null

  async function startSession() {
    if (!clientRef.current) return
    await clientRef.current.start()
    setActive(true)
    setTimeline([{ timestampMs: 0, eventType: 'session_started', title: 'Session started', category: 'session', severity: 'info' }])
    setLastSavedAt(Date.now())
  }

  async function togglePauseResume() {
    if (!clientRef.current || !active) return
    if (isPaused) {
      await clientRef.current.resume()
      setTimeline((prev) => [{ timestampMs: clientRef.current?.getTimestampMs() ?? 0, eventType: 'session_resumed', title: 'Session resumed', category: 'session', severity: 'info' }, ...prev])
    } else {
      await clientRef.current.pause()
      setTimeline((prev) => [{ timestampMs: clientRef.current?.getTimestampMs() ?? 0, eventType: 'session_paused', title: 'Session paused', category: 'session', severity: 'info' }, ...prev])
    }
  }

  async function stopSession() {
    if (!clientRef.current || !active) return
    const result = await clientRef.current.stop(summary)
    setTimeline((prev) => [{ timestampMs: elapsedMs, eventType: 'session_stopped', title: 'Session stopped', category: 'session', severity: 'info' }, ...prev])
    setActive(false)
    if (result.downloadUrl) window.open(result.downloadUrl, '_blank')
  }

  async function addQuickMarker() {
    if (!clientRef.current || !active) return
    const item: LocalTimelineItem = {
      timestampMs: clientRef.current.getTimestampMs(),
      eventType: 'bug_marked',
      title: 'Quick bug marker',
      category: 'combat',
      severity: 'major',
    }
    setTimeline((prev) => [item, ...prev].slice(0, 200))
    clientRef.current.queueEvent({
      eventType: 'bug_marked',
      category: 'combat',
      severity: 'major',
      title: 'Quick marker',
      description: 'Set via F9',
      stateSnapshot: snapshotRef.current,
      reproMarked: true,
    })
    await clientRef.current.flush()
    setLastSavedAt(Date.now())
  }

  async function saveNote() {
    if (!clientRef.current || !active) return
    await clientRef.current.addNote({
      title: noteTitle,
      description: noteBody,
      category: noteCategory,
      severity: noteSeverity,
      tags: noteTags.split(',').map((x) => x.trim()).filter(Boolean),
      reproMarked,
      stateSnapshot: snapshotRef.current,
    })

    const noteEventType: DebugEventType = reproMarked ? 'bug_marked' : 'note_added'
    const noteItem: LocalTimelineItem = {
      timestampMs: clientRef.current?.getTimestampMs() ?? 0,
      eventType: noteEventType,
      title: noteTitle || 'Note',
      category: noteCategory,
      severity: noteSeverity,
    }
    setTimeline((prev) => [
      noteItem,
      ...prev,
    ].slice(0, 200))

    setLastSavedAt(Date.now())
    setNoteOpen(false)
    setNoteTitle('')
    setNoteBody('')
    setNoteTags('')
    setReproMarked(false)
  }

  async function takeScreenshot() {
    if (!clientRef.current || !active) return

    const canvas = document.querySelector<HTMLCanvasElement>('#game-root canvas')
    if (!canvas) return

    const image = canvas.toDataURL('image/png')
    await clientRef.current.uploadScreenshot({
      image,
      description: 'Manual screenshot',
      category: 'visual',
      severity: 'minor',
      stateSnapshot: snapshotRef.current,
    })

    const shotType: DebugEventType = 'screenshot_taken'
    const shotItem: LocalTimelineItem = {
      timestampMs: clientRef.current?.getTimestampMs() ?? 0,
      eventType: shotType,
      title: 'Screenshot',
      category: 'visual',
      severity: 'minor',
      hasScreenshot: true,
    }
    setTimeline((prev) => [
      shotItem,
      ...prev,
    ].slice(0, 200))

    setLastSavedAt(Date.now())
  }

  return (
    <div className="fixed right-3 top-3 z-[120] pointer-events-auto text-xs font-mono">
      <div className="bg-black/85 text-white border border-cyan-400 rounded p-2 w-[360px]">
        <div className="flex items-center justify-between mb-2">
          <strong>Debug Suite</strong>
          <button className="px-2 py-1 border border-gray-600" onClick={() => setOpen((v) => !v)}>{open ? 'Hide' : 'Show'}</button>
        </div>

        {open && (
          <>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>Status: {active ? 'running' : 'idle'}</div>
              <div>Time: {(elapsedMs / 1000).toFixed(1)}s</div>
              <div>Events: {timeline.length}</div>
              <div>Saved: {lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString() : '-'}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <button className="px-2 py-1 bg-green-700" onClick={startSession} disabled={active}>Start</button>
              <button className="px-2 py-1 bg-yellow-700" onClick={togglePauseResume} disabled={!active}>{isPaused ? 'Resume' : 'Pause'}</button>
              <button className="px-2 py-1 bg-blue-700" onClick={takeScreenshot} disabled={!active}>Screenshot (F8)</button>
              <button className="px-2 py-1 bg-red-700" onClick={addQuickMarker} disabled={!active}>Quick Bug (F9)</button>
              <button className="px-2 py-1 bg-purple-700" onClick={() => setNoteOpen(true)} disabled={!active}>Note (F11)</button>
              <button className="px-2 py-1 bg-gray-700" onClick={stopSession} disabled={!active}>Stop</button>
            </div>

            <textarea className="w-full bg-black border border-gray-700 p-1 mb-2" rows={2} placeholder="Session summary before stop/export" value={summary} onChange={(e) => setSummary(e.target.value)} />

            <div className="flex gap-2 mb-1 border-b border-gray-700">
              <button 
                className={`px-2 py-1 ${tab === 'timeline' ? 'bg-cyan-900 text-white' : 'text-gray-500'}`}
                onClick={() => setTab('timeline')}
              >
                Timeline
              </button>
              <button 
                className={`px-2 py-1 ${tab === 'story' ? 'bg-cyan-900 text-white' : 'text-gray-500'}`}
                onClick={() => setTab('story')}
              >
                Story
              </button>
            </div>

            {tab === 'timeline' ? (
              <div className="max-h-52 overflow-auto border border-gray-700">
                {timeline.map((item, idx) => (
                  <div key={`${item.eventType}-${idx}`} className="px-2 py-1 border-b border-gray-800">
                    <div>{(item.timestampMs / 1000).toFixed(1)}s - {item.eventType}</div>
                    <div className="text-gray-400">{item.title} {item.hasScreenshot ? '[shot]' : ''}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-h-52 overflow-auto border border-gray-700">
                <StoryPanel />
              </div>
            )}
          </>
        )}
      </div>

      {noteOpen && (
        <div className="mt-2 bg-black/95 text-white border border-cyan-500 p-2 rounded w-[360px]">
          <div className="mb-1">Add Note</div>
          <input className="w-full mb-1 p-1 bg-black border border-gray-700" placeholder="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
          <textarea className="w-full mb-1 p-1 bg-black border border-gray-700" rows={3} placeholder="Description" value={noteBody} onChange={(e) => setNoteBody(e.target.value)} />
          <div className="grid grid-cols-2 gap-1 mb-1">
            <input className="p-1 bg-black border border-gray-700" placeholder="Category" value={noteCategory} onChange={(e) => setNoteCategory(e.target.value)} />
            <select className="p-1 bg-black border border-gray-700" value={noteSeverity} onChange={(e) => setNoteSeverity(e.target.value as DebugSeverity)}>
              <option value="info">info</option><option value="minor">minor</option><option value="major">major</option><option value="critical">critical</option>
            </select>
          </div>
          <input className="w-full mb-1 p-1 bg-black border border-gray-700" placeholder="tags,comma,separated" value={noteTags} onChange={(e) => setNoteTags(e.target.value)} />
          <label className="inline-flex items-center gap-2 mb-2"><input type="checkbox" checked={reproMarked} onChange={(e) => setReproMarked(e.target.checked)} /> Needs repro</label>
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-cyan-700" onClick={saveNote}>Save</button>
            <button className="px-2 py-1 bg-gray-700" onClick={() => setNoteOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
