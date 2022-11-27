const { Precondition } = require('@sapphire/framework')
const Reports = require('#models/reports')

class OneReportOnlyPrecondition extends Precondition {
  async messageRun(message) {
    return await this.check(message.author.id)
  }

  async check(userId) {
    const result = await Reports.findOne({ userId })
    return !result
      ? this.ok()
      : this.error({ message: 'You can only create one report at a time' })
  }
}

module.exports = OneReportOnlyPrecondition
