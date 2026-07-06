import {
  Menu as HUIMenu,
  MenuButton as HUIMenuButton,
  MenuItem as HUIMenuItem,
  MenuItems as HUIMenuItems,
  MenuSeparator as HUIMenuSeparator,
  MenuSection as HUIMenuSection,
  MenuHeading as HUIMenuHeading,
  type MenuButtonProps,
  type MenuItemsProps,
  type MenuItemProps,
  type MenuSeparatorProps,
  type MenuSectionProps,
  type MenuHeadingProps,
} from '@headlessui/react'
import type { ElementType } from 'react'
import { composeClass } from '@/lib/cn'

export const Menu = HUIMenu

export function MenuButton({ className, ...props }: MenuButtonProps) {
  return (
    <HUIMenuButton
      {...props}
      className={composeClass(
        [
          'inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm/6 font-semibold text-secondary-foreground shadow-inner shadow-black/5',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
          'data-hover:bg-secondary/70 data-open:bg-secondary/70',
        ].join(' '),
        className,
      )}
    />
  )
}

export function MenuItems({ className, ...props }: MenuItemsProps) {
  return (
    <HUIMenuItems
      anchor="bottom end"
      transition
      {...props}
      className={composeClass(
        [
          'origin-top-right rounded-xl glass p-1 text-sm/6 text-foreground',
          'transition duration-100 ease-out [--anchor-gap:--spacing(1)]',
          'focus:outline-none data-closed:scale-95 data-closed:opacity-0',
        ].join(' '),
        className,
      )}
    />
  )
}

export function MenuItem<T extends ElementType = 'button'>(props: MenuItemProps<T>) {
  const { className, ...rest } = props as MenuItemProps<'button'>
  return (
    <HUIMenuItem
      as="button"
      {...rest}
      className={composeClass(
        [
          'group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left',
          'data-focus:bg-foreground/10',
        ].join(' '),
        className,
      )}
    />
  )
}

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return <HUIMenuSeparator {...props} className={composeClass('my-1 h-px bg-border', className)} />
}

export function MenuSection({ className, ...props }: MenuSectionProps) {
  return <HUIMenuSection {...props} className={composeClass('', className)} />
}

export function MenuHeading({ className, ...props }: MenuHeadingProps) {
  return (
    <HUIMenuHeading
      {...props}
      className={composeClass(
        'px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground',
        className,
      )}
    />
  )
}
