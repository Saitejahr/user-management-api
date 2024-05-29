import express from 'express'
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getProfile)
router.put('/', authMiddleware, updateProfile)
router.delete('/', authMiddleware, deleteProfile)

export default router
