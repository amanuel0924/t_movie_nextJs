import React from "react"
import Switch from "@mui/material/Switch"
import { toglerStatus } from "@/actions/programActions"

type SwitchProps = {
  checked: boolean
  id: number
}

export default function Switchd({ checked, id }: SwitchProps) {
  const toglerStatusAction = toglerStatus.bind(null, id)

  return (
    <form action={toglerStatusAction}>
      <Switch
        type="submit"
        checked={checked}
        inputProps={{ "aria-label": "controlled" }}
      />
    </form>
  )
}
