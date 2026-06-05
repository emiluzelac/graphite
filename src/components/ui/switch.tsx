import { Switch as HUISwitch, type SwitchProps as HUISwitchProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

export interface SwitchProps extends Omit<HUISwitchProps, 'className'> {
  className?: string
}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <HUISwitch
      {...props}
      className={cn(
        'group relative flex h-7 w-14 shrink-0 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out',
        'focus:not-data-focus:outline-none data-focus:outline-1 data-focus:outline-gray-900',
        'data-checked:bg-sky-600',
        'dark:bg-white/10 dark:data-checked:bg-sky-500 dark:data-focus:outline-white',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </HUISwitch>
  )
}
