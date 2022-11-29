const { createSchema } = require('#utils/db')

module.exports = createSchema('guilds', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  leader: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
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
