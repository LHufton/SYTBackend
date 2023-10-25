const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const AuthRouter = require('./routes/AuthRouter')
const CommentRouter = require('./routes/CommentRouter')
const PostRouter = require('./routes/PostRouter')
const FeedRouter = require('./routes/FeedRouter')

const PORT = process.env.PORT || 3001

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

app.use(cors())
app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
