"use client"
import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { ModalContext } from "@/components/programComponents/ModalContext"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import { Movie } from "@prisma/client"
import { AppAbility, defineAbilitiesFor } from "@/db/reactCasl"
import { useSession } from "next-auth/react"

const UpdateButton = ({ data }: { data: any }) => {
  const { updateModal, setMovieData, isUpdateModalOpen } =
    useContext(ModalContext)
  console.log()
  const handleUpdate = () => {
    console.log(data, isUpdateModalOpen)
    updateModal()
    setMovieData(data as Movie)
  }
  // const { data: session } = useSession()

  // const [ablity, setAbility] = useState<AppAbility>()
  // console.log(ablity?.rules, "rulre.......................")
  // useEffect(() => {
  //   const getAbility = async () => {
  //     const abilities = await defineAbilitiesFor(
  //       session?.user.roleId as number,
  //       session?.user.id as string
  //     )
  //     console.log(abilities.rules, "abilities")
  //     setAbility(abilities)
  //   }
  //   getAbility()
  // }, [session?.user.roleId, session?.user.id])

  return (
    <IconButton color="primary" onClick={handleUpdate} aria-label="edit">
      <EditIcon />
    </IconButton>
  )
}

export default UpdateButton
