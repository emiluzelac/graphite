import { Button as HUIButton, type ButtonProps as HUIButtonProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-inner shadow-white/10 data-hover:bg-primary/90 data-active:bg-primary/80 data-focus:outline-ring',
  secondary:
    'bg-secondary text-secondary-foreground data-hover:bg-secondary/70 data-active:bg-secondary data-focus:outline-ring',
  ghost:
    'text-muted-foreground data-hover:bg-accent data-hover:text-accent-foreground data-focus:outline-ring',
}

export interface ButtonProps extends Omit<HUIButtonProps, 'className'> {
  className?: string
  variant?: Variant
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <HUIButton
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm/6 font-semibold transition',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-2',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        variants[variant],
        className,
      )}
    />
  )
}
