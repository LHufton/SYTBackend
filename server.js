require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const AuthRouter = require('./routes/AuthRouter')
const CommentRouter = require('./routes/CommentRouter')
const PostRouter = require('./routes/PostRouter')
const FeedRouter = require('./routes/FeedRouter')

const app = express()
const PORT = process.env.PORT || 3001

const corsOptions = {
  origin: [
    'http://localhost:5173',
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

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Oops! Something broke!')
})
