import { getXataClient } from '@/lib/xata/client'
import {
  DatabaseSchema,
  EventsRecord,
  EventSubjectMatterExpertsRecord,
  PersonnelRecord,
  TopicSubjectMatterExpertsRecord,
} from './xata'

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

export type TopicPersonnelAndEventGraphDataPayload = {
  topics: {
    all: DatabaseSchema['topics'][]
    withConnections: DatabaseSchema['topic-subject-matter-experts'][]
  }
  events: {
    all: DatabaseSchema['events'][]
    withConnections: DatabaseSchema['event-subject-matter-experts'][]
  }
  personnel: {
    all: DatabaseSchema['personnel'][]
  }
}
export const getTopicPersonnelAndEventGraphData = async () => {
  const xata = getXataClient()
  const eventsWithSMES = await xata.db['event-subject-matter-experts']
    .select([
      'event.name',
      'event.id',
      'event.date',
      'event.location',
      'event.longitude',
      'event.latitude',
      'event.description',
      'event.photos',
      'subject-matter-expert.id',
      'subject-matter-expert.name',
      'subject-matter-expert.photo',
      'subject-matter-expert.role',
      'subject-matter-expert.bio',
      'subject-matter-expert.rank',
      'subject-matter-expert.credibility',
    ])
    .getAll()

  // const events = await xata.db.events.getAll()

  const { records: events } = await xata.db.events
    .sort('date', 'desc')
    .select([
      'name',
      'description',
      'location',
      'latitude',
      'photos',
      'longitude',
      'date',
    ])
    .getPaginated({
      pagination: {
        size: 20,
      },
    })

  const topics = await xata.db.topics.getAll()
  const topicsWithSMES = await xata.db['topic-subject-matter-experts']
    .select([
      'topic.id',
      'topic.name',
      'topic.summary',
      'subject-matter-expert.id',
      'subject-matter-expert.name',
      'subject-matter-expert.photo',
      'subject-matter-expert.role',
      'subject-matter-expert.bio',
      'subject-matter-expert.rank',
      'subject-matter-expert.credibility',
    ])
    .getAll()

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
      rank: { $isNot: 0 },
    })
    .getAll()
  const payload: TopicPersonnelAndEventGraphDataPayload = {
    topics: {
      all: topics as TopicSubjectMatterExpertsRecord[],
      withConnections: topicsWithSMES as TopicSubjectMatterExpertsRecord[],
    },
    events: {
      all: events as EventsRecord[],
      withConnections: eventsWithSMES as EventSubjectMatterExpertsRecord[],
    },
    personnel: {
      all: personnel as PersonnelRecord[],
    },
  }
  return payload
}
