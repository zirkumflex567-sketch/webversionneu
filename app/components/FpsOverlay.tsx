"use client"

import { useEffect, useState } from "react"

interface FpsStats {
  avgFps: number
  p95Ms: number
  p99Ms: number
  maxMs: number
  sampleCount: number
  lastCounts: {
    enemies: number
    projectiles: number
    scraps: number
    toxicZones: number
    sentries: number
    hordeWave: number
  }
  peakCounts: {
    enemies: number
    projectiles: number
  }
}

declare global {
  var __FPS_PROFILE__: { getStats: () => FpsStats } | undefined
}

/**
 * Dev HUD overlay — toggle with F3.
 * Shows rolling FPS (avg, p95, p99), entity counts, and peaks.
 * Renders only when toggled; safe to ship (guarded by visibility).
 */
export default function FpsOverlay() {
  const [visible, setVisible] = useState(false)
  const [stats, setStats] = useState<FpsStats | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "F3") {
        e.preventDefault()
        setVisible((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!visible) return
    let raf = 0
    const tick = () => {
      const prof = globalThis.__FPS_PROFILE__
      if (prof) setStats(prof.getStats())
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [visible])

  if (!visible || !stats) return null

  const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(1) : "-")
  const lc = stats.lastCounts
  const pc = stats.peakCounts
  const healthColor =
    stats.avgFps >= 55 ? "text-emerald-300"
    : stats.avgFps >= 45 ? "text-yellow-300"
    : "text-red-400"

  return (
    <div
      className="fixed top-4 right-4 z-[9999] pointer-events-none font-mono text-[11px] bg-black/80 border border-cyan-500/40 px-3 py-2 rounded-sm backdrop-blur-sm"
      style={{ minWidth: 220 }}
    >
      <div className="text-cyan-300/80 uppercase tracking-wider text-[10px] mb-1">
        FPS Profile [F3]
      </div>
      <div className={`text-2xl font-bold ${healthColor} leading-tight`}>
        {fmt(stats.avgFps)} <span className="text-xs text-white/60">fps</span>
      </div>
      <div className="text-white/80 mt-1 space-y-0.5">
        <div>p50 <span className="text-white/60">{fmt(1000 / (stats.avgFps || 1))}ms</span> · p95 <span className="text-yellow-300">{fmt(stats.p95Ms)}ms</span></div>
        <div>p99 <span className="text-orange-300">{fmt(stats.p99Ms)}ms</span> · max <span className="text-red-400">{fmt(stats.maxMs)}ms</span></div>
        <div className="border-t border-cyan-500/20 mt-1 pt-1 text-white/70">
          W<span className="text-white">{lc.hordeWave}</span>
          {" "}E<span className="text-white">{lc.enemies}</span>/<span className="text-white/50">{pc.enemies}</span>
          {" "}P<span className="text-white">{lc.projectiles}</span>/<span className="text-white/50">{pc.projectiles}</span>
          {" "}S<span className="text-white">{lc.scraps}</span>
          {" "}TZ<span className="text-white">{lc.toxicZones}</span>
          {" "}ST<span className="text-white">{lc.sentries}</span>
        </div>
        <div className="text-white/40 text-[9px]">samples {stats.sampleCount}</div>
      </div>
    </div>
  )
}
