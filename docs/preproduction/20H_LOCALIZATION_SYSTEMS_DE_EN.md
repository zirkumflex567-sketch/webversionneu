# Scherbenhimmel 20h — Systems Localization DE/EN

This file contains German and English localization strings for system-heavy UI that should not be mixed into quest/lore writing: save handling, inventory, economy, shop, Tech-Lab, roster, codex, settings, accessibility, validation, and QA-facing player messages.

Rules:

- Every key must have `de` and `en`.
- Agent/code instructions remain in English.
- Player-facing text must use these keys rather than hardcoded strings.
- German is the primary tone reference. English should be natural and clear.

---

# Save / Profile

```yaml
save.slot.default:
  de: "Kampagnenspeicher"
  en: "Campaign Save"
save.autosaving:
  de: "Speichert..."
  en: "Saving..."
save.saved:
  de: "Gespeichert"
  en: "Saved"
save.error.title:
  de: "Speicherfehler"
  en: "Save Error"
save.error.body:
  de: "Der Spielstand konnte nicht sicher gespeichert werden. Versuche es erneut oder exportiere einen Debug-Report."
  en: "The save could not be written safely. Try again or export a debug report."
save.export:
  de: "Spielstand exportieren"
  en: "Export Save"
save.import:
  de: "Spielstand importieren"
  en: "Import Save"
save.reset:
  de: "Spielstand zurücksetzen"
  en: "Reset Save"
save.reset.confirm:
  de: "Das löscht deinen aktuellen Kampagnenfortschritt. Diese Aktion kann nicht rückgängig gemacht werden."
  en: "This deletes your current campaign progress. This action cannot be undone."
```

---

# Inventory / Loot

```yaml
inventory.title:
  de: "Inventar"
  en: "Inventory"
inventory.empty:
  de: "Noch nichts eingelagert. Extrahiere lebend, dann ändert sich das."
  en: "Nothing banked yet. Extract alive and that will change."
inventory.category.materials:
  de: "Materialien"
  en: "Materials"
inventory.category.modules:
  de: "Module"
  en: "Modules"
inventory.category.weapons:
  de: "Waffen"
  en: "Weapons"
inventory.category.vehicles:
  de: "Fahrzeuge"
  en: "Vehicles"
inventory.category.cosmetics:
  de: "Kosmetik"
  en: "Cosmetics"
inventory.category.blueprints:
  de: "Blueprints"
  en: "Blueprints"
inventory.item.source:
  de: "Quelle: {source}"
  en: "Source: {source}"
inventory.item.requires_extraction:
  de: "Wird nur bei erfolgreicher Extraktion eingelagert."
  en: "Banked only on successful extraction."
inventory.item.lost_on_defeat:
  de: "Geht bei Niederlage verloren."
  en: "Lost on defeat."
inventory.item.duplicate_converted:
  de: "Duplikat umgewandelt: {reward}"
  en: "Duplicate converted: {reward}"
loot.scrap.name:
  de: "Scrap"
  en: "Scrap"
loot.scrap.description:
  de: "Alltagsmetall, Tauschware und Reparaturversprechen. Häufig genug, um sorglos zu wirken. Wichtig genug, um darum zu sterben."
  en: "Common metal, trade good, and repair promise. Frequent enough to feel cheap. Important enough to die for."
loot.relic_tech.name:
  de: "Relikt-Tech"
  en: "Relic Tech"
loot.relic_tech.description:
  de: "Seltene Technik aus alten Schichten. Sie zählt erst, wenn du sie lebend herausbringst."
  en: "Rare tech from old layers. It counts only if you bring it out alive."
```

---

# Economy / Reward Resolution

```yaml
economy.cost:
  de: "Kosten"
  en: "Cost"
economy.affordable:
  de: "Bezahlbar"
  en: "Affordable"
economy.unaffordable:
  de: "Nicht genug Ressourcen"
  en: "Not enough resources"
economy.scrap_retained_defeat:
  de: "Bei Niederlage behalten: 50% Scrap"
  en: "Kept on defeat: 50% Scrap"
economy.tech_lost_defeat:
  de: "Bei Niederlage verloren: 100% unextrahierte Relikt-Tech"
  en: "Lost on defeat: 100% unextracted Relic Tech"
reward.category.immediate_lore:
  de: "Sofortiger Lore-Fund"
  en: "Immediate lore discovery"
reward.category.on_completion:
  de: "Bei Questabschluss"
  en: "On quest completion"
reward.category.on_extraction:
  de: "Nur bei Extraktion"
  en: "On extraction only"
reward.category.choice_based:
  de: "Entscheidungsabhängig"
  en: "Choice-based"
reward.category.lost_on_defeat:
  de: "Bei Niederlage verloren"
  en: "Lost on defeat"
reward.resolution.banked:
  de: "Eingelagert"
  en: "Banked"
reward.resolution.lost:
  de: "Verloren"
  en: "Lost"
reward.resolution.converted:
  de: "Umgewandelt"
  en: "Converted"
reward.resolution.persistent_lore:
  de: "Lore dauerhaft freigeschaltet"
  en: "Lore permanently unlocked"
```

