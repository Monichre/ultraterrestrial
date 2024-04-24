import { XataClient } from './xata'

let instance: XataClient | undefined = undefined

export const getXataClient = () => {
  if (instance) return instance

  instance = new XataClient({
    // Override configuration here
    databaseURL: process.env.XATA_DB_ENDPOINT,
    apiKey: process.env.XATA_API_KEY,

    branch: 'main',
    // ... other configuration
  })
  return instance
}
