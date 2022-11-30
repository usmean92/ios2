import express from 'express';
import { deleteChild, getChildren, readPoems, register } from '../controller/child.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();


router.get('/', getChildren)

router.get('/poems', readPoems)

router.use(verifyToken)
router.post('/register', register)
router.get('/delete-child/:cid', deleteChild)

export default router;
