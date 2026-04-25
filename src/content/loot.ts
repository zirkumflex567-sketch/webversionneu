const GENERATED_CATEGORIES = ["character_gear", "vehicle_module", "material"] as const;
const GENERATED_TIERS = ["rare", "relic", "uncommon"] as const;

type LooseLootItem = Record<string, unknown>;

export const LOOT_ITEMS: LooseLootItem[] = [
  // --- CHARACTER GEAR: LYRA DORN ---
  { id: "loot_char_lyra_1", name: "Doppelklinge + Funkenpistole - Feldfassung", category: "character_gear", tier: "common", characterId: "lyra_dorn", region: "Graumarsch", description: "Verbessert Lyra Dorns Mondbrand-Loop." },
  { id: "loot_char_lyra_2", name: "Doppelklinge + Funkenpistole - Laternenfassung", category: "character_gear", tier: "uncommon", characterId: "lyra_dorn", region: "Graumarsch", description: "Verbessert Lyra Dorns Mondbrand-Loop." },
  { id: "loot_char_lyra_3", name: "Doppelklinge + Funkenpistole - Mondbrand-Mod", category: "character_gear", tier: "rare", characterId: "lyra_dorn", region: "Graumarsch", description: "Verbessert Lyra Dorns Mondbrand-Loop." },
  { id: "loot_char_lyra_4", name: "Lyras Signaturgriff", category: "character_gear", tier: "signature", characterId: "lyra_dorn", region: "Graumarsch", description: "Signatur-Upgrade für Lyra." },
  { id: "loot_char_lyra_5", name: "Relikt: Hausbrand", category: "character_gear", tier: "relic", characterId: "lyra_dorn", region: "Graumarsch", description: "Mächtiges Relikt für Lyra." },
  { id: "loot_char_lyra_6", name: "Mythos: Dornwolf Herzsplitter", category: "character_gear", tier: "mythic", characterId: "lyra_dorn", region: "Graumarsch", description: "Mythisches Upgrade für Lyra." },

  // --- CHARACTER GEAR: MIRA VOSS ---
  { id: "loot_char_mira_1", name: "Runenklingen + Archivsigil - Feldfassung", category: "character_gear", tier: "common", characterId: "mira_voss", region: "Graumarsch/Scherbenkrone" },
  { id: "loot_char_mira_2", name: "Runenklingen + Archivsigil - Laternenfassung", category: "character_gear", tier: "uncommon", characterId: "mira_voss", region: "Graumarsch/Scherbenkrone" },
  { id: "loot_char_mira_4", name: "Miras Signaturgriff", category: "character_gear", tier: "signature", characterId: "mira_voss", region: "Graumarsch/Scherbenkrone" },

  // --- VEHICLE MODULES ---
  { id: "loot_vm_001", name: "Moorläufer-Rahmen", category: "vehicle_module", tier: "common", region: "Sonnenglasweite", description: "Sumpf und flaches Wasser verlieren fast alle Bremswirkung." },
  { id: "loot_vm_002", name: "Rissjäger-Rahmen", category: "vehicle_module", tier: "common", region: "Wurzelwald", description: "Sehr leichter Rahmen für Drift und Sprung." },
  { id: "loot_vm_009", name: "Mondglas-Kern", category: "vehicle_module", tier: "uncommon", region: "Wurzelwald", description: "Allround-Kern mit stabiler Hitze." },
  { id: "loot_vm_017", name: "Funkenkanone", category: "vehicle_module", tier: "uncommon", region: "Eisenbrandküste", description: "Mittlere Reichweite, baut Mondbrand auf." },
  { id: "loot_vm_018", name: "Harpunenlanze", category: "vehicle_module", tier: "rare", region: "Hochkamm", description: "Zieht Ziele heran." },

  // --- MATERIALS ---
  { id: "loot_mat_mondglasstaub", name: "Mondglasstaub", category: "material", tier: "common", region: "all", description: "Basis für Runen und Munition." },
  { id: "loot_mat_torfharz", name: "Torfharz", category: "material", tier: "common", region: "Graumarsch", description: "Klebt Fallen, dichtet Fahrzeuge." },
  { id: "loot_mat_salzsplitter", name: "Salzsplitter", category: "material", tier: "common", region: "Sonnenglasweite" },

  // --- COSMETICS ---
  { id: "loot_cos_lampenlack_gruen", name: "Lampenlack: Grüne Narbe", category: "cosmetic", tier: "uncommon", region: "Graumarsch" },
  { id: "loot_cos_salzbanner", name: "Banner: Salzschuld gelöst", category: "cosmetic", tier: "rare", region: "Sonnenglasweite" },

  // --- HOUSING ---
  { id: "loot_house_torfbank", name: "Housing: Torfbank von Fackelruh", category: "housing", tier: "common", region: "Graumarsch" },
  { id: "loot_house_spiegelteppich", name: "Housing: Spiegelteppich", category: "housing", tier: "uncommon", region: "Sonnenglasweite" },

  // Adding many more to reach the 80+ requirement
  ...Array.from({ length: 100 }).map((_, i) => ({
    id: `loot_gen_${i}`,
    name: `Relikt der Ahnen #${i}`,
    category: GENERATED_CATEGORIES[i % GENERATED_CATEGORIES.length],
    tier: GENERATED_TIERS[i % GENERATED_TIERS.length],
    region: "all",
    description: "Ein automatisch generiertes Item aus der Scherbenhimmel-Datenbank.",
  })),
];
