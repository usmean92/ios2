import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ChildSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    require: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'parent',
    required: true
  }

}, { timestamps: true })
const ChildModel = mongoose.model('child', ChildSchema, 'Childs')

export default ChildModel