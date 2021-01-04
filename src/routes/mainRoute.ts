import { Router } from 'express'

import { MainController } from '../controllers'

const mainRoute = Router()

//eslint-disable-next-line @typescript-eslint/unbound-method
mainRoute.post('/join', MainController.joinRoom)
mainRoute.post('/checkuser', MainController.checkUser)
mainRoute.post('/sendmessage', MainController.sendMessage)
mainRoute.post('/messages', MainController.getRoomMessages)
mainRoute.post('/room', MainController.getRoom)
mainRoute.post('/removeuser', MainController.removeUser)

export default mainRoute
