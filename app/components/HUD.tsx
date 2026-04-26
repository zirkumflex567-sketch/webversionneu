"use client"

import { useGameStore } from "../../src/store"
import { WastelandBar, ScanlineOverlay } from "./UIElements"
import QuestTracker from "./QuestTracker"
import { useT } from "../../src/i18n/useT"

export default function HUD() {
  const t = useT()
  const wave = useGameStore((s) => s.wave)
  const enemyTelemetry = useGameStore((s) => s.enemyTelemetry)
  const health = useGameStore((s) => s.health)
  const maxHealth = useGameStore((s) => s.maxHealth)
  const scrap = useGameStore((s) => s.scrap)
  const tech = useGameStore((s) => s.tech)
  const callout = useGameStore((s) => s.callout)
  const calloutKey = useGameStore((s) => s.calloutKey)
  const calloutVariant = useGameStore((s) => s.calloutVariant)
  const phase = useGameStore((s) => s.phase)
  const abilityUses = useGameStore((s) => s.abilityUses)
  const shield = useGameStore((s) => s.shield)
  const character = useGameStore((s) => s.character)
  const nitroCharges = useGameStore((s) => s.nitroCharges)
  const nitroChargesMax = useGameStore((s) => s.nitroChargesMax)
  const nitroCooldown = useGameStore((s) => s.nitroCooldown)
  const nitroCooldownMax = useGameStore((s) => s.nitroCooldownMax)

  if (phase !== "InPlay") return null

  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100))
  const lowHealth = healthPercent < 30
  const totalHostiles = enemyTelemetry.total
  const visibleHostiles = enemyTelemetry.visible
  const offscreenHostiles = enemyTelemetry.offscreen
  const abilityName = character === "rixa" ? t("ui.hud.ability.rixa") : t("ui.hud.ability.marek")

  return (
    <div className="pointer-events-none fixed inset-0 z-30 font-rajdhani text-white">
      <ScanlineOverlay />

      <div className="absolute left-4 top-4 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-3">
        <WastelandBar
          value={shield > 0 ? shield : health}
          max={shield > 0 ? Math.max(1, shield) : maxHealth}
          label={shield > 0 ? t("ui.hud.shield_active") : t("ui.hud.hull")}
          sublabel={t("ui.hud.drive_unit_stable")}
          color={shield > 0 ? "#c9b7ff" : "#00ffaa"}
          className={lowHealth ? "animate-pulse border-red-600/50" : ""}
        />
        <div className="flex gap-2">
          <ResourceChip label={t("ui.hud.scrap")} value={scrap} color="#ffaa00" />
          <ResourceChip label={t("ui.hud.tech")} value={tech} color="#c9b7ff" />
        </div>
      </div>

      <div className="absolute right-4 top-4 min-w-[260px] border-4 border-black bg-black/70 p-4 text-right shadow-[6px_6px_0_0_#000]">
        <div className="font-bebas text-3xl tracking-widest text-[#00ffaa]">
          {t("ui.hud.wave", { wave })}
        </div>
        <div className="font-bebas text-xl tracking-widest text-[#ff3355]">
          {t("ui.hud.enemies", { count: totalHostiles })}
        </div>
        <div className="text-xs uppercase tracking-widest text-white/50">
          {t("ui.hud.visible_edge", { visible: visibleHostiles, edge: offscreenHostiles })}
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">
          {t("ui.hud.combat_phase_active")}
        </div>
      </div>

      {callout && (
        <div
          key={calloutKey}
          className={`absolute left-1/2 top-1/3 -translate-x-1/2 text-center font-bebas text-5xl tracking-[0.25em] ${
            calloutVariant === "boss"
              ? "text-[#ff3322] drop-shadow-[0_10px_30px_rgba(255,32,32,0.85)]"
              : calloutVariant === "warning"
                ? "text-[#ffaa00] drop-shadow-[0_10px_30px_rgba(255,170,0,0.7)]"
                : "text-white drop-shadow-[0_10px_30px_rgba(0,255,170,0.6)]"
          }`}
        >
          {callout}
        </div>
      )}

      {enemyTelemetry.bossLabel && enemyTelemetry.bossMaxHp > 0 && (
        <div className="absolute left-1/2 top-24 w-[420px] -translate-x-1/2 border-4 border-black bg-black/80 p-3 text-center shadow-[6px_6px_0_0_#000]">
          <div className="font-bebas text-2xl tracking-widest text-[#ff6633]">{enemyTelemetry.bossLabel}</div>
          <WastelandBar
            value={enemyTelemetry.bossHp}
            max={enemyTelemetry.bossMaxHp}
            color="#ff6633"
            label={t("ui.hud.boss")}
            showValue={false}
          />
          <div className="text-xs text-white/50">
            {Math.ceil(enemyTelemetry.bossHp)} / {Math.ceil(enemyTelemetry.bossMaxHp)}
          </div>
        </div>
      )}

      {enemyTelemetry.markers.map((marker) => (
        <ThreatMarker key={marker.id} marker={marker} bossLabel={t("ui.hud.boss")} />
      ))}

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <QuestTracker />

        <div className="flex flex-col items-end gap-3">
          <div className="border-4 border-black bg-black/70 p-3 shadow-[4px_4px_0_0_#000]">
            <div className="mb-1 font-bebas text-lg tracking-widest text-[#ffaa00]">{t("ui.hud.nitro_spur")}</div>
            <div className="flex items-center gap-2">
              {Array.from({ length: nitroChargesMax }).map((_, i) => {
                const charged = i < nitroCharges
                return (
                  <div
                    key={i}
                    className={`h-3 w-10 border border-black ${charged ? "bg-[#ffaa00]" : "bg-white/10"}`}
                    style={
                      !charged && nitroCooldownMax > 0
                        ? { opacity: Math.max(0.2, 1 - nitroCooldown / nitroCooldownMax) }
                        : undefined
                    }
                  />
                )
              })}
              {nitroCharges < nitroChargesMax && nitroCooldown > 0 && (
                <span className="text-xs text-white/50">{Math.ceil(nitroCooldown)}s</span>
              )}
              <kbd className="border border-white/20 px-2 py-1 text-xs text-white/60">
                {t("ui.hud.input.shift")}
              </kbd>
            </div>
          </div>

          <div className={`border-4 border-black bg-black/70 p-4 shadow-[4px_4px_0_0_#000] ${abilityUses > 0 ? "" : "grayscale opacity-40"}`}>
            <div className="font-bebas text-xl tracking-widest text-[#00ffaa]">
              {abilityUses > 0 ? t("ui.hud.system_ready") : t("ui.hud.loading")}
            </div>
            <div className="text-sm uppercase tracking-widest text-white/60">{abilityName}</div>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-2 w-8 border border-black ${i <= abilityUses ? "bg-[#00ffaa]" : "bg-white/10"}`} />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
              <span>{t("ui.hud.trigger")}</span>
              <kbd className="border border-white/20 px-2 py-1">{t("ui.hud.input.space")}</kbd>
              <kbd className="border border-white/20 px-2 py-1">{t("ui.hud.input.wasd")}</kbd>
              <span>{t("ui.hud.auto_drive")}</span>
            </div>
          </div>
        </div>
      </div>

      {lowHealth && <div className="pointer-events-none absolute inset-0 border-[18px] border-red-700/30" />}
    </div>
  )
}

function ResourceChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="min-w-[120px] border-4 border-black bg-black/70 px-3 py-2 shadow-[4px_4px_0_0_#000]">
      <div className="font-bebas text-sm tracking-widest text-white/40">{label}</div>
      <div className="font-bebas text-3xl tracking-widest" style={{ color }}>
        {value}
      </div>
    </div>
  )
}

function ThreatMarker({
  marker,
  bossLabel,
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
  bossLabel: string
}) {
  const left = `${marker.x * 100}%`
  const top = `${marker.y * 100}%`
  const color = marker.isBoss ? "#ff6633" : "#ff3355"

  if (marker.offscreen) {
    return (
      <div
        className="absolute h-6 w-6 rounded-full border-2 bg-black/80 text-center text-xs font-bold"
        style={{ left, top, borderColor: color, color, transform: `rotate(${marker.angle}rad)` }}
      >
        {marker.count > 1 ? `x${marker.count}` : "!"}
      </div>
    )
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
      <div className="h-5 w-5 rounded-full border-2 bg-black/60" style={{ borderColor: color }} />
      {marker.isBoss && <div className="mt-1 font-bebas text-xs tracking-widest text-[#ff6633]">{bossLabel}</div>}
    </div>
  )
}
