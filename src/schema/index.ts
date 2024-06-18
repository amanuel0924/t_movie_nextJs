import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password is required"),
})

export const programSchema = z.object({
  title: z.string().min(1, "title is required"),
  channelId: z.number().int(),
  typeId: z.number().int(),
  categoryId: z.number().int(),
  videoUrl: z.string().url(),
  duration: z.number().int(),
  description: z.string().min(1, "description is required"),
  released: z.string().min(1, "released is required"),
})

export const channelSchema = z.object({
  name: z.string().min(1, "name is required"),
})
