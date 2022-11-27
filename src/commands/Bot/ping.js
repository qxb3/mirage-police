const RefCommand = require('#structures/RefCommand')

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
    const embed = this.embed.create()
      .setTitle('🏓 Pong!')
      .setDescription(
        this.multiLine(`
          ➥ Roundtrip: \`${diff}ms\`
          ➥ Ping: \`${ping}ms\`
        `)
      )

    await msg.edit({
      content: ' ',
      embeds: [embed]
    })
  }

  getPing(context, sent) {
    const diff = sent.createdTimestamp - context.createdTimestamp
    const ping = Math.round(this.container.client.ws.ping)

    return { diff, ping }
  }
}

module.exports = PingCommand
