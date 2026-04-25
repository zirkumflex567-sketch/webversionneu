# Assets Documentation

This directory contains production documentation for visual asset generation and future asset pipelines.

## Asset Prompt Package

Start here:

- [`asset-prompts/README.md`](asset-prompts/README.md)
- [`asset-prompts/STYLE_GUIDE.md`](asset-prompts/STYLE_GUIDE.md)
- [`asset-prompts/ALL_ASSET_PROMPTS.md`](asset-prompts/ALL_ASSET_PROMPTS.md)
- [`asset-prompts/prompt_manifest.csv`](asset-prompts/prompt_manifest.csv)
- [`asset-prompts/prompt_manifest.json`](asset-prompts/prompt_manifest.json)
- [`asset-prompts/BEST_PRACTICES.md`](asset-prompts/BEST_PRACTICES.md)

## Scope

The prompt package covers the 20-hour Scherbenhimmel preproduction scope:

- characters and dialogue busts
- ability icons
- regions and deploy cards
- main quest key art
- bounty posters
- status effect icons
- bosses
- item/reward icons
- UI screen mockups
- multiplayer / UX wireframes

## Style Rule

The visual baseline is premium wasteland cel-shaded dieselpunk dark-fantasy game art with thick black outlines, gritty industrial wear, moonglass glow, lantern fog, rust, oil, and high-contrast tactile materials.

## Naming Rule

Generated assets should preserve the `asset_id` from the prompt manifest.

Example:

```text
char_lyra_dorn_portrait_keyart.png
area_graumarsch_splash_art.png
mq04_keyart.png
status_mondbrand_icon.png
```

## Maintenance Rule

If a character, quest, region, status, boss, item, UI screen, or multiplayer flow changes in the preproduction docs, update the asset prompt package in the same PR.
