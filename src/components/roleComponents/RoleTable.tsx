import { useMemo } from "react"
import type { Role } from "@prisma/client"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table"

const Example = (data: Role[]) => {
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "name",
        size: 150,
      },
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data,
  })

  return <MaterialReactTable table={table} />
}

export default Example
