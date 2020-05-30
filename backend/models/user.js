const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const messageSchema = require('./schemas/message')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 8,
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: String,
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  },
  admin: {
    type: Boolean,
    default: false
  },
  messages: {
    type: [messageSchema]
  }
}
)

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User',userSchema)

module.exports = User