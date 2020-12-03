const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../src/config')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            try {
                return jwt.verify(token, SECRET_KEY)
            }
            catch (err) {
                // throw new Error(err)
                throw new AuthenticationError('Expired Token')
            }
        }
        throw new Error('Authentication token must be \`Bearer [token]`')
    }
    throw new Error('Authorization header must be provided')
}