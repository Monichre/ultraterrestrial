'use client'

import { EarthOptimized } from '@/components/earth/Earth'
import { wait } from '@/utils'
import { log } from 'console'
// import { Howl } from 'howler'
import { AnimatePresence, inView, motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'


const CanvasCursor = dynamic( () => import( '@/components/ui/canvas-cursor' ).then( mod => mod.CanvasCursor ) )
const LovecraftQuote = dynamic( () => import( './LovecraftQuote' ).then( mod => mod.LovecraftQuote ) )
const SiteTitle = dynamic( () => import( './SiteTitle' ).then( mod => mod.SiteTitle ) )
// const BlurAppear = dynamic(() => import('@/components/animated').then(mod => mod.BlurAppear))
const ShootingStars = dynamic( () => import( '@/components/backgrounds/shooting-stars' ).then( mod => mod.ShootingStars ) )
const StarsBackground = dynamic( () => import( '@/components/backgrounds/shooting-stars' ).then( mod => mod.StarsBackground ) )
// const Earth = dynamic( () => import( '@/components/earth' ).then( mod => mod.Earth ) )
const Moon = dynamic( () => import( '@/components/moon' ).then( mod => mod.Moon ) )



const onRenderCallback = (
  id: any, // the "id" prop of the Profiler tree that has just committed
  phase: any, // either "mount" or "update"
  actualDuration: any, // time spent rendering the committed update
  baseDuration: any, // estimated time to render the entire subtree without memoization
  startTime: any, // when React began rendering this update
  commitTime: any, // when React committed this update
  interactions: any // the Set of interactions belonging to this update
) => {
  console.log( "🚀 ~ file: home.tsx:32 ~ onRenderCallback ~ actualDuration:", actualDuration )
  console.log( "🚀 ~ file: home.tsx:32 ~ onRenderCallback ~ baseDuration:", baseDuration )
  console.log( "🚀 ~ file: home.tsx:32 ~ onRenderCallback ~ startTime:", startTime )
  console.log( "🚀 ~ file: home.tsx:32 ~ onRenderCallback ~ commitTime:", commitTime )
  console.log( "🚀 ~ file: home.tsx:32 ~ onRenderCallback ~ interactions:", interactions )

}


export interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {


  const [moonInView, setMoonInView] = useState( false )

  // console.log( "🚀 ~ file: home.tsx:42 ~ earthInView:", earthInView )

  useEffect( () => {
    // inView( '#moon-canvas', ( entry ) => {
    //   setMoonInView( entry.isIntersecting )
    // } )
    if ( !moonInView ) {
      wait( 500 ).then( () => {
        setMoonInView( true )
      } )
    }

  }, [moonInView] )

  // console.log( "🚀 ~ file: home.tsx:46 ~ moonInView:", moonInView )

  // useEffect( () => {
  //   console.log( "🚀 ~ file: home.tsx:50 ~ moonInView:", moonInView )
  //   console.log( "🚀 ~ file: home.tsx:51 ~ earthInView:", earthInView )
  // }, [moonInView, earthInView] )



  // const { ref: moonInViewRef, inView: isMoonInView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,
  // })

  // useEffect( () => {
  //   const sound = new Howl( {
  //     src: ['/assets/audio/interstellar-stay.mp3'],
  //     html5: true,
  //     loop: true,
  //     preload: true,
  //     autoplay: true,
  //     volume: 0.5,
  //     onend: function () {
  //       console.log( 'Finished!' )
  //     },
  //   } )

  //   sound.play()
  // } )

  return (
    <div className='h-[100vh] w-[100vw] relative'>
      <div className='absolute top-0 left-0 h-[100vh] w-[100vw] z-1'>
        <Moon />
      </div>
      {/* <div className='absolute top-0 left-0 right-0 bottom-0  h-full w-full !z-1'>
        <Earth ref={earthRef} />
      </div> */}
      {/* 
      <Profiler id="Earth" onRender={onRenderCallback}>
        <Earth />
      </Profiler> */}

      <CanvasCursor />
      <div className='astronaut h-full w-full relative flex flex-col justify-center align-middle relative overflow-hidden items-center z-40'>
        {/* @ts-ignore */}
        {/* <AnimatePresence>
          {moonInView && ( )}
        </AnimatePresence> */}
        <motion.div className='w-full'>
          <SiteTitle />
          <LovecraftQuote />
        </motion.div>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  )
}
