"use server"
import { db } from "@/db"
import { channelSchema } from "@/schema"
import { revalidatePath } from "next/cache"
import {
  deleteDataForAll,
  getAdminDataForAll,
  getDataByIdForAll,
  toglerStatusForAll,
} from "./sharedAction"

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

export const getAdminData = async (urlquery: GetAdminDataQuery) => {
  console.log(await getAdminDataForAll({ urlquery, table: "channel" }))
  return await getAdminDataForAll({ urlquery, table: "channel" })
}

export const getDataId = async (id: number) => {
  return await getDataByIdForAll({ id, table: "channel" })
}

export const toglerStatus = async (id: number) => {
  return await toglerStatusForAll({ id, table: "channel" })
}
export const deleteData = async (id: number) => {
  return await deleteDataForAll({ id, table: "channel" })
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
