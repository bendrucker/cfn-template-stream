'use strict'

var assert = require('assert')
var Transform = require('stream').Transform
var yaml = require('js-yaml')
var schema = require('js-yaml-schema-cfn')

module.exports = TemplateStringifyStream

function TemplateStringifyStream (extension) {
  assert(extension === '.json' || extension === '.yml', 'extension must be json or yml')

  return extension === '.json'
    ? JSONStringify()
    : YamlStringify()
}

function JSONStringify () {
  return new Transform({
    objectMode: true,
    transform: function (chunk, enc, callback) {
      callback(null, JSON.stringify(chunk, null, 2))
    }
  })
}

function YamlStringify () {
  return new Transform({
    objectMode: true,
    transform: function (chunk, enc, callback) {
      callback(null, yaml.dump(chunk, { schema }))
    }
  })
}
