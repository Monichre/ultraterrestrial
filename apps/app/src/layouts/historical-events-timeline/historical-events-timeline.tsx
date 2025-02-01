'use client'
import {
  ShootingStars,
  StarsBackground,
} from '@/components/backgrounds/shooting-stars'
// import { SpatialTimeline } from '@/layouts/timeline/SpatialTimeline' port { TimelineSidebar } from '@/layouts/historical-events-timeline/
import {
  extractCoordinatesFromEvents,
  extractUniqueYearsFromEvents
} from '@/utils'
import './events-timeline.css'

import { AdminDashboardGlobe } from '@/components/globes'
import type { EventsRecord } from '@/db/xata'
import { EventsTimeline } from '@/layouts/historical-events-timeline/events-timeline'
import { TimelineSidebar } from '@/layouts/historical-events-timeline/timeline-sidebar-ui'
import type { JSONData } from '@xata.io/client'
import { useMemo, useRef, useState } from 'react'

export const HistoricalEventsTimeline = ( { events }: { events: JSONData<EventsRecord>[] } ) => {
  const years: any = extractUniqueYearsFromEvents( events )

  console.log( "🚀 ~ file: historical-events-timeline.tsx:23 ~ HistoricalEventsTimeline ~ years:", years )

  const locations = extractCoordinatesFromEvents( events, false )

  console.log( "🚀 ~ file: historical-events-timeline.tsx:27 ~ HistoricalEventsTimeline ~ locations:", locations )

  const [activeLocation, setActiveLocation] = useState( null )

  console.log( "🚀 ~ file: historical-events-timeline.tsx:31 ~ HistoricalEventsTimeline ~ activeLocation:", activeLocation )


  const updateActiveLocation = ( location: any ) => {

    const [lat, lon] = location
    // const temp = locationToAngles(lat, lon)
    // console.log('temp: ', temp)
    setActiveLocation( location )
  }



  const eventsByYear = useMemo( () => {
    const result: any = {}
    for ( let year of years ) {
      // @ts-ignore
      result[year] = events.filter( ( event ) => event.date.includes( year ) )
    }
    return result
  }, [events, years] )
  console.log( "🚀 ~ file: historical-events-timeline.tsx:44 ~ eventsByYear ~ eventsByYear:", eventsByYear )

  // const { scrollYProgress } = useScroll()
  // console.log( 'scrollYProgress: ', scrollYProgress )

  const [currentYearIndex, setCurrentYearIndex] = useState<number>( 0 )
  const [currentYear, setCurrentYear] = useState<number>( years[currentYearIndex] )
  const updateCurrentYearIndex = ( index: number ) => {
    setCurrentYearIndex( index )
  }
  const updateCurrentYear = ( year: number ) => {
    setCurrentYear( year )
  }
  const earthRef = useRef( null )










  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black h-full w-full z-0'>
        <ShootingStars />
        <StarsBackground />
        <div className='relative z-10 h-full w-full'>
          {/* <Earth spin={false} activeLocation={activeLocation} /> */}
          <AdminDashboardGlobe markers={locations} />
          {/* <Globe locations={locations} activeLocation={activeLocation} /> */}
          {/* <CodePenGlobe
            markers={locations}
          /> */}
          {/* markers={locations} activeLocation={activeLocation}  */}
          {/* <EarthAtNight /> */}
          {/* <CodePenEarthAlt locations={locations} /> */}
          {/* <CodePenEarth locations={locations} /> */}
        </div>
      </div>

      {/* w-screen  */}
      <div className='fixed top-0 left-0 w-[80px] h-screen flex justify-center z-40'>
        <div className='h-full w-auto flex flex-col justify-center align-center items-center content-center'>

          <TimelineSidebar years={years} currentYearIndex={currentYearIndex} currentYear={currentYear} />

        </div>
      </div>
      <div className='fixed top-0 left-[100px] w-screen h-screen overflow-scroll spatial-timeline z-40'>

        <EventsTimeline
          updateCurrentYearIndex={updateCurrentYearIndex}
          updateCurrentYear={updateCurrentYear}
          currentYear={currentYear}
          eventsByYear={eventsByYear}
          years={years}
          updateActiveLocation={updateActiveLocation}
        />
        {/* <ZScrollTimeline
          eventsByYear={eventsByYear}
          years={years}
          updateActiveLocation={updateActiveLocation}
        /> */}
      </div>
    </>
  )
}
// fixed top-0 left-[80px] h-full w-[calc(100% - 80px)] z-40
