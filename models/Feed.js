const { Schema } = require('mongoose')

const feedSchema = new Schema(
  {
    content: { type: String, required: true },
    type: { type: String, enum: ['post', 'comment'], required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Feed' },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  },
  { timestamps: true }
)

// const Feed = model('Feed', feedSchema)

module.exports = feedSchema
