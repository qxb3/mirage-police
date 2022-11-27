const { Subcommand } = require('@sapphire/plugin-subcommands')
const { Permissions } = require('discord.js')
const RefCommand = require('#structures/RefCommand')

class RefSubcommand extends Subcommand {
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

    RefCommand.setup.call(this)
  }
}

module.exports = RefSubcommand
