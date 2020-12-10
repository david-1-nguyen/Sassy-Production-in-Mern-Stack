const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../src/config')
const { UserInputError } = require('apollo-server')

const User = require('../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

function getToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, {expiresIn: '1hr'});
}

module.exports = {
    Query: {
      async getUsers() {
          try {
              return await User.find()
          }
          catch (err) {
              throw new Error(err)
          }
      }
    },
    Mutation: {
        async login(_, { username, password} ) {
            const {errors, valid } = validateLoginInput(username, password)
            const user = await User.findOne({username})

            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }
            if(!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors})
            }
            const match = await bcrypt.compare(password, user.password)

            if(!match) {
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', { errors})
            }

            const token = getToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }


        },
        async register(_, { registerInput: {username, email, password, confirmPassword, phonenumber}}) {
            const user = await User.findOne({ username })
            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            const {errors, valid } = validateRegisterInput(username, email, password, confirmPassword)

            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }

            if(password)
                password = await bcrypt.hash(password, 12)


            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
                admin: false,
                phonenumber: phonenumber,
            })

            const res = await newUser.save()

            const token = getToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
