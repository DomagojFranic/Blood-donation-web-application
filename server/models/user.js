const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passHash: String,
    newevents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Newevent'
        }
    ]
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passHash
        return ret
    }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User