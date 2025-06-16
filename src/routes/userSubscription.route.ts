import { Router } from 'express'
import {
  getAllUserSubscriptions,
  createUserSubscription,
  deleteUserSubscription
} from '../controllers/userSubscription.controller'
import { body, param } from 'express-validator'
import { validateRequest } from '../middlewares/validate'

const router = Router()

router.get('/', getAllUserSubscriptions)
router.post(
  '/',
  [
    body('user_id').isUUID().withMessage('user_id harus UUID'),
    body('subscription_type').isUUID().withMessage('subscription_type harus UUID'),
    validateRequest
  ],
  createUserSubscription
)
router.delete(
  '/:id',
  [
    param('id').isUUID().withMessage('ID tidak valid'), 
    validateRequest
],
  deleteUserSubscription
)

export default router
