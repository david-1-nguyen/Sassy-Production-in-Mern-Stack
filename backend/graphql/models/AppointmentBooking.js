const { model, Schema } = require('mongoose')

const appointmentSchema = new Schema({
    createdAt: String,
    serviceType: {
      type: Schema.Types.ObjectId,
      ref: 'services'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    confirmed: Boolean,
})

module.exports = model('appointments', appointmentSchema)