const mongoose = require('mongoose')
const User = mongoose.model('User')
const Boom = require('boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const validateSchema = require('../schemas/validate.schema')
const JWT = require('jsonwebtoken')
const env = require('dotenv').config()

createJWTToken = user => {
    return JWT.sign({user}, process.env.SECRET_KEY, { algorithm: 'HS256' } )
}

exports.login = (req, rep) => {
    return rep({ token: createJWTToken(req.pre.user) }).code(201)
}

exports.register = (req, rep) => {
    const { username, password, email } = req.payload 

    const user = new User({
        username,
        email,
        admin: false
    })

    const result = Joi.validate({username, password, email}, validateSchema.userSchema, (err, value) => {
        if(err) {return rep(Boom.badRequest(err))}
        bcrypt.hash(password, 10).then((hash) => {
            user.password = hash
            user.save((err, user) => {
                if(err) { return rep(Boom.badRequest(err)) }
                return rep({ token: createJWTToken(user) }).code(201)
            })
        })
    })
}

exports.verifyUniqueUser = (req, rep) => {
    const { username, password, email } = req.payload 

    User.findOne({
        $or: [
            { email },
            { username }
        ]
    }, (err, user) => {
        if (user) {
            if (user.username === username) {
                return rep(Boom.badRequest('Username taken'));
            }
            if (user.email === email) {
                return rep(Boom.badRequest('Email taken'));
            }
        }

        return rep(req.payload)
    })
}

exports.verifyCredentials = (req, rep) => {
    const { username, email, password } = req.payload

    User.findOne({
        $or: [
            { email },
            { username }
        ]
    }, (err, user) => {
        if(err) { return rep(Boom.badRequest(err)) }
        if(user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(isValid) 
                    return rep(user)
                else
                    return rep(Boom.badRequest('Incorrect password'))
            })
        }else
            return rep(Boom.badRequest('Incorrect username or email'))
    })
}