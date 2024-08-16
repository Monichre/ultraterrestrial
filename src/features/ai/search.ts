import axios from 'axios'

export const searchConnections = async ({ id, type }: any) => {
  try {
    const response = await axios.get('/api/data/search/connections', {
      params: {
        id,
        type,
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

export const searchAndEnrichConnections = async ({ subject, type }: any) => {
  try {
    const response = await axios.post('/api/data/enrich', {
      data: {
        subject,
        type,
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

export const searchTable = async ({
  keyword,
  table,
}: {
  keyword: string
  table: string
}) => {
  try {
    const response = await axios.get('/api/data/search/table', {
      params: {
        keyword,
        table,
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
