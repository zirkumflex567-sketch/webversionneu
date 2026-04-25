"use client"

import { useState, useEffect } from "react"
import { useGameStore } from "../../src/store"
import { BountySelectionUI } from "../../src/ui/BountySelectionUI"
import { CHARACTERS } from "../../src/data/CharacterData"
import { computeBankedResources } from "../../src/save/SaveManager"
import { defaultRunData } from "../../src/save/SaveSchema"

export default function Overlays() {
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

  let content = null

  if (phase === "Loading") {
    content = (
      <div className="flex flex-col items-center">
        <div className="px-6 py-2 bg-black border-2 border-[#00ffaa] font-orbitron text-xs font-black tracking-[0.4em] text-[#00ffaa] animate-pulse">
          INITIALIZING_SYSTEMS
        </div>
        <h1 className="font-bebas text-[8rem] text-white tracking-[0.1em] mt-8 drop-shadow-[0_10px_20px_rgba(0,255,170,0.3)]">
          H-TOWN COMBAT
        </h1>
      </div>
    )
  } else if (phase === "BountySelection") {
    content = (
      <div className="w-full max-w-[1400px]">
        {loadout && (
          <BountySelectionUI
            onConfirm={(selectedBountyIds) => {
              if (loadout) {
                configureLoadout({
                  ...loadout,
                  bountyIds: selectedBountyIds,
                })
              }
              startRun()
            }}
          />
        )}
      </div>
    )
  } else if (phase === "UpgradeSelection") {
    const { offeredUpgrades } = useGameStore.getState()
    content = (
      <div className="w-full max-w-[1100px] px-3 sm:px-6">
        <div className="flex flex-col items-center mb-6 sm:mb-12">
          <div className="bg-[#ffaa00] text-black px-6 py-1 font-orbitron text-xs font-black tracking-[0.4em] shadow-[4px_4px_0_0_#000]">
            LEVEL_UP_INCOMING
          </div>
          <h1 className="font-bebas text-[clamp(2.8rem,10vw,7rem)] text-center leading-[0.9] text-white tracking-[0.08em] sm:tracking-[0.1em] mt-4">
            CHOOSE ENHANCEMENT
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 justify-center">
          {offeredUpgrades.map((u) => (
            <UpgradeCard
              key={u.id}
              title={u.name}
              desc={u.description}
              onClick={() => applyUpgrade(u.id)}
            />
          ))}
        </div>
      </div>
    )
  } else if (isPaused) {
    content = (
      <div className="flex flex-col items-center px-4 sm:px-0">
        <div className="px-5 py-1 bg-black border-2 border-[#ffaa00]/40 font-orbitron text-[10px] font-black tracking-[0.4em] text-[#ffaa00]/60 mb-6 uppercase shadow-[0_0_20px_rgba(255,170,0,0.1)]">
          TACTICAL_PAUSE // ESC TO RESUME
        </div>

        <h1 className="font-bebas text-[clamp(3.2rem,14vw,9rem)] text-center text-white tracking-[0.08em] sm:tracking-widest leading-none mb-4 drop-shadow-[0_10px_0_#000]">
          SYSTEMS STANDBY
        </h1>

        <div className="flex gap-4 sm:gap-8 mb-8 sm:mb-12 text-center flex-wrap justify-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">Wave</span>
            <span className="font-bebas text-3xl text-[#ffaa00]">{wave}</span>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">Kills</span>
            <span className="font-bebas text-3xl text-white">{enemiesKilledThisRun}</span>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">Scrap</span>
            <span className="font-bebas text-3xl text-[#00ffaa]">{scrap}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[420px]">
          <button
            onClick={togglePause}
            className="btn-wasteland text-2xl sm:text-3xl h-16 sm:h-20 relative overflow-hidden"
          >
            <span className="relative z-10">RESUME DEPLOYMENT</span>
          </button>

          <button
            onClick={() => {
              startRun()
            }}
            className="py-4 sm:py-5 border-4 border-[#ffaa00]/40 bg-[#ffaa00]/5 text-[#ffaa00] font-bebas text-xl sm:text-2xl tracking-widest hover:bg-[#ffaa00]/10 hover:border-[#ffaa00] transition-all shadow-[4px_4px_0_0_#000]"
          >
            RESTART RUN
          </button>

          <button
            onClick={enterHub}
            aria-label="RETURN TO GARAGE"
            className="py-4 border-4 border-black bg-white/5 text-white/30 font-bebas text-lg sm:text-xl tracking-widest hover:text-white hover:bg-white/10 transition-all"
          >
            RETURN TO GARAGE
          </button>
        </div>
      </div>
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
    const charDisplay = loadout
      ? CHARACTERS[loadout.character].displayName
      : character
        ? CHARACTERS[character].displayName
        : "-"

    const isLoss = phase === "GameOver"

    content = (
      <div className="flex flex-col items-center w-full max-w-[600px] px-4 sm:px-0">
        <div
          className={`px-6 py-1 font-orbitron font-black text-xs tracking-[0.4em] mb-4 shadow-[4px_4px_0_0_#000] ${
            isLoss ? "bg-red-600 text-white" : "bg-[#00ffaa] text-black"
          }`}
        >
          {isLoss ? "VEHICLE_CRITICAL_FAILURE" : "MISSION_SUCCESS"}
        </div>
        <h1 className="font-bebas text-[clamp(2.8rem,11vw,8rem)] text-center text-white tracking-[0.06em] sm:tracking-widest mb-6 sm:mb-10 drop-shadow-[0_5px_0_#000] whitespace-nowrap">
          RUN SUMMARY
        </h1>

        <div className="w-full card-wasteland bg-[#0a111f] p-4 sm:p-8 space-y-4 mb-6 sm:mb-10 text-left border-4">
          <SumRow k="PILOT" v={charDisplay} />
          <SumRow k="PEAK WAVE" v={`${wave}`} />
          <SumRow k="CONFIRMED KILLS" v={`${enemiesKilledThisRun}`} />

          <div className="h-4 border-y-2 border-black bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)] my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">Scrap Salvaged</span>
              <span className="font-orbitron font-black text-2xl text-[#00ffaa]">+{banked.scrap}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">Tech Salvaged</span>
              <span className="font-orbitron font-black text-2xl text-[#c9b7ff]">+{banked.tech}</span>
            </div>
          </div>
        </div>

        <button
          onClick={enterHub}
          className="btn-wasteland w-full py-5 sm:py-6 text-2xl sm:text-3xl"
        >
          {isLoss ? "RETRY DEPLOYMENT" : "RETURN TO GARAGE"}
        </button>
      </div>
    )
  }

  if (!content) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#040810f5] pointer-events-auto overflow-y-auto overflow-x-hidden p-4 sm:p-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-metal.png')]" />
      <div className="relative z-10">{content}</div>
    </div>
  )
}

function UpgradeCard({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
  return (
    <button
      aria-label={title}
      onClick={onClick}
      className="group relative card-wasteland border-4 p-5 sm:p-8 text-left transition-all hover:translate-y-[-8px] hover:shadow-[0_12px_0_0_#000] focus:outline-none min-h-[220px] sm:min-h-[260px]"
    >
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-4 bg-[#00ffaa] rotate-45" />
      </div>
      <div className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-2">SYSTEM_UPGRADE</div>
      <h3 className="font-bebas text-3xl sm:text-4xl text-white group-hover:text-[#00ffaa] mb-4 leading-none tracking-widest break-words">
        {title}
      </h3>
      <p className="text-white/50 text-xs leading-relaxed uppercase tracking-widest">{desc}</p>
    </button>
  )
}

function SumRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-1">
      <span className="text-[10px] font-black text-white/30 tracking-[0.2em]">{k}</span>
      <span className="font-bebas text-2xl text-white tracking-widest leading-none">{v}</span>
    </div>
  )
}
