"use client"
import React from "react"
import { useContext } from "react"
import { ModalContext } from "@/components/programComponents/ModalContext"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import { Movie } from "@prisma/client"

const UpdateButton = ({ data }: { data: any }) => {
  const { updateModal, setMovieData, isUpdateModalOpen } =
    useContext(ModalContext)
  console.log()
  const handleUpdate = () => {
    console.log(data, isUpdateModalOpen)
    updateModal()
    setMovieData(data as Movie)
  }

  return (
    <IconButton color="primary" onClick={handleUpdate} aria-label="edit">
      <EditIcon />
    </IconButton>
  )
}

export default UpdateButton
