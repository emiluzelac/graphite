import {
  Popover as HUIPopover,
  PopoverButton as HUIPopoverButton,
  PopoverGroup as HUIPopoverGroup,
  PopoverPanel as HUIPopoverPanel,
  type PopoverButtonProps,
  type PopoverPanelProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'

export const Popover = HUIPopover
export const PopoverGroup = HUIPopoverGroup

export function PopoverButton({
  className,
  ...props
}: Omit<PopoverButtonProps, 'className'> & { className?: string }) {
  return (
    <HUIPopoverButton
      {...props}
      className={cn(
        'group inline-flex items-center gap-1 font-medium text-gray-700 focus:outline-none',
        'data-focus:text-gray-900 dark:text-white/80 dark:data-focus:text-white',
        className,
      )}
    />
  )
}

export function PopoverPanel({
  className,
  ...props
}: Omit<PopoverPanelProps, 'className'> & { className?: string }) {
  return (
    <HUIPopoverPanel
      {...props}
      transition
      className={cn(
        'origin-top divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white p-2 text-sm/6 text-gray-900 shadow-xl',
        'transition duration-150 ease-out [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:opacity-0',
        'dark:divide-white/5 dark:border-white/10 dark:bg-gray-900 dark:text-white',
        className,
      )}
    />
  )
}
