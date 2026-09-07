# Graphite agent instructions

These instructions apply to maintaining this repository. For installing or using
Graphite in another app, read [Using Graphite](public/using-graphite.md). Keep that
guide canonical instead of creating separate Copilot, Claude, or Cursor copies.

## Start here

Read [README.md](README.md) for setup and
[docs/design-tokens.md](docs/design-tokens.md) for the styling contract. Current
source and `registry.json` define the actual APIs and dependencies. Documents in
`docs/superpowers/` are historical plans/specs, not instructions to reapply old
changes.

## Source map

| Path | Responsibility |
| --- | --- |
| `src/components/ui/` | Reusable components and colocated tests |
| `src/lib/cn.ts` | `cn` and Headless UI render-prop-aware `composeClass` |
| `src/pages/` | Showcase compositions and displayed code examples |
| `src/pages/docs.tsx` | In-app `/docs` page, rendered from the canonical public guide |
| `src/App.tsx`, `src/components/sidebar.tsx` | Showcase routes and navigation |
| `src/index.css` | Semantic tokens, Tailwind mappings, and material utilities |
| `src/theme.tsx`, `src/theme-context.ts`, `index.html` | Showcase theme state and pre-paint handling |
| `registry.json` | Registry item definitions and dependencies |
| `public/r/` | Distributable catalog and component JSON |
| `public/using-graphite.md`, `public/llms.txt` | Public integration guide and agent entry point |

## Reusable component rules

- Graphite uses Headless UI, not Radix. Reuse its keyboard, focus, portal, and
  state behavior rather than rebuilding those mechanisms.
- Use `composeClass` for Headless UI `className` props, which can be strings or
  state render functions. Use `cn` for ordinary class lists. Preserve the
  underlying prop types and wrapper exports.
- Use semantic color and radius utilities. Do not introduce hardcoded gray/sky
  ramps or duplicate `dark:` styling in `src/components/ui/`.
- Use `glass` for floating surfaces and `glass-flat` for inline controls.
  Nested surfaces and interaction washes use foreground alpha, not opaque
  accent/secondary fills. Preserve deliberate solid primary/destructive actions,
  selected control states, and the showcase's opaque code-block background.
- Prefer explicit `border-border` over relying on a consuming app's base layer.
  Glass utilities own their border shorthand; ordinary border classes do not
  reliably override them through `tailwind-merge`.
- Keep accessible names, labels, focus indicators, disabled/invalid behavior,
  and controlled-state contracts intact. Do not export showcase-only demo state
  as application behavior.
- When changing an API, update its showcase and displayed code example together.
  Add or adjust the nearest existing test for behavior changes.

## Theme and registry changes

Keep token values and material definitions in `src/index.css` aligned with the
`theme` item in `registry.json`. Backdrop variables belong to the `backdrop` item.
The showcase theme provider and pre-paint script are separate from registry CSS;
do not assume installing the theme supplies runtime theme management.

Ordinary UI items must not depend on `@graphite/theme` or overwrite a consumer's
color variables. Theme installation is explicit; `backdrop` is another explicit
opt-in that adds its own variables. Declare npm dependencies and cross-item
`registryDependencies` for every shipped file.

Edit source files and `registry.json`, then use `npm run registry:build` to rebuild
component JSON. Do not hand-edit generated item source in `public/r/`. Keep the
published `public/r/registry.json` catalog aligned with the root manifest, and
inspect generated changes before including them.

## Validation and publication

Use Node.js 22.12+ (CI uses Node 22) and npm with the committed lockfile. Setup and
available scripts are documented in the README and `package.json`.

- For component/helper changes, start with the relevant existing test, for example
  `npm test -- src/components/ui/button.test.tsx src/lib/cn.test.ts`.
- For TypeScript/application changes, use `npm run build`; use the existing
  ESLint setup for changed code. Escalate to `npm test` for shared behavior.
- For registry changes, run `npm run registry:build` and inspect item dependencies,
  generated imports, and the catalog.
- For layout changes, run the existing responsive audit against the actual
  preview URL, for example
  `node scripts/audit-responsive.mjs --url http://127.0.0.1:5174 --widths 390,768`.
- For documentation-only changes, confirm commands, exports, links, and public
  file responses; no full application suite is necessary. An HTTP 200 containing
  the SPA fallback is not proof that a Markdown or text endpoint exists.

Vite serves files in `public/` and copies them into its production output. The
Pages workflow uploads `public/` directly after rebuilding the registry; it does
not build the React showcase. Keep public guide/index links relative so they
work at the Vercel root, the Pages `/graphite/` path, and local preview origins.
Human-facing navigation uses the showcase's `/docs` route. Preserve the raw guide
and `llms.txt` for agents, and resolve their relative resource links against the
guide's public location when rendering it inside the app. Changes are not
published until a deployment runs.

Preserve unrelated user changes. Do not commit, push, or change branches unless
the user requests it.
