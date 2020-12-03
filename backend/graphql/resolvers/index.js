const serviceResolvers = require('./services')
const usersResolvers = require('./users')
const appointmentbookingResolvers = require('./appointmentbooking')

module.exports = {
    AppointmentBooking: {
        serviceType: appointmentbookingResolvers.AppointmentBooking.serviceType,
        creator: appointmentbookingResolvers.AppointmentBooking.creator,
    },
    Query: {
        ...serviceResolvers.Query,
        ...usersResolvers.Query,
        ...appointmentbookingResolvers.Query
    },
    Mutation: {
        ...serviceResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...appointmentbookingResolvers.Mutation
    },
    Subscription: {
        ...appointmentbookingResolvers.Subscription,

    }

}
