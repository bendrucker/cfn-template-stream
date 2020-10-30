'use strict'

const fs = require('fs')
const extname = require('path').extname
const ParseStream = require('./parse')

module.exports = createReadStream

function createReadStream (filename) {
  return fs
    .createReadStream(filename)
    .pipe(ParseStream(extname(filename)))
}
