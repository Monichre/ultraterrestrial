// 'use server'

import { getXataClient } from '@/lib/xata/client'
import {
  DatabaseSchema,
  EventsRecord,
  EventSubjectMatterExpertsRecord,
  PersonnelRecord,
  TopicSubjectMatterExpertsRecord,
  type DocumentsRecord,
  type OrganizationsRecord,
  type SightingsRecord,
  type TestimoniesRecord,
  type TopicsRecord,
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

export type CoreModel =
  | TopicsRecord
  | PersonnelRecord
  | EventsRecord
  | TestimoniesRecord
  | OrganizationsRecord
  | SightingsRecord
  | DocumentsRecord

export type ConnectionModel =
  | EventSubjectMatterExpertsRecord
  | TopicSubjectMatterExpertsRecord
