"use client"

import { useEffect, useState } from 'react'
import { getBuildInfo } from '@/src/build/buildInfo'

const VERSION = '0.1.0'
const BUILD_INFO = getBuildInfo({
  version: VERSION,
  sha: process.env.NEXT_PUBLIC_BUILD_SHA,
  builtAtUtc: process.env.NEXT_PUBLIC_BUILD_TIME_UTC,
})

function getMESZ(): string {
  const now = new Date()
  return now.toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' MESZ'
}

export default function VersionInfo() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(getMESZ())
    const id = setInterval(() => setTime(getMESZ()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <div className="fixed bottom-2 right-2 z-[200] rounded border border-white/10 bg-black/40 px-2 py-1 text-[10px] font-mono text-white/50 backdrop-blur-sm select-none pointer-events-none leading-tight text-right">
      <div>v{BUILD_INFO.version}</div>
      {BUILD_INFO.shaShort && <div>build {BUILD_INFO.shaShort}</div>}
      {BUILD_INFO.builtAtMesz && <div>upload {BUILD_INFO.builtAtMesz}</div>}
      <div>{time}</div>
    </div>
  )
}
