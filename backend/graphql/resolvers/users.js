const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../src/config')
const {UserInputError} = require('apollo-server')

const User = require('../models/User')
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')

const AppointmentBooking = require('../models/AppointmentBooking')
const checkAuth = require('../../utils/checkAuth')

function getToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, {expiresIn: '1hr'});
}

/*
* Special Datatype: User
* holds users and contains fields below
*
    token: String
    admin: Boolean
    username: String
    email: String
    phonenumber: String
    bookingsHistory : [AppointmentBooking] => holds a list of all appointments made by user
    createdAt: String => when this user was created
    * */

module.exports = {
    User: {
        bookingsHistory: async (parent) => {

            try {

                const ids = parent.bookingsHistory
                return await AppointmentBooking.find({
                    '_id': {
                        $in: ids
                    }
                })
            } catch (err) {
                throw new Error(err)
            }
        },
    },
    Query: {
        /* a resolver to return all users in mongodb
        * NoInput -> Array of Users */
        async getUsers() {
            try {
                return await User.find()
            } catch (err) {
                throw new Error(err)
            }
        },
        /* a resolver to return the bookings history of a user given
        *  a username (String)
        *  String ->  Array of AppointmentBookings
        * */
        async getUserBookingsHistory(_, {username}) {
            try {
                const user = await User.findOne({username})

                const ids = user.bookingsHistory
                return await AppointmentBooking.find({
                    '_id': {
                        $in: ids
                    }
                })
            } catch (err) {
                throw new Error(err)
            }
        },
        /* a resolver to return a user object given username
        *  a username (String)
        *  String ->  User
        * */
        async getAUser(_, {username}) {
            try {
                console.log("inside get a user")
                const user = await User.findOne({username})
                console.log(user)
                return user
            } catch (err) {
                throw new UserInputError('User not found')
            }
        }
    }
    ,
    Mutation: {
        /* resolver to login for Users
        * username(string), password(string) -> User object with id and token
        * features: checks userinput, checks if user exists, checks if credentials are correct, and checks user token */
        async login(_, {username, password}) {
            const {errors, valid} = validateLoginInput(username, password)
            const user = await User.findOne({username})

            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            if (!user) {
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors})
            }
            const match = await bcrypt.compare(password, user.password)

            if (!match) {
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', {errors})
            }

            const token = getToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }


        },
        /* a mutation that creates a new user object in database
        * username(string), email(string), pass(string), confirmPassword(string), Phone Number(string) ->
        * user object called register that has all values above with mongodb ID, jwt token
        * features: user input validation, password encryption, 1 hr jwt token */
        async register(_, {registerInput: {username, email, password, confirmPassword, phonenumber}}) {
            const user = await User.findOne({username})
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword)

            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }

            if (password)
                password = await bcrypt.hash(password, 12)


            const newUser = new User({
                email: email,
                username: username,
                password: password,
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
