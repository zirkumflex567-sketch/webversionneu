"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useTheme } from "@/src/theme/useTheme"
import { assetPath } from "@/src/theme/assetPaths"

type ButtonType = 'deploy' | 'abort' | 'acquire' | 'settings' | 'upgrade' | 'logout'

interface ThemedButtonProps {
  buttonType: ButtonType
  onClick?: () => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export function ThemedButton({
  buttonType,
  onClick,
  disabled = false,
  className = "",
  children,
}: ThemedButtonProps) {
  const { uiTheme } = useTheme()
  const [hoverState, setHoverState] = useState<'base' | 'hover' | 'pressed'>('base')

  if (uiTheme === 'new') {
    const getImagePath = () => {
      if (disabled) return assetPath.button[buttonType as ButtonType]('disabled')
      if (hoverState === 'pressed') return assetPath.button[buttonType as ButtonType]('pressed')
      if (hoverState === 'hover') return assetPath.button[buttonType as ButtonType]('hover')
      return assetPath.button[buttonType as ButtonType]('base')
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative cursor-pointer transition-all duration-75 ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
        onMouseEnter={() => !disabled && setHoverState('hover')}
        onMouseLeave={() => setHoverState('base')}
        onMouseDown={() => !disabled && setHoverState('pressed')}
        onMouseUp={() => !disabled && setHoverState('hover')}
      >
        <Image
          src={getImagePath()}
          alt={buttonType}
          width={512}
          height={256}
          className="w-full h-full object-cover"
        />
        {children && (
          <span className="absolute inset-0 flex items-center justify-center font-bebas text-xl text-white drop-shadow-lg">
            {children}
          </span>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-wasteland-premium ${className}`}
    >
      {children}
    </button>
  )
}
