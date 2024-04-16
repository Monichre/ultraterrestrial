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
  const goToVisualizations = () => router.push('/visualizations/mind-map')
  const goToConnectionsGraph = () =>
    router.push('/visualizations/connection-graph')

  return (
    <div className='absolute h-[400px] w-[400px] top-32 left-32 z-20'>
      <ReactPlanet
        hideOrbit
        open
        autoClose
        orbitRadius={100}
        rotation={45}
        satelliteOrientation={'READABLE'}
        centerContent={
          <div
            style={{
              height: 80,
              width: 80,
              cursor: 'pointer',
            }}
          >
            <Image alt='earth' src='/earth-1.png' height={80} width={80} />
          </div>
        }
      >
        <div
          style={{
            height: 40,
            width: 40,
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
            height: 40,
            cursor: 'pointer',
            width: 40,
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
        <div
          style={{
            height: 40,
            cursor: 'pointer',
            width: 40,
          }}
          onClick={goToConnectionsGraph}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image alt='saturn' src='/saturn.png' height={50} width={50} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Connections</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          style={{
            height: 40,
            cursor: 'pointer',
            width: 40,
          }}
          onClick={goToVisualizations}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image alt='moon' src='/moon.png' height={50} width={50} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Visualizations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ReactPlanet>
    </div>
  )
}
