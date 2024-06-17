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
import {
  formatDuration,
  selectModes,
  numberDateTimeModes,
  checkboxModes,
  multiSelectModes,
} from "@/utils/tableUtils"
import { IconButton } from "@mui/material"
import Switch from "@/components/programComponents/Switch"
import EditIcon from "@mui/icons-material/Edit"
import DeleteButton from "./DeleteButton"
import UpdateButton from "./UpdateButton"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { MRT_Row } from "material-react-table"

type Movie = {
  id: number
  title: string | null
  duration: number
  description: string
  status: boolean
  channelId: number
  typeId: number
  categoryId: number
  videoUrl: string | null
  released: Date
}

type dataResponseProp = {
  data: Array<Movie>
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
      title: "fuzzy",
      description: "fuzzy",
      duration: "lessThan",
      status: "equals",
      released: "equals",
      typeId: "equals",
    })

  const customeGlobalFilter = JSON.stringify({
    columuns: ["title", "description"],
    value: globalFilter,
  })

  const customVariantsTypes = useMemo(
    () => ({
      id: "number",
      title: "text",
      description: "text",
      duration: "number",
      status: "checkbox",
      released: "date",
      typeId: "multiSelect",
    }),
    []
  )

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const columns = useMemo<MRT_ColumnDef<Movie>[]>(
    () => [
      {
        accessorKey: "id",
        header: "id",
        size: 15,
        columnFilterModeOptions: numberDateTimeModes,
      },
      { accessorKey: "title", header: "Title", size: 30 },
      {
        accessorKey: "duration",
        size: 15,
        filterSelectOptions: [
          { label: "1h", value: 1 * 60 * 60 * 1000 },
          { label: "2h", value: 2 * 60 * 60 * 1000 },
          { label: "3h", value: 3 * 60 * 60 * 1000 },
        ],
        columnFilterModeOptions: selectModes,
        filterVariant: "select",
        header: "Duration",
        Cell: ({ row }) => formatDuration(row.original.duration),
      },
      { accessorKey: "description", header: "Description", size: 30 },
      {
        accessorKey: "status",
        header: "Status",
        size: 30,
        columnFilterModeOptions: checkboxModes,
        accessorFn: (originalRow) => (originalRow.status ? "true" : "false"),
        filterVariant: "checkbox",
        Cell: ({ row }: { row: MRT_Row<Movie> }) => (
          <Switch checked={row.original.status} id={row.original.id} />
        ),
      },
      {
        accessorKey: "typeId",
        header: "Type",
        filterVariant: "multi-select",
        filterSelectOptions: [
          { label: "Live TV", value: 1 },
          { label: "Movies", value: 2 },
          { label: "TV Shows", value: 3 },
          { label: "Sports", value: 4 },
        ],
        columnFilterModeOptions: multiSelectModes,
        size: 30,
        Cell: ({ row }) => {
          return row.original.typeId === 1
            ? "Live TV"
            : row.original.typeId === 2
            ? "Movies"
            : row.original.typeId === 3
            ? "TV Shows"
            : row.original.typeId === 4
            ? "Sports"
            : "Unknown"
        },
      },
      {
        accessorKey: "released",
        columnFilterModeOptions: numberDateTimeModes,
        header: "Released",
        size: 30,
        filterVariant: "date",
        Cell: ({ row }) => new Date(row.original.released).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        size: 50,
        enableColumnFilter: false,
        Cell: ({ row }: { row: MRT_Row<Movie> }) => (
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
