'use strict'

var test = require('tape')
var path = require('path')
var concat = require('concat-stream')
var fromArray = require('stream-array')
var cfnTemplate = require('./')

test('Parse: yaml', function (t) {
  t.plan(2)

  cfnTemplate.fromFile(path.resolve(__dirname, 'fixtures', 'base.yml'))
    .on('error', t.end)
    .pipe(concat(function (data) {
      t.equal(data.length, 1)
      t.ok(data[0].Resources.Stack)
    }))
})

test('Parse: json', function (t) {
  t.plan(2)

  cfnTemplate.fromFile(path.resolve(__dirname, 'fixtures', 'base.json'))
    .on('error', t.end)
    .pipe(concat(function (data) {
      t.equal(data.length, 1)
      t.ok(data[0].Resources.Stack)
    }))
})

test('Stringify: yaml', function (t) {
  t.plan(1)

  fromArray([
    {
      Resources: {
        Stack: {}
      }
    }
  ])
  .on('error', t.end)
  .pipe(cfnTemplate.Stringify('.yml'))
  .pipe(concat(function (data) {
    t.equal(data, `Resources:\n  Stack: {}\n`)
  }))
})

test('Stringify: json', function (t) {
  t.plan(1)

  var input = {
    Resources: {
      Stack: {}
    }
  }

  fromArray([input])
  .on('error', t.end)
  .pipe(cfnTemplate.Stringify('.json'))
  .pipe(concat(function (data) {
    t.equal(data, JSON.stringify(input, null, 2))
  }))
})
