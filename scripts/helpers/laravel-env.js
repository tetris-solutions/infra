var fs = require('fs')
var path = require('path')

exports.writeLaravelEnv = function writeLaravelEnv (vars) {
  var env = {
    APP_ENV: vars.NODE_ENV,
    APP_DEBUG: vars.NODE_ENV === 'development',
    APP_KEY: vars.TKM_APP_KEY,

    DB_CONNECTION: 'pg',
    DB_HOST: vars.BASE_DB_HOST,
    DB_PORT: 5432,
    DB_DATABASE: 'tetris',
    DB_USERNAME: vars.BASE_DB_USER,
    DB_PASSWORD: vars.BASE_DB_PWD,

    CACHE_DRIVER: 'memcached',
    QUEUE_DRIVER: 'sync'
  }


  var envContent = ''

  for (var key in env) {
    if (env.hasOwnProperty(key)) {
      envContent += key + "=" + env[key] + "\n"
    }
  }

  var destPath = path.resolve(__dirname, '..', '..', 'laravel.env')

  fs.writeFile(destPath, envContent,
    function (err) {
      if (err) throw err
    })
}
