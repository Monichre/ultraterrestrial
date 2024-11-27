// // SPDX-FileCopyrightText: 2024 LiveKit, Inc.
// //
// // SPDX-License-Identifier: Apache-2.0
// import {
//   type JobContext,
//   WorkerOptions,
//   cli,
//   defineAgent,
//   type llm,
//   multimodal,
// } from '@livekit/agents'
// import * as openai from '@livekit/agents-plugin-openai'
// import { fileURLToPath } from 'node:url'
import { createNewMemory, getSignedUploadUrl } from '@/services/langbase/remember'
import { addCustomizedMemory } from '@/services/mem'
import { JobContext, WorkerOptions, cli, defineAgent, llm, multimodal } from '@livekit/agents'
import * as openai from '@livekit/agents-plugin-openai'
import FirecrawlApp from '@mendable/firecrawl-js'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
// Start of Selection
import fs from 'fs/promises'

export default defineAgent( {
  entry: async ( ctx: JobContext ) => {
    await ctx.connect()
    const participant = await ctx.waitForParticipant()

    const fncCtx: llm.FunctionContext = {
      weather: {
        description: 'Get the weather in a location',
        parameters: z.object( {
          location: z.string().describe( 'The location to get the weather for' ),
        } ),
        execute: async ( { location } ) => {
          console.debug( `executing weather function for ${location}` )
          const response = await fetch( `https://wttr.in/${location}?format=%C+%t` )
          if ( !response.ok ) {
            throw new Error( `Weather API returned status: ${response.status}` )
          }
          const weather = await response.text()
          return `The weather in ${location} right now is ${weather}.`
        },
      },
      scrape_data: {
        description: 'gets a url and scrapes data from it using @Firecrawl.',
        parameters: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to scrape data from',
            },
          },
          required: ['url'],
          additionalProperties: false,
        },
        execute: async ( { url }: { [key: string]: any } ) => {

          console.log( "🚀 ~ file: ConsolePage.tsx:512 ~ url:", url )

          const firecrawl = new FirecrawlApp( {
            apiKey: 'fc-22d136e7c1484888b4ba53b1a85da50e',
          } )
          const data = await firecrawl.scrapeUrl( url, {
            formats: ['markdown', "links", 'screenshot'],

            // includeTags: ['.key-data', '.key-links']
          } )

          console.log( "🚀 ~ file: ConsolePage.tsx:519 ~ data:", data )

          if ( !data.success ) {
            return 'Failed to scrape data from the given URL.'
          }
          if ( data?.markdown && data.metadata ) {
            const { metadata: {
              description,
              keywords,
              title,
              ogImage,
              sourceUrl
            }, markdown, links }: any = data
            const folderName = sourceUrl?.split( '/' ).pop() || 'docs'
            // Start of Selection
            const memory = await createNewMemory( {
              name: title,
              description: `Description: ${description}\nkeywords: ${keywords && Array.isArray( keywords ) ? keywords.join( ', ' ) : keywords}`
            } )



            console.log( "🚀 ~ file: ConsolePage.tsx:591 ~ memory:", memory )
            const signedUrl = await getSignedUploadUrl( { memoryName: memory.name, fileName: `${title}.md` } )

            console.log( "🚀 ~ file: ConsolePage.tsx:556 ~ signedUrl:", signedUrl )

            // // await writeFile( { folderName, content: markdown, imageUrl: ogImage } )
            // setScrapeBucket( ( scrapeBucket: any ) => [...scrapeBucket, { ...data }] )
            // const newState = webData?.length ? [...webData, {
            //   markdown: data?.markdown,
            //   screenshot: data.screenshot ?? ''
            // }] : [{
            //   markdown: data?.markdown,
            //   screenshot: data.screenshot ?? ''
            // }]
            // setWebData( newState )
            // setScreenshot( data.screenshot ?? '' )
            // setScreenshots( ( screenShots: string[] ) => [...screenShots, data.screenshot ?? ''] )
            return data
          }
        }
      },
      map_website: {
        description:
          'Go to website and search for pages with a specific keyword.',
        parameters: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to map',
            },
            search: {
              type: 'string',
              description: 'Keywords to search for (2-3 max)',
            },
          },
          required: ['url', 'search'],
        },
        execute: async ( { url, search }: { [key: string]: any } ) => {
          const firecrawl = new FirecrawlApp( {

            apiKey: 'fc-22d136e7c1484888b4ba53b1a85da50e',
          } )

          const map_data = await firecrawl.mapUrl( url, { search: search } )
          if ( !map_data.success ) {
            return 'Failed to map data from the given URL.'
          }

          const top_link = map_data.links?.[0]
          if ( !top_link ) {
            return 'No links found for the given search criteria.'
          }

          const scrape_data = await firecrawl.scrapeUrl( top_link, {
            formats: ['markdown', 'screenshot'],
          } )
          if ( !scrape_data.success ) {
            return 'Failed to scrape data from the top link.'
          }
          // Start Generation Here
          try {
            const fileType: 'markdown' | 'pdf' = 'markdown' // Change to 'pdf' if needed

            const fileName = `${scrape_data.metadata.title}.${fileType === 'markdown' ? 'md' : 'pdf'}`
            const filePath = `/path/to/save/${fileName}` // Update the path as necessary

            if ( fileType === 'markdown' ) {
              await fs.promises.writeFile( filePath, scrape_data.markdown, 'utf8' )
            } else if ( fileType === 'pdf' ) {
              // Implement PDF generation logic here
              const pdfBytes = await generatePdfFromMarkdown( scrape_data.markdown )
              await fs.promises.writeFile( filePath, pdfBytes )
            }

            console.log( `File ${fileName} has been saved successfully.` )
          } catch ( error ) {
            console.error( 'Error writing file:', error )
          }
          // const newData: any = webData?.length ? [...webData, {
          //   markdown: scrape_data.markdown,
          //   screenshot: scrape_data.screenshot
          // }] : [{
          //   markdown: scrape_data.markdown,
          //   screenshot: scrape_data.screenshot
          // }]

          // setWebData( newData )

          return scrape_data.markdown
        }
      },
      file_upload: {
        description: 'Upload a CSV file containing URLs, parse them with PapaParse, scrape each URL with Firecrawl, and save to memory using mem0ai',
        parameters: {
          type: 'object',
          properties: {
            fileContent: {
              type: 'string',
              description: 'The content of the CSV file as a string',
            },
            urlColumnName: {
              type: 'string',
              description: 'The name of the column containing URLs in the CSV file',
            }
          },
          required: ['fileContent', 'urlColumnName'],
          additionalProperties: false,
        },
        execute: async ( { fileContent, urlColumnName } ) => {

          const parseResult = Papa.parse( fileContent, {
            header: true,
            skipEmptyLines: true
          } )
          const urls = parseResult.data
            .map( ( value: unknown ) => {
              const row = value as Record<string, string>
              return row[urlColumnName]
            } )
            .filter( ( url: unknown ): url is string =>
              typeof url === 'string' && url.trim() !== ''
            )

          // Use the existing firecrawl instance instead of creating a new one
          for ( const url of urls ) {
            try {
              const scrapedData: any = await firecrawl.scrapeUrl( url, {
                formats: ['markdown', 'links', 'screenshot']
              } )

              if ( scrapedData?.markdown && scrapedData.metadata ) {
                const { metadata: {
                  description,
                  keywords,
                  title
                }, markdown }: any = scrapedData
                console.log( "🚀 ~ file: ConsolePage.tsx:621 ~ scrapedData:", scrapedData )

                const memory = await addCustomizedMemory( {
                  messages: [{
                    role: 'user',
                    content: markdown
                  }],
                  includes: `${title}, ${keywords}`
                } )
                console.log( "🚀 ~ file: ConsolePage.tsx:620 ~ memory:", memory )
                // const summary = await summarize(
                //   markdown
                // )

                // console.log( "🚀 ~ file: ConsolePage.tsx:633 ~ summary:", summary )
                // addCustomizedMemory
                // Use your local memory system
                // const memory = await createNewMemory( {
                //   name: title || url,
                //   description: `Description: ${description}\nKeywords: ${keywords && Array.isArray( keywords ) ? keywords.join( ', ' ) : keywords}`
                // } )

                // const signedUrl = await getSignedUploadUrl( {
                //   memoryName: memory.name,
                //   fileName: `${title || 'scrape'}.md`
                // } )

                // Update UI state
                setScrapeBucket( ( prevBucket: any ) => [...prevBucket, { ...scrapedData }] )
                setWebData( ( prevData: string | any[] ) => {
                  const newItem = {
                    markdown: scrapedData.markdown,
                    screenshot: scrapedData.screenshot ?? ''
                  }
                  return prevData?.length ? [...prevData, newItem] : [newItem]
                } )
                setScreenshots( prev => [...prev, scrapedData.screenshot ?? ''] )
              }
            } catch ( error ) {
              console.error( `Error processing URL ${url}:`, error )
            }
          }

          return { ok: true, message: `Processed ${urls.length} URLs successfully` }

        },
      }
    }
    const model = new openai.realtime.RealtimeModel( {
      instructions: 'You are a helpful assistant.',
      apiKey: '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',
    } )

    const agent = new multimodal.MultimodalAgent( {
      model,
      fncCtx,
    } )


    const session = await agent
      .start( ctx.room, participant )
      .then( ( session ) => session as openai.realtime.RealtimeSession )

    session.conversation.item.create( {
      type: 'message',
      role: 'assistant',
      // @ts-ignore
      content: [{ type: 'input_text', text: 'Say "How can I help you today?"' }],
    } )
    session.response.create()
  },
} )

cli.runApp( new WorkerOptions( { agent: fileURLToPath( import.meta.url ) } ) );

