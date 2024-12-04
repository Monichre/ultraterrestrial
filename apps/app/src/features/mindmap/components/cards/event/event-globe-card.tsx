'use client'

import { EventsIcon } from '@/components/icons'
import type { GlobeLocation } from '@/components/ui/globe/display-locations-globe'
import { STOCK_PHOTOS, wait } from '@/utils'
import createGlobe from 'cobe'
import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
interface GlobeProps {
  dark?: boolean
  baseColor?: string
  glowColor?: string
  markerColor?: string
  opacity?: number
  brightness?: number
  offsetX?: number
  offsetY?: number
  scale?: number
  markers?: GlobeLocation[]
}

export function Globe( {
  dark = true,

  opacity = 1,
  brightness = 1,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
  markers = []
}: GlobeProps ) {
  const canvasRef: any = useRef<HTMLCanvasElement>( null )
  const focusRef = useRef( [0, 0] )
  const locationToAngles = ( lat, long ) => {
    return [Math.PI - ( ( long * Math.PI ) / 180 - Math.PI / 2 ), ( lat * Math.PI ) / 180]
  }
  const baseColor: any = [0, 0.3569, 0.4196]
  const markerColor: any = [1, 0, 0.7098]
  const glowColor: any = [0.0118, 0.0824, 0.1373]
  useEffect( () => {
    let phi = 0

    const globe = createGlobe( canvasRef.current, {
      devicePixelRatio: 1.5,
      phi: 0,
      // theta: 0,
      dark: 1,

      mapSamples: 6300,
      mapBrightness: 8,
      baseColor,

      markerColor,
      glowColor,
      opacity: 0.5,
      scale: 0.9,
      markers,
      // devicePixelRatio: 2,
      // phi: 0,
      theta: 0.3,
      // dark: 1,

      diffuse: 1,
      // markers,
      // mapSamples: 16000,
      width: 600,
      height: 600,
      // mapBrightness: .9,
      // scale: 1,
      offset: [0, 400],
      // baseColor: [1, 1, 1],
      // markerColor: [251 / 255, 100 / 255, 21 / 255],
      // glowColor: [1, 1, 1],
      onRender: ( state ) => {
        // state.phi = phi
        // phi += 0.005
      }
    } )

    return () => {
      globe.destroy()
    }
  }, [dark, baseColor, glowColor, markerColor, opacity, brightness, scale] )

  useEffect( () => {
    wait( 5000 )
    focusRef.current = locationToAngles( markers[0].location[0], markers[0].location[1] )
  }, [markers] )

  return (
    <div className="h-full w-full relative">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          // transform: `translate(${offsetX}px, ${offsetY}px)`
        }}
      />
    </div>
  )
}

export const EventGlobeCard = ( { card }: any ) => {

  console.log( "🚀 ~ file: event-globe-card.tsx:82 ~ EventGlobeCard ~ data:", card )

  const { latitude, longitude, date, name, description, location, photos } = card
  const stock = {
    url: STOCK_PHOTOS.saucer,
    src: STOCK_PHOTOS.saucer,
  }
  const bgPhoto = photos?.length && photos[0]?.mediaType?.startsWith( 'image/' ) ? photos[0] : stock
  const markers: any = [
    {
      location: [latitude, longitude],
      size: 0.05
    }
  ]

  console.log( "🚀 ~ file: event-globe-card.tsx:90 ~ EventGlobeCard ~ markers:", markers )

  const formattedDate = date ? format( date, 'MMMM dd, yyyy' ) : null
  return (
    <div className="group relative mx-auto flex h-[300px] w-[300px] flex-col overflow-hidden rounded-2xl border border-white/5">
      <div className='absolute top-0 left-0 w-full px-2 flex justify-end'>
        <p className="mt-2 text-sm font-light leading-relaxed text-[#22d3ee] font-sentient">
          [{formattedDate}]
        </p>

      </div>
      <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]">
        {/* <div className="absolute inset-0 flex items-center justify-center"> */}
        {/* <div className="relative w-full h-full">
            <Image
              src={bgPhoto.url}
              alt={name}
              fill
              className="object-cover opacity-20"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div> */}
        {/* </div> */}
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Globe
          dark
          markers={markers}
          baseColor="#777A80"
          glowColor="#50505A"
          markerColor="#22d3ee"


        />
      </div>

      <div className="pointer-events-none mt-auto px-6 pb-6 relative z-10">
        <div className="relative transition duration-300 group-hover:-translate-y-9">
          <div className="text-lg text-white transition-all duration-300 group-hover:text-base font-bebasNeuePro font-regular tracking-wider">
            {name}
          </div>
          <p className="text-sm font-light leading-relaxed text-white/75">
            {location}
          </p>

          <div className="absolute -left-2 bottom-0 translate-y-11 opacity-0 transition duration-300 group-hover:opacity-100">
            <a
              href="/components"
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/5">
              <span>View</span>

              <EventsIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
