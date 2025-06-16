import { Router } from 'express'
import {
  getAllUserKategori,
  createUserKategori,
  deleteUserKategori
} from '../controllers/userKategori.controller'
import { body, param } from 'express-validator'
import { validateRequest } from '../middlewares/validate'

const router = Router()

router.get('/', getAllUserKategori)
router.post(
  '/',
  [
    body('user_id').isUUID().withMessage('user_id harus UUID'),
    body('kategori_id').isUUID().withMessage('kategori_id harus UUID'),
    validateRequest
  ],
  createUserKategori
)
router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID tidak valid'), validateRequest],
  deleteUserKategori
)

export default router
