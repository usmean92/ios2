import config from 'config';
import AdminModel from '../models/admin.js'
import ParentModel from '../models/parent.js'
import ChildModel from '../models/child.js';
import QuizModel from '../models/quiz.js';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await AdminModel.findOne({ email: email }).exec()) {
      res.status(201).json({ message: false, error: 'Already Exists' });
    }
    else {
      let admin = await AdminModel.create({ name, email, password });
      res.status(201).json({ message: true, admin });
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await AdminModel.findOne({ email: email })
    if (!admin)
      return res.status(201).json({ message: false, error: 'User not found' })


    const validate = await admin.isValidPassword(password)
    if (!validate) {
      return res.status(201).json({ message: false, error: 'Wrong password' });
    }

    jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
      process.env.JWT_KEY,
      { expiresIn: "3h" },
      (err, token) => {
        try {
          return res.status(201).json({ message: true, token, admin });
        } catch (error) {
          return res.status(202).json({ message: false, error: error.message });
        }
      }
    )
  }
  catch (err) {
    console.log(err.message)
  }
}

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
export const getParent = async (req, res) => {
  const { conversations } = req.body
  let parents = []
  let count = 0;
  try {
    conversations.map(async (item) => {
      let parent = await ParentModel.findById({ _id: item.sender })
      if (parent) {
        parents.push(parent)
        count++;
      }
      if (count === conversations.length) {
        return res.status(201).json({ parents });
      }
    })
  } catch (error) {
    return res.status(201).json({ message: false, error: error.message });

  }
}