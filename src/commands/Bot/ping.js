const RefCommand = require('#structures/RefCommand')
const { MessageEmbed } = require('discord.js')

const { multiLine } = require('#utils/string')

class PingCommand extends RefCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Display bot\'s latency'
    })
  }

  async messageRun(message) {
    const msg = await message.reply('Pinging...')

    const { diff, ping } = this.getPing(message,  msg)
    const embed = this.getEmbed(diff, ping)

    await msg.edit({
      content: ' ',
      embeds: [embed]
    })
  }

  getEmbed(diff, ping) {
    return new MessageEmbed()
      .setTitle('🏓 Pong!')
      .setDescription(
        multiLine(`
          ➥ Roundtrip: \`${diff}ms\`
          ➥ Ping: \`${ping}ms\`
        `)
      )
      .setColor('AQUA')
  }

  getPing(context, sent) {
    const diff = sent.createdTimestamp - context.createdTimestamp
    const ping = Math.round(this.container.client.ws.ping)

    return { diff, ping }
  }
}

module.exports = PingCommand
