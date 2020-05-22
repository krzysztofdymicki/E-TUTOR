const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

console.log('Connecting to mongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
		console.log('connected to mongoDB')
	})
	.catch((error) => {
		console.log('error with connecting to mongoDB', error.message)
	})

module.exports = app
