const {gql} = require('apollo-server')

module.exports = gql`
    type Services {
        id: ID
        title: String
        price: Float
        description: String
        category: String
        date: String
    }

    type AppointmentBooking {
        id: ID
        createdAt: String
        serviceType: Services
        creator: User
    }

    type User {
        id: ID
        email: String
        token: String
        username: String
        createdAt: String
        admin: Boolean
        bookingsHistory : [AppointmentBooking]!
        phonenumber: String
    }


    input RegisterInput {
        username: String
        password: String
        confirmPassword: String
        email: String
        phonenumber: String
    }

    input ServiceInput {
        title: String
        price: Float
        description: String
        category: String
    }

    type Query {
        getUsers: [User]!
        getServices: [Services]!
        getAService(serviceID: ID!): Services
        getAppointmentBookings: [AppointmentBooking]!
    }

    type Mutation {
        login(username: String!, password: String!): User
        register(registerInput: RegisterInput): User
        addService(serviceInput: ServiceInput): Services
        deleteService(serviceID: ID!): Services
        createAppointmentBooking(serviceID: ID!): AppointmentBooking
        deleteAppointmentBooking(appointmentID: ID!): AppointmentBooking
    }

    type Subscription {
        newBookings: AppointmentBooking
    }
`
