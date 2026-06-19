import { render, screen, within } from '@testing-library/react'
import { DataList, DataListHeader, DataListColumn, DataListRow, DataListCell } from './data-list'

function Example() {
  return (
    <DataList columns="2fr 1fr auto" aria-label="Team">
      <DataListHeader>
        <DataListColumn>Name</DataListColumn>
        <DataListColumn>Team</DataListColumn>
        <DataListColumn align="right">Updated</DataListColumn>
      </DataListHeader>
      <DataListRow>
        <DataListCell>Ada Lovelace</DataListCell>
        <DataListCell>Engineering</DataListCell>
        <DataListCell align="right">2h ago</DataListCell>
      </DataListRow>
    </DataList>
  )
}

describe('DataList', () => {
  it('exposes ARIA grid semantics (table / row / columnheader / cell)', () => {
    render(<Example />)
    const table = screen.getByRole('table', { name: 'Team' })
    expect(within(table).getAllByRole('row')).toHaveLength(2) // header + 1 body row
    expect(within(table).getAllByRole('columnheader')).toHaveLength(3)
    expect(within(table).getAllByRole('cell')).toHaveLength(3)
    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toBeInTheDocument()
  })

  it('applies the column template as an inline grid style', () => {
    render(<Example />)
    expect(screen.getByRole('table')).toHaveStyle({
      gridTemplateColumns: '2fr 1fr auto',
    })
  })

  it('aligns right when align="right"', () => {
    render(<Example />)
    expect(screen.getByRole('cell', { name: '2h ago' })).toHaveClass('text-right')
    expect(screen.getByRole('columnheader', { name: 'Updated' })).toHaveClass('text-right')
  })

  it('merges className onto the root via tailwind-merge', () => {
    render(
      <DataList columns="1fr" className="rounded-none">
        <DataListRow>
          <DataListCell>Solo</DataListCell>
        </DataListRow>
      </DataList>,
    )
    const table = screen.getByRole('table')
    expect(table).toHaveClass('rounded-none')
    expect(table).not.toHaveClass('rounded-xl')
  })
})
