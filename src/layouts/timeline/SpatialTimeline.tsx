'use client'
import * as React from 'react'

import './timeline.css'
import dayjs from 'dayjs'
import {
  motion,
  inView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { index } from 'd3'

// const TimelineItem = (props: any) => {
//   const { scrollYProgress } = useScroll()
// const scaleX = useSpring(scrollYProgress)
//   return (
//     <div
//     className='timeline-item'
//     key={index}
//     // animate={computeTranslateZ(index * 2)}
//     // transition={{
//     //   duration: 2,
//     //   ease: 'linear',
//     // }}
//   >
//     <h1 className='text-white'>{event.name}</h1>
//     <p className='text-white'>
//       {dayjs(event.date).format('MMM DD, YYYY')}
//     </p>
//     <p className='text-white'>{event.location}</p>
//     <p className='text-white'>{event.location}</p>
//   </div>
//   )
// }

export const SpatialTimeline = ({ eventsByYear, years }: any) => {
  console.log('eventsByYear: ', eventsByYear)

  // Function to compute translateZ based on index
  const y = useTransform(x, (latest) => latest * 2)
  const opacityOutput = [0, 1, 0]
  const colorOutput = ['#f00', '#fff', '#0f0']

  const opacity = useTransform(x, xInput, opacityOutput)
  const computeTranslateZ = (index: number) => ({
    transform: [
      `translateZ(${-(index + 1) * 1000}px)`,
      `translateZ(0px)`,
      `translateZ(${(index + 1) * 1000}px)`,
    ],
    opacity: [0, 1, 0],
    filter: ['blur(5px)', 'blur(0px)', 'blur(5px)'],
  })
  const today = dayjs(new Date()).format('MMM DD, YYYY')
  // stuck-grid

  React.useEffect(() => {
    const setAnimationRanges = (
      element: {
        style: { setProperty: (arg0: string, arg1: string) => void }
        animate: (
          arg0: { opacity: number; transform: string }[],
          arg1: {
            duration: number
            easing: string
            fill: string
            delay: number
          }
        ) => void
      },
      index: number,
      totalElements: number
    ) => {
      const start = 20 + index * 5 // Example start percentage logic
      const end = start + 10 // Example: each animation spans 10%

      element.style.setProperty('--animation-start', `${start}%`)
      element.style.setProperty('--animation-end', `${end}%`)

      // Use Scroll-driven animations or manually update keyframes
      element.animate(
        [
          { opacity: 0, transform: `translateZ(-100px)` },
          { opacity: 1, transform: `translateZ(0)` },
          { opacity: 0, transform: `translateZ(100px)` },
        ],
        {
          duration: 1000,
          easing: 'linear',
          fill: 'both',
          delay: (index / totalElements) * 1000, // Adjust the delay based on index
        }
      )
    }
  }, [])
  return (
    <div className='stuck-grid'>
      {years.map((year: any, index: any) => {
        return (
          <div className='grid-item' key={year}>
            {eventsByYear[year].map((event: any, index: any) => (
              <div
                className='timeline-item'
                key={`${year}-${event.id}`}
                // animate={computeTranslateZ(index * 2)}
                // transition={{
                //   duration: 2,
                //   ease: 'linear',
                // }}
              >
                <h1 className='text-white'>{event.name}</h1>
                <p className='text-white'>
                  {dayjs(event.date).format('MMM DD, YYYY')}
                </p>
                <p className='text-white'>{event.location}</p>
                <p className='text-white'>{event.location}</p>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

{
  /* <div className='grid-item'>@layer</div>
      <div className='grid-item'>@swash</div>
      <div className='grid-item'>subgrid</div>
      <div className='grid-item'>in oklab</div>
      <div className='grid-item'>:popover-open</div>
      <div className='grid-item'>abs()</div>
      <div className='grid-item'>sin()</div>
      <div className='grid-item'>:has()</div>
      <div className='grid-item'>::marker</div>
      <div className='grid-item'>1cap</div>
      <div className='grid-item'>scrollbar-color</div>
      <div className='grid-item'>scroll-timeline</div>
      <div className='grid-item'>view-timeline</div>
      <div className='grid-item'>overlay</div>
      <div className='grid-item'>scale</div>
      <div className='grid-item'>ascent-override</div>
      <div className='grid-item'>initial-letter</div>
      <div className='grid-item'>inset</div>
      <div className='grid-item'>@container</div>
      <div className='grid-item'>accent-color</div>
      <div className='grid-item'>color-mix()</div>
      <div className='grid-item'>@scope</div>
      <div className='grid-item'>@starting-style</div>
      <div className='grid-item'>override-colors</div>
      <div className='grid-item'>anchor()</div>
      <div className='grid-item'>scroll-snap</div>
      <div className='grid-item'>::backdrop</div>
      <div className='grid-item'>::cue</div>
      <div className='grid-item'>:focus-visible</div>
      <div className='grid-item'>:user-valid</div>
      <div className='grid-item'>:fullscreen</div>
      <div className='grid-item'>:dir()</div>
      <div className='grid-item'>caret-color</div>
      <div className='grid-item'>aspect-ratio</div>
      <div className='grid-item'>cross-fade()</div>
      <div className='grid-item'>image-set()</div>
      <div className='grid-item'>env()</div>
      <div className='grid-item'>place-content</div>
      <div className='grid-item'>gap</div> */
}
