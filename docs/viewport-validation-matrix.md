# H-Town Combat Web - Viewport Validation Matrix

Date: 2026-04-21
Scope: hub/start flow, HUD readability, boss-health readability, pause overlay, threat markers, action-bar fit.

## Desktop matrix

| Viewport | Browser target | Result | Notes |
|---|---|---|---|
| 1920x1080 | Chromium/Chrome | Automated pass captured | `tmp/roadmap_viewport_perf_audit/desktop-1920x1080.png` |
| 1366x768 | Chromium/Chrome | Automated pass captured | `tmp/roadmap_viewport_perf_audit/desktop-1366x768.png` |
| 1280x720 | Chromium/Chrome | Pending manual run | Minimum desktop target |

## Tablet/mobile matrix

| Viewport | Device class | Result | Notes |
|---|---|---|---|
| 1024x768 | Tablet landscape | Automated pass captured | `tmp/roadmap_viewport_perf_audit/tablet-1024x768.png` |
| 768x1024 | Tablet portrait | Automated pass captured | `tmp/roadmap_viewport_perf_audit/tablet-768x1024.png` |
| 390x844 | Mobile portrait | Automated pass captured | `tmp/roadmap_viewport_perf_audit/mobile-390x844.png` and `mobile-390x844-pause.png` |
| 844x390 | Mobile landscape | Automated pass captured | Short-height HUD compression applied and rechecked |

## Current automated evidence
- Chromium audit script: `tmp/roadmap_viewport_perf_audit.js`
- Latest screenshots + JSON summary: `tmp/roadmap_viewport_perf_audit/`
- Audit covers boss-health bar, hostiles/visible/edge telemetry, pause overlay, and short-height HUD fit.

## Blocker to closing this checklist item
Manual browser runs across Firefox / Safari / Edge and at least one real mobile device are still required to move these items to `[x]`.