---

# Shop

```yaml
shop.title:
  de: "Shop"
  en: "Shop"
shop.category.vehicles:
  de: "Fahrzeuge"
  en: "Vehicles"
shop.category.weapons:
  de: "Waffen"
  en: "Weapons"
shop.category.modules:
  de: "Module"
  en: "Modules"
shop.category.bounty_licenses:
  de: "Bounty-Lizenzen"
  en: "Bounty Licenses"
shop.category.cosmetics:
  de: "Kosmetik"
  en: "Cosmetics"
shop.category.housing:
  de: "Laternenhof"
  en: "Laternenhof"
shop.card.locked_reason:
  de: "Gesperrt: {reason}"
  en: "Locked: {reason}"
shop.card.owned:
  de: "Im Besitz"
  en: "Owned"
shop.card.equipped:
  de: "Ausgerüstet"
  en: "Equipped"
shop.card.buy:
  de: "Kaufen"
  en: "Buy"
shop.card.equip_now:
  de: "Jetzt ausrüsten"
  en: "Equip Now"
shop.confirm.title:
  de: "Kauf bestätigen"
  en: "Confirm Purchase"
shop.confirm.body:
  de: "Willst du {item} für {cost} kaufen?"
  en: "Buy {item} for {cost}?"
shop.success:
  de: "Gekauft: {item}"
  en: "Purchased: {item}"
shop.error.missing_currency:
  de: "Nicht genug {currency}."
  en: "Not enough {currency}."
shop.error.prerequisite_missing:
  de: "Voraussetzung fehlt: {requirement}"
  en: "Missing requirement: {requirement}"
```

---

# Tech-Lab

```yaml
techlab.title:
  de: "Tech-Lab"
  en: "Tech Lab"
techlab.subtitle:
  de: "Nur extrahierte Relikt-Tech kann hier dauerhaft verbaut werden."
  en: "Only extracted Relic Tech can be permanently installed here."
techlab.character_select:
  de: "Charakter wählen"
  en: "Select Character"
techlab.branch:
  de: "Zweig"
  en: "Branch"
techlab.node.locked:
  de: "Knoten gesperrt"
  en: "Node locked"
techlab.node.unlocked:
  de: "Knoten freigeschaltet"
  en: "Node unlocked"
techlab.node.unlock:
  de: "Freischalten"
  en: "Unlock"
techlab.node.permanent:
  de: "Dauerhafte Entscheidung"
  en: "Permanent choice"
techlab.node.requires:
  de: "Benötigt: {requirement}"
  en: "Requires: {requirement}"
techlab.confirm.title:
  de: "Tech-Knoten freischalten?"
  en: "Unlock Tech Node?"
techlab.confirm.body:
  de: "{node} kostet {cost}. Diese Entscheidung ist dauerhaft, sofern kein Respec angegeben ist."
  en: "{node} costs {cost}. This choice is permanent unless a respec is specified."
techlab.success:
  de: "Tech-Knoten freigeschaltet: {node}"
  en: "Tech node unlocked: {node}"
techlab.respec.unavailable:
  de: "Respec für diesen Knoten nicht verfügbar."
  en: "Respec unavailable for this node."
```

---

# Roster

```yaml
roster.title:
  de: "Roster"
  en: "Roster"
roster.locked:
  de: "Noch nicht rekrutiert"
  en: "Not recruited yet"
roster.unlock_requirement:
  de: "Freischaltung: {requirement}"
  en: "Unlock: {requirement}"
roster.bond_level:
  de: "Bindung: Stufe {level}"
  en: "Bond: Level {level}"
roster.companion_quest:
  de: "Companion-Quest: {quest}"
  en: "Companion Quest: {quest}"
roster.tutorial_available:
  de: "Tutorial verfügbar"
  en: "Tutorial available"
roster.tutorial_completed:
  de: "Tutorial abgeschlossen"
  en: "Tutorial completed"
roster.skill_nodes:
  de: "Tech-Knoten: {unlocked}/{total}"
  en: "Tech nodes: {unlocked}/{total}"
```

---

# Codex

```yaml
codex.title:
  de: "Kodex"
  en: "Codex"
codex.category.world:
  de: "Welt"
  en: "World"
codex.category.region:
  de: "Regionen"
  en: "Regions"
codex.category.faction:
  de: "Fraktionen"
  en: "Factions"
codex.category.character:
  de: "Charaktere"
  en: "Characters"
codex.category.boss:
  de: "Bosse"
  en: "Bosses"
codex.category.enemy:
  de: "Gegner"
  en: "Enemies"
codex.category.item:
  de: "Items"
  en: "Items"
codex.category.system:
  de: "Systeme"
  en: "Systems"
codex.category.tutorial:
  de: "Tutorials"
  en: "Tutorials"
codex.entry.locked:
  de: "Noch nicht entdeckt"
  en: "Not discovered yet"
codex.entry.spoiler_hidden:
  de: "Dieser Eintrag bleibt verborgen, bis die Geschichte ihn freigibt."
  en: "This entry remains hidden until the story reveals it."
codex.entry.new:
  de: "Neuer Kodexeintrag: {entry}"
  en: "New Codex entry: {entry}"
codex.filter.all:
  de: "Alle"
  en: "All"
codex.filter.new:
  de: "Neu"
  en: "New"
```

