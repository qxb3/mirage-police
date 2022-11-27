const { Precondition } = require('@sapphire/framework')
const { Permissions } = require('discord.js')

class AdminOnlyPrecondition extends Precondition {
  messageRun(message) {
    return message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])
      ? this.ok()
      : this.error({ message: 'Only the Administrator can run this command' })
  }
}

module.exports = AdminOnlyPrecondition
