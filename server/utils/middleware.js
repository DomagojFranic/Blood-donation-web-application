const logger = require('./logger')

const requestInfo = (req, res, next) => {  
  logger.info('Metoda:', req.method)
  logger.info('Putanja:', req.path)
  logger.info('Tijelo:', req.body)
  logger.info('---')
  next()
}

const unknownRoute = (req, res) => {
  res.status(404).send({ error: 'nepostojeca ruta' })
}

const errorHandler = (err, req, res, next ) => {
  logger.mistake(err.message);

  if (err.name === 'CastError') {
      return res.status(400).send({error: 'krivi format ID-a'})
  } else if (err.name === 'ValidationError'){
      return res.status(400).send({error: err.message})
  } else if (err.name === 'JsonWebTokenError'){
    return res.status(400).send({error: 'Neispravni token'})
}
  next(err)
}

module.exports = {requestInfo, unknownRoute, errorHandler}