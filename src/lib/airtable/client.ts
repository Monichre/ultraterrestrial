const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
})

export const AirtableBase = Airtable.base(process.env.AIRTABLE_BASE)
