import { Box, Paper } from "@mui/material"
import PagesHeader from "@/components/PagesHeader"
import { ModalProvider } from "@/components/channelComponents/ModalContext"
import { db } from "@/db"
import RoleForm from "@/components/roleComponents/RoleForm"
import { getPermition } from "@/actions/userActions"
import Table from "@/components/roleComponents/RoleTable"
import UpdateForm from "@/components/channelComponents/UpdateForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Permission } from "@prisma/client"

const Role = async () => {
  const data = (await getPermition()) ?? []
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }
  return (
    <Paper sx={{ padding: 2 }}>
      <Box sx={{ borderBottom: " solid 1px" }}>
        <ModalProvider>
          <PagesHeader />
          {/* <Table {...data} /> */}
          <RoleForm permission={data} />
        </ModalProvider>
      </Box>
    </Paper>
  )
}

export default Role
