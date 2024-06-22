"use client"

import React from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
// import { deleteData } from "./../../actions/realtimeActions"
// import { socket } from "@/socket"
import { deleteData } from "@/actions/programActions"
import { useSession } from "next-auth/react"

export default function DeleteButton({ id }: { id: number }) {
  const { data: session, status } = useSession()
  const handleDelete = async (id: number, roleId: number) => {
    try {
      await deleteData(id, roleId)
      // socket.emit("datachange")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <IconButton
      color="primary"
      aria-label="edit"
      onClick={() => handleDelete(id, session?.user.roleId as number)}
    >
      <DeleteIcon />
    </IconButton>
  )
}
