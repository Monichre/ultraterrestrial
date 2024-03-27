const componentTemplate = require('./templates/component/index')

module.exports = function (plop) {
  plop.load('plop-helper-list')
  plop.setGenerator('component', componentTemplate)
}
