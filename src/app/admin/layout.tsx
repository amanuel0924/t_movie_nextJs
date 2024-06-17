import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import NotificationsIcon from "@mui/icons-material/Notifications"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { LeafIcon, ChannelIcon, ProgramIcons } from "@/components/icons"
import DashboaredSideLists from "@/components/adminComponets/DashboaredSideLists"
import DashBoaredHeader from "@/components/adminComponets/DashBoaredHeader"
import HeaderAvatar from "@/components/adminComponets/HeaderAvatar"

interface DashboaredProps {
  children: React.ReactNode
}
const drawerWidth = 240
export interface SideListItem {
  text: string
  icon: React.ReactNode
  path: string
}

const lists: SideListItem[] = [
  {
    text: "Overview",
    icon: <DashboardIcon />,
    path: "/admin",
  },
  {
    text: "Channel",
    icon: <ChannelIcon />,
    path: "/admin/channel",
  },
  {
    text: "Program",
    icon: <ProgramIcons />,
    path: "/admin/program",
  },
]

export default async function Dashboard({ children }: DashboaredProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#181A41",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <DashBoaredHeader />
          <div>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <NotificationsIcon />
            </IconButton>
            <HeaderAvatar />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.4)",
          }}
        >
          <LeafIcon />
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h6"
            noWrap
            component="div"
          >
            T-Movie
          </Typography>
        </Toolbar>
        <Divider />
        <DashboaredSideLists lists={lists} />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
