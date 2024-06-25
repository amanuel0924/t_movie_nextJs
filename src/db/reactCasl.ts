import { User, Movie, Role, Permission, Prisma, Channel } from "@prisma/client"
import {
  PureAbility,
  AbilityBuilder,
  subject,
  FieldMatcher,
} from "@casl/ability"
import {
  createPrismaAbility,
  prismaQuery,
  PrismaQuery,
  Subjects,
} from "@casl/prisma"
import { db } from "@/db"
import { parseCondition } from "@/utils/conditionParser"
import { getRole } from "@/actions/userActions"

export type AppAbility = PureAbility<
  [
    string,
    "all" | Subjects<{ User: User; Movie: Movie; Channel: Channel; Role: Role }>
  ],
  PrismaQuery
>

const { can, cannot, build } = new AbilityBuilder<AppAbility>(
  createPrismaAbility
)
export async function defineAbilitiesFor(role: number, id?: any) {
  try {
    let roles = await getRole(role)

    const permissions = roles?.Permissions || []

    for (const permission of permissions) {
      if (permission.inverted) {
        if (permission.condition && permission.fields) {
          const condition = parseCondition(
            JSON.stringify(permission.condition),
            id
          )
          cannot(
            permission.action,
            permission.subject as any,
            permission.fields.split(","),
            condition as any
          )
        } else if (permission.condition) {
          console.log("condition", JSON.stringify(permission.condition))
          const condition = parseCondition(
            JSON.stringify(permission.condition),
            id
          )
          cannot(permission.action, permission.subject as any, condition as any)
        } else if (permission.fields) {
          console.log("fields", permission.fields.split(","))
          cannot(
            permission.action,
            permission.subject as any,
            permission.fields.split(",")
          )
        } else {
          cannot(permission.action, permission.subject as any)
        }
      } else {
        if (permission.condition && permission.fields) {
          const condition = parseCondition(
            JSON.stringify(permission.condition),
            id
          )
          can(
            permission.action,
            permission.subject as any,
            permission.fields.split(","),
            condition as any
          )
        } else if (permission.condition) {
          console.log("condition", JSON.stringify(permission.condition))
          const condition = parseCondition(
            JSON.stringify(permission.condition),
            id
          )
          can(permission.action, permission.subject as any, condition as any)
        } else if (permission.fields) {
          console.log("fields", permission.fields.split(","))

          can(
            permission.action,
            permission.subject as any,
            permission.fields.split(",")
          )
        } else {
          can(permission.action, permission.subject as any)
        }
      }
    }
    console.log(build())
    return build()
  } catch (error) {
    console.error("Error fetching permissions:", error)

    return build()
  }
}
