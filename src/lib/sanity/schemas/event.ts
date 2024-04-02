import { defineType, defineField, defineArrayMember } from 'sanity'

export const event = defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
  fields: [
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Event Type',
    }),

    defineField({
      name: 'latitude',
      type: 'number',
      title: 'Latitude',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Locatioon',
    }),
    defineField({
      title: 'Key Personnel',
      name: 'personnel',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'personnel' }] }],
    }),
    defineField({
      title: 'Documentation',
      name: 'documentation',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dossier' }] }],
    }),

    defineField({
      name: 'longitude',
      type: 'number',
      title: 'Longitude',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'place',
      type: 'string',
      title: 'Place',
    }),
    defineField({
      name: 'sources',
      type: 'array',
      title: 'Sources',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
  ],
})
