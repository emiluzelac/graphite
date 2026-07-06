import { useEffect, useState, type ReactNode } from 'react'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/cn'

interface Props {
  title: string
  description?: string
  preview: ReactNode
  code: string
}

/** Shiki dual-theme highlight; resolves async, so render the plain code until ready. */
function useHighlightedCode(code: string) {
  const [html, setHtml] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    codeToHtml(code, {
      lang: 'tsx',
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    }).then((result) => {
      if (alive) setHtml(result)
    })
    return () => {
      alive = false
    }
  }, [code])
  return html
}

export function PreviewCode({ title, description, preview, code }: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const highlighted = useHighlightedCode(code)

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
      {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}

      <div className="mt-8 overflow-hidden rounded-2xl border bg-muted/50">
        <div className="flex items-center justify-between border-b px-2 py-2">
          <div className="flex gap-1">
            {(['preview', 'code'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-1 text-sm font-medium capitalize transition',
                  tab === t
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === 'code' && (
            <button
              onClick={copy}
              className="cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        {tab === 'preview' ? (
          <div className="flex min-h-96 items-center justify-center bg-background p-10">
            {preview}
          </div>
        ) : highlighted ? (
          // Safe: Shiki output of our own hardcoded demo strings; Shiki escapes the source.
          <div
            className="max-h-[36rem] overflow-auto bg-card p-6 text-sm leading-6 [&_pre]:outline-none"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre className="max-h-[36rem] overflow-auto bg-card p-6 text-sm leading-6 text-foreground">
            <code className="font-mono">{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
