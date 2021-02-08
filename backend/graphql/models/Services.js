const { model, Schema } = require('mongoose')

const serviceSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    date: String,

})

module.exports = model('services', serviceSchema)