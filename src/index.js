require('dotenv/config')
require('module-alias/register')

const RefClient = require('#structures/RefClient')

const client = new RefClient()
client.login()
