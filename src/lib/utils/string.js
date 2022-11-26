function multiLine(str) {
  return str.trim().split('\n')
    .map(v => v.trim())
    .join('\n')
}

module.exports = {
  multiLine
}
