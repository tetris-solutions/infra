#!/usr/bin/env node

var dotenv = require('dotenv')
var glob = require('glob')
var fs = require('fs')

function read (f) {
  return fs.readFileSync(f, {encoding: 'utf8'})
}

function nope (err) {
  if (err) throw err
}

var vars = dotenv.parse(read('.env'))
var mustache = require('mustache')

glob('src/**/*.mustache', function (err, files) {
  files.forEach(function (file) {
    var compiled = mustache.render(read(file), vars)
    var absolutepath = file.replace(/^src\//g, '')
    var realpath = absolutepath.replace(/\.mustache$/g, '')

    fs.writeFile(realpath, compiled, nope)
  })
})

var bashEnvContent = '#!/usr/bin/env bash\n'

for (var key in vars) {
  if (vars.hasOwnProperty(key)) {
    bashEnvContent += "export " + key + "='" + vars[key] + "'\n"
  }
}

fs.writeFile('bash.env', bashEnvContent, nope)
