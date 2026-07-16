import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

/**
 * DataList — grid-aligned records that read like a table without using a
 * `<table>`. Built on CSS Grid + `subgrid`: the root sets the column template,
 * and every header/row inherits it via `grid-cols-subgrid` so columns line up.
 *
 * Why divs instead of `<table>`: full styling/responsive freedom, with ARIA
 * grid roles (`table`/`row`/`columnheader`/`cell`) supplying the semantics a
 * `<table>` would. Looks custom, reads as tabular data to assistive tech.
 *
 * Subgrid requires rows to be *direct* children of the root grid, so the DOM
 * is intentionally flat — no rowgroup wrappers (ARIA allows table > row).
 *
 * Borders name `border-border` explicitly rather than riding a bare `border`:
 * Tailwind v4 dropped v3's gray-200 default, so an unqualified border-width
 * resolves its color to `currentColor` — the hairline renders in the row's
 * ink color (near-black) instead of the border token. Preflight does not fix
 * this; consumers without Preflight have nothing else to fall back on.
 */

type Align = 'left' | 'right' | 'center'

const alignClass = (align: Align) =>
  align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : undefined

type DivProps = Omit<ComponentProps<'div'>, 'className'> & { className?: string }

export function DataList({ className, columns, style, ...props }: DivProps & { columns: string }) {
  return (
    <div
      role="table"
      {...props}
      style={{ gridTemplateColumns: columns, ...style }}
      className={cn('grid gap-x-4 overflow-hidden rounded-xl border border-border text-sm', className)}
    />
  )
}

export function DataListHeader({ className, ...props }: DivProps) {
  return (
    <div
      role="row"
      {...props}
      className={cn(
        'col-span-full grid grid-cols-subgrid border-b border-border bg-foreground/5 px-4 py-2.5',
        'text-xs font-medium tracking-wider text-muted-foreground uppercase',
        className,
      )}
    />
  )
}

export function DataListColumn({
  className,
  align = 'left',
  ...props
}: DivProps & { align?: Align }) {
  return <div role="columnheader" {...props} className={cn(alignClass(align), className)} />
}

export function DataListRow({ className, ...props }: DivProps) {
  return (
    <div
      role="row"
      {...props}
      className={cn(
        'col-span-full grid grid-cols-subgrid items-center border-b border-border px-4 py-3 transition',
        'last:border-b-0 hover:bg-foreground/5',
        className,
      )}
    />
  )
}

export function DataListCell({
  className,
  align = 'left',
  ...props
}: DivProps & { align?: Align }) {
  return <div role="cell" {...props} className={cn(alignClass(align), className)} />
}
