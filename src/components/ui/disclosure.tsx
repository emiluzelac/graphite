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
        'group flex w-full items-center justify-between text-left text-sm/6 font-medium text-gray-900',
        'focus:outline-none data-focus:outline data-focus:outline-gray-900',
        'dark:text-white dark:data-focus:outline-white',
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
      className={cn('mt-2 text-sm/5 text-gray-600 dark:text-white/50', className)}
    />
  )
}
