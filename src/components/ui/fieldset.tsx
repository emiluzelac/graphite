import {
  Fieldset as HUIFieldset,
  Legend as HUILegend,
  type FieldsetProps as HUIFieldsetProps,
  type LegendProps as HUILegendProps,
} from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export function Fieldset({ className, ...props }: HUIFieldsetProps) {
  return (
    <HUIFieldset
      {...props}
      className={composeClass('space-y-6 rounded-xl glass-flat p-6', className)}
    />
  )
}

export function Legend({ className, ...props }: HUILegendProps) {
  return (
    <HUILegend
      {...props}
      className={composeClass('text-base/7 font-semibold text-foreground', className)}
    />
  )
}
