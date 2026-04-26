# 2026-04-26 Scherbenhimmel Convergence Plan (Runtime ↔ Docs ↔ i18n)

## Working Mode
- [x] Arbeiten im aktiven `webversionneu`-Repo fokussiert (unrelated Workspace-Änderungen nicht anfassen). Done: Scope auf `webversionneu/` eingegrenzt.
- [ ] Htown-Remote-Sync abschließen (lokale Änderungen nachziehen/pushen).

## 1) Vollständige i18n-Migration (UI + Data)
- [x] Hub/Story/Quest/Bounty-nahe UI-Texte in `app/components/Hub.tsx` auf `t("...")` umstellen. Done: Header/Tabs/Buttons/Status/Story-Labels keyifiziert.
- [x] i18n Dictionary DE/EN für neue Hub/Story/Status/Contracts/Shop Keys ergänzen. Done: `src/i18n/index.ts` erweitert.
- [x] Sichtbare Datenfelder in Content-Modellen (`CharacterData`, `BountyData`, Quest-Felder) auf Key-Felder umstellen. Done: `BountyData` auf `displayNameKey`/`descriptionKey` migriert und UI-Verbrauch angepasst.
- [ ] `TranslationKey`-gebundene Typen in Datenmodellen verschärfen, sodass Raw-Strings ausgeschlossen sind.

## 2) Quest-/Story-/Area-Flow Verzahnung
- [x] StoryStore mit Area-State-Transition koppeln (`locked -> active_quest -> cleared_free_run`). Done: `src/store/StoryStore.ts` ergänzt.
- [ ] Reward-/Resolution-Pfad auf klaren Resolver vereinheitlichen (Completion/Extraction/Choice/Lost-on-defeat).
- [ ] StoryTab Start/Turn-in-Flows gegen Domain-Pfade prüfen und fehlende Lokalisierung ergänzen.
- [x] Tests für `requiresExtractionForCompletion`, Area-Transition und StoryTab-Verhalten ergänzen. Done: `src/store/StoryStore.test.ts` mit Area-Transition-Cases ergänzt.

## 3) Guardrails & CI-Härtung (staged)
- [x] `i18n-check` auf JSX-Literals + Key-Existenz + Placeholder-Parity erweitern, staged warn/block. Done: `scripts/i18n-check.mjs` ersetzt.
- [x] `legacy-scan` um staged warn/block + Suppression-Mechanik ergänzen. Done: `scripts/legacy-scan.mjs` erweitert.
- [ ] Optional Hooks (`pre-commit`/`pre-push`) vorbereiten, CI bleibt autoritativ.

## 4) Kern-Dokumente direkt aktualisieren
- [x] `docs/preproduction/20H_CHARACTER_PAGES.md` auf Runtime-Stand bringen. Done: Runtime-Snapshot 2026-04-26 ergänzt.
- [x] `docs/preproduction/20H_QUEST_BIBLE.md` auf Runtime-Stand bringen. Done: Runtime-Snapshot 2026-04-26 ergänzt.
- [x] `docs/preproduction/20H_REGION_PAGES.md` + `20H_AREA_PROGRESSION_MODEL.md` auf Runtime-Stand bringen. Done: Runtime-Snapshot 2026-04-26 ergänzt.
- [ ] `docs/audit/DOC_CONFLICT_REGISTER.md` echte Altkonflikte markieren/abschließen.
- [ ] `docs/STATUS_VERIFICATION.md` + `docs/ROADMAP.md` mit neuen Gates/Abnahme aktualisieren.

## 5) Verifikation und Abschluss
- [x] `npm run verify` Done: grün (warn-mode Findings dokumentiert).
- [x] `npm test` Done: 33 Dateien, 335 Tests grün.
- [x] `npm run lint` Done: grün (nur bekannte Next-Warnung).
- [x] `npm run build` Done: grün.
- [ ] Commit-Blöcke logisch trennen (i18n, flow, guardrails, docs) und Push.
