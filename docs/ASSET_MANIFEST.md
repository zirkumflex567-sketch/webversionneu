# H-Town Combat — UI Asset Manifest

This file tracks all UI assets generated for the project, including their contents, layout, and intended usage.

## Current Assets

### 1. Currencies (`public/assets/ui/currencies.png`)
- **Contents**: 2 primary currency icons.
- **Layout**:
    - **Left**: Scrap (🔩) — Gritty, industrial metal scrap.
    - **Right**: Relic Tech (💠) — Glowing, high-tech hexagonal artifact.
- **Style**: Wasteland Celshading, neon accents.

### 2. HUD Layout (`public/assets/ui/hud_layout.png`)
- **Contents**: Suite of HUD frames and dashboard elements.
- **Usage**: Main gameplay dashboard overlay.

### 3. Marek Skill Branches
- **`marek_bollwerk.png`**: 4 icons for the Bollwerk branch (Tank/Survival).
- **`marek_drones.png`**: 4 icons for the Drohnenwerk branch (Summons/Sentry).
- **`marek_magnetics.png`**: 4 icons for the Magnetik branch (Loot Magnet/Slow).

### 4. Rixa Skill Branches
- **`rixa_alchemistry.png`**: 4 icons for the Chrom-Alchemie branch (Explosions/Status).
- **`rixa_chaos.png`**: 4 icons for the Secco & Chaos branch (CC/Confusion).
- **`rixa_lifesteal.png`**: 4 icons for the Herzbrecherin branch (Lifesteal/Debuffs).

---

## Assets to be Generated

### 5. Run-Time Upgrades (`public/assets/ui/upgrades_sheet.png`) [NEW]
- **Contents**: 6 distinct upgrade icons for in-run level-up options.
- **Layout (3x2 Grid)**:
    - **Top-Left**: Armor Plate (bolted industrial steel)
    - **Top-Middle**: Turbo Dash (sci-fi fuel nozzle with green flame)
    - **Top-Right**: Autocannon (dual heavy metal barrels)
    - **Bottom-Left**: Magnetic Pulse (blue electric coil/inductor)
    - **Bottom-Middle**: Lethal Scope (glowing red sniper lens)
    - **Bottom-Right**: Shield Generator (neon blue hexagonal emitter)
- **Style**: Premium Wasteland Celshading with thick black outlines.

### 6. Active Abilities (`public/assets/ui/active_abilities_sheet.png`) [NEW]
- **Contents**: 4 icons for character-specific activated abilities.
- **Layout (2x2 Grid)**:
    - **Top-Left**: Nitro Dash (glowing green-blue jet flame propelling an industrial gear)
    - **Top-Right**: Alchemical Trail (neon-green cracked glass vial with skull-shaped fumes)
    - **Bottom-Left**: Magnetic Pulse (vibrant purple and magenta circular energy wave)
    - **Bottom-Right**: Sentry Turret (top-down view of a small orange auto-turret with glowing barrel)
- **Style**: High-contrast, neon-glowing, distinct shapes with thick black outlines.

### 7. Status Effects (`public/assets/ui/status_effects_sheet.png`) [NEW]
- **Contents**: 8 minimalist icons for UI status indicators.
- **Layout (4x2 Grid)**:
    - **1**: Stun (yellow swirling stars)
    - **2**: Poison (neon-green toxic skull)
    - **3**: Charm (pink glowing cracked heart)
    - **4**: Confuse (electric blue question marks)
    - **5**: Slow (orange rusted gears)
    - **6**: Shield-Up (cyan energy barrier)
    - **7**: Burn (red/orange flames)
    - **8**: Haste (white wind streaks)
- **Style**: High contrast, bold shapes, thick black outlines.


### 8. UI Cards (`public/assets/ui/ui_cards_sheet.png`) [NEW]
- **Contents**: 3 large distinct card designs for the Shop and Bounty boards.
- **Components**:
    - **1: Vehicle Shop Card**: Heavy metal frame, bolted rivets, oily weathered texture.
    - **2: Weapon/Upgrade Card**: Matte-black tactical carbon frame with neon wire accents.
    - **3: Bounty Contract Card**: Weathered/stained parchment with rusty clips and splatters.
- **Style**: Textured parchment/metal, gritty borders, wasteland aesthetics.


