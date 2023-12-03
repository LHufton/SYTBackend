import { Router } from 'express'
import * as controller from '../controllers/CommentsController.js'
import * as middleware from '../middleware/index.js'

const router = Router()

router.get('/', controller.GetComments)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateComment
)
router.put(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateComment
)
router.delete(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteComment
)

export default router
