'use client'

import { Astronaut } from '../ui/home/astronaut/astronaut'
import { Howl } from 'howler'
import { useEffect } from 'react'
// import { PlanetMenu } from '../planet-menu'
import { CanvasCursor } from '@/components/ui/canvas-cursor'
import { HomePageNav } from '@/components/navbar'
import { Sparkles, LibraryBig, Crosshair, Home as HomeIcon } from 'lucide-react'
import { FullSiteNav } from '@/components/navbar/full-site-nav'
export interface HomeProps {}

const navItems = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon strokeWidth={1} />,
  },
  {
    name: 'Explore',
    link: '/explore',
    icon: <Sparkles strokeWidth={1} />,
  },
  {
    name: 'History',
    link: '/history',
    icon: <LibraryBig strokeWidth={1} />,
  },
  {
    name: 'Sightings',
    link: '/sightings',
    icon: <Crosshair strokeWidth={1} />,
  },
]

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
      {/* <HomePageNav navItems={navItems} /> */}
      <FullSiteNav />
      <CanvasCursor />

      <Astronaut />
    </div>
  )
}
