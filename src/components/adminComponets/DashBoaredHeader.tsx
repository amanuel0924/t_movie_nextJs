"use client"

import { usePathname } from "next/navigation"
import React from "react"
import Typography from "@mui/material/Typography"

export default function DashBoaredHeader() {
  const pathname = usePathname()
  let header

  if (pathname.includes("channel")) {
    header = "Channel"
  } else if (pathname.includes("program")) {
    header = "Program"
  } else {
    header = "Dashboard"
  }

  return (
    <Typography variant="h6" noWrap component="div">
      {header}
    </Typography>
  )
}
