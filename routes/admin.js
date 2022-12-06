import express from 'express';
import { deleteParent, getStatics, fetchChildren, register, login, getParent } from '../controller/admin.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/stats', getStatics)
router.get('/delete-parent/:pid', deleteParent)
router.get('/childrens/:pid', fetchChildren)
router.post('/get-parent', getParent)

export default router;
