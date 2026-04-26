# H-Town Combat 67 / Scherbenhimmel

H-Town Combat 67 is a web-based vehicle extraction roguelite project with a 20-hour Scherbenhimmel campaign scope.

## Critical Rules

- Campaign structure is fixed: `Hub -> Quest -> Area Instance -> Extraction -> Hub`.
- The first 20-hour campaign is **not** a seamless open world.
- Player-facing text must be DE/EN localized through stable keys.
- Agent/code instructions and technical contracts are maintained in English.

## Documentation Entry

Start here for any implementation or audit work:

1. [docs/README.md](docs/README.md)
2. [docs/preproduction/20H_DOCUMENTATION_INDEX.md](docs/preproduction/20H_DOCUMENTATION_INDEX.md)
3. [docs/SOURCE_OF_TRUTH.md](docs/SOURCE_OF_TRUTH.md)
4. [docs/STATUS_VERIFICATION.md](docs/STATUS_VERIFICATION.md)

## Source of Truth

- Authoritative hierarchy: [docs/SOURCE_OF_TRUTH.md](docs/SOURCE_OF_TRUTH.md)
- Current status and verification evidence: [docs/STATUS_VERIFICATION.md](docs/STATUS_VERIFICATION.md)
- Conflict tracking: [docs/audit/DOC_CONFLICT_REGISTER.md](docs/audit/DOC_CONFLICT_REGISTER.md)
- Code-vs-doc traceability: [docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md](docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md)

## Build/Test Commands

```powershell
npm ci
npm test
npm run build
npm run lint
npm run test:viewport
npm run test:fps
npm audit --audit-level=high
```

Interpret results only through [docs/STATUS_VERIFICATION.md](docs/STATUS_VERIFICATION.md) and the latest audit report.
