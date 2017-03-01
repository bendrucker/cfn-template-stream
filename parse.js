'use strict'

var assert = require('assert')
var JSONStream = require('JSONStream')
var Transform = require('stream').Transform
var yaml = require('js-yaml')
var schema = require('js-yaml-schema-cfn')

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
      callback(null, yaml.load(chunk, {schema}))
    }
  })
}
