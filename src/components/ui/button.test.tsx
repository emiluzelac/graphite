import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'
import * as button from './button'
import { Dialog, DialogPanel } from './dialog'

describe('Button', () => {
  it('renders children and fires onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save changes</Button>)

    await user.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies semantic token classes per variant', () => {
    render(
      <>
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="outline">Export</Button>
        <Button variant="ghost">More</Button>
        <Button variant="destructive">Delete</Button>
      </>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'bg-primary',
      'text-primary-foreground',
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass(
      'bg-secondary',
      'text-secondary-foreground',
    )
    expect(screen.getByRole('button', { name: 'Export' })).toHaveClass('border-input', 'bg-card')
    expect(screen.getByRole('button', { name: 'More' })).toHaveClass('text-muted-foreground')
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass(
      'bg-destructive',
      'text-destructive-foreground',
    )
  })

  it('applies size classes, defaulting to size default', () => {
    render(
      <>
        <Button>Default</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Settings" />
      </>,
    )
    expect(screen.getByRole('button', { name: 'Default' })).toHaveClass('px-4', 'py-2')
    expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('px-3', 'py-1')
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('px-6', 'rounded-lg')
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveClass('size-9')
  })

  it('lets className override variant classes via tailwind-merge', () => {
    render(<Button className="rounded-full">Pill</Button>)
    const button = screen.getByRole('button', { name: 'Pill' })
    expect(button).toHaveClass('rounded-full')
    expect(button).not.toHaveClass('rounded-md')
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('CloseButton closes the nearest dialog and supports variants', async () => {
    const { CloseButton } = button
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose}>
        <DialogPanel>
          <CloseButton variant="ghost">Close</CloseButton>
        </DialogPanel>
      </Dialog>,
    )

    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toHaveClass('text-muted-foreground')
    await user.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('gives buttonVariants links interactive data attributes via DataInteractive', async () => {
    const { DataInteractive, buttonVariants } = button
    const user = userEvent.setup()
    render(
      <DataInteractive>
        <a href="/docs" className={buttonVariants({ variant: 'outline' })}>
          Docs
        </a>
      </DataInteractive>,
    )

    const link = screen.getByRole('link', { name: 'Docs' })
    await user.hover(link)
    expect(link).toHaveAttribute('data-hover')
  })
})
