import { SupbasePersonnel } from '@/lib/supabase/model.types'

const formatPersonnelSchema: any = (person: SupbasePersonnel) => {
  return {
    _type: 'personnel',
    biography: person?.biography,
    facebook: person?.facebook,
    twitter: person?.twitter,
    instagram: person?.instagram,
    name: person?.name,
    role: person?.role,
    subject_matter_authority: person?.subject_matter_authority,
    website: person?.website,
    picture: person?.picture,
    whistleblower: person?.whistleblower,
  }
}

const dataTypeMappings: any = {
  personnel: formatPersonnelSchema,
  topic: (item: any) => item,
}

export const transform = (data: any[], type: string | number) => {
  const transformed = data.map((item: any) => {
    const createThis = dataTypeMappings[type](item)
    const mutation = {
      create: {
        ...createThis,
      },
    }
    console.log('mutation: ', mutation)
    return mutation
  })
  console.log('transformed: ', transformed)
  return transformed
}
