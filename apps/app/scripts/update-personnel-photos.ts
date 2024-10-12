
import { xata } from "@/services/xata"

import fs from 'fs/promises'
import path from 'path'
export const updatePersonnelPhotos = async () => {
  const personnel = await xata.db.personnel.getAll()
  console.log( "🚀 ~ file: update-personnel-photos.ts:10 ~ updatePersonnelPhotos ~ personnel:", personnel )

  const readImageFiles = async ( directory: string ): Promise<string[]> => {
    const files = await fs.readdir( directory )
    return files.filter( file => /\.(jpg|jpeg|png|webp)$/i.test( file ) )
  }

  const matchImageToPersonnel = ( personnel: any[], imageFiles: string[] ): { [key: string]: string } => {
    const matchedImages: { [key: string]: string } = {}

    personnel.forEach( ( person, index ) => {
      const formattedName = person.name.toLowerCase().replace( /\s+/g, '-' )
      const imageName = imageFiles.find( file => new RegExp( `^${formattedName}` ).test( file ) )
      if ( imageName ) {
        matchedImages[person.name] = imageName
      }
    } )

    return matchedImages
  }

  const updatePersonnelPhotos = async () => {
    const personnel = await xata.db.personnel.getAll()
    console.log( "🚀 ~ file: update-personnel-photos.ts:10 ~ updatePersonnelPhotos ~ personnel:", personnel )

    const imageDirectory = path.join( __dirname, './uploads/personnel' )
    console.log( "Image directory path:", imageDirectory )

    const imageFiles = await readImageFiles( imageDirectory )
    console.log( "Image files found:", imageFiles )

    const matchedImages = matchImageToPersonnel( personnel, imageFiles )
    console.log( "Matched images to personnel:", matchedImages )

    console.log( "Matched Images:", matchedImages )

    const convertImageToBase64 = async ( filePath: string ): Promise<string> => {
      const fileBuffer = await fs.readFile( filePath )
      return fileBuffer.toString( 'base64' )
    }

    const updatePersonnelWithPhotos = async ( personnel: any[], matchedImages: { [key: string]: string } ) => {
      for ( const person of personnel ) {
        const imageName = matchedImages[person.name]
        if ( imageName ) {
          const imagePath = path.join( __dirname, './uploads/personnel', imageName )
          const base64Content = await convertImageToBase64( imagePath )
          await xata.db.personnel.update( person.id, { photo: base64Content } )
          console.log( `Updated photo for ${person.name}` )
        }
      }
    }

    await updatePersonnelWithPhotos( personnel, matchedImages )

  }

  updatePersonnelPhotos()

}

