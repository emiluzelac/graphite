import {
  Disclosure as HUIDisclosure,
  DisclosureButton as HUIDisclosureButton,
  DisclosurePanel as HUIDisclosurePanel,
  type DisclosureButtonProps,
  type DisclosurePanelProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'

export const Disclosure = HUIDisclosure

export function DisclosureButton({
  className,
  ...props
}: Omit<DisclosureButtonProps, 'className'> & { className?: string }) {
  return (
    <HUIDisclosureButton
      {...props}
      className={cn(
        'group flex w-full items-center justify-between text-left text-sm/6 font-medium text-foreground',
        'focus:outline-none data-focus:outline data-focus:outline-ring',
        className,
      )}
    />
  )
}

export function DisclosurePanel({
  className,
  ...props
}: Omit<DisclosurePanelProps, 'className'> & { className?: string }) {
  return (
    <HUIDisclosurePanel
      {...props}
      className={cn('mt-2 text-sm/5 text-muted-foreground', className)}
    />
  )
}
