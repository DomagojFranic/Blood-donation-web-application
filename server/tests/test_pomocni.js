const Newevent = require('../models/newevent')	
const User = require('../models/user')	

const startingNewevents = [
    {
      id: 1,
      dejt: '2022-08-06T00:00:00.000+00:00',
      organizer: "DDK GDCK Split, DDK Torcida Brda",
      location: "Prostorije ŠRC Brda",
      address: "Širokobriješka ulica 1, 21000 Split", 
      time: "09:00-12:00",
      done: true
    },
    {
      id: 2,
      dejt: '2022-08-08T00:00:00.000+00:00',
      organizer: "KBC Split",
      location: "Odjel za transfuziju KBC-a Split",
      address: "Spinčićeva 1, 21000 Split", 
      time: "07:30-15:00",
      done: false
    },
    {
      id: 3,
      dejt: '2022-08-09T00:00:00.000+00:00',
      organizer: "KBC Split",
      location: "Odjel za transfuziju KBC-a Split",
      address: "Spinčićeva 1, 21000 Split", 
      time: "07:30-15:00",
      done: true
    }
  ]

const neweventsFromBase = async () => {
  const newevents = await Newevent.find({})
  return newevents.map(ne => ne.toJSON())
}

const usersInBase = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  startingNewevents, neweventsFromBase, usersInBase
}