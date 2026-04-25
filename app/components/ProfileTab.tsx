import React from 'react';
import { useGameStore } from '../../src/store';
import { CHARACTERS } from '../../src/data/CharacterData';

export default function ProfileTab() {
  const { meta, loadout } = useGameStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerName = (meta as any).displayName || 'Unknown Pilot';
  const selectedChar = loadout?.character || 'rixa';
  const charData = CHARACTERS[selectedChar];

  // Calculate some fun mock stats based on scrap/tech
  const runsCompleted = Math.floor(meta.totalScrap / 150) + 12;
  const totalKills = Math.floor(meta.totalScrap * 1.5) + 340;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto h-full text-white pb-24 font-inter relative z-20">
      
      {/* HEADER SECTION */}
      <div className="flex items-end gap-6 border-b-4 border-white/20 pb-6">
        <div className="w-32 h-32 bg-black border-4 border-[#00ffaa] flex items-center justify-center overflow-hidden shadow-[4px_4px_0_0_#000] relative group">
           <img src={`/assets/ui/portraits/${selectedChar}.png`} alt="Pilot" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500 mix-blend-screen" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150/000000/00ffaa?text=PILOT' }} />
           <div className="absolute inset-0 border-2 border-dashed border-[#00ffaa]/50 pointer-events-none"></div>
        </div>
        
        <div className="flex-1">
          <div className="text-[#00ffaa] font-black text-xs uppercase tracking-[0.3em] mb-1">Dossier Access Granted</div>
          <h2 className="font-bebas text-6xl tracking-widest uppercase leading-none">{playerName}</h2>
          <div className="text-white/50 font-bold text-sm mt-2 flex gap-4 uppercase tracking-widest">
            <span>Status: <span className="text-[#ffaa00]">Active</span></span>
            <span>Syndicate: <span className="text-[#c9b7ff]">None</span></span>
            <span>Rank: <span className="text-white">Scrap Dealer</span></span>
          </div>
        </div>
        
        <button className="border-2 border-white/30 px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CAREER STATS */}
        <div className="border-4 border-black bg-[#111116] p-6 shadow-[4px_4px_0_0_#000] md:col-span-2">
          <h3 className="font-bebas text-3xl tracking-wider text-[#00ffaa] mb-4">Career Service Record</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/50 p-4 border-l-4 border-white/20">
              <div className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1">Total Drops</div>
              <div className="text-3xl font-bebas">{runsCompleted}</div>
            </div>
            <div className="bg-black/50 p-4 border-l-4 border-[#ff3366]">
              <div className="text-[10px] text-[#ff3366]/70 uppercase font-black tracking-widest mb-1">Enemies Eliminated</div>
              <div className="text-3xl font-bebas">{totalKills}</div>
            </div>
            <div className="bg-black/50 p-4 border-l-4 border-[#00ffaa]">
              <div className="text-[10px] text-[#00ffaa]/70 uppercase font-black tracking-widest mb-1">Total Scrap</div>
              <div className="text-3xl font-bebas">{meta.totalScrap}</div>
            </div>
            <div className="bg-black/50 p-4 border-l-4 border-[#c9b7ff]">
              <div className="text-[10px] text-[#c9b7ff]/70 uppercase font-black tracking-widest mb-1">Total Tech</div>
              <div className="text-3xl font-bebas">{meta.totalTech}</div>
            </div>
          </div>
          
          <div className="mt-8">
             <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Combat Effectiveness (Mock)</div>
             <div className="flex h-4 w-full bg-black border border-white/10">
               <div className="bg-[#ff3366]" style={{width: '45%'}} title="Assault"></div>
               <div className="bg-[#00ffaa]" style={{width: '30%'}} title="Scavenging"></div>
               <div className="bg-[#c9b7ff]" style={{width: '25%'}} title="Tech Ops"></div>
             </div>
             <div className="flex justify-between mt-2 text-[10px] text-white/40 uppercase font-black tracking-widest">
                <span className="text-[#ff3366]">Assault (45%)</span>
                <span className="text-[#00ffaa]">Scavenging (30%)</span>
                <span className="text-[#c9b7ff]">Tech Ops (25%)</span>
             </div>
          </div>
        </div>

        {/* CURRENT LOADOUT SUMMARY */}
        <div className="border-4 border-black bg-[#111116] p-6 shadow-[4px_4px_0_0_#000]">
           <h3 className="font-bebas text-3xl tracking-wider text-[#ffaa00] mb-4">Active Loadout</h3>
           
           <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 bg-black/40 p-3 border border-white/10">
                <div className="w-12 h-12 bg-white/5 flex flex-shrink-0">
                  <img src={`/assets/ui/portraits/${selectedChar}.png`} className="object-cover w-full h-full mix-blend-screen opacity-70" onError={(e) => { e.currentTarget.style.display='none' }} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Pilot</div>
                  <div className="text-sm font-bold text-white uppercase">{charData?.displayName || selectedChar}</div>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-black/40 p-3 border border-white/10">
                <div className="w-12 h-12 bg-white/5 flex flex-shrink-0 items-center justify-center">🚗</div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Vehicle</div>
                  <div className="text-sm font-bold text-white uppercase">{(loadout?.vehicleId || '').replace('vehicle_','')}</div>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-black/40 p-3 border border-white/10">
                <div className="w-12 h-12 bg-white/5 flex flex-shrink-0 items-center justify-center">🔫</div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">Weapon</div>
                  <div className="text-sm font-bold text-white uppercase">{(loadout?.weaponId || '').replace('weapon_','')}</div>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
