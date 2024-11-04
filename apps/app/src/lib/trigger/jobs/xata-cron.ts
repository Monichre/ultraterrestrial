import type { TopicsRecord, PersonnelRecord, EventsRecord, OrganizationsRecord, SightingsRecord, EventSubjectMatterExpertsRecord, TopicSubjectMatterExpertsRecord, OrganizationMembersRecord, TestimoniesRecord, TopicsTestimoniesRecord, DocumentsRecord, LocationsRecord, EventTopicSubjectMatterExpertsRecord, UsersRecord, UserSavedEventsRecord, UserSavedTopicsRecord, UserSavedKeyFigureRecord, UserSavedTestimoniesRecord, UserSavedDocumentsRecord, UserTheoriesRecord, UserSavedOrganizationsRecord, UserSavedSightingsRecord, TagsRecord, TheoriesRecord, MindmapsRecord, ArtifactsRecord } from "@/db/xata/xata"
import { logger, schedules, task, wait } from "@trigger.dev/sdk/v3"
const fs = require( 'fs' )
const path = require( 'path' )
const { Parser } = require( 'json2csv' )

const tables = ['topics',
  'personnel',
  'events',
  'organizations',
  // 'sightings',
  'event-subject-matter-experts',
  'topic-subject-matter-experts',
  'organization-members',
  'testimonies',
  'topics-testimonies',
  'documents',
  // 'locations',
  'event-topic-subject-matter-experts',
  'users',
  'user-saved-events',
  'user-saved-topics',
  'user-saved-key-figure',
  'user-saved-testimonies',
  'user-saved-documents',
  'user-theories',
  'user-saved-organizations',
  'user-saved-sightings',
  'tags',
  'theories',
  'mindmaps',
  'artifacts',]





// const resend = new Resend( process.env.RESEND_API_KEY )

// Parent task (scheduled to run 9AM every weekday)

import { schedules } from "@trigger.dev/sdk/v3"

export const firstScheduledTask = schedules.task( {
  id: "first-scheduled-task",
  run: async ( payload ) => {
    const tableRecords = await Promise.all( tables.map( async ( table ) => {
      // Import required fs module

      // Create directory for today's date
      const today = new Date().toISOString().split( 'T' )[0]
      const outputDir = path.join( process.cwd(), 'docs', 'models', today, 'csv' )

      // Ensure directory exists
      if ( !fs.existsSync( outputDir ) ) {
        fs.mkdirSync( outputDir, { recursive: true } )
      }

      // Get records and write to CSV
      try {
        const records = await xata.db[table].getAll()

        if ( records && records.length > 0 ) {
          // Convert records to plain objects and remove internal fields
          const cleanRecords = records.map( record => {
            const obj = record.toJSON()
            delete obj.xata
            return obj
          } )

          // Create CSV parser
          const parser = new Parser()
          const csv = parser.parse( cleanRecords )

          // Write to file
          const filePath = path.join( outputDir, `${table}.csv` )
          fs.writeFileSync( filePath, csv )

          logger.info( `Successfully wrote ${records.length} records to ${filePath}` )
        } else {
          logger.info( `No records found for table ${table}` )
        }
        const tableRecords = await xata.db[table].getAll()
        return tableRecords
      }) )
  },
} );


