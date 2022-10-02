const mongoose = require('mongoose')

const neweventSchema = new mongoose.Schema({
  dejt: {
    type: Date,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true,
    maxlength: 11
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

neweventSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Newevent', neweventSchema, 'newevents')
