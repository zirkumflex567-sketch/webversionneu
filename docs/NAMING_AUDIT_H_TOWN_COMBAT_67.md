# H-Town Combat 67 - Naming Audit

Last updated: 2026-04-26

## Official Product Name

Use this public name in runtime UI, auth flows, docs, and generated artifacts:

```text
H-Town Combat 67
```

## Allowed Technical Legacy Names

Do not mass-replace these without migration planning:

- Repository/package path names like `htown-combat-web`
- Technical keys like `bifa.save.v1` if they are part of persistence compatibility
- Historical route prefixes such as `/bifa/` when documenting legacy infrastructure boundaries
- Legacy references inside `docs/archive/**`

## Active Scope Result

The active runtime and entry docs now use H-Town Combat 67 naming for:

- `app/layout.tsx` metadata title/description
- `app/components/AuthScreen.tsx` login title
- `src/services/emailService.ts` mail sender/subject/body
- Core runtime module headers in `src/`
- Root and docs entry points

## Rule for New Changes

When adding new code or docs, use `H-Town Combat 67` unless the content is explicitly marked historical and kept under `docs/archive/**`.
