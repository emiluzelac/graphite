import {
  Popover as HUIPopover,
  PopoverBackdrop as HUIPopoverBackdrop,
  PopoverButton as HUIPopoverButton,
  PopoverGroup as HUIPopoverGroup,
  PopoverPanel as HUIPopoverPanel,
  type PopoverBackdropProps,
  type PopoverButtonProps,
  type PopoverPanelProps,
} from '@headlessui/react'
import { composeClass } from '@/lib/cn'

// Re-exported so panel content can close the popover it lives in.
export { useClose } from '@headlessui/react'

export const Popover = HUIPopover
export const PopoverGroup = HUIPopoverGroup

export function PopoverBackdrop({ className, ...props }: PopoverBackdropProps) {
  return (
    <HUIPopoverBackdrop
      transition
      {...props}
      className={composeClass(
        'fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-200 ease-out data-closed:opacity-0',
        className,
      )}
    />
  )
}

export function PopoverButton({ className, ...props }: PopoverButtonProps) {
  return (
    <HUIPopoverButton
      {...props}
      className={composeClass(
        [
          'group inline-flex items-center gap-1 font-medium text-muted-foreground focus:outline-none',
          'data-focus:text-foreground data-hover:text-foreground',
        ].join(' '),
        className,
      )}
    />
  )
}

export function PopoverPanel({ className, ...props }: PopoverPanelProps) {
  return (
    <HUIPopoverPanel
      anchor="bottom"
      transition
      {...props}
      className={composeClass(
        [
          'origin-top divide-y divide-foreground/10 rounded-xl glass p-2 text-sm/6 text-foreground',
          'transition duration-150 ease-out [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:opacity-0',
        ].join(' '),
        className,
      )}
    />
  )
}
