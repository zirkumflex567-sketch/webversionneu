import React from 'react';
import { OPEN_WORLD_ZONES } from '../../src/game/OpenWorld';

export default function MapTab() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full text-white pb-24 font-inter relative z-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2 border-b-4 border-black/50 pb-4">
        <h2 className="font-bebas text-5xl text-white tracking-widest uppercase shadow-black drop-shadow-md">The Fracture - World Map</h2>
        <p className="text-white/70 text-sm max-w-3xl font-semibold">
          Multiple dimensions have collapsed into the H-Town Sector. Select a biome to explore, scavenge, or conquer. 
          Note: Deeper zones require advanced Tech and heavy armor.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        
        {/* INTERACTIVE MAP MOCK (Left Side) */}
        <div className="flex-1 bg-[#111116] border-4 border-black shadow-[8px_8px_0_0_#000] relative overflow-hidden group">
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Rendering Map Nodes */}
           {OPEN_WORLD_ZONES.map((zone) => {
             // Map from world coordinates (-3000 to 3000) to percentage (0% to 100%)
             // Assuming world size is roughly 6000x6000, so we shift by +3000 and divide by 6000
             const leftPct = ((zone.center.x + 3000) / 6000) * 100;
             const topPct = ((zone.center.y + 3000) / 6000) * 100;
             
             return (
               <div 
                 key={zone.id} 
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer hover:scale-125 transition-transform duration-300 z-10"
                 style={{ left: `${leftPct}%`, top: `${topPct}%` }}
               >
                 <div className="w-6 h-6 rounded-full border-2 border-white animate-pulse" style={{ backgroundColor: `#${zone.color.toString(16).padStart(6, '0')}` }}></div>
                 <div className="mt-2 text-[10px] font-black uppercase tracking-widest bg-black/80 px-2 py-1 border border-white/20 whitespace-nowrap" style={{ color: `#${zone.color.toString(16).padStart(6, '0')}` }}>
                   {zone.name}
                 </div>
               </div>
             );
           })}
           
           <div className="absolute bottom-4 left-4 text-xs font-black text-white/30 tracking-widest uppercase">
             Sat-Comm Offline // Radar Active
           </div>
        </div>

        {/* ZONE DETAILS (Right Side) */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
           {OPEN_WORLD_ZONES.map((zone) => (
             <div key={`detail_${zone.id}`} className="border-4 border-black bg-black/40 p-4 hover:bg-white/5 transition-colors cursor-crosshair relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: `#${zone.color.toString(16).padStart(6, '0')}` }}></div>
                
                <h3 className="font-bebas text-2xl tracking-wider uppercase mb-1 pl-4" style={{ color: `#${zone.color.toString(16).padStart(6, '0')}` }}>
                  {zone.name}
                </h3>
                <div className="text-[10px] text-white/50 font-black uppercase tracking-widest pl-4 mb-2">
                  Biome: {zone.biome}
                </div>
                <p className="text-white/70 text-xs pl-4 mb-3">
                  {zone.description}
                </p>
                
                <div className="pl-4 flex gap-2">
                  <button className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 px-2 py-1 text-[10px] font-black uppercase tracking-widest transition-colors">
                    Set Waypoint
                  </button>
                  <button 
                    className="flex-1 text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest transition-colors"
                    style={{ backgroundColor: `#${zone.color.toString(16).padStart(6, '0')}` }}
                  >
                    Deploy Here
                  </button>
                </div>
             </div>
           ))}
        </div>
        
      </div>
    </div>
  );
}
