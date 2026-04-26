"use client"

import { useState, useMemo, ReactNode } from "react"
import Image from "next/image"
import { useGameStore } from "../../src/store"
import { CHARACTERS } from "../../src/data/CharacterData"
import { SHOP_ITEMS, ShopItem } from "../../src/data/ShopData"
import { BOUNTIES } from "../../src/data/BountyData"
import { CharacterId, MetaProgress } from "../../src/save/SaveSchema"
import { assetPath } from "../../src/config/assetPath"
import { useStoryStore } from "../../src/store/StoryStore"
import type { Quest } from "../../src/game/StoryTypes"

import MultiplayerTab from "./MultiplayerTab"
import ProfileTab from "./ProfileTab"
import MapTab from "./MapTab"
import { ScanlineOverlay, GlitchHeader } from "./UIElements"
import ContentBrowser from "../../src/ui/content-browser/ContentBrowser"
import { HousingUI } from "../../src/ui/HousingUI"

type Tab = "pilot" | "garage" | "map" | "contracts" | "techlab" | "story" | "multiplayer" | "profile" | "archives" | "database" | "customization"

export default function Hub() {
  const { phase, meta, loadout, tryBuyShop, tryRankUpSkill, configureLoadout, startBountySelection, refreshMeta, toggleSettings } = useGameStore()
  const worldState = useStoryStore((s) => s.worldState)
  // ... (rest of state items are unchanged)
  const [tab, setTab] = useState<Tab>("pilot")
  const [selectedChar, setSelectedChar] = useState<CharacterId>(loadout?.character ?? "rixa")
  const [selectedVehicle, setSelectedVehicle] = useState<string>(loadout?.vehicleId ?? "vehicle_schrotty")
  const [selectedWeapon, setSelectedWeapon] = useState<string>(loadout?.weaponId ?? "weapon_autocannon")
  const [selectedBounties, setSelectedBounties] = useState<string[]>(loadout?.bountyIds ?? [])

  if (phase !== "Hub") return null

  const toggleBounty = (id: string) => {
    setSelectedBounties(cur => cur.includes(id) ? cur.filter(b => b !== id) : (cur.length < 2 ? [...cur, id] : cur))
  }

  const deploy = () => {
    configureLoadout({
      character: selectedChar,
      vehicleId: selectedVehicle,
      weaponId: selectedWeapon,
      bountyIds: selectedBounties,
    })
    startBountySelection()
  }

  const canDeploy = meta.unlockedCharacters.includes(selectedChar)
    && meta.unlockedVehicles.includes(selectedVehicle)
    && meta.unlockedWeapons.includes(selectedWeapon)

  return (
    <div className="fixed inset-0 z-40 bg-[#040810] flex flex-col font-inter overflow-hidden pointer-events-auto">
      <div className="noise-bg pointer-events-none"></div>
      <ScanlineOverlay />
      <HubDeco />
      
      {/* Top bar */}
      <header className="relative z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 border-b-4 border-black bg-black/40 backdrop-blur-md">
        <GlitchHeader text="DIE GARAGE" />
        
        <div className="flex gap-3 sm:gap-6 lg:gap-10 items-center self-end sm:self-auto">
          <ResourceBox label="SCHROTT" value={meta.totalScrap} color="#00ffaa" icon="scrap" />
          <ResourceBox label="TECH" value={meta.totalTech} color="#c9b7ff" icon="tech" />
          
          <button 
            onClick={(e) => { e.stopPropagation(); toggleSettings(); }}
            className="w-12 h-12 border-4 border-black bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all shadow-[2px_2px_0_0_#000] cursor-pointer pointer-events-auto relative z-[100]"
          >
             <span className="text-white opacity-40 pointer-events-none">⚙</span>
          </button>
        </div>
        
        {/* World State Status */}
        <WorldStateStatus />
      </header>

      {/* Tabs */}
      <nav className="relative z-50 flex gap-1 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 bg-black/20 overflow-x-auto scrollbar-wasteland">
        {(["profile","story","pilot","garage","customization","map","contracts","techlab","archives","multiplayer","database"] as Tab[]).filter(t => {
          if (t === "archives") return worldState.flags.mq03_hub_rebuilt;
          return true;
        }).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 sm:px-8 lg:px-10 py-3 font-bebas tracking-[0.15em] sm:tracking-[0.2em] text-lg sm:text-xl transition-all duration-75 relative border-4 border-black shrink-0 ${
              tab === t ? "bg-[#00ffaa] text-black translate-y-[-4px] shadow-[0_8px_0_0_#000] z-10"
                        : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
            }`}
          >
            {t === "story" ? "GESCHICHTE" : t === "pilot" ? "PILOT" : t === "garage" ? "GARAGE" : t === "customization" ? "INDIVIDUALISIERUNG" : t === "map" ? "KARTE" : t === "contracts" ? "VERTRÄGE" : t === "techlab" ? "TECHLAB" : t === "archives" ? "ARCHIV" : t === "multiplayer" ? "MEHRSPIELER" : t === "database" ? "DATENBANK" : "PROFIL"}
          </button>
        ))}
      </nav>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-8 relative z-10 scrollbar-wasteland">
        {tab === "database" && (
           <div className="w-full h-full flex flex-col">
             <ContentBrowser />
           </div>
        )}

        {tab === "pilot" && (
          <PilotTab
            selectedChar={selectedChar} setSelectedChar={setSelectedChar}
            selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle}
            selectedWeapon={selectedWeapon} setSelectedWeapon={setSelectedWeapon}
            unlockedVehicles={meta.unlockedVehicles}
            unlockedWeapons={meta.unlockedWeapons}
            unlockedCharacters={meta.unlockedCharacters}
          />
        )}
        {tab === "story" && (
          <StoryTab />
        )}
        {tab === "garage" && (
          <ShopTab
            meta={meta}
            onBuy={(id: string) => {
              const ok = tryBuyShop(id)
              refreshMeta()
              if (!ok) return
              const item = SHOP_ITEMS.find(i => i.id === id)
              if (item?.category === "Weapon") setSelectedWeapon(id)
              else if (item?.category === "Vehicle") setSelectedVehicle(id)
            }}
          />
        )}
        {tab === "customization" && (
          <HousingUI />
        )}
        {tab === "map" && (
          <MapTab />
        )}
        {tab === "contracts" && (
          <ContractsTab
            selected={selectedBounties}
            toggle={toggleBounty}
            meta={meta}
          />
        )}
        {tab === "techlab" && (
          <TechLabTab
            selectedChar={selectedChar}
            setSelectedChar={setSelectedChar}
            onRankUp={(nodeId: string) => { tryRankUpSkill(selectedChar, nodeId); refreshMeta() }}
            meta={meta}
          />
        )}
        {tab === "multiplayer" && (
          <MultiplayerTab />
        )}
        {tab === "profile" && (
          <ProfileTab />
        )}
        {tab === "archives" && (
          <ArchivesTab />
        )}
      </div>

      {/* Footer deploy bar */}
      <footer className="relative z-50 px-4 sm:px-6 lg:px-10 py-4 sm:py-8 border-t-4 border-black flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 sm:gap-6 bg-black/80 backdrop-blur-xl">
        <div className="flex gap-4 sm:gap-8 lg:gap-12 items-start lg:items-center flex-col sm:flex-row">
          <div className="flex flex-col">
            <div className="text-[10px] text-white/30 font-black tracking-[0.4em] mb-1">UNIT_SYNC_STATUS</div>
            <div className="font-bebas text-lg sm:text-2xl text-white uppercase tracking-[0.14em] sm:tracking-widest flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-[#00ffaa]">{CHARACTERS[selectedChar as CharacterId]?.displayName ?? "Pilot"}</span> 
              <span className="opacity-10 text-sm">/</span> 
              <span>{(selectedVehicle ?? "").replace("vehicle_","")}</span> 
              <span className="opacity-10 text-sm">/</span> 
              <span>{(selectedWeapon ?? "").replace("weapon_","")}</span>
            </div>
          </div>
          {selectedBounties.length > 0 && (
            <div className="sm:pl-6 lg:pl-12 sm:border-l-4 border-black">
              <div className="text-[10px] text-[#ffaa00] font-black tracking-[0.4em] mb-1">ACTIVE_CONTRACTS</div>
              <div className="font-bebas text-lg sm:text-xl text-[#ffaa00] uppercase tracking-[0.12em] sm:tracking-widest break-words">
                {selectedBounties.map(id => (id ?? "").replace("bounty_","")).join(" + ")}
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={deploy}
          disabled={!canDeploy}
          className="btn-wasteland-premium h-16 sm:h-20 w-full lg:w-auto px-8 sm:px-16 text-2xl sm:text-4xl shadow-[8px_8px_0_0_#000]"
        >
          BEREIT FÜR DIE WILDNIS
        </button>
      </footer>
    </div>
  )
}

// ---------------- COMPONENTS & TABS ----------------

function ResourceBox({ label, value, color, icon }: { label: string, value: number, color: string, icon: "scrap" | "tech" }) {
  return (
    <div className="flex gap-2 sm:gap-4 items-center bg-black/40 p-1 pr-2 sm:pr-4 border-2 border-black shadow-[2px_2px_0_0_#000]">
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/60">
        <Image
          src={assetPath("/assets/ui/currencies.png")}
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          style={{ objectPosition: icon === "tech" ? "-100% 0" : "0 0" }}
          alt={label}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-[9px] font-bold tracking-[0.3em] text-white/30">{label}</div>
        <div className="font-orbitron text-lg sm:text-2xl font-black leading-none" style={{ color }}>{value}</div>
      </div>
    </div>
  )
}

interface PilotTabProps {
  selectedChar: CharacterId
  setSelectedChar: (c: CharacterId) => void
  selectedVehicle: string
  setSelectedVehicle: (v: string) => void
  selectedWeapon: string
  setSelectedWeapon: (w: string) => void
  unlockedVehicles: string[]
  unlockedWeapons: string[]
  unlockedCharacters: CharacterId[]
}
function PilotTab({ selectedChar, setSelectedChar, selectedVehicle, setSelectedVehicle, selectedWeapon, setSelectedWeapon, unlockedVehicles, unlockedWeapons, unlockedCharacters }: PilotTabProps) {
  const char = CHARACTERS[selectedChar as CharacterId]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 h-full">
      {/* Pilot Selector */}
      <div className="xl:col-span-3 space-y-4">
        <SectionHeader>PILOT WÄHLEN</SectionHeader>
        {((Object.keys(CHARACTERS) as CharacterId[])).map(id => {
          const c = CHARACTERS[id]
          const active = selectedChar === id
          const isUnlocked = unlockedCharacters.includes(id)
          const portrait = assetPath(`/assets/ui/portrait_${id}.png`)
          return (
            <button
              key={id}
              onClick={() => isUnlocked && setSelectedChar(id)}
              disabled={!isUnlocked}
              className={`w-full group relative flex items-center gap-3 p-4 border-4 transition-all ${
                active ? "bg-[#00ffaa]/10 border-[#00ffaa] translate-x-1" : "bg-white/5 border-black hover:border-white/20"
              } ${!isUnlocked ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className={`w-16 h-16 flex-shrink-0 bg-black border-2 ${active ? "border-[#00ffaa]" : "border-white/10"} overflow-hidden relative`}>
                <Image src={portrait} alt={c.displayName} fill sizes="64px" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <div className="font-bebas text-3xl text-white tracking-widest group-hover:text-[#00ffaa]">{c.displayName}</div>
                <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1 truncate">{c.title}</div>
              </div>
              {active && <div className="absolute top-2 right-2 w-2 h-2 bg-[#00ffaa] animate-pulse"></div>}
              {!isUnlocked && <div className="absolute top-2 right-2 text-[9px] tracking-widest text-white/50">LOCKED</div>}
            </button>
          )
        })}
      </div>

      {/* Pilot Visuals & Stats */}
      <div className="xl:col-span-4 flex flex-col gap-4">
        <SectionHeader>PILOTEN_DATEN</SectionHeader>
        <div className="flex-1 panel-wasteland bg-[#0a111f] p-8 inner-glow-toxic">
          <div className="space-y-6">
            <div className="relative w-full aspect-[4/3] overflow-hidden border-2 border-[#00ffaa]/30 bg-black">
              <Image
                src={assetPath(`/assets/ui/portrait_${selectedChar}.png`)}
                fill
                sizes="(max-width: 1280px) 100vw, 33vw"
                className="w-full h-full object-cover"
                alt={char.displayName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a111f] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 font-bebas text-4xl text-[#00ffaa] tracking-widest toxic-glow">{char.displayName}</div>
            </div>
            <div className="relative">
               <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#00ffaa]/20"></div>
               <p className="text-white/60 text-sm italic leading-relaxed pl-2">"{char.shortLore}"</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <StatCard label="HÜLLE" value={char.baseStats.maxHealth} />
              <StatCard label="PANZERUNG" value={char.baseStats.armor} />
              <StatCard label="GESCHW." value={`+${char.baseStats.moveSpeedPercent}%`} />
              <StatCard label="RADAR" value={`+${char.baseStats.pickupRadiusPercent}%`} />
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="font-bebas text-4xl text-[#00ffaa] tracking-widest toxic-glow">{char.passiveTrait.name}</div>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest leading-loose">{char.passiveTrait.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Selector */}
      <div className="xl:col-span-5 space-y-8">
        <div>
          <SectionHeader>FAHRZEUG-CHASSIS</SectionHeader>
          <div className="grid grid-cols-2 gap-3">
            {SHOP_ITEMS.filter(i => i.category === "Vehicle").map(v => (
              <EquipButton 
                key={v.id} item={v} 
                owned={unlockedVehicles.includes(v.id)} 
                active={selectedVehicle === v.id} 
                onSelect={() => setSelectedVehicle(v.id)} 
              />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader>WAFFENSYSTEM</SectionHeader>
          <div className="grid grid-cols-2 gap-3">
            {SHOP_ITEMS.filter(i => i.category === "Weapon").map(v => (
              <EquipButton 
                key={v.id} item={v} 
                owned={unlockedWeapons.includes(v.id)} 
                active={selectedWeapon === v.id} 
                onSelect={() => setSelectedWeapon(v.id)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TechLabTabProps {
  selectedChar: CharacterId
  setSelectedChar: (c: CharacterId) => void
  onRankUp: (nodeId: string) => void
  meta: MetaProgress
}
function TechLabTab({ selectedChar, setSelectedChar, onRankUp, meta }: TechLabTabProps) {
  const char = CHARACTERS[selectedChar as CharacterId]
  const ranks = meta.skillTech[selectedChar] ?? {}

  // Icon mapping for branches
  const branchIcons: Record<string, string> = {
    "chrom_alchemie": assetPath("/assets/ui/rixa_alchemistry.png"),
    "secco_chaos": assetPath("/assets/ui/rixa_chaos.png"),
    "herzbrecherin": assetPath("/assets/ui/rixa_lifesteal.png"),
    "magnetik": assetPath("/assets/ui/marek_magnetics.png"),
    "drohnenwerk": assetPath("/assets/ui/marek_drones.png"),
    "bollwerk": assetPath("/assets/ui/marek_bollwerk.png")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeader>TECH-REKONSTRUKTIONS-LABOR</SectionHeader>
        <div className="flex gap-2">
          {((Object.keys(CHARACTERS) as CharacterId[])).map(id => (
            <button
              key={id}
              onClick={() => setSelectedChar(id)}
              className={`px-6 py-1 font-bebas text-lg tracking-widest border-2 transition ${
                selectedChar === id ? "bg-[#c9b7ff] border-[#c9b7ff] text-black" : "border-white/10 text-white/40"
              }`}
            >
              {CHARACTERS[id].displayName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {char.branches.map(branch => (
          <div key={branch.id} className="relative flex flex-col gap-6">
            <div className="flex items-center gap-4 border-l-4 border-[#c9b7ff] pl-4">
              <div className="w-14 h-14 bg-black border-2 border-[#c9b7ff] p-1 flex items-center justify-center overflow-hidden relative">
                <Image src={branchIcons[branch.id]} alt="" fill sizes="56px" className="w-full h-full object-cover scale-150 rotate-[-15deg]" />
              </div>
              <div>
                <div className="font-bebas text-3xl text-white tracking-widest leading-none">{branch.name}</div>
                <div className="text-[10px] text-[#c9b7ff] font-bold tracking-[0.2em]">{branch.theme.toUpperCase()}</div>
              </div>
            </div>

            <div className="space-y-4">
              {branch.nodes.map((n, i) => {
                const rank = ranks[n.id] ?? 0
                const maxed = rank >= n.maxRanks
                const affordable = meta.totalTech >= n.techCost
                return (
                  <div key={n.id} className={`group relative p-5 border-4 transition-all shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                    n.tier === 4 ? "border-[#ffaa00] bg-[#ffaa00]/5" : "border-black bg-black/60 hover:border-[#c9b7ff]/30"
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className={`font-orbitron font-black text-[10px] tracking-widest mb-1 ${n.tier === 4 ? "text-[#ffaa00]" : "text-[#c9b7ff]/40"}`}>
                          NODE_{n.tier === 4 ? "OMEGA" : `0${n.tier}`}
                        </span>
                        <div className="font-bebas text-3xl text-white tracking-widest group-hover:text-[#c9b7ff] transition-colors leading-none">{n.name}</div>
                      </div>
                      <div className="px-3 py-1 bg-black/80 border border-white/5 font-orbitron text-[10px] text-[#c9b7ff] group-hover:text-white">{rank}/{n.maxRanks}</div>
                    </div>
                    
                    <p className="text-xs text-white/40 leading-relaxed mb-6 min-h-[3em] uppercase tracking-wider">{n.description}</p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#c9b7ff]/10 flex items-center justify-center">
                           <Image src={assetPath("/assets/ui/currencies.png")} alt="" width={24} height={24} className="w-6 h-6 object-contain hue-rotate-[240deg]" style={{ objectPosition: "-50px 0" }} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-white/20 tracking-widest uppercase">Input Req</span>
                           <span className="text-[#c9b7ff] font-orbitron font-bold text-lg leading-none">{n.techCost}T</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRankUp(n.id)}
                        disabled={maxed || !affordable}
                        className={`px-6 py-2 font-bebas text-xl tracking-widest transition-all border-2 ${
                          maxed ? "bg-white/5 border-transparent text-white/20" : 
                          affordable ? "bg-[#c9b7ff] border-black text-black hover:bg-white" : 
                          "bg-black text-[#ff4444] border-[#ff4444]"
                        }`}
                      >
                        {maxed ? "SYNCED" : affordable ? "RANK UP" : "LOCKED"}
                      </button>
                    </div>

                    {/* Branch connector line visual (pseudo) */}
                    {i < branch.nodes.length - 1 && (
                      <div className="absolute left-[-22px] bottom-[-24px] w-[2px] h-[30px] bg-white/5"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ShopTabProps {
  meta: MetaProgress
  onBuy: (id: string) => void
}
function ShopTab({ meta, onBuy }: ShopTabProps) {
  const grouped = useMemo(() => {
    const g: Record<string, ShopItem[]> = {}
    for (const it of SHOP_ITEMS) { (g[it.category] ??= []).push(it) }
    return g
  }, [])

  const ownedSet = new Set<string>([
    ...meta.unlockedWeapons, ...meta.unlockedVehicles,
    ...meta.unlockedUpgrades, ...meta.unlockedCosmetics,
  ])

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <SectionHeader>{cat === "Weapon" ? "WAFFEN" : cat === "Vehicle" ? "FAHRZEUGE" : cat === "Upgrade" ? "UPGRADES" : cat.toUpperCase()} ERWERB</SectionHeader>
          <div className="grid grid-cols-4 gap-6">
            {items.map((it) => {
              const owned = ownedSet.has(it.id)
              const canAfford = meta.totalScrap >= it.scrapCost && meta.totalTech >= it.techCost
              return (
                <div key={it.id} className={`group p-6 border-4 shadow-[6px_6px_0_0_#000] transition-all bg-[#0a111f] relative overflow-hidden ${owned ? 'opacity-40 border-black' : 'border-black hover:border-white/10 hover:translate-y-[-4px]'}`}>
                  <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
                    <div className="w-6 h-6 bg-white rotate-45"></div>
                  </div>
                  
                  <div className="flex flex-col h-full gap-5">
                    <div className="flex justify-between items-start">
                      <div className="font-bebas text-4xl text-white tracking-widest leading-none">{it.displayName}</div>
                    </div>
                    
                    <p className="text-xs text-white/40 flex-1 leading-relaxed uppercase tracking-widest">{it.description}</p>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <div className="text-[9px] font-black text-white/20 tracking-widest mb-1">REQ_SALVAGE</div>
                        <div className="flex gap-4 font-orbitron font-black text-lg">
                          <span className="text-[#00ffaa]">{it.scrapCost}S</span>
                          {it.techCost > 0 && <span className="text-[#c9b7ff]">{it.techCost}T</span>}
                        </div>
                      </div>
                      {!owned ? (
                        <button
                          onClick={() => onBuy(it.id)}
                          disabled={!canAfford}
                          className={`px-6 py-2 font-bebas text-2xl tracking-widest border-2 transition-all ${
                            canAfford ? 'bg-[#00ffaa] border-black text-black hover:bg-white' : 'bg-black border-white/5 text-white/10'
                          }`}
                        >
                          BUY
                        </button>
                      ) : (
                        <div className="text-[10px] font-black text-[#00ffaa] tracking-[0.4em] uppercase">Inventory_Sync</div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

interface ContractsTabProps {
  selected: string[]
  toggle: (id: string) => void
  meta: MetaProgress
}
function ContractsTab({ selected, toggle, meta }: ContractsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <SectionHeader>AKTIVE KOPFGELD-VERTRÄGE</SectionHeader>
        <p className="text-xs text-white/30 tracking-widest uppercase mb-6">Select up to 2 high-stakes modifiers for increased salvage rewards.</p>
        <div className="grid grid-cols-3 gap-6">
          {BOUNTIES.map(b => {
            const active = selected.includes(b.id)
            const unlocked = b.unlockCost === 0 || meta.unlockedBounties.includes(b.id) || meta.totalScrap >= b.unlockCost
            return (
              <button
                key={b.id}
                disabled={!unlocked}
                onClick={() => toggle(b.id)}
                className={`relative group p-8 border-4 transition-all text-left bg-[#0a111f] shadow-[6px_6px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                  active ? "border-[#ffaa00] translate-y-[-4px] shadow-[0_12px_0_0_#000]" :
                  unlocked ? "border-black hover:border-white/10" : "opacity-20 grayscale pointer-events-none"
                }`}
              >
                <div className="flex flex-col h-full gap-6">
                  <div className="font-bebas text-5xl text-white tracking-widest group-hover:text-[#ffaa00] leading-none">{b.displayName}</div>
                  <p className="text-xs text-white/40 flex-1 leading-relaxed uppercase tracking-[0.15em]">{b.description}</p>
                  
                  <div className="flex justify-between items-end pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <div className="text-[9px] font-black text-white/20 tracking-widest mb-1">EST_DATA_REWARD</div>
                      <div className="font-orbitron font-black text-[#ffaa00] text-2xl">+{b.rewardScrap}S / +{b.rewardTech}T</div>
                    </div>
                    {active ? (
                      <div className="bg-[#ffaa00] text-black px-5 py-2 font-bebas text-2xl tracking-[0.2em] shadow-[4px_4px_0_0_#000]">ACTIVE</div>
                    ) : (
                      <div className="text-white/20 font-bebas text-2xl tracking-widest border-2 border-white/5 px-4 py-1">READY</div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}



function StoryTab() {
  const quests = useStoryStore((s) => s.quests)
  const npcs = useStoryStore((s) => s.npcs)
  const startDialog = useStoryStore((s) => s.startDialog)
  const startDialogById = useStoryStore((s) => s.startDialogById)
  const updateQuestStatus = useStoryStore((s) => s.updateQuestStatus)
  
  const activeQuests = quests.filter(q => q.status === 'active' || q.status === 'ready_to_turn_in')
  const availableQuests = quests.filter(q => q.status === 'available')
  
  const handleStartQuest = (q: Quest) => {
    updateQuestStatus(q.id, 'active')
    startDialog({
      id: `${q.id}_intro`,
      speaker: q.giver || 'Unbekannte Stimme',
      text: q.description,
      options: [
        { 
          text: 'Ich nehme die Herausforderung an.', 
          action: () => {
            console.log(`Quest ${q.id} started`);
          }
        },
        { text: 'Ich bin noch nicht bereit.' }
      ]
    })
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 space-y-8">
        <SectionHeader>AKTIVE KAMPAGNE</SectionHeader>
        {activeQuests.length > 0 ? (
          activeQuests.map(q => (
            <div key={q.id} className="panel-wasteland bg-black/60 p-6 border-4 border-cyan-500 shadow-[8px_8px_0_0_rgba(0,255,255,0.2)]">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <div className="text-cyan-400 font-orbitron font-black text-[10px] tracking-widest mb-1">{q.id} // {q.status.toUpperCase()}</div>
                   <div className="font-bebas text-4xl text-white tracking-widest uppercase">{q.title}</div>
                 </div>
                 <div className="px-3 py-1 bg-cyan-500 text-black font-bebas text-xl">{q.type.toUpperCase()}</div>
               </div>
               <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{q.description}"</p>
               
               <div className="space-y-3">
                 {q.objectives.map(obj => (
                   <div key={obj.id} className="flex items-center gap-3">
                     <div className={`w-3 h-3 rotate-45 ${obj.isCompleted ? 'bg-cyan-500' : 'border border-cyan-500/40'}`} />
                     <span className={`text-xs font-bold tracking-widest uppercase ${obj.isCompleted ? 'text-white/20 line-through' : 'text-white/80'}`}>
                       {obj.description}
                     </span>
                   </div>
                 ))}
               </div>

               {q.status === 'ready_to_turn_in' && (
                 <button 
                   onClick={() => updateQuestStatus(q.id, 'completed')}
                   className="w-full mt-6 bg-cyan-500 text-black font-bebas text-2xl py-3 hover:bg-white transition-all shadow-[4px_4px_0_0_#000]"
                 >
                   QUEST ABSCHLIESSEN
                 </button>
               )}
            </div>
          ))
        ) : availableQuests.length > 0 ? (
          <div className="space-y-4">
            {availableQuests.map(q => (
              <div key={q.id} className="panel-wasteland bg-black/40 p-8 border-4 border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-cyan-400 font-orbitron font-black text-[10px] tracking-widest mb-1">{q.id} // VERFÜGBAR</div>
                <div className="font-bebas text-3xl text-white mb-4 tracking-[0.3em] uppercase">{q.title}</div>
                <button 
                  onClick={() => handleStartQuest(q)}
                  className="btn-wasteland-premium px-10 py-4 text-2xl"
                >
                  INITIALISIEREN
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="panel-wasteland bg-black/40 p-12 border-4 border-white/5 flex flex-col items-center justify-center text-center">
            <div className="text-white/20 font-bebas text-3xl mb-4 tracking-[0.3em]">KEINE AKTIVEN KAMPAGNEN-DATEN</div>
            <p className="text-white/10 text-[10px] tracking-widest uppercase">System wartet auf Signal...</p>
          </div>
        )}
      </div>

      <div className="col-span-4 space-y-8">
        <SectionHeader>NPC VERZEICHNIS</SectionHeader>
        <div className="space-y-4">
          {npcs.map(npc => {
            const canTalk = npc.status !== 'unknown'
            return (
              <div key={npc.id} className="flex items-center justify-between p-4 bg-white/5 border-2 border-black group hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black border border-white/10 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white/10 text-[8px] font-bold">
                      {npc.id.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="font-bebas text-xl text-white tracking-widest group-hover:text-cyan-400 transition-colors">{npc.name}</div>
                    <div className="text-[9px] text-white/30 font-black tracking-widest uppercase">{npc.role} // {npc.region}</div>
                  </div>
                </div>
                {canTalk && (
                  <button 
                    onClick={() => startDialogById(`${npc.id}_greeting`)}
                    className="px-2 py-1 border border-cyan-500 text-cyan-500 font-bebas text-xs hover:bg-cyan-500 hover:text-black transition-colors"
                  >
                    SPRECHEN
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


// ---------------- HELPERS ----------------

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mb-6">
      <div className="text-[11px] font-black tracking-[0.4em] text-white/30 uppercase">{children}</div>
      <div className="absolute -bottom-1 left-0 w-8 h-1 bg-[#00ffaa]"></div>
    </div>
  )
}

function StatCard({ label, value }: { label: string, value: ReactNode }) {
  return (
    <div className="bg-black/60 p-4 border-2 border-black flex flex-col items-center shadow-[2px_2px_0_0_#000] group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      <div className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase mb-1">{label}</div>
      <div className="font-orbitron text-2xl font-black text-white group-hover:text-[#00ffaa] transition-colors">{value}</div>
    </div>
  )
}

interface EquipButtonProps {
  item: ShopItem
  owned: boolean
  active: boolean
  onSelect: () => void
}
function EquipButton({ item, owned, active, onSelect }: EquipButtonProps) {
  return (
    <button
      disabled={!owned}
      onClick={onSelect}
      className={`group relative flex flex-col p-5 border-4 transition-all text-left shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 ${
        active ? "bg-[#00ffaa]/10 border-[#00ffaa] z-10" :
        owned ? "bg-black/60 border-black hover:border-white/10" : "opacity-20 grayscale cursor-not-allowed"
      }`}
    >
      <div className={`font-bebas text-2xl tracking-widest leading-none ${active ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
        {item.displayName}
      </div>
      <div className="text-[10px] text-white/20 mt-2 uppercase font-black tracking-widest">{item.description}</div>
      
      {active && <div className="absolute top-2 right-2 w-2 h-2 bg-[#00ffaa] toxic-glow"></div>}
    </button>
  )
}

function ArchivesTab() {
  const flags = useStoryStore((s) => s.worldState.flags)
  
  const loreItems = [
    { id: 'l1', title: 'DIE ERSTE LATERNE', description: 'Ein Bericht über die Gründung von Fackelruh.', unlocked: true },
    { id: 'l2', title: 'GLAS-ANATOMIE', description: 'Skizzen der Glasbestie aus der Sumpfkathedrale.', unlocked: flags.mq04_boss_defeated },
    { id: 'l3', title: 'DREI DOCHTE', description: 'Eine Anleitung zum Entzünden der Außenposten.', unlocked: flags.mq03_hub_rebuilt }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loreItems.map(item => (
        <div key={item.id} className={`panel-wasteland p-6 border-4 ${item.unlocked ? 'border-cyan-500/40 bg-black/60' : 'border-white/5 bg-black/20 opacity-40'}`}>
          <div className="text-[10px] font-black text-cyan-400 mb-2">LORE_DATA // {item.id}</div>
          <div className="font-bebas text-2xl text-white mb-2">{item.unlocked ? item.title : 'VERSCHLÜSSELT'}</div>
          <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">
            {item.unlocked ? item.description : 'Datenfragmente fehlen. Setze die Kampagne fort.'}
          </p>
        </div>
      ))}
    </div>
  )
}

function HubDeco() {
  const flags = useStoryStore((s) => s.worldState.flags)
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      {flags.mq01_saved_school && (
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="text-[40px]">🎒</div>
          <div className="text-[10px] font-black text-cyan-400 bg-black/80 px-2 py-1 mt-2">SCHULE_GERETTET</div>
        </div>
      )}
      {flags.mq01_saved_smokehouse && (
        <div className="absolute top-20 right-10 animate-pulse">
          <div className="text-[40px]">🐟</div>
          <div className="text-[10px] font-black text-orange-400 bg-black/80 px-2 py-1 mt-2">VORRÄTE_GESICHERT</div>
        </div>
      )}
      {flags.mq03_hub_rebuilt && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-[80vw] h-1 bg-cyan-500/20 toxic-glow"></div>
          <div className="text-[10px] text-center font-black text-cyan-500 mt-2 tracking-[1em]">LATERNENHOF_SYNCHRONISIERT</div>
        </div>
      )}
    </div>
  )
}

function WorldStateStatus() {
  const quests = useStoryStore((s) => s.quests)
  
  const isMQ01Active = quests.find(q => q.id === 'MQ-01' && q.status === 'active')
  const isMQ03Done = quests.find(q => q.id === 'MQ-03' && q.status === 'completed')
  
  let statusText = "REGION: GRAUMARSCH // STABIL"
  let color = "#00ffaa"
  
  if (isMQ01Active) {
    statusText = "KRISE: FACKELRUH BRENNT!"
    color = "#ff4400"
  } else if (isMQ03Done) {
    statusText = "REGION: LATERNENHOF // GESICHERT"
    color = "#00ccff"
  }
  
  return (
    <div className="flex flex-col items-end sm:items-start lg:items-end">
      <div className="text-[10px] font-black tracking-[0.4em] text-white/30 mb-1 uppercase">Sektor_Status</div>
      <div className="font-orbitron text-sm font-bold tracking-widest flex items-center gap-2" style={{ color }}>
        <div className={`w-2 h-2 rounded-full ${isMQ01Active ? 'animate-ping' : ''}`} style={{ backgroundColor: color }}></div>
        {statusText}
      </div>
    </div>
  )
}
