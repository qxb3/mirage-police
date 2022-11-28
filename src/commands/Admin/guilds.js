const MirageSubcommand = require('#structures/MirageSubcommand')
const { Permissions } = require('discord.js')

const Guilds = require('#models/guilds')

class GuildsCommand extends MirageSubcommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Manage guilds',
      aliases: ['guild'],
      preconditions: [['AdminOnly', 'ModeratorOnly']],
      subcommands: [
        { name: 'list', messageRun: 'list', default: true },
        { name: 'add', messageRun: 'add' },
        { name: 'remove', messageRun: 'remove' }
      ]
    })
  }

  async list(message) {
    const guilds = await Guilds.find()
    const string = guilds.map(guild => {
      return this.multiLine(`
        〢 ${guild.name}
        ➥ Channel: <#${guild.channelId}>
        ➥ Role: <@${guild.roleId}>
      `)
    }).join('\n\n')

    await message.reply({
      embeds: [
        this.embed.create(this.colors.Secondary)
          .setTitle('Guilds')
          .setDescription(string || 'No guilds added yet.')
      ]
    })
  }

  async add(message, args) {
    const guildName = await args.pick('string').catch(() => null)
    const guildColor = await args.pick('hex').catch(() => '#000000')

    if (!guildName) {
      return await message.reply({
        embeds: [
          this.embed.createCommandError('guilds', 'You need to pass in the name of the guild')
        ]
      })
    }

    const existingGuild = await Guilds.findOne({ name: guildName })
    if (existingGuild) {
      return await message.reply({
        embeds: [
          this.embed.createError(`${guildName} guild already exist`)
        ]
      })
    }

    const guildRole = await message.guild.roles.create({
      name: guildName,
      color: guildColor,
      hoist: true
    })

    const guildChannel = await message.guild.channels.create(guildName, {
      parent: process.env.GUILDS_CATEGORY_ID,
      permissionOverwrites: [
        {
          id: guildRole,
          allow: [Permissions.FLAGS.SEND_MESSAGES]
        },
        {
          id: message.guild.roles.everyone,
          deny: [Permissions.FLAGS.SEND_MESSAGES]
        }
      ]
    })

    await Guilds.create({
      name: guildName,
      roleId: guildRole.id,
      channelId: guildChannel.id
    })

    await message.reply({
      embeds: [
        this.embed.createSuccess(this.multiLine(`
          You successfuly add a guild

          ➥ Name: ${guildName},
          ➥ Role: ${guildRole},
          ➥ Channel: ${guildChannel}
        `))
      ]
    })
  }

  async remove(message, args) {
    const guildName = await args.pick('string').catch(() => null)

    if (!guildName) {
      return await message.reply({
        embeds: [
          this.embed.createCommandError('guilds', 'You need to pass in the name of the guild')
        ]
      })
    }

    const guild = await Guilds.findOneAndDelete({ name: guildName })
    if (!guild) {
      return await message.reply({
        embeds: [
          this.embed.createError(`There is no guild with the name of ${guildName}`)
        ]
      })
    }

    await message.guild.channels.delete(guild.channelId)
    await message.guild.roles.delete(guild.roleId)

    await message.reply({
      embeds: [
        this.embed.createSuccess(`You successfuly deleted guild: ${guildName}`)
      ]
    })
  }
}

module.exports = GuildsCommand
