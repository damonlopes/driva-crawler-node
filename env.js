const path = './config/' + (process.env.NODE_ENV||'local') + '/env'

const config = require(path)

module.exports = config
