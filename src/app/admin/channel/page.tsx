import { Box, Paper } from "@mui/material"
import PagesHeader from "@/components/PagesHeader"
import { ModalProvider } from "@/components/channelComponents/ModalContext"
import { db } from "@/db"
import ProgramForm from "@/components/channelComponents/ChannelForm"
import { getAdminData } from "@/actions/channelActions"
import Table from "@/components/channelComponents/ChannelTable"
import UpdateForm from "@/components/channelComponents/UpdateForm"

const Channel = async ({ searchParams }: any) => {
  const data = await getAdminData(searchParams)

  return (
    <Paper sx={{ padding: 2 }}>
      <Box sx={{ borderBottom: " solid 1px" }}>
        <ModalProvider>
          <PagesHeader />
          <Table {...data} />
          <ProgramForm />
          <UpdateForm />
        </ModalProvider>
      </Box>
    </Paper>
  )
}

export default Channel
