"use client"
import React from "react"
import { useContext } from "react"
import { ModalContext } from "@/components/channelComponents/ModalContext"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import { Channel } from "@prisma/client"

const UpdateButton = ({ data }: { data: any }) => {
  const { updateModal, setChannelData, isUpdateModalOpen } =
    useContext(ModalContext)
  console.log()
  const handleUpdate = () => {
    console.log(data, isUpdateModalOpen)
    updateModal()
    setChannelData(data as Channel)
  }

  return (
    <IconButton color="primary" onClick={handleUpdate} aria-label="edit">
      <EditIcon />
    </IconButton>
  )
}

export default UpdateButton
