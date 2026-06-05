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
        'inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-secondary-foreground shadow-inner shadow-black/5',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
        'data-hover:bg-secondary/70 data-open:bg-secondary/70',
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
        'origin-top-right rounded-xl border bg-popover p-1 text-sm/6 text-popover-foreground shadow-lg',
        'transition duration-100 ease-out [--anchor-gap:--spacing(1)]',
        'focus:outline-none data-closed:scale-95 data-closed:opacity-0',
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
        'data-focus:bg-accent data-focus:text-accent-foreground',
        className,
      )}
    />
  )
}
