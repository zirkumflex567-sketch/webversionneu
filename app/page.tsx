"use client"

import dynamic from "next/dynamic"
import AuthScreen from "./components/AuthScreen"
import VersionInfo from "./components/VersionInfo"

const GameEngine = dynamic(() => import("./components/GameEngine"), { ssr: false })
const GameUI = dynamic(() => import("./components/GameUI"), { ssr: false })
const FpsOverlay = dynamic(() => import("./components/FpsOverlay"), { ssr: false })
const DebugSuite = dynamic(() => import("./components/DebugSuite"), { ssr: false })

export default function Home() {
  return (
    <>
      <AuthScreen>
        <main className="w-screen h-screen overflow-hidden bg-background relative">
          <GameEngine />
          <GameUI />
          <FpsOverlay />
          <DebugSuite />
        </main>
      </AuthScreen>
      <VersionInfo />
    </>
  )
}
