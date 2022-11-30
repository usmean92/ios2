import config from 'config';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ChildModel from '../models/child.js'
import { readFileSync, promises as fsPromises } from 'fs';


dotenv.config()

export const getChildren = async (req, res) => {
  let response = await ChildModel.find({})
  res.status(201).json({ user: response });
}
export const register = async (req, res) => {
  try {
    let data = req.body.data
    data.parent = req.verified.id
    const children = await ChildModel.find({ parent: req.verified.id })
    if (children.length === 5) {
      return res.status(202).json({ message: false, error: 'Sorry! You reached the limit to register kids' })
    }
    let child = await ChildModel.create(data)
    return res.status(202).json({ message: true, child })

  } catch (error) {
    return res.status(202).json({ message: false, error: error.message })
  }
}

export const deleteChild = async (req, res) => {

  const { cid } = req.params
  try {
    await ChildModel.findByIdAndDelete({ _id: cid })
    return res.status(202).json({ message: true, success: 'Child Deleted' })
  } catch (err) {
    return res.status(202).json({ message: false, error: error.message })
  }
}

export const readPoems = async (req, res) => {

  const filename = './data/poems.txt'
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const poems = contents.split(/\r?\n/);
    return res.status(202).json({ message: true, poems })
  } catch (err) {
    return res.status(202).json({ message: false, error: error.message })
  }
}