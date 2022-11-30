import express from 'express';
import { getChildren, readPoems, register } from '../controller/child.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();


router.get('/', getChildren)

router.get('/poems', readPoems)

router.use(verifyToken)
router.post('/register', register)

export default router;
