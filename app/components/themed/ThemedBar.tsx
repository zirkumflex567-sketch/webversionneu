"use client"

import React from "react"
import { useTheme } from "@/src/theme/useTheme"
import { assetPath } from "@/src/theme/assetPaths"
import { WastelandBar } from "../UIElements"

type BarType = 'health' | 'shield' | 'wave' | 'speedometer'

interface ThemedBarProps {
  barType: BarType
  value: number
  max: number
  label?: string
  sublabel?: string
  color?: string
  showValue?: boolean
  className?: string
}

export function ThemedBar({
  barType,
  value,
  max,
  label = "",
  sublabel,
  color = "#00ffaa",
  showValue = true,
  className = "",
}: ThemedBarProps) {
  const { uiTheme } = useTheme()
  const percent = Math.max(0, Math.min(100, (value / max) * 100))

  if (uiTheme === 'new') {
    const getFramePath = () => {
      if (barType === 'health') return assetPath.hudElement.healthBar('base')
      if (barType === 'shield') return assetPath.hudElement.shieldBar('base')
      if (barType === 'wave') return assetPath.hudElement.waveCounter('base')
      if (barType === 'speedometer') return assetPath.hudElement.speedometer('base')
      return assetPath.hudElement.healthBar('base')
    }

    return (
      <div className={`relative h-16 bg-cover bg-center overflow-hidden ${className}`}>
        <img
          src={getFramePath()}
          alt={barType}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute left-0 top-0 bottom-0 transition-all duration-500 ease-out opacity-75 z-0"
          style={{ width: `${percent}%`, backgroundColor: color }}
        >
          <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[pulse_2s_infinite]"></div>
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-between px-4">
          {label && (
            <div className="flex flex-col">
              <span className="font-bebas text-lg text-white font-bold leading-none tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {label}
              </span>
              {sublabel && <span className="text-[10px] text-white/50 font-black font-orbitron uppercase tracking-widest">{sublabel}</span>}
            </div>
          )}
          {showValue && (
            <div className="font-orbitron text-2xl font-black text-white leading-none italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {Math.ceil(value)}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <WastelandBar
      value={value}
      max={max}
      label={label}
      sublabel={sublabel}
      color={color}
      showValue={showValue}
      className={className}
    />
  )
}
