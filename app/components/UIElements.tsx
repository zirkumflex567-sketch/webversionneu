"use client"

import React from "react"
import { useT } from "../../src/i18n/useT"

/**
 * Animated Scanlines Overlay for any panel
 */
export function ScanlineOverlay() {
  return <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none z-10" />
}

/**
 * Premium Wasteland Progress Bar
 */
export function WastelandBar({ 
  value, 
  max, 
  color = "#00ffaa", 
  label, 
  sublabel,
  showValue = true,
  className = "" 
}: { 
  value: number, 
  max: number, 
  color?: string, 
  label: string, 
  sublabel?: string,
  showValue?: boolean,
  className?: string
}) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  
  return (
    <div className={`relative h-16 border-4 border-black bg-black/60 shadow-[4px_4px_0_0_#000] overflow-hidden ${className}`}>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20" />
      
      {/* Fill */}
      <div 
        className="absolute left-0 top-0 bottom-0 transition-all duration-500 ease-out z-0 opacity-80" 
        style={{ width: `${percent}%`, backgroundColor: color }}
      >
        <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[pulse_2s_infinite]"></div>
      </div>

      {/* Labelling */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <span className="font-bebas text-lg text-white font-bold leading-none tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{label}</span>
          {sublabel && <span className="text-[10px] text-white/50 font-black font-orbitron uppercase tracking-widest">{sublabel}</span>}
        </div>
        {showValue && <div className="font-orbitron text-2xl font-black text-white leading-none italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{Math.ceil(value)}</div>}
      </div>
      
      {/* Edge highlight */}
      <div className="absolute top-0 bottom-0 right-0 w-1 bg-white/20 z-10"></div>
    </div>
  )
}

/**
 * Animated Glitch Header
 */
export function GlitchHeader({ text, className = "" }: { text: string, className?: string }) {
  const t = useT()
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="text-[10px] tracking-[0.5em] text-[#00ffaa] font-orbitron font-bold uppercase mb-1">{t("ui.glitch_header.data_stream")}</div>
      <h1 className="font-bebas text-6xl text-white tracking-widest leading-none drop-shadow-[0_2px_0_#000] text-glitch" data-text={text}>
        {text}
      </h1>
    </div>
  )
}
