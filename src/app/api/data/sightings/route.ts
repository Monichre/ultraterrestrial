import fs from 'fs'
import path from 'path'

export async function GET(request: any) {
  try {
    // Use process.cwd() to get the current working directory
    const filePath = path.join(process.cwd(), 'public', 'sightings.geojson') // Adjust path if needed
    console.log('filePath: ', filePath)

    // Read the file contents
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    console.log('fileContents: ', fileContents)

    // Parse the JSON content
    const geojson = JSON.parse(fileContents)
    console.log('geojson: ', geojson)

    // Return the parsed GeoJSON content
    return new Response(JSON.stringify({ data: geojson }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error reading GeoJSON file:', error)

    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Failed to read GeoJSON file' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
