import {
  Combobox as HUICombobox,
  ComboboxInput as HUIComboboxInput,
  ComboboxButton as HUIComboboxButton,
  ComboboxOptions as HUIComboboxOptions,
  ComboboxOption as HUIComboboxOption,
  type ComboboxProps,
  type ComboboxInputProps,
  type ComboboxOptionsProps,
  type ComboboxOptionProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { composeClass } from '@/lib/cn'
import { AltArrowDownLinear, CheckCircleLinear } from '@emiluzelac/icona'

export function Combobox<T, M extends boolean | undefined = false>(
  props: ComboboxProps<T, M, 'div'>,
) {
  return <HUICombobox {...(props as ComboboxProps<T, M, 'div'>)} />
}

export function ComboboxInput<T>({ className, ...props }: ComboboxInputProps<'input', T>) {
  return (
    <div className="relative">
      <HUIComboboxInput
        {...(props as ComboboxInputProps<'input', T>)}
        className={composeClass(
          [
            'w-full rounded-lg glass-flat py-1.5 pr-10 pl-3 text-sm/6 text-foreground placeholder:text-muted-foreground',
            'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-ring data-hover:border-foreground/25',
          ].join(' '),
          className,
        )}
      />
      <HUIComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
        <AltArrowDownLinear className="size-4 text-muted-foreground group-data-hover:text-foreground" />
      </HUIComboboxButton>
    </div>
  )
}

export function ComboboxOptions({ className, ...props }: ComboboxOptionsProps<'ul'>) {
  return (
    <HUIComboboxOptions
      anchor="bottom"
      transition
      {...(props as ComboboxOptionsProps<'ul'>)}
      className={composeClass(
        [
          'z-10 w-(--input-width) rounded-xl glass p-1 text-sm/6 text-foreground [--anchor-gap:--spacing(1)]',
          'transition duration-100 ease-in data-closed:scale-95 data-closed:opacity-0 data-leave:duration-75',
          'empty:invisible [&]:focus:outline-none',
        ].join(' '),
        className,
      )}
    />
  )
}

type COProps<T> = Omit<ComboboxOptionProps<'li', T>, 'children'> & { children?: ReactNode }

export function ComboboxOption<T>({ className, children, ...props }: COProps<T>) {
  return (
    <HUIComboboxOption
      {...(props as ComboboxOptionProps<'li', T>)}
      className={composeClass(
        [
          'group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none',
          'text-foreground data-focus:bg-foreground/10',
        ].join(' '),
        className,
      )}
    >
      <CheckCircleLinear className="invisible size-4 text-primary group-data-selected:visible" />
      <span className="flex-1">{children as ReactNode}</span>
    </HUIComboboxOption>
  )
}
