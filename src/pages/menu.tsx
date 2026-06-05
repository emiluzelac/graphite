import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/ui/menu'
import { Separator } from '@/components/ui/separator'
import { PreviewCode } from '@/components/preview-code'
import {
  AltArrowDownLinear,
  ArchiveLinear,
  CopyLinear,
  PenLinear,
  TrashBinMinimalisticLinear,
} from 'icona'

function Preview() {
  return (
    <Menu __demoMode>
      <MenuButton>
        Options
        <AltArrowDownLinear className="size-4 text-muted-foreground" />
      </MenuButton>
      <MenuItems anchor="bottom end" className="w-52">
        <MenuItem>
          <PenLinear className="size-4 text-muted-foreground" />
          Edit
        </MenuItem>
        <MenuItem>
          <CopyLinear className="size-4 text-muted-foreground" />
          Duplicate
        </MenuItem>
        <Separator />
        <MenuItem>
          <ArchiveLinear className="size-4 text-muted-foreground" />
          Archive
        </MenuItem>
        <MenuItem>
          <TrashBinMinimalisticLinear className="size-4 text-muted-foreground" />
          Delete
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

const code = `import { Menu, MenuButton, MenuItem, MenuItems } from '@/components/ui/menu'
import { Separator } from '@/components/ui/separator'
import { PenLinear, CopyLinear, ArchiveLinear, TrashBinMinimalisticLinear, AltArrowDownLinear } from 'icona'

export function Example() {
  return (
    <Menu __demoMode>
      <MenuButton>
        Options
        <AltArrowDownLinear className="size-4" />
      </MenuButton>
      <MenuItems anchor="bottom end" className="w-52">
        <MenuItem><PenLinear className="size-4" /> Edit</MenuItem>
        <MenuItem><CopyLinear className="size-4" /> Duplicate</MenuItem>
        <Separator />
        <MenuItem><ArchiveLinear className="size-4" /> Archive</MenuItem>
        <MenuItem><TrashBinMinimalisticLinear className="size-4" /> Delete</MenuItem>
      </MenuItems>
    </Menu>
  )
}
`

export default function MenuPage() {
  return (
    <PreviewCode
      title="Dropdown Menu"
      description="Build accessible dropdowns with full keyboard navigation."
      preview={<Preview />}
      code={code}
    />
  )
}
