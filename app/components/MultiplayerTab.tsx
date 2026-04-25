import React, { useEffect, useState } from 'react';
import { useMultiplayerStore } from '../../src/multiplayerStore';
import { useGameStore } from '../../src/store';

export default function MultiplayerTab() {
  const { 
    connect, lobbies, currentLobby, chatHistory, leaderboard,
    createLobby, joinLobby, leaveLobby, sendChat, refreshLobbies, refreshLeaderboard, refreshChat
  } = useMultiplayerStore();
  
  const { meta } = useGameStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerName = (meta as any).displayName || `Pilot_${Math.floor(Math.random() * 1000)}`;

  const [chatInput, setChatInput] = useState("");
  const [newLobbyName, setNewLobbyName] = useState("");

  useEffect(() => {
    connect();
    refreshLobbies();
    refreshLeaderboard();
    refreshChat();
  }, [connect, refreshLobbies, refreshLeaderboard, refreshChat]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto h-full text-white pb-24 font-inter relative z-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2">
        <h2 className="font-bebas text-4xl text-[#00ffaa] tracking-widest uppercase">Multiplayer Hub</h2>
        <p className="text-white/60 text-sm max-w-2xl font-semibold">
          Synchronize with other pilots across the Wasteland. Access global networks, clan systems, and ranked leaderboards to secure High-Value Tech.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* LEADERBOARDS CARD */}
        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group cursor-pointer shadow-[4px_4px_0_0_#000]">
          <div className="absolute top-0 right-0 w-8 h-8 bg-[#00ffaa] group-hover:scale-110 transition-transform origin-top-right border-b-4 border-l-4 border-black z-10 flex items-center justify-center">
            <span className="text-black text-xs font-black">1</span>
          </div>
          <h3 className="font-bebas text-2xl tracking-wider text-white mb-2">Global Leaderboards</h3>
          <p className="text-white/50 text-xs mb-6 h-12">See where you rank against the top players in the H-Town sector.</p>
          <div className="space-y-3">
            {leaderboard.length === 0 && <div className="text-white/40 text-xs">No rankings available yet.</div>}
            {leaderboard.slice(0, 5).map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm bg-black/40 p-2 border-l-2 border-[#00ffaa]">
                <span className="font-bold text-white/80">#{idx + 1} {entry.name}</span>
                <span className="text-[#00ffaa] font-black">{entry.score} PT</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => refreshLeaderboard()}
            className="mt-4 w-full border-2 border-white/20 p-2 text-xs font-bold text-white/60 hover:text-white hover:border-[#00ffaa] uppercase tracking-widest transition-colors"
          >
            Refresh Rankings
          </button>
        </div>

        {/* LOBBY / GROUP FINDER CARD */}
        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group cursor-pointer shadow-[4px_4px_0_0_#000]">
          <h3 className="font-bebas text-2xl tracking-wider text-[#ffaa00] mb-2">Lobby / Group Finder</h3>
          <p className="text-white/50 text-xs mb-6 h-12">Deploy with a squad. Solo runs are dangerous; grouped runs yield more Tech.</p>
          
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto scrollbar-wasteland pr-2">
            {currentLobby ? (
               <div className="bg-[#ffaa00]/10 border-2 border-[#ffaa00] p-3">
                 <div className="text-xs text-[#ffaa00] font-black uppercase mb-2">Joined: {currentLobby.name}</div>
                 {currentLobby.players.map(p => (
                   <div key={p.id} className="text-white/80 text-sm">- {p.name} {p.id === currentLobby.host ? '(Host)' : ''}</div>
                 ))}
                 <button onClick={() => leaveLobby()} className="mt-3 bg-red-500/20 text-red-500 px-3 py-1 font-bold text-xs uppercase hover:bg-red-500 hover:text-white w-full border border-red-500">Leave</button>
               </div>
            ) : lobbies.length === 0 ? (
               <div className="text-white/40 text-xs">No active lobbies found.</div>
            ) : (
              lobbies.map(lobby => (
                <div key={lobby.id} className="bg-black/40 border-2 border-[#ffaa00]/30 p-3 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-[#ffaa00] font-black uppercase">{lobby.name}</div>
                    <div className="text-[10px] text-white/40">{lobby.players.length}/{lobby.maxPlayers} Players</div>
                  </div>
                  <button 
                    onClick={() => joinLobby(lobby.id, playerName)}
                    disabled={lobby.players.length >= lobby.maxPlayers}
                    className="bg-[#ffaa00] text-black px-3 py-1 font-bold text-xs uppercase hover:bg-white disabled:opacity-50 disabled:bg-gray-600"
                  >
                    Join
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
                placeholder="Lobby Name" 
                className="bg-black border border-white/20 text-white px-2 py-1 text-xs w-full focus:outline-none focus:border-[#ffaa00]"
              />
              <button 
                onClick={() => { if (newLobbyName.trim()) { createLobby(newLobbyName, playerName); setNewLobbyName(''); } }}
                className="border-2 border-[#ffaa00] px-4 py-1 text-xs font-black text-[#ffaa00] hover:bg-[#ffaa00] hover:text-black uppercase tracking-widest transition-colors shrink-0"
              >
                Create
              </button>
            </div>
          )}
        </div>

        {/* CHAT CARD (Replacing Factions for now) */}
        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group shadow-[4px_4px_0_0_#000] flex flex-col">
           <h3 className="font-bebas text-2xl tracking-wider text-[#33aaff] mb-2">Global Comms</h3>
          <p className="text-white/50 text-xs mb-2">Connect with other survivors.</p>
          
          <div className="flex-1 bg-black/50 border border-white/10 p-2 overflow-y-auto mb-2 flex flex-col gap-1 min-h-[120px] max-h-[160px] scrollbar-wasteland">
            {chatHistory.length === 0 && <span className="text-white/30 text-xs italic">No messages yet.</span>}
            {chatHistory.map(msg => (
              <div key={msg.id} className="text-xs">
                <span className="text-[#33aaff] font-bold">[{msg.sender}]</span> <span className="text-white/80">{msg.message}</span>
              </div>
            ))}
          </div>

          <form 
            className="flex gap-2 mt-auto" 
            onSubmit={(e) => {
              e.preventDefault();
              if (chatInput.trim()) {
                sendChat(chatInput, playerName, currentLobby ? currentLobby.id : 'global');
                setChatInput('');
              }
            }}
          >
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={currentLobby ? "Message Lobby..." : "Message Global..."}
              className="flex-1 bg-black border border-white/20 p-2 text-xs text-white focus:outline-none focus:border-[#33aaff]"
            />
            <button type="submit" className="bg-[#33aaff] text-black px-3 font-bold text-xs uppercase hover:bg-white transition-colors">Send</button>
          </form>
        </div>

        {/* EVENTS CARD */}
        <div className="border-4 border-[#ff3366] bg-[#1a0a0f] p-6 hover:bg-[#2a1018] transition-colors relative group cursor-pointer shadow-[4px_4px_0_0_#000] lg:col-span-2">
           <div className="absolute top-0 right-0 bg-[#ff3366] text-black text-[10px] font-black px-2 py-1 uppercase tracking-widest border-b-4 border-l-4 border-black">Live Event</div>
           <h3 className="font-bebas text-3xl tracking-wider text-[#ff3366] mb-1">Mireking's Revenge</h3>
           <p className="text-white/70 text-sm mb-4">A massive anomaly has spawned in Sector 7. Participate in the global damage pool to earn exclusive Relic Tech.</p>
           
           <div className="bg-black/50 p-4 border-2 border-[#ff3366]/30">
              <div className="flex justify-between text-xs font-black uppercase mb-2">
                <span className="text-[#ff3366]">Global Boss HP</span>
                <span className="text-white">42,500,100 / 50M</span>
              </div>
              <div className="w-full h-4 bg-black border-2 border-black relative">
                 <div className="absolute top-0 left-0 h-full bg-[#ff3366]" style={{ width: '85%' }}></div>
              </div>
           </div>
           
           <button className="mt-4 w-full bg-[#ff3366] p-3 text-sm font-black text-black hover:bg-white uppercase tracking-widest transition-colors">Join Event Raid</button>
        </div>

        {/* DAILY QUESTS CARD */}
        <div className="border-4 border-black bg-[#111116] p-6 hover:bg-[#1a1a24] transition-colors relative group cursor-pointer shadow-[4px_4px_0_0_#000]">
           <h3 className="font-bebas text-2xl tracking-wider text-white mb-2">Daily Objectives</h3>
           <div className="flex flex-col gap-3 mt-4">
             <div className="border-l-4 border-[#00ffaa] pl-3">
               <div className="text-sm font-bold text-white">Extract 500 Scrap</div>
               <div className="text-xs text-white/50">Reward: 10 Tech</div>
               <div className="w-full h-1 bg-white/10 mt-2"><div className="h-full bg-[#00ffaa] w-1/2"></div></div>
             </div>
             <div className="border-l-4 border-[#ffaa00] pl-3">
               <div className="text-sm font-bold text-white">Kill 10 Heavy Mobs</div>
               <div className="text-xs text-white/50">Reward: Premium Paint</div>
               <div className="w-full h-1 bg-white/10 mt-2"><div className="h-full bg-[#ffaa00] w-1/4"></div></div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
