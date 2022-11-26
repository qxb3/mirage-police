const {
  SapphireClient,
  ApplicationCommandRegistries,
  RegisterBehavior
} = require('@sapphire/framework')

const mongoose = require('mongoose')

class RefClient extends SapphireClient {
  constructor() {
    super({
      intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
      defaultPrefix: '!',
      loadMessageCommandListeners: true,
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
      disableMentionPrefix: true
    })

    ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite)
  }

  login() {
    const dbOpts = {
      dbName: process.env.NODE_ENV === 'production'
        ? 'production'
        : 'development'
    }

    mongoose.connect(process.env.MONGO_URI, dbOpts, (err) => {
      if (err) throw new Error(err)

      this.logger.info('Connected to MongoDB Database.')
      super.login(process.env.BOT_TOKEN)
    })
  }
}

module.exports = RefClient
