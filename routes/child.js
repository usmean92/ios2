import express from 'express';
import { getChildren, register } from '../controller/child.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();


router.get('/', getChildren)

router.use(verifyToken)
router.post('/register', register)

export default router;
