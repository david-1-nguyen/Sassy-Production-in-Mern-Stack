const Services = require('../models/Services')
const User = require('../models/User')
const checkAuth = require('../../utils/checkAuth')

/* Special Datatype: Service
* services are offered salon services such as waxing manicures pedicures etc...
*
    title: String => specific service of specified category
    price: Float
    description: String
    category: String => general category such as waxing/manicure/pedicure
    date: String => when this service was added
    user (creator): who created this service (admin only access)
* */

module.exports = {
    Query: {
        /* grab all services and returns an array of price sorted service objects
        * NoInput -> Sorted Array by price of Service objects*/
        async getServices() {
            try {
                return await Services.find().sort({price: 1})
            } catch (err) {
                throw new Error(`Cannot grab any services.`)
            }
        },
        /*
        * grab a specified service given serviceid (string)
        * serviceid(string) -> Service */
        async getAService(_, {serviceID}) {
            try {
                return await Services.findById(serviceID)
            } catch (err) {
                throw new Error(`Cannot find service with id: ${serviceID}.`)
            }
        },
        /* grabs services by category input
            category(string) -> Service
        * */
        async getServiceCategory(_, {category}) {
            try {
                return await Services.find({category: category})
            } catch (err) {
                throw new Error(`Cannot find services with category: ${category}`)
            }
        }
    },
    Mutation: {
        /*
        * adds a Service object to mongodb
        * title(string), price(float), descr(string), category(String), context(browser header) -> service added(Service)
        * features: checks context if authorization token provided and user privileges provided,
        * checks if input service title is already added,
        * */
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