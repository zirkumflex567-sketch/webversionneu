# Full Repo Docs and Code Audit - 2026-04-26

## Scope

- Active runtime code under `app/` and `src/`
- Active documentation under `README.md` and `docs/**` excluding `docs/archive/**`

## Resolved in this pass

1. Runtime project identity drift:
   - Replaced remaining active `REDLINE FC` strings in app metadata, auth UI, email content, and active runtime module headers.
2. Package identity drift:
   - Renamed package from `bifa-web-app` to `htown-combat-web`.
3. Broken documentation entry references:
   - Removed active references to missing `.chatgpt/skills/htown-combat-dev/SKILL.md`.
   - Updated entry order in root/docs/preproduction start sequences.
4. Architecture wording drift:
   - Updated `docs/Technical_Architecture.md` to describe the real repo layout (`app/` + `src/`) instead of implying `src/app`.
   - Documented that `OpenWorldManager` is a legacy class name and not campaign model authority.
5. Repo hygiene issue:
   - Removed tracked `gmail-creds*.json` files.
   - Added `gmail-creds*.json` to `.gitignore`.

## Current alignment status

- Campaign contract remains: `Hub -> Quest -> Area Instance -> Extraction -> Hub`.
- Active code and active docs now agree on public naming (`H-Town Combat 67`).
- Legacy names remain only in archived documents or explicitly historical notes.

## Remaining intentional boundaries

- `OpenWorldManager` class naming still exists in runtime internals.
  - This is accepted as technical naming debt for now.
  - It does not change campaign progression rules.
- Mixed infrastructure files (`nginx.conf`, `fr-sieg-*`) remain in-repo and are documented as multi-project boundary risk, not core campaign authority.

## Verification expectation

After any future naming/architecture pass:

- `npm test`
- `npm run lint`
- `npm run build`
- docs internal link check

must be rerun and reflected in `docs/STATUS_VERIFICATION.md`.
