import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ParentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  password: {
    type: String,
    required: true
  },
  expires: {
    type: String
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  amount_paid: {
    type: Number,
    default: 0
  }

})

ParentSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})

ParentSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}
const ParentModel = mongoose.model('parent', ParentSchema, 'Parents')

export default ParentModel