"use client"

import { useGameStore } from "../../src/store"
import { useAuthStore } from "@/src/auth/AuthStore"
import { useTheme } from "@/src/theme/useTheme"

export default function SettingsMenu() {
  const { isSettingsOpen, toggleSettings } = useGameStore()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const { uiTheme, setUITheme } = useTheme()

  const handleLogout = () => {
    clearAuth()
    localStorage.removeItem('auth-store')
    window.location.href = window.location.pathname
  }

  if (!isSettingsOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      {/* Background Gritty Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-metal.png')]"></div>
      
      <div className="relative w-[600px] panel-wasteland bg-[#0a111f] p-10 border-[#c9b7ff]/20">
        <div className="absolute top-0 right-0 p-4">
           <button 
             onClick={toggleSettings}
             className="w-10 h-10 border-2 border-[#ff4444] text-[#ff4444] flex items-center justify-center font-bold hover:bg-[#ff4444] hover:text-black transition-colors"
           >
             X
           </button>
        </div>

        <div className="flex flex-col gap-8">
           <div className="flex flex-col">
              <div className="text-[10px] tracking-[0.5em] text-[#c9b7ff] font-orbitron font-bold">SYSTEM // CALIBRATION</div>
              <h1 className="font-bebas text-6xl text-white tracking-widest leading-none">SETTINGS</h1>
           </div>

           <div className="space-y-6">
              <SettingRow label="Audio Volume" value="80%" />
              <SettingRow label="SFX Intensity" value="100%" />
              <SettingToggle label="Screen Shake" active={true} />
              <SettingToggle label="Scanlines Overlay" active={true} />
              <SettingRow label="Resolution" value="Native" />
              <SettingThemeToggle
                label="UI Theme"
                active={uiTheme === 'new'}
                onToggle={() => setUITheme(uiTheme === 'wasteland' ? 'new' : 'wasteland')}
              />
           </div>

           <button
             onClick={toggleSettings}
             className="btn-wasteland-premium w-full mt-4 bg-[#c9b7ff]"
           >
             APPLY CHANGES
           </button>

           <button
             onClick={handleLogout}
             className="btn-wasteland-premium w-full mt-2 bg-red-600 hover:bg-red-700"
           >
             LOGOUT
           </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 border-r-4 border-b-4 border-[#c9b7ff] opacity-20 pointer-events-none"></div>
      </div>
    </div>
  )
}

function SettingRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 uppercase tracking-widest font-bebas text-xl">
      <span className="text-white/40">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}

function SettingToggle({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 uppercase tracking-widest font-bebas text-xl">
      <span className="text-white/40">{label}</span>
      <div className={`w-12 h-6 border-2 border-black relative transition-colors ${active ? 'bg-[#00ffaa]' : 'bg-white/10'}`}>
         <div className={`absolute top-0 bottom-0 w-1/2 bg-black transition-all ${active ? 'right-0' : 'left-0'}`}></div>
      </div>
    </div>
  )
}

function SettingThemeToggle({ label, active, onToggle }: { label: string, active: boolean, onToggle: () => void }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 uppercase tracking-widest font-bebas text-xl">
      <span className="text-white/40">{label}</span>
      <button
        onClick={onToggle}
        className={`w-12 h-6 border-2 border-black relative transition-colors cursor-pointer hover:opacity-80 ${active ? 'bg-[#c9b7ff]' : 'bg-white/10'}`}
      >
        <div className={`absolute top-0 bottom-0 w-1/2 bg-black transition-all ${active ? 'right-0' : 'left-0'}`}></div>
      </button>
    </div>
  )
}
