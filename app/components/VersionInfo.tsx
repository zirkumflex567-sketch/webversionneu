"use client"

import { useEffect, useState } from "react"
import { getBuildInfo } from "@/src/build/buildInfo"
import { useT } from "@/src/i18n/useT"

const VERSION = "0.1.0"
const BUILD_INFO = getBuildInfo({
  version: VERSION,
  sha: process.env.NEXT_PUBLIC_BUILD_SHA,
  builtAtUtc: process.env.NEXT_PUBLIC_BUILD_TIME_UTC,
})

function getMESZ(): string {
  const now = new Date()
  return `${now.toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })} MESZ`
}

export default function VersionInfo() {
  const t = useT()
  const [time, setTime] = useState("")

  useEffect(() => {
    setTime(getMESZ())
    const id = setInterval(() => setTime(getMESZ()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="fixed bottom-2 right-2 z-40 rounded bg-black/70 px-2 py-1 font-mono text-[10px] text-white/50">
      <div>{t("ui.version.version", { version: BUILD_INFO.version })}</div>
      {BUILD_INFO.shaShort && <div>{t("ui.version.build", { sha: BUILD_INFO.shaShort })}</div>}
      {BUILD_INFO.builtAtMesz && <div>{t("ui.version.upload", { time: BUILD_INFO.builtAtMesz })}</div>}
      <div>{time}</div>
    </div>
  )
}
