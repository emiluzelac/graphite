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
        'block w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm/6 text-gray-900',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-900',
        'data-invalid:border-red-500',
        'dark:border-transparent dark:bg-white/5 dark:text-white dark:data-focus:outline-white',
        className,
      )}
    />
  )
}
