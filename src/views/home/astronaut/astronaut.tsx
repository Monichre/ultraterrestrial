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
        className='mx-auto sm:h-[200px] sm:w-[200px] md:h-[300px] md:w-[300px] xl:h-[400px] lg:h-[300px] lg:w-[300px] xl:h-full xl:w-full'
        height={300}
        width={300}
        alt='astronaut'
        src={'/astronaut-2.png'}
      />
    </div>
  )
}
