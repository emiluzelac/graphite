import {
  Disclosure as HUIDisclosure,
  DisclosureButton as HUIDisclosureButton,
  DisclosurePanel as HUIDisclosurePanel,
  type DisclosureButtonProps,
  type DisclosurePanelProps,
} from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export const Disclosure = HUIDisclosure

export function DisclosureButton({ className, ...props }: DisclosureButtonProps) {
  return (
    <HUIDisclosureButton
      {...props}
      className={composeClass(
        [
          'group flex w-full items-center justify-between text-left text-sm/6 font-medium text-foreground',
          'focus:outline-none data-focus:outline data-focus:outline-ring',
        ].join(' '),
        className,
      )}
    />
  )
}

export function DisclosurePanel({ className, ...props }: DisclosurePanelProps) {
  return (
    <HUIDisclosurePanel
      {...props}
      className={composeClass('mt-2 text-sm/5 text-muted-foreground', className)}
    />
  )
}
