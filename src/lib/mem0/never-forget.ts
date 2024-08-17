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
