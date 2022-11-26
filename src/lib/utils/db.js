const { model, Schema } = require('mongoose')

function createSchema(name, struct) {
  return model(name, new Schema(struct))
}

module.exports = {
  createSchema
}
