'use client'
import { instructions } from "@/utils/conversation_config"
import * as React from "react"
import { useCallback, useEffect, useRef, useState } from 'react'

import { Toggle } from "@/components/toggle/Toggle"
import { Button } from "@/components/ui/button"
import { createNewMemory, getSignedUploadUrl } from "@/services/langbase/remember"
import { addCustomizedMemory } from "@/services/mem"
import { WavRecorder, WavStreamPlayer } from "@/services/wavtools"
import { WavRenderer } from "@/utils/wav_renderer"
import FirecrawlApp from "@mendable/firecrawl-js"
import { RealtimeClient } from '@openai/realtime-api-beta'
import type { ItemType } from "@openai/realtime-api-beta/dist/lib/client"
import { ArrowDown, ArrowUp, FileIcon, X, Zap } from "lucide-react"
import './console.css'

import Papa from 'papaparse'
import ReactMarkdown from 'react-markdown'
const firecrawl = new FirecrawlApp( {
  apiKey: 'fc-22d136e7c1484888b4ba53b1a85da50e',
} )

const client = new RealtimeClient( {
  apiKey: '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',
  dangerouslyAllowAPIKeyInBrowser: true,
  debug: true,
} )
// Set instructions
client.updateSession( { instructions: instructions } )
// Set transcription, otherwise we don't get user transcriptions back
client.updateSession( { input_audio_transcription: { model: 'whisper-1' } } )
client.updateSession( {
  tools: [
    {
      name: 'scrape_data',
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
      }
    },
    {
      name: 'file_upload',
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
      }
    }
  ]
} )

const wavRecorder = new WavRecorder( { sampleRate: 24000 } )
const wavStreamPlayer = new WavStreamPlayer( { sampleRate: 24000 } )
/**
 * Type for result from get_weather() function call
 */
interface Coordinates {
  lat: number
  lng: number
  location?: string
  temperature?: {
    value: number
    units: string
  }
  wind_speed?: {
    value: number
    units: string
  }
}

/**
 * Type for all event logs
 */
interface RealtimeEvent {
  time: string
  source: 'client' | 'server'
  count?: number
  event: { [key: string]: any }
}

// Initialize mem0ai client
// const mem0ai = new Mem0AI({
//   apiKey: process.env.MEM0AI_API_KEY
// });

// Function to handle file processing


