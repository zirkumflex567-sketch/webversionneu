# Hard Pivot Audit (2026-04-26)

## Objective

Bring runtime and documentation into alignment with the documented area-instance campaign model and mandatory localization strategy.

## Implemented

1. Runtime Open-World decoupling
- Removed active runtime imports/usage of `OpenWorldManager` from gameplay loop and movement/projectile updates.
- Moved legacy open-world implementation to `src/legacy/OpenWorldLegacy.ts`.
- Replaced `MapTab` world-zone dependency with canonical `AREA_DEFINITIONS`.

2. Localization infrastructure
- Added typed i18n contract in `src/i18n/index.ts`:
  - `Locale = "de" | "en"`
  - `TranslationKey`
  - `t(key, vars?, locale?)`
- Added React helper `useT()` for UI components.
- Added locale state to `useGameStore` (`locale`, `setLocale`).
- Migrated critical runtime callouts and selected active UI surfaces to i18n keys.

3. Guardrails
- Added `scripts/legacy-scan.mjs` for forbidden legacy tokens in active tree.
- Added `scripts/i18n-check.mjs` for hardcoded callout detection + placeholder parity checks.
- Added `scripts/docs-lint.mjs` for SoT path hygiene and active `docs/info.txt` rejection.
- Wired scripts in `package.json` via:
  - `legacy:scan`
  - `i18n:check`
  - `docs:lint`
  - `verify`

4. Documentation reconciliation
- Archived current `docs/info.txt` input to `docs/archive/2026-04-26/docs-cleanup/info-chatgpt-audit-input-3.txt`.
- Updated architecture and conflict-register docs for the hard-pivot decision.

## Residual Notes

- Legacy references remain intentionally in archive/legacy paths.
- Additional UI localization migration can continue incrementally under the same i18n contract.
