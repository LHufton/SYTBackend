const Feed = require('../models/feed')

// Controller action to get the feed
const getFeed = async (req, res) => {
  try {
    const feed = await Feed.find().sort({ createdAt: -1 })
    res.json(feed)
  } catch (error) {
    console.error('Error retrieving feed:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getFeed
}
