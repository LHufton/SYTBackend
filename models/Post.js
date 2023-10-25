const { Schema } = require('mongoose')

const postSchema = new Schema(
  {
    title: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String },
    isPublic: { type: Boolean, default: false },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
)

module.exports = postSchema
