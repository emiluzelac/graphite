import { render, screen } from '@testing-library/react'
import { Separator } from './separator'

describe('Separator', () => {
  it('exposes separator semantics to assistive tech', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
