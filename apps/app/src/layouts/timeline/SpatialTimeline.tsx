'use client'

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import React, { useState } from 'react'
import { useVisibility } from '@/hooks'
import { cn } from '@/utils'
import { format } from 'date-fns'
import { useScrolling } from 'react-use'
import { TimelineItem } from '@/layouts/timeline/timeline-item'

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

const throttle = ( func: Function, limit: number ) => {
  let inThrottle = false
  return function ( this: any, ...args: any[] ) {
    if ( !inThrottle ) {
      func.apply( this, args )
      inThrottle = true
      setTimeout( () => ( inThrottle = false ), limit )
    }
  }
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
  const scrolling = useRef( false )

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
  let startOffset = -20
  const calcAnimation = ( index: number ) => {
    if ( index !== 0 ) {
      startOffset += 10 // index === 0 ? -20 : index * 10
    }
    let endOffset = startOffset + 10

    // Adjust startOffset to be within 0% to 100%
    // if (startOffset > 100) {
    //   startOffset = startOffset % 100
    //   endOffset = startOffset % 100
    // }

    // if (endOffset > 100) {
    //   endOffset = -50
    // }

    // if (startOffset === endOffset) {
    //   // startOffset = 0
    //   endOffset += 30
    // }

    // // Adjust endOffset to be within 0% to 100%
    // if (endOffset > 100) {
    //   endOffset = 100
    // } else if (endOffset < 0) {
    //   endOffset = 0
    // }

    // // Ensure startOffset is not greater than endOffset
    // if (startOffset > endOffset) {
    //   // ;[startOffset, endOffset] = [endOffset, startOffset]
    //   startOffset = endOffset
    //   endOffset = startOffset
    // }

    const start = `${startOffset}%`
    const end = `100%`

    return {
      'animation-range': `${start} 100%`,
    }
  }

  return (
    // stuck-grid
    // spatial
    <div
      className='stuck-grid h-full'
    // style={{ minHeight: `${years.length * 100}vh` }}
    >
      {years.map( ( year, index ) => {
        return (
          <TimelineItem
            key={`${year}-${index}-grid-item`}
            year={year}
            currentYear={currentYear}
            updateActiveLocation={updateActiveLocation}
            events={eventsByYear[year]}
            mitigateCurrentYearValue={mitigateCurrentYearValue}
            scrolling={scrolling}
            style={{
              ...calcAnimation( index ),
              // zIndex: years.length - index + 1,
            }}
          />
        )
      } )}
    </div>
  )
}
// useEffect(() => {
//   let zSpacing = -1000
//   let lastPos = zSpacing / 5
//
//   let $frames = document.getElementsByClassName('frame')
//   let frames = Array.from($frames)
//   let zVals = []
//

//   window.addEventListener('scroll', () => {
//     let top = document.documentElement.scrollTop
//
//     let delta = lastPos - top
//
//     lastPos = top
//

//     frames.forEach((n, i) => {
//       zVals.push(i * zSpacing + zSpacing)
//       zVals[i] += delta * -5.5

//       let frame = frames[i]
//       let transform = `translateZ(${zVals[i]}px)`
//
//       let opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0

//       frame.setAttribute(
//         'style',
//         `transform: ${transform}; opacity: ${opacity};`
//       )
//     })
//   })
// }, [])

// Audio
