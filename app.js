import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './service/db.js'

const PORT = process.env.PORT || 8000;
import ParentRoutes from './routes/parent.js'
import ChildRoutes from './routes/child.js'
import QuizRoutes from './routes/quiz.js'
import AdminRoutes from './routes/admin.js'



const app = express()
app.use(cors())
dotenv.config()
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use('/parent', ParentRoutes)
app.use('/child', ChildRoutes)
app.use('/quiz', QuizRoutes)
app.use('/admin', AdminRoutes)

app.listen(PORT, function (error) {
  if (error) throw error
  console.log("Server started successfully on port", PORT)
})