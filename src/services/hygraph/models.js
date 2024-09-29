const {
  SimpleFieldType,
  RelationalFieldType,
} = require('@hygraph/management-sdk')

async function createEventsModel(hygraph) {
  // Create the 'events' model
  hygraph.createModel({
    apiId: 'Event',
    apiIdPlural: 'Events',
    displayName: 'Event',
  })

  // Add fields to the 'events' model

  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'externalId',
    displayName: 'External Id',
    type: SimpleFieldType.String,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'name',
    displayName: 'Name',
    type: SimpleFieldType.String,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'location',
    displayName: 'Location',
    type: SimpleFieldType.String,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'date',
    displayName: 'Date',
    type: SimpleFieldType.Datetime,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'latitude',
    displayName: 'Latitude',
    type: SimpleFieldType.Float,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'description',
    displayName: 'Description',
    type: SimpleFieldType.Richtext,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'longitude',
    displayName: 'Longitude',
    type: SimpleFieldType.Float,
  })
  hygraph.createSimpleField({
    modelApiId: 'Event',
    apiId: 'photos',
    displayName: 'Photos',
    type: SimpleFieldType.Asset,
    isList: true,
  })

  const result = await hygraph.run().catch((err) => {
    console.log('err: ', err)
  })
  console.log('event result: ', result)
}

// Function to create Hygraph model and fields for 'topics' table
async function createTopicsModel(hygraph) {
  // Create the 'topics' model
  hygraph.createModel({
    apiId: 'Topic',
    apiIdPlural: 'Topics',
    displayName: 'Topic',
  })

  // Add fields to the 'topics' model
  const fields = [
    {
      apiId: 'externalId',
      displayName: 'External Id',
      type: SimpleFieldType.String,
    },
    { apiId: 'name', displayName: 'Name', type: SimpleFieldType.String },
    {
      apiId: 'summary',
      displayName: 'Summary',
      type: SimpleFieldType.String,
    },
    { apiId: 'photo', displayName: 'Photo', type: SimpleFieldType.Asset },
    {
      apiId: 'photos',
      displayName: 'Photos',
      type: SimpleFieldType.Asset,
      isList: true,
    },
  ]

  for (const field of fields) {
    hygraph.createSimpleField({
      apiId: field.apiId,
      displayName: field.displayName,
      modelApiId: 'Topic',
      type: field.type,
      isList: field.isList || false,
    })
  }
  const result = await hygraph.run(true)
  console.log('topic result: ', result)
}

async function createPersonnelModel(hygraph) {
  // Create the 'personnel' model
  hygraph.createModel({
    apiId: 'Personnel',
    apiIdPlural: 'Personnel',
    displayName: 'Personnel',
  })

  // Add fields to the 'personnel' model
  const fields = [
    {
      apiId: 'externalId',
      displayName: 'External Id',
      type: SimpleFieldType.String,
    },
    { apiId: 'name', displayName: 'Name', type: SimpleFieldType.String },
    {
      apiId: 'bio',
      displayName: 'Bio',
      type: SimpleFieldType.String,
    },
    { apiId: 'role', displayName: 'Role', type: SimpleFieldType.String },
    {
      apiId: 'facebook',
      displayName: 'Facebook',
      type: SimpleFieldType.String,
    },
    { apiId: 'twitter', displayName: 'Twitter', type: SimpleFieldType.String },
    { apiId: 'website', displayName: 'Website', type: SimpleFieldType.String },
    {
      apiId: 'instagram',
      displayName: 'Instagram',
      type: SimpleFieldType.String,
    },
    { apiId: 'rank', displayName: 'Rank', type: SimpleFieldType.Integer },
    {
      apiId: 'photo',
      displayName: 'Photo',
      type: SimpleFieldType.Asset,
      isList: true,
    },
    {
      apiId: 'credibility',
      displayName: 'Credibility',
      type: SimpleFieldType.Integer,
    },
    {
      apiId: 'popularity',
      displayName: 'Popularity',
      type: SimpleFieldType.Integer,
    },
  ]

  for (const field of fields) {
    hygraph.createSimpleField({
      apiId: field.apiId,
      displayName: field.displayName,
      modelApiId: 'Personnel',
      type: field.type,
      isList: field.isList || false,
    })
  }
  const result = await hygraph.run(true)
  console.log('personnel result: ', result)
}

