import { Switch as HUISwitch, type SwitchProps as HUISwitchProps } from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export type SwitchProps = HUISwitchProps

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <HUISwitch
      {...props}
      className={composeClass(
        [
          'group relative flex h-7 w-14 shrink-0 cursor-pointer rounded-full bg-input p-1 transition-colors duration-200 ease-in-out',
          'focus:not-data-focus:outline-none data-focus:outline-1 data-focus:outline-ring',
          'data-checked:bg-primary',
        ].join(' '),
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-foreground shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7 group-data-checked:bg-primary-foreground"
      />
    </HUISwitch>
  )
}
