export const TABLES = [
  {
    name: 'topics',
    columns: [
      { name: 'name', type: 'string' },
      { name: 'summary', type: 'text' },
      { name: 'photo', type: 'file', file: { defaultPublicAccess: true } },
      {
        name: 'photos',
        type: 'file[]',
        'file[]': { defaultPublicAccess: true },
      },
    ],
    revLinks: [
      { column: 'topic', table: 'topic-subject-matter-experts' },
      { column: 'topic', table: 'topics-testimonies' },
      { column: 'topic', table: 'event-topic-subject-matter-experts' },
      { column: 'topic', table: 'user-saved-topics' },
    ],
  },
  {
    name: 'personnel',
    columns: [
      { name: 'bio', type: 'text' },
      { name: 'role', type: 'string' },
      { name: 'facebook', type: 'string' },
      { name: 'twitter', type: 'string' },
      { name: 'website', type: 'string' },
      { name: 'instagram', type: 'string' },
      { name: 'photo', type: 'file[]' },
      { name: 'rank', type: 'int' },
      { name: 'credibility', type: 'int' },
      { name: 'popularity', type: 'int' },
      { name: 'name', type: 'string', unique: true },
    ],
    revLinks: [
      { column: 'member', table: 'organization-members' },
      {
        column: 'subject-matter-expert',
        table: 'event-subject-matter-experts',
      },
      {
        column: 'subject-matter-expert',
        table: 'topic-subject-matter-experts',
      },
      { column: 'witness', table: 'testimonies' },
      {
        column: 'subject-matter-expert',
        table: 'event-topic-subject-matter-experts',
      },
      { column: 'key-figure', table: 'user-saved-key-figure' },
    ],
  },
  {
    name: 'events',
    columns: [
      { name: 'name', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'location', type: 'string' },
      { name: 'latitude', type: 'float' },
      { name: 'longitude', type: 'float' },
      { name: 'date', type: 'datetime' },
      { name: 'photos', type: 'file[]' },
    ],
    revLinks: [
      { column: 'event', table: 'event-subject-matter-experts' },
      { column: 'event', table: 'testimonies' },
      { column: 'event', table: 'event-topic-subject-matter-experts' },
      { column: 'event', table: 'user-saved-events' },
    ],
  },
  {
    name: 'organizations',
    columns: [
      { name: 'name', type: 'string' },
      { name: 'specialization', type: 'string' },
      { name: 'description', type: 'text' },
      { name: 'photo', type: 'text' },
      { name: 'image', type: 'file', file: { defaultPublicAccess: true } },
    ],
    revLinks: [
      { column: 'organization', table: 'organization-members' },
      { column: 'organization', table: 'testimonies' },
      { column: 'organization', table: 'user-saved-organizations' },
    ],
  },
  {
    name: 'sightings',
    columns: [
      { name: 'date', type: 'datetime' },
      { name: 'description', type: 'string' },
      { name: 'media_link', type: 'string' },
      { name: 'city', type: 'string' },
      { name: 'state', type: 'string' },
      { name: 'country', type: 'string' },
      { name: 'shape', type: 'string' },
      { name: 'duration_seconds', type: 'string' },
      { name: 'duration_hours_min', type: 'string' },
      { name: 'comments', type: 'string' },
      { name: 'date_posted', type: 'datetime' },
      { name: 'latitude', type: 'float' },
      { name: 'longitude', type: 'float' },
    ],
    revLinks: [{ column: 'sighting', table: 'user-saved-sightings' }],
  },
  {
    name: 'event-subject-matter-experts',
    columns: [
      { name: 'event', type: 'link', link: { table: 'events' } },
      {
        name: 'subject-matter-expert',
        type: 'link',
        link: { table: 'personnel' },
      },
    ],
  },
  {
    name: 'topic-subject-matter-experts',
    columns: [
      { name: 'topic', type: 'link', link: { table: 'topics' } },
      {
        name: 'subject-matter-expert',
        type: 'link',
        link: { table: 'personnel' },
      },
    ],
  },
  {
    name: 'organization-members',
    columns: [
      { name: 'member', type: 'link', link: { table: 'personnel' } },
      { name: 'organization', type: 'link', link: { table: 'organizations' } },
    ],
  },
  {
    name: 'testimonies',
    columns: [
      { name: 'claim', type: 'text' },
      { name: 'event', type: 'link', link: { table: 'events' } },
      { name: 'summary', type: 'text' },
      { name: 'witness', type: 'link', link: { table: 'personnel' } },
      { name: 'documentation', type: 'file[]' },
      { name: 'date', type: 'datetime' },
      { name: 'organization', type: 'link', link: { table: 'organizations' } },
    ],
    revLinks: [
      { column: 'testimony', table: 'topics-testimonies' },
      { column: 'testimony', table: 'user-saved-testimonies' },
    ],
  },
  {
    name: 'topics-testimonies',
    columns: [
      { name: 'topic', type: 'link', link: { table: 'topics' } },
      { name: 'testimony', type: 'link', link: { table: 'testimonies' } },
    ],
  },
  {
    name: 'documents',
    columns: [
      { name: 'file', type: 'file[]' },
      { name: 'content', type: 'text' },
      { name: 'embedding', type: 'vector', vector: { dimension: 1536 } },
      { name: 'title', type: 'string' },
    ],
    revLinks: [{ column: 'document', table: 'user-saved-documents' }],
  },
  {
    name: 'locations',
    columns: [
      { name: 'name', type: 'string' },
      { name: 'coordinates', type: 'string' },
      { name: 'google-maps-location-id', type: 'text' },
      { name: 'city', type: 'string' },
      { name: 'state', type: 'string' },
      { name: 'latitude', type: 'float' },
      { name: 'longitude', type: 'float' },
    ],
  },
  {
    name: 'event-topic-subject-matter-experts',
    columns: [
      { name: 'event', type: 'link', link: { table: 'events' } },
      { name: 'topic', type: 'link', link: { table: 'topics' } },
      {
        name: 'subject-matter-expert',
        type: 'link',
        link: { table: 'personnel' },
      },
    ],
  },
  {
    name: 'users',
    columns: [
      { name: 'email', type: 'email', unique: true },
      { name: 'name', type: 'string' },
      { name: 'photo', type: 'file', file: { defaultPublicAccess: true } },
      { name: 'profile_image_url', type: 'string' },
      { name: 'external_id', type: 'string' },
    ],
    revLinks: [
      { column: 'user', table: 'user-saved-events' },
      { column: 'user', table: 'user-saved-topics' },
      { column: 'user', table: 'user-saved-key-figure' },
      { column: 'user', table: 'user-saved-testimonies' },
      { column: 'user', table: 'user-saved-documents' },
      { column: 'user', table: 'user-theories' },
      { column: 'user', table: 'user-saved-organizations' },
      { column: 'user', table: 'user-saved-sightings' },
    ],
  },
  {
    name: 'user-saved-events',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'event', type: 'link', link: { table: 'events' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'user-saved-topics',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'topic', type: 'link', link: { table: 'topics' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'user-saved-key-figure',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'key-figure', type: 'link', link: { table: 'personnel' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'user-saved-testimonies',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'testimony', type: 'link', link: { table: 'testimonies' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'user-saved-documents',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'document', type: 'link', link: { table: 'documents' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'user-theories',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'name', type: 'string' },
      { name: 'content', type: 'text' },
      { name: 'synopsis', type: 'text' },
      {
        name: 'diagrams',
        type: 'file[]',
        'file[]': { defaultPublicAccess: true },
      },
    ],
    revLinks: [
      { column: 'theory', table: 'user-saved-sightings' },
      { column: 'theory', table: 'user-saved-testimonies' },
      { column: 'theory', table: 'user-saved-topics' },
      { column: 'theory', table: 'user-saved-key-figure' },
      { column: 'theory', table: 'user-saved-organizations' },
      { column: 'theory', table: 'user-saved-events' },
      { column: 'theory', table: 'user-saved-documents' },
    ],
  },
  {
    name: 'user-saved-organizations',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'organization', type: 'link', link: { table: 'organizations' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'user-saved-sightings',
    columns: [
      { name: 'user', type: 'link', link: { table: 'users' } },
      { name: 'sighting', type: 'link', link: { table: 'sightings' } },
      { name: 'theory', type: 'link', link: { table: 'user-theories' } },
      { name: 'note', type: 'text' },
    ],
  },
]