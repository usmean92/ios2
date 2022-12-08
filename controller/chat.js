import ChatModel from '../models/chat.js'


export const getConversations = async (req, res) => {
  let conversation = await ChatModel.find({})
  return res.status(202).json({ conversation })
}

export const createConversation = async (req, res) => {
  let { senderId, recieverId, chat, role } = req.body
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let conversation = await ChatModel.findOne({ sender: senderId })
  if (!conversation) {
    conversation = await ChatModel.create({ sender: senderId, reciever: recieverId })
  }

  let messages = conversation.messages
  const date = new Date();
  const day = weekday[date.getDay()]
  const currentTime = date.getHours() + ":" + date.getMinutes()
  const currentDate = date.toLocaleDateString("de-DE");
  const sendTime = day + ' ' + currentDate + ' ' + currentTime
  let newChat = {
    text: chat,
    user: role == 'admin' ? recieverId : senderId,
    time: sendTime
  }
  messages.push(newChat)
  conversation = await ChatModel.findByIdAndUpdate({ _id: conversation._id }, { messages })

  return res.status(202).json({ conversation })
}

export const fetchConversation = async (req, res) => {
  let { senderId, recieverId } = req.body

  console.log('gg: ', recieverId, 'ss: ', senderId)
  let conversation = await ChatModel.find({ $or: [{ sender: senderId }, { reciever: recieverId }] })
  console.log('fsf: ', conversation)
  return res.status(202).json({ conversation })
}

export const deleteAllConversations = async (req, res) => {
  let conversation = await ChatModel.deleteMany({})
  return res.status(202).json({ conversation })
}


export const deleteConversation = async (req, res) => {
  let { conversationId } = req.params
  let conversation = await ChatModel.findByIdAndDelete({ _id: conversationId })
  if (!conversation) return res.status(202).json({ message: false, error: ' Invalid Conversation' })

  return res.status(202).json({ message: true, success: 'Conversation Deleted' })
}
