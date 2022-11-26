const { Command } = require('@sapphire/framework')
const { Permissions } = require('discord.js')

class RefCommand extends Command {
  constructor(context, options) {
    const permissions = new Permissions(options.requiredClientPermissions).add([
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.EMBED_LINKS,
      Permissions.FLAGS.ATTACH_FILES
    ])

    super(context, {
      ...options,
      permissions
    })
  }
}

module.exports = RefCommand
