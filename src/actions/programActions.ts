"use server"
import { db } from "@/db"
import { programSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import { createFilterCondition } from "@/utils/queryGenerator"
import { mergeFilterfn, mergeFilterDatatype } from "@/utils/tableUtils"
import {
  getAdminDataForAll,
  deleteDataForAll,
  toglerStatusForAll,
  getDataByIdForAll,
} from "./sharedAction"

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

export const getAdminData = async (urlquery: GetAdminDataQuery) => {
  return await getAdminDataForAll({ urlquery, table: "movie" })
}

export const getDataId = async (id: number) => {
  return await getDataByIdForAll({ id, table: "movie" })
}

export const toglerStatus = async (id: number) => {
  return await toglerStatusForAll({ id, table: "movie" })
}
export const deleteData = async (id: number) => {
  return await deleteDataForAll({ id, table: "movie" })
}
export const getUserData = async () => {
  return await db.movie.findMany()
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
