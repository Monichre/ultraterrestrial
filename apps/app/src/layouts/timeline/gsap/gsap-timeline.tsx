
'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { trigger } from '@trigger.dev/sdk/dist/commonjs/v3/shared'
import { create } from 'domain'
import type { start } from 'repl'
import { ShootingStars, StarsBackground } from '@/components/backgrounds/shooting-stars'
import { EventsGlobe } from '@/layouts/timeline/events-globe'
import { SpatialTimeline } from '@/layouts/timeline/SpatialTimeline'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'



import { TimelineToolTip } from '@/layouts/timeline/timeline-tooltip'
import { DOMAIN_MODEL_COLORS } from '@/utils'
import { Separator } from '@radix-ui/react-separator'
import { format } from 'date-fns'
import { events } from '../../components/visualizations/spatial-gallery/events'
import { text } from 'd3'
import { grid } from 'd3-dag'
import { px } from 'framer-motion'
import { scale } from 'maath/dist/declarations/src/vector2'

export const GsapTimelineItem: React.FC<any> = ( {
  event,
  year,
  currentYear,

  updateActiveLocation,
  ref
} ) => {

  console.log( "🚀 ~ file: gsap-timeline.tsx:34 ~ currentYear:", currentYear )


  console.log( "🚀 ~ file: gsap-timeline.tsx:34 ~ year:", year )


  console.log( "🚀 ~ file: gsap-timeline.tsx:34 ~ event:", event )

  // const [status, elementRef] = useVisibility(scrolling)

  // useEffect(() => {
  //   if (status === 'leaving') {
  //     mitigateCurrentYearValue(year)
  //   }
  // }, [status, mitigateCurrentYearValue, year])
  // before:content-[""] before:absolute before:left-0 before:top-[-16px] before:w-[40px] before:h-[2px] before:bg-[#79FFE1]
  return (
    //
    <div
      className={`${year} fixed top-0 left-0 w-full h-full overflow-hidden bg-transparent opacity-0.35 z-[-1]`}
      style={style}
      ref={ref}
    >

      <div
        className={`event-content absolute filter blur(50px) `}
        key={`${year}-${event.id}`}
      >
        <h2
          className='text-white font-bebasNeuePro text-[48px] mb-2 capitalize relative w-fit mb-8'
          style={{ textWrap: 'pretty', lineHeight: '54px' }}
        >
          {event.name}
        </h2>

        <p
          className={`tracking-wider text-xl relative after:content-[""] after:absolute after:left-0 after:bottom-[-16px] after:w-[40px] after:h-[2px] after:bg-[#79FFE1] `}
          style={{
            color: DOMAIN_MODEL_COLORS.events,
            width: 'fit-content',
          }}
        >
          {format( event.date, 'MMM dd, yyyy' )},
        </p>

        <div className='flex items-center align-middle mt-8'>
          <p className='text-white font-nunito tracking-wider text-xl mr-6'>
            {event.location}
          </p>
          {event?.latitude && event?.longitude && (
            <TimelineToolTip
              event={event}
              onHover={updateActiveLocation}
              coordinates={[event.latitude, event.longitude]}
            />
          )}
        </div>
      </div>

    </div>
  )
}





export const GsapTimeline = ( { eventsByYear, years, updateActiveLocation }: { eventsByYear: any, years: any, updateActiveLocation: any } ) => {
  const container = useRef()
  const [currentYear, setCurrentYear] = useState( years[0] )
  const [events, setEvents] = useState()

  const scrolling = useRef( false )



  useEffect( () => {
    let tempEvents = []
    for ( let year of years ) {
      const eventsByCurrentYear = eventsByYear[year]
      eventsByCurrentYear.forEach( ( event ) => {
        tempEvents.push( event )
      } )
    }
    setEvents( tempEvents )
  }, [eventsByYear] )

  useEffect( () => {
    const handleScroll = throttle( () => {
      scrolling.current = true
    }, 100 )

    window.addEventListener( 'scroll', handleScroll )
    return () => window.removeEventListener( 'scroll', handleScroll )
  }, [] )

  const mitigateCurrentYearValue = useCallback(
    ( nextYear: number ) => {
      if ( nextYear !== currentYear ) {
        setCurrentYear( nextYear )
      }
    },
    [currentYear]
  )

  useGSAP(
    () => {
      ScrollTrigger.create( {
        trigger: '.box-c',
        pin: true,
        start: 'center center',
        end: '+=300',
        markers: true,
      } )
    },
    {
      scope: container,
    }
  )

  return (
    <GsapTimelineWrapper>
      <div className='fixed top-0 left-10  h-screen w-screen flex justify-stretch z-10'>
        <div className='h-full w-100px flex flex-col justify-center align-center items-center content-center'>
          <div className=''>
            <TimelineSidebar years={years} />
          </div>
        </div>
      </div>
      <div className='fixed top-0 left-[100px] w-screen h-screen z-10 threed-root' ref={container} style={{
        transformStyle: 'preserve-3d',

        height: '100svh'
      }}>
        <div className='h-[2000vh] w-full threed-wrapper'>
          {events?.length ? events.map( ( year, index ) => (
            <GsapTimelineItem
              key={year}
              year={year}
              events={eventsByYear[year]}

            />
          ) ) : null}
        </div>
      </div>
    </GsapTimelineWrapper>
  )
}
