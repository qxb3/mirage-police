const { Argument } = require('@sapphire/framework')
const { isNullish } = require('@sapphire/utilities')

class HexArgument extends Argument {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'hex'
    })
  }

  run(parameter, context) {
    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
    if (!isNullish(parameter) && hexRegex.test(parameter)) {
      return this.ok(parameter)
    }

    return this.error({
      context,
      parameter,
      message: 'Invalid hex color value',
      identifier: 'InvalidHexValue'
    })
  }
}

module.exports = HexArgument
