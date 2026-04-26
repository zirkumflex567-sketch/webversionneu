export type Locale = "de" | "en"

export const dictionaries = {
  "ui.map.title": { de: "Gebiets?bersicht", en: "Area Overview" },
  "ui.map.subtitle": {
    de: "W?hle ein Einsatzgebiet aus dem dokumentierten Area-Instanz-Modell.",
    en: "Select a deployment area from the documented area-instance model.",
  },
  "ui.map.status": { de: "Deploy-Netz aktiv", en: "Deploy network active" },
  "ui.map.biome": { de: "Biom", en: "Biome" },
  "ui.map.state": { de: "Status", en: "State" },
  "ui.map.state.locked": { de: "Gesperrt", en: "Locked" },
  "ui.map.state.active_quest": { de: "Aktive Quest", en: "Active Quest" },
  "ui.map.state.cleared_free_run": { de: "Freier Lauf verf?gbar", en: "Free Run Available" },
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

  "ui.bounty.title": { de: "Vertragsauswahl", en: "Bounty Selection" },
  "ui.bounty.subtitle": {
    de: "W?hle genau einen Vertrag pro Run. Der Vertrag ist nach Run-Start gesperrt.",
    en: "Select exactly one contract per run. Contract is locked after run start.",
  },
  "ui.bounty.select": { de: "Ausw?hlen", en: "Select" },
  "ui.bounty.selected": { de: "Ausgew?hlt", en: "Selected" },
  "ui.bounty.confirm": { de: "Run best?tigen", en: "Confirm Run" },
  "ui.bounty.skip": { de: "Ohne Vertrag starten", en: "Start without Contract" },
  "ui.bounty.active_count": { de: "Aktive Vertr?ge", en: "Active Contracts" },
  "ui.bounty.one_only": { de: "Nur ein Vertrag erlaubt", en: "Only one contract allowed" },

  "ui.story.type.main": { de: "Hauptquest", en: "Main Quest" },
  "ui.story.type.side": { de: "Nebenquest", en: "Side Quest" },
  "ui.story.type.companion": { de: "Begleiterquest", en: "Companion Quest" },
  "ui.story.type.event": { de: "Ereignis", en: "Event" },

  "callout.extraction.deployed": { de: "EXTRAKTIONSZONE AKTIV - 5s HALTEN", en: "EXTRACTION ZONE DEPLOYED - HOLD 5s" },
  "callout.extraction.extracting": { de: "EXTRAKTION... {seconds}", en: "EXTRACTING... {seconds}" },
  "callout.extraction.interrupted": { de: "EXTRAKTION UNTERBROCHEN", en: "EXTRACTION INTERRUPTED" },
  "callout.extraction.success": { de: "EXTRAKTION ERFOLGREICH", en: "EXTRACTION SUCCESSFUL" },
  "callout.boss.incoming": { de: "BOSS N?HERT SICH!", en: "BOSS INCOMING!" },
  "callout.wave.number": { de: "WELLE {wave}", en: "WAVE {wave}" },
  "callout.vehicle.destroyed": { de: "FAHRZEUG ZERST?RT", en: "VEHICLE DESTROYED" },
  "callout.scrap.legendary": { de: "LEGEND?RER SCHROTT GEFUNDEN!", en: "LEGENDARY SCRAP DROPPED!" },
  "callout.run.guardian": { de: "EXTRAKTIONSW?CHTER N?HERT SICH!", en: "EXTRACTION GUARDIAN INCOMING!" },
  "callout.mine.warning": { de: "MINE!", en: "MINE!" },
  "callout.story.mira_found": { de: "MIRA VOSS GEFUNDEN!", en: "MIRA VOSS FOUND!" },
  "callout.story.wick_one": { de: "ERSTER DOCHT ENTZ?NDET!", en: "FIRST WICK LIT!" },
  "callout.story.wick_two": { de: "ZWEITER DOCHT ENTZ?NDET!", en: "SECOND WICK LIT!" },
  "callout.story.wick_three": { de: "DRITTER DOCHT ENTZ?NDET! DER WEG IST FREI.", en: "THIRD WICK LIT! THE PATH IS CLEAR." },
  "callout.glassbeast.shard": { de: "GLASBESTIE: SPLITTER-REGEN!", en: "GLASSBEAST: SHARD RAIN!" },
  "callout.glassbeast.reflect": { de: "GLASBESTIE: REFLEXIONS-SCHILD AKTIV!", en: "GLASSBEAST: REFLECTION SHIELD ACTIVE!" },
  "callout.ability.rixa": { de: "CHROM-ALCHEMIE!", en: "CHROM-ALCHEMY!" },
  "callout.ability.marek": { de: "DROHNEN-WACHT!", en: "DRONE WATCH!" },
  "callout.run.extracted": {
    de: "EXTRAHIERT - +{scrap} Schrott (+{bonus} Wellenbonus), +{tech} Tech",
    en: "EXTRACTED - +{scrap} scrap (+{bonus} wave bonus), +{tech} tech",
  },
  "callout.run.wiped": {
    de: "GESCHEITERT - eingelagert {scrap} Schrott, verloren {techLost} Tech",
    en: "WIPED - banked {scrap} scrap, lost {techLost} tech",
  },

  "area.graumarsch.name": { de: "Graumarsch", en: "Graumarsch" },
  "area.graumarsch.description": { de: "Startgebiet mit mittlerer Bedrohung und stabilen Extraktionsrouten.", en: "Starter area with medium threat and stable extraction routes." },
  "area.sonnenglasweite.name": { de: "Sonnenglasweite", en: "Sun-Glass Expanse" },
  "area.sonnenglasweite.description": { de: "Offene Glasfelder mit hoher Sichtweite und Scherbenst?rmen.", en: "Open glass plains with long sight-lines and shard storms." },
  "area.wurzelwald.name": { de: "Wurzelwald Nhal", en: "Root-Forest Nhal" },
  "area.wurzelwald.description": { de: "Dichte Korridore und ambush-lastige Begegnungen.", en: "Dense corridors and ambush-heavy encounters." },
  "area.graumarsch_chemiefabrik.name": { de: "Graumarsch - Chemiefabrik", en: "Graumarsch - Chemical Plant" },
  "area.graumarsch_chemiefabrik.description": { de: "Toxische Nebelbaenke, instabile Leitungen, hoher Tech-Drop-Bias.", en: "Toxic fog banks, unstable conduits, high tech-drop bias." },
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
