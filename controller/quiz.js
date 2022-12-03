import QuizModel from '../models/quiz.js'
import dotenv from 'dotenv'
dotenv.config()

export const getQuizes = async (req, res) => {
  let quizes = await QuizModel.find({})
  console.log('qq: ', quizes.length)
  res.status(202).json({ message: true, quizes });
}

export const getQuiz = async (req, res) => {
  let quiz = await QuizModel.find({ _id: req.params.qid }).populate('user')
  if (quiz.length) {
    return res.status(202).json({ message: true, quiz });
  }
  return res.status(202).json({ message: false, error: 'No quiz found' });

}

export const getUserQuizes = async (req, res) => {

  let quizes = await QuizModel.find({ child: req.params.childId }).populate('user')
  if (quizes.length) {
    return res.status(202).json({ message: true, quizes });
  }
  return res.status(202).json({ message: false, error: 'No quizes found' });
}

export const createQuiz = async (req, res) => {
  let results = [], status = []
  let { course, child } = req.body;

  for (var i = 0; i < course.items; i++) {
    results[i] = null
    status[i] = 'unattemped'
  }

  let quiz = await QuizModel.find({ course: course.title, child })
  if (quiz.length) {
    return res.status(202).json({ message: false, error: 'Quiz already created' });
  }
  quiz = await QuizModel.create({ course: course.title, child, status, results })
  return res.status(202).json({ message: true, quiz });
}

export const updateQuiz = async (req, res) => {
  let { index } = req.body
  console.log('id: ', req.params.qid)
  try {
    let quiz = await QuizModel.findById({
      _id: req.params.qid
    })
    if (!quiz) res.status(202).json({ message: false, error: 'Quiz not found' });
    let { results, status } = quiz
    results[index] = 'pass'
    status[index] = 'completed'
    quiz = await QuizModel.findByIdAndUpdate({
      _id: req.params.qid
    }, { status, results }, { new: true })
    res.status(202).json({ message: true, quiz });
  } catch (err) {
    res.status(202).json({ message: false, error: err.message });
  }
}

export const courseQuiz = async (req, res) => {
  let { title } = req.body
  let quizes = await QuizModel.find({ course: title, child: req.params.childId })
  if (quizes.length) {
    return res.status(202).json({ message: true, quizes });
  }
  return res.status(202).json({ message: false, error: 'No Quiz found' });
}