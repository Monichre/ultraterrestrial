export function parseApiResponse({ text }: any): object | null {
  // Extract the message value
  const messageValue = text.value

  // Locate the JSON-like string start and end positions
  const jsonStartIndex = messageValue.indexOf('```json\n') + 8
  const jsonEndIndex = messageValue.indexOf('```', jsonStartIndex)

  // Extract the JSON-like string
  const jsonString = messageValue.substring(jsonStartIndex, jsonEndIndex)

  // Parse the JSON string into an object
  try {
    const parsedObject = JSON.parse(jsonString)
    console.log('parsedObject: ', parsedObject)
    return parsedObject
  } catch (error) {
    console.error('Error parsing JSON string:', error)
    return null
  }
}
// Rest of the code...

export const formatRelatedItems = (
  items: {
    type: string
    name: string
    role?: string
    bio?: string
    description?: string
    date?: string
  }[]
) => {
  return items
    .map((item) => `${item.name} - ${item.role || item?.date}`)
    .join(', ')
}
export const filterConnectionsByRelevance = (connections: any) => {
  const relevant: any = {}
  const irrelevant: any = {}
  for (const key in connections) {
    if (connections[key]['Relevance Score'] > 5) {
      relevant[key] = connections[key]
    } else {
      irrelevant[key] = connections[key]
    }
  }
  return {
    relevant,
    irrelevant,
  }
}
export const createMessage = (items: string | any[]) =>
  items?.length && items?.length < 2 ? `How is` : 'How are'
