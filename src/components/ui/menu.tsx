import {
  Menu as HUIMenu,
  MenuButton as HUIMenuButton,
  MenuItem as HUIMenuItem,
  MenuItems as HUIMenuItems,
  type MenuButtonProps,
  type MenuItemsProps,
  type MenuItemProps,
} from '@headlessui/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export const Menu = HUIMenu

export function MenuButton({
  className,
  ...props
}: Omit<MenuButtonProps, 'className'> & { className?: string }) {
  return (
    <HUIMenuButton
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold text-gray-900 shadow-inner shadow-black/5',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-900',
        'data-hover:bg-gray-200 data-open:bg-gray-200',
        'dark:bg-gray-800 dark:text-white dark:shadow-white/10 dark:data-focus:outline-white dark:data-hover:bg-gray-700 dark:data-open:bg-gray-700',
        className,
      )}
    />
  )
}

type MenuItemsLocalProps = Omit<ComponentProps<typeof HUIMenuItems>, 'className'> & {
  className?: string
}

export function MenuItems({ className, ...props }: MenuItemsLocalProps) {
  return (
    <HUIMenuItems
      {...(props as MenuItemsProps)}
      transition
      className={cn(
        'origin-top-right rounded-xl border border-gray-200 bg-white p-1 text-sm/6 text-gray-900 shadow-lg',
        'transition duration-100 ease-out [--anchor-gap:--spacing(1)]',
        'focus:outline-none data-closed:scale-95 data-closed:opacity-0',
        'dark:border-white/5 dark:bg-white/5 dark:text-white dark:shadow-none dark:backdrop-blur',
        className,
      )}
    />
  )
}

export function MenuItem({
  className,
  ...props
}: Omit<MenuItemProps<'button'>, 'className'> & { className?: string }) {
  return (
    <HUIMenuItem
      {...props}
      as="button"
      className={cn(
        'group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left',
        'data-focus:bg-gray-100 dark:data-focus:bg-white/10',
        className,
      )}
    />
  )
}
