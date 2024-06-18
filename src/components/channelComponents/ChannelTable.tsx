"use client"
import { useMemo, useState, useEffect } from "react"
import {
  MRT_ColumnFilterFnsState,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table"
import { numberDateTimeModes, checkboxModes } from "@/utils/tableUtils"
import Switch from "@/components/channelComponents/Switch"
import DeleteButton from "./DeleteButton"
import UpdateButton from "./UpdateButton"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { MRT_Row } from "material-react-table"

type Channel = {
  id: number
  name: string
  status: boolean
}

type dataResponseProp = {
  data: Array<Channel>
  meta: {
    totalRowCount: number
  }
}

const Example = (datas: dataResponseProp) => {
  const { data, meta } = datas
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>({
      id: "equals",
      name: "fuzzy",
      status: "equals",
    })

  const customeGlobalFilter = JSON.stringify({
    columuns: ["name"],
    value: globalFilter,
  })

  const customVariantsTypes = useMemo(
    () => ({
      id: "number",
      name: "text",
      status: "checkbox",
    }),
    []
  )

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const columns = useMemo<MRT_ColumnDef<Channel>[]>(
    () => [
      {
        accessorKey: "id",
        header: "id",
        size: 15,
        columnFilterModeOptions: numberDateTimeModes,
      },
      { accessorKey: "name", header: "name", size: 30 },
      {
        accessorKey: "status",
        header: "Status",
        size: 30,
        columnFilterModeOptions: checkboxModes,
        accessorFn: (originalRow) => (originalRow.status ? "true" : "false"),
        filterVariant: "checkbox",
        Cell: ({ row }: { row: MRT_Row<Channel> }) => (
          <Switch checked={row.original.status} id={row.original.id} />
        ),
      },

      {
        id: "actions",
        header: "Actions",
        size: 50,
        enableColumnFilter: false,
        Cell: ({ row }: { row: MRT_Row<Channel> }) => (
          <div>
            <UpdateButton data={row.original} />
            <DeleteButton id={row.original.id} />
          </div>
        ),
      },
    ],
    []
  )

  useEffect(() => {
    const fetchURL = new URLSearchParams(searchParams)

    fetchURL.set("start", `${pagination.pageIndex * pagination.pageSize}`)
    fetchURL.set("size", `${pagination.pageSize}`)
    fetchURL.set("filtersFns", JSON.stringify(columnFilterFns ?? []))
    fetchURL.set(
      "customVariantsTypes",
      JSON.stringify(customVariantsTypes ?? [])
    )
    fetchURL.set("filters", JSON.stringify(columnFilters ?? []))
    fetchURL.set("globalFilter", customeGlobalFilter ?? "")
    fetchURL.set("sorting", JSON.stringify(sorting ?? []))

    replace(`${pathName}?${fetchURL.toString()}`)
  }, [
    columnFilterFns,
    columnFilters,
    customeGlobalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    searchParams,
    replace,
    pathName,
    customVariantsTypes,
  ])

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true,
    enableColumnFilterModes: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnFilterFnsChange: setColumnFilterFns,
    onSortingChange: setSorting,
    rowCount: meta?.totalRowCount ?? 0,
    state: {
      columnFilters,
      globalFilter,
      pagination,
      sorting,
      columnFilterFns,
    },
  })

  return <MaterialReactTable table={table} />
}

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

const ExampleWithLocalizationProvider = (data: dataResponseProp) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example {...data} />
  </LocalizationProvider>
)

export default ExampleWithLocalizationProvider
