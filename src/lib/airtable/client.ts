const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
})

export const AirtableBase = Airtable.base(process.env.AIRTABLE_BASE)
export const KeyFiguresTable = AirtableBase('Key Figures')
export const EventsTable = AirtableBase('Events')
export const TopicsTable = AirtableBase('Topics')

export const getAllEvents = async () => {
  const events: any = []

  await EventsTable.select({
    view: 'Grid view',
  }).eachPage((records: any[], fetchNextPage: () => void) => {
    records.forEach((record: any) => {
      const { fields } = record
      events.push(fields)
    })
    fetchNextPage()
  })

  return events
}

export const findKeyFigure = async (id: string) => {
  const keyFigure = await KeyFiguresTable.find(
    'recBlHfH9r1L2ck8y',
    function (err: any, record: { fields: any }) {
      if (err) {
        console.error(err)
        return
      }
      return {
        ...record?.fields,
      }
    }
  )
  console.log('keyFigure: ', keyFigure)
  return keyFigure
}

export const getAllKeyFigures = async () => {
  const keyFigures: any = []

  await KeyFiguresTable.select({
    view: 'Grid view',
  }).eachPage((records: any[], fetchNextPage: () => void) => {
    records.forEach((record: any) => {
      const { fields } = record
      keyFigures.push(fields)
    })
    fetchNextPage()
  })

  return keyFigures
}

export const getAllTopics = async () => {
  const topics: any = []

  await TopicsTable.select({
    view: 'Grid view',
  }).eachPage((records: any[], fetchNextPage: () => void) => {
    console.log('records: ', records)
    records.forEach((record: any) => {
      const { fields } = record

      topics.push({ ...fields })
    })
    fetchNextPage()
  })
  console.log('topics: ', topics)
  return topics
}