### 9. Combat Callouts (`public/assets/ui/combat_callouts_sheet.png`) [NEW]
- **Contents**: 4 large stylized text splash elements for match events.
- **Components (Vertical Arrangement)**:
    - **1: "WAVE CLEARED"**: Bold industrial font, caution-yellow.
    - **2: "EXTRACTION READY"**: High-tech neon-cyan font with glows.
    - **3: "LEVEL UP!"**: Vibrant green slanted font with motion blurs.
    - **4: "WIPE OUT"**: Blood-red gritty font with splatters.
- **Style**: Bold industrial typography, motion blurs, high energy.


### 10. Muzzle Flashes (`public/assets/vfx/vfx_muzzle_flashes.png`) [NEW]
- **Contents**: 4x4 animated spritesheet (16 frames) of a high-tech teal/orange muzzle flash.
- **Usage**: Used in `Weapon.ts` or `FXManager.ts` for weapon firing effects.
- **Style**: Jagged energy spikes, white-hot core, cel-shaded outlines.

### 11. Dust & Sand Clouds (`public/assets/vfx/vfx_dust_clouds.png`) [NEW]
- **Contents**: 4x4 animated spritesheet (16 frames) of gritty wasteland dust clouds.
- **Usage**: Used in `FXManager.spawnSandCloud()` for vehicle movement/drifts.
- **Style**: Opaque brown/tan clouds with sand particles and debris.

### 12. Plasma Impacts (`public/assets/vfx/vfx_plasma_impacts.png`) [NEW]
- **Contents**: 4x4 animated spritesheet (16 frames) of crackling purple/magenta energy.
- **Usage**: Used for special abilities or high-tech weapon impacts.
### 13. Character Portraits (`public/assets/ui/portrait_rixa.png`, `portrait_marek.png`) [NEW]
- **Contents**: 4K character portraits for Rixa and Marek.
- **Rixa "Chromlilie" Voss**: Gritty alchemist with neon-green eyes, purple hair, and metal mask.
- **Marek "Schrottanker" Graul**: Grizzled tank master with thick grey beard and exoskeleton.
- **Usage**: Selection UI, Garage Hub, or Dialogue windows.
### 14. World Textures (`public/assets/textures/tex_ground_asphalt.png`, `tex_ground_sand.png`) [NEW]
- **Contents**: 4K seamless (tileable) textures for the arena floor.
- **Asphalt**: Cracked, weathered dark asphalt with oily splatters and sand.
- **Sand**: Gritty wasteland sand with tire treads, stones, and scrap debris.
- **Usage**: Ground materials in `World.ts`.
### 15. Industrial Debris Props (`public/assets/ui/props_industrial_debris.png`) [NEW]
- **Contents**: 12 distinct prop icons in a grid for world detailing.
- **Items**: Rusty barrels, metal crates, jagged pipes, engine parts, broken floodlight, shredded tire, toxic puddle, barbed wire, concrete barrier, scrap pile.
- **Usage**: Reference for 3D props or as UI decals.
- **Style**: Premium Wasteland Celshading, heavy gritty weathering, thick outlines.

### 17. Loot & Items (`public/assets/ui/loot_items_sheet.png`) [NEW]
- **Contents**: 4x4 sheet of industrial parts and tech relics.
- **Normal**: Rusted bolts, oily gears, metal plates.
- **Special/Legendary**: Glowing tech-chips, green micro-reactors.
- **Style**: Premium Wasteland Celshading, vibrant neon glows.

### 18. Extraction Pad Decal (`public/assets/ui/extraction_pad_decal.png`) [NEW]
- **Contents**: Circular landing pad decals for the extraction point.
- **Design**: Hazard stripes, "H-TOWN" branding, neon landing lights.
- **Usage**: Ground-decal in `ExtractionZone.ts`.



### 16. Sprite Entities (8-Directional Sheets) [NEW]
- **Contents**: Spritesheets containing 8 views of an entity for Pseudo-3D billboarding.
- **`ent_player_schrotty.png`**: Marek's heavy tank-car (North, NE, E, SE, S, SW, W, NW).
- **Style**: Premium Wasteland Celshading, consistent lighting, 512px per frame.
- **Usage**: Reference for `SpriteEntity` logic in `Vehicle.ts`.



