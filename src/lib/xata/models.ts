import { getXataClient } from '@/lib/xata/client'


export const generateDataNodes = async () => {
  const xata = getXataClient()
  const events = await xata.db.events.sort('date', 'desc').getAll()
  const topics = await xata.db.topics.getAll()
  const personnel = await xata.db.personnel.getAll()
}

export const getConnectionModels = async () => {
  const xata = getXataClient()
  const events = await xata.db.events
    .getAll()
    .then((res) => res.toSerializable())

  const topics = await xata.db.topics
    .getAll()
    .then((res) => res.toSerializable())

  const testimonies = await xata.db.testimonies
    .getAll()
    .then((res) => res.toSerializable())

  const organizations = await xata.db.organizations
    .getAll()
    .then((res) => res.toSerializable())

  const personnel = await xata.db.personnel
    .getAll()
    .then((res) => res.toSerializable())

  return {
    events,
    topics,
    testimonies,
    organizations,
    personnel,
  }
}

// export const search = async (searchParams) => {
//   //   const results = await xata.search.all(searchParams, {
//   //   tables: [
//   //     {
//   //       table: "Actor",
//   //       target: ["name"],
//   //       filter: {"city": "New York"},
//   //       boosters: [{ numericBooster: { column: 'lifetimeBoxOffice', factor: 3 } }]
//   //     },
//   //     { ... },
//   //   ],
//   //   fuzziness: 1,
//   //   prefix: "phrase"
//   // });
// }

export const getTopicPersonnelAndEventGraphData = async () => {
  const xata = getXataClient()
  const eventsWithSMES = await xata.db['event-subject-matter-experts'].select([
      'event.name',
      'event.id',
      'event.date',
      'event.location',
      'event.longitude',
      'event.latitude',
      'event.description',
      'subject-matter-expert.id',
      'subject-matter-expert.name',
      'subject-matter-expert.photo',
      'subject-matter-expert.role',
      'subject-matter-expert.bio',
      'subject-matter-expert.rank',
      'subject-matter-expert.credibility',
    ])
    .getAll()
  console.log('eventsWithSMES: ', eventsWithSMES)

  // const events = await xata.db.events.getAll()

  const { records: events } = await xata.db.events
    .sort('date', 'desc')
    .select([
      'name',
      'description',
      'location',
      'latitude',
      'longitude',
      'date',
    ])
    .getPaginated({
      pagination: {
        size: 20,
      },
    })

  console.log('events: ', events)

  const topics = await xata.db.topics.getAll()
  const topicsWithSMES = await xata.db['topic-subject-matter-experts'].getAll()

  console.log({ topicsWithSMES })
  // const testimonies = await xata.db.testimonies.getAll()

  // const organizations = await xata.db.organizations.getAll()

  const personnel = await xata.db.personnel
    .select([
      'name',
      'bio',
      'role',
      'picture',
      'facebook',
      'twitter',
      'website',
      'instagram',
      'rank',
      'credibility',
      'popularity',
    ])
    .filter({
      rank: { $gt: 0 },
    })
    .getAll()

  console.log('personnel: ', personnel)
  return {
    topics: {
      all: topics,
      withConnections: topicsWithSMES,
    },
    events: {
      all: events,
      withConnections: eventsWithSMES,
    },
    personnel: {
      all: personnel,
    },
  }
}
