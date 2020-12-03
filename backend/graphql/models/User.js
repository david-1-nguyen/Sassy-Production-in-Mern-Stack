const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    admin: Boolean,
})

module.exports = model('user', userSchema)