# Asset Generation Best Practices

## Style Lock First

Start with 5 to 10 hero outputs before batch-generating the full set:

- 2 character portraits
- 2 region splash arts
- 1 quest key art
- 2 item icons
- 2 status icons
- 1 UI screen

If these look coherent together, freeze the style and proceed.

## Keep Backgrounds Intentional

- Icons: transparent background
- Dialogue busts: transparent or minimal background
- Key art: fully rendered background
- UI: composed full screen
- Wireframes: grayscale only

## Keep IDs Stable

Each generated file should keep the same asset ID used in the manifest.

Suggested file naming:

```text
<asset_id>.<ext>
```

Examples:

```text
char_lyra_dorn_portrait_keyart.png
area_graumarsch_splash_art.png
mq04_keyart.png
status_mondbrand_icon.png
```

## Batch Order Recommendation

1. Character portraits and region splashes
2. Main quest key art
3. Boss portraits
4. Item and status icons
5. UI mockups
6. Multiplayer wireframes

## Review Checklist

Before approving an asset, verify:

- silhouette readability
- style consistency
- lore/theme alignment
- no accidental text or watermark
- correct aspect ratio
- transparent background where required
- small-size readability for icons
- enough empty room for UI text where relevant

## Localization-Aware UI Rule

UI mockups must leave enough room for both German and English text. German strings are often longer, so avoid overly tight button and card layouts.

## Source-of-Truth Rule

If a quest, character, region, status, item, or boss changes in the preproduction docs, update this asset prompt package in the same PR.
