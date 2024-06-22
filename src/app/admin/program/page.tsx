import { Box, Paper } from "@mui/material"
import PagesHeader from "@/components/PagesHeader"
import { ModalProvider } from "@/components/programComponents/ModalContext"
import { db } from "@/db"
import ProgramForm from "@/components/programComponents/ProgramForm"
import { getAdminData } from "@/actions/programActions"
import Table from "@/components/programComponents/ProgramTable"
import UpdateForm from "@/components/programComponents/UpdateForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const Program = async ({ searchParams }: any) => {
  const channels = await db.channel.findMany()
  const type = await db.type.findMany()
  const category = await db.category.findMany()

  const session = await getServerSession()
  console.log("setiion", session)
  const data = await getAdminData(searchParams, session?.user.roleId as number)

  return (
    <Paper sx={{ padding: 1 }}>
      <Box sx={{ borderBottom: " solid 1px" }}>
        <ModalProvider>
          <PagesHeader />
          <Table {...data} />
          <ProgramForm categorys={category} channels={channels} types={type} />
          <UpdateForm categorys={category} channels={channels} types={type} />
        </ModalProvider>
      </Box>
    </Paper>
  )
}

export default Program
