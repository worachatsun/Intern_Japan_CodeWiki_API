const env = require('dotenv').config()
const User = require('mongoose').model('User')

const validate = (decoded, request, callback) => {
    console.log(decoded.user, 'decoded')
    User.findById(decoded.user._id, (err, user) => {
        console.log(user)
        if(err) { return callback(null, false) }
        if(user) 
            return callback(null, true)
        else
            return callback(null, false)
    })
}

module.exports = server => {
    server.register(require('hapi-auth-jwt2'), err => {
        if(err) { console.log(err) }

        server.auth.strategy('jwt', 'jwt', {
            key: process.env.SECRET_KEY || 'secretkey',
            validateFunc: validate,
            ververifyOptions: { algorithms: [ 'HS256' ] }
        })

        server.auth.default('jwt')
    })
}