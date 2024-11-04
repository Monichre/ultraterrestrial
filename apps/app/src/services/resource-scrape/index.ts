import { fireCrawl } from '@/services/resource-scrape/firecrawl.client'
import { READER_URL } from '@/services/resource-scrape/jina.confg'

import { EXTERNAL_RESOURCES } from '@/utils'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
export const scrapeAllExternalDisclosureResources = async () => {
  const fullResourceScrape = await Promise.all(
    EXTERNAL_RESOURCES.map( async ( resource ) => {
      const scrapeResponse = await fireCrawl.scrapeUrl( resource, {
        formats: ['markdown', 'html'],
      } )
      return {
        source: resource,
        data: scrapeResponse,
      }
    } )
  )
  console.log( 'fullResourceScrape: ', fullResourceScrape )
  return fullResourceScrape
}

export const crawlAllExternalDisclosureResources = async () => {
  const fullResourceCrawl = await Promise.all(
    EXTERNAL_RESOURCES.map( async ( resource ) => {
      const crawlResponse = await fireCrawl.crawlUrl( resource, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
        },
      } )
      return {
        source: resource,
        data: crawlResponse,
      }
    } )
  )
  console.log( 'fullResourceCrawl: ', fullResourceCrawl )
  return fullResourceCrawl
}



export const scrapeWithJina = async ( url: string ) => {
  const source = `${READER_URL}/${url.trim()}`.replace( / /g, '%20' )
  const headers = {
    'Authorization': `Bearer ${process.env.JINA_API_KEY}`,
    "X-Target-Selector": ".primary.primary-sidebar",
    "X-With-Links-Summary": "true",
    "X-With-Images-Summary": "true",
    "X-With-Generated-Alt": "true",
    "Accept": "application/json"

  }

  const response = await axios.get( source, { headers } )
    .then( response => {
      console.log( response.data )
      return response.data
    } )
    .catch( error => {
      console.error( error )
    } )
  console.log( "🚀 ~ file: index.ts:45 ~ scrapeWithJina ~ response:", response )


  return response
}

export const scrapeWithFireCrawl = async ( url: string ) => {
  return await fireCrawl.scrapeUrl( url, {
    formats: ['markdown', 'html'],
  } )
}

const chunk = ( arr: any, size: any ) => {
  return Array.from( { length: Math.ceil( arr.length / size ) }, ( _, i ) => arr.slice( i * size, ( i + 1 ) * size ) )
}



const writeScrapeResults = async ( results: any ) => {
  const dir = path.resolve( __dirname, '../../../docs/scrape' )

  if ( !fs.existsSync( dir ) ) {
    fs.mkdirSync( dir, { recursive: true } )
  }

  results.forEach( ( result: any, index: number ) => {
    const filePath = path.join( dir, `scrape_result_${index + 1}.json` )
    fs.writeFileSync( filePath, JSON.stringify( result, null, 2 ) )
  } )
}



