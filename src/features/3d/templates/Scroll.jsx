'use client'
// https://github.com/studio-freight/lenis
// TODO refactor for app-directory
// See https://github.com/pmndrs/react-three-next/pull/123

// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import { addEffect, useFrame } from '@react-three/fiber'
import Lenis from '@studio-freight/lenis'

import * as THREE from 'three'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'

const ScrollContext = createContext(0)
export const useScrollContext = () => useContext(ScrollContext)

const { damp } = THREE.MathUtils

export default function Scroll({ children }) {
  const state = useMemo(
    () => ({
      top: 0,
      progress: 0,
    }),
    []
  )

  const content = useRef(null)
  const wrapper = useRef(null)
  const [scroll, setScroll] = useState(0)

  console.log({ scroll })
  useEffect(() => {
    console.log('state: ', state)
    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ({ scroll, progress }) => {
      state.top = scroll
      state.progress = progress
    })
    const effectSub = addEffect((time) => lenis.raf(time))
    return () => {
      effectSub()
      lenis.destroy()
    }
  }, [state])

  return (
    <ScrollContext.Provider value={{ scroll, setScroll }}>
      <div
        ref={wrapper}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          top: 0,
        }}
      >
        <div
          ref={content}
          style={{
            position: 'relative',
            minHeight: '200vh',
          }}
        >
          {children}
        </div>
      </div>
    </ScrollContext.Provider>
  )
}

export const ScrollTicker = ({ smooth = 9999999 }) => {
  // useFrame(({ viewport, camera }, delta) => {

  //   // camera.position.y = damp(
  //   //   camera.position.y,
  //   //   -state.progress * viewport.height,
  //   //   smooth,
  //   //   delta
  //   // )
  // })

  return null
}
