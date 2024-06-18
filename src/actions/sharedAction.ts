"use server"
import { db } from "@/db"
import {
  Filter,
  GlobalFilter,
  GetAdminDataQuery,
  CreateChannelFormStateType,
  CreateProgramFormStateType,
} from "./types"
import { createFilterCondition } from "@/utils/queryGenerator"
import { mergeFilterfn, mergeFilterDatatype } from "@/utils/tableUtils"

export const createWhereClause = (
  filters: Filter[],
  globalFilter: GlobalFilter
) => {
  let where: any = {}

  if (globalFilter.value) {
    const global = globalFilter?.columuns?.map((column) => ({
      [column]: { contains: globalFilter.value, mode: "insensitive" },
    }))
    where.OR = global
  }

  filters.forEach(({ id: column, value, mode, type }) => {
    where = {
      ...where,
      ...createFilterCondition(column, value, mode || "", type || ""),
    }
  })

  return where
}

// export const getAdminDataForAll = async (
//   urlquery: GetAdminDataQuery,
//   table: PrismaClient
// ) => {
//   const {
//     start,
//     size,
//     filters,
//     globalFilter,
//     sorting,
//     customVariantsTypes,
//     filtersFns,
//   } = urlquery

//   const parsedFilters = filters ? JSON.parse(filters) : []
//   const parsedGlobalFilter = globalFilter ? JSON.parse(globalFilter) : {}
//   const parsedSorting = sorting ? JSON.parse(sorting) : []
//   const columnFilterFns = filtersFns ? JSON.parse(filtersFns) : {}
//   const customVariantsTypesObj = customVariantsTypes
//     ? JSON.parse(customVariantsTypes)
//     : {}
//   let query = { ...parsedFilters }
//   query = mergeFilterfn(parsedFilters, columnFilterFns)
//   query = mergeFilterDatatype(query, customVariantsTypesObj)

//   console.log("filter", query)

//   const where = createWhereClause(query, parsedGlobalFilter)

//   try {
//     const data = await table.findMany({
//       where,
//       orderBy: parsedSorting,
//       skip: start ? parseInt(start) : 0,
//       take: size ? parseInt(size) : 10,
//     })

//     const totalRowCount = await db.movie.count({ where })

//     return {
//       data,
//       meta: {
//         totalRowCount,
//       },
//     }
//   } catch (error: unknown) {
//     return {
//       data: [],
//       meta: {
//         totalRowCount: 0,
//       },
//     }
//   }
// }
