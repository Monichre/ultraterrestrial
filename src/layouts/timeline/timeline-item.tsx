'use client'

import { TimelineToolTip } from '@/layouts/timeline/timeline-tooltip'
import { DOMAIN_MODEL_COLORS } from '@/utils'
import { Separator } from '@radix-ui/react-separator'
import { format } from 'date-fns'
import { events } from '../../components/visualizations/spatial-gallery/events'

export const TimelineItem: React.FC<any> = ({
  events,
  year,
  currentYear,
  mitigateCurrentYearValue,
  style,
  scrolling,
  updateActiveLocation,
}) => {
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
      className={`grid-item ${year}`}
      style={style}
      // ref={elementRef}
    >
      {events.map((event) => (
        <div
          className={`timeline-item ${year} relative`}
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
            {format(event.date, 'MMM dd, yyyy')},
          </p>

          <div className='flex items-center align-middle mt-8'>
            <p className='text-white font-source tracking-wider text-xl mr-6'>
              {event.location}
            </p>
            <TimelineToolTip
              event={event}
              onHover={updateActiveLocation}
              coordinates={[event.latitude, event.longitude]}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
