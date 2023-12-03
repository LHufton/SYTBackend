import { Router } from 'express'
import * as controller from '../controllers/AuthController.js'
import * as middleware from '../middleware/index.js'

const router = Router()

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

export default router
