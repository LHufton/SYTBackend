const { Comment } = require('../models')

const GetComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const CreateComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body })
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const UpdateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body,
      {
        new: true
      }
    )
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const DeleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.comment_id })
    res.send({
      msg: 'Comment Deleted',
      payload: req.params.comment_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetComments,
  CreateComment,
  UpdateComment,
  DeleteComment
}
