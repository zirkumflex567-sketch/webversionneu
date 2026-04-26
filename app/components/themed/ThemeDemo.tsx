"use client"

import { useTheme } from "@/src/theme/useTheme"
import { ThemedButton } from "./ThemedButton"
import { ThemedBar } from "./ThemedBar"
import { ThemedIcon } from "./ThemedIcon"
import { useT } from "@/src/i18n/useT"

export function ThemeDemo() {
  const t = useT()
  const { uiTheme } = useTheme()

  return (
    <div className="space-y-4">
      <h2>{t("ui.theme_demo.ui_theme", { theme: uiTheme.toUpperCase() })}</h2>
      <p>{t("ui.theme_demo.switch_hint")}</p>
      <div className="flex gap-2">
        <ThemedButton buttonType="deploy" onClick={() => console.log("Deploy!")}>{t("ui.theme_demo.deploy")}</ThemedButton>
        <ThemedButton buttonType="settings" onClick={() => console.log("Settings!")}>{t("ui.theme_demo.config")}</ThemedButton>
      </div>
      <ThemedBar barType="health" value={75} max={100} label={t("ui.theme_demo.scrap_example")} />
      <div className="flex gap-2">
        <ThemedIcon iconType="scrap" alt={t("ui.theme_demo.scrap_alt")} />
        <span>{t("ui.theme_demo.tech_example")}</span>
      </div>
    </div>
  )
}
