const index = require('../controllers/index.controller')
const editor = require('../controllers/editor.controller')
const auth = require('../controllers/auth.controller')

module.exports = (server) => {

    server.route([
        {
            method: 'GET',
            path: '/{name}',
            handler: index.render
        },
        {
            method: 'POST',
            path: '/api/saveEditor',
            handler: editor.saveEditorData
        },
        {
            method: 'POST',
            path: '/auth/register',
            config: {auth: false},
            handler: auth.register
        }
    ])
}