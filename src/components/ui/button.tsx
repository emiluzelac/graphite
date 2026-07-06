import {
  Button as HUIButton,
  CloseButton as HUICloseButton,
  type ButtonProps as HUIButtonProps,
  type CloseButtonProps as HUICloseButtonProps,
} from '@headlessui/react'
// Re-exported so buttonVariants works on plain elements (e.g. links): DataInteractive
// applies the data-hover/data-active attributes the variants are styled against.
export { DataInteractive } from '@headlessui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { composeClass } from '@/lib/cn'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-semibold transition',
    'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-2 data-focus:outline-ring',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-inner shadow-white/10 data-hover:bg-primary/90 data-active:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground data-hover:bg-secondary/70 data-active:bg-secondary',
        outline:
          'border border-input bg-card text-foreground data-hover:bg-accent data-hover:text-accent-foreground',
        ghost: 'text-muted-foreground data-hover:bg-accent data-hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground data-hover:bg-destructive/90 data-active:bg-destructive/80',
      },
      size: {
        sm: 'rounded-md px-3 py-1 text-sm',
        default: 'rounded-md px-4 py-2 text-sm/6',
        lg: 'rounded-lg px-6 py-2.5 text-base/7',
        icon: 'size-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type ButtonProps = HUIButtonProps & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <HUIButton {...props} className={composeClass(buttonVariants({ variant, size }), className)} />
  )
}

export type CloseButtonProps = HUICloseButtonProps & VariantProps<typeof buttonVariants>

// Styled like Button, but closes the nearest Dialog or Popover when clicked.
export function CloseButton({ className, variant, size, ...props }: CloseButtonProps) {
  return (
    <HUICloseButton
      {...props}
      className={composeClass(buttonVariants({ variant, size }), className)}
    />
  )
}
