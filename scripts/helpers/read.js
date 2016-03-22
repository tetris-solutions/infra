var fs = require('fs')

module.exports = function read (f) {
  return fs.readFileSync(f, {encoding: 'utf8'})
}
