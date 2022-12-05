import express from 'express';
import { deleteChild, getChildren, getReport, readPoems, register } from '../controller/child.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();


router.get('/', getChildren)

router.get('/poems', readPoems)

router.use(verifyToken)
router.post('/register', register)
router.get('/delete-child/:cid', deleteChild)
router.post('/report/:cid', getReport)


export default router;
