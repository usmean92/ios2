import express from 'express';
import { createConversation, deleteConversation, deleteAllConversations, fetchConversation, getConversations } from '../controller/chat.js';

const router = express.Router();

router.post('/post-conversation', createConversation)
router.post('/conversation', fetchConversation)
router.get('/delete', deleteAllConversations)
router.get('/delete-conversation/:conversationId', deleteConversation)

router.get('/', getConversations)

export default router;
