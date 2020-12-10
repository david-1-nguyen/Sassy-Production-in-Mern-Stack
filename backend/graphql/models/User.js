const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    admin: Boolean,
    bookingsHistory: [
        {
            createdAt: String,
            serviceType: Schema.Types.ObjectId,
            creator: Schema.Types.ObjectId,
        }
    ],
    phonenumber: String,
})

module.exports = model('user', userSchema)