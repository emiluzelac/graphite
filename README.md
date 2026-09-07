# Graphite

Ink-dark components under frosted glass. A component library built on [Headless UI](https://headlessui.com/react) with its own OKLCH design tokens ("Graphite" — custom neutral ramp, hue 295) and a translucent glass material (`glass` / `glass-flat` over an ambient backdrop), distributed as a shadcn-format registry. The showcase app gives every component a styled preview and its source on Preview / Code tabs.

## Agent and integration documentation

- [Using Graphite](public/using-graphite.md) is the canonical guide for adding
  components to another app: setup, theme preservation, composition, and accessibility.
- [llms.txt](public/llms.txt) is the agent entry point, linking to the guide and
  machine-readable component references.
- [AGENTS.md](AGENTS.md) contains instructions for maintaining this repository.

The showcase renders the same guide as a readable documentation page at `/docs`.
The homepage and documentation sidebar link there; the Markdown content remains
the single source for both the page and agent access.

The guide and index are static public assets, available at `/using-graphite.md`
and `/llms.txt` on the local preview and Vercel deployments. The existing Pages
workflow publishes them under `/graphite/` alongside the registry. Point agents
in consuming projects to the integration guide; this repo's `AGENTS.md` does not
automatically apply to installed components.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@headlessui/react` v2
- `@emiluzelac/icona` (published Solar-based icon library)
- `react-router`

## Getting started

Install Node.js 22.12+ (e.g. from [nodejs.org](https://nodejs.org/); CI uses Node 22),
then use the committed npm lockfile:

```bash
npm ci
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

New visits start in light mode. Explicit Light, Dark, and System selections are
remembered across reloads; System follows the operating system's appearance.

### Responsive audit

With the app running, check every route for horizontal overflow at mobile/tablet widths
(crawls the homepage links, so new pages are picked up automatically; exits non-zero on
failure, so it can gate CI):

```bash
npm run audit:responsive                  # 390px + 768px against localhost:5173
node scripts/audit-responsive.mjs --url http://localhost:4173 --widths 320,390,768
```

## Components covered

**Components:** Data List, Dropdown Menu, Disclosure, Dialog, Popover, Separator, Tabs

**Forms:** Button, Checkbox, Combobox, Field, Fieldset, Input, Listbox, Radio Group, Select, Switch, Textarea

The showcase also includes Transition and signup-form examples; these are not
registry items. The theme and ambient backdrop are separate, explicit opt-ins.

## Project structure

```
src/
  App.tsx                  # routes
  main.tsx                 # entry
  index.css                # Tailwind import
  theme.tsx                # light/dark/system theme provider
  components/
    layout.tsx             # sidebar + content shell
    sidebar.tsx            # nav list
    preview-code.tsx       # tabbed Preview/Code container
    ui/                    # styled Headless UI wrappers (one file per component)
  pages/
    home.tsx               # component grid
    *.tsx                  # one demo page per component
```

Each page exports a styled preview component and a matching `code` string passed to `PreviewCode`.

## Component registry

The `ui/` components are distributed as a custom [shadcn-format registry](https://ui.shadcn.com/docs/registry) — the shadcn CLI is only the delivery mechanism; every component is built on Headless UI.

Build the registry JSON (output in `public/r/`, served by Vite and any static host):

```bash
npm run registry:build
```

For prerequisites and safe setup in another app, follow
[Using Graphite](public/using-graphite.md). Add the namespace to its existing
`components.json`:

```json
{
  "registries": {
    "@graphite": "https://emiluzelac.github.io/graphite/r/{name}.json"
  }
}
```

The registry is rebuilt and deployed to GitHub Pages automatically on every push to `main` (`.github/workflows/registry.yml`).

then:

```bash
npx shadcn add @graphite/button
```

This copies `button.tsx` (plus the `cn` util) into the consuming app and installs its npm dependencies.

### Theme

Components do not pull the theme in automatically. Two paths:

- **Fresh app:** install the Graphite tokens once — `npx shadcn add @graphite/theme` —
  then add components freely.
- **App with its own tokens:** skip `@graphite/theme` entirely. Map the utility slots
  to your tokens in your `@theme` block (`--color-primary: var(--your-primary)` …)
  and provide `glass` / `glass-flat` utilities backed by your surface tokens.

Ordinary controls do not install the theme or replace color variables. The opt-in
`theme` item intentionally adds theme CSS; the optional `backdrop` item adds its
own gradient variables.

Icon-using registry items declare the published `@emiluzelac/icona` dependency.
No local icon-library checkout is required.
