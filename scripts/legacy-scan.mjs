import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const blocked = ["REDLINE", "BIFA", "ArcadeFootball", "bifa-web-app"]
const roots = ["app", "src", "package.json", "next.config.mjs"]
const ignorePrefixes = ["src/legacy/", ".git/", "node_modules/", ".next/"]
const failures = []

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    const rel = path.relative(root, full).replace(/\\/g, "/")
    if (ignorePrefixes.some((p) => rel.startsWith(p))) continue
    if (ent.isDirectory()) {
      walk(full)
      continue
    }
    if (!/\.(ts|tsx|js|mjs|md|json|txt|yml|yaml)$/.test(ent.name)) continue
    const content = fs.readFileSync(full, "utf8")
    for (const token of blocked) {
      if (content.includes(token)) {
        failures.push(`${rel}: contains legacy token "${token}"`)
      }
    }
  }
}

for (const relRoot of roots) {
  const abs = path.join(root, relRoot)
  if (!fs.existsSync(abs)) continue
  const stat = fs.statSync(abs)
  if (stat.isDirectory()) {
    walk(abs)
  } else {
    const rel = path.relative(root, abs).replace(/\\/g, "/")
    const content = fs.readFileSync(abs, "utf8")
    for (const token of blocked) {
      if (content.includes(token)) {
        failures.push(`${rel}: contains legacy token "${token}"`)
      }
    }
  }
}

if (failures.length) {
  console.error("legacy-scan failed:")
  for (const f of failures) console.error(` - ${f}`)
  process.exit(1)
}

console.log("legacy-scan passed")
