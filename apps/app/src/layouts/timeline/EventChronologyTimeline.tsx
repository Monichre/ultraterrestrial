'use client'
import {
  ShootingStars,
  StarsBackground,
} from '@/components/backgrounds/shooting-stars'
import { EarthAtNight as Earth } from '@/components/earth'
import { SpatialTimeline } from '@/layouts/timeline/SpatialTimeline'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import {
  extractCoordinatesFromEvents,
  extractUniqueYearsFromEvents
} from '@/utils'
import './events-timeline.css'

import { useMemo, useRef, useState } from 'react'

export const EventChronologyTimeline = ( { events }: any ) => {
  const years = extractUniqueYearsFromEvents( events )
  const locations = extractCoordinatesFromEvents( events, false )
  const [activeLocation, setActiveLocation] = useState( null )

  const updateActiveLocation = ( location: any ) => {
    console.log( 'location: ', location )
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

  // const { scrollYProgress } = useScroll()
  // console.log( 'scrollYProgress: ', scrollYProgress )



  const earthRef = useRef( null )










  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black h-full w-full z-0'>
        <ShootingStars />
        <StarsBackground />
        <div className='relative z-10 h-full w-full'>
          <Earth spin={false} activeLocation={activeLocation} />
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


      <div className='fixed top-0 left-10  h-screen w-screen flex justify-stretch z-10'>
        <div className='h-full w-100px flex flex-col justify-center align-center items-center content-center'>

          <TimelineSidebar years={years} />

        </div>
      </div>
      <div className='fixed top-0 left-[100px] w-screen h-screen overflow-scroll spatial-timeline z-10'>
        <SpatialTimeline
          eventsByYear={eventsByYear}
          years={years}
          updateActiveLocation={updateActiveLocation}
        />
      </div>
    </>
  )
}
// fixed top-0 left-[80px] h-full w-[calc(100% - 80px)] z-40