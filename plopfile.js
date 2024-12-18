const componentTemplate = require('./templates/component/index')
const pageTemplate = require('./templates/page/index')
const featureTemplate = require('./templates/feature/index')
const { apiTemplate, webhookTemplate } = require('./templates/api')

module.exports = function (plop) {
  plop.load('plop-helper-list')
  plop.setGenerator('component', componentTemplate)
  plop.setGenerator('page', pageTemplate)
  plop.setGenerator('feature', featureTemplate)
  plop.setGenerator('api', apiTemplate)
  plop.setGenerator('webhook', webhookTemplate)
}
