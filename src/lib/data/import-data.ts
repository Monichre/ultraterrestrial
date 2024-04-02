import axios from 'axios'
// import { transform } from './transform'
import { personnel } from './personnel'
import { topics } from './topics'
import { client } from '../sanity/lib/client'
// import { SupbasePersonnel } from '@/lib/supabase/model.types'

const formatPersonnelSchema: any = (person: any) => {
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

//   curl 'https://kod5oy4t.api.sanity.io/v2021-06-07/data/mutate/production' \
// -H 'Authorization: Bearer skHkYBW2jPAMrCi5rgocL4NpXVCOJeCRC2RznwQscx8cEMwKi8GUT1ANF5p5wGNbSrExu8SWt9FInoOYzIvH6FMqMQgB36Pu0sG6UmzqfXuM7dWwiSM7KcX9bfcn3f8s4YeVlcHkcwCsXuL2iY3mOeORBhFpY6kUhd1tG6NecAl78IpUbU5H' \
// -H 'Content-Type: application/json' \
// --data-binary '{"mutations":[<transactions>]}'

// const sanityApiKey =
// 'skHkYBW2jPAMrCi5rgocL4NpXVCOJeCRC2RznwQscx8cEMwKi8GUT1ANF5p5wGNbSrExu8SWt9FInoOYzIvH6FMqMQgB36Pu0sG6UmzqfXuM7dWwiSM7KcX9bfcn3f8s4YeVlcHkcwCsXuL2iY3mOeORBhFpY6kUhd1tG6NecAl78IpUbU5H'

// const postToSanity = async (transactions: any) => {
//   const request = await axios({
//     url: 'https://kod5oy4t.api.sanity.io/v2021-06-07/data/mutate/production',
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${sanityApiKey}`,
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify({
//       mutations: transactions,
//     }),
//   })
//   console.log('request: ', request)
// }

export const importPersonnel = async () => {
  // const personnelMutations = transform(personnel, 'personnel')
  // console.log('personnelMutations: ', personnelMutations)

  const res = await Promise.all(
    personnel.map(async (item: any) => {
      await client.create(item).then((res) => {
        console.log(`Bike was created, document ID is ${res._id}`)
      })
    })
  )
  console.log('res: ', res)
  // const topicMutations = transform(topics, 'topic')
  // console.log('topicMutations: ', topicMutations)
  // await postToSanity([...topicMutations, ...personnelMutations])
}

export const importTopics = async () => {
  // const personnelMutations = transform(personnel, 'personnel')
  // console.log('personnelMutations: ', personnelMutations)

  console.log('topics: ', topics)
  const res = await Promise.all(
    topics.map(async (item: any) => {
      await client.create(item).then((res) => {
        console.log(`topic was created, document ID is ${res._id}`)
      })
    })
  )
  console.log('res: ', res)
  // const topicMutations = transform(topics, 'topic')
  // console.log('topicMutations: ', topicMutations)
  // await postToSanity([...topicMutations, ...personnelMutations])
}
