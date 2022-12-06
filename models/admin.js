import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const AdminSchemaa = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  }

}, { timestamps: true })

AdminSchemaa.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})


AdminSchemaa.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}
const AdminModel = mongoose.model('admin', AdminSchemaa, 'Admin')

export default AdminModel