const Hapi = require('./config/hapi')
const server = Hapi()

server.start((err) => {
    if(err) { throw err }
    console.log('Server running at: ', server.info.uri)
})

module.exports = server