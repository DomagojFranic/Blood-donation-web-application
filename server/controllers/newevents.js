const neweventsRouter = require('express').Router()
const Newevent = require('../models/newevent')
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const getToken = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}

neweventsRouter.get('/', async (req, res) => {
  const newevents = await Newevent.find({})
    .populate('user', { username: 1, name: 1 })
  res.json(newevents)
})

neweventsRouter.get('/:id', (req, res, next) => {
  Newevent.findById(req.params.id)
    .then(newevent => {
      if (newevent) {
        res.json(newevent)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

neweventsRouter.delete('/:id', async (req, res) => {
  console.log("Brisem poruku")
  const token = getToken(req)
  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'Neispravni token'})
  }
  console.log("ID KORISNIKA", dekToken.id)

  const rez = await Newevent.findOneAndDelete({_id:  mongoose.Types.ObjectId(req.params.id), user: mongoose.Types.ObjectId(dekToken.id) })
  console.log(rez)
  if(rez)
    res.send(rez)
  else
    res.status(204).send({message: "Ne postoji traženi podatak"})
})

neweventsRouter.put('/:id', (req, res) => {
  const dat = req.body
  const id = req.params.id

  const newevent = {
    dejt: dat.dejt,
    organizer: dat.organizer,
    location: dat.location,
    address: dat.address,
    time: dat.time,
    done: dat.done            
  }

  Newevent.findByIdAndUpdate(id, newevent, {new: true})
  .then( newNewevent => {
    res.json(newNewevent)
  })
  .catch(err => next(err))

})

neweventsRouter.post('/', async (req, res, next) => {
  const dat = req.body
  const token = getToken(req)

  const dekToken = jwt.verify(token, process.env.SECRET)
  if (!token || !dekToken.id){
    return res.status(401).json({error: 'Neispravni token'})
  }
  const user = await User.findById(dekToken.id)

  const newevent = new Newevent({
    dejt: dat.dejt,
    organizer: dat.organizer,
    location: dat.location,
    address: dat.address,
    time: dat.time,
    done: dat.done || false,
    user: user._id
  })

  const savedNewevent = await newevent.save()
  user.newevents = user.newevents.concat(savedNewevent._id)
  await user.save()

  res.json(savedNewevent)

})

module.exports = neweventsRouter