const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  author: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    maxlength: 800
  },
  date: Date
})

module.exports = messageSchema