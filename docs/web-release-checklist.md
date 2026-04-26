# H-Town Combat Web Release Checklist

Stand: 2026-04-21

## Build and Quality Gates

- [x] `npm install` laeuft ohne Fehler
- [x] `npm run lint` gruen
- [x] `npm run test` gruen (25/25)
- [x] `npx tsc --noEmit` gruen
- [x] `npm run build` gruen
- [x] `npm run start` / `npm run dev` startet

## Gameplay Smoke Tests

- [x] Hub laedt, alle 4 Tabs navigierbar ohne JS-Errors
- [x] Deploy startet Match, HUD erscheint, 1. Enemy-Wave spawnt
- [x] Death-Pfad: HULL=0 -> RunSummary "VEHICLE_CRITICAL_FAILURE", banked 50% Scrap
- [x] Extraction-Pfad: forceExtraction -> Extraction-Guardian spawnt + 30s-Hold -> "EXTRACTED" mit wave*30 Bonus
- [x] Boss-Announcement: roter Flash + Horn-Sting bei Wave 3 / jede 10. Wave / Extraction-Guardian
- [x] HeavyEnemy Death-FX: distinct orange explosion
- [x] Scrap/Tech wird via SaveManager nach RunEnde persistiert

## Browser and UX Validation

- [x] Desktop baseline in Chromium (Playwright) - 0 page errors
- [~] Mobile viewport check 390x844 / 844x390 / 768x1024 / 1024x768 - automated Chromium audit captured in `tmp/roadmap_viewport_perf_audit/`, manual device pass still pending
- [ ] Firefox / Safari / Edge Matrix (pending)
- [~] HUD lesbar und nicht ueberlappend (Chromium viewport audit improved; final real-device signoff pending)

## Performance Baseline

- [~] Stabil ~60 FPS auf Target-Hardware (build/preview-baseline dokumentiert; automated headless combat audit exists but is not hardware-representative)
- [~] Keine schweren Frame-Spikes bei vielen Enemies + FX (combat-load audit captured in `tmp/roadmap_viewport_perf_audit/`; real hardware profiling still pending)
- [x] Bundle size tracked nach jedem Release-Build

## Documentation and Release Notes

- [x] `docs/STATUS_VERIFICATION.md` aktualisiert
- [x] manual-test-checklist.md spiegelt H-Town Combat (nicht Football-Prototyp)
- [x] README / DEPLOYMENT / LIVE_DEPLOY up to date
- [x] Legacy `game.html` nach `artifacts/legacy/` verschoben
