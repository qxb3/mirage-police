const RefCommand = require('#structures/RefCommand')
const { MessageEmbed } = require('discord.js')

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
    const user = await args.pick('user').catch(() => null)

    if (!user) {
      return await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Error')
            .setDescription('You need to mention a user\nExample: `!invite @qxb3#4312`')
            .setColor('RED')
        ]
      })
    }

    const member = await message.guild.members.fetch(user.id)
    const report = await Reports.findOne({ userId: message.author.id })

    await member.roles.add(report.roleId)
  }
}

module.exports = InviteCommand
