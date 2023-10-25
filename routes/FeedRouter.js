const express = require('express')
const router = express.Router()
const feedControl = require('../controllers/FeedController')

// Route to get the feed
router.get('/', feedControl.getFeed)

module.exports = router
