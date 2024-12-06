'use client'

import { TimelineToolTip } from '@/layouts/timeline/timeline-tooltip'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
// import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import ScrollTrigger from 'gsap/ScrollTrigger'


import { CustomEase } from "gsap-trial/CustomEase"

/* The following eases are Club GSAP perks */
import { CustomBounce } from "gsap-trial/CustomBounce" // extends CustomEase
import { CustomWiggle } from "gsap-trial/CustomWiggle" // extends CustomEase

/* The following plugins are Club GSAP perks */
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin"
import { GSDevTools } from "gsap-trial/GSDevTools"
import { InertiaPlugin } from "gsap-trial/InertiaPlugin"
import { MorphSVGPlugin } from "gsap-trial/MorphSVGPlugin"
import { MotionPathHelper } from "gsap-trial/MotionPathHelper"
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin"
import { PhysicsPropsPlugin } from "gsap-trial/PhysicsPropsPlugin"
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin"
import { ScrollSmoother } from "gsap-trial/ScrollSmoother"
import { SplitText } from "gsap-trial/SplitText"


gsap.registerPlugin( DrawSVGPlugin, ScrollSmoother, GSDevTools, InertiaPlugin, MorphSVGPlugin, MotionPathHelper, Physics2DPlugin, PhysicsPropsPlugin, ScrambleTextPlugin, SplitText, CustomEase, CustomBounce, CustomWiggle )


gsap.registerPlugin( ScrollTrigger, ScrollSmoother, useGSAP )
interface TimelineToolTipProps {
  event: string
  coordinates: any
}

interface Element {
  id: number
  width: number
  img: string
}

interface Column {
  id: number
  elements: Element[]
}

interface Event {
  id: string
  name: string
  date: Date
  location: string
  latitude: number
  longitude: number
}

interface TimelineItemProps {
  events: Event[]
  year: number
  currentYear: number
  mitigateCurrentYearValue: ( year: number ) => void
  style: React.CSSProperties
  scrolling: React.RefObject<boolean>
}

interface SpatialTimelineProps {
  eventsByYear: Record<number, Event[]>
  years: number[]
  updateActiveLocation: ( location: string ) => void
}



