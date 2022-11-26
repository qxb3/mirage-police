const RefCommand = require('#structures/RefCommand')
const { MessageEmbed } = require('discord.js')

const Reports = require('#models/reports')
const { multiLine } = require('#utils/string')

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
          new MessageEmbed()
            .setTitle('Error')
            .setDescription(
              multiLine(`
                You need to mention a user or a role

                Examples:
                 ➥ \`!invite @qxb3#4312\`
                 ➥ \`!invite @Guild Leaders\`
              `)
            )
            .setColor('RED')
        ]
      })
    }

    const report = await Reports.findOne({ userId: message.author.id })

    if (member) {
      await member.roles.add(report.roleId)

      await message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Success')
            .setDescription(`Successfuly invited user ${member}`)
            .setColor('GREEN')
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
          new MessageEmbed()
            .setTitle('Success')
            .setDescription(`Successfuly invited role ${role}`)
            .setColor('GREEN')
        ]
      })
    }
  }
}

module.exports = InviteCommand
