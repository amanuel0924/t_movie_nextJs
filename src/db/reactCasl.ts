import { User, Movie, Role, Permission, Prisma } from "@prisma/client"
import { PureAbility, AbilityBuilder, subject } from "@casl/ability"
import {
  createPrismaAbility,
  prismaQuery,
  PrismaQuery,
  Subjects,
} from "@casl/prisma"
import { db } from "@/db"

export type AppAbility = PureAbility<
  [
    string,
    (
      | "all"
      | Subjects<{
          User: User
          Movie: Movie
        }>
    )
  ],
  PrismaQuery
>

const { can, cannot, build } = new AbilityBuilder<AppAbility>(
  createPrismaAbility
)

export async function defineAbilitiesFor(role: number) {
  try {
    let permissions: Permission[] = await db.permission.findMany()

    if (!permissions) {
      return build()
    }

    permissions = permissions.filter((permission) => permission.roleId === role)

    console.log(permissions)

    for (const permission of permissions) {
      if (permission.inverted) {
        if (permission.condition) {
          cannot(
            permission.action,
            permission.subject as any,
            permission.condition as any
          )
        } else {
          cannot(permission.action, permission.subject as any)
        }
      } else {
        can(permission.action, permission.subject as any)
      }
    }

    return build()
  } catch (error) {
    console.error("Error fetching permissions:", error)

    return build()
  }
}
