import { Avatar, Box, Paper, Stack } from "@mui/material"
import PagesHeader from "@/components/PagesHeader"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { getCategoryMovieCounts, getUserData } from "@/actions/programActions"
import { Movie } from "@prisma/client"
import dynamic from "next/dynamic"

export interface MovieCount {
  categoryId: number
  _count: {
    id: number
  }
}

const MyChart = dynamic(() => import("@/components/adminComponets/PieChart"), {
  ssr: false,
})
const Overview = async () => {
  const categoryMoviecount: MovieCount[] = await getCategoryMovieCounts()
  const totalMovie: Movie[] = await getUserData()
  return (
    <Paper sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box
        justifyContent={"center"}
        sx={{ borderBottom: " solid 1px", marginBottom: 4 }}
      >
        <PagesHeader />
      </Box>
      <Stack
        justifyContent={"space-between"}
        spacing={2}
        direction="row"
        width={"100%"}
      >
        <Card elevation={5} sx={{ display: "flex", minWidth: 270 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography component="div" variant="h6">
                Channel
              </Typography>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: "#161638", width: 35, mt: 1, height: 35 }}
              ></Avatar>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                pl: 2,
                pb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                37
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                12+ ths Month
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card elevation={5} sx={{ display: "flex", minWidth: 270 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography component="div" variant="h6">
                Program
              </Typography>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: "#161638", width: 35, mt: 1, height: 35 }}
              ></Avatar>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                pl: 2,
                pb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {totalMovie?.length}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                12+ ths Month
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card elevation={5} sx={{ display: "flex", minWidth: 270 }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography component="div" variant="h6">
                System users
              </Typography>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: "#161638", width: 35, mt: 1, height: 35 }}
              ></Avatar>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                pl: 2,
                pb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                37
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                12+ ths Month
              </Typography>
            </Box>
          </Box>
        </Card>
      </Stack>
      <Stack>
        <MyChart data={categoryMoviecount} />
      </Stack>
    </Paper>
  )
}

export default Overview
