const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const objectMapToSingular: any = {
  events: 'event',
  testimonies: 'testimony',
  personnel: 'personnel',
  organizations: 'organization',
  topics: 'topic',

  // Add more mappings here as needed
}
export const objectMapPlural: any = {
  event: 'events',
  testimony: 'testimonies',
  personnel: 'personnel',
  'subject-matter-expert': 'personnel',
  organization: 'organizations',
  topic: 'topics',

  // Add more mappings here as needed
}

export const connectionMapByEntityType: any = {
  events: [
    { table: 'event-subject-matter-experts', target: 'event' },
    { table: 'event-topic-subject-matter-experts', target: 'event' },
    { table: 'testimonies', target: 'event' },
  ],
  testimonies: [{ table: 'topics-testimonies', target: 'testimony' }],
  personnel: [
    {
      table: 'event-subject-matter-experts',
      target: 'subject-matter-expert',
    },
    {
      table: 'event-topic-subject-matter-experts',
      target: 'subject-matter-expert',
    },
    { table: 'organization-members', target: 'member' },
    {
      table: 'topic-subject-matter-experts',
      target: 'subject-matter-expert',
    },
    { table: 'testimonies', target: 'witness' },
  ],
  organizations: [
    // #TODO: Might be more record relations here
    { table: 'organization-members', target: 'organization' },
  ],
  topics: [
    { table: 'topics-testimonies', target: 'topic' },
    { table: 'topic-subject-matter-experts', target: 'topic' },
    { table: 'event-topic-subject-matter-experts', target: 'topic' },
  ],
}

export function removeLeadingZero(str: string) {
  if (str.startsWith('0')) {
    return str.replace(/^0+/, '')
  }
  return str
}

export const extractUniqueYearsFromEvents = (events: any[]) => {
  console.log('events: ', events)
  const years = new Set()
  for (let event of events) {
    console.log('event: ', event)
    // @ts-ignore
    const year: any = removeLeadingZero(event?.date?.split('-')[0])
    console.log('year: ', year)
    if (!years.has(year)) {
      years.add(year)
    }
  }
  console.log('years: ', years)
  return Array.from(years)
}
