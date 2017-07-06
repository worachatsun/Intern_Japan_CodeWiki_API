const mongoose = require('mongoose')
const User = mongoose.model('User')
const Boom = require('boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')

exports.login = (res, rep) => {

}

exports.register = (req, rep) => {
    const { username, password, email } = req.payload 

    const user = new User({
        username,
        email,
        admin: false
    })

    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        email: Joi.string().email()
    })

    const result = Joi.validate({username, password, email}, schema, (err, value) => {
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

