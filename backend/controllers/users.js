const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// SIGNUP REQUEST

usersRouter.post('/signup', async (request, response) => {
	const body = request.body

	if(body.password.length < 6) {
		response.status(400).json({ error: 'Too short password, min 6 signs'}).end()
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})
    
	const savedUser = await user.save()

	response.status(400).json(savedUser)
})

// GET ALL USERS

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter