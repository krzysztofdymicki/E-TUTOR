const mongoose = require('mongoose')


const tutorSchema = new mongoose.Schema({
	subjects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subject'
		}
	]
})

const Tutor = new mongoose.model('Tutor', tutorSchema)