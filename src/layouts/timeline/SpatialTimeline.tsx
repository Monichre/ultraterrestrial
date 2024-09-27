'use client'

import './timeline.css'

import { motion, AnimatePresence } from 'framer-motion'

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
function extractPhotos(event: { photos: any[] }) {
  if (event && event.photos && Array.isArray(event.photos)) {
    return event.photos.map(
      (photo: {
        id: any
        name: any
        mediaType: any
        size: any
        url: any
        signedUrl: any
      }) => {
        return {
          id: photo.id,
          name: photo.name,
          mediaType: photo.mediaType,
          size: photo.size,
          url: photo.url,
          signedUrl: photo.signedUrl,
        }
      }
    )
  } else {
    // Return an empty array if no photos are found
    return []
  }
}

const TimelineItemPhotoGallery = ({ event }: any) => {
  const [activeItem, setActiveItem] = useState<Element | null>(null)

  const allElements = extractPhotos(event)

  const handleItemClick = (ele: Element) => {
    setActiveItem(ele)
  }
  if (!allElements?.length) {
    return null
  }
  if (allElements.length === 1) {
    return (
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-center gap-5'>
          <TimelineItemPhoto item={allElements[0]} />
        </div>
      </div>
    )
  }
  return (
    <div className='h-full center w-full flex flex-col gap-5 relative'>
      <motion.div
        className={cn('flex flex-col gap-5')}
        layout
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.div
          className={cn('flex items-center justify-center gap-5')}
          animate={{
            opacity: activeItem !== null ? 0 : 1,
            willChange: 'auto',
          }}
        >
          {allElements
            .filter((item: any, i: number) => i % 2 === 0)
            .map((ele: any, index: React.Key | null | undefined) => (
              <TimelineItemPhoto
                item={ele}
                key={index}
                onClick={() => setActiveItem(ele)}
              />
            ))}
        </motion.div>
        <motion.div
          className={cn('flex items-center justify-center gap-5')}
          animate={{
            opacity: activeItem !== null ? 0 : 1,
            willChange: 'auto',
          }}
        >
          {allElements
            .filter((item: any, i: number) => i % 2 !== 0)
            .map((ele: any, index: React.Key | null | undefined) => (
              <TimelineItemPhoto
                item={ele}
                key={index}
                onClick={() => setActiveItem(ele)}
              />
            ))}
        </motion.div>
      </motion.div>

      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, willChange: 'auto' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='absolute inset-0 w-full h-full  overflow-hidden'
        >
          <AnimatePresence mode='popLayout'>
            <motion.div
              key={activeItem.id}
              className='w-full h-full flex items-center justify-center gap-10 overflow-hidden '
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              layout
            >
              <motion.div
                layoutId={`card-${activeItem.id}`}
                className='w-[400px] h-[400px] rounded-3xl center font-bold text-5xl cursor-pointer overflow-hidden z-10'
                onClick={() => setActiveItem(null)}
              >
                <img
                  src={activeItem.img}
                  alt=''
                  className='w-full object-cover h-full'
                />
              </motion.div>
              <motion.div
                className='flex flex-col gap-4 justify-center items-center'
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {allElements
                  .filter((ele: { id: number }) => ele.id !== activeItem.id)
                  .map((ele: any) => (
                    <TimelineItemPhoto
                      key={ele.id}
                      item={ele}
                      onClick={() => handleItemClick(ele)}
                      isSmall
                    />
                  ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
// allElements

const TimelineItemPhoto = (props: {
  item: any
  onClick?: () => void
  isSmall?: boolean
}) => {
  return (
    <motion.div
      style={{
        width: 250,
        height: 150,
      }}
      className={cn(
        'rounded-2xl cursor-pointer text-3xl center overflow-hidden relative'
      )}
      layoutId={`card-${props.item.id}`}
      onClick={props.onClick}
    >
      <motion.img
        src={props.item.url}
        alt=''
        className='w-full object-cover h-full'
        whileHover={{ scale: 1.05 }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.div>
  )
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
  mitigateCurrentYearValue: (year: number) => void
  style: React.CSSProperties
  scrolling: React.RefObject<boolean>
}

const TimelineToolTip: React.FC<TimelineToolTipProps> = ({
  event,
  coordinates,
}: any) => {
  return (
    <div className='hint'>
      <span className='hint-radius'></span>
      <span className='hint-dot'></span>
      <div className='hint-content do--split-children'>
        {/* <Image /> */}
        <p
          style={{ lineHeight: 0, color: '#fff' }}
          className={`font-firaCode text-[#78efff]`}
        >
          {coordinates[0]} {coordinates[1]}
        </p>
      </div>
    </div>
  )
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  events,
  year,
  currentYear,
  mitigateCurrentYearValue,
  style,
  scrolling,
}) => {
  // const [status, elementRef] = useVisibility(scrolling)

  // useEffect(() => {
  //   if (status === 'leaving') {
  //     mitigateCurrentYearValue(year)
  //   }
  // }, [status, mitigateCurrentYearValue, year])

  return (
    <div
      className={`grid-item ${year} transform-gpu`}
      style={style}
      // ref={elementRef}
    >
      {events.map((event) => (
        <div
          className={`timeline-item ${year} relative`}
          key={`${year}-${event.id}`}
        >
          <div className='absolute top-0 left-0 w-full h-60px z-50 bg-black/70 flex justify-end'>
            <TimelineToolTip
              event={event}
              coordinates={[event.latitude, event.longitude]}
            />
          </div>
          <h2
            className='text-white font-bebasNeue text-[48px] mb-2 capitalize'
            style={{ textWrap: 'pretty', lineHeight: '54px' }}
          >
            {event.name}
          </h2>
          <p className='text-white font-nunito tracking-wider text-lg'>
            {format(event.date, 'MMM dd, yyyy')}, {event.location}
          </p>
        </div>
      ))}
    </div>
  )
}

const throttle = (func: Function, limit: number) => {
  let inThrottle = false
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

interface SpatialTimelineProps {
  eventsByYear: Record<number, Event[]>
  years: number[]
}

export const SpatialTimeline: React.FC<SpatialTimelineProps> = ({
  eventsByYear,
  years,
}) => {
  const [currentYear, setCurrentYear] = useState(years[0])
  const scrolling = useRef(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      scrolling.current = true
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mitigateCurrentYearValue = useCallback(
    (nextYear: number) => {
      if (nextYear !== currentYear) {
        setCurrentYear(nextYear)
      }
    },
    [currentYear]
  )

  const calcAnimation = useCallback((index: number) => {
    const startOffset = index === 0 ? -20 : index * 5
    const endOffset = startOffset + 50

    const start = `${startOffset}%`
    const end = `${endOffset}%`

    return {
      'animation-range': `${start} ${end}`,
    }
  }, [])

  return (
    <div className='stuck-grid'>
      {years.map((year, index) => (
        <TimelineItem
          key={`${year}-${index}-grid-item`}
          year={year}
          currentYear={currentYear}
          events={eventsByYear[year]}
          mitigateCurrentYearValue={mitigateCurrentYearValue}
          scrolling={scrolling}
          style={{
            ...calcAnimation(index),
            zIndex: years.length - index + 1,
          }}
        />
      ))}
    </div>
  )
}
