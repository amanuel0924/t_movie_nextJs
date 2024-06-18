"use server"
import { db } from "@/db"
import { channelSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { createFilterCondition } from "@/utils/queryGenerator"
import { mergeFilterfn, mergeFilterDatatype } from "@/utils/tableUtils"
// import { getAdminDataForAll } from "./sharedAction"
import { createWhereClause } from "./sharedAction"

interface CreateFormStateType {
  errors: {
    name?: string[]
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

// export const getAdminDatafromShared= getAdminDataForAll(urlquery: GetAdminDataQuery,db.channel)

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
    const data = await db.channel.findMany({
      where,
      orderBy: parsedSorting,
      skip: start ? parseInt(start) : 0,
      take: size ? parseInt(size) : 10,
    })

    const totalRowCount = await db.channel.count({ where })

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
  return await db.channel.findUnique({
    where: {
      id,
    },
  })
}

export const toglerStatus = async (id: number) => {
  try {
    const data = await db.channel.findUnique({
      where: {
        id,
      },
    })

    if (!data) {
      return null
    }

    await db.channel.update({
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

export const getUserData = async () => {
  return await db.channel.findMany()
}

export const createData = async (
  formState: CreateFormStateType,
  formData: FormData
): Promise<CreateFormStateType> => {
  const result = channelSchema.safeParse({
    name: formData.get("name") as string,
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.channel.create({
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
  const result = channelSchema.safeParse({
    name: formData.get("name") as string,
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.channel.update({
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
  await db.channel.delete({
    where: {
      id,
    },
  })
  revalidatePath("/program")
  revalidatePath("/channel")
}
