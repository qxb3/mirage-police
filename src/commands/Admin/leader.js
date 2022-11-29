const MirageSubcommand = require('#structures/MirageSubcommand')
const Guilds = require('#models/guilds')

class LeaderCommand extends MirageSubcommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Add or Remove leader from guild',
      preconditions: [['AdminOnly', 'ModeratorOnly']],
      subcommands: [
        { name: '__default__', messageRun: '__default__', default: true },
        { name: 'add', messageRun: 'add' },
        { name: 'remove', messageRun: 'remove' }
      ]
    })
  }

  async add(message, args) {
    const guildRole = await args.pick('role').catch(() => null)
    const leader = await args.pick('member').catch(() => null)

    if (!guildRole || !leader) {
      return await message.reply({
        embeds: [
          this.embed.createCommandError(this.name, 'You need to mention the guild role and a user')
        ]
      })
    }

    const guild = await Guilds.findOneAndUpdate(
      { roleId: guildRole.id },
      {
        leader: {
          name: leader.user.username,
          id: leader.user.id
        }
      }
    )

    if (!guild) {
      return await message.reply({
        embeds: [
          this.embed.createError('Cannot find that guild? :/')
        ]
      })
    }

    await leader.roles.add(process.env.GUILD_LEADER_ROLE_ID)
    await message.reply({
      embeds: [
        this.embed.createSuccess(`Successfuly added ${leader.user.username} as a leader`)
      ]
    })
  }

  async remove(message, args) {
    const leader = await args.pick('member').catch(() => null)

    if (!leader) {
      return await message.reply({
        embeds: [
          this.embed.createCommandError(this.name, 'You need to mention a user you want to remove the Guild Leader role')
        ]
      })
    }

    const guild = await Guilds.findOneAndUpdate(
      {
        'leader.id': leader.user.id
      },
      {
        leader: {
          name: 'Unknown',
          id: 'unknown-id'
        }
      }
    )

    if (!guild) {
      return await message.reply({
        embeds: [
          this.embed.createError('That user is not a Guild Leader')
        ]
      })
    }

    await leader.roles.remove(process.env.GUILD_LEADER_ROLE_ID)
    await message.reply({
      embeds: [
        this.embed.createSuccess(`Successfuly removed ${leader.user.username} as a leader`)
      ]
    })
  }

  async __default__(message) {
    await message.reply({
      embeds: [
        this.embed.createCommandError('leader', this.multiLine(`
          Invalid subcommand.
          You need to choose between \`!leader add\` and \`!leader remove\`
        `))
      ]
    })
  }
}

module.exports = LeaderCommand
