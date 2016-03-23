#!/usr/bin/env node

var dotenv = require('dotenv')
var glob = require('glob')
var fs = require('fs')
var path = require('path')
var writeBashEnv = require('./helpers/bash-env').writeBashEnv
var read = require('./helpers/read')
var env = dotenv.parse(read('.env'))
var mustache = require('mustache')
var mkdirp = require('mkdirp')

glob('src/**/*.mustache', function (err, files) {
  if (err) throw err

  files.forEach(function (file) {
    var compiled = mustache.render(read(file), env)
    var absolutepath = file.replace(/^src\//g, '')

    var realpath = path.resolve(
      __dirname,
      '..',
      absolutepath.replace(/\.mustache$/g, '')
    )

    mkdirp(path.dirname(realpath), function (mkErr) {
      if (mkErr) throw mkErr

      fs.writeFile(realpath, compiled,
        function (writeErr) {
          if (writeErr) throw writeErr
        })
    })


  })
})

writeBashEnv(env)
