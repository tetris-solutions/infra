#!/usr/bin/env node

var dotenv = require('dotenv')
var glob = require('glob')
var fs = require('fs')
var writeBashEnv = require('./helpers/bash-env').writeBashEnv
var writeLaravelEnv = require('./helpers/laravel-env').writeLaravelEnv
var read = require('./helpers/read')
var env = dotenv.parse(read('.env'))
var mustache = require('mustache')

glob('src/**/*.mustache', function (err, files) {
  files.forEach(function (file) {
    var compiled = mustache.render(read(file), env)
    var absolutepath = file.replace(/^src\//g, '')
    var realpath = absolutepath.replace(/\.mustache$/g, '')

    fs.writeFile(realpath, compiled,
      function (err) {
        if (err) throw err
      })
  })
})

writeBashEnv(env)
writeLaravelEnv(env)
