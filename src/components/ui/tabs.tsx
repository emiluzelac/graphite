import {
  TabGroup as HUITabGroup,
  TabList as HUITabList,
  Tab as HUITab,
  TabPanels as HUITabPanels,
  TabPanel as HUITabPanel,
  type TabProps,
  type TabListProps,
  type TabPanelProps,
  type TabPanelsProps,
} from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export const TabGroup = HUITabGroup

export function TabList({ className, ...props }: TabListProps) {
  return (
    <HUITabList
      {...props}
      className={composeClass('flex gap-4 rounded-full glass-flat p-1', className)}
    />
  )
}

export function Tab({ className, ...props }: TabProps) {
  return (
    <HUITab
      {...props}
      className={composeClass(
        [
          'cursor-pointer rounded-full px-3 py-1 text-sm/6 font-semibold text-muted-foreground',
          'focus:outline-none data-focus:outline data-focus:outline-ring',
          'data-hover:bg-foreground/5 data-hover:text-foreground',
          'data-selected:bg-primary data-selected:text-primary-foreground data-selected:data-hover:bg-primary',
        ].join(' '),
        className,
      )}
    />
  )
}

export function TabPanels({ className, ...props }: TabPanelsProps) {
  return <HUITabPanels {...props} className={composeClass('mt-3', className)} />
}

export function TabPanel({ className, ...props }: TabPanelProps) {
  return <HUITabPanel {...props} className={composeClass('rounded-xl bg-muted p-3', className)} />
}
