const { Command } = require('@sapphire/framework')
const { Permissions } = require('discord.js')

const { Colors } = require('#vars')
const { Embed } = require('#utils/responses')
const { multiLine } = require('#utils/string')

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

    RefCommand.setup.call(this)
  }

  static setup() {
    this.colors = Colors
    this.embed = Embed
    this.multiLine = multiLine
  }
}

module.exports = RefCommand
