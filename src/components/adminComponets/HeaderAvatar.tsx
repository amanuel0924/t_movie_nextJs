"use client"
import React, { useState } from "react"
import { IconButton, Button, Menu, MenuItem, Typography } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { signOut } from "next-auth/react"

export default function HeaderAvatar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOutUser = async () => {
    await signOut({ callbackUrl: "/", redirect: true })
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ marginTop: "30px" }}
      >
        <MenuItem
          sx={{
            padding: "10px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderBottom: "solid 1px",
          }}
        >
          <AccountCircleOutlinedIcon fontSize="large" />
          <Typography textAlign="center">Admin</Typography>
          <Typography variant="caption" display="block" textAlign="center">
            admin@email.com
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "red",
            fontSize: "12px",
          }}
        >
          <Button onClick={signOutUser} variant="text" color="error">
            LOGOUT
          </Button>
        </MenuItem>
      </Menu>
    </>
  )
}
