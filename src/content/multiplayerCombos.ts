import { MultiplayerCombo } from "./schema";

export const MULTIPLAYER_COMBOS: MultiplayerCombo[] = [
  {
    id: "combo_char_lyra_char_mira",
    name: "Mondbrand trifft Siegelriss",
    type: "duo",
    trigger: "Lyra Dorn setzt Mondbrand und Mira Voss trifft innerhalb von 3 Sekunden mit einer Kerntechnik.",
    effect: "Kombiniert Interceptor mit Controller: erzeugt Extra-Stagger, ein Zeitlupenfenster und einen Teamfunken.",
  },
  {
    id: "combo_char_lyra_char_tarek",
    name: "Mondbrand trifft Schuldmarke",
    type: "duo",
    trigger: "Lyra Dorn setzt Mondbrand und Tarek al-Sahir trifft innerhalb von 3 Sekunden mit einer Kerntechnik.",
    effect: "Kombiniert Interceptor mit Täuscher: erzeugt Extra-Stagger und einen Teamfunken.",
  },
  {
    id: "combo_convoy_01",
    name: "Laternenzug",
    type: "vehicle_convoy",
    trigger: "Drei Fahrzeuge fahren innerhalb einer Laternenbarriere.",
    effect: "Der vorderste blockt Projektile, die hinteren laden Ultimates.",
  },
  {
    id: "combo_convoy_02",
    name: "Harpunenkarussell",
    type: "vehicle_convoy",
    trigger: "Zwei Harpunenfahrzeuge verankern ein Bossfahrzeug, ein drittes rammt.",
    effect: "Massiver Haltungsbruch beim Boss.",
  },
];
