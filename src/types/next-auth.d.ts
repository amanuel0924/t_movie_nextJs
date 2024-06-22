import NextAuth from "next-auth"
import { number } from "zod"

declare module "next-auth" {
  interface User {
    roleId: number
  }
  interface Session {
    user: User & {
      /** The user's postal address. */
      roleId: number
      id: string
    }
    token: {
      roleId: number
      id: string
    }
  }
}
