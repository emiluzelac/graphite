import { Button as HUIButton, type ButtonProps as HUIButtonProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-sky-600 text-white shadow-inner shadow-white/10 data-hover:bg-sky-500 data-active:bg-sky-700 data-focus:outline-sky-700 dark:data-focus:outline-white',
  secondary:
    'bg-gray-900 text-white data-hover:bg-gray-700 data-focus:outline-gray-900 dark:bg-white/10 dark:data-hover:bg-white/20 dark:data-focus:outline-white',
  ghost:
    'text-gray-700 data-hover:bg-gray-100 data-hover:text-gray-900 data-focus:outline-gray-900 dark:text-white/80 dark:data-hover:bg-white/5 dark:data-hover:text-white dark:data-focus:outline-white',
}

export interface ButtonProps extends Omit<HUIButtonProps, 'className'> {
  className?: string
  variant?: Variant
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <HUIButton
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm/6 font-semibold transition',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-2',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        variants[variant],
        className,
      )}
    />
  )
}
