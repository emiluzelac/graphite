import {
  RadioGroup as HUIRadioGroup,
  Radio as HUIRadio,
  type RadioGroupProps,
  type RadioProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { composeClass } from '@/lib/cn'

export function RadioGroup<T>({ className, ...props }: RadioGroupProps<'div', T>) {
  return (
    <HUIRadioGroup
      {...(props as RadioGroupProps<'div', T>)}
      className={composeClass('space-y-2', className)}
    />
  )
}

type RProps<T> = Omit<RadioProps<'span', T>, 'children'> & { children?: ReactNode }

export function Radio<T>({ className, children, ...props }: RProps<T>) {
  return (
    <HUIRadio
      {...(props as RadioProps<'span', T>)}
      className={composeClass(
        [
          'group relative flex cursor-pointer rounded-lg glass-flat px-5 py-4 transition',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
          'data-checked:bg-foreground/10',
        ].join(' '),
        className,
      )}
    >
      {children as ReactNode}
    </HUIRadio>
  )
}
