import { Input as HUIInput, type InputProps as HUIInputProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

export interface InputProps extends Omit<HUIInputProps, 'className'> {
  className?: string
}

export function Input({ className, ...props }: InputProps) {
  return (
    <HUIInput
      {...props}
      className={cn(
        'block w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm/6 text-gray-900',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-900',
        'data-invalid:border-red-500 data-invalid:data-focus:outline-red-500',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        'dark:border-transparent dark:bg-white/5 dark:text-white dark:data-focus:outline-white',
        className,
      )}
    />
  )
}
