import { defineType, defineField } from 'sanity'

export const organization = defineType({
  name: 'organization',
  type: 'document',
  title: 'Organization',
  fields: [
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),

    defineField({
      name: 'location_id',
      type: 'number',
      title: 'Location ID',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'picture',
      type: 'image',
      title: 'Picture',
    }),

    defineField({
      title: 'Members',
      name: 'members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'personnel' }] }],
    }),
    defineField({
      name: 'specialization',
      type: 'string',
      title: 'Specialization',
    }),
    defineField({
      name: 'website',
      type: 'url',
      title: 'Website URL',
    }),
  ],
})
