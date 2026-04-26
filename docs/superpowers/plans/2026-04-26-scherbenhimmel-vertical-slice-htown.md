# Scherbenhimmel Vertical Slice (HTown Remote)

- [x] 0. Remote setup on htown verified (`~/workspace/webversionneu` cloned, `main` checked).

## 1) Docs / Contracts
- [x] 1.1 Add one Side Quest contract entry (with extraction requirement + rewards split).
- [x] 1.2 Add one Companion Quest contract entry (character-gated).
- [x] 1.3 Add one Area instance extension entry (hazard/boss/extraction mod/free-run rule).
- [x] 1.4 Add one Bounty contract entry (modifier + unlock + failure + extraction dependency).
- [x] 1.5 Add DE/EN localization keys for the new slice content.

## 2) Domain / Data
- [x] 2.1 Extend runtime quest data with one Side and one Companion quest.
- [x] 2.2 Extend area data model with progression state and mode availability.
- [x] 2.3 Add bounty unlock and single-selection guard helpers.
- [x] 2.4 Add run resolution helper (extract/defeat + reward categories).

## 3) UI / Flow
- [x] 3.1 Integrate map/area state labels (locked/active/cleared) with i18n.
- [x] 3.2 Integrate story tab type badges (main/side/companion) with i18n labels.
- [x] 3.3 Ensure bounty selection UI communicates one-active-contract rule (localized).

## 4) Validation / QA
- [x] 4.1 Add unit tests for quest completion + extraction dependency.
- [x] 4.2 Add unit tests for run reward resolution outcomes.
- [x] 4.3 Add unit tests for area state -> available mode transitions.
- [x] 4.4 Run verify + test + lint + build and capture outcomes.
- [x] 4.5 Update STATUS_VERIFICATION.md + ROADMAP.md + DOC_CONFLICT_REGISTER.md.

## 5) Commits
- [x] 5.1 Commit docs/contracts + i18n updates.
- [x] 5.2 Commit domain/data + tests updates.
- [x] 5.3 Commit QA/status docs updates.

## Live Hotfix (2026-04-26)
- [x] Fix `/combat` black screen caused by missing `_next` runtime chunk delivery in live nginx pathing.
- [x] Restore missing UI portrait robustness with fallback mapping (`rixa`/`marek`) to avoid broken-image placeholders.
- [x] Validate live endpoints (`/combat`, `/_next` chunks/css, `/combat/assets/ui/portrait_rixa.png`) return `200`.
