"use server"
import { db } from "@/db"
import { programSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { createFilterCondition } from "@/utils/queryGenerator"
import { mergeFilterfn, mergeFilterDatatype } from "@/utils/tableUtils"

interface CreateFormStateType {
  errors: {
    title?: string[]
    videoUrl?: string[]
    description?: string[]
    duration?: string[]
    channel?: string[]
    category?: string[]
    type?: string[]
    released?: string[]
    _form?: string[]
  }
}

type GetAdminDataQuery = {
  start?: string
  size?: string
  filters?: string
  globalFilter?: string
  sorting?: string
  filtersFns?: string
  customVariantsTypes?: string
}
type Filter = {
  id: string
  value: string
  mode?: string
  type?: string
}

type GlobalFilter = {
  value: string
  columuns?: string[]
}
const createWhereClause = (filters: Filter[], globalFilter: GlobalFilter) => {
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

export const getAdminData = async (urlquery: GetAdminDataQuery) => {
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

  const where = createWhereClause(query, parsedGlobalFilter)

  try {
    const data = await db.movie.findMany({
      where,
      orderBy: parsedSorting,
      skip: start ? parseInt(start) : 0,
      take: size ? parseInt(size) : 10,
    })

    const totalRowCount = await db.movie.count({ where })

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

export const getDataId = async (id: number) => {
  return await db.movie.findUnique({
    where: {
      id,
    },
  })
}

export const toglerStatus = async (id: number) => {
  try {
    const data = await db.movie.findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }

    await db.movie.update({
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
}

export const getCategoryMovieCounts = async () => {
  const categoryCounts = await db.movie.groupBy({
    by: ["categoryId"],
    _count: {
      id: true,
    },
  })
  return categoryCounts
}

export const getUserData = async () => {
  return await db.movie.findMany()
}

export const createData = async (
  formState: CreateFormStateType,
  formData: FormData
): Promise<CreateFormStateType> => {
  const result = programSchema.safeParse({
    title: formData.get("title") as string,
    channelId: Number(formData.get("channel")),
    typeId: Number(formData.get("type")),
    categoryId: Number(formData.get("category")),
    videoUrl: formData.get("videoUrl") as string,
    duration: Number(formData.get("duration")),
    description: formData.get("description") as string,
    released:
      new Date(formData.get("released") as string).toISOString() ??
      new Date().toISOString(),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.movie.create({
      data: result.data,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] },
      }
    } else {
      return {
        errors: { _form: ["something went wrong"] },
      }
    }
  }
  revalidatePath("/channel")
  revalidatePath("/program")
  return {
    errors: {},
  }
}

export const updateData = async (
  id: number,
  formState: CreateFormStateType,
  formData: FormData
): Promise<CreateFormStateType> => {
  const result = programSchema.safeParse({
    title: formData.get("title") as string,
    channelId: Number(formData.get("channel")),
    typeId: Number(formData.get("type")),
    categoryId: Number(formData.get("category")),
    videoUrl: formData.get("videoUrl") as string,
    duration: Number(formData.get("duration")),
    description: formData.get("description") as string,
    released:
      new Date(formData.get("released") as string).toISOString() ??
      new Date().toISOString(),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.movie.update({
      where: {
        id,
      },
      data: result.data,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] },
      }
    } else {
      return {
        errors: { _form: ["something went wrong"] },
      }
    }
  }
  revalidatePath("/program")
  revalidatePath("/channel")
  return {
    errors: {},
  }
}

export const deleteData = async (id: number) => {
  await db.movie.delete({
    where: {
      id,
    },
  })
  revalidatePath("/program")
  revalidatePath("/channel")
}

export const getChannels = async () => {
  try {
    const channel = await db.channel.findMany()
    return channel
  } catch (error: unknown) {
    return null
  }
}
export const getTypes = async () => {
  try {
    const types = await db.type.findMany()
  } catch (error: unknown) {
    return null
  }
}

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany()
    return categories
  } catch (error: unknown) {
    return null
  }
}
