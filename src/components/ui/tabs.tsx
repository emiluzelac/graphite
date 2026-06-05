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
  return (
    <HUITabList
      {...props}
      className={cn('flex gap-4 rounded-xl bg-gray-100 p-1 dark:bg-white/5', className)}
    />
  )
}

export function Tab({
  className,
  ...props
}: Omit<ComponentProps<typeof HUITab>, 'className'> & { className?: string }) {
  return (
    <HUITab
      {...(props as TabProps)}
      className={cn(
        'rounded-full px-3 py-1 text-sm/6 font-semibold text-gray-700',
        'focus:outline-none data-focus:outline data-focus:outline-gray-900',
        'data-hover:bg-gray-200',
        'data-selected:bg-gray-900 data-selected:text-white data-selected:data-hover:bg-gray-900',
        'dark:text-white dark:data-focus:outline-white dark:data-hover:bg-white/5',
        'dark:data-selected:bg-white/10 dark:data-selected:text-white dark:data-selected:data-hover:bg-white/10',
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
  return (
    <HUITabPanel
      {...props}
      className={cn('rounded-xl bg-gray-100 p-3 dark:bg-white/5', className)}
    />
  )
}
