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
  if (!str) return str
  if (str?.startsWith('0')) {
    return str.replace(/^0+/, '')
  }
  return str
}

export const extractUniqueYearsFromEvents = (events: any[]) => {
  const years = new Set()
  events.sort((a, b) => {
    const dateA = new Date(a.date)

    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  })
  for (let event of events) {
    // @ts-ignore
    const year: any = removeLeadingZero(event?.date?.split('-')[0])

    if (!years.has(year)) {
      years.add(year)
    }
  }

  return Array.from(years)
}
