const Boom = require('boom')
const User = require('mongoose').model('User')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

exports.getUserData = (req, rep) => {
    if(req.headers.authorization){
        const authorization = req.headers.authorization
        try {
            decoded = jwt.verify(authorization, process.env.SECRET_KEY)
        } catch (e) {
            return rep(Boom.proxyAuthRequired('Unauthorized'))
        }

        User.findOne({ _id: decoded._id }, (err, user) => {
            if(err) { return rep(Boom.notFound(err)) }
            return rep({user})
        })
    }else{
        return rep(Boom.badRequest('Server Error or Unauthorized'))
    }
}
