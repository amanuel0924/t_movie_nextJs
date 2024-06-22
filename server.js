// // import { createServer } from "node"
// const { createServer } = require("http")
// // import next from "next"
// const next = require("next")
// // import { Server } from "socket.io"
// const { Server } = require("socket.io")
// // import { deleteData } from "./src/actions/realtimeActions"
// const {
//   deleteData,
//   deleteDataEmmiter,
// } = require("./src/actions/realtimeActions.js")

// const dev = process.env.NODE_ENV !== "production"
// const hostname = "localhost"
// const port = 4000
// // when using middleware hostname and port must be provided below
// const app = next({ dev, hostname, port })
// const handler = app.getRequestHandler()

// app.prepare().then(() => {
//   const httpServer = createServer(handler)

//   const io = new Server(httpServer)

//   io.on("connection", (socket) => {
//     socket.on("dataChange", async () => {
//       // io.emit("onDataChange")
//       await deleteData(io)
//     })
//   })

//   httpServer
//     .once("error", (err) => {
//       console.error(err)
//       process.exit(1)
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`)
//     })
// })
