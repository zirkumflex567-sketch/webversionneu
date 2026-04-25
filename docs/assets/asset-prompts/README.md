# H-Town Combat 67 — Asset Prompt Package

This directory contains the production-ready asset generation prompt package for the 20-hour Scherbenhimmel preproduction scope.

## Purpose

The package turns the current game documentation into image-generation prompts for concept art, UI, icons, key art, normal enemies, bosses, regions, quests, bounties, and wireframes.

Use these prompts before creating or commissioning assets so all visuals follow the same style, lore, and production naming rules.

## Files

| File | Purpose |
|---|---|
| `STYLE_GUIDE.md` | Global style prompt, negative prompt, and output rules by asset type |
| `ALL_ASSET_PROMPTS.md` | Full human-readable promptbook grouped by category |
| `prompt_manifest.csv` | Flat manifest for spreadsheet/batch workflows |
| `prompt_manifest.json` | Structured manifest for automation |
| `BEST_PRACTICES.md` | Generation workflow, naming, approval, and quality checklist |

## Core Style

Premium wasteland cel-shaded dieselpunk dark-fantasy game art for H-Town Combat 67 / Scherbenhimmel; thick black outlines, graphic shape language, painterly cel shading, gritty industrial wear, weathered metal, oil, rust, moonglass glow, lantern-lit fog, high contrast, dramatic lighting, tactile materials, premium game-ready composition, grounded anatomy and believable hard-surface forms, cohesive art direction, no watermark.

## Scope

The prompt package covers:

- playable character portraits and dialogue busts
- character ability icons
- region splash art, deploy cards, and map tiles
- main quest key art
- bounty posters
- status effect icons
- normal enemy portraits by biome
- boss key art
- item and reward icons
- UI screen mockups
- multiplayer / UX wireframes

## Naming Rule

Generated assets should preserve `asset_id` from the manifest.

Example:

```text
char_lyra_dorn_portrait_keyart.png
area_graumarsch_splash_art.png
mq04_keyart.png
status_mondbrand_icon.png
```

## Documentation Relationship

This prompt package is derived from and should stay aligned with:

- `docs/preproduction/20H_DOCUMENTATION_INDEX.md`
- `docs/preproduction/20H_CHARACTER_PAGES.md`
- `docs/preproduction/20H_REGION_PAGES.md`
- `docs/preproduction/20H_QUEST_BIBLE.md`
- `docs/preproduction/20H_BOUNTY_CATALOG.md`
- `docs/preproduction/20H_STATUS_EFFECT_CATALOG.md`
- `docs/preproduction/20H_NORMAL_ENEMY_BIBLE.md`
- `docs/preproduction/20H_LORE_CODEX_DE_EN.md`

If a character, quest, region, enemy, status, boss, or item changes, update this package in the same PR.
