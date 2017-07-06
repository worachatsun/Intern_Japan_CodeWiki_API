const index = require('../controllers/index.controller')
const editor = require('../controllers/editor.controller')
const auth = require('../controllers/auth.controller')

module.exports = (server) => {

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: index.render
    })

    server.route({
        method: 'POST',
        path: '/api/saveEditor',
        handler: editor.saveEditorData
    })

    server.route({
        method: 'POST',
        path: '/auth/register',
        handler: auth.register
    })
}