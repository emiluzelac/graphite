/**
 * Lazy, minimal shiki syntax highlighting for the showcase app's Code tab.
 *
 * Loading strategy:
 * - The whole shiki runtime (engine + highlighter) and its grammars are pulled
 *   in via dynamic import(), so none of it is in the initial bundle — it only
 *   downloads if a user actually opens a Code tab.
 * - We register only the `tsx` grammar plus the two themes we render with, so
 *   Vite splits each into its own small chunk instead of shipping Shaw's full
 *   grammar/Themewall (many hundreds of KB of unrelated languages/themes).
 * - The highlighter promise is cached module-wide, so switching tabs or moving
 *   between pages never re-runs the wasm/engine init.
 */

type ShikiModule = typeof import('shiki')
type TsxLang = typeof import('@shikijs/langs/tsx').default
type GithubTheme = typeof import('@shikijs/themes/github-light').default
type Highlighter = Awaited<ReturnType<ShikiModule['createHighlighter']>>

let highlighterPromise: Promise<Highlighter> | null = null

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [{ createHighlighter }, tsx, githubLight, githubDark] = await Promise.all([
        import('shiki'),
        import('@shikijs/langs/tsx').then((m) => m.default as TsxLang),
        import('@shikijs/themes/github-light').then((m) => m.default as GithubTheme),
        import('@shikijs/themes/github-dark').then((m) => m.default as GithubTheme),
      ])
      return createHighlighter({
        langs: [tsx],
        themes: [githubLight, githubDark],
      })
    })()
  }
  return highlighterPromise
}

export async function highlightCode(code: string): Promise<string> {
  const shiki = await getHighlighter()
  return shiki.codeToHtml(code, {
    lang: 'tsx',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
