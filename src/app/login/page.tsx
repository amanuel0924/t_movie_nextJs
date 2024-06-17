import React from "react"
import { Stack, Typography } from "@mui/material"
import Login_form from "@/components/Login_form"

export default function page() {
  return (
    <Stack height={"100vh"} width={"100%"} direction={"row"}>
      <Stack
        height={"100%"}
        width={"50%"}
        bgcolor={"#000000"}
        display={{ xs: "none", md: "block" }}
      >
        <Stack
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant={"h1"}
            sx={{ color: "lightgray", fontWeight: "600" }}
          >
            T-Movie
          </Typography>
        </Stack>
      </Stack>
      <Stack width={"50%"} alignItems={"center"}>
        <Login_form />
      </Stack>
    </Stack>
  )
}
