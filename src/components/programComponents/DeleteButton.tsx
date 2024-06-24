"use client"

import React from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
// import { deleteData } from "./../../actions/realtimeActions"
// import { socket } from "@/socket"
import { deleteData } from "@/actions/programActions"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"

export default function DeleteButton({ id }: { id: number }) {
  const { data: session, status } = useSession()
  const handleDelete = async (
    id: number,
    user: User & {
      roleId: number
      id: string
    }
  ) => {
    try {
      await deleteData(id, user)
      // socket.emit("datachange")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <IconButton
      color="primary"
      aria-label="edit"
      onClick={() =>
        handleDelete(
          id,
          session?.user as User & {
            roleId: number
            id: string
          }
        )
      }
    >
      <DeleteIcon />
    </IconButton>
  )
}
