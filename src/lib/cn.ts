import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolve a Headless UI className prop (string or render-prop function)
 * against wrapper base classes. Consumer classes win conflicts via
 * tailwind-merge. Always returns a function so Headless UI supplies the
 * state bag.
 */
export function composeClass<Bag>(
  base: string,
  className?: string | ((bag: Bag) => string),
): (bag: Bag) => string {
  return (bag) => cn(base, typeof className === 'function' ? className(bag) : className)
}
