"use client"

import { useState, useEffect } from "react"
import { useGameStore } from "../../src/store"
import { useAuthStore } from "../../src/auth/AuthStore"
import Hub from "./Hub"
import HUD from "./HUD"
import Overlays from "./Overlays"
import SettingsMenu from "./SettingsMenu"
import LoginView from "./LoginView"
import DialogUI from "./DialogUI"
import QuestTracker from "./QuestTracker"

export default function GameUI() {
  const [mounted, setMounted] = useState(false)
  const phase = useGameStore((s) => s.phase)
  const setPhase = useGameStore((s) => s.setPhase)
  const isSettingsOpen = useGameStore((s) => s.isSettingsOpen)
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)

  useEffect(() => {
    setMounted(true)
    // Initialization: boot from save once on mount
    useGameStore.getState().bootFromSave()
  }, [])

  // Auto-transition if already logged in
  useEffect(() => {
    if (mounted && phase === "Auth" && user && token) {
      setPhase("Loading")
    }
  }, [mounted, phase, user, token, setPhase])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 select-none overflow-hidden h-screen w-screen z-50">
      {/* 0. Login Layer */}
      {phase === "Auth" && <LoginView />}

      {/* 1. Hub Layer (Garage) */}
      <div className={`absolute inset-0 transition-all duration-700 ease-in-out z-40 pointer-events-none ${
        isSettingsOpen ? 'blur-md opacity-20' : 'opacity-100'
      }`}>
        <Hub />
      </div>

      {/* 2. HUD Layer (Combat Interface) */}
      <div className={`absolute inset-0 transition-opacity duration-300 z-30 ${
        isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <HUD />
      </div>

      {/* 3. Overlays Layer (Pause, LevelUp, Summary) */}
      <div className={`absolute inset-0 transition-all duration-300 z-[60] pointer-events-none ${
        isSettingsOpen ? 'opacity-50 blur-sm' : 'opacity-100'
      }`}>
        <Overlays />
      </div>

      <div className={`absolute inset-0 transition-all duration-500 z-[100] transform ${
        isSettingsOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <SettingsMenu />
      </div>

      {/* 5. Story Layer */}
      <DialogUI />
      <div className="absolute left-4 top-24 z-[45] pointer-events-auto">
        <QuestTracker />
      </div>
    </div>
  )
}
