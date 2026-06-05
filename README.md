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
