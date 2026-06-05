import {
  RadioGroup as HUIRadioGroup,
  Radio as HUIRadio,
  type RadioGroupProps,
  type RadioProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'
import { CheckCircleBold } from 'icona'

type RGProps<T> = Omit<RadioGroupProps<'div', T>, 'className'> & { className?: string }

export function RadioGroup<T>({ className, ...props }: RGProps<T>) {
  return (
    <HUIRadioGroup
      {...(props as RadioGroupProps<'div', T>)}
      className={cn('space-y-2', className)}
    />
  )
}

type RProps<T> = Omit<RadioProps<'span', T>, 'className'> & { className?: string }

export function Radio<T>({ className, ...props }: RProps<T>) {
  return (
    <HUIRadio
      {...(props as RadioProps<'span', T>)}
      className={cn(
        'group flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white',
        'data-checked:border-sky-600 data-checked:bg-sky-600',
        'dark:border-white/30 dark:bg-white/5 dark:data-checked:border-sky-400 dark:data-checked:bg-sky-400',
        className,
      )}
    >
      <CheckCircleBold className="invisible size-5 text-white group-data-checked:visible" />
    </HUIRadio>
  )
}