export function ConsolePage() {
  /**
   * Ask user for API Key
   * If we're using the local relay server, we don't need this
   */

  /**ˆ
   * Instantiate:
   * - WavRecorder (speech input)
   * - WavStreamPlayer (speech output)
   * - RealtimeClient (API client)
   */

  /**
   * References for
   * - Rendering audio visualization (canvas)
   * - Autoscrolling event logs
   * - Timing delta for event log displays
   */
  const clientCanvasRef = useRef<HTMLCanvasElement>( null )
  const serverCanvasRef = useRef<HTMLCanvasElement>( null )
  const eventsScrollHeightRef = useRef( 0 )
  const eventsScrollRef = useRef<HTMLDivElement>( null )
  const startTimeRef = useRef<string>( new Date().toISOString() )




  /**
   * All of our variables for displaying application state
   * - items are all conversation items (dialog)
   * - realtimeEvents are event logs, which can be expanded
   * - memoryKv is for set_memory() function
   * - coords, marker are for get_weather() function
   */
  const [items, setItems] = useState<ItemType[]>( [] )
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>( [] )
  const [expandedEvents, setExpandedEvents] = useState<{
    [key: string]: boolean
  }>( {} )
  const [isConnected, setIsConnected] = useState( false )
  const [canPushToTalk, setCanPushToTalk] = useState( true )
  const [isRecording, setIsRecording] = useState( false )
  const [memoryKv, setMemoryKv] = useState<{ [key: string]: any }>( {} )
  const [coords, setCoords] = useState<Coordinates | null>( {
    lat: 37.775593,
    lng: -122.418137,
  } )
  const [marker, setMarker] = useState<Coordinates | null>( null )
  const [scrapeBucket, setScrapeBucket] = useState<any>( [] )

  const [screenshot, setScreenshot] = useState<string>( '' )
  const [screenshots, setScreenshots] = useState<string[]>( [] )
  const [webData, setWebData] = useState<any>( null )
  console.log( "🚀 ~ file: ConsolePage.tsx:117 ~ ConsolePage ~ webData:", webData )

  useEffect( () => {
    // Connect to microphone
    wavRecorder.begin()

    // Connect to audio output
    wavStreamPlayer.connect()

  }, [] )

  /**
   * Utility for formatting the timing of logs
   */
  const formatTime = useCallback( ( timestamp: string ) => {
    const startTime = startTimeRef.current
    const t0 = new Date( startTime ).valueOf()
    const t1 = new Date( timestamp ).valueOf()
    const delta = t1 - t0
    const hs = Math.floor( delta / 10 ) % 100
    const s = Math.floor( delta / 1000 ) % 60
    const m = Math.floor( delta / 60_000 ) % 60
    const pad = ( n: number ) => {
      let s = n + ''
      while ( s.length < 2 ) {
        s = '0' + s
      }
      return s
    }
    return `${pad( m )}:${pad( s )}.${pad( hs )}`
  }, [] )

  /**
   * When you click the API key
   */
  const resetAPIKey = useCallback( () => {
    const apiKey = prompt( 'OpenAI API Key' )
    if ( apiKey !== null ) {
      localStorage.clear()
      localStorage.setItem( 'tmp::voice_api_key', apiKey )
      window.location.reload()
    }
  }, [] )

  /**
   * Connect to conversation:
   * WavRecorder taks speech input, WavStreamPlayer output, client is API client
   */
  const connectConversation = useCallback( async () => {

    // Set state variables
    startTimeRef.current = new Date().toISOString()
    setIsConnected( true )
    setRealtimeEvents( [] )
    setItems( client.conversation.getItems() )

    try {
      await client.connect()


      client.sendUserMessageContent( [
        {
          type: `input_text`,
          text: `Hello!`,
          // text: `For testing purposes, I want you to list ten car brands. Number each item, e.g. "one (or whatever number you are one): the item name".`
        },
      ] )

      if ( client.getTurnDetectionType() === 'server_vad' ) {
        await wavRecorder.record( ( data ) => client.appendInputAudio( data.mono ) )
      }
    } catch ( error ) {
      console.error( error )
    }

    // Connect to realtime API

  }, [] )

  /**
   * Disconnect and reset conversation state
   */
  const disconnectConversation = useCallback( async () => {
    setIsConnected( false )
    setRealtimeEvents( [] )
    setItems( [] )
    setMemoryKv( {} )
    setCoords( {
      lat: 37.775593,
      lng: -122.418137,
    } )
    setMarker( null )

    client.disconnect()

    await wavRecorder.end()

    await wavStreamPlayer.interrupt()
  }, [] )

  const deleteConversationItem = useCallback( async ( id: string ) => {

    client.deleteItem( id )
  }, [] )

  /**
   * In push-to-talk mode, start recording
   * .appendInputAudio() for each sample
   */
  const startRecording = async () => {
    setIsRecording( true )

    const trackSampleOffset = await wavStreamPlayer.interrupt()
    if ( trackSampleOffset?.trackId ) {
      const { trackId, offset } = trackSampleOffset
      await client.cancelResponse( trackId, offset )
    }
    await wavRecorder.record( ( data ) => client.appendInputAudio( data.mono ) )
  }

  /**
   * In push-to-talk mode, stop recording
   */
  const stopRecording = async () => {
    setIsRecording( false )

    await wavRecorder.pause()
    client.createResponse()
  }

  const onFileUpload = async ( e: React.ChangeEvent<HTMLInputElement> ) => {

    const file = e.target.files?.[0]
    if ( !file ) return

    const reader = new FileReader()
    reader.onload = async ( event ) => {
      const fileContent = event.target?.result as string
      if ( !fileContent ) return

      client.sendUserMessageContent( [{
        type: 'input_text',
        text: `I'm uploading a CSV file with URLs. Please process it using the file_upload tool. The column containing URLs is named "url".`
      }] )

      // Send file content separately to avoid type error
      client.sendUserMessageContent( [{


        type: 'input_text',
        text: fileContent

      }] )
    }
    reader.readAsText( file )

  }
  /**
   * Switch between Manual <> VAD mode for communication
   */
  const changeTurnEndType = async ( value: string ) => {

    if ( value === 'none' && wavRecorder.getStatus() === 'recording' ) {
      await wavRecorder.pause()
    }
    client.updateSession( {
      turn_detection: value === 'none' ? null : { type: 'server_vad' },
    } )
    if ( value === 'server_vad' && client.isConnected() ) {
      await wavRecorder.record( ( data ) => client.appendInputAudio( data.mono ) )
    }
    setCanPushToTalk( value === 'none' )
  }

  /**
   * Auto-scroll the event logs
   */
  useEffect( () => {
    if ( eventsScrollRef.current ) {
      const eventsEl = eventsScrollRef.current
      const scrollHeight = eventsEl.scrollHeight
      // Only scroll if height has just changed
      if ( scrollHeight !== eventsScrollHeightRef.current ) {
        eventsEl.scrollTop = scrollHeight
        eventsScrollHeightRef.current = scrollHeight
      }
    }
  }, [realtimeEvents] )

  /**
   * Auto-scroll the conversation logs
   */
  useEffect( () => {
    const conversationEls = [].slice.call(
      document.body.querySelectorAll( '[data-conversation-content]' )
    )
    for ( const el of conversationEls ) {
      const conversationEl = el as HTMLDivElement
      conversationEl.scrollTop = conversationEl.scrollHeight
    }
  }, [items] )

  /**
   * Set up render loops for the visualization canvas
   */
  useEffect( () => {
    let isLoaded = true

    const clientCanvas = clientCanvasRef.current
    let clientCtx: CanvasRenderingContext2D | null = null

    const serverCanvas = serverCanvasRef.current
    let serverCtx: CanvasRenderingContext2D | null = null

    const render = () => {
      if ( isLoaded ) {
        if ( clientCanvas ) {
          if ( !clientCanvas.width || !clientCanvas.height ) {
            clientCanvas.width = clientCanvas.offsetWidth
            clientCanvas.height = clientCanvas.offsetHeight
          }
          clientCtx = clientCtx || clientCanvas.getContext( '2d' )
          if ( clientCtx ) {
            clientCtx.clearRect( 0, 0, clientCanvas.width, clientCanvas.height )
            const result = wavRecorder.recording
              ? wavRecorder.getFrequencies( 'voice' )
              : { values: new Float32Array( [0] ) }
            WavRenderer.drawBars(
              clientCanvas,
              clientCtx,
              result.values,
              '#0099ff',
              10,
              0,
              8
            )
          }
        }
        if ( serverCanvas ) {
          if ( !serverCanvas.width || !serverCanvas.height ) {
            serverCanvas.width = serverCanvas.offsetWidth
            serverCanvas.height = serverCanvas.offsetHeight
          }
          serverCtx = serverCtx || serverCanvas.getContext( '2d' )
          if ( serverCtx ) {
            serverCtx.clearRect( 0, 0, serverCanvas.width, serverCanvas.height )
            const result = wavStreamPlayer.analyser
              ? wavStreamPlayer.getFrequencies( 'voice' )
              : { values: new Float32Array( [0] ) }
            WavRenderer.drawBars(
              serverCanvas,
              serverCtx,
              result.values,
              '#009900',
              10,
              0,
              8
            )
          }
        }
        window.requestAnimationFrame( render )
      }
    }
    render()

    return () => {
      isLoaded = false
    }
  }, [] )

  /**
   * Core RealtimeClient and audio capture setup
   * Set all of our instructions, tools, events and more
   */
  useEffect( () => {
    // Get refs

    // Add tools
    client.addTool(
      {
        name: 'set_memory',
        description: 'Saves important data about the user into memory.',
        parameters: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description:
                'The key of the memory value. Always use lowercase and underscores, no other characters.',
            },
            value: {
              type: 'string',
              description: 'Value can be anything represented as a string',
            },
          },
          required: ['key', 'value'],
        },
      },
      async ( { key, value }: { [key: string]: any } ) => {
        setMemoryKv( ( memoryKv ) => {
          const newKv = { ...memoryKv }
          newKv[key] = value
          return newKv
        } )
        return { ok: true }
      }
    )
    client.addTool(
      {
        name: 'get_weather',
        description:
          'Retrieves the weather for a given lat, lng coordinate pair. Specify a label for the location.',
        parameters: {
          type: 'object',
          properties: {
            lat: {
              type: 'number',
              description: 'Latitude',
            },
            lng: {
              type: 'number',
              description: 'Longitude',
            },
            location: {
              type: 'string',
              description: 'Name of the location',
            },
          },
          required: ['lat', 'lng', 'location'],
        },
      },
      async ( { lat, lng, location }: { [key: string]: any } ) => {
        setMarker( { lat, lng, location } )
        setCoords( { lat, lng, location } )
        const result = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`
        )
        const json = await result.json()
        const temperature = {
          value: json.current.temperature_2m as number,
          units: json.current_units.temperature_2m as string,
        }
        const wind_speed = {
          value: json.current.wind_speed_10m as number,
          units: json.current_units.wind_speed_10m as string,
        }
        setMarker( { lat, lng, location, temperature, wind_speed } )
        return json
      }
    )


    // Update the tool configuration to use addTool instead of addToolHandler
    client.addTool(
      {
        name: 'file_upload',
        description: 'Parse csv file from upload for urls and scrape all of them.',
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
        },
      },
      async ( { fileContent, urlColumnName }: { fileContent: string; urlColumnName: string } ) => {


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

      }
    )







    client.addTool(
      {
        name: 'scrape_ufo_data',
        description: 'Navigate to certain page and scrapes data using @Firecrawl.',
        parameters: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to scrape data from',
            },
          },
          required: ['url'],
        },
      },
      async ( { url }: { [key: string]: any } ) => {

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

          // await writeFile( { folderName, content: markdown, imageUrl: ogImage } )
          setScrapeBucket( ( scrapeBucket: any ) => [...scrapeBucket, { ...data }] )
          const newState = webData?.length ? [...webData, {
            markdown: data?.markdown,
            screenshot: data.screenshot ?? ''
          }] : [{
            markdown: data?.markdown,
            screenshot: data.screenshot ?? ''
          }]
          setWebData( newState )
          setScreenshot( data.screenshot ?? '' )
          setScreenshots( ( screenShots: string[] ) => [...screenShots, data.screenshot ?? ''] )
          return data
        }
      }
    )
    // )



    client.on( 'response.function_call_arguments', async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt()
      if ( trackSampleOffset?.trackId ) {
        const { trackId, offset } = trackSampleOffset
        await client.cancelResponse( trackId, offset )
      }
    } )

    client.addTool(
      {
        name: 'map_website',
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
      },
      async ( { url, search }: { [key: string]: any } ) => {
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
        const newData: any = webData?.length ? [...webData, {
          markdown: scrape_data.markdown,
          screenshot: scrape_data.screenshot
        }] : [{
          markdown: scrape_data.markdown,
          screenshot: scrape_data.screenshot
        }]

        setWebData( newData )

        return scrape_data.markdown
      }
    )
    client.on( 'response.function_call_arguments', async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt()
      if ( trackSampleOffset?.trackId ) {
        const { trackId, offset } = trackSampleOffset
        await client.cancelResponse( trackId, offset )
      }
    } )

    // handle realtime events from client + server for event logging
    client.on( 'realtime.event', ( realtimeEvent: RealtimeEvent ) => {
      setRealtimeEvents( ( realtimeEvents ) => {
        const lastEvent = realtimeEvents[realtimeEvents.length - 1]
        if ( lastEvent?.event.type === realtimeEvent.event.type ) {
          // if we receive multiple events in a row, aggregate them for display purposes
          lastEvent.count = ( lastEvent.count || 0 ) + 1
          return realtimeEvents.slice( 0, -1 ).concat( lastEvent )
        } else {
          return realtimeEvents.concat( realtimeEvent )
        }
      } )
    } )
    client.on( 'error', ( event: any ) => console.error( event ) )
    client.on( 'conversation.interrupted', async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt()
      if ( trackSampleOffset?.trackId ) {
        const { trackId, offset } = trackSampleOffset
        await client.cancelResponse( trackId, offset )
      }
    } )
    client.on( 'conversation.updated', async ( { item, delta }: any ) => {
      const items = client.conversation.getItems()
      if ( delta?.audio ) {
        wavStreamPlayer.add16BitPCM( delta.audio, item.id )
      }
      if ( item.status === 'completed' && item.formatted.audio?.length ) {
        const wavFile = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000
        )
        item.formatted.file = wavFile
      }
      setItems( items )
    } )

    setItems( client.conversation.getItems() )

    return () => {
      // cleanup; resets to defaults
      client.reset()
    }
  }, [] )

  /**
   * Render the application
   */
  // data - component="ConsolePage"
  return (

    <div className="flex flex-col w-full h-full overflow-scroll">
      <div className="w-full h-full flex flex-col overflow-scroll">
        {webData?.length ? webData.map( ( { markdown, screenshot }: { markdown: string; screenshot: string } ) => (
          <div key={screenshot}>
            <img src={screenshot} alt="screenshot" />
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        ) ) : null}

        {screenshots?.length ? screenshots.map( ( screenshot: string ) => (
          <div key={screenshot}>
            <img src={screenshot} alt="screenshot" />
          </div>
        ) ) : null}

        {screenshot && <img src={screenshot} alt="screenshot" />}
      </div>




      <div className="content-block conversation h-[200px]">
        <div className="content-block-title">conversation</div>
        <div className="content-block-body" data-conversation-content>
          {!items.length && `awaiting connection...`}

          {items && items.map( ( conversationItem, i ) => {
            return (
              <div className="conversation-item" key={conversationItem.id}>
                <div className={`speaker ${conversationItem.role || ''}`}>
                  <div>
                    {(
                      conversationItem.role || conversationItem.type
                    ).replaceAll( '_', ' ' )}
                  </div>
                  <div
                    className="close"
                    onClick={() =>
                      deleteConversationItem( conversationItem.id )
                    }
                  >
                    <X />
                  </div>
                </div>
                <div className={`speaker-content`}>
                  {/* tool response */}
                  {conversationItem.type === 'function_call_output' && (
                    <div>{conversationItem.formatted.output}</div>
                  )}
                  {/* tool call */}
                  {!!conversationItem.formatted.tool && (
                    <div>
                      {conversationItem.formatted.tool.name}(
                      {conversationItem.formatted.tool.arguments})
                    </div>
                  )}
                  {!conversationItem.formatted.tool &&
                    conversationItem.role === 'user' && (
                      <div>
                        {conversationItem.formatted.transcript ||
                          ( conversationItem.formatted.audio?.length
                            ? '(awaiting transcript)'
                            : conversationItem.formatted.text ||
                            '(item sent)' )}
                      </div>
                    )}
                  {!conversationItem.formatted.tool &&
                    conversationItem.role === 'assistant' && (
                      <div>
                        {conversationItem.formatted.transcript ||
                          conversationItem.formatted.text ||
                          '(truncated)'}
                      </div>
                    )}
                  {conversationItem.formatted.file && (
                    <audio
                      src={conversationItem.formatted.file.url}
                      controls
                    />
                  )}
                </div>
              </div>
            )
          } )}
        </div>
      </div>








      <div className="content-actions h-[100px]">
        <div className="flex flow-row w-full justify-between items-center">


          <Toggle
            defaultValue={false}
            labels={['manual', 'vad']}
            values={['none', 'server_vad']}
            onChange={( _, value ) => changeTurnEndType( value )}
          />

          {isConnected && canPushToTalk && (
            <Button


              disabled={!isConnected || !canPushToTalk}
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
            >
              <span>{isRecording ? 'release to send' : 'push to talk'}</span>
            </Button>
          )}

          <Button

            onClick={
              isConnected ? disconnectConversation : connectConversation
            }
          >
            <span>{isConnected ? <X /> : <Zap />}</span>
            {isConnected ? 'disconnect' : 'connect'}
          </Button>


          <Button style={{ maxWidth: '50px' }}>
            <span>Upload</span>
            <FileIcon />
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={onFileUpload}
              style={{
                opacity: 0,
                width: '100%'
              }}
            />
          </Button>



        </div>
        <div className="bottom" />
      </div>

      <div className="content-block events h-[200px]">
        <div className="visualization">
          <div className="visualization-entry client">
            <canvas ref={clientCanvasRef} />
          </div>
          <div className="visualization-entry server">
            <canvas ref={serverCanvasRef} />
          </div>
        </div>
        <div className="content-block-title">events</div>
        <div className="content-block-body" ref={eventsScrollRef}>
          {!realtimeEvents.length && `awaiting connection...`}

          {realtimeEvents && realtimeEvents.map( ( realtimeEvent, i ) => {
            const count = realtimeEvent.count
            const event = { ...realtimeEvent.event }
            if ( event.type === 'input_audio_buffer.append' ) {
              event.audio = `[trimmed: ${event.audio.length} bytes]`
            } else if ( event.type === 'response.audio.delta' ) {
              event.delta = `[trimmed: ${event.delta.length} bytes]`
            }
            return (
              <div className="event" key={event.event_id}>
                <div className="event-timestamp">
                  {formatTime( realtimeEvent.time )}
                </div>
                <div className="event-details">
                  <div
                    className="event-summary"
                    onClick={() => {
                      // toggle event details
                      const id = event.event_id
                      const expanded = { ...expandedEvents }
                      if ( expanded[id] ) {
                        delete expanded[id]
                      } else {
                        expanded[id] = true
                      }
                      setExpandedEvents( expanded )
                    }}
                  >
                    <div
                      className={`event-source ${event.type === 'error'
                        ? 'error'
                        : realtimeEvent.source
                        }`}
                    >
                      {realtimeEvent.source === 'client' ? (
                        <ArrowUp />
                      ) : (
                        <ArrowDown />
                      )}
                      <span>
                        {event.type === 'error'
                          ? 'error!'
                          : realtimeEvent.source}
                      </span>
                    </div>
                    <div className="event-type">
                      {event.type}
                      {count && ` (${count})`}
                    </div>
                  </div>
                  {!!expandedEvents[event.event_id] && (
                    <div className="event-payload">
                      {JSON.stringify( event, null, 2 )}
                    </div>
                  )}
                </div>
              </div>
            )
          } )}
        </div>
      </div>


    </div>

  )
}
