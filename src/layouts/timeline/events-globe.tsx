'use client'
import { locationToAngles } from '@/utils'
import createGlobe from 'cobe'
import { useEffect, useRef, useState } from 'react'

export function EventsGlobe({ markers, activeLocation }: any) {
  const canvasRef: any = useRef()

  const [activeMarker, setActiveMarker] = useState(null)

  const focusRef: any = useRef([0, 0])

  useEffect(() => {
    const baseColor: any = [0, 0.3569, 0.4196]
    const markerColor: any = [1, 0, 0.7098]
    const glowColor: any = [0.0118, 0.0824, 0.1373]

    let width = 0
    let currentPhi = 0
    let currentTheta = 0
    const doublePi = Math.PI * 2
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 0,
      mapSamples: 6300,
      mapBrightness: 5.7,
      baseColor,
      mapBaseBrightness: 0,
      markerColor,
      glowColor,
      opacity: 0.27,
      scale: 0.75,
      markers,
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.

        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  useEffect(() => {
    if (activeLocation) {
      console.log('activeLocation: ', activeLocation)
      const [lat, lon] = activeLocation
      focusRef.current = locationToAngles(lat, lon)
    }
  }, [activeLocation])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxWidth: '1000px',
        margin: 'auto',
        aspectRatio: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',

          contain: 'layout paint size',
        }}
      />
    </div>
  )
}
