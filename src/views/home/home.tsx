'use client'

import { Astronaut } from './astronaut/astronaut'
import { Howl } from 'howler'
import { useEffect } from 'react'
// import { PlanetMenu } from '../planet-menu'
import { CanvasCursor } from '@/components/ui/canvas-cursor'
import { SiteTitle } from './SiteTitle'
import { LovecraftQuote } from './LovecraftQuote'
export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  useEffect(() => {
    const sound = new Howl({
      src: ['/audio/interstellar-stay.mp3'],
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
  }, [])

  return (
    <div className='h-[100vh] w-[100vw] relative'>
      <CanvasCursor />
      <div className='astronaut h-full w-full relative flex flex-col justify-end align-middle relative overflow-hidden items-center'>
        <SiteTitle />
        <LovecraftQuote />
        <Astronaut />
      </div>
    </div>
  )
}
