import { DISCLOSURE_ASSISTANT_ID } from '../openai/config'
import { mem0AI } from './client'

export const rememberThisShitForever = () => {}

export const makeSurePartyMartianRemembersThisShit = async ({
  shitToRemember,
  metadata,
}) => {
  const agent_id = DISCLOSURE_ASSISTANT_ID
  const gotIt = await mem0AI.add(shitToRemember, { agent_id, ...metadata })
  return gotIt
}
export const doYouRemember = async ({ query, metadata }) => {
  return await mem0AI
    .search(query, { ...metadata })
    .then((results) => console.log(results))
    .catch((error) => console.error(error))
}

export const storeUserCoreMemory = async ({
  user,
  shitToRemember,
  metadata,
}) => {
  const res = await mem0AI.add(shitToRemember, {
    user_id: user.id,
    ...metadata,
  })
  console.log('res: ', res)
}

export const traumaDrumpUserCoreMemories = async ({ user }) => {
  const userTrauma = await mem0AI
    .getAll({ user_id: user.id })
    .then((memories) => console.log(memories))
    .catch((error) => console.error(error))

  console.log('userTrauma: ', userTrauma)
  return userTrauma
}

export const traumaDrumpPartyMartiansMemories = async () => {
  const agent_id = DISCLOSURE_ASSISTANT_ID
  const trauma = await mem0AI
    .getAll({ agent_id })
    .then((memories) => console.log(memories))
    .catch((error) => console.error(error))
  console.log('trauma: ', trauma)

  return trauma
}

export const withMemoryCustomization = async ({ messages, includes }: any) => {
  const customizedMemory = await mem0AI.add(messages, {
    includes,
    agent_id: DISCLOSURE_ASSISTANT_ID,
  })
}

export const rememberEntityConnections = async ({
  type,
  source,
  assistantAnswer,
}: any) => {
  const customCategories = {
    events: 'event-connections',
    personnel: 'personnel-connections',
    topics: 'topic-connections',
    testimonies: 'testimony-connections',
    organizations: 'organization-connections',
  }
  const category =
    customCategories[type as keyof typeof customCategories] || type // }source, connections
  const memory = await mem0AI.add({
    messages: [assistantAnswer.content[0].text],
    // @ts-ignore
    metadata: {
      source,
      assistantAnswer,
    },
    // @ts-ignore
    custom_categories: {
      ...category,
    },
    // @ts-ignore
    agent_id: DISCLOSURE_ASSISTANT_ID,
    // @ts-ignore
    includes: `${source.id}-connections`,
  })
  console.log('memory: ', memory)
  return memory
}
