import express from 'express';
import { createConversation, deleteConversations, fetchConversation, getConversations } from '../controller/chat.js';

const router = express.Router();

router.post('/post-conversation', createConversation)
router.post('/conversation', fetchConversation)
router.get('/delete', deleteConversations)
router.get('/', getConversations)

export default router;
