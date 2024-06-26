import { Box, Paper } from "@mui/material"
import PagesHeader from "@/components/PagesHeader"
import { ModalProvider } from "@/components/programComponents/ModalContext"
import { db } from "@/db"
import ProgramForm from "@/components/programComponents/ProgramForm"
import {
  getAdminData,
  getCategories,
  getChannels,
  getTypes,
} from "@/actions/programActions"
import Table from "@/components/programComponents/ProgramTable"
import UpdateForm from "@/components/programComponents/UpdateForm"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

const Program = async ({ searchParams }: any) => {
  const channels = await getChannels()
  const type = await getTypes()
  const category = await getCategories()

  const session = await getServerSession(options)
  const data = await getAdminData(searchParams, session?.user as any)

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
