import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/ui/menu'
import { MonitorLinear, MoonLinear, SunLinear } from 'icona'
import { cn } from '@/lib/cn'
import { useTheme, type Theme } from '@/theme-context'

const options: { value: Theme; label: string; Icon: typeof SunLinear }[] = [
  { value: 'light', label: 'Light', Icon: SunLinear },
  { value: 'dark', label: 'Dark', Icon: MoonLinear },
  { value: 'system', label: 'System', Icon: MonitorLinear },
]

export function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme()
  const Current = resolved === 'dark' ? MoonLinear : SunLinear

  return (
    <Menu>
      <MenuButton
        aria-label="Toggle theme"
        className="size-9 justify-center !p-0"
      >
        <Current className="size-4" />
      </MenuButton>
      <MenuItems anchor="bottom end" className="w-40">
        {options.map(({ value, label, Icon }) => (
          <MenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn(theme === value && 'font-semibold text-sky-600 dark:text-sky-400')}
          >
            <Icon className="size-4" />
            {label}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
