import config from 'config';
import ParentModel from '../models/parent.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ChildSchema from '../models/child.js'

dotenv.config()

export const getChildren = async (req, res) => {
  let response = await ParentModel.find({})
  res.status(201).json({ user: response });
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
    console.log('child: ', child)
    return res.status(202).json({ message: true, child })

  } catch (error) {
    return res.status(202).json({ message: false, error: error.message })
  }
}