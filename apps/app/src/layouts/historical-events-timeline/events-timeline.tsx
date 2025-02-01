import { TimelineToolTip } from '@/layouts/historical-events-timeline/timeline-tooltip'
import { format } from 'date-fns'
import { motion, useAnimate } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import './styles/SpatialTimelineV2.css'

import { Divz } from "divz"

import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger'

import { Float } from '@/components/animated/float'
gsap.registerPlugin( useGSAP, ScrollTrigger, ScrollSmoother )



export const TimelineYearEvents = ( {
  event,
  updateActiveLocation
} ) => {

  const { name, date, location, latitude, longitude, photos } = event

  console.log( "🚀 ~ file: SpatialTimelineV2.tsx:27 ~ photos:", photos )



  const [scope, animate] = useAnimate()



  return (
    <div
      className="w-full h-full"
      ref={scope}
    >
      <motion.div
        className="z-40 text-center space-y-4 items-start align-start flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        {event?.latitude && event?.longitude && (
          <TimelineToolTip
            event={event}
            onHover={updateActiveLocation}
            coordinates={[event.latitude, event.longitude]}
          />
        )}
        <h3 className="text-white font-bebasNeuePro text-left  relative">
          {event.name}
        </h3>


        <span className="tracking-wider relative font-Source_Sans_3"
        >
          {format( event.date, 'MMM dd, yyyy' )}
        </span>

        <div className="flex items-center mt-8 gap-6">
          <span className="text-white tracking-wider">
            {event.location}
          </span>

        </div>
      </motion.div>
      <div className="flex w-full justify-evenly items-center gap-4">

        {photos.map( ( photo, index ) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.5, ease: "easeOut" }}
          >
            <Float>
              <div className="sm:w-40 sm:h-40 h-32 w-32 md:w-48 md:h-48 shadow-2xl relative overflow-hidden  hover:scale-105 duration-200 cursor-pointer transition-transform">
                <img

                  src={photo.url}
                  className="w-full h-full object-cover absolute top-0 left-0"

                />
              </div>
            </Float>
          </motion.div>
        ) )}
      </div>




    </div>



  )
}

export function EventsTimeline( {
  years,
  eventsByYear,
  updateActiveLocation,
  updateCurrentYearIndex,
  updateCurrentYear,
  currentYear: activeYear
} ) {
  const containerRef = useRef( null )
  const yearRefs = useRef( {} )



  const [activeIndex, setActiveIndex] = useState( 0 )

  console.log( "🚀 ~ file: SpatialTimelineV2.tsx:114 ~ activeIndex:", activeIndex )

  const [currentYear, setCurrentYear] = useState( activeYear )

  console.log( "🚀 ~ file: SpatialTimelineV2.tsx:118 ~ currentYear:", currentYear )


  const updateActiveIndex = ( i: number ) => {

    console.log( "🚀 ~ file: SpatialTimelineV2.tsx:123 ~ updateActiveIndex ~ i:", i )
    // updateCurrentYearIndex( i )
    setActiveIndex( i )
    // setCurrentYear( years[i] )
  }

  useEffect( () => {

    updateCurrentYearIndex( activeIndex )
    updateCurrentYear( years[activeIndex] )
  }, [activeIndex] )
  return (

    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        ref={containerRef}
        className="relative"
        style={{
          // overflow: 'visible',
          // height: '200vh',
        }}
      >

        <Divz
          // isExpanded={true}
          // showPlayButton={false}
          fullScreen={true}
          isScrollPageEnabled={true}
          showNavButtons={false}
          onIndexChange={updateActiveIndex}
        >
          {
            years.map( ( year, index ) => (
              <motion.div
                key={year}
                className={`year year-${year}`}
              // ref={el => yearRefs.current[year] = el}

              >
                <div className="inner-content">
                  {eventsByYear[year].map( ( event ) => (
                    <motion.div
                      key={`${year}-${event.id}`}
                      id={`${year}-${event.id}`}
                      className="event-item transition-transform duration-300 hover:scale-105"
                    >
                      <TimelineYearEvents event={event} updateActiveLocation={updateActiveLocation} />
                    </motion.div>
                  ) )}
                </div>
              </motion.div>
            ) )
          }

        </Divz>

      </div>
    </div>

  )
}
