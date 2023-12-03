import { Router } from 'express'
import * as controller from '../controllers/FeedController.js'

const router = Router()

router.get('/', controller.getFeed)

export default router
