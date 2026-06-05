import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface Props {
  title: string
  description?: string
  preview: ReactNode
  code: string
}

export function PreviewCode({ title, description, preview, code }: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* noop */
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-white/60">{description}</p>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-gray-900/50">
        <div className="flex items-center justify-between border-b border-gray-200 px-2 py-2 dark:border-white/10">
          <div className="flex gap-1">
            {(['preview', 'code'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'rounded-md px-3 py-1 text-sm font-medium capitalize transition',
                  tab === t
                    ? 'bg-gray-900 text-white dark:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 dark:text-white/60 dark:hover:text-white',
                )}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === 'code' && (
            <button
              onClick={copy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        {tab === 'preview' ? (
          <div className="flex min-h-96 items-center justify-center bg-white p-10 dark:bg-gray-950/40">
            {preview}
          </div>
        ) : (
          <pre className="max-h-[36rem] overflow-auto bg-gray-900 p-6 text-sm leading-6 text-gray-100">
            <code className="font-mono">{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
