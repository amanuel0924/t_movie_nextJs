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
import { revalidatePath } from "next/cache"

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

type PrismaTableProps = {
  urlquery: GetAdminDataQuery
  table: string
}
type singleDataProps = {
  id: number
  table: string
}
export const getAdminDataForAll = async ({
  urlquery,
  table,
}: PrismaTableProps) => {
  const {
    start,
    size,
    filters,
    globalFilter,
    sorting,
    customVariantsTypes,
    filtersFns,
  } = urlquery

  const parsedFilters = filters ? JSON.parse(filters) : []
  const parsedGlobalFilter = globalFilter ? JSON.parse(globalFilter) : {}
  const parsedSorting = sorting ? JSON.parse(sorting) : []
  const columnFilterFns = filtersFns ? JSON.parse(filtersFns) : {}
  const customVariantsTypesObj = customVariantsTypes
    ? JSON.parse(customVariantsTypes)
    : {}
  let query = { ...parsedFilters }
  query = mergeFilterfn(parsedFilters, columnFilterFns)
  query = mergeFilterDatatype(query, customVariantsTypesObj)

  console.log("filter", query)

  const where = await createWhereClause(query, parsedGlobalFilter)

  try {
    //@ts-ignore
    const data = await db[table].findMany({
      where,
      orderBy: parsedSorting,
      skip: start ? parseInt(start) : 0,
      take: size ? parseInt(size) : 10,
    })
    //@ts-ignore
    const totalRowCount = await [table].count({ where })

    return {
      data,
      meta: {
        totalRowCount,
      },
    }
  } catch (error: unknown) {
    return {
      data: [],
      meta: {
        totalRowCount: 0,
      },
    }
  }
}

export const getDataById = async ({ id, table }: singleDataProps) => {
  try {
    //@ts-ignore
    const data = await db[table].findUnique({
      where: {
        id,
      },
    })
    return data
  } catch (error: unknown) {
    return {
      data: [],
    }
  }
}

export const toglerStatus = async ({ id, table }: singleDataProps) => {
  try {
    //@ts-ignore
    const data = await db[table].findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }
    //@ts-ignore
    await db[table].update({
      where: {
        id,
      },
      data: {
        status: !data.status,
      },
    })
  } catch (error: unknown) {
    return null
  }
  revalidatePath("/program")
  revalidatePath("/channel")
}

export const deleteData = async ({ id, table }: singleDataProps) => {
  try {
    //@ts-ignore
    await db[table].delete({
      where: {
        id,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message
    }
  }
  revalidatePath("/program")
  revalidatePath("/channel")
}
