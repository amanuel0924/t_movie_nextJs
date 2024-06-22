"use client"
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material"
import { useState, useEffect } from "react"
import { getUserData } from "@/actions/programActions"
// import { socket } from "@/socket"

type Movie = {
  id: number
  title: string | null
  duration: number
  description: string
  status: boolean
  channelId: number
  typeId: number
  categoryId: number
  videoUrl: string | null
  released: Date
}[]

const MovieCountCard = () => {
  // const [isConnected, setIsConnected] = useState(false)
  // const [transport, setTransport] = useState("N/A")
  const [data, setData] = useState<Movie | null>(null)

  const handleServerAction = async () => {
    try {
      const data: Movie = await getUserData()
      setData(data)
      console.log("onDataChange acction emiited")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // if (socket.connected) {
    //   onConnect()
    // }

    // function onConnect() {
    //   setIsConnected(true)
    //   setTransport(socket.io.engine.transport.name)

    //   socket.io.engine.on("upgrade", (transport) => {
    //     setTransport(transport.name)
    //   })
    // }

    // function onDisconnect() {
    //   setIsConnected(false)
    //   setTransport("N/A")
    // }

    handleServerAction()

    // socket.on("onDataChange", handleServerAction)
    // socket.on("connect", onConnect)
    // socket.on("disconnect", onDisconnect)

    // return () => {
    //   socket.off("connect", onConnect)
    //   socket.off("disconnect", onDisconnect)
    //   socket.off("onDataChange", handleServerAction)
    // }
  }, [])

  // console.log(isConnected, transport)
  return (
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
            {data?.length}
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
  )
}

export default MovieCountCard
