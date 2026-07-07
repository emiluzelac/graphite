import {
  DataList,
  DataListHeader,
  DataListColumn,
  DataListRow,
  DataListCell,
} from '@/components/ui/data-list'
import { PreviewCode } from '@/components/preview-code'

type Person = { name: string; role: string; status: 'Active' | 'Away'; updated: string }

const people: Person[] = [
  { name: 'Ada Lovelace', role: 'Engineering', status: 'Active', updated: '2h ago' },
  { name: 'Alan Turing', role: 'Research', status: 'Active', updated: '5h ago' },
  { name: 'Grace Hopper', role: 'Compiler', status: 'Away', updated: '1d ago' },
  { name: 'Katherine Johnson', role: 'Trajectory', status: 'Active', updated: '3d ago' },
]

const statusColor: Record<Person['status'], string> = {
  Active: 'text-emerald-500',
  Away: 'text-amber-500',
}

function Status({ status }: { status: Person['status'] }) {
  return <span className={`font-medium ${statusColor[status]}`}>{status}</span>
}

export function Preview() {
  return (
    <DataList columns="2fr 1fr 1fr auto" aria-label="Team members" className="w-full max-w-xl">
      <DataListHeader>
        <DataListColumn>Name</DataListColumn>
        <DataListColumn>Team</DataListColumn>
        <DataListColumn>Status</DataListColumn>
        <DataListColumn align="right">Updated</DataListColumn>
      </DataListHeader>
      {people.map((p) => (
        <DataListRow key={p.name}>
          <DataListCell className="font-medium text-foreground">{p.name}</DataListCell>
          <DataListCell className="text-muted-foreground">{p.role}</DataListCell>
          <DataListCell>
            <Status status={p.status} />
          </DataListCell>
          <DataListCell align="right" className="text-muted-foreground tabular-nums">
            {p.updated}
          </DataListCell>
        </DataListRow>
      ))}
    </DataList>
  )
}

const code = `import {
  DataList,
  DataListHeader,
  DataListColumn,
  DataListRow,
  DataListCell,
} from '@/components/ui/data-list'

export function Example() {
  return (
    <DataList columns="2fr 1fr 1fr auto" aria-label="Team members">
      <DataListHeader>
        <DataListColumn>Name</DataListColumn>
        <DataListColumn>Team</DataListColumn>
        <DataListColumn>Status</DataListColumn>
        <DataListColumn align="right">Updated</DataListColumn>
      </DataListHeader>
      <DataListRow>
        <DataListCell className="font-medium text-foreground">Ada Lovelace</DataListCell>
        <DataListCell className="text-muted-foreground">Engineering</DataListCell>
        <DataListCell className="font-medium text-emerald-500">Active</DataListCell>
        <DataListCell align="right" className="tabular-nums text-muted-foreground">2h ago</DataListCell>
      </DataListRow>
    </DataList>
  )
}
`

export default function DataListPage() {
  return (
    <PreviewCode
      title="Data List"
      description="Grid-aligned records that read like a table without an HTML <table> — CSS Grid + subgrid for alignment, ARIA grid roles for semantics. Set columns once on the root; rows inherit it."
      preview={<Preview />}
      code={code}
    />
  )
}
