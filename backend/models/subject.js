const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const subjectSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	tutors: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tutor'
	}]
})

subjectSchema.plugin(validator)

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject