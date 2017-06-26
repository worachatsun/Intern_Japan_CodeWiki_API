const index = require('../controllers/index.controller')
const editor = require('../controllers/editor.controller')

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
}