import { render } from '@testing-library/react'
import { Backdrop } from './backdrop'

describe('Backdrop', () => {
  it('renders a fixed ambient layer hidden from assistive tech', () => {
    const { container } = render(<Backdrop />)
    const layer = container.firstElementChild!
    expect(layer).toHaveAttribute('aria-hidden', 'true')
    expect(layer).toHaveClass('pointer-events-none', 'fixed', 'inset-0', '-z-10')
  })

  it('merges a custom className', () => {
    const { container } = render(<Backdrop className="opacity-50" />)
    expect(container.firstElementChild).toHaveClass('opacity-50', 'fixed')
  })
})
