import express from 'express';
import { deleteParent, getStatics, fetchChildren } from '../controller/admin.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/stats', getStatics)
router.get('/delete-parent/:pid', deleteParent)
router.get('/childrens/:pid', fetchChildren)

export default router;
