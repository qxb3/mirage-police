const { createSchema } = require('#utils/db')

module.exports = createSchema('guilds', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  roleId: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  }
})
