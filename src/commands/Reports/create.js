const MirageCommand = require('#structures/MirageCommand')
const {
  Permissions,
  MessageActionRow,
  MessageButton
} = require('discord.js')

const Reports = require('#models/reports')

class CreateCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Create a private report channel',
      preconditions: ['OneReportOnly']
    })
  }

  async messageRun(message) {
    const { guild, member } = message
    const { username } = member.user

    const newRole = await guild.roles.create({
      name: `${username} report role`
    })

    const newChannel = await guild.channels.create(`${username} report`, {
      parent: process.env.REPORT_CATEGORY_ID,
      permissionOverwrites: [
        {
          id: newRole,
          allow: [Permissions.FLAGS.VIEW_CHANNEL]
        },
        {
          id: guild.roles.everyone,
          deny: [Permissions.FLAGS.VIEW_CHANNEL]
        }
      ]
    })

    await member.roles.add(newRole)

    await Reports.create({
      userId: member.user.id,
      roleId: newRole.id,
      channelId: newChannel.id
    })

    const embed = this.embed.createSuccess('You successfuly created a report')
    const buttons = new MessageActionRow()
      .setComponents(
        new MessageButton()
          .setStyle('LINK')
          .setLabel('JUMP')
          .setURL(`https://discord.com/channels/${guild.id}/${newChannel.id}`)
      )

    await message.reply({
      embeds: [embed],
      components: [buttons]
    })
  }
}

module.exports = CreateCommand
