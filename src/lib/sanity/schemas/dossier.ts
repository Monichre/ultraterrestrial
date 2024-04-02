import { defineType, defineField } from 'sanity'

export const dossier = defineType({
  name: 'dossier',
  type: 'document',
  title: 'Dossier',
  fields: [
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
    }),

    defineField({
      name: 'file',
      type: 'url',
      title: 'File Link',
    }),

    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'Author',
      type: 'reference',
      to: [{ type: 'personnel' }],
    }),
    defineField({
      title: 'Topics',
      name: 'topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    }),
  ],
})
