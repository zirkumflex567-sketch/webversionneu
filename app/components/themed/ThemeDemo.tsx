"use client"

import React from "react"
import { useTheme } from "@/src/theme/useTheme"
import { ThemedButton } from "./ThemedButton"
import { ThemedBar } from "./ThemedBar"
import { ThemedIcon } from "./ThemedIcon"
import { useT } from "@/src/i18n/useT"

export function ThemeDemo() {
  const t = useT()
  const { uiTheme } = useTheme()

  return (
    <div className="p-8 bg-black/80 rounded-lg space-y-6 max-w-2xl">
      <div className="text-center">
        <h2 className="text-2xl font-bebas text-white mb-2">{t("ui.theme_demo.ui_theme", { theme: uiTheme.toUpperCase() })}</h2>
        <p className="text-sm text-white/60">{t("ui.theme_demo.switch_hint")}</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ThemedButton buttonType="deploy" onClick={() => console.log('Deploy!')}>
            DEPLOY
          </ThemedButton>
          <ThemedButton buttonType="settings" onClick={() => console.log('Settings!')}>
            CONFIG
          </ThemedButton>
        </div>

        <ThemedBar
          barType="health"
          value={75}
          max={100}
          label="HEALTH"
          color="#00ffaa"
        />

        <ThemedBar
          barType="shield"
          value={50}
          max={100}
          label="SHIELD"
          color="#c9b7ff"
        />

        <div className="flex gap-4 items-center">
          <ThemedIcon iconType="scrap" className="w-8 h-8" />
          <span className="text-white font-bebas">{t("ui.theme_demo.scrap_example")}</span>
          <ThemedIcon iconType="tech" className="w-8 h-8" />
          <span className="text-white font-bebas">{t("ui.theme_demo.tech_example")}</span>
        </div>
      </div>
    </div>
  )
}
