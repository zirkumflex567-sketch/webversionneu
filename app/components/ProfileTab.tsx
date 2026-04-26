import React from 'react';
import Image from 'next/image';
import { useGameStore } from '../../src/store';
import { CHARACTERS } from '../../src/data/CharacterData';
import { useT } from '../../src/i18n/useT';

export default function ProfileTab() {
  const t = useT()
  const { meta, loadout } = useGameStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerName = (meta as any).displayName || t("ui.profile.unknown_pilot");
  const selectedChar = loadout?.character || 'rixa';
  const charData = CHARACTERS[selectedChar];

  // Calculate some fun mock stats based on scrap/tech
  const runsCompleted = Math.floor(meta.totalScrap / 150) + 12;
  const totalKills = Math.floor(meta.totalScrap * 1.5) + 340;
  const portraitSrc = `/combat/assets/ui/portrait_${selectedChar === "rixa" || selectedChar === "marek" ? selectedChar : "rixa"}.png`;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto h-full text-white pb-24 font-inter relative z-20">
      
      {/* HEADER SECTION */}
      <div className="flex items-end gap-6 border-b-4 border-white/20 pb-6">
        <div className="w-32 h-32 bg-black border-4 border-[#00ffaa] flex items-center justify-center overflow-hidden shadow-[4px_4px_0_0_#000] relative group">
           <Image src={portraitSrc} alt={t("ui.profile.pilot_alt")} fill sizes="128px" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500 mix-blend-screen" />
           <div className="absolute inset-0 border-2 border-dashed border-[#00ffaa]/50 pointer-events-none"></div>
        </div>
        
        <div className="flex-1">
          <div className="text-[#00ffaa] font-black text-xs uppercase tracking-[0.3em] mb-1">{t("ui.profile.dossier_access")}</div>
          <h2 className="font-bebas text-6xl tracking-widest uppercase leading-none">{playerName}</h2>
          <div className="text-white/50 font-bold text-sm mt-2 flex gap-4 uppercase tracking-widest">
            <span>{t("ui.profile.status")}: <span className="text-[#ffaa00]">{t("ui.common.active")}</span></span>
            <span>{t("ui.profile.syndicate")}: <span className="text-[#c9b7ff]">{t("ui.profile.none")}</span></span>
            <span>{t("ui.profile.rank")}: <span className="text-white">{t("ui.profile.scrap_dealer")}</span></span>
          </div>
        </div>
        
        <button className="border-2 border-white/30 px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          {t("ui.profile.edit_profile")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CAREER STATS */}
        <div className="border-4 border-black bg-[#111116] p-6 shadow-[4px_4px_0_0_#000] md:col-span-2">
          <h3 className="font-bebas text-3xl tracking-wider text-[#00ffaa] mb-4">{t("ui.profile.career_record")}</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/50 p-4 border-l-4 border-white/20">
              <div className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1">{t("ui.profile.total_drops")}</div>
              <div className="text-3xl font-bebas">{runsCompleted}</div>
            </div>
            <div className="bg-black/50 p-4 border-l-4 border-[#ff3366]">
              <div className="text-[10px] text-[#ff3366]/70 uppercase font-black tracking-widest mb-1">{t("ui.profile.enemies_eliminated")}</div>
              <div className="text-3xl font-bebas">{totalKills}</div>
            </div>
            <div className="bg-black/50 p-4 border-l-4 border-[#00ffaa]">
              <div className="text-[10px] text-[#00ffaa]/70 uppercase font-black tracking-widest mb-1">{t("ui.profile.total_scrap")}</div>
              <div className="text-3xl font-bebas">{meta.totalScrap}</div>
            </div>
            <div className="bg-black/50 p-4 border-l-4 border-[#c9b7ff]">
              <div className="text-[10px] text-[#c9b7ff]/70 uppercase font-black tracking-widest mb-1">{t("ui.profile.total_tech")}</div>
              <div className="text-3xl font-bebas">{meta.totalTech}</div>
            </div>
          </div>
          
          <div className="mt-8">
             <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">{t("ui.profile.combat_effectiveness")}</div>
             <div className="flex h-4 w-full bg-black border border-white/10">
               <div className="bg-[#ff3366]" style={{width: '45%'}} title="Assault"></div>
               <div className="bg-[#00ffaa]" style={{width: '30%'}} title="Scavenging"></div>
               <div className="bg-[#c9b7ff]" style={{width: '25%'}} title="Tech Ops"></div>
             </div>
             <div className="flex justify-between mt-2 text-[10px] text-white/40 uppercase font-black tracking-widest">
                <span className="text-[#ff3366]">{t("ui.profile.assault_45")}</span>
                <span className="text-[#00ffaa]">{t("ui.profile.scavenging_30")}</span>
                <span className="text-[#c9b7ff]">{t("ui.profile.tech_ops_25")}</span>
             </div>
          </div>
        </div>

        {/* CURRENT LOADOUT SUMMARY */}
        <div className="border-4 border-black bg-[#111116] p-6 shadow-[4px_4px_0_0_#000]">
           <h3 className="font-bebas text-3xl tracking-wider text-[#ffaa00] mb-4">{t("ui.profile.active_loadout")}</h3>
           
           <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 bg-black/40 p-3 border border-white/10">
                <div className="w-12 h-12 bg-white/5 flex flex-shrink-0">
                  <Image src={portraitSrc} alt={t("ui.profile.pilot_portrait_alt")} width={48} height={48} className="object-cover w-full h-full mix-blend-screen opacity-70" />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{t("ui.profile.pilot")}</div>
                  <div className="text-sm font-bold text-white uppercase">{charData?.displayName || selectedChar}</div>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-black/40 p-3 border border-white/10">
                <div className="w-12 h-12 bg-white/5 flex flex-shrink-0 items-center justify-center">🚗</div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{t("ui.profile.vehicle")}</div>
                  <div className="text-sm font-bold text-white uppercase">{(loadout?.vehicleId || '').replace('vehicle_','')}</div>
                </div>
             </div>
             <div className="flex items-center gap-4 bg-black/40 p-3 border border-white/10">
                <div className="w-12 h-12 bg-white/5 flex flex-shrink-0 items-center justify-center">🔫</div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{t("ui.profile.weapon")}</div>
                  <div className="text-sm font-bold text-white uppercase">{(loadout?.weaponId || '').replace('weapon_','')}</div>
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
