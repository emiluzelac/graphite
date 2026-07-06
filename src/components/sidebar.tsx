import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'
import { ThemeToggle } from '@/components/theme-toggle'

const components = [
  { to: '/react/data-list', label: 'Data List' },
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

function Section({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  'block py-1 text-sm transition',
                  isActive
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-svh w-72 shrink-0 overflow-y-auto border-r bg-(--glass-surface) px-6 py-8 backdrop-blur-xl lg:block">
      <div className="mb-10 flex items-start justify-between">
        <NavLink to="/" className="block">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-primary/60 to-primary" />
            <span className="text-lg font-semibold text-foreground">Graphite</span>
          </div>
          <span className="mt-1 block text-xs text-muted-foreground">
            Headless UI · Tailwind v4
          </span>
        </NavLink>
        <ThemeToggle />
      </div>
      <Section title="Components" items={components} />
      <Section title="Forms" items={forms} />
      <Section title="Examples" items={examples} />
    </aside>
  )
}
