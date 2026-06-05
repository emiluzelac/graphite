import {
  Field as HUIField,
  Label as HUILabel,
  Description as HUIDescription,
  type FieldProps as HUIFieldProps,
  type LabelProps as HUILabelProps,
  type DescriptionProps as HUIDescriptionProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'

export function Field({
  className,
  ...props
}: Omit<HUIFieldProps, 'className'> & { className?: string }) {
  return <HUIField {...props} className={cn('space-y-1', className)} />
}

export function Label({
  className,
  ...props
}: Omit<HUILabelProps, 'className'> & { className?: string }) {
  return <HUILabel {...props} className={cn('text-sm/6 font-medium text-foreground', className)} />
}

export function Description({
  className,
  ...props
}: Omit<HUIDescriptionProps, 'className'> & { className?: string }) {
  return <HUIDescription {...props} className={cn('text-sm/6 text-muted-foreground', className)} />
}
