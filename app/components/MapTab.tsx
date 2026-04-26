import React from "react"
import { AREA_DEFINITIONS } from "../../src/data/AreaData"
import { useT } from "../../src/i18n/useT"

export default function MapTab() {
  const t = useT()

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full text-white pb-24 font-inter relative z-20">
      <div className="flex flex-col gap-2 border-b-4 border-black/50 pb-4">
        <h2 className="font-bebas text-5xl text-white tracking-widest uppercase shadow-black drop-shadow-md">
          {t("ui.map.title")}
        </h2>
        <p className="text-white/70 text-sm max-w-3xl font-semibold">{t("ui.map.subtitle")}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        <div className="flex-1 bg-[#111116] border-4 border-black shadow-[8px_8px_0_0_#000] relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />

          {AREA_DEFINITIONS.map((area) => (
            <div
              key={area.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer hover:scale-125 transition-transform duration-300 z-10"
              style={{ left: `${area.mapX}%`, top: `${area.mapY}%` }}
            >
              <div className="w-6 h-6 rounded-full border-2 border-white animate-pulse" style={{ backgroundColor: area.color }} />
              <div
                className="mt-2 text-[10px] font-black uppercase tracking-widest bg-black/80 px-2 py-1 border border-white/20 whitespace-nowrap"
                style={{ color: area.color }}
              >
                {t(area.nameKey)}
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 text-xs font-black text-white/30 tracking-widest uppercase">{t("ui.map.status")}</div>
        </div>

        <div className="w-full lg:w-96 flex flex-col gap-4">
          {AREA_DEFINITIONS.map((area) => (
            <div
              key={`detail_${area.id}`}
              className="border-4 border-black bg-black/40 p-4 hover:bg-white/5 transition-colors cursor-crosshair relative overflow-hidden group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: area.color }} />

              <h3 className="font-bebas text-2xl tracking-wider uppercase mb-1 pl-4" style={{ color: area.color }}>
                {t(area.nameKey)}
              </h3>
              <div className="text-[10px] text-white/50 font-black uppercase tracking-widest pl-4 mb-2">
                {t("ui.map.biome")}: {area.biome}
              </div>
              <p className="text-white/70 text-xs pl-4 mb-3">{t(area.descriptionKey)}</p>

              <div className="pl-4 flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 px-2 py-1 text-[10px] font-black uppercase tracking-widest transition-colors">
                  {t("ui.map.set_waypoint")}
                </button>
                <button
                  className="flex-1 text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest transition-colors"
                  style={{ backgroundColor: area.color }}
                >
                  {t("ui.map.deploy_here")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
