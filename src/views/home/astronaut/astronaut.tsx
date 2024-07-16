'use client'
import { FunctionComponent, useEffect, useState } from 'react'

import Image from 'next/image'

interface AstronautProps {
  children?: any
}

export const Astronaut: FunctionComponent<AstronautProps> = ({
  children,
}: any) => {
  return (
    <div className='items-center align-bottom self-center mt-[48px]'>
      <Image
        className='mx-auto md:h-[200px] sm:w-[200px] lg:h-[400px] lg:w-[400px] xl:h-full lg:w-full'
        height={600}
        width={600}
        alt='astronaut'
        src={'/astronaut-2.png'}
      />
    </div>
  )
}
