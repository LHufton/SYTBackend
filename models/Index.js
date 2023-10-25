const mongoose = require('mongoose')
const userSchema = require('./User')
const postSchema = require('./Post')
const commentSchema = require('./Comment')
const feedSchema = require('./Feed')

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)
const Feed = mongoose.model('Feed', feedSchema)

module.exports = {
  User,
  Post,
  Comment,
  Feed
}
