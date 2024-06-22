import { PrismaClient } from "@prisma/client"

// type AppAbility = PureAbility<
//   [
//     string,
//     Subjects<{
//       User: User
//       Movie: Movie
//     }>
//   ],
//   PrismaQuery
// >

//export async function defineAbilities(role: number) {
//   let permissions: Permission[] | null = await db.permission.findMany()

//   permissions = permissions?.filter((permission) => permission.roleId === role)
//   console.log(permissions)

//   if (permissions) {
//     const { can, cannot, rules } = new AbilityBuilder<AppAbility>(
//       createPrismaAbility
//     )
//     permissions.forEach((permission) => {
//       if (permission.inverted) {
//         if (permission.condition) {
//           //@ts-ignore
//           cannot(permission.action, permission.subject, permission.condition)
//         } else {
//           //@ts-ignore
//           cannot(permission.action, permission.subject)
//         }
//       } else {
//         //@ts-ignore
//         can(permission.action, permission.subject)
//       }
//     })

//     return new PureAbility(rules, {
//       conditionsMatcher: prismaQuery,
//     })
//   } else {
//     return new PureAbility()
//   }
// }

export const db = new PrismaClient()
