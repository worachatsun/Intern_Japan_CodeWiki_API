module.exports = (server) => {
    let index = require('../controllers/index.controller')
    server.route({
        method: 'GET',
        path: '/sun',
        handler: index.render
    })
}