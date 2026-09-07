import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '@/App'
import { ThemeProvider } from '@/theme'

async function renderDocs(path = '/docs') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>,
  )
  await waitFor(() =>
    expect(screen.queryByRole('heading', { level: 1, name: 'Using Graphite' })).toBeInTheDocument(),
  )
  return screen.getByRole('article', { name: 'Using Graphite' })
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  localStorage.clear()
})

describe('Graphite documentation', () => {
  it('renders the canonical guide as readable Markdown with tables and code', async () => {
    const article = await renderDocs()

    expect(
      within(article).getByRole('heading', { level: 2, name: 'Configure the registry' }),
    ).toBeInTheDocument()
    expect(within(article).getAllByRole('table')).toHaveLength(2)
    expect(within(article).getByRole('columnheader', { name: 'Purpose' })).toBeInTheDocument()
    expect(article.querySelector('pre code')).toHaveTextContent('npx shadcn@latest init')
    expect(article.querySelector('code.language-tsx')).toHaveTextContent(
      'export function EmailField()',
    )
    expect(within(article).queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('uses the existing documentation navigation', async () => {
    await renderDocs()
    const sidebar = within(screen.getByRole('complementary'))

    expect(sidebar.getByRole('link', { name: 'Using Graphite' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(sidebar.getByRole('link', { name: 'Button' })).toHaveAttribute('href', '/react/button')
  })

  it.each(['/docs', '/docs/'])('resolves raw resource links correctly from %s', async (path) => {
    const article = within(await renderDocs(path))

    expect(article.getByRole('link', { name: 'registry catalog' })).toHaveAttribute(
      'href',
      '/r/registry.json',
    )
    expect(article.getByRole('link', { name: 'agent index' })).toHaveAttribute('href', '/llms.txt')
    expect(article.getByRole('link', { name: 'AGENTS.md' })).toHaveAttribute(
      'href',
      'https://github.com/emiluzelac/graphite/blob/main/AGENTS.md',
    )
  })
})
