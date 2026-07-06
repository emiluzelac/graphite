import { cn } from '@/lib/cn'

/**
 * Ambient stage for the glass material: three fixed radial gradient blobs
 * (hues 295/220/330) behind all content. Mode switching happens in the
 * --backdrop-* tokens, not here.
 */
export function Backdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 -z-10', className)}
      style={{
        background: [
          'radial-gradient(55% 70% at 18% 25%, var(--backdrop-1), transparent 65%)',
          'radial-gradient(45% 60% at 85% 15%, var(--backdrop-2), transparent 60%)',
          'radial-gradient(50% 55% at 70% 90%, var(--backdrop-3), transparent 60%)',
        ].join(', '),
      }}
    />
  )
}
