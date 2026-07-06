import { render, screen } from '@testing-library/react'
import { Dialog, DialogPanel, DialogTitle } from './dialog'

describe('Dialog', () => {
  it('renders an accessible dialog with backdrop and title', () => {
    render(
      <Dialog open onClose={() => {}}>
        <DialogPanel>
          <DialogTitle>Delete file</DialogTitle>
        </DialogPanel>
      </Dialog>,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Delete file')).toBeInTheDocument()
  })

  it('places the panel in a scrollable container so tall dialogs are reachable', () => {
    render(
      <Dialog open onClose={() => {}}>
        <DialogPanel>Tall content</DialogPanel>
      </Dialog>,
    )

    const panel = screen.getByText('Tall content')
    expect(panel.closest('.overflow-y-auto')).not.toBeNull()
  })
})
