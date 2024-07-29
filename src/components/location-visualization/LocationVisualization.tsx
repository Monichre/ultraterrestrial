import { SlideFadeIn } from '@/components/animations/animated-wrappers'
import { Button } from '@/components/ui/button/button'

import { AdminDashboardGlobe } from '@/components/ui/globe'
import { useMindMap } from '@/providers'
import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface LocationVisualizationProps {}

export const LocationVisualization: React.FC<LocationVisualizationProps> = (
  props: LocationVisualizationProps
) => {
  const {
    showLocationVisualization,
    locationsToVisualize,
    toggleLocationVisualization,
  } = useMindMap()
  // bg-[#0a0a0a]

  const [markers, setMarkers] = useState([])

  useEffect(() => {
    console.log('locationsToVisualize: ', locationsToVisualize)
    if (locationsToVisualize.length) {
      const newMarkers = locationsToVisualize.map(({ data }: any) => {
        return {
          location: [data.latitude, data.longitude],
          size: 0.025,
        }
      })
      setMarkers(newMarkers)
    }
  }, [locationsToVisualize])

  if (showLocationVisualization) {
    return (
      <div className='fixed top-0 right-0 w-[28vw] z-50 bg-gradient-to-b from-transparent via-[#0a0a0a] to-black '>
        <Button
          variant='ghost'
          onClick={toggleLocationVisualization}
          className='absolute top-[10px] right-[10px]'
        >
          <XIcon className='w-5 h-5' />
        </Button>
        <div className='w-full flex-col align-middle justify-center items-center content-center'>
          <div className='flex-col text-xs pt-3 uppercase flex'>
            The omnichain future is here.
          </div>

          <AdminDashboardGlobe markers={markers} />
          <div className='px4 w-full '>
            <div className='text-neutral-500  text-xs uppercase'>
              <span className='text-lime-300'>99</span> dapps
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

// <SlideFadeIn direction='down' full>
// </SlideFadeIn>
