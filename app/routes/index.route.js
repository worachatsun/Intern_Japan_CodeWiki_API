const index = require('../controllers/index.controller')
const editor = require('../controllers/editor.controller')
const auth = require('../controllers/auth.controller')
const user = require('../controllers/user.controller')
const validateSchema = require('../schemas/validate.schema')

module.exports = (server) => {

    server.route([
        {
            method: 'GET',
            path: '/{name}',
            handler: index.render
        },
        {
            method: 'POST',
            path: '/auth/register',
            config: { 
                auth: false,
                validate: {
                    payload: validateSchema.userSchema
                }
            },
            handler: auth.register
        },
        {
            method: 'POST',
            path: '/auth/login',
            config: {
                auth: false,
                pre: [
                    { method: auth.verifyCredentials, assign: 'user' }
                ],
                handler: auth.login,
                validate: {
                    payload: validateSchema.authenticateUserSchema
                }
            }
        },
        {
            method: 'POST',
            path: '/api/userData',
            config: {
                handler: user.getUserData,
            }
        }
    ])

    server.route([
        {
            method: 'POST',
            path: '/api/getEditorData',
            config: {
                auth: false,
                handler: editor.getEditorDataById,
                validate: {
                    payload: validateSchema.getDataFromId
                }
            }
        },
        {
            method: 'POST',
            path: '/api/saveEditor',
            config: {
                auth: false
            },      
            handler: editor.saveEditorData
        },
        {
            method: 'POST',
            path: '/api/updateEditorData',
            config: {
                auth: false,
                handler: editor.updateEditorDataById
            }
        },
        {
            method: 'POST',
            path: '/api/addComment',
            config: {
                auth: false,
                handler: editor.addCommentById
            }
        },
        {
            method: 'POST',
            path: '/api/searchTopic',
            config: {
                auth: false,
                handler: editor.searchTopicByTagAndTitle
            }
        }
    ])
}