import { Document, model, Schema } from 'mongoose'

interface IUser {
  username: string
}

interface IRoom extends Document {
  roomName: string
  users: IUser[]
}

const RoomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  users: {
    type: [{ username: String }],
    required: true,
  },
  messages: {
    type: [
      {
        user: {
          type: String,
          required: true,
        },
        room: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
})

export default model<IRoom>('room', RoomSchema)
