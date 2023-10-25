const { Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

module.exports = commentSchema
