const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('newevents', {organizer: 1, dejt: 1})
    res.json(users)
  })

usersRouter.post('/', async (req, res) => {
    const dat = req.body

    const rounds = 10
    const passHash = await bcrypt.hash(dat.pass, rounds)

    const user = new User({
        username: dat.username,
        name: dat.name,
        passHash: passHash
    })

    const newUser = await user.save()
    res.json(newUser)
})

module.exports = usersRouter