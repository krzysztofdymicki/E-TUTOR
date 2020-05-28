const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  level : {
    type: String,
    enum: [                         //CHECKS IF THE LEVEL IS APPROPRIATE, WHEN ADDING NEW SUBJECT
      'pre-primary',
      'single structure primary',
      'lower secondary education',
      'upper secondary',
      'higher education']
  },
  category : {
    type: String,
    enum: [
      'science',
      'human science'
    ]
  },
  tutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor'
  }]
})

subjectSchema.plugin(validator)

subjectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject