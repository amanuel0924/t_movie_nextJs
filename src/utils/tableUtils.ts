export function formatDuration(milliseconds: number) {
  const totalMinutes = Math.floor(milliseconds / 60000)

  const hours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  return `${hours}h ${remainingMinutes}m`
}

type ColumnFilter = {
  id: string
  value?: string | number | boolean | string[] | number[] | Date | Date[]
  mode?: string
  type?: string
}

export const mergeFilterfn = (
  columnFilters: ColumnFilter[],
  columnFilterFns: Record<string, string>
) => {
  return columnFilters.map((item) => {
    if (item.id in columnFilterFns) {
      return { ...item, mode: columnFilterFns[item.id] }
    }
    return item
  })
}

export const mergeFilterDatatype = (
  columnFilters: ColumnFilter[],
  columnDataTypes: Record<string, string>
) => {
  return columnFilters.map((item) => {
    if (item.id in columnDataTypes) {
      return { ...item, type: columnDataTypes[item.id] }
    }
    return item
  })
}

export const numberDateTimeModes = [
  "equals",
  "notEquals",
  "lessThan",
  "lessThanOrEqualTo",
  "greaterThan",
  "greaterThanOrEqualTo",
  "between",
  "betweenInclusive",
  "empty",
  "notEmpty",
]
export const checkboxModes = ["equals"]
export const selectModes = [
  "equals",
  "notEquals",
  "lessThan",
  "lessThanOrEqualTo",
  "greaterThan",
  "greaterThanOrEqualTo",
  "empty",
  "notEmpty",
]
export const multiSelectModes = ["equals", "notEquals"]
export const ranges = ["between", "betweenInclusive"]
