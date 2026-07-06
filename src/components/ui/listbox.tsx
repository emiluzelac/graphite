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
import { SortVerticalLinear, UnreadLinear } from '@emiluzelac/icona'

export function Listbox<T>(props: ListboxProps<'div', T>) {
  return <HUIListbox {...(props as ListboxProps<'div', T>)} />
}

type LBProps = Omit<ListboxButtonProps<'button'>, 'children'> & { children?: ReactNode }

export function ListboxButton({ className, children, ...props }: LBProps) {
  return (
    <HUIListboxButton
      {...(props as ListboxButtonProps<'button'>)}
      className={composeClass(
        [
          'relative w-full cursor-pointer rounded-lg glass-flat py-1.5 pr-10 pl-3 text-left text-sm/6 text-foreground',
          'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-ring data-hover:border-foreground/25',
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
          'z-50 w-(--button-width) rounded-xl glass p-1 text-sm/6 text-foreground [--anchor-gap:--spacing(1)]',
          'transition duration-100 ease-in data-closed:scale-95 data-closed:opacity-0 data-leave:duration-75',
          '[&]:focus:outline-none',
        ].join(' '),
        className,
      )}
    />
  )
}

type LOProps<T> = Omit<ListboxOptionProps<'li', T>, 'children'> & { children?: ReactNode }

export function ListboxOption<T>({ className, children, ...props }: LOProps<T>) {
  return (
    <HUIListboxOption
      {...(props as ListboxOptionProps<'li', T>)}
      className={composeClass(
        [
          'group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 select-none',
          'text-foreground data-focus:bg-foreground/10',
        ].join(' '),
        className,
      )}
    >
      <UnreadLinear className="invisible size-4 text-primary group-data-selected:visible" />
      <span className="flex-1">{children as ReactNode}</span>
    </HUIListboxOption>
  )
}
