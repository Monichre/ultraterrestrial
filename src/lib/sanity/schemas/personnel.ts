import { defineType, defineField } from 'sanity'

export const personnel = defineType({
  name: 'personnel',
  type: 'document',
  title: 'Personnel',
  fields: [
    defineField({
      name: 'biography',
      type: 'text',
      title: 'Biography',
    }),
    defineField({
      name: 'facebook',
      type: 'url',
      title: 'Facebook URL',
    }),

    defineField({
      title: 'Organizations',
      name: 'organizations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'organization' }] }],
    }),
    defineField({
      name: 'instagram',
      type: 'url',
      title: 'Instagram URL',
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
      name: 'role',
      type: 'string',
      title: 'Role',
    }),
    defineField({
      name: 'subject_matter_authority',
      type: 'boolean',
      title: 'Subject Matter Authority',
    }),
    defineField({
      name: 'twitter',
      type: 'url',
      title: 'Twitter URL',
    }),
    defineField({
      name: 'website',
      type: 'url',
      title: 'Website URL',
    }),
    defineField({
      name: 'whistleblower',
      type: 'boolean',
      title: 'Whistleblower',
    }),
    defineField({
      name: 'witness',
      type: 'boolean',
      title: 'Witness',
    }),
  ],
})
