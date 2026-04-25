"use client"

import React from "react"
import { useTheme } from "@/src/theme/useTheme"
import { assetPath } from "@/src/theme/assetPaths"

interface ThemedPanelProps {
  variant?: 'main' | 'dialog'
  className?: string
  children: React.ReactNode
}

export function ThemedPanel({
  variant = 'main',
  className = "",
  children,
}: ThemedPanelProps) {
  const { uiTheme } = useTheme()

  if (uiTheme === 'new') {
    const bgImage = assetPath.menuFrame[variant as 'main' | 'dialog']('base')

    return (
      <div
        className={`relative bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative z-10 backdrop-blur-[2px]">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`panel-wasteland ${className}`}>
      {children}
    </div>
  )
}
