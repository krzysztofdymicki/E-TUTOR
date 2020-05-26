const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const usersRouter = require('./controllers/users')

const middleware = require('./utils/middleware')

console.log('Connecting to mongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
		console.log('connected to mongoDB')
	})
	.catch((error) => {
		console.log('error with connecting to mongoDB', error.message)
	})

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
