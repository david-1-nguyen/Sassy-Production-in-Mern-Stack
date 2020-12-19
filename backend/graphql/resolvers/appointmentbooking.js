const Appointment = require('../models/AppointmentBooking')
const Services = require('../models/Services')
const checkAuth = require('../../utils/checkAuth')
const User = require('../models/User')

module.exports = {
    Query: {
        async getAppointmentBookings() {

            try {
                return await Appointment.find()
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createAppointmentBooking(_, {serviceID}, context) {
            const user = checkAuth(context)
            const service = await Services.findById(serviceID)
            if (service === null)
                throw new Error(`Service of serviceID: ${serviceID} does not exist`)
            try {
                const createdAppointment = new Appointment({
                    createdAt: new Date().toISOString(),
                    serviceType: service,
                    user: user.id,
                    confirmed: false,
                })
                await createdAppointment.save()
                await User.findOneAndUpdate({
                        _id: user.id
                    },
                    {
                        $push: {
                            bookingsHistory: createdAppointment
                        }
                    })
                context.pubsub.publish('NEW_BOOKING', {
                    newBookings: createdAppointment
                })
                return createdAppointment
            } catch (err) {
                throw new Error(err)
            }
        },
        async deleteAppointmentBooking(_, {appointmentID}, context) {
            checkAuth(context)
            try {
                return await Appointment.findByIdAndDelete(appointmentID)
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Subscription: {
        newBookings: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('NEW_BOOKING')
        }
    },
    AppointmentBooking: {
        serviceType: async (parent) => {
            const serviceID = parent.serviceType
            try {
                return await Services.findById(serviceID)
            } catch (err) {
                throw new Error(err)
            }
        },
        creator: async (parent, args, context) => {
            const user = checkAuth(context)
            try {
                return await User.findById(user.id)
            } catch (err) {
                throw new Error(err)
            }
        }
    }

}