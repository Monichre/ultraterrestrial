import { FunctionComponent } from 'react'

import Image from 'next/image'
import { PlanetMenu } from '@/components/planet-menu'

interface AstronautProps {}

export const Astronaut: FunctionComponent<AstronautProps> = () => {
  const handleNavClick = () => {}
  // animate('.item', { x: 300 }, { delay: stagger(0.1) })
  return (
    <div className='astronaut h-full w-full relative flex flex-col justify-end align-middle relative overflow-hidden'>
      <div className=' w-full h-auto absolute bottom-0 left-0 flex justify-center align-bottom center'>
        <div className='flex-end align-bottom self-end'>
          <Image
            height={800}
            width={800}
            alt='astronaut'
            src={'/astronaut-2.png'}
          />
        </div>
      </div>
    </div>
  )
}
