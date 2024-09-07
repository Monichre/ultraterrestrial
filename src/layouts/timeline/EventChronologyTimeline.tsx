'use client'

import { Earth } from '@/components/earth'
import {
  ShootingStars,
  StarsBackground,
} from '@/components/backgrounds/shooting-stars'
import { SpatialTimeline } from '@/layouts/timeline/SpatialTimeline'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'
import { extractUniqueYearsFromEvents } from '@/utils'

import { useMemo, useRef } from 'react'

export const EventChronologyTimeline = ({ events }: any) => {
  console.log('events: ', events)
  const years = extractUniqueYearsFromEvents(events)
  const eventsByYear = useMemo(() => {
    const result: any = {}
    for (let year of years) {
      // @ts-ignore
      result[year] = events.filter((event) => event.date.includes(year))
    }
    return result
  }, [])
  const earthRef = useRef(null)
  return (
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black h-full w-full z-0'>
        <ShootingStars />
        <StarsBackground />
        <div className='relative z-10 h-full w-full'>
          <Earth spin={false} />
        </div>
      </div>

      <div className='fixed top-0 left-0  h-full flex justify-stretch z-40'>
        <div className='h-full w-100px flex flex-col justify-center align-center items-center content-center'>
          <div className='h-[80vh]'>
            <TimelineSidebar years={years} />
          </div>
        </div>
      </div>
      <div className='w-full h-full'>
        <SpatialTimeline eventsByYear={eventsByYear} years={years} />
      </div>
    </>
  )
}
// fixed top-0 left-[80px] h-full w-[calc(100% - 80px)] z-40
