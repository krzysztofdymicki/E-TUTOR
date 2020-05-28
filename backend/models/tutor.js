const mongoose = require('mongoose')


const tutorSchema = new mongoose.Schema({
  subjects: [  
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
        
    }
  ]
})

tutorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Tutor = new mongoose.model('Tutor', tutorSchema)

module.exports = Tutor