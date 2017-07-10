const Boom = require('boom')
const User = require('mongoose').model('User')

exports.getUserData = (req, rep) => {
    const { _id } = req.payload

    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    User.findOne({ _id }, (err, user) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({user})
    })
}