import { defineType, defineField } from 'sanity'

export const topic = defineType({
  name: 'topic',
  type: 'document',
  title: 'Topic',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),

    defineField({
      title: 'Subject Matter Authorities',
      name: 'subjectMatterAuthorities',
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
      title: 'Related Events',
      name: 'relatedEvents',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
  ],
})
