import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('merges string className with base classes; consumer wins conflicts', () => {
    render(<Input aria-label="Email" className="px-8" />)
    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toHaveClass('px-8', 'rounded-lg')
    expect(input).not.toHaveClass('px-3')
  })

  it('resolves function className with the focus state', async () => {
    const user = userEvent.setup()
    render(
      <Input aria-label="Email" className={({ focus }) => (focus ? 'is-focused' : 'is-blurred')} />,
    )
    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toHaveClass('is-blurred')
    await user.tab()
    expect(input).toHaveClass('is-focused')
  })

  it('renders as a glass-flat control', () => {
    render(<Input aria-label="Email" />)
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveClass('glass-flat')
  })
})
