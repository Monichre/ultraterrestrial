// Start Generation Here
import { XataFile } from '@xata.io/client'
import axios from 'axios'
import { getXataClient } from '../processing/src/index' // Adjust the path as necessary

/**
 * Downloads an image from the given URL and returns it as a base64 string.
 * @param url - The URL of the image to download.
 * @returns A promise that resolves to the base64-encoded image string.
 */
const downloadImageAsBase64 = async ( url: string ): Promise<string> => {
  try {
    const response = await axios.get<ArrayBuffer>( url, { responseType: 'arraybuffer' } )
    const base64 = Buffer.from( response.data ).toString( 'base64' )
    return base64
  } catch ( error ) {
    console.error( `Failed to download image from ${url}:`, error )
    throw new Error( `Download failed for URL: ${url}` )
  }
}

/**
 * Uploads images to the 'images' column of each record by downloading them from the 'photos' URLs.
 */
const uploadTableImages = async (): Promise<void> => {
  const xata = getXataClient()

  try {
    // Fetch all records with 'id' and 'photos' columns
    const records = await xata.db.artifacts.select( ['id', 'photos'] ).getAll()

    if ( !records.length ) {
      console.log( 'No records found to process.' )
      return
    }

    for ( const record of records ) {
      const { id, photos } = record

      if ( !photos || !Array.isArray( photos ) || photos.length === 0 ) {
        console.warn( `Record with ID ${id} has no photos to process.` )
        continue
      }

      const uploadedImages: XataFile[] = []

      for ( const photoUrl of photos ) {
        try {
          const base64Image = await downloadImageAsBase64( photoUrl )
          const xataFile = XataFile.fromBase64( base64Image )
          uploadedImages.push( xataFile )
        } catch ( error ) {
          console.error( `Error processing photo URL ${photoUrl} for record ID ${id}:`, error )
          // Continue processing other photos
        }
      }

      if ( uploadedImages.length > 0 ) {
        try {
          await xata.db.artifacts.update( id, {
            images: uploadedImages,
          } )
          console.log( `Successfully updated record ID ${id} with uploaded images.` )
        } catch ( updateError ) {
          console.error( `Failed to update record ID ${id} with images:`, updateError )
        }
      } else {
        console.warn( `No images uploaded for record ID ${id}.` )
      }
    }

    console.log( 'Image upload process completed.' )
  } catch ( error ) {
    console.error( 'An error occurred while uploading table images:', error )
  } finally {
    await xata.close()
  }
}

// Execute the image upload process
uploadTableImages().catch( ( err ) => {
  console.error( 'Unhandled error in uploadTableImages:', err )
  process.exit( 1 )
} )
