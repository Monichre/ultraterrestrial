// 'use server'

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

export const search = async (searchParams: string) => {
  //   const results = await xata.search.all(searchParams, {
  //   tables: [
  //     {
  //       table: "Actor",
  //       target: ["name"],
  //       filter: {"city": "New York"},
  //       boosters: [{ numericBooster: { column: 'lifetimeBoxOffice', factor: 3 } }]
  //     },
  //     { ... },
  //   ],
  //   fuzziness: 1,
  //   prefix: "phrase"
  // });
}

// [Docs](https://xata.io/docs/sdk/ask)
type TableName = 'events' | 'personnel' | 'topics' | 'testimonies'
export const askAI = async (table: TableName = 'topics', question: string) => {
  const xata = getXataClient()
  // @ts-ignore
  const result = await xata.db[`${table}`].ask(question, {
    rules: [
      // ...array of strings with the rules for the model...,
    ],
    searchType: 'keyword|vector',
    search: {
      fuzziness: 0 | 1 | 2,
      prefix: 'phrase|disabled',
      target: {
        // ...search target options...
      },
      filter: {
        // ...search filter options...
      },
      boosters: [
        // ...search boosters options...
      ],
    },
    vectorSearch: {
      column: '<embedding column>',
      contentColumn: '<content column>',
      filter: {
        // ...search filter options...
      },
    },
  })
}

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
        size: 110,
      },
    })

  const topics = await xata.db.topics.getAll()

  // const testimonies = await xata.db.testimonies.getAll()

  // const organizations = await xata.db.organizations.getAll()

  const { records: personnel } = await xata.db.personnel

    .select([
      'name',
      'bio',
      'role',
      'photo',
      'facebook',
      'twitter',
      'website',
      'instagram',
      'rank',
      'credibility',
      'popularity',
      {
        name: '<-topic-subject-matter-experts.subject-matter-expert',
        columns: ['*'],
        as: 'topics',
      },
      {
        name: '<-event-subject-matter-experts.subject-matter-expert',
        columns: ['*'],
        as: 'events',
      },
    ])
    .getPaginated({
      pagination: { size: 85, offset: 0 },
    })
  console.log('personnel: ', personnel)
  // .filter({
  //   rank: { $isNot: 0 },
  // })

  const { keyFigures, eventExpertConnections, topicExpertConnections } =
    personnel.reduce(
      (acc: any, item: any) => {
        const personnelTopics = item?.topics?.records?.length
          ? item?.topics?.records.map((record) => ({
              id: record.id,
              topic: record.topic,
              'subject-matter-expert': record['subject-matter-expert'],
            }))
          : null
        const personnelEvents = item?.events?.records?.length
          ? item?.events?.records.map((record) => ({
              id: record.id,
              event: record.event,
              'subject-matter-expert': record['subject-matter-expert'],
            }))
          : null
        if (personnelTopics && personnelTopics?.length) {
          personnelTopics.forEach((topic) =>
            acc.topicExpertConnections.push(topic)
          )
        }
        if (personnelEvents && personnelEvents?.length) {
          personnelEvents.forEach((event) =>
            acc.eventExpertConnections.push(event)
          )
        }
        const photo = item.photo?.length ? item.photo[0] : null
        const person: any = {
          id: item.id,
          name: item.name,
          bio: item.bio,
          role: item.role,
          photo,
          facebook: item.facebook,
          twitter: item.twitter,
          website: item.website,
          instagram: item.instagram,
          rank: item.rank,
          credibility: item.credibility,
          popularity: item.popularity,
        }
        acc.keyFigures.push(person)
        return acc
      },
      {
        keyFigures: [],
        eventExpertConnections: [],
        topicExpertConnections: [],
      }
    )

  const payload: TopicPersonnelAndEventGraphDataPayload = {
    topics: {
      all: topics,
      withConnections: topicExpertConnections,
    },
    events: {
      all: events,
      withConnections: eventExpertConnections,
    },
    personnel: {
      all: personnel,
    },
  }
  return payload
}
