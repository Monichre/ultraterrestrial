const componentTemplate = require('./templates/app/component/index')
const pageTemplate = require('./templates/app/page/index')
const featureTemplate = require('./templates/app/feature/index')
const {apiTemplate, webhookTemplate} = require('./templates/app/api')

module.exports = function (plop) {
  plop.load('plop-helper-list')
  plop.setGenerator('component', componentTemplate)
  plop.setGenerator('page', pageTemplate)
  plop.setGenerator('feature', featureTemplate)
  plop.setGenerator('api', apiTemplate)
  plop.setGenerator('webhook', webhookTemplate)
}
