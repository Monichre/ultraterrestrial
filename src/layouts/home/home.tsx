'use client'

import { Astronaut } from './astronaut/astronaut'
import { Howl } from 'howler'
import { useEffect } from 'react'
// import { PlanetMenu } from '../planet-menu'
import { CanvasCursor } from '@/components/ui/canvas-cursor'
import { SiteTitle } from './SiteTitle'
import { LovecraftQuote } from './LovecraftQuote'
import dynamic from 'next/dynamic'
// import { Earth } from '@/components/earth'
const Earth = dynamic(
  () => import('@/components/earth').then((mod) => mod.Earth),
  {
    ssr: false,
    loading: () => (
      <img alt='earth2' src='/assets/earth2/placeholder.png'></img>
    ),
  }
)
export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  useEffect(() => {
    const sound = new Howl({
      src: ['/assets/audio/interstellar-stay.mp3'],
      html5: true,
      loop: true,
      preload: true,
      autoplay: true,
      volume: 0.5,
      onend: function () {
        console.log('Finished!')
      },
    })

    sound.play()
  })

  return (
    <div className='h-[100vh] w-[100vw] relative'>
      <div className='absolute top-0 left-0 right-0 bottom-0  h-full w-full z-0'>
        <Earth />
      </div>
      <CanvasCursor />
      <div className='astronaut h-full w-full relative flex flex-col justify-end align-middle relative overflow-hidden items-center z-40'>
        <SiteTitle />
        <LovecraftQuote />
        <Astronaut />
      </div>
    </div>
  )
}
