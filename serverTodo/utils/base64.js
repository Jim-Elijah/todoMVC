const encode = (s) => {
  return (new Buffer.from(JSON.stringify(s))).toString('base64')
}
const decode = (b) => {
  return (new Buffer.from(JSON.stringify(b), 'base64')).toString()
}

module.exports = {
  encode,
  decode,
}

