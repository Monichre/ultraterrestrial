
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap-trial/dist/ScrollSmoother'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Inter } from 'next/font/google'
import { useGSAP } from '@gsap/react'

if ( typeof window !== 'undefined' ) {
  gsap.registerPlugin( ScrollTrigger, ScrollSmoother, useGSAP )
}

export const GsapTimelineWrapper = () => {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}

