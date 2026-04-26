"use client"

import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "@/src/auth/AuthStore"
import { useGameStore } from "@/src/store"
import { useT } from "@/src/i18n/useT"
import StoryPanel from "./StoryPanel"
import { DebugSessionClient } from "@/src/debug/client/DebugSessionClient"
import type { DebugEventType, DebugSeverity } from "@/src/debug/types"

interface LocalTimelineItem {
  timestampMs: number
  eventType: DebugEventType
  title: string
  category?: string
  severity?: DebugSeverity
  hasScreenshot?: boolean
}

const ADMIN_EMAIL = "kevin@sieg.me"

export default function DebugSuite() {
  const t = useT()
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
  const [lastSavedAt, setLastSavedAt] = useState(0)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")
  const [noteCategory, setNoteCategory] = useState("combat")
  const [noteSeverity, setNoteSeverity] = useState<DebugSeverity>("minor")
  const [noteTags, setNoteTags] = useState("")
  const [reproMarked, setReproMarked] = useState(false)
  const [summary, setSummary] = useState("")
  const [tab, setTab] = useState<"timeline" | "story">("timeline")

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
        eventType: "error_captured",
        category: "runtime",
        severity: "major",
        title: ev.message,
        description: `${ev.filename}:${ev.lineno}:${ev.colno}`,
        stateSnapshot: snapshotRef.current,
      })
    }
    const onReject = (ev: PromiseRejectionEvent) => {
      clientRef.current?.queueEvent({
        eventType: "error_captured",
        category: "runtime",
        severity: "major",
        title: t("ui.debug.unhandled_rejection"),
        description: String(ev.reason),
        stateSnapshot: snapshotRef.current,
      })
    }
    const oldWarn = console.warn
    console.warn = (...args: unknown[]) => {
      oldWarn(...args)
      clientRef.current?.queueEvent({
        eventType: "warning_captured",
        category: "runtime",
        severity: "minor",
        title: t("ui.debug.console_warn"),
        description: args.map((x) => String(x)).join(" "),
        stateSnapshot: snapshotRef.current,
      })
    }
    window.addEventListener("error", onErr)
    window.addEventListener("unhandledrejection", onReject)

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
          eventType: "perf_drop",
          category: "performance",
          severity: "major",
          title: t("ui.debug.fps_drop_detected"),
        }
        setTimeline((prev) => [item, ...prev].slice(0, 200))
        clientRef.current?.queueEvent({
          eventType: "perf_drop",
          category: "performance",
          severity: "major",
          title: t("ui.debug.fps_below_30"),
          stateSnapshot: snapshotRef.current,
        })
      }
      rafId = requestAnimationFrame(perfTick)
    }
    rafId = requestAnimationFrame(perfTick)
    return () => {
      window.removeEventListener("error", onErr)
      window.removeEventListener("unhandledrejection", onReject)
      console.warn = oldWarn
      cancelAnimationFrame(rafId)
    }
  }, [canUse, active, t])

  useEffect(() => {
    if (!canUse) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "F8") {
        ev.preventDefault()
        void takeScreenshot()
      }
      if (ev.key === "F9") {
        ev.preventDefault()
        void addQuickMarker()
      }
      if (ev.key === "F10") {
        ev.preventDefault()
        void togglePauseResume()
      }
      if (ev.key === "F11") {
        ev.preventDefault()
        setNoteOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [canUse, active])

  if (!canUse) return null

  async function startSession() {
    if (!clientRef.current) return
    await clientRef.current.start()
    setActive(true)
    setTimeline([{ timestampMs: 0, eventType: "session_started", title: t("ui.debug.session_started"), category: "session", severity: "info" }])
    setLastSavedAt(Date.now())
  }

  async function togglePauseResume() {
    if (!clientRef.current || !active) return
    if (isPaused) {
      await clientRef.current.resume()
      setTimeline((prev) => [{ timestampMs: clientRef.current?.getTimestampMs() ?? 0, eventType: "session_resumed", title: t("ui.debug.session_resumed"), category: "session", severity: "info" }, ...prev])
    } else {
      await clientRef.current.pause()
      setTimeline((prev) => [{ timestampMs: clientRef.current?.getTimestampMs() ?? 0, eventType: "session_paused", title: t("ui.debug.session_paused"), category: "session", severity: "info" }, ...prev])
    }
  }

  async function stopSession() {
    if (!clientRef.current || !active) return
    const result = await clientRef.current.stop(summary)
    setTimeline((prev) => [{ timestampMs: elapsedMs, eventType: "session_stopped", title: t("ui.debug.session_stopped"), category: "session", severity: "info" }, ...prev])
    setActive(false)
    if (result.downloadUrl) window.open(result.downloadUrl, "_blank")
  }

  async function addQuickMarker() {
    if (!clientRef.current || !active) return
    const item: LocalTimelineItem = {
      timestampMs: clientRef.current.getTimestampMs(),
      eventType: "bug_marked",
      title: t("ui.debug.quick_bug_marker"),
      category: "combat",
      severity: "major",
    }
    setTimeline((prev) => [item, ...prev].slice(0, 200))
    clientRef.current.queueEvent({
      eventType: "bug_marked",
      category: "combat",
      severity: "major",
      title: t("ui.debug.quick_marker"),
      description: t("ui.debug.set_via_f9"),
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
      tags: noteTags.split(",").map((x) => x.trim()).filter(Boolean),
      reproMarked,
      stateSnapshot: snapshotRef.current,
    })
    const noteEventType: DebugEventType = reproMarked ? "bug_marked" : "note_added"
    const noteItem: LocalTimelineItem = {
      timestampMs: clientRef.current?.getTimestampMs() ?? 0,
      eventType: noteEventType,
      title: noteTitle || t("ui.debug.note"),
      category: noteCategory,
      severity: noteSeverity,
    }
    setTimeline((prev) => [noteItem, ...prev].slice(0, 200))
    setLastSavedAt(Date.now())
    setNoteOpen(false)
    setNoteTitle("")
    setNoteBody("")
    setNoteTags("")
    setReproMarked(false)
  }

  async function takeScreenshot() {
    if (!clientRef.current || !active) return
    const canvas = document.querySelector<HTMLCanvasElement>("#game-root canvas")
    if (!canvas) return
    const image = canvas.toDataURL("image/png")
    await clientRef.current.uploadScreenshot({
      image,
      description: t("ui.debug.manual_screenshot"),
      category: "visual",
      severity: "minor",
      stateSnapshot: snapshotRef.current,
    })
    const shotItem: LocalTimelineItem = {
      timestampMs: clientRef.current?.getTimestampMs() ?? 0,
      eventType: "screenshot_taken",
      title: t("ui.debug.screenshot"),
      category: "visual",
      severity: "minor",
      hasScreenshot: true,
    }
    setTimeline((prev) => [shotItem, ...prev].slice(0, 200))
    setLastSavedAt(Date.now())
  }

  return (
    <div className="fixed right-3 top-3 z-[100] w-[420px] rounded border border-cyan-500 bg-black/95 p-3 text-xs text-white shadow-xl">
      <div className="mb-2 flex items-center justify-between gap-2">
        <strong>{t("ui.debug.title")}</strong>
        <button className="rounded bg-gray-800 px-2 py-1" onClick={() => setOpen((v) => !v)}>
          {open ? t("ui.debug.hide") : t("ui.debug.show")}
        </button>
      </div>

      {open && (
        <>
          <div className="mb-2 grid grid-cols-2 gap-1 text-gray-300">
            <div>{t("ui.debug.status")}: {active ? t("ui.debug.running") : t("ui.debug.idle")}</div>
            <div>{t("ui.debug.time")}: {(elapsedMs / 1000).toFixed(1)}s</div>
            <div>{t("ui.debug.events")}: {timeline.length}</div>
            <div>{t("ui.debug.saved")}: {lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString() : "-"}</div>
          </div>

          <div className="mb-2 flex flex-wrap gap-2">
            <button className="rounded bg-cyan-700 px-2 py-1" onClick={startSession} disabled={active}>{t("ui.debug.start")}</button>
            <button className="rounded bg-cyan-700 px-2 py-1" onClick={togglePauseResume} disabled={!active}>{isPaused ? t("ui.debug.resume") : t("ui.debug.pause")}</button>
            <button className="rounded bg-cyan-700 px-2 py-1" onClick={takeScreenshot} disabled={!active}>{t("ui.debug.screenshot_f8")}</button>
            <button className="rounded bg-cyan-700 px-2 py-1" onClick={addQuickMarker} disabled={!active}>{t("ui.debug.quick_bug_f9")}</button>
            <button className="rounded bg-cyan-700 px-2 py-1" onClick={() => setNoteOpen(true)} disabled={!active}>{t("ui.debug.note_f11")}</button>
            <button className="rounded bg-red-700 px-2 py-1" onClick={stopSession} disabled={!active}>{t("ui.debug.stop")}</button>
          </div>

          <input
            className="mb-2 w-full rounded border border-gray-700 bg-black p-1"
            placeholder={t("ui.debug.summary_placeholder")}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="mb-1 flex gap-2 border-b border-gray-700">
            <button className={`px-2 py-1 ${tab === "timeline" ? "bg-cyan-900 text-white" : "text-gray-500"}`} onClick={() => setTab("timeline")}>
              {t("ui.debug.timeline")}
            </button>
            <button className={`px-2 py-1 ${tab === "story" ? "bg-cyan-900 text-white" : "text-gray-500"}`} onClick={() => setTab("story")}>
              {t("ui.debug.story")}
            </button>
          </div>

          {tab === "timeline" ? (
            <div className="max-h-52 overflow-auto border border-gray-700">
              {timeline.map((item, idx) => (
                <div key={`${item.eventType}-${idx}`} className="border-b border-gray-800 px-2 py-1">
                  <div>{(item.timestampMs / 1000).toFixed(1)}s - {item.eventType}</div>
                  <div className="text-gray-400">{item.title} {item.hasScreenshot ? t("ui.debug.shot_marker") : ""}</div>
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

      {noteOpen && (
        <div className="mt-2 rounded border border-cyan-500 bg-black/95 p-2 text-white">
          <div className="mb-1">{t("ui.debug.add_note")}</div>
          <input className="mb-1 w-full border border-gray-700 bg-black p-1" placeholder={t("ui.debug.note_title_placeholder")} value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
          <textarea className="mb-1 w-full border border-gray-700 bg-black p-1" rows={3} placeholder={t("ui.debug.note_description_placeholder")} value={noteBody} onChange={(e) => setNoteBody(e.target.value)} />
          <div className="mb-1 grid grid-cols-2 gap-1">
            <input className="border border-gray-700 bg-black p-1" placeholder={t("ui.debug.category_placeholder")} value={noteCategory} onChange={(e) => setNoteCategory(e.target.value)} />
            <select className="border border-gray-700 bg-black p-1" value={noteSeverity} onChange={(e) => setNoteSeverity(e.target.value as DebugSeverity)}>
              <option value="info">{t("ui.debug.severity.info")}</option>
              <option value="minor">{t("ui.debug.severity.minor")}</option>
              <option value="major">{t("ui.debug.severity.major")}</option>
              <option value="critical">{t("ui.debug.severity.critical")}</option>
            </select>
          </div>
          <input className="mb-1 w-full border border-gray-700 bg-black p-1" placeholder={t("ui.debug.tags_placeholder")} value={noteTags} onChange={(e) => setNoteTags(e.target.value)} />
          <label className="mb-2 inline-flex items-center gap-2"><input type="checkbox" checked={reproMarked} onChange={(e) => setReproMarked(e.target.checked)} /> {t("ui.debug.needs_repro")}</label>
          <div className="flex gap-2">
            <button className="bg-cyan-700 px-2 py-1" onClick={saveNote}>{t("ui.debug.save")}</button>
            <button className="bg-gray-700 px-2 py-1" onClick={() => setNoteOpen(false)}>{t("ui.debug.cancel")}</button>
          </div>
        </div>
      )}
    </div>
  )
}
