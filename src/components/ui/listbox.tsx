import {
  Listbox as HUIListbox,
  ListboxButton as HUIListboxButton,
  ListboxOptions as HUIListboxOptions,
  ListboxOption as HUIListboxOption,
  type ListboxProps,
  type ListboxButtonProps,
  type ListboxOptionsProps,
  type ListboxOptionProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { composeClass } from '@/lib/cn'
import { CheckCircleLinear, SortVerticalLinear } from '@emiluzelac/icona'

export function Listbox<T>(props: ListboxProps<'div', T>) {
  return <HUIListbox {...(props as ListboxProps<'div', T>)} />
}

export function ListboxButton({ className, children, ...props }: ListboxButtonProps<'button'>) {
  return (
    <HUIListboxButton
      {...(props as ListboxButtonProps<'button'>)}
      className={composeClass(
        [
          'relative w-full cursor-default rounded-lg bg-card py-1.5 pr-10 pl-3 text-left text-sm/6',
          'border border-input text-foreground',
          'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-ring data-hover:border-ring',
        ].join(' '),
        className,
      )}
    >
      {children as ReactNode}
      <SortVerticalLinear className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
    </HUIListboxButton>
  )
}

export function ListboxOptions({ className, ...props }: ListboxOptionsProps<'ul'>) {
  return (
    <HUIListboxOptions
      anchor="bottom"
      transition
      {...(props as ListboxOptionsProps<'ul'>)}
      className={composeClass(
        [
          'z-10 w-(--button-width) rounded-xl border bg-popover p-1 text-sm/6 text-popover-foreground shadow-lg [--anchor-gap:--spacing(1)]',
          'transition duration-100 ease-in data-closed:scale-95 data-closed:opacity-0 data-leave:duration-75',
          '[&]:focus:outline-none',
        ].join(' '),
        className,
      )}
    />
  )
}

export function ListboxOption<T>({ className, children, ...props }: ListboxOptionProps<'li', T>) {
  return (
    <HUIListboxOption
      {...(props as ListboxOptionProps<'li', T>)}
      className={composeClass(
        [
          'group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none',
          'text-popover-foreground data-focus:bg-accent data-focus:text-accent-foreground',
        ].join(' '),
        className,
      )}
    >
      <CheckCircleLinear className="invisible size-4 text-primary group-data-selected:visible" />
      <span className="flex-1">{children as ReactNode}</span>
    </HUIListboxOption>
  )
}
