export type Locale = "de" | "en"

export const dictionaries = {
  "ui.map.title": { de: "Gebietsübersicht", en: "Area Overview" },
  "ui.map.subtitle": {
    de: "Wähle ein Einsatzgebiet aus dem dokumentierten Area-Instanz-Modell.",
    en: "Select a deployment area from the documented area-instance model.",
  },
  "ui.map.status": { de: "Deploy-Netz aktiv", en: "Deploy network active" },
  "ui.map.biome": { de: "Biom", en: "Biome" },
  "ui.map.set_waypoint": { de: "Wegpunkt setzen", en: "Set waypoint" },
  "ui.map.deploy_here": { de: "Hier deployen", en: "Deploy here" },
  "ui.multiplayer.title": { de: "Mehrspieler-Hub", en: "Multiplayer Hub" },
  "ui.multiplayer.subtitle": {
    de: "Koordiniere Runs, Lobbys und Comms mit anderen Piloten.",
    en: "Coordinate runs, lobbies, and comms with other pilots.",
  },
  "ui.multiplayer.leaderboard": { de: "Globale Rangliste", en: "Global Leaderboard" },
  "ui.multiplayer.refresh_rankings": { de: "Rangliste aktualisieren", en: "Refresh rankings" },
  "ui.multiplayer.lobby_finder": { de: "Lobby-Finder", en: "Lobby Finder" },
  "ui.multiplayer.join": { de: "Beitreten", en: "Join" },
  "ui.multiplayer.leave": { de: "Verlassen", en: "Leave" },
  "ui.multiplayer.create": { de: "Erstellen", en: "Create" },
  "ui.multiplayer.chat": { de: "Globaler Funk", en: "Global Comms" },
  "ui.multiplayer.send": { de: "Senden", en: "Send" },
  "callout.extraction.deployed": { de: "EXTRAKTIONSZONE AKTIV — 5s HALTEN", en: "EXTRACTION ZONE DEPLOYED — HOLD 5s" },
  "callout.extraction.extracting": { de: "EXTRAKTION... {seconds}", en: "EXTRACTING... {seconds}" },
  "callout.extraction.interrupted": { de: "EXTRAKTION UNTERBROCHEN", en: "EXTRACTION INTERRUPTED" },
  "callout.extraction.success": { de: "EXTRAKTION ERFOLGREICH", en: "EXTRACTION SUCCESSFUL" },
  "callout.boss.incoming": { de: "BOSS NÄHERT SICH!", en: "BOSS INCOMING!" },
  "callout.wave.number": { de: "WELLE {wave}", en: "WAVE {wave}" },
  "callout.vehicle.destroyed": { de: "FAHRZEUG ZERSTÖRT", en: "VEHICLE DESTROYED" },
  "callout.scrap.legendary": { de: "LEGENDÄRER SCHROTT GEFUNDEN!", en: "LEGENDARY SCRAP DROPPED!" },
  "callout.run.guardian": { de: "EXTRAKTIONSWÄCHTER NÄHERT SICH!", en: "EXTRACTION GUARDIAN INCOMING!" },
  "callout.mine.warning": { de: "MINE!", en: "MINE!" },
  "callout.story.mira_found": { de: "MIRA VOSS GEFUNDEN!", en: "MIRA VOSS FOUND!" },
  "callout.story.wick_one": { de: "ERSTER DOCHT ENTZÜNDET!", en: "FIRST WICK LIT!" },
  "callout.story.wick_two": { de: "ZWEITER DOCHT ENTZÜNDET!", en: "SECOND WICK LIT!" },
  "callout.story.wick_three": { de: "DRITTER DOCHT ENTZÜNDET! DER WEG IST FREI.", en: "THIRD WICK LIT! THE PATH IS CLEAR." },
  "callout.glassbeast.shard": { de: "GLASBESTIE: SPLITTER-REGEN!", en: "GLASSBEAST: SHARD RAIN!" },
  "callout.glassbeast.reflect": { de: "GLASBESTIE: REFLEXIONS-SCHILD AKTIV!", en: "GLASSBEAST: REFLECTION SHIELD ACTIVE!" },
  "callout.ability.rixa": { de: "CHROM-ALCHEMIE!", en: "CHROM-ALCHEMY!" },
  "callout.ability.marek": { de: "DROHNEN-WACHT!", en: "DRONE WATCH!" },
  "callout.run.extracted": {
    de: "EXTRAHIERT — +{scrap} Schrott (+{bonus} Wellenbonus), +{tech} Tech",
    en: "EXTRACTED — +{scrap} scrap (+{bonus} wave bonus), +{tech} tech",
  },
  "callout.run.wiped": {
    de: "GESCHEITERT — eingelagert {scrap} Schrott, verloren {techLost} Tech",
    en: "WIPED — banked {scrap} scrap, lost {techLost} tech",
  },
  "area.graumarsch.name": { de: "Graumarsch", en: "Graumarsch" },
  "area.graumarsch.description": { de: "Startgebiet mit mittlerer Bedrohung und stabilen Extraktionsrouten.", en: "Starter area with medium threat and stable extraction routes." },
  "area.sonnenglasweite.name": { de: "Sonnenglasweite", en: "Sun-Glass Expanse" },
  "area.sonnenglasweite.description": { de: "Offene Glasfelder mit hoher Sichtweite und Scherbenstürmen.", en: "Open glass plains with long sight-lines and shard storms." },
  "area.wurzelwald.name": { de: "Wurzelwald Nhal", en: "Root-Forest Nhal" },
  "area.wurzelwald.description": { de: "Dichte Korridore und ambush-lastige Begegnungen.", en: "Dense corridors and ambush-heavy encounters." },
} as const

export type TranslationKey = keyof typeof dictionaries
export type TranslationVars = Record<string, string | number>

function interpolate(template: string, vars?: TranslationVars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`))
}

export function t(key: TranslationKey, vars?: TranslationVars, locale: Locale = "de"): string {
  const entry = dictionaries[key]
  if (!entry) {
    const fallback = `[missing:${key}]`
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] missing key: ${key}`)
      return fallback
    }
    console.error(`[i18n] missing key in production: ${key}`)
    return "Text unavailable"
  }
  return interpolate(entry[locale], vars)
}
