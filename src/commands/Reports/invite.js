const RefCommand = require('#structures/RefCommand')
const Reports = require('#models/reports')

class InviteCommand extends RefCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Invite other users to the report channel',
      preconditions: ['ReportRequired', 'ReportChannelOnly']
    })
  }

  async messageRun(message, args) {
    const member = await args.pick('member').catch(() => null)
    const role = await args.pick('role').catch(() => null)

    if (!member && !role) {
      return await message.reply({
        embeds: [
          this.embed.createCommandError('invite', 'You need to mention a user or a role')
        ]
      })
    }

    const report = await Reports.findOne({ userId: message.author.id })

    if (member) {
      await member.roles.add(report.roleId)

      await message.reply({
        embeds: [
          this.embed.createSuccess(`Successfuly invited user ${member}`)
        ]
      })
    }

    if (role) {
      const reportChannel = await message.guild.channels.fetch(report.channelId)
      await reportChannel.permissionOverwrites.edit(role.id, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true
      })

      await message.reply({
        embeds: [
          this.embed.createSuccess(`Successfuly invited role ${role}`)
        ]
      })
    }
  }
}

module.exports = InviteCommand
