const { model, Schema } = require('mongoose')

const serviceSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    date: String,
    comments: [
        {
            body: String,
            username: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('services', serviceSchema)