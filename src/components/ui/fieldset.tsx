import {
  Fieldset as HUIFieldset,
  Legend as HUILegend,
  type FieldsetProps as HUIFieldsetProps,
  type LegendProps as HUILegendProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'

export function Fieldset({
  className,
  ...props
}: Omit<HUIFieldsetProps, 'className'> & { className?: string }) {
  return (
    <HUIFieldset
      {...props}
      className={cn('space-y-6 rounded-xl bg-gray-100 p-6 dark:bg-white/5', className)}
    />
  )
}

export function Legend({
  className,
  ...props
}: Omit<HUILegendProps, 'className'> & { className?: string }) {
  return (
    <HUILegend
      {...props}
      className={cn('text-base/7 font-semibold text-gray-900 dark:text-white', className)}
    />
  )
}
