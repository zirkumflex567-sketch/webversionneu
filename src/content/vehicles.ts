import { VehicleDefinition } from "./schema";

export const VEHICLES: VehicleDefinition[] = [
  { id: "dornwolf", name: "Dornwolf", class: "Leichter Rissjäger", characterId: "lyra_dorn", baseStats: { speed: 120, handling: 90, armor: 40, heatMax: 100 }, description: "Schnell, schmutzig, direkt. Der perfekte Interceptor." },
  { id: "archivspinne", name: "Archivspinne", class: "Sigil-Legerin", characterId: "mira_voss", baseStats: { speed: 80, handling: 100, armor: 60, heatMax: 120 }, description: "Kontrolliert, analytisch, gefährlich. Legt Runen und Siegel." },
  { id: "glasfuchs", name: "Glasfuchs", class: "Sandsegler", characterId: "tarek_al_sahir", baseStats: { speed: 130, handling: 110, armor: 30, heatMax: 90 }, description: "Mobil, täuschend, riskant. Nutzt Sand und Glas." },
  { id: "moorkäfer", name: "Moorkäfer", class: "Bio-Crawler", characterId: "siofra_nhal", baseStats: { speed: 90, handling: 80, armor: 70, heatMax: 110 }, description: "Präzise, lauernd, organisch. Bewegt sich mühelos durch Sumpf." },
  { id: "riffbrecher", name: "Riffbrecher", class: "Rammbastion", characterId: "brannok_reef", baseStats: { speed: 70, handling: 60, armor: 150, heatMax: 150 }, description: "Schwer, laut, brutal ehrlich. Eine rollende Festung." },
  { id: "eidpanzer", name: "Eidpanzer", class: "Konvoi-Schild", characterId: "edda_falkenlicht", baseStats: { speed: 85, handling: 70, armor: 120, heatMax: 130 }, description: "Standhaft, taktisch, ehrenhaft. Schützt den Konvoi." },
  { id: "schachtmaus", name: "Schachtmaus", class: "Tunnel-Sprinter", characterId: "kael_nhar", baseStats: { speed: 140, handling: 120, armor: 20, heatMax: 80 }, description: "Schmutzig, schnell, hinterhältig. Extrem wendig in Engpässen." },
  { id: "pilgerglocke", name: "Pilgerglocke", class: "Support-Kutsche", characterId: "oren_vale", baseStats: { speed: 95, handling: 85, armor: 80, heatMax: 100 }, description: "Ruhig, schützend, unbequem mutig. Heilt Verbündete." },
  { id: "kranhexe", name: "Kranhexe", class: "Werkstatt-Rig", characterId: "yara_kest", baseStats: { speed: 75, handling: 65, armor: 100, heatMax: 140 }, description: "Technisch, aufladend, improvisierend. Repariert im Feld." },
  { id: "traumsäge", name: "Traumsäge", class: "Echo-Rissläufer", characterId: "neris_vael", baseStats: { speed: 110, handling: 95, armor: 50, heatMax: 110 }, description: "Zerbrechlich, unheimlich, explosiv. Phasenverschiebungen." },
  { id: "sturmwidder", name: "Sturmwidder", class: "Jagd-Rig", characterId: "velka_sturmtritt", baseStats: { speed: 125, handling: 105, armor: 90, heatMax: 100 }, description: "Verfolgend, kontrollierend, gnadenlos präzise." },
  { id: "namenloser_kern", name: "Namenloser Kern", class: "Transform-Rig", characterId: "cyr_ohne_gestern", baseStats: { speed: 100, handling: 100, armor: 80, heatMax: 100 }, description: "Adaptiv, fremd, lernend. Kopiert andere Fahrzeuge." },
];
