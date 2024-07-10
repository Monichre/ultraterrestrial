import axios from 'axios'

export const searchConnections = async ({ id, type, tables }) => {
  try {
    const response = await axios.get('/api/data/search', {
      params: {
        id,
        type,
        tables,
      },
    })
    console.log('response: ', response)
    // Handle the response data here
    console.log(response.data)
    return response.data
  } catch (error) {
    // Handle the error here
    console.error(error)
  }
}
