import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import date from './utils/date'

import { mainRoute } from './routes'

import './core/db'

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
  socket.on('joinRoom', (payload) => {
    socket.join(payload.room)

    socket.emit('message', {
      user: 'admin',
      message: `Добро пожаловать ${payload.name}`,
      date,
    })

    socket.broadcast.to(payload.room).emit('update', {
      username: payload.name,
    })

    socket.broadcast.to(payload.room).emit('message', {
      user: 'admin',
      message: `${payload.name} вошел в чат`,
      date,
    })
  })

  socket.on('disconnectUser', (payload) => {
    socket.broadcast.to(payload.room).emit('message', {
      user: 'admin',
      message: `${payload.name} покинул чат`,
      date,
    })

    socket.broadcast.to(payload.room).emit('removeUser', {
      username: payload.name,
    })
  })

  socket.on('joinRoomOnReloadPage', (payload) => {
    socket.join(payload.room)
  })

  socket.on('chatMessage', (payload) => {
    io.to(payload.room).emit('message', {
      user: payload.user,
      room: payload.room,
      message: payload.message,
      date,
    })
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
    socket.disconnect(true)
  })
})

app.use('/', mainRoute)

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
