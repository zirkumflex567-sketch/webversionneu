import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const mode = process.env.I18N_CHECK_MODE === "block" ? "block" : "warn"
const targets = ["app/components", "src/ui", "src/game"]

const errors = []
const warnings = []
const discoveredKeys = new Set()

const jsxAllowlist = new Set([
  "S",
  "T",
  "NODE_OMEGA",
  "REQ_SALVAGE",
  "UNIT_SYNC_STATUS",
  "ACTIVE_CONTRACTS",
  "EST_DATA_REWARD",
  "INVENTORY_SYNC",
])

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

function checkJsxLiterals(file, lines) {
  lines.forEach((line, idx) => {
    // JSX text node with mostly letters/numbers/spaces
    const textMatches = [...line.matchAll(/>([^<{][^<{]{2,})</g)]
    for (const m of textMatches) {
      const raw = m[1].trim()
      if (!raw) continue
      if (raw.startsWith("{") || raw.endsWith("}")) continue
      if (jsxAllowlist.has(raw)) continue
      if (/[={}()[\]|]/.test(raw)) continue
      if (raw.includes("=>") || raw.includes("&&") || raw.includes("||")) continue
      if (/^[0-9+\-/%:., ]+$/.test(raw)) continue
      if (/^\W+$/.test(raw)) continue
      warnings.push(`${file}:${idx + 1} hardcoded JSX text "${raw}"`)
    }
  })
}

function discoverI18nKeys(content) {
  const patterns = [
    /\bt\(\s*["'`]([^"'`]+)["'`]/g,
    /\btranslate\(\s*["'`]([^"'`]+)["'`]/g,
  ]
  for (const regex of patterns) {
    let match
    while ((match = regex.exec(content)) !== null) {
      discoveredKeys.add(match[1])
    }
  }
}

for (const rel of targets) {
  const files = walk(path.join(root, rel))
  for (const filePath of files) {
    const relFile = path.relative(root, filePath).replace(/\\/g, "/")
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split(/\r?\n/)

    lines.forEach((line, idx) => {
      if (/showCallout\(\s*["'`]/.test(line)) {
        errors.push(`${relFile}:${idx + 1} hardcoded showCallout text`)
      }
    })

    checkJsxLiterals(relFile, lines)
    discoverI18nKeys(content)
  }
}

const i18nFile = path.join(root, "src", "i18n", "index.ts")
if (fs.existsSync(i18nFile)) {
  const raw = fs.readFileSync(i18nFile, "utf8")
  const existingKeys = new Set()
  const entryRegex = /"([^"]+)":\s*\{\s*de:\s*"([^"]*)",\s*en:\s*"([^"]*)"/g
  let match
  while ((match = entryRegex.exec(raw)) !== null) {
    const key = match[1]
    const de = match[2]
    const en = match[3]
    existingKeys.add(key)
    const deVars = [...de.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",")
    const enVars = [...en.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",")
    if (deVars !== enVars) {
      errors.push(`i18n placeholder mismatch in key "${key}" (de: ${deVars} vs en: ${enVars})`)
    }
  }

  for (const key of discoveredKeys) {
    if (key.includes("${")) continue
    if (!existingKeys.has(key)) {
      errors.push(`missing i18n key "${key}" referenced in source`)
    }
  }
}

if (warnings.length > 0) {
  console.warn("i18n-check warnings:")
  for (const w of warnings) console.warn(` - ${w}`)
}

if (errors.length > 0) {
  console.error("i18n-check failed:")
  for (const e of errors) console.error(` - ${e}`)
  process.exit(1)
}

if (mode === "block" && warnings.length > 0) {
  console.error("i18n-check failed in block mode due to warnings")
  process.exit(1)
}

console.log(`i18n-check passed (${mode} mode)`)
