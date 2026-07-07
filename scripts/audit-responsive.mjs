#!/usr/bin/env node
/**
 * Responsive overflow audit.
 *
 * Crawls the running gallery (default http://localhost:5173), collects every
 * internal route, then loads each one at the given widths and fails if any
 * page scrolls horizontally — printing the offending elements.
 *
 * Usage:
 *   npm run audit:responsive              # against the dev server
 *   node scripts/audit-responsive.mjs --url http://localhost:4173
 *   node scripts/audit-responsive.mjs --widths 320,390,768
 *
 * Uses your installed Google Chrome (via playwright-core `channel: 'chrome'`);
 * falls back to a Playwright-cached Chromium if present.
 */
import { chromium } from 'playwright-core'
import { readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const args = process.argv.slice(2)
const argValue = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}
const BASE = argValue('--url', 'http://localhost:5173').replace(/\/$/, '')
const WIDTHS = argValue('--widths', '390,768').split(',').map(Number)

async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome', headless: true })
  } catch {
    // Fall back to any Playwright-cached Chromium (newest build wins).
    const cache = join(
      homedir(),
      process.platform === 'darwin' ? 'Library/Caches/ms-playwright' : '.cache/ms-playwright',
    )
    const entries = readdirSync(cache)
      .filter((d) => d.startsWith('chromium'))
      .sort()
      .reverse()
    for (const dir of entries) {
      for (const bin of [
        'chrome-headless-shell-mac-arm64/chrome-headless-shell',
        'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
        'chrome-linux/chrome',
      ]) {
        try {
          return await chromium.launch({ executablePath: join(cache, dir, bin) })
        } catch {
          /* try next */
        }
      }
    }
    throw new Error(
      'No Chrome found. Install Google Chrome or run: npx playwright install chromium',
    )
  }
}

const browser = await launch()

// Collect routes by crawling the homepage's internal links (desktop width so
// nothing is hidden), so the list never goes stale.
const crawler = await browser.newPage()
await crawler.goto(BASE + '/', { waitUntil: 'networkidle' }).catch(() => {
  console.error(`Cannot reach ${BASE} — start the app first (npm run dev) or pass --url.`)
  process.exit(2)
})
const routes = await crawler.evaluate(() => [
  ...new Set(
    ['/'].concat([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'))),
  ),
])
await crawler.close()

let failures = 0
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 844 } })
  const page = await ctx.newPage()
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(150)
    const { overflow, offenders } = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const overflow = document.documentElement.scrollWidth - vw
      const offenders =
        overflow > 0
          ? [...document.querySelectorAll('body *')]
              .filter((el) => {
                const b = el.getBoundingClientRect()
                return b.right > vw + 1 && b.width > 40
              })
              .slice(0, 5)
              .map(
                (el) =>
                  `${el.tagName}.${(el.getAttribute('class') || '').split(' ').slice(0, 5).join('.')}`,
              )
          : []
      return { overflow, offenders }
    })
    if (overflow > 0) {
      failures++
      console.error(`FAIL ${width}px ${route}: +${overflow}px  ${offenders.join(' | ')}`)
    }
  }
  await ctx.close()
}
await browser.close()

if (failures) {
  console.error(`\n${failures} page/width combination(s) overflow horizontally.`)
  process.exit(1)
}
console.log(`OK — ${routes.length} routes x ${WIDTHS.join('/')}px, no horizontal overflow.`)
