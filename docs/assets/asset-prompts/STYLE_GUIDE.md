# Global Asset Prompt Style Guide

## Master Style Prompt

Premium wasteland cel-shaded dieselpunk dark-fantasy game art for H-Town Combat 67 / Scherbenhimmel; thick black outlines, graphic shape language, painterly cel shading, gritty industrial wear, weathered metal, oil, rust, moonglass glow, lantern-lit fog, high contrast, dramatic lighting, tactile materials, premium game-ready composition, grounded anatomy and believable hard-surface forms, cohesive art direction, no watermark.

## Shared Negative Prompt

Avoid photorealism, avoid modern clean sci-fi plastics, avoid generic fantasy armor, avoid low-detail mush, avoid text overlays unless explicitly requested, avoid watermarks.

## Output Rules by Asset Type

### Character Key Art

Use full readability of costume silhouette, recognizable signature gear, emotionally readable face, action-ready pose, premium promotional composition.

Recommended aspect ratio: `4:5`.

### Dialogue Bust

Use chest-up portrait on transparent or plain neutral background, strong readability, expression-focused, no busy scene clutter.

Recommended aspect ratio: `3:4`.

### Region Splash

Use strong environmental storytelling, landmark readability, sense of traversal and extraction danger, cinematic depth.

Recommended aspect ratio: `16:9`.

### Deploy Card / Mission Poster

Vertical composition, one strong landmark or action hook, enough contrast for UI overlay use, no baked-in text.

Recommended aspect ratio: `4:5`.

### Quest Key Art

Show the decisive dramatic beat of the quest. Preserve region identity. Use clear visual hierarchy and a hook that tells the player what kind of mission it is.

Recommended aspect ratio: `16:9`.

### Boss Portrait

Show the boss as a memorable encounter piece. Keep silhouette readable and iconic. Hint at arena theme.

Recommended aspect ratio: `4:5`.

### Item / Reward Icon

Single centered asset, high readability, clean silhouette, transparent background, no text.

Recommended aspect ratio: `1:1`, transparent background.

### Status Icon

Single centered symbolic icon, transparent background, strong contrast, readable at small size.

Recommended aspect ratio: `1:1`, transparent background.

### UI Screen

Polished game UI mockup with placeholder layout discipline. Avoid lorem ipsum walls. Use labeled zones only when necessary.

Recommended aspect ratio: `16:9`.

### Wireframe

Monochrome or grayscale, clean UX architecture, no polished paint-over, readable spacing, practical production layout.

Recommended aspect ratio: `16:9`.

## Prompt Construction Pattern

Use this pattern for new prompts:

```text
[Master style prompt]
Create [asset type] for [asset name].
Subject / scene: [specific content].
Composition: [aspect/use case].
Production constraints: [transparent background, no text, readable silhouette, UI room, etc.]
[Shared negative prompt]
```

## Approval Checklist

- silhouette is readable
- style matches the global art direction
- no accidental text or watermark
- correct output type and aspect ratio
- lore/theme matches the relevant documentation
- icons remain readable when small
- UI mockups leave room for German and English localization
