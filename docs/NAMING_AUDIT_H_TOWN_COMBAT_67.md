# H-Town Combat 67 — Naming Audit

## Official Game Name

The official game name is:

```text
H-Town Combat 67
```

Use this name in all player-facing docs, project overviews, manuals, roadmap titles, asset-generation docs, agent instructions, and public-facing copy.

## Completed Rename Scope

The main documentation entry points have been updated to use **H-Town Combat 67** as the game name:

- `README.md`
- `docs/GDD.md`
- `docs/ROADMAP.md`
- `docs/MVP_Scope.md`
- `docs/Technical_Architecture.md`
- `docs/AI_MEGA_PROMPT.md`
- `MASTER_DOCUMENTATION.md`
- `ROADMAP_DETAILED.md`
- `docs/COMPLETE_GAME_FUNCTION_SPEC.md`
- `docs/IMPLEMENTATION_GUIDE.md`
- `docs/release-notes-2026-04-17.md`
- `.chatgpt/skills/htown-combat-dev/SKILL.md`
- `.chatgpt/skills/htown-combat-dev/agents/openai.yaml`
- `docs/assets/asset-prompts/README.md`
- `docs/assets/asset-prompts/STYLE_GUIDE.md`

## Intentional Legacy / Technical Names

Do not blindly replace these without a migration plan:

- Repository/package/path names such as `htown-combat-web`.
- Historical local paths such as `bifa-reboot-migration-web-prototype`.
- Technical storage keys such as `bifa.save.v1`.
- Historical deployment routes such as `/bifa/` when referenced as legacy technical route behavior.
- Retired prototype references such as `REDLINE FC` when they are explicitly marked as historical context.

## Remaining Full-File Patch Candidates

The following Markdown files still contain old visible names, but are large enough that the GitHub connector truncated the file content during review. They should be patched from a local checkout or with a safe full-file script to avoid accidentally truncating documentation:

| File | Known old visible string | Required replacement |
|---|---|---|
| `docs/assets/asset-prompts/ALL_ASSET_PROMPTS.md` | `H-Town Combat / BIFA` | `H-Town Combat 67` |
| `docs/preproduction/20H_LOCALIZATION_DE_EN.md` | `BIFA: Scherbenhimmel` / `BIFA: Shard-Sky` | `H-Town Combat 67: Scherbenhimmel` / `H-Town Combat 67: Shard-Sky` |
| `docs/ULTIMATE_H_TOWN_MASTER_MANUAL.md` | `H-TOWN COMBAT (The Autoballer)` | `H-Town Combat 67` |

## Agent Rule

When adding new documentation or generated assets, use **H-Town Combat 67**. Do not reintroduce `BIFA`, `The Autoballer`, or `H-TOWN COMBAT` as the public game name unless documenting historical context.
