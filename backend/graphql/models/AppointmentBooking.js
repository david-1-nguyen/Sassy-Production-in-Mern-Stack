const { model, Schema } = require('mongoose')

const appointmentSchema = new Schema({
    confirmed: Boolean,
    createdAt: String,

    serviceType: String
})

module.exports = model('appointments', appointmentSchema)