---

# Settings

```yaml
settings.title:
  de: "Einstellungen"
  en: "Settings"
settings.category.audio:
  de: "Audio"
  en: "Audio"
settings.category.video:
  de: "Video"
  en: "Video"
settings.category.controls:
  de: "Steuerung"
  en: "Controls"
settings.category.accessibility:
  de: "Barrierefreiheit"
  en: "Accessibility"
settings.category.account:
  de: "Account & Speicherstand"
  en: "Account & Save"
settings.audio.master:
  de: "Gesamtlautstärke"
  en: "Master volume"
settings.audio.music:
  de: "Musik"
  en: "Music"
settings.audio.sfx:
  de: "Effekte"
  en: "SFX"
settings.audio.ui:
  de: "UI"
  en: "UI"
settings.audio.voice:
  de: "Stimmen"
  en: "Voices"
settings.video.quality:
  de: "Qualität"
  en: "Quality"
settings.video.resolution_scale:
  de: "Auflösungsskalierung"
  en: "Resolution scale"
settings.video.outlines:
  de: "Outlines"
  en: "Outlines"
settings.video.particles:
  de: "Partikel"
  en: "Particles"
settings.video.screen_shake:
  de: "Screen Shake"
  en: "Screen shake"
settings.video.damage_numbers:
  de: "Schadenszahlen"
  en: "Damage numbers"
settings.controls.keybindings:
  de: "Tastenbelegung"
  en: "Keybindings"
settings.controls.gamepad:
  de: "Gamepad"
  en: "Gamepad"
settings.controls.aim_sensitivity:
  de: "Ziel-Empfindlichkeit"
  en: "Aim sensitivity"
settings.controls.invert_aim:
  de: "Zielen invertieren"
  en: "Invert aim"
settings.controls.hold_toggle:
  de: "Halten/Umschalten"
  en: "Hold/Toggle"
settings.account.export_save:
  de: "Speicherstand exportieren"
  en: "Export save"
settings.account.import_save:
  de: "Speicherstand importieren"
  en: "Import save"
settings.account.reset_save:
  de: "Speicherstand zurücksetzen"
  en: "Reset save"
```

---

# Accessibility

```yaml
accessibility.subtitle_size:
  de: "Untertitelgröße"
  en: "Subtitle size"
accessibility.colorblind_mode:
  de: "Farbenblindheitsmodus"
  en: "Colorblind mode"
accessibility.reduce_flash:
  de: "Blitze reduzieren"
  en: "Reduce flashes"
accessibility.reduce_shake:
  de: "Kameraerschütterung reduzieren"
  en: "Reduce camera shake"
accessibility.input_confusion_replacement:
  de: "Verwirrungs-Effekte ohne Eingabeumkehr"
  en: "Confusion effects without input inversion"
accessibility.toggle_inputs:
  de: "Halten durch Umschalten ersetzen"
  en: "Replace hold inputs with toggles"
accessibility.skip_repeated_intros:
  de: "Wiederholte Intros überspringen"
  en: "Skip repeated intros"
accessibility.high_contrast_objectives:
  de: "Kontrastreiche Zielmarker"
  en: "High-contrast objective markers"
accessibility.option.off:
  de: "Aus"
  en: "Off"
accessibility.option.on:
  de: "Ein"
  en: "On"
accessibility.option.low:
  de: "Niedrig"
  en: "Low"
accessibility.option.medium:
  de: "Mittel"
  en: "Medium"
accessibility.option.high:
  de: "Hoch"
  en: "High"
```

---

# Validation / QA Player Messages

```yaml
validation.content.missing_key:
  de: "Inhalt unvollständig: fehlender Lokalisierungsschlüssel {key}."
  en: "Incomplete content: missing localization key {key}."
validation.content.invalid_reward:
  de: "Inhalt unvollständig: Belohnung ohne Persistenzregel."
  en: "Incomplete content: reward has no persistence rule."
validation.content.invalid_area_state:
  de: "Inhalt unvollständig: ungültiger Gebietsstatus."
  en: "Incomplete content: invalid area state."
validation.content.invalid_free_run:
  de: "Free Run ist für dieses Gebiet noch nicht freigeschaltet."
  en: "Free Run is not unlocked for this area yet."
validation.content.invalid_extraction_rule:
  de: "Quest unvollständig: Extraktionsregel fehlt."
  en: "Incomplete quest: extraction rule missing."
```

## Coverage Status

This file covers system localization for:

- Save/profile
- Inventory/loot
- Economy/reward categories
- Shop
- Tech-Lab
- Roster
- Codex UI
- Settings
- Accessibility
- Validation/player-safe errors

Quest, lore, dialogue, region, character, bounty, status, extraction, and debug strings live in `20H_LOCALIZATION_DE_EN.md` and `20H_LORE_CODEX_DE_EN.md`.
