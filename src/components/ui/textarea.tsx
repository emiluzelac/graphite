import { Textarea as HUITextarea, type TextareaProps as HUITextareaProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

export interface TextareaProps extends Omit<HUITextareaProps, 'className'> {
  className?: string
}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <HUITextarea
      {...props}
      className={cn(
        'block w-full resize-none rounded-lg border border-input bg-card px-3 py-1.5 text-sm/6 text-foreground placeholder:text-muted-foreground',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
        'data-invalid:border-destructive',
        className,
      )}
    />
  )
}
