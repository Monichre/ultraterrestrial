'use client'

import { Planet as ReactPlanet } from 'react-planet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import Image from 'next/image'
import { Suspense } from 'react'
import Link from 'next/link'

export interface PlanetMenuProps {}

export const PlanetMenu: React.FC<PlanetMenuProps> = (
  props: PlanetMenuProps
) => {
  return (
    <div className='fixed h-[220px] w-[220px] top-[80px] left-[80px] z-20'>
      <Suspense fallback={null}>
        <ReactPlanet
          hideOrbit
          open
          orbitRadius={80}
          rotation={45}
          centerContent={
            <div
              style={{
                position: 'relative',
                zIndex: 20,
                height: 60,
                width: 60,
                cursor: 'pointer',
              }}
            >
              <Image alt='earth' src='/earth-1.png' height={60} width={60} />
            </div>
          }
        >
          <Link
            style={{
              position: 'relative',
              zIndex: 20,
              height: 40,
              width: 40,
              cursor: 'pointer',
            }}
            href='/sightings'
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
          </Link>

          <Link
            style={{
              position: 'relative',
              zIndex: 20,
              height: 40,
              cursor: 'pointer',
              width: 40,
            }}
            href='/history'
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
          </Link>
          <Link
            style={{
              position: 'relative',
              zIndex: 20,
              height: 40,
              cursor: 'pointer',
              width: 40,
            }}
            href='/explore'
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    alt='saturn'
                    src='/saturn.png'
                    height={50}
                    width={50}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connections</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          <Link
            style={{
              position: 'relative',
              zIndex: 20,
              height: 40,
              cursor: 'pointer',
              width: 40,
            }}
            href='/explore/visualizations/word-cloud'
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image alt='moon' src='/moon.png' height={50} width={50} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Explore Topics in a Word Cloud</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </ReactPlanet>
      </Suspense>
    </div>
  )
}
