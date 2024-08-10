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