export const SpatialTimeline: React.FC<SpatialTimelineProps> = ( {
  eventsByYear,
  years,
  updateActiveLocation,
} ) => {
  const [currentYear, setCurrentYear] = useState( years[0] )
  const containerRef = useRef<HTMLDivElement>( null )
  const timelineRef = useRef<HTMLDivElement>( null )

  // console.log( "🚀 ~ file: SpatialTimeline.tsx:75 ~ translateZ:", translateZ )

  // const opacity = useTransform(
  //   scrollY,
  //   [0, 0.5, 1], // Three points in the scroll progress
  //   [0, 1, 0] // Corresponding opacity values
  // )

  // console.log( "🚀 ~ file: SpatialTimeline.tsx:83 ~ opacity:", opacity )
  const initSmoothScrolling = () => {
    // Instantiate the Lenis object with specified properties
    lenis = new Lenis( {
      lerp: 0.1, // Lower values create a smoother scroll effect
      smoothWheel: true // Enables smooth scrolling for mouse wheel events
    } )

    // Update ScrollTrigger each time the user scrolls
    lenis.on( "scroll", () => ScrollTrigger.update() )

    // Define a function to run at each animation frame
    const scrollFn = ( time ) => {
      lenis.raf( time ) // Run Lenis' requestAnimationFrame method
      requestAnimationFrame( scrollFn ) // Recursively call scrollFn on each frame
    }
    // Start the animation frame loop
    requestAnimationFrame( scrollFn )
  }

  useGSAP( () => {
    let tl = gsap.timeline( {
      // yes, we can add it to an entire timeline!
      scrollTrigger: {
        trigger: '.events-grid',
        pin: true, // pin the trigger element while active
        start: "top bottom+=5%",
        end: "bottom top-=5%",
        scrub: true

        // snap: {
        //   snapTo: 'labels', // snap to the closest label in the timeline
        //   duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        //   ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
        // }
      }
    } )
    const frames = gsap.utils.toArray( ".frame" )
    frames.forEach( ( frame: any ) => {
      const frameContent = frame.querySelector( ".frame__content" )
      const eventItems = frameContent.querySelectorAll( ".event-item" )

      const tl = gsap.timeline( {
        scrollTrigger: {
          trigger: frame,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          start: "top top",
          end: "bottom bottom"
        }
      } )
      // tl.from( text, { opacity: 0, y: 100 } )
      //   .from( image, { scale: 0, ease: "power1.inOut", duration: 1 } )
      //   .to( text, { opacity: 0, y: -100, ease: "power1.in" } )
    } )

  } )


  useEffect( () => {
    // const handleScroll = () => {
    // 3D Scroll

    let zSpacing = -2000,
      lastPos = zSpacing / 5,
      $frames = document.querySelectorAll( '.frame' ),
      frames = Array.from( $frames ),
      zVals = []

    window.addEventListener( 'scroll', () => {

      let top = document.documentElement.scrollTop,
        delta = lastPos - top

      lastPos = top

      frames.forEach( function ( n, i ) {
        zVals.push( ( i * zSpacing ) + zSpacing )
        zVals[i] += delta * -5.5
        let frame = frames[i],
          transform = `translateZ(${zVals[i]}px)`,
          opacity = zVals[i] < Math.abs( zSpacing ) / 1.8 ? 1 : 0
        frame.setAttribute( 'style', `transform: ${transform}; opacity: ${opacity}` )
      } )

    } )





  }, [] )




  const mitigateCurrentYearValue = useCallback(
    ( nextYear: number ) => {
      if ( nextYear !== currentYear ) {
        setCurrentYear( nextYear )
      }
    },
    [currentYear]
  )

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full" style={{ perspective: '1500px' }}>
      <div

        className="events-grid "
        ref={timelineRef}
        style={{

          transformStyle: 'preserve-3d',
          height: '100%',

        }}
      >


        {years.map( ( year, index ) => (
          <motion.div
            className={`frame year ${year}`}
            id={year.toString()}
            key={year}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,

              transition: '.75s cubic-bezier(.075, .5, 0, 1), opacity .75s ease',
              willChange: 'transform',
              transformStyle: 'preserve-3d',
            }}
          >


            <motion.div className='inner-year frame__content' >


              {
                eventsByYear[year].map( ( event ) => (
                  <motion.div
                    id={`${year}-${event.id}`}
                    className="event-item p-6 backdrop-blur-sm bg-black/20 rounded-lg 
                     transition-transform duration-300 hover:scale-105"
                    key={`${year}-${event.id}`}
                  >
                    <h2 className="text-white font-bebasNeuePro text-[48px] mb-8 capitalize relative w-fit 
                        leading-[54px] after:content-[''] after:absolute after:left-0 after:bottom-[-16px] 
                        after:w-[40px] after:h-[2px] after:bg-[#79FFE1]">
                      {event.name}
                    </h2>

                    <p className="tracking-wider text-xl relative text-[#79FFE1]"
                      style={{ width: 'fit-content' }}>
                      {format( event.date, 'MMM dd, yyyy' )}
                    </p>

                    <div className="flex items-center mt-8 gap-6">
                      <p className="text-white font-source tracking-wider text-xl">
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
                  </motion.div>
                ) )
              }
            </motion.div>
          </motion.div>
        ) )}
      </div>
    </div >
  )
}


{/* <TimelineItem
              key={`${year}-${index}-grid-item`}
              year={year}
              currentYear={currentYear}
              updateActiveLocation={updateActiveLocation}
              events={eventsByYear[year]}
              mitigateCurrentYearValue={mitigateCurrentYearValue}
              style={{}} // Initial style will be set by scroll handler
            /> */}