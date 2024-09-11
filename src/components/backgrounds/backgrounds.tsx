'use client'

import { Spotlight } from '@/components/animated'
import React, { useRef } from 'react'

export function FarmUIBackground() {
  return (
    <div className='relative px-10 mt-10 w-full min-h-full'>
      <Spotlight />

      <div className='absolute -z-1 inset-0  h-[600px] w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>

      <div className='absolute right-0 bottom-0 left-0 mx-auto opacity-20'></div>
    </div>
  )
}
