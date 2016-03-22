var fs = require('fs')
var path = require('path')

exports.writeBashEnv = function writeBashEnv (vars) {
  var bashEnvContent = '#!/usr/bin/env bash\n'

  for (var key in vars) {
    if (vars.hasOwnProperty(key)) {
      bashEnvContent += "export " + key + "='" + vars[key] + "'\n"
    }
  }

  var destPath = path.resolve(__dirname, '..', '..', 'bash.env')

  fs.writeFile(destPath, bashEnvContent,
    function (err) {
      if (err) throw err
    })
}
