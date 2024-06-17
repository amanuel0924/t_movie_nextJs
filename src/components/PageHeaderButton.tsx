"use client"
import { Button } from "@mui/material"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import { ModalContext } from "@/components/programComponents/ModalContext"

export default function PageHeaderButton() {
  const { openModal } = useContext(ModalContext)
  const location = usePathname()
  return (
    <Button
      size="medium"
      onClick={() => {
        openModal()
      }}
      sx={{ color: "white", bgcolor: "#181A41" }}
      variant={"contained"}
    >
      {location.includes("channel")
        ? "Add Channel"
        : location.includes("program")
        ? "Add Program"
        : "Add Filter"}
    </Button>
  )
}
