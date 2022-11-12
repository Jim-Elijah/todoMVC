const { encode, decode, } = require('./base64')

// const obj = { name: 'jack', age: 10}

const d = encode(obj)

console.log(d)
console.log(decode(d))