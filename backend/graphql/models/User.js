const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    admin: Boolean,
    bookingsHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: 'appointments'
        }
    ],
    phonenumber: String,
})

module.exports = model('users', userSchema)