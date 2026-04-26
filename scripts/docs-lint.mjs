import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const keyDocs = [
  "docs/SOURCE_OF_TRUTH.md",
  "docs/README.md",
  "docs/preproduction/20H_DOCUMENTATION_INDEX.md",
  "docs/preproduction/20H_AGENT_IMPLEMENTATION_PLAYBOOK.md",
]

const errors = []
for (const doc of keyDocs) {
  const abs = path.join(root, doc)
  if (!fs.existsSync(abs)) {
    errors.push(`missing required doc: ${doc}`)
    continue
  }
  const raw = fs.readFileSync(abs, "utf8")
  if (raw.includes(".chatgpt/skills/htown-combat-dev/SKILL.md")) {
    errors.push(`${doc}: must not reference missing .chatgpt skill path`)
  }
}

const infoPath = path.join(root, "docs", "info.txt")
if (fs.existsSync(infoPath)) {
  errors.push("docs/info.txt must be archived, not kept active")
}

if (errors.length) {
  console.error("docs-lint failed:")
  for (const e of errors) console.error(` - ${e}`)
  process.exit(1)
}

console.log("docs-lint passed")
