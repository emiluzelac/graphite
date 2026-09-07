import Markdown, { defaultUrlTransform, type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import guide from '../../public/using-graphite.md?raw'
import { cn } from '@/lib/cn'

function guideUrl(url: string) {
  const safeUrl = defaultUrlTransform(url)
  if (!safeUrl || safeUrl.startsWith('#')) return safeUrl

  const source = new URL(`${import.meta.env.BASE_URL}using-graphite.md`, window.location.href)
  const resolved = new URL(safeUrl, source)
  return resolved.origin === source.origin
    ? `${resolved.pathname}${resolved.search}${resolved.hash}`
    : safeUrl
}

const components: Components = {
  h1: ({ children }) => (
    <h1 id="docs-title" className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-lg font-semibold">{children}</h3>,
  p: ({ children }) => (
    <p className="my-4 max-w-prose leading-7 text-pretty text-foreground/85">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="rounded-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 leading-7">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-decimal space-y-3 pl-6 leading-7">{children}</ol>,
  code: ({ children, className }) => (
    <code className={cn('rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-sm', className)}>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre
      tabIndex={0}
      className="my-6 max-w-full overflow-x-auto rounded-xl border border-border bg-card p-5 text-sm leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_code]:bg-transparent [&_code]:p-0"
    >
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div
      tabIndex={0}
      className="my-6 max-w-full overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <table className="w-full border-collapse text-left text-sm leading-6">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-foreground/5">{children}</thead>,
  th: ({ children, style }) => (
    <th scope="col" style={style} className="px-4 py-3 align-top font-semibold">
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="border-t border-border px-4 py-3 align-top">
      {children}
    </td>
  ),
}

export default function DocsPage() {
  return (
    <article aria-labelledby="docs-title" className="max-w-3xl break-words text-foreground">
      <Markdown remarkPlugins={[remarkGfm]} components={components} urlTransform={guideUrl}>
        {guide}
      </Markdown>
    </article>
  )
}
