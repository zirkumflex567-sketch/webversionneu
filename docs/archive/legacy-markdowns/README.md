# Legacy Markdown Archive — Do Not Use For Current H-Town Combat 67 Work

This folder is the quarantine/archive index for outdated Markdown documents that must not be used as source-of-truth by implementation, content, art, QA, or coding agents.

## Current Source of Truth

Agents must start from:

1. `README.md`
2. `docs/preproduction/20H_DOCUMENTATION_INDEX.md`
3. `docs/Technical_Architecture.md`
4. `docs/COMPLETE_GAME_FUNCTION_SPEC.md`
5. `.chatgpt/skills/htown-combat-dev/SKILL.md`
6. `docs/NAMING_AUDIT_H_TOWN_COMBAT_67.md`

## Archive Rule

Files listed here are historical only. Do not implement against them. Do not use their mechanics, names, roadmap dates, old Redline/football prototype assumptions, Unity-era assumptions, or BIFA/The Autoballer naming as current facts.

If a historical detail is needed, recover it from Git history intentionally and cite it as legacy context.

## Archived / Removed From Active Docs

The following Markdown files are considered old and should not be read by default:

| Former active path | Reason |
|---|---|
| `docs/GDD_Redline_FC.md` | Retired REDLINE FC arcade-football design doc. |
| `docs/Balance_Bible_REDLINE_FC.md` | Retired REDLINE FC balance bible. |
| `docs/PreProduction_MasterDoc.md` | Retired Unity/REDLINE-era preproduction doc. |
| `docs/Documentation_Status_and_Next_Roadmap.md` | Old web-prototype status doc from master-era workflow. |
| `docs/release-notes-2026-04-17.md` | Old prototype release notes with retired REDLINE and `/bifa/` deployment context. |
| `docs/Repo_Setup_Status.md` | Old repo setup snapshot. |
| `docs/qa-audit-2026-04-17.md` | Old QA snapshot tied to retired prototype state. |
| `docs/Governance_MVP_Execution.md` | Old MVP governance plan. |
| `docs/Execution_Backlog_4_Sprints.md` | Old sprint backlog. |
| `docs/Project_Settings_Policy.md` | Old project settings policy from retired phase. |
| `docs/Asset_Register_Template.md` | Old asset register template superseded by `docs/assets/`. |
| `docs/Unity_Script_Scaffold_Index.md` | Unity scaffold reference, not current web implementation guidance. |
| `docs/Complete_Game_Development_Checklist.md` | Old checklist superseded by current H-Town Combat 67 docs. |
| `docs/bundle-size-history.md` | Old prototype tracking artifact. |

## Remaining Large Legacy Candidates

These files may still contain historical strings but are large enough that automated connector reads can truncate them. Treat them carefully:

| Path | Handling |
|---|---|
| `docs/ULTIMATE_H_TOWN_MASTER_MANUAL.md` | Legacy technical manual; use only as historical reference. Prefer current architecture/spec docs. |
| `docs/assets/asset-prompts/ALL_ASSET_PROMPTS.md` | Active asset promptbook, not archived; still needs a safe full-file naming cleanup if old public name strings remain. |
| `docs/preproduction/20H_LOCALIZATION_DE_EN.md` | Active localization bible, not archived; still needs a safe full-file title cleanup if old boot-title strings remain. |

## Agent Instruction

When in doubt, ignore this archive and read the current source-of-truth docs listed above.
