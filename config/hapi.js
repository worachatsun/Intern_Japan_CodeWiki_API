const Hapi = require('hapi')
const server = new Hapi.Server()

module.exports = () => {
    
    server.connection({
        host: 'localhost',
        port: 3000
    })
    
    require('../app/routes/index.route')(server)
    return server
}