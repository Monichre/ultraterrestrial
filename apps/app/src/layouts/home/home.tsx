'use client'

// import { Howl } from 'howler'
import { inView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'

const CanvasCursor = dynamic( () => import( '@/components/ui/canvas-cursor' ).then( mod => mod.CanvasCursor ) )
const LovecraftQuote = dynamic( () => import( './LovecraftQuote' ).then( mod => mod.LovecraftQuote ) )
const SiteTitle = dynamic( () => import( './SiteTitle' ).then( mod => mod.SiteTitle ) )
// const BlurAppear = dynamic(() => import('@/components/animated').then(mod => mod.BlurAppear))
const ShootingStars = dynamic( () => import( '@/components/backgrounds/shooting-stars' ).then( mod => mod.ShootingStars ) )
const StarsBackground = dynamic( () => import( '@/components/backgrounds/shooting-stars' ).then( mod => mod.StarsBackground ) )
const Earth = dynamic( () => import( '@/components/earth' ).then( mod => mod.Earth ) )
const Moon = dynamic( () => import( '@/components/moon' ).then( mod => mod.Moon ) )

// // import { Earth } from '@/components/earth'
// const Earth = dynamic(
//   () => import('@/components/earth').then((mod) => mod.Earth),
//   {
//     ssr: false,
//     loading: () => (
//       <img alt='earth2' src='/assets/earth2/placeholder.png'></img>
//     ),
//   }
// )
export interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {
  const earthRef: any = useRef( null )
  const [earthInView, setEarthInView] = useState( false )
  console.log( "🚀 ~ file: home.tsx:32 ~ earthRef:", earthRef )

  const moonRef = useRef( null )





  inView( earthRef.current, ( entry ) => {
    console.log( "🚀 ~ file: home.tsx:40 ~ entry:", entry )
    setEarthInView( true )
  } )

  // console.log( "🚀 ~ file: home.tsx:42 ~ earthInView:", earthInView )

  // const moonInView: any = useInView( moonRef )

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
      <div className='absolute top-1 left-1 h-[60vh] w-[60vw] z-1'>
        <Moon ref={moonRef} />
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0  h-full w-full !z-1'>
        <Earth ref={earthRef} />
      </div>

      <CanvasCursor />
      <div className='astronaut h-full w-full relative flex flex-col justify-center align-middle relative overflow-hidden items-center z-40'>

        {earthInView &&
          <div className='w-full '>
            <SiteTitle />
            <LovecraftQuote />
          </div>}


      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  )
}
