const mongoose = require('mongoose')
const User = mongoose.model('User')
const Boom = require('boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const validateSchema = require('../schemas/validate.schema')

exports.login = (res, rep) => {

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
                if(err) { rep(Boom.badRequest(err)) }
                return rep(user).code(201)
            })
        })
    })
    
}

