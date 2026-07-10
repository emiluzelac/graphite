# Graphite

Ink-dark components under frosted glass. A component library built on [Headless UI](https://headlessui.com/react) with its own OKLCH design tokens ("Graphite" — custom neutral ramp, hue 295) and a translucent glass material (`glass` / `glass-flat` over an ambient backdrop), distributed as a shadcn-format registry. The showcase app gives every component a styled preview and its source on Preview / Code tabs.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@headlessui/react` v2
- `@emiluzelac/icona` (Solar-based icon library; local `file:` link to `../icons/icona`)
- `react-router`

## Getting started

Install Node.js 18+ (e.g. from [nodejs.org](https://nodejs.org/)), then:

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

### Responsive audit

With the app running, check every route for horizontal overflow at mobile/tablet widths
(crawls the homepage links, so new pages are picked up automatically; exits non-zero on
failure, so it can gate CI):

```bash
npm run audit:responsive                  # 390px + 768px against localhost:5173
node scripts/audit-responsive.mjs --url http://localhost:4173 --widths 320,390,768
```

## Components covered

**Components:** Dropdown Menu, Disclosure, Dialog, Popover, Tabs, Transition

**Forms:** Button, Checkbox, Combobox, Fieldset, Input, Listbox, Radio Group, Select, Switch, Textarea

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

Consume from another app by adding the namespace to its `components.json`:

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
  Component adds will never touch your CSS variables.

> **Note:** components that use icons depend on `@emiluzelac/icona` (npmjs). This app links it locally via `file:../icons/icona`; external registry consumers install the published package.
