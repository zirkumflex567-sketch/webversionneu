# H-Town Combat Web - Performance Baseline

Last updated: 2026-04-22

## Build baseline
- Command: `npm run build`
- Current status: passes locally, static prerender of `/` at ~1.34 kB / 107 kB First Load JS
- Bundle history tracked in [bundle-size-history.md](bundle-size-history.md)

## Headless viewport smoke (layout-only, not FPS)
- Harness: [tests/viewport-smoke.mjs](../tests/viewport-smoke.mjs)
- Run: `npm run test:viewport` (requires `npm run dev`)
- Artifact: `tmp/viewport-smoke/summary.json` + 6 screenshots
- Coverage: desktop (1920×1080, 1366×768), tablet (1024×768, 768×1024), iPhone 14, Pixel 7
- Checks: page errors, horizontal overflow, Hub phase reached, Zustand hook exposed
- **Not a performance signal** — headless Chromium has no GPU path.

## Real-GPU FPS profile (hardware-representative)
- Harness: [tests/fps-profile-real.mjs](../tests/fps-profile-real.mjs)
- Run: `npm run test:fps` (opens a headed browser; requires `npm run dev`)
- Env overrides: `DURATION_S`, `CHARACTER=rixa|marek`, `VIEWPORT_W`, `VIEWPORT_H`, `BASE_URL`
- Artifact: `tmp/fps-profile-real/report.json` + `final.png`
- In-game overlay: press **F3** during play for rolling FPS / p95 / p99 / entity counts

### Recorded baseline — 2026-04-22
| Field | Value |
|---|---|
| GPU | NVIDIA RTX A4500 (ANGLE / D3D11) |
| Viewport | 1920 × 1080 |
| Character | rixa |
| Duration | 60 s |
| Cumulative avg FPS | **110.95** |
| Rolling p50 frame time | ~8.7 ms |
| Rolling p95 frame time | **14.40 ms** (~69 fps) |
| Rolling p99 frame time | 53.4 ms (~19 fps) |
| Cumulative max frame | 1061 ms (startup / asset-load spike; excluded from steady-state assessment) |
| Wave reached | 2 |
| Kills | 66 |
| Peak enemies on screen | 1 |
| Peak projectiles | 1 |
| Peak scraps | 33 |
| Page errors | 2 (404s on missing assets, non-blocking) |

### Reading the numbers
- **Steady-state avg > 110 fps** is healthy headroom on a discrete desktop GPU.
- **p99 spikes ~53 ms** recur every few seconds — likely GC, asset-lazy-load, or one-shot FX allocation. Investigate before worrying about raw fps.
- **Peak entity counts are low** in a 60 s wave-2 run because the player clears fast. Stress testing heavy / boss waves requires either a longer run (`DURATION_S=180`) or a test-only cheat hook that spawns a fixed horde.

## Next perf steps
1. **Stress scenario** — add a dev-only URL flag (`?stress=heavy`) that forces the HordeDirector into a pre-baked heavy-wave config so profiles are repeatable.
2. **p99 spike root-cause** — capture Chrome DevTools Performance trace during a p99 frame to decide between GC, texture upload, or JS hot-spot.
3. **Low-end baseline** — run the same harness on an integrated-GPU laptop (Intel Iris / AMD Radeon Graphics) and record deltas here.
4. **Mobile real-device** — exploratory profile on at least one iOS and one Android device (not automatable via this harness; capture numbers manually from F3 overlay).
5. **Texture / draw-call inventory** — instrument `FpsProfiler` with a per-frame `renderer.info` dump to track draw calls, triangles, programs.
