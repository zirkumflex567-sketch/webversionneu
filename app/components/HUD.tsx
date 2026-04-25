"use client"

import { useGameStore } from "../../src/store"
import { WastelandBar, ScanlineOverlay } from "./UIElements"
import QuestTracker from "./QuestTracker"

export default function HUD() {
  const wave = useGameStore((s) => s.wave)
  const enemyTelemetry = useGameStore((s) => s.enemyTelemetry)
  const health = useGameStore((s) => s.health)
  const maxHealth = useGameStore((s) => s.maxHealth)
  const scrap = useGameStore((s) => s.scrap)
  const tech = useGameStore((s) => s.tech)
  const experience = useGameStore((s) => s.experience)
  const xpToNextLevel = useGameStore((s) => s.xpToNextLevel)
  const level = useGameStore((s) => s.level)
  const callout = useGameStore((s) => s.callout)
  const calloutKey = useGameStore((s) => s.calloutKey)
  const calloutVariant = useGameStore((s) => s.calloutVariant)
  const phase = useGameStore((s) => s.phase)
  const abilityUses = useGameStore((s) => s.abilityUses)
  const shield = useGameStore((s) => s.shield)
  const character = useGameStore((s) => s.character)
  const isPaused = useGameStore((s) => s.isPaused)
  const nitroCharges = useGameStore((s) => s.nitroCharges)
  const nitroChargesMax = useGameStore((s) => s.nitroChargesMax)
  const nitroCooldown = useGameStore((s) => s.nitroCooldown)
  const nitroCooldownMax = useGameStore((s) => s.nitroCooldownMax)

  if (phase !== "InPlay") return null

  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100))
  const lowHealth     = healthPercent < 30
  const totalHostiles = enemyTelemetry.total
  const visibleHostiles = enemyTelemetry.visible
  const offscreenHostiles = enemyTelemetry.offscreen

  const abilityName = character === "rixa" ? "CHROM-ALCHEMIE" : "DROHNEN-WACHT"

  return (
    <div className={`hud-root fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-3 sm:p-5 lg:p-8 font-inter transition-opacity duration-500 ${isPaused ? 'opacity-20' : 'opacity-100'}`}>
      <ScanlineOverlay />

      {/* ── TOP ROW ───────────────────────────────────────────────── */}
      <div className="hud-top-row w-full flex justify-between items-start gap-3 sm:gap-4 relative z-20">

        {/* LEFT: Hull / Shield / Resources */}
        <div className="flex flex-col gap-2 sm:gap-3 w-[8.5rem] sm:w-64 lg:w-80 min-w-0">
          <WastelandBar
            value={health}
            max={maxHealth}
            label={shield > 0 ? "SCHILD AKTIV" : "HÜLLE"}
            sublabel="ANTRIEBSEINHEIT_01 // STABIL"
            color={shield > 0 ? "#c9b7ff" : "#00ffaa"}
            className={lowHealth ? "animate-pulse border-red-600/50" : ""}
          />

          {/* Scrap + Tech readout */}
          <div className="flex gap-2 sm:gap-3">
            <ResourceChip label="SCHROTT" value={scrap} color="#00ffaa" />
            <ResourceChip label="TECH"  value={tech}  color="#c9b7ff" />
          </div>

          <WastelandBar
            value={experience}
            max={xpToNextLevel}
            label={`STUFE ${level}`}
            sublabel="SYSTEM_SYNCHRONISATION"
            color="#ffaa00"
            showValue={false}
            className="h-10 border-2"
          />
        </div>

        {/* RIGHT: Wave + Enemy count */}
        <div className="flex flex-col items-end gap-2 sm:gap-3 w-[10rem] sm:w-56 lg:w-64 text-right min-w-0">
          <div className="bg-black/90 border-4 border-black p-2.5 sm:p-4 shadow-[4px_4px_0_0_#000] relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-12 h-1 bg-[#ffaa00]"></div>
            <div className="text-[8px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#ffaa00] mb-1">SYSTEM_WELLE_{wave}</div>
            <div className="font-bebas text-[2rem] sm:text-5xl text-white leading-none tracking-[0.06em] sm:tracking-[0.1em] whitespace-nowrap">{totalHostiles} FEINDE</div>
            <div className="mt-2 flex justify-end gap-3 text-[8px] sm:text-[10px] font-orbitron font-black tracking-[0.15em] uppercase text-white/55">
              <span>SICHTBAR {visibleHostiles}</span>
              <span>RAND {offscreenHostiles}</span>
            </div>
          </div>
          <div className="px-2 sm:px-4 py-1 bg-[#ffaa00] text-black font-orbitron font-black text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-widest shadow-[2px_2px_0_0_#000] animate-pulse">
            KAMPF_PHASE: AKTIV
          </div>
        </div>
      </div>

      {/* ── CENTER CALLOUT ────────────────────────────────────────── */}
      <div className="absolute left-1/2 top-[44%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[92vw] text-center">
        {callout && (() => {
          const isBoss = calloutVariant === 'boss'
          const isWarn = calloutVariant === 'warning'
          const colorClass = isBoss
            ? "text-[#ff3322] drop-shadow-[0_10px_30px_rgba(255,32,32,0.85)]"
            : isWarn
              ? "text-[#ffaa00] drop-shadow-[0_10px_30px_rgba(255,170,0,0.7)]"
              : "text-white drop-shadow-[0_10px_30px_rgba(0,255,170,0.6)]"
          return (
            <>
              {isBoss && (
                <div
                  key={`bflash-${calloutKey}`}
                  className="fixed inset-0 pointer-events-none bg-[#ff0000] opacity-0 animate-[bossFlash_0.9s_ease-out_forwards]"
                  style={{ mixBlendMode: 'screen' }}
                />
              )}
              <div
                key={calloutKey}
                className={`font-bebas text-[clamp(2.4rem,16vw,10rem)] leading-[0.85] tracking-tight uppercase ${colorClass} animate-[cpulse_0.6s_cubic-bezier(0.17,0.89,0.32,1.27)_forwards] text-glitch break-words ${isBoss ? 'scale-110' : ''}`}
                data-text={callout}
              >
                {callout}
              </div>
            </>
          )
        })()}
      </div>

      {enemyTelemetry.bossLabel && enemyTelemetry.bossMaxHp > 0 && (
        <div className="hud-boss-bar absolute left-1/2 top-20 sm:top-24 -translate-x-1/2 z-20 w-[min(34rem,72vw)] pointer-events-none">
          <div className="mb-1 text-center font-orbitron text-[10px] sm:text-xs font-black tracking-[0.4em] text-[#ff8866] uppercase">
            {enemyTelemetry.bossLabel}
          </div>
          <div className="h-4 sm:h-5 bg-black/80 border-2 border-black shadow-[4px_4px_0_0_#000] overflow-hidden">
            <div
              className="h-full bg-[linear-gradient(90deg,#ff4422_0%,#ff9a3c_100%)] transition-[width] duration-150"
              style={{ width: `${Math.max(0, Math.min(100, (enemyTelemetry.bossHp / enemyTelemetry.bossMaxHp) * 100))}%` }}
            />
          </div>
          <div className="mt-1 text-center font-orbitron text-[10px] sm:text-xs font-bold tracking-[0.18em] text-white/70">
            {Math.ceil(enemyTelemetry.bossHp)} / {Math.ceil(enemyTelemetry.bossMaxHp)}
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none">
        {enemyTelemetry.markers.map((marker) => (
          <ThreatMarker key={marker.id} marker={marker} />
        ))}
      </div>

      {/* ── BOTTOM: Action Bar ───────────────────────────────────── */}
            {/* Quest Tracker */}
        <div className="absolute left-4 sm:left-8 top-40 sm:top-56 z-20">
          <QuestTracker />
        </div>

        {/* Nitro Dash Bar */}
        <div className="hud-nitro-bar flex items-center gap-2 sm:gap-4 bg-black/80 border-2 border-black px-3 sm:px-6 py-2 shadow-[4px_4px_0_0_#000] max-w-[94vw]">
          <div className="text-[8px] sm:text-[9px] font-black text-white/30 tracking-[0.2em] sm:tracking-[0.3em] uppercase">NITRO-SPUR</div>
          <div className="flex gap-1.5 sm:gap-2">
            {Array.from({ length: nitroChargesMax }).map((_, i) => {
              const charged = i < nitroCharges
              return (
                <div
                  key={i}
                  className={`w-6 sm:w-8 h-2.5 sm:h-3 border-2 transition-all duration-300 ${
                    charged
                      ? "bg-white border-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "bg-white/5 border-white/10"
                  }`}
                />
              )
            })}
          </div>
          {nitroCharges < nitroChargesMax && nitroCooldown > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-14 sm:w-20 h-1.5 bg-white/10 border border-white/5">
                <div
                  className="h-full bg-white/50 transition-all"
                  style={{ width: `${(1 - nitroCooldown / nitroCooldownMax) * 100}%` }}
                />
              </div>
              <div className="text-[8px] text-white/30 font-orbitron">{Math.ceil(nitroCooldown)}s</div>
            </div>
          )}
          <kbd className="px-2 sm:px-3 py-1 bg-white/5 border border-white/10 text-[8px] sm:text-[9px] font-bold text-white/40 font-orbitron">SHIFT</kbd>
        </div>

        {/* Ability + Drive bar */}
        <div className="hud-action-bar flex items-stretch gap-1 bg-black/90 border-4 border-black p-1 shadow-[8px_8px_0_0_#000] w-[96vw] max-w-[660px] lg:max-w-none lg:w-auto">

          {/* Drive hint */}
          <div className="hidden sm:flex px-4 lg:px-6 py-2 border-r-2 border-white/5 flex-col items-center gap-0.5 opacity-40">
            <div className="flex gap-1 mb-1">
              {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#00ffaa]" />)}
            </div>
            <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 font-orbitron">WASD</kbd>
            <span className="font-bebas text-xs text-white/60 tracking-widest">AUTO_DRIVE</span>
          </div>

          {/* Active Ability */}
          <div className={`px-3 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3 sm:gap-6 lg:gap-10 transition-all flex-1 min-w-0 ${abilityUses > 0 ? "bg-[#00ffaa]/5" : "grayscale opacity-20"}`}>
            <div className="flex flex-col items-start min-w-0">
              <div className={`text-[8px] sm:text-[10px] font-black tracking-[0.18em] sm:tracking-[0.3em] uppercase transition-colors ${abilityUses > 0 ? "text-[#00ffaa]" : "text-white/20"}`}>
                {abilityUses > 0 ? "SYSTEM_BEREIT" : "LADEN..."}
              </div>
              <div className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-white tracking-[0.06em] sm:tracking-[0.1em] uppercase leading-none mt-1 break-words">
                {abilityName}
              </div>
            </div>

            {/* Charge meters */}
            <div className="flex gap-1.5 sm:gap-2 shrink-0">
              {[1,2,3].map(i => (
                <div
                  key={i}
                  className={`w-3 sm:w-4 h-8 sm:h-10 border-2 border-black rotate-[10deg] transition-all duration-500 ${
                    i <= abilityUses
                      ? "bg-[#00ffaa] toxic-glow shadow-[0_0_15px_rgba(0,255,170,0.4)]"
                      : "bg-white/5 border-white/5"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-col items-center pl-2 sm:pl-4 lg:pl-6 border-l-2 border-white/5 shrink-0">
              <div className="text-[8px] font-black text-white/20 tracking-widest mb-2">AUSLÖSER</div>
              <kbd className="px-2 sm:px-4 py-2 bg-white text-black font-black text-[10px] sm:text-sm shadow-[4px_4px_0_0_rgba(0,255,170,0.5)] transition-all">LEERTASTE</kbd>
            </div>
          </div>
      </div>

      {/* Low-health vignette */}
      {lowHealth && (
        <div className="fixed inset-0 pointer-events-none border-[30px] border-red-900/20 animate-pulse mix-blend-overlay z-0" />
      )}
    </div>
  )
}

function ResourceChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 bg-black/80 border-2 border-black px-2 sm:px-3 py-1.5 shadow-[2px_2px_0_0_#000] min-w-0">
      <div className="flex flex-col">
        <div className="text-[7px] sm:text-[8px] font-black tracking-[0.2em] sm:tracking-[0.3em] opacity-40 uppercase">{label}</div>
        <div className="font-orbitron text-sm sm:text-lg font-bold leading-none" style={{ color }}>{value}</div>
      </div>
    </div>
  )
}

function ThreatMarker({
  marker,
}: {
  marker: {
    x: number
    y: number
    hpPct: number
    count: number
    isBoss: boolean
    offscreen: boolean
    angle: number
    distance: number
  }
}) {
  const color = marker.isBoss ? "#ff6633" : "#ff3355"
  const left = `${marker.x * 100}%`
  const top = `${marker.y * 100}%`

  if (marker.offscreen) {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
        <div className="flex flex-col items-center gap-1">
          {marker.count > 1 && (
            <div className="px-1.5 py-0.5 bg-black/85 border border-black font-orbitron text-[8px] font-black text-[#ffd7cc] leading-none">
              x{marker.count}
            </div>
          )}
          <div
            className="w-4 h-4 border-2 bg-black/60"
            style={{
              borderColor: color,
              transform: `rotate(${marker.angle + Math.PI / 4}rad)`,
              boxShadow: `0 0 10px ${color}55`,
            }}
          />
          <div className="w-10 h-1.5 bg-black/70 border border-black">
            <div className="h-full transition-[width] duration-150" style={{ width: `${marker.hpPct * 100}%`, backgroundColor: color }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left, top }}>
      <div className="flex flex-col items-center gap-1">
        {marker.isBoss && (
          <div className="px-1.5 py-0.5 bg-black/70 border border-black font-orbitron text-[8px] font-black tracking-[0.2em] text-[#ff8866] uppercase">
            Boss
          </div>
        )}
        <div className="w-12 sm:w-14 h-1.5 sm:h-2 bg-black/70 border border-black shadow-[0_0_8px_rgba(0,0,0,0.45)]">
          <div className="h-full transition-[width] duration-100" style={{ width: `${marker.hpPct * 100}%`, backgroundColor: color }} />
        </div>
      </div>
    </div>
  )
}
