import { Select as HUISelect, type SelectProps as HUISelectProps } from '@headlessui/react'
import { AltArrowDownLinear } from 'icona'
import { cn } from '@/lib/cn'

export interface SelectProps extends Omit<HUISelectProps, 'className'> {
  className?: string
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <HUISelect
        {...props}
        className={cn(
          'block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-1.5 pr-9 text-sm/6 text-gray-900',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-gray-900',
          'dark:border-transparent dark:bg-white/5 dark:text-white dark:*:text-black dark:data-focus:outline-white',
          className,
        )}
      >
        {children}
      </HUISelect>
      <AltArrowDownLinear
        className="pointer-events-none absolute top-2.5 right-2.5 size-4 text-gray-500 dark:text-white/60"
        aria-hidden="true"
      />
    </div>
  )
}
