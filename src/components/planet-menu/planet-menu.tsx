'use client'

import { Planet as ReactPlanet } from 'react-planet'

import Image from 'next/image'
import { Suspense } from 'react'
import Link from 'next/link'

export interface PlanetMenuProps {}

export const PlanetMenu: React.FC<PlanetMenuProps> = (
  props: PlanetMenuProps
) => {
  return (
    <Suspense fallback={null}>
      <div className='absolute top-[80px] right-[0px] z-40 h-[150px] w-[150px]'>
        <ReactPlanet
          hideOrbit
          // open
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
            <Image alt='venus' src='/venus.png' height={40} width={40} />
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
            <Image alt='mars' src='/mars.png' height={40} width={40} />
          </Link>

          <Link
            key='explore-root'
            style={{
              position: 'relative',
              zIndex: 20,
              height: 40,
              cursor: 'pointer',
              width: 40,
            }}
            href='/explore'
          >
            <Image alt='saturn' src='/saturn.png' height={40} width={40} />
          </Link>

          <Link
            key='explore-word-cloud'
            style={{
              position: 'relative',
              zIndex: 20,
              height: 40,
              cursor: 'pointer',
              width: 40,
            }}
            href='/explore/visualizations/word-cloud'
          >
            <Image alt='moon' src='/moon.png' height={40} width={40} />
          </Link>
        </ReactPlanet>
      </div>
    </Suspense>
  )
}
