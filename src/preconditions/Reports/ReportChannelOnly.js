const { Precondition } = require('@sapphire/framework')
const Reports = require('#models/reports')

class ReportChannelOnlyPrecondition extends Precondition {
  async messageRun(message) {
    return await this.check(message.channelId)
  }

  async check(channelId) {
    const result = await Reports.findOne({ channelId })
    return result
      ? this.ok()
      : this.error({ message: 'You cannot use this command outside your report channel' })
  }
}

module.exports = ReportChannelOnlyPrecondition
