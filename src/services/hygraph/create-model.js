const { hygraph } = require('./client')
const {
  createEventsModel,
  createTopicsModel,
  createPersonnelModel,
  createTestimoniesModel,
  createOrganizationsModel,
  createDocumentsModel,
} = require('./models')
module.exports.createModels = async () => {
  await createEventsModel(hygraph)
  // await createPersonnelModel(hygraph)
  // await createDocumentsModel(hygraph)
  // await createTopicsModel(hygraph)
  // await createOrganizationsModel(hygraph)
  // await createTestimoniesModel(hygraph)
}
