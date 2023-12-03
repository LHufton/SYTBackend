import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'

import AuthRouter from './routes/AuthRouter.js'
import CommentRouter from './routes/CommentsRouter.js'
import PostRouter from './routes/PostRouter.js'
import FeedRouter from './routes/FeedRouter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const corsOptions = {
  origin: [
    'http://localhost:5173', // Add your frontend development server URL
    'https://syt-frontend-1-687106a3c54f.herokuapp.com/'
  ],
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))
app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.error('MongoDB connection error: ', err))

app.use('/auth', AuthRouter)
app.use('/comments', CommentRouter)
app.use('/posts', PostRouter)
app.use('/feed', FeedRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})

export default app // Export the app instance to use in other scripts
