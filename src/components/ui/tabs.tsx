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
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export const TabGroup = HUITabGroup

export function TabList({
  className,
  ...props
}: Omit<TabListProps, 'className'> & { className?: string }) {
  return <HUITabList {...props} className={cn('flex gap-4 rounded-xl bg-muted p-1', className)} />
}

export function Tab({
  className,
  ...props
}: Omit<ComponentProps<typeof HUITab>, 'className'> & { className?: string }) {
  return (
    <HUITab
      {...(props as TabProps)}
      className={cn(
        'rounded-full px-3 py-1 text-sm/6 font-semibold text-muted-foreground',
        'focus:outline-none data-focus:outline data-focus:outline-ring',
        'data-hover:bg-accent data-hover:text-accent-foreground',
        'data-selected:bg-primary data-selected:text-primary-foreground data-selected:data-hover:bg-primary',
        className,
      )}
    />
  )
}

export function TabPanels({
  className,
  ...props
}: Omit<TabPanelsProps, 'className'> & { className?: string }) {
  return <HUITabPanels {...props} className={cn('mt-3', className)} />
}

export function TabPanel({
  className,
  ...props
}: Omit<TabPanelProps, 'className'> & { className?: string }) {
  return <HUITabPanel {...props} className={cn('rounded-xl bg-muted p-3', className)} />
}
