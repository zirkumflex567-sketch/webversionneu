"use client"

import { useEffect, useState } from "react"
import { useGameStore } from "../../src/store"
import { BountySelectionUI } from "../../src/ui/BountySelectionUI"
import { CHARACTERS } from "../../src/data/CharacterData"
import { computeBankedResources } from "../../src/save/SaveManager"
import { defaultRunData } from "../../src/save/SaveSchema"
import { useT } from "../../src/i18n/useT"

export default function Overlays() {
  const t = useT()
  const phase = useGameStore((s) => s.phase)
  const scrap = useGameStore((s) => s.scrap)
  const tech = useGameStore((s) => s.tech)
  const wave = useGameStore((s) => s.wave)
  const enemiesKilledThisRun = useGameStore((s) => s.enemiesKilledThisRun)
  const runStartMs = useGameStore((s) => s.runStartMs)
  const character = useGameStore((s) => s.character)
  const loadout = useGameStore((s) => s.loadout)
  const enterHub = useGameStore((s) => s.enterHub)
  const startRun = useGameStore((s) => s.startRun)
  const configureLoadout = useGameStore((s) => s.configureLoadout)
  const applyUpgrade = useGameStore((s) => s.applyUpgrade)
  const isPaused = useGameStore((s) => s.isPaused)
  const togglePause = useGameStore((s) => s.togglePause)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || (phase === "InPlay" && !isPaused) || phase === "Hub") return null

  let content: React.ReactNode = null

  if (phase === "Loading") {
    content = (
      <Panel>
        <Eyebrow>{t("ui.overlay.initializing_systems")}</Eyebrow>
        <h1 className="font-bebas text-6xl tracking-[0.2em] text-[#00ffaa]">{t("ui.overlay.title")}</h1>
      </Panel>
    )
  } else if (phase === "BountySelection") {
    content = (
      <div className="pointer-events-auto max-h-[90vh] overflow-auto">
        {loadout && (
          <BountySelectionUI
            onConfirm={(selectedBountyIds) => {
              configureLoadout({ ...loadout, bountyIds: selectedBountyIds })
              startRun()
            }}
          />
        )}
      </div>
    )
  } else if (phase === "UpgradeSelection") {
    const { offeredUpgrades } = useGameStore.getState()
    content = (
      <Panel>
        <Eyebrow>{t("ui.overlay.level_up_incoming")}</Eyebrow>
        <h1 className="font-bebas text-5xl tracking-[0.2em] text-[#c9b7ff]">{t("ui.overlay.choose_enhancement")}</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {offeredUpgrades.map((u) => (
            <UpgradeCard key={u.id} title={u.name} desc={u.description} onClick={() => applyUpgrade(u.id)} />
          ))}
        </div>
      </Panel>
    )
  } else if (isPaused) {
    content = (
      <Panel>
        <Eyebrow>{t("ui.overlay.tactical_pause")}</Eyebrow>
        <h1 className="font-bebas text-5xl tracking-[0.2em] text-[#ffaa00]">{t("ui.overlay.systems_standby")}</h1>
        <div className="mt-6 grid gap-2 text-left font-bebas text-2xl tracking-widest text-white/70">
          <SumRow k={t("ui.overlay.wave")} v={String(wave)} />
          <SumRow k={t("ui.overlay.kills")} v={String(enemiesKilledThisRun)} />
          <SumRow k={t("ui.overlay.scrap")} v={String(scrap)} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="btn-wasteland-premium px-8 py-3 text-2xl" onClick={togglePause}>
            {t("ui.overlay.resume_deployment")}
          </button>
          <button className="btn-wasteland-premium px-8 py-3 text-2xl" onClick={startRun}>
            {t("ui.overlay.restart_run")}
          </button>
          <button className="btn-wasteland-premium px-8 py-3 text-2xl" onClick={enterHub}>
            {t("ui.overlay.return_to_garage")}
          </button>
        </div>
      </Panel>
    )
  } else if (phase === "RunSummary" || phase === "GameOver") {
    const run = {
      ...defaultRunData(),
      scrapEarned: scrap,
      techEarned: tech,
      outcome: phase === "GameOver" ? ("Died" as const) : ("Extracted" as const),
      wave,
      enemiesKilled: enemiesKilledThisRun,
      durationSeconds: runStartMs ? Math.max(0, (Date.now() - runStartMs) / 1000) : 0,
    }
    const banked = computeBankedResources(run)
    const charDisplay = loadout ? CHARACTERS[loadout.character].displayName : character ? CHARACTERS[character].displayName : "-"
    const isLoss = phase === "GameOver"
    content = (
      <Panel>
        <Eyebrow>{isLoss ? t("ui.overlay.vehicle_failure") : t("ui.overlay.mission_success")}</Eyebrow>
        <h1 className="font-bebas text-5xl tracking-[0.2em] text-[#00ffaa]">{t("ui.overlay.run_summary")}</h1>
        <div className="mt-6 grid gap-2 text-left font-bebas text-2xl tracking-widest text-white/70">
          <SumRow k={t("ui.overlay.pilot")} v={charDisplay} />
          <SumRow k={t("ui.overlay.scrap_salvaged")} v={`+${banked.scrap}`} />
          <SumRow k={t("ui.overlay.tech_salvaged")} v={`+${banked.tech}`} />
        </div>
        <button className="btn-wasteland-premium mt-8 px-10 py-4 text-3xl" onClick={isLoss ? startRun : enterHub}>
          {isLoss ? t("ui.overlay.retry_deployment") : t("ui.overlay.return_to_garage")}
        </button>
      </Panel>
    )
  }

  if (!content) return null

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 text-white backdrop-blur-sm">{content}</div>
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-auto max-w-5xl border-4 border-black bg-[#0a111f]/95 p-10 text-center shadow-[10px_10px_0_0_#000]">{children}</div>
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="font-bebas text-xl tracking-[0.25em] text-white/40">{children}</div>
}

function UpgradeCard({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
  const t = useT()
  return (
    <button className="border-4 border-black bg-black/70 p-6 text-left shadow-[6px_6px_0_0_#000] hover:bg-white/10" onClick={onClick}>
      <div className="font-bebas text-sm tracking-widest text-[#00ffaa]">{t("ui.overlay.system_upgrade")}</div>
      <h3 className="mt-2 font-bebas text-3xl tracking-widest text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{desc}</p>
    </button>
  )
}

function SumRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-8 border-b border-white/10 py-1">
      <span className="text-white/40">{k}</span>
      <span>{v}</span>
    </div>
  )
}
