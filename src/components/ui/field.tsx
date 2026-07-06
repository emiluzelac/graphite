import {
  Field as HUIField,
  Label as HUILabel,
  Description as HUIDescription,
  type FieldProps as HUIFieldProps,
  type LabelProps as HUILabelProps,
  type DescriptionProps as HUIDescriptionProps,
} from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export function Field({ className, ...props }: HUIFieldProps) {
  return <HUIField {...props} className={composeClass('space-y-1', className)} />
}

export function Label({ className, ...props }: HUILabelProps) {
  return (
    <HUILabel
      {...props}
      className={composeClass('text-sm/6 font-medium text-foreground', className)}
    />
  )
}

export function Description({ className, ...props }: HUIDescriptionProps) {
  return (
    <HUIDescription
      {...props}
      className={composeClass('text-sm/6 text-muted-foreground', className)}
    />
  )
}
