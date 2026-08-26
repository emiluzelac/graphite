#!/usr/bin/env node
/**
 * Registry smoke test — deterministic validation of the shadcn-format registry.
 *
 * Builds the registry, then verifies its integrity and that the component
 * source we publish actually compiles under strict TypeScript. Catches:
 *   - broken / missing component source files
 *   - registry items that don't match registry.json
 *   - missing declared dependencies (incl. the @emiluzelac/icona coupling)
 *   - a broken `cn` util referenced by every component
 *
 * Does NOT run `shadcn add` (shadcn 4.x hangs when its interactive `add` is
 * spawned as a subprocess under `npm run`); the end-to-end `add` path is
 * covered by manual verification and the same source these checks compile.
 *
 * Usage:  npm run smoke:registry
 * Exits non-zero on failure so it can gate CI (.github/workflows/registry.yml).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(__dirname, '..')
const R = join(REPO, 'public', 'r')
const UI = join(REPO, 'src', 'components', 'ui')
const CN = join(REPO, 'src', 'lib', 'cn.ts')

const errors = []
const ok = (msg) => console.log(`  ✔ ${msg}`)
const bad = (msg) => errors.push(msg)

// ---- 0. Build the registry ----
console.log('• building registry...')
const build = spawnSync('npm', ['run', 'registry:build'], { cwd: REPO, stdio: 'inherit' })
if (build.status !== 0) { console.error('✖ registry build failed'); process.exit(1) }

// ---- 1. Verify every registry.json item is built and consistent ----
console.log('• validating registry.json vs built output...')
const registry = JSON.parse(readFileSync(join(REPO, 'registry.json'), 'utf8'))
const builtFiles = readdirSync(R).filter((f) => f.endsWith('.json'))
const validNames = new Set(['utils', 'theme'])
const itemByName = new Map(registry.items.map((i) => [i.name, i]))

for (const item of registry.items) {
  const out = join(R, `${item.name}.json`)
  if (!existsSync(out)) { bad(`registry item "${item.name}" missing built file ${item.name}.json`); continue }
  let parsed
  try { parsed = JSON.parse(readFileSync(out, 'utf8')) } catch { bad(`registry item "${item.name}" built JSON is unparseable`); continue }

  for (const f of item.files ?? []) {
    const path = join(REPO, f.path)
    if (!existsSync(path)) bad(`item "${item.name}" references missing source file ${f.path}`)
  }
  for (const dep of item.registryDependencies ?? []) {
    const name = dep.startsWith('@graphite/') ? dep.slice('@graphite/'.length) : dep
    validNames.add(name)
  }
}
// every component must resolve its `@graphite/utils` dependency (the cn util)
for (const item of registry.items) {
  if (item.name === 'utils' || item.name === 'theme') continue
  if (existsSync(join(R, `${item.name}.json`))) {
    const parsed = JSON.parse(readFileSync(join(R, `${item.name}.json`), 'utf8'))
    const regDeps = (parsed.registryDependencies ?? []).map((d) => (d.startsWith('@graphite/') ? d.slice(10) : d))
    if (!regDeps.includes('utils')) bad(`component "${item.name}" does not depend on @graphite/utils (missing cn helper)`)
  }
}
// every item referenced as a registryDependency must actually exist
for (const name of validNames) {
  if (!itemByName.has(name) && name !== 'utils' && name !== 'theme') bad(`registryDependency "${name}" is not a defined registry item`)
}

// ---- 2. Verify the @emiluzelac/icona coupling is declared and resolvable ----
console.log('• checking @emiluzelac/icona coupling...')
const iconUsers = registry.items.filter((i) => (i.files ?? []).some((f) => {
  try { return readFileSync(join(REPO, f.path), 'utf8').includes('@emiluzelac/icona') } catch { return false }
}))
for (const item of iconUsers) {
  const parsed = JSON.parse(readFileSync(join(R, `${item.name}.json`), 'utf8'))
  if (!(parsed.dependencies ?? []).includes('@emiluzelac/icona'))
    bad(`component "${item.name}" imports @emiluzelac/icona but does not declare it as a dependency`)
}
const npmView = spawnSync('npm', ['view', '@emiluzelac/icona', 'version'], { encoding: 'utf8' })
if (npmView.status !== 0 || !npmView.stdout.trim())
  bad('@emiluzelac/icona is not a resolvable npm package (registry consumers cannot install it)')
else ok(`@emiluzelac/icona resolved on npm (${npmView.stdout.trim()})`)
ok(`${iconUsers.length} icon-using component(s) tested`)

// ---- 3. Strict type-check the published component source and the cn util ----
console.log('• type-checking published component source (strict)...')
const uiFiles = readdirSync(UI).filter((f) => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
// build a tiny tsconfig scoped to the shipped source so lib JSX types resolve
const projNames = ['button', 'checkbox', 'combobox', 'data-list', 'dialog', 'disclosure', 'field', 'fieldset', 'input', 'listbox', 'menu', 'popover', 'radio-group', 'select', 'separator', 'switch', 'tabs', 'textarea', 'backdrop']
const proj = join(REPO, 'node_modules', '.cache-smoke')
mkdirSync(proj, { recursive: true })
writeFileSync(join(proj, 'tsconfig.json'), JSON.stringify({
  compilerOptions: {
    target: 'ES2020', lib: ['ES2020', 'DOM', 'DOM.Iterable'], module: 'ESNext',
    moduleResolution: 'bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true,
    noEmit: true, esModuleInterop: true, resolveJsonModule: true,
    baseUrl: REPO, paths: { '@/*': [join(REPO, 'src', '*')] },
  },
  include: uiFiles.map((f) => join(UI, f)),
}))
const tsc = spawnSync(join(REPO, 'node_modules', '.bin', 'tsc'), ['-p', proj], { encoding: 'utf8' })
if (tsc.status !== 0) bad('published component source does not type-check:\n' + tsc.stdout + tsc.stderr)
else ok('published component source type-checks')

if (errors.length) {
  console.error(`\n✖ SMOKE REGISTRY FAILED — ${errors.length} problem(s):`)
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
} else {
  console.log(`\n✔ SMOKE REGISTRY PASSED — ${registry.items.length} items validated; source type-checks.`)
}
