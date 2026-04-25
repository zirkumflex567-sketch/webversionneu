/**
 * Real-GPU FPS profile runner.
 *
 * Launches a *headed* Chromium instance with GPU acceleration enabled,
 * boots a run via the Zustand store hook, lets it play for DURATION_S
 * seconds, scrapes `window.__FPS_PROFILE__` at checkpoints, and writes
 * a report to `tmp/fps-profile-real/report.json` + a final screenshot.
 *
 * Usage:
 *   npm run test:fps              # default 60 s, rixa loadout
 *   DURATION_S=120 CHARACTER=marek npm run test:fps
 *
 * Notes:
 *   - Requires a display (not truly "headless"). On Windows native this
 *     opens a visible browser window — that's intentional; the WebGL GPU
 *     context is what we want to measure.
 *   - The browser is launched with --use-gl=angle for consistent GPU
 *     behaviour on Windows.
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { withLocalServer } from './_server-utils.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL    = process.env.BASE_URL    ?? 'http://localhost:3000'
const STRESS      = process.env.STRESS === '1' || process.env.STRESS === 'heavy'
const PAGE_URL    = STRESS ? `${BASE_URL.replace(/\/$/, '')}/?stress=heavy` : BASE_URL
const DURATION_S  = Number(process.env.DURATION_S ?? 60)
const CHARACTER   = process.env.CHARACTER   ?? 'rixa'
const VIEWPORT_W  = Number(process.env.VIEWPORT_W ?? 1920)
const VIEWPORT_H  = Number(process.env.VIEWPORT_H ?? 1080)
const OUT_DIR     = resolve(__dirname, '..', 'tmp', STRESS ? 'fps-profile-stress' : 'fps-profile-real')
const CHECKPOINTS_S = [5, 15, 30, 45, 60, 90, 120, 180].filter((t) => t <= DURATION_S)
const HEADLESS = process.env.HEADLESS !== '0'
const NON_BLOCKING_ERROR_PATTERNS = [
  /GSI_LOGGER/i,
  /Failed to load resource: the server responded with a status of 403/i,
]

mkdirSync(OUT_DIR, { recursive: true })

console.log(`[fps-profile] url=${PAGE_URL} duration=${DURATION_S}s char=${CHARACTER} ${VIEWPORT_W}x${VIEWPORT_H} stress=${STRESS}`)

const exitCode = await withLocalServer(BASE_URL, async () => {
const browser = await chromium.launch({
  headless: HEADLESS,
  args: [
    '--enable-gpu-rasterization',
    '--ignore-gpu-blocklist',
    '--enable-webgl',
    '--use-angle=default',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
  ],
})

const context = await browser.newContext({
  viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
})
const page = await context.newPage()

const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`)
})

// 1. Boot and wait for Hub
await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30_000 })
await page
  .waitForFunction(
    () => !!globalThis.__GAME_STORE__ && globalThis.__GAME_STORE__.getState().phase !== 'Loading',
    { timeout: 30_000 },
  )
  .catch(() => {})
const gpu = await page.evaluate(async () => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return { vendor: null, renderer: null, webgl: false }
  const dbg = gl.getExtension('WEBGL_debug_renderer_info')
  return {
    webgl: true,
    vendor: dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
    renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
  }
})
console.log(`[fps-profile] GPU: ${gpu.vendor} / ${gpu.renderer}`)

// 2. Configure loadout + start run via store hook (if available)
const hasStore = await page.evaluate(() => !!globalThis.__GAME_STORE__)
if (hasStore) {
  await page.evaluate(({ character }) => {
    const store = globalThis.__GAME_STORE__
    store.getState().configureLoadout({
      character,
      vehicleId: 'vehicle_schrotty',
      weaponId: 'weapon_autocannon',
      bountyIds: [],
    })
    store.getState().startRun()
    if (globalThis.__FPS_PROFILE__) globalThis.__FPS_PROFILE__.reset()
  }, { character: CHARACTER })
} else {
  console.log('[fps-profile] __GAME_STORE__ not available; running passive auth/idle profile only.')
}

// Give engine a beat to spin up after phase change
await page.waitForTimeout(500)

// 3. Poll profiler at checkpoints
const checkpoints = []
const startTs = Date.now()

for (const t of CHECKPOINTS_S) {
  const targetMs = t * 1000
  const now = Date.now() - startTs
  const wait = targetMs - now
  if (wait > 0) await page.waitForTimeout(wait)

  const snap = await page.evaluate(() => {
    const prof = globalThis.__FPS_PROFILE__
    const store = globalThis.__GAME_STORE__
    if (!prof) return null
    return {
      stats: prof.getStats(),
      phase: store?.getState().phase ?? null,
    }
  })
  if (snap) {
    console.log(`[fps-profile] t=${t}s  phase=${snap.phase}  avgFps=${snap.stats.avgFps.toFixed(1)}  p95=${snap.stats.p95Ms.toFixed(1)}ms  p99=${snap.stats.p99Ms.toFixed(1)}ms  enemies=${snap.stats.lastCounts.enemies}`)
    checkpoints.push({ t, ...snap })
  }
}

// 4. Final dump + screenshot
const finalDump = await page.evaluate(() => {
  const prof = globalThis.__FPS_PROFILE__
  const store = globalThis.__GAME_STORE__
  return {
    profile: prof ? prof.dump() : null,
    phase: store?.getState().phase ?? null,
    wave: store?.getState().wave ?? null,
    kills: store?.getState().enemiesKilledThisRun ?? null,
  }
})
await page.screenshot({
  path: resolve(OUT_DIR, 'final.png'),
  fullPage: false,
})

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE_URL,
  durationS: DURATION_S,
  character: CHARACTER,
  stress: STRESS,
  viewport: { w: VIEWPORT_W, h: VIEWPORT_H },
  gpu,
  checkpoints,
  final: finalDump,
  pageErrors: errors.filter(
    (msg) => !NON_BLOCKING_ERROR_PATTERNS.some((pattern) => pattern.test(msg))
  ),
  ignoredPageErrors: errors.filter((msg) =>
    NON_BLOCKING_ERROR_PATTERNS.some((pattern) => pattern.test(msg))
  ),
}

writeFileSync(resolve(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2))

await context.close()
await browser.close()

const finalFps = finalDump.profile?.session?.cumulativeAvgFps ?? 0
const finalP95 = finalDump.profile?.rolling?.p95Ms ?? 0
console.log('\n─── Summary ───')
console.log(`Cumulative avg FPS : ${finalFps.toFixed(2)}`)
console.log(`Rolling p95 ms     : ${finalP95.toFixed(2)}`)
console.log(`Wave reached       : ${finalDump.wave}`)
console.log(`Kills              : ${finalDump.kills}`)
console.log(`Page errors        : ${report.pageErrors.length}`)
console.log(`Report             : ${resolve(OUT_DIR, 'report.json')}`)

return 0
})

process.exit(exitCode)
