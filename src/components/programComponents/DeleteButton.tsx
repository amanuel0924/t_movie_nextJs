"use client"

import React from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteData } from "@/actions/programActions"

export default function DeleteButton({ id }: { id: number }) {
  const deleteDataAction = deleteData.bind(null, id)

  return (
    <form action={deleteDataAction}>
      <IconButton color="primary" aria-label="edit" type="submit">
        <DeleteIcon />
      </IconButton>
    </form>
  )
}
