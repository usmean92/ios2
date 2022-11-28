import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const QuizSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  status: {
    type: Array,
  },
  results: {
    type: Array,
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'child',
    required: true
  }

})
const QuizModel = mongoose.model('quiz', QuizSchema, 'Quizes')

export default QuizModel