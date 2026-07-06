import { render } from '@testing-library/react'
import { Preview } from './tabs'

describe('Tabs demo page', () => {
  it('renders without duplicate-key console errors', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<Preview />)
    const keyErrors = spy.mock.calls.filter((args) => String(args[0]).includes('same key'))
    expect(keyErrors).toHaveLength(0)
    spy.mockRestore()
  })
})
