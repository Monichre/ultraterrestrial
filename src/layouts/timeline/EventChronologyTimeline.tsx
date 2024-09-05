import { SpatialTimeline } from '@/layouts/timeline/SpatialTimeline'
import { TimelineSidebar } from '@/layouts/timeline/TimlineSidebarUI'

export const EventChronologyTimeline = ({ events }: any) => {
  console.log('events: ', events)
  return (
    <div className='relative h-[100vh] w-[100vw] bg-black '>
      <div className='absolute top-0 left-[40px] w-100px h-full flex flex-col justify-center z-40'>
        <TimelineSidebar events={events} />
      </div>
      <SpatialTimeline events={events} />
    </div>
  )
}
