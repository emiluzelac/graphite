import { Checkbox as HUICheckbox, type CheckboxProps as HUICheckboxProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

export interface CheckboxProps extends Omit<HUICheckboxProps, 'className'> {
  className?: string
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <HUICheckbox
      {...props}
      className={cn(
        'group block size-5 shrink-0 rounded border bg-gray-100 ring-1 ring-gray-300 transition ring-inset',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-900',
        'data-checked:border-transparent data-checked:bg-sky-600 data-checked:ring-sky-600',
        'dark:bg-white/10 dark:ring-white/15 dark:data-checked:bg-sky-500 dark:data-checked:ring-sky-500 dark:data-focus:outline-white',
        className,
      )}
    >
      <svg
        className="hidden size-4 stroke-white group-data-checked:block"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </HUICheckbox>
  )
}
