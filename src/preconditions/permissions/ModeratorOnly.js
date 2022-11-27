const { Precondition } = require('@sapphire/framework')
const { Permissions } = require('discord.js')

class ModeratorOnlyPrecondition extends Precondition {
  messageRun(message) {
    return message.member.permissions.has([Permissions.FLAGS.MODERATE_MEMBERS])
      ? this.ok()
      : this.error({ message: 'Only the Moderator can run this command' })
  }
}

module.exports = ModeratorOnlyPrecondition
