const subjectsRouter = require('express').Router()
const Subject = require('../models/subject')

// CREATE NEW SUBJECT (WITH LEVEL)

subjectsRouter.post('/', async (request, response) => {
  const body = request.body

  const newSubject = new Subject({
    ...body
  })

  const savedSubject = await newSubject.save()

  response.status(200).json(savedSubject.toJSON())
})


// GET ALL SUBJECTS

subjectsRouter.get('/', async (request, response) => {
  const subjects = await Subject.find({})

  response.status(200).json(subjects.map(s => s.toJSON()))
})

// GET SPECIFIC SUBJECTS (BY ID)

subjectsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const subject = Subject.findById(id) 

  response.status(200).json(subject.toJSON)
})

// UPDATE SUBJECT

subjectsRouter.put('/:id/update', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const updatedSubject = await Subject.findByIdAndUpdate(id, body, { new: true })

  response.status(200).json(updatedSubject.toJSON())
})

// DELETE SUBJECT

subjectsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Subject.findByIdAndDelete(id)

  response.status(200).json({ info: `subject with id ${id} was successfully deleted`})
})

module.exports = subjectsRouter