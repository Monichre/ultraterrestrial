import { defineType, defineField } from 'sanity'

export const testimony = defineType({
  name: 'testimony',
  type: 'document',
  title: 'Testimony',
  fields: [
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
    }),

    defineField({
      name: 'event',
      type: 'reference',
      to: [{ type: 'event' }],
    }),

    defineField({
      name: 'Image',
      type: 'image',
      title: 'Image',
    }),

    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
    }),

    defineField({
      name: 'video',
      type: 'file',
      title: 'Video Video',
    }),

    defineField({
      name: 'witness',
      type: 'reference',
      to: [{ type: 'personnel' }],
    }),

    defineField({
      title: 'Evidence',
      name: 'evidence',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dossier' }] }],
    }),
  ],
})
