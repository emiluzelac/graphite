import { Input as HUIInput, type InputProps as HUIInputProps } from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export type InputProps = HUIInputProps

export function Input({ className, ...props }: InputProps) {
  return (
    <HUIInput
      {...props}
      className={composeClass(
        [
          'block w-full rounded-lg border border-input bg-card px-3 py-1.5 text-sm/6 text-foreground placeholder:text-muted-foreground',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
          'data-invalid:border-destructive data-invalid:data-focus:outline-destructive',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
    />
  )
}
