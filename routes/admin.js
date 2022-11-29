import express from 'express';
import { getStatics } from '../controller/admin.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

// router.use(verifyToken)
router.get('/stats', getStatics)

export default router;
