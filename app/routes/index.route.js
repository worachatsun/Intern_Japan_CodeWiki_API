module.exports = (server) => {
    let index = require('../controllers/index.controller')

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: index.render
    })

    server.route({
        method: 'POST',
        path: '/api/saveEditor',
        handler: index.saveEditorData
    })
}