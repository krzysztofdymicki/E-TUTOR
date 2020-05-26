const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const subjectSchema = new mongoose.Schema({
    name: String,
    tutors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor'
    }]
})