async function createOrganizationsModel(hygraph) {
  // Create the 'organizations' model
  hygraph.createModel({
    apiId: 'Organization',
    apiIdPlural: 'Organizations',
    displayName: 'Organization',
  })

  // Add fields to the 'organizations' model
  const fields = [
    {
      apiId: 'externalId',
      displayName: 'External Id',
      type: SimpleFieldType.String,
    },
    { apiId: 'name', displayName: 'Name', type: SimpleFieldType.String },
    {
      apiId: 'specialization',
      displayName: 'Specialization',
      type: SimpleFieldType.String,
    },
    {
      apiId: 'description',
      displayName: 'Description',
      type: SimpleFieldType.String,
    },

    { apiId: 'image', displayName: 'Image', type: SimpleFieldType.Asset },
  ]

  for (const field of fields) {
    hygraph.createSimpleField({
      apiId: field.apiId,
      displayName: field.displayName,
      modelApiId: 'Organization',
      type: field.type,
      isList: false,
    })
  }

  const result = await hygraph.run(true)
  console.log('organization result: ', result)
}

async function createDocumentsModel(hygraph) {
  // Create the 'documents' model
  hygraph.createModel({
    apiId: 'Document',
    apiIdPlural: 'Documents',
    displayName: 'Document',
  })

  // Add fields to the 'documents' model
  const fields = [
    {
      apiId: 'externalId',
      displayName: 'External Id',
      type: SimpleFieldType.String,
    },
    {
      apiId: 'file',
      displayName: 'File',
      type: SimpleFieldType.Asset,
      isList: true,
    },
    {
      apiId: 'content',
      displayName: 'Content',
      type: SimpleFieldType.String,
    },

    { apiId: 'title', displayName: 'Title', type: SimpleFieldType.String },
  ]

  for (const field of fields) {
    hygraph.createSimpleField({
      apiId: field.apiId,
      displayName: field.displayName,
      modelApiId: 'Document',
      type: field.type,
      formRenderer: field.formRenderer || undefined,
      isList: field.isList || false,
    })
  }
  const result = await hygraph.run(true)
  console.log('document result: ', result)
}

async function createTestimoniesModel(hygraph) {
  // Create the 'testimonies' model
  hygraph.createModel({
    apiId: 'Testimony',
    apiIdPlural: 'Testimonies',
    displayName: 'Testimony',
  })

  // Add fields to the 'testimonies' model
  const fields = [
    {
      apiId: 'externalId',
      displayName: 'External Id',
      type: SimpleFieldType.String,
    },
    {
      apiId: 'claim',
      displayName: 'Claim',
      type: SimpleFieldType.String,
    },
    {
      apiId: 'event',
      displayName: 'Event',
      type: RelationalFieldType.Relation,
      parentApiId: 'Event',
      reverseField: {
        modelApiId: 'Event',
        apiId: 'testimonies',
        displayName: 'Testimonies',
        isList: true,
      },
    },
    {
      apiId: 'summary',
      displayName: 'Summary',
      type: SimpleFieldType.String,
    },
    {
      apiId: 'witness',
      displayName: 'Witness',
      type: RelationalFieldType.Relation,
      parentApiId: 'Personnel',
      reverseField: {
        modelApiId: 'Personnel',
        apiId: 'testimonies',
        displayName: 'Testimonies',
        isList: true,
      },
    },
    {
      apiId: 'documentation',
      displayName: 'Documentation',
      type: SimpleFieldType.Asset,
      isList: true,
    },
    { apiId: 'date', displayName: 'Date', type: SimpleFieldType.Datetime },
    {
      apiId: 'organization',
      displayName: 'Organization',
      type: RelationalFieldType.Relation,
      parentApiId: 'Organization',
      reverseField: {
        modelApiId: 'Organization',
        apiId: 'testimonies',
        displayName: 'Testimonies',
        isList: true,
      },
    },
  ]

  for (const field of fields) {
    if (field.type === RelationalFieldType.Relation) {
      await hygraph.createRelationalField({
        parentApiId: 'Testimony',
        apiId: field.apiId,
        displayName: field.displayName,
        type: field.type,
        reverseField: field.reverseField,
      })
    } else {
      hygraph.createSimpleField({
        apiId: field.apiId,
        displayName: field.displayName,
        modelApiId: 'Testimony',
        type: field.type,
        isList: field.isList || false,
      })
    }
  }

  const result = await hygraph.run(true)
  console.log('testimony result: ', result)
}

module.exports = {
  createTopicsModel,
  createPersonnelModel,
  createOrganizationsModel,
  createDocumentsModel,
  createTestimoniesModel,
  createEventsModel,
}
