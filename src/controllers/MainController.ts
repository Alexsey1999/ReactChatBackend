import { Request, Response } from 'express'
import date from '../utils/date'

import { Room } from '../models'

class MainController {
  static joinRoom(req: Request, res: Response) {
    const { name, room }: { name: string; room: string } = req.body

    Room.findOne({ roomName: room }, async (err: any, doc: any) => {
      if (err) {
        throw err
      }

      if (doc) {
        await Room.updateOne(
          { roomName: room },
          {
            $push: {
              users: { username: name },
            },
          }
        )
        res.json(doc)
        return
      } else {
        const newRoom = await new Room({
          roomName: room,
          users: [{ username: name }],
        }).save()
        res.json(newRoom)
      }
    })
  }

  static checkUser(req: Request, res: Response) {
    const { name, room }: { name: string; room: string } = req.body

    Room.findOne({ roomName: room }, async (err: any, doc: any) => {
      if (err) {
        throw err
      }

      if (doc.users.find((user: any) => user.username === name)) {
        res.json(true)
      } else {
        res.json(false)
      }
    })
  }

  static sendMessage(req: Request, res: Response) {
    interface IReqBody {
      user: string
      room: string
      message: string
    }

    const { user, room, message }: IReqBody = req.body

    Room.findOne({ roomName: room }, async (err: any, doc: any) => {
      if (err) {
        throw err
      }

      await Room.updateOne(
        { roomName: room },
        {
          $push: {
            messages: { user, room, message, date },
          },
        }
      )

      res.json('Сообщение успешно отправлено')
    })
  }

  static getRoomMessages(req: Request, res: Response) {
    interface IReqBody {
      room: string
    }

    const { room }: IReqBody = req.body

    Room.findOne({ roomName: room }, async (err: any, doc: any) => {
      if (err) {
        throw err
      }

      if (doc) {
        res.json(doc.messages)
      }
    })
  }

  static getRoom(req: Request, res: Response) {
    interface IReqBody {
      room: string
    }

    const { room }: IReqBody = req.body

    Room.findOne({ roomName: room }, async (err: any, doc: any) => {
      if (err) {
        throw err
      }

      if (doc) {
        res.json(doc)
      }
    })
  }

  static removeUser(req: Request, res: Response) {
    interface IReqBody {
      name: string
      room: string
    }

    const { name, room }: IReqBody = req.body

    Room.findOne({ roomName: room }, async (err: any, doc: any) => {
      if (err) {
        throw err
      }

      const newUsers = doc.users.filter((user: any) => user.username !== name)

      await Room.updateOne({ roomName: room }, { users: newUsers })

      res.json('Пользователь успешно удален')
    })
  }
}

export default MainController
