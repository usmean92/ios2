import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'parent',
    required: true
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  messages: {
    type: Array
  }

}, { timestamps: true })
const ChatModel = mongoose.model('chat', ChatSchema, 'Chat')

export default ChatModel