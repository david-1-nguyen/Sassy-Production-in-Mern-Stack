const Services = require('../models/Services')
const User = require('../models/User')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getServices() {
            try {
                return await Services.find().sort({price: 1})
            } catch (err) {
                throw new Error(`Cannot grab any services.`)
            }
        },
        async getAService(_, {serviceID}) {
            try {
                return await Services.findById(serviceID)
            } catch (err) {
                throw new Error(`Cannot find service with id: ${serviceID}.`)
            }
        }
    },
    Mutation: {
        async addService(_, {serviceInput: {title, price, description, category}}, context) {
            const user = checkAuth(context)
            const databaseUser = await User.findById(user.id)

            if (databaseUser.admin === false)
                throw new Error('User does not have required privileges')

            const titleAlreadyInsideService = await Services.findOne({title: title})
            if (titleAlreadyInsideService != null)
                return new Error(`Service with title: '${title}' already exists.`)

            try {
                const service = new Services({
                    title,
                    price,
                    description,
                    date: new Date().toISOString(),
                    category,
                    user: user.id
                })
                return await service.save()
            }
            catch (err) {
                throw new Error(err)
            }

        },
        async deleteService(_, {serviceID}, context) {
            const user = checkAuth(context)
            const databaseUser = await User.findById(user.id)
            if (databaseUser.admin === false)
                throw new Error('User does not have required privileges')

            try {
                return await Services.findByIdAndDelete(serviceID)
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}