import express from 'express';
import { signup, login, forgotPassword, resetPassword, getParents, fetchChildren, payment } from '../controller/parent.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/', getParents)
router.post('/signup', signup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.use(verifyToken)
router.get('/childrens', fetchChildren)
router.get('/subscribe', payment)

export default router;