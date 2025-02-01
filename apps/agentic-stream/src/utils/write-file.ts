'use server'
const path = require( 'path' )
const fs = require( 'fs' )

interface WriteFileParams {
  folderName: string
  content: string
  imageUrl: string
}

export async function writeFile( { folderName, content, imageUrl }: WriteFileParams ): Promise<void> {

  console.log( "🚀 ~ file: write-file.ts:13 ~ writeFile ~ imageUrl:", imageUrl )

  // Create folder if it doesn't exist
  const folderPath = path.join( __dirname, folderName )
  try {
    await fs.mkdir( folderPath, { recursive: true } )
  } catch ( error ) {
    console.error( `Error creating folder ${folderPath}:`, error )
    throw error
  }

  // Write content to markdown file
  const markdownFilePath = path.join( folderPath, 'content.md' )
  try {
    await fs.writeFile( markdownFilePath, JSON.stringify( content ), 'utf8' )
  } catch ( error ) {
    console.error( `Error writing file ${markdownFilePath}:`, error )
    throw error
  }

  // Download image and save to folder
  const imageResponse = await fetch( imageUrl )

  console.log( "🚀 ~ file: write-file.ts:28 ~ writeFile ~ imageResponse:", imageResponse )

  if ( !imageResponse.ok ) {
    throw new Error( `Failed to download image from ${imageUrl}` )
  }
  // const imageBuffer = await imageResponse.buffer();
  // const imageFilePath = path.join(folderPath, 'image.webp');
  // await fs.writeFile(imageFilePath, imageBuffer);

  console.log( `Content and image saved to ${folderPath}` )
}
