const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const datas = req.body

  const user = await User.findOne({username: datas.username})
  const passOk = user === null
  ? false
  : await bcrypt.compare(datas.pass, user.passHash)

  if(!(user && passOk)) {
      return res.status(401).json({
          error: 'Ne postoji korisnik ili neispravna lozinka'
      })
  }

  const userToken = {
      username: user.username,
      id: user._id
  }

  const token = jwt.sign(userToken, process.env.SECRET)

  res.status(200).send({
      token, username: user.username, name: user.name
  })
})

module.exports = loginRouter