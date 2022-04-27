const environment = process.env.NODE_ENV||'local'

const config = require(`./config/${environment}/env`)

module.exports = config
