import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const targets = [
  "app/components",
  "src/game",
]

const errors = []

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full)
  }
  return out
}

for (const rel of targets) {
  const files = walk(path.join(root, rel))
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8")
    const lines = content.split(/\r?\n/)
    lines.forEach((line, idx) => {
      if (/showCallout\(\s*["'`]/.test(line)) {
        errors.push(`${path.relative(root, file)}:${idx + 1} hardcoded showCallout text`)
      }
    })
  }
}

const i18nFile = path.join(root, "src", "i18n", "index.ts")
if (fs.existsSync(i18nFile)) {
  const raw = fs.readFileSync(i18nFile, "utf8")
  const entryRegex = /"([^"]+)":\s*\{\s*de:\s*"([^"]*)",\s*en:\s*"([^"]*)"/g
  let match
  while ((match = entryRegex.exec(raw)) !== null) {
    const key = match[1]
    const de = match[2]
    const en = match[3]
    const deVars = [...de.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",")
    const enVars = [...en.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",")
    if (deVars !== enVars) {
      errors.push(`i18n placeholder mismatch in key "${key}" (de: ${deVars} vs en: ${enVars})`)
    }
  }
}

if (errors.length > 0) {
  console.error("i18n-check failed:")
  for (const e of errors) console.error(` - ${e}`)
  process.exit(1)
}

console.log("i18n-check passed")
