'use strict'

var fs = require('fs')
var extname = require('path').extname
var ParseStream = require('./parse')

module.exports = createReadStream

function createReadStream (filename) {
  return fs
    .createReadStream(filename)
    .pipe(ParseStream(extname(filename)))
}
