import { Textarea as HUITextarea, type TextareaProps as HUITextareaProps } from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export type TextareaProps = HUITextareaProps

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <HUITextarea
      {...props}
      className={composeClass(
        [
          'block w-full resize-none rounded-lg glass-flat px-3 py-1.5 text-sm/6 text-foreground placeholder:text-muted-foreground',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
          'data-invalid:border-destructive',
        ].join(' '),
        className,
      )}
    />
  )
}
