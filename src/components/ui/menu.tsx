import {
  Menu as HUIMenu,
  MenuButton as HUIMenuButton,
  MenuItem as HUIMenuItem,
  MenuItems as HUIMenuItems,
  MenuSeparator as HUIMenuSeparator,
  type MenuButtonProps,
  type MenuItemsProps,
  type MenuItemProps,
  type MenuSeparatorProps,
} from '@headlessui/react'
import type { ComponentProps, ElementType } from 'react'
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
      anchor="bottom end"
      transition
      {...(props as MenuItemsProps)}
      className={cn(
        'origin-top-right rounded-xl border bg-popover p-1 text-sm/6 text-popover-foreground shadow-lg',
        'transition duration-100 ease-out [--anchor-gap:--spacing(1)]',
        'focus:outline-none data-closed:scale-95 data-closed:opacity-0',
        className,
      )}
    />
  )
}

type MenuItemLocalProps<T extends ElementType = 'button'> = Omit<MenuItemProps<T>, 'className'> & {
  className?: string
}

export function MenuItem<T extends ElementType = 'button'>({
  className,
  ...props
}: MenuItemLocalProps<T>) {
  return (
    <HUIMenuItem
      as="button"
      {...(props as MenuItemProps<'button'>)}
      className={cn(
        'group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left',
        'data-focus:bg-accent data-focus:text-accent-foreground',
        className,
      )}
    />
  )
}

export function MenuSeparator({
  className,
  ...props
}: Omit<MenuSeparatorProps, 'className'> & { className?: string }) {
  return <HUIMenuSeparator {...props} className={cn('my-1 h-px bg-border', className)} />
}
