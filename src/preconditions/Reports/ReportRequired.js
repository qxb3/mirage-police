const { Precondition } = require('@sapphire/framework')
const Reports = require('#models/reports')

class ReportRequiredPrecondition extends Precondition {
  async messageRun(message) {
    return await this.check(message.author.id)
  }

  async check(userId) {
    const result = await Reports.findOne({ userId })
    return result
      ? this.ok()
      : this.error({ message: 'You do not have a report' })
  }
}

module.exports = ReportRequiredPrecondition
