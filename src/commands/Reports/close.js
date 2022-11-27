const MirageCommand = require('#structures/MirageCommand')
const Reports = require('#models/reports')

class CloseCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Close the report channel',
      preconditions: ['ReportRequired', 'ReportChannelOnly']
    })
  }

  async messageRun(message) {
    const { guild, member } = message

    const report = await Reports.findOneAndDelete({ userId: member.user.id })
    if (!report) {
      return await message.reply({
        embeds: [
          this.embed.createError('You currently have no report')
        ]
      })
    }

    await guild.channels.delete(report.channelId)
    await guild.roles.delete(report.roleId)

    // await message.reply({
    //   embeds: [
    //     new MessageEmbed()
    //       .setTitle('Success')
    //       .setDescription('You successfuly close the report')
    //       .setColor('GREEN')
    //   ]
    // })
  }
}

module.exports = CloseCommand
