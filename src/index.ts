import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

dotenv.config()

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

io.on('connection', (socket: Socket) => {
  console.log(123)
})

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
