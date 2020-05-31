const mongoose = require('mongoose')

const opinionAddedSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    maxlength: [600, 'Too long comment'],
    minlength: [14, 'Too short comment'],
    date: Date
  }
})

const opinionReceivedSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    minlength: [14, 'Too short comment'],
    maxlength: [600, 'Too long comment']
  },
  date: Date
})

module.exports = {
  opinionReceivedSchema,
  opinionAddedSchema
}