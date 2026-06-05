import {
  Field as HUIField,
  Label as HUILabel,
  Description as HUIDescription,
  type FieldProps as HUIFieldProps,
  type LabelProps as HUILabelProps,
  type DescriptionProps as HUIDescriptionProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'

export function Field({ className, ...props }: Omit<HUIFieldProps, 'className'> & { className?: string }) {
  return <HUIField {...props} className={cn('space-y-1', className)} />
}

export function Label({ className, ...props }: Omit<HUILabelProps, 'className'> & { className?: string }) {
  return (
    <HUILabel
      {...props}
      className={cn('text-sm/6 font-medium text-gray-900 dark:text-white', className)}
    />
  )
}

export function Description({
  className,
  ...props
}: Omit<HUIDescriptionProps, 'className'> & { className?: string }) {
  return (
    <HUIDescription
      {...props}
      className={cn('text-sm/6 text-gray-500 dark:text-white/50', className)}
    />
  )
}
