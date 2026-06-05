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
        'group inline-flex items-center gap-1 font-medium text-muted-foreground focus:outline-none',
        'data-focus:text-foreground data-hover:text-foreground',
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
        'origin-top divide-y divide-border rounded-xl border bg-popover p-2 text-sm/6 text-popover-foreground shadow-xl',
        'transition duration-150 ease-out [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:opacity-0',
        className,
      )}
    />
  )
}
