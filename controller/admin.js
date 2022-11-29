import config from 'config';
import ParentModel from '../models/parent.js'
import ChildModel from '../models/child.js';
import dotenv from 'dotenv'
dotenv.config()

export const getStatics = async (req, res) => {
  let parents = await ParentModel.find({})
  let childs = await ChildModel.find({})

  let stats = [parents.length, childs.length]

  res.status(201).json({ stats });
}
export const register = async (req, res) => {
  try {
    let data = req.body.data
    data.parent = req.verified.id
    const children = await ChildSchema.find({ parent: req.verified.id })
    if (children.length === 5) {
      return res.status(202).json({ message: false, error: 'Sorry! You reached the limit to register kids' })
    }
    let child = await ChildSchema.create(data)
    return res.status(202).json({ message: true, child })

  } catch (error) {
    return res.status(202).json({ message: false, error: error.message })
  }
}