const Appointment = require('../models/AppointmentBooking')
const checkAuth = require('../../utils/checkAuth')
const User = require('../models/User')

/* Special Datatype: AppointmentBooking
*   confirmed: Boolean, => is this appointment confirmed by an admin yet?
    createdAt: String, => Date(isostring) of when appointment was created
    serviceType: String => a string description of what was booked
    * ,*/

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
        /* creates an appointment booking given description
        * String -> AppointmentBooking
        * */
        async createAppointmentBooking(_, {description}, context) {

            const user = checkAuth(context)
            try {//create a new appointment and save
                const createdAppointment = new Appointment({
                    createdAt: new Date().toISOString(),
                    serviceType: description,
                    confirmed: false,
                })

                await createdAppointment.save()
                //update user's history of appointments
                await User.findOneAndUpdate({
                        _id: user.id
                    },
                    {
                        $push: {
                            bookingsHistory: createdAppointment.id
                        }
                    })

                //update subscription for appointment bookings
                await context.pubsub.publish('NEW_BOOKING', {
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
    AppointmentBooking : {

    }

}