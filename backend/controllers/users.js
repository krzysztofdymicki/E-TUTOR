const config = require('../utils/config')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
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

  //CREATE ADMIN ACCOUNT

  if(body.admin === true && body.keyForAdminAccount === config.KEY_FOR_ADMIN_ACCOUNT) {
    const admin = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      admin: true
    })

    const savedAdmin = await admin.save()
    response.status(201).json(savedAdmin.toJSON())
  }

  //CREATE BASIC ACCOUNT

  console.log(body)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    admin: false,
    messages: [
      { author: new mongoose.Types.ObjectId('5ed29517735855437e0fca63'), content: 'Welcome!', date: new Date() }
    ]
  })
    
  const savedUser = await user.save()

  response.status(201).json(savedUser.toJSON())
})

// GET ALL USERS

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

// GET SPECIFIC USER

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User.findById(id)

  if(user) {
    response.status(200).json(user.toJSON())
  }else {
    response.status(404).json({error: 'User with this ID doesnt exists'}).end()
  }
})

// DELETE USER

usersRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await User.findByIdAndDelete(id)

  response.status(200).end()
})

// UPDATE USER (PARAM - VALUE)

usersRouter.put('/:id/update', async (request, response) => {
  const params = request.params
  const id = params.id
  const body = request.body


  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true })
  response.status(200).json(updatedUser.toJSON())
})


module.exports = usersRouter