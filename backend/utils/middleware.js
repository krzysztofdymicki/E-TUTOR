
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  //MONGOOSE ERRORS

  if(error.name === 'CastError') {
    return response.status(400).json({error: 'Cast Error', errorKind: error.kind})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}