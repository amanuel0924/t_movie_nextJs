import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}
// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global
// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>
// } & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma
export const db = prisma
// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma

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
