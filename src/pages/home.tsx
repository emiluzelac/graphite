import { Link } from 'react-router'

const components = [
  { to: '/react/menu', label: 'Dropdown Menu' },
  { to: '/react/disclosure', label: 'Disclosure' },
  { to: '/react/dialog', label: 'Dialog' },
  { to: '/react/popover', label: 'Popover' },
  { to: '/react/tabs', label: 'Tabs' },
  { to: '/react/transition', label: 'Transition' },
]

const forms = [
  { to: '/react/button', label: 'Button' },
  { to: '/react/checkbox', label: 'Checkbox' },
  { to: '/react/combobox', label: 'Combobox' },
  { to: '/react/fieldset', label: 'Fieldset' },
  { to: '/react/input', label: 'Input' },
  { to: '/react/listbox', label: 'Listbox' },
  { to: '/react/radio-group', label: 'Radio Group' },
  { to: '/react/select', label: 'Select' },
  { to: '/react/switch', label: 'Switch' },
  { to: '/react/textarea', label: 'Textarea' },
]

const examples = [{ to: '/signup', label: 'Signup form' }]

function Grid({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-xl border bg-card px-4 py-6 text-center text-sm font-medium text-muted-foreground transition hover:border-ring hover:bg-accent hover:text-accent-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        Completely unstyled, fully accessible UI components.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        A local clone of the Headless UI documentation showcase, with a styled preview and source
        code for every component.
      </p>
      <Grid title="Components" items={components} />
      <Grid title="Forms" items={forms} />
      <Grid title="Examples" items={examples} />
    </div>
  )
}
