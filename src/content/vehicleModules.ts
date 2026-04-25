import { VehicleModule } from "./schema";

export const VEHICLE_MODULES: VehicleModule[] = [
  // --- CHASSIS ---
  { id: "vm_001", name: "Moorläufer-Rahmen", slot: "chassis", tier: "common", effect: "Sumpf und flaches Wasser verlieren fast alle Bremswirkung.", characterId: "all" },
  { id: "vm_002", name: "Rissjäger-Rahmen", slot: "chassis", tier: "common", effect: "Sehr leichter Rahmen für Drift, Sprung und seitliche Ausweichfenster.", characterId: "all" },
  { id: "vm_003", name: "Eidpanzer-Rahmen", slot: "chassis", tier: "common", effect: "Langsam, aber Verbündete können hinter dir Schildladung aufbauen.", characterId: "all" },

  // --- CORES ---
  { id: "vm_009", name: "Mondglas-Kern", slot: "core", tier: "uncommon", effect: "Allround-Kern mit stabiler Hitze und guter Resonanzgeneration.", characterId: "all" },
  { id: "vm_010", name: "Salzspiegel-Kern", slot: "core", tier: "uncommon", effect: "Stärker bei hoher Geschwindigkeit; schwach bei Stillstand.", characterId: "all" },

  // --- FRONT WEAPONS ---
  { id: "vm_016", name: "Kettenramme", slot: "front_weapon", tier: "uncommon", effect: "Kurze schwere Frontattacke, bricht Barrikaden.", characterId: "all" },
  { id: "vm_017", name: "Funkenkanone", slot: "front_weapon", tier: "uncommon", effect: "Mittlere Reichweite, baut Mondbrand auf.", characterId: "all" },
  { id: "vm_018", name: "Harpunenlanze", slot: "front_weapon", tier: "rare", effect: "Zieht Ziele oder zieht dich an schwere Ziele heran.", characterId: "all" },

  // --- SIDE WEAPONS ---
  { id: "vm_024", name: "Seitensense", slot: "side_weapon", tier: "rare", effect: "Schneidet beim Vorbeifahren durch leichte Gegnergruppen.", characterId: "all" },
  { id: "vm_027", name: "Wurzelwerfer", slot: "side_weapon", tier: "signature", effect: "Setzt organische Minen auf der Strecke ab.", characterId: "all" },

  // --- REAR UTILITY ---
  { id: "vm_030", name: "Rauchfass", slot: "rear_utility", tier: "signature", effect: "Bricht Zielerfassung und legt Rostbruch.", characterId: "all" },
  { id: "vm_031", name: "Reparaturkran", slot: "rear_utility", tier: "signature", effect: "Heilt ein nahes Fahrzeug oder eigenes Heckmodul.", characterId: "all" },

  // --- MOBILITY ---
  { id: "vm_034", name: "Risssprung-Düse", slot: "mobility", tier: "signature", effect: "Kurzer Sprung über Graben, Wellen und Risslinien.", characterId: "all" },
  { id: "vm_036", name: "Kletterkette", slot: "mobility", tier: "relic", effect: "Hält an vertikalen Kanten.", characterId: "all" },

  // --- ARMOR ---
  { id: "vm_038", name: "Laternenpanzer", slot: "armor", tier: "relic", effect: "Schild regeneriert nach 4 Sekunden ohne Schaden.", characterId: "all" },
];
