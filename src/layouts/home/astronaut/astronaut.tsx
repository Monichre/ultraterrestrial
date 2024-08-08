'use client'
import { FunctionComponent, useEffect, useState } from 'react'
import { useMedia } from 'react-use'

import { VFX } from '@vfx-js/core'
const vfx = new VFX()

import Image from 'next/image'

interface AstronautProps {}

export const Astronaut: FunctionComponent<AstronautProps> = () => {
  const isLargeScreen = useMedia('(min-width: 1280px)')
  const size: number = isLargeScreen ? 600 : 300

  useEffect(() => {
    // const img: any = document.getElementById('#astronaut')
    // vfx.add(img, { shader: 'rgbShift' })
    // | "uvGradient"
    // | "rainbow"
    // | "glitch"
    // | "rgbGlitch"
    // | "rgbShift"
    // | "shine"
    // | "blink"
    // | "spring"
    // | "duotone"
    // | "tritone"
    // | "hueShift"
    // | "sinewave"
    // | "pixelate"
    // | "halftone"
    // | "slitScanTransition"
    // | "warpTransition"
    // | "pixelateTransition"
  }, [])

  return (
    <div className='items-center align-bottom self-center mt-[48px]'>
      <Image
        className='mx-auto sm:h-[200px] sm:w-[200px] md:h-[300px] md:w-[300px] xl:h-[400px] lg:h-[300px] lg:w-[300px] xl:h-full xl:w-full relative z-40'
        height={size}
        width={size}
        alt='astronaut'
        id='#astronaut'
        src={'/astronaut-2.png'}
      />
    </div>
  )
}
