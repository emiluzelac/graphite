# Headless UI — Local Clone

A local clone of the [headlessui.com](https://headlessui.com/react) showcase. Each component has a styled preview and the matching source on Preview / Code tabs.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@headlessui/react` v2
- `icona` (local icon library, `../icons/icona`)
- `react-router`

## Getting started

Install Node.js 18+ (e.g. from [nodejs.org](https://nodejs.org/)), then:

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

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
    "@graphite": "http://localhost:5176/r/{name}.json"
  }
}
```

then:

```bash
npx shadcn add @graphite/button
```

This copies `button.tsx` (plus the `cn` util and Graphite theme variables) into the consuming app and installs its npm dependencies.

> **Note:** components that use icons depend on `icona`, which currently resolves via a local `file:` link. Until icona is published to a registry consumers can reach, `shadcn add` for those components (`combobox`, `listbox`, `select`) will fail to install that dependency in external apps.
