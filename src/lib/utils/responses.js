const { MessageEmbed } = require('discord.js')
const { Colors } = require('#vars')

class Embed {
  static create(color = Colors.Primary) {
    return new MessageEmbed().setColor(color)
  }

  static createSuccess(message, title = 'Success') {
    return this.create(Colors.Success)
      .setTitle(title)
      .setDescription(message)
  }

  static createError(message, title = 'Error') {
    return this.create(Colors.Error)
      .setTitle(title)
      .setDescription(message)
  }

  static createCommandError(commandName, errorMessage) {
    return this.createError(errorMessage)
      .setFooter({ text: `Use command: "!help ${commandName}" to learn more` })
  }
}


module.exports = {
  Embed
}
