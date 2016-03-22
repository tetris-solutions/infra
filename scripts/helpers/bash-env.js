var fs = require('fs')
var path = require('path')
var read = require('./read')

exports.writeBashEnv = function writeBashEnv (vars) {
  var envContent = '#!/usr/bin/env bash\n'
  var projectRoot = path.resolve(__dirname, '..', '..')
  
  envContent += read(path.resolve(projectRoot, 'banner.txt'))

  for (var key in vars) {
    if (vars.hasOwnProperty(key)) {
      envContent += "export " + key + "='" + vars[key] + "'\n"
    }
  }

  var destPath = path.resolve(projectRoot, 'bash.env')

  fs.writeFile(destPath, envContent,
    function (err) {
      if (err) throw err
    })
}
