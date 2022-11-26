const { createSchema } = require('#utils/db')

module.exports = createSchema('reports', {
  userId: {
    type: String,
    required: true
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
