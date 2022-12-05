import config from 'config';
import ParentModel from '../models/parent.js'
import ChildModel from '../models/child.js';
import QuizModel from '../models/quiz.js';
import dotenv from 'dotenv'
dotenv.config()

export const getStatics = async (req, res) => {
  let parents = await ParentModel.find({})
  let childs = await ChildModel.find({})
  const subscribed = parents.filter(item => item.subscribed === true)
  const unsubscribed = parents.filter(item => item.subscribed === false)
  let stats = [parents.length, childs.length, subscribed.length, unsubscribed.length]
  res.status(201).json({ stats });
}

export const deleteParent = async (req, res) => {
  const { pid } = req.params
  await ParentModel.findByIdAndDelete({ _id: pid })
  const childs = await ChildModel.find({ parent: pid })
  await ChildModel.deleteMany({ parent: pid })

  childs.map(async (item, index) => {
    let cc = await QuizModel.deleteMany({ child: item })
  })
  return res.status(201).json({ message: true, success: 'Delete' });
}

export const fetchChildren = async (req, res, next) => {
  try {
    const { pid } = req.params
    const children = await ChildModel.find({ parent: pid })
    if (children.length == 0) {
      return res.status(202).json({ message: false, error: 'No children registered yet' })
    }
    return res.status(202).json({ message: true, children })

  } catch (error) {
    return res.status(202).json({ message: false, error: error.message })

  }
}
