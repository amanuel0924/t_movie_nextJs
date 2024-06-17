import { Box, Paper } from "@mui/material"
import PagesHeader from "@/components/PagesHeader"
import { ModalProvider } from "@/components/programComponents/ModalContext"
import { db } from "@/db"
import ProgramForm from "@/components/programComponents/ProgramForm"
import { getAdminData } from "@/actions/programActions"
import Table from "@/components/programComponents/ProgramTable"
import UpdateForm from "@/components/programComponents/UpdateForm"

const Program = async ({ searchParams }: any) => {
  const channels = await db.channel.findMany()
  const type = await db.type.findMany()
  const category = await db.category.findMany()
  const data = await getAdminData(searchParams)

  return (
    <Paper sx={{ padding: 2 }}>
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
