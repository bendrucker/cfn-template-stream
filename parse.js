'use strict'

const assert = require('assert')
const JSONStream = require('JSONStream')
const Transform = require('stream').Transform
const yaml = require('js-yaml')
const schema = require('js-yaml-schema-cfn')

module.exports = TemplateParserStream

function TemplateParserStream (extension) {
  assert(extension === '.json' || extension === '.yml', 'extension must be json or yml')

  return extension === '.json'
    ? JSONStream.parse()
    : YamlParse()
}

function YamlParse () {
  return new Transform({
    objectMode: true,
    transform: function (chunk, enc, callback) {
      callback(null, yaml.load(chunk, { schema }))
    }
  })
}
