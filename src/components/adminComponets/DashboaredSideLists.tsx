"use client"
import { List, ListItem } from "@mui/material"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { SideListItem } from "@/app/admin/layout"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AppAbility } from "@/db/reactCasl"

function DashboaredSideLists({
  lists,
}: // ability,
{
  lists: SideListItem[]
  // ability: AppAbility
}) {
  const pathname = usePathname()

  return (
    <List>
      {lists.map((list) => (
        <Link href={list.path} key={list.text}>
          <ListItem
            disablePadding
            sx={
              pathname === list.path
                ? {
                    backgroundColor: "#181A41",
                    color: "white",
                    paddingLeft: "30px",
                    "&:hover": { backgroundColor: "#181A41" },
                  }
                : {
                    paddingLeft: "30px",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }
            }
          >
            <ListItemButton>
              <ListItemIcon
                sx={
                  pathname === list.path
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {list.icon}
              </ListItemIcon>
              <ListItemText primary={list.text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

export default DashboaredSideLists
