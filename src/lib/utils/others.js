const crypto = require('crypto')

function randomID(size) {
  return crypto.randomBytes(size).toString('base64')
}

module.exports = {
  randomID
}
