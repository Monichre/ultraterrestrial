// 'use client'
import { Planet as ReactPlanet } from 'react-planet'

import Image from 'next/image'

export interface PlanetMenuProps {}

export const PlanetMenu: React.FC<PlanetMenuProps> = (
  props: PlanetMenuProps
) => {
  return (
    <div className='flex h-auto justify-center w-full h-[100px] relative top-[20vh] z-20'>
      <ReactPlanet
        centerContent={
          <div
            style={{
              height: 100,
              width: 100,
            }}
          >
            <Image alt='earth' src='/earth-1.png' height={100} width={100} />
          </div>
        }
        open
        rotation={90}
        autoClose
        dragablePlanet
        dragRadiusPlanet={20}
        bounce
      >
        <div
          style={{
            height: 70,
            width: 70,
          }}
        >
          <Image alt='earth' src='/venus.png' height={70} width={70} />
        </div>
        <div
          style={{
            height: 70,
            width: 70,
          }}
        >
          <Image alt='earth' src='/venus.png' height={70} width={70} />
        </div>
      </ReactPlanet>
    </div>
  )
}
