'use client'

import React, { forwardRef, Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Scroll,
  useScroll,
  ScrollControls,
} from '@react-three/drei'

import { TimeOverlay } from './time-overlay'
import './3d-scroll-through.css'
import { Model } from '@/components/3d/3d-scroll-through/model'
import { ScrollTicker } from '@/features/3d/templates/Scroll'
export interface ThreeDScrollThroughProps {
  events: any
  years: string[]
  keyFigures: any
}

// const ScrollScene = forwardRef((props, ref) => {

//   return <TimeOverlay ref={ref} caption={caption} scroll={scroll} />
// })
// ScrollScene.displayName = 'ScrollScene'

export const ThreeDScrollThrough: React.FC<ThreeDScrollThroughProps> = ({
  events,
  years,
  keyFigures,
}: ThreeDScrollThroughProps) => {
  const sourceRef: any = useRef()
  const overlay: any = useRef()
  const scroll: any = useRef(0)
  console.log('scroll: ', scroll)

  // useEffect(() => {
  //   const scrollContainer = document.querySelector('#threeD-scroll-through')

  //   if (scrollContainer && scroll?.current) {
  //     scrollContainer.addEventListener('scroll', (e: any) => {
  //       scroll.current =
  //         e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
  //       caption.current.innerText = scroll.current.toFixed(2)
  //     })
  //   }
  //   // state.events.connect(domNode)
  // }, [scroll])

  return (
    <div id='threeD-scroll-through' className='h-[100vh]' ref={sourceRef}>
      <Canvas shadows eventSource={sourceRef.current} eventPrefix='client'>
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />

          <Environment preset='city' />
        </Suspense>
      </Canvas>
      <TimeOverlay ref={overlay} scroll={scroll} />
    </div>
  )
}
