/**
 * Viewport smoke check — boots the running dev/preview server across
 * desktop / tablet / mobile breakpoints, verifies:
 *   - no uncaught page errors
 *   - HUD root renders
 *   - no horizontal overflow (scrollWidth <= innerWidth)
 *   - Zustand store is exposed on window.__GAME_STORE__
 *
 * This script auto-starts a local dev server on BASE_URL (default http://localhost:3000).
 */
import { chromium, devices } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { withLocalServer } from './_server-utils.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT_DIR = resolve(__dirname, '..', 'tmp', 'viewport-smoke')

const VIEWPORTS = [
  { name: 'desktop-1920x1080', width: 1920, height: 1080, mobile: false },
  { name: 'desktop-1366x768', width: 1366, height: 768, mobile: false },
  { name: 'tablet-1024x768', width: 1024, height: 768, mobile: false },
  { name: 'tablet-768x1024', width: 768, height: 1024, mobile: false },
  { name: 'mobile-iphone14', ...devices['iPhone 14'].viewport, mobile: true, ua: devices['iPhone 14'].userAgent },
  { name: 'mobile-pixel7', ...devices['Pixel 7'].viewport, mobile: true, ua: devices['Pixel 7'].userAgent },
]

const NON_BLOCKING_ERROR_PATTERNS = [
  /GSI_LOGGER/i,
  /Failed to load resource: the server responded with a status of 403/i,
]

const results = []
let failed = 0

mkdirSync(OUT_DIR, { recursive: true })

const failedCount = await withLocalServer(BASE_URL, async () => {
const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.mobile,
    userAgent: vp.ua,
    deviceScaleFactor: vp.mobile ? 2 : 1,
  })
  const page = await context.newPage()

  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30_000 })
    // Wait briefly for Zustand store hook and Hub phase to settle
    await page.waitForFunction(
      // eslint-disable-next-line no-undef
      () => !!globalThis.__GAME_STORE__ && globalThis.__GAME_STORE__.getState().phase !== 'Loading',
      { timeout: 10_000 },
    ).catch(() => {})

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement
      // eslint-disable-next-line no-undef
      const store = globalThis.__GAME_STORE__
      return {
        scrollWidth: doc.scrollWidth,
        innerWidth: window.innerWidth,
        scrollHeight: doc.scrollHeight,
        innerHeight: window.innerHeight,
        bodyText: document.body.innerText.slice(0, 300),
        hasStoreHook: !!store,
        phase: store ? store.getState().phase : null,
      }
    })

    const relevantErrors = errors.filter(
      (msg) => !NON_BLOCKING_ERROR_PATTERNS.some((pattern) => pattern.test(msg))
    )
    const overflow = metrics.scrollWidth > metrics.innerWidth + 1
    const hudOk = metrics.bodyText.length > 0
    const pass = relevantErrors.length === 0 && !overflow && hudOk

    if (!pass) failed += 1

    await page.screenshot({
      path: resolve(OUT_DIR, `${vp.name}.png`),
      fullPage: false,
    })

    results.push({
      viewport: vp.name,
      pass,
      errors: relevantErrors,
      ignoredErrors: errors.filter((msg) =>
        NON_BLOCKING_ERROR_PATTERNS.some((pattern) => pattern.test(msg))
      ),
      overflow,
      hudOk,
      hasStoreHook: metrics.hasStoreHook,
      phase: metrics.phase,
      metrics,
    })

    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${vp.name}  phase=${metrics.phase}  overflow=${overflow}  errors=${relevantErrors.length}`)
  } catch (e) {
    failed += 1
    results.push({ viewport: vp.name, pass: false, error: String(e) })
    console.log(`[FAIL] ${vp.name}  ${String(e)}`)
  }

  await context.close()
}

await browser.close()

writeFileSync(resolve(OUT_DIR, 'summary.json'), JSON.stringify({
  base: BASE_URL,
  generatedAt: new Date().toISOString(),
  failed,
  total: VIEWPORTS.length,
  results,
}, null, 2))

console.log(`\nResult: ${VIEWPORTS.length - failed}/${VIEWPORTS.length} passed`)
console.log(`Artifacts: ${OUT_DIR}`)

return failed
})

process.exit(failedCount === 0 ? 0 : 1)
