'use client'

import { Astronaut } from '../ui/home/astronaut/astronaut'
import { Howl } from 'howler'
import { useEffect } from 'react'
// import { PlanetMenu } from '../planet-menu'
import { CanvasCursor } from '@/components/ui/canvas-cursor'
export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
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

  useEffect(() => {
    // sound.play()
  }, [sound])

  return (
    <>
      {/* <PlanetMenu /> */}
      <CanvasCursor />

      <Astronaut />
    </>
  )
}
