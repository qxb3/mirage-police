const { Listener } = require('@sapphire/framework')
const { MessageEmbed } = require('discord.js')

class MessageCommandDeniedListener extends Listener {
  async run(error, { message }) {
    await message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('Error')
          .setDescription(error.message)
          .setColor('RED')
      ]
    })
  }
}

module.exports = MessageCommandDeniedListener
