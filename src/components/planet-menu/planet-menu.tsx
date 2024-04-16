'use client'
import { Planet as ReactPlanet } from 'react-planet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export interface PlanetMenuProps {}

export const PlanetMenu: React.FC<PlanetMenuProps> = (
  props: PlanetMenuProps
) => {
  const router = useRouter()

  const goToInvestigations = () => router.push('/investigate')
  const goToSightings = () => router.push('/sightings')

  return (
    <div className='absolute top-20 left-20 z-20'>
      <ReactPlanet
        hideOrbit
        open
        autoClose
        orbitRadius={100}
        rotation={150}
        centerContent={
          <div
            style={{
              height: 100,
              width: 100,
              cursor: 'pointer',
            }}
          >
            <Image alt='earth' src='/earth-1.png' height={100} width={100} />
          </div>
        }
      >
        <div
          style={{
            height: 50,
            width: 50,
            cursor: 'pointer',
          }}
          onClick={goToSightings}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image alt='venus' src='/venus.png' height={50} width={50} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sightings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          style={{
            height: 50,
            cursor: 'pointer',
            width: 50,
          }}
          onClick={goToInvestigations}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image alt='mars' src='/mars.png' height={50} width={50} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Investigations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ReactPlanet>
    </div>
  )
}
