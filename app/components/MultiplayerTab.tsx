import React, { useEffect, useState } from "react"
import { useMultiplayerStore } from "../../src/multiplayerStore"
import { useGameStore } from "../../src/store"
import { useT } from "../../src/i18n/useT"

export default function MultiplayerTab() {
  const {
    connect,
    lobbies,
    currentLobby,
    chatHistory,
    leaderboard,
    createLobby,
    joinLobby,
    leaveLobby,
    sendChat,
    refreshLobbies,
    refreshLeaderboard,
    refreshChat,
  } = useMultiplayerStore()

  const { meta } = useGameStore()
  const t = useT()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerName = (meta as any).displayName || `Pilot_${Math.floor(Math.random() * 1000)}`
  const [chatInput, setChatInput] = useState("")
  const [newLobbyName, setNewLobbyName] = useState("")

  useEffect(() => {
    connect()
    refreshLobbies()
    refreshLeaderboard()
    refreshChat()
  }, [connect, refreshLobbies, refreshLeaderboard, refreshChat])

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto h-full text-white pb-24 font-inter relative z-20">
      <div className="flex flex-col gap-2">
        <h2 className="font-bebas text-4xl text-[#00ffaa] tracking-widest uppercase">{t("ui.multiplayer.title")}</h2>
        <p className="text-white/60 text-sm max-w-2xl font-semibold">{t("ui.multiplayer.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group shadow-[4px_4px_0_0_#000]">
          <h3 className="font-bebas text-2xl tracking-wider text-white mb-2">{t("ui.multiplayer.leaderboard")}</h3>
          <div className="space-y-3 mt-4">
            {leaderboard.length === 0 && <div className="text-white/40 text-xs">{t("ui.multiplayer.no_rankings")}</div>}
            {leaderboard.slice(0, 5).map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm bg-black/40 p-2 border-l-2 border-[#00ffaa]">
                <span className="font-bold text-white/80">
                  #{idx + 1} {entry.name}
                </span>
                <span className="text-[#00ffaa] font-black">{entry.score} PT</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => refreshLeaderboard()}
            className="mt-4 w-full border-2 border-white/20 p-2 text-xs font-bold text-white/60 hover:text-white hover:border-[#00ffaa] uppercase tracking-widest transition-colors"
          >
            {t("ui.multiplayer.refresh_rankings")}
          </button>
        </div>

        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group shadow-[4px_4px_0_0_#000]">
          <h3 className="font-bebas text-2xl tracking-wider text-[#ffaa00] mb-2">{t("ui.multiplayer.lobby_finder")}</h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto scrollbar-wasteland pr-2">
            {currentLobby ? (
              <div className="bg-[#ffaa00]/10 border-2 border-[#ffaa00] p-3">
                <div className="text-xs text-[#ffaa00] font-black uppercase mb-2">{t("ui.multiplayer.joined")}: {currentLobby.name}</div>
                {currentLobby.players.map((p) => (
                  <div key={p.id} className="text-white/80 text-sm">
                    - {p.name} {p.id === currentLobby.host ? `(${t("ui.multiplayer.host")})` : ""}
                  </div>
                ))}
                <button
                  onClick={() => leaveLobby()}
                  className="mt-3 bg-red-500/20 text-red-500 px-3 py-1 font-bold text-xs uppercase hover:bg-red-500 hover:text-white w-full border border-red-500"
                >
                  {t("ui.multiplayer.leave")}
                </button>
              </div>
            ) : lobbies.length === 0 ? (
              <div className="text-white/40 text-xs">{t("ui.multiplayer.no_lobbies")}</div>
            ) : (
              lobbies.map((lobby) => (
                <div key={lobby.id} className="bg-black/40 border-2 border-[#ffaa00]/30 p-3 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-[#ffaa00] font-black uppercase">{lobby.name}</div>
                    <div className="text-[10px] text-white/40">
                      {lobby.players.length}/{lobby.maxPlayers} {t("ui.multiplayer.players")}
                    </div>
                  </div>
                  <button
                    onClick={() => joinLobby(lobby.id, playerName)}
                    disabled={lobby.players.length >= lobby.maxPlayers}
                    className="bg-[#ffaa00] text-black px-3 py-1 font-bold text-xs uppercase hover:bg-white disabled:opacity-50 disabled:bg-gray-600"
                  >
                    {t("ui.multiplayer.join")}
                  </button>
                </div>
              ))
            )}
          </div>
          {!currentLobby && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newLobbyName}
                onChange={(e) => setNewLobbyName(e.target.value)}
                placeholder={t("ui.multiplayer.lobby_name")}
                className="bg-black border border-white/20 text-white px-2 py-1 text-xs w-full focus:outline-none focus:border-[#ffaa00]"
              />
              <button
                onClick={() => {
                  if (newLobbyName.trim()) {
                    createLobby(newLobbyName, playerName)
                    setNewLobbyName("")
                  }
                }}
                className="border-2 border-[#ffaa00] px-4 py-1 text-xs font-black text-[#ffaa00] hover:bg-[#ffaa00] hover:text-black uppercase tracking-widest transition-colors shrink-0"
              >
                {t("ui.multiplayer.create")}
              </button>
            </div>
          )}
        </div>

        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group shadow-[4px_4px_0_0_#000] flex flex-col">
          <h3 className="font-bebas text-2xl tracking-wider text-[#33aaff] mb-2">{t("ui.multiplayer.chat")}</h3>
          <div className="flex-1 bg-black/50 border border-white/10 p-2 overflow-y-auto mb-2 flex flex-col gap-1 min-h-[120px] max-h-[160px] scrollbar-wasteland">
            {chatHistory.length === 0 && <span className="text-white/30 text-xs italic">{t("ui.multiplayer.no_messages")}</span>}
            {chatHistory.map((msg) => (
              <div key={msg.id} className="text-xs">
                <span className="text-[#33aaff] font-bold">[{msg.sender}]</span>{" "}
                <span className="text-white/80">{msg.message}</span>
              </div>
            ))}
          </div>
          <form
            className="flex gap-2 mt-auto"
            onSubmit={(e) => {
              e.preventDefault()
              if (chatInput.trim()) {
                sendChat(chatInput, playerName, currentLobby ? currentLobby.id : "global")
                setChatInput("")
              }
            }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={currentLobby ? t("ui.multiplayer.message_lobby") : t("ui.multiplayer.message_global")}
              className="flex-1 bg-black border border-white/20 p-2 text-xs text-white focus:outline-none focus:border-[#33aaff]"
            />
            <button type="submit" className="bg-[#33aaff] text-black px-3 font-bold text-xs uppercase hover:bg-white transition-colors">
              {t("ui.multiplayer.send")}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
