"use client"

import React from "react"
import Image from "next/image"
import { useTheme } from "@/src/theme/useTheme"
import { assetPath } from "@/src/theme/assetPaths"

type IconType = 'scrap' | 'tech' | 'ammo' | 'nitro' | 'skill' | 'checkmark' | 'backArrow'

interface ThemedIconProps {
  iconType: IconType
  className?: string
  alt?: string
}

export function ThemedIcon({
  iconType,
  className = "w-6 h-6",
  alt = iconType,
}: ThemedIconProps) {
  const { uiTheme } = useTheme()

  if (uiTheme === 'new') {
    const imagePath = assetPath.icon[iconType as IconType]('base')
    return (
      <Image
        src={imagePath}
        alt={alt}
        width={24}
        height={24}
        className={`object-cover ${className}`}
      />
    )
  }

  // Wasteland theme: use emoji or simple symbol
  const wastelandIcons: Record<IconType, string> = {
    scrap: '⚙️',
    tech: '⚡',
    ammo: '🔫',
    nitro: '💨',
    skill: '⭐',
    checkmark: '✓',
    backArrow: '←',
  }

  return (
    <span className={`inline-flex items-center justify-center ${className} text-white`}>
      {wastelandIcons[iconType]}
    </span>
  )
}
