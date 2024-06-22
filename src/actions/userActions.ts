"use server"
import { db } from "@/db"
import { roleSchema } from "@/schema"
import { revalidatePath } from "next/cache"
export const getSingleUser = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  })
}

export const getPermition = async () => {
  try {
    const permission = await db.permission.findMany()
    if (!permission) {
      return []
    } else {
      console.log(permission)
      return permission
    }
  } catch (error) {
    console.log(error)
  }
}

interface CreateFormStateType {
  errors: {
    name?: string[]
    permission?: string[]
    _form?: string[]
  }
}

export const createData = async (
  formState: CreateFormStateType,
  formData: FormData
): Promise<CreateFormStateType> => {
  const result = roleSchema.safeParse({
    name: formData.get("name") as string,
    permission: Number(formData.get("permission")),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.role.create({
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
  revalidatePath("/role")
  return {
    errors: {},
  }
}

// export const createData = async (
//   formState: CreateFormStateType,
//   formData: FormData
// ): Promise<CreateFormStateType> => {
//   const result = channelSchema.safeParse({
//     name: formData.get("name") as string,
//   })

//   if (!result.success) {
//     return {
//       errors: result.error.flatten().fieldErrors,
//     }
//   }

//   try {
//     await db.channel.create({
//       data: result.data,
//     })
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return {
//         errors: { _form: [error.message] },
//       }
//     } else {
//       return {
//         errors: { _form: ["something went wrong"] },
//       }
//     }
//   }
//   revalidatePath("/channel")
//   revalidatePath("/program")
//   return {
//     errors: {},
//   }
// }

export const getUserByemail = async (email: string) => {
  return await db.user.findFirst({
    where: {
      email,
    },
  })
}
