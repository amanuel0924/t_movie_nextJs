// // import { PrismaClient } from "@prisma/client"
// const { PrismaClient } = require("@prisma/client")
// // import { revalidatePath } from "next/cache"
// const { revalidatePath } = require("next/cache")

// const db = new PrismaClient()

// const deleteData = async (id, io) => {
//   await db.movie.delete({
//     where: {
//       id,
//     },
//   })
//   io.emit("onDataChange")
//   revalidatePath("/program")
//   revalidatePath("/channel")
// }

// module.exports = { deleteData }
