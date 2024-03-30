'use client'

import { useState, useEffect } from 'react'
import EarthGlobe from 'react-globe.gl'
// import geojson from '@/src/data/events.geojson'

export interface GlobeProps {
  type: string
}

const images = {
  earthSky: '/8k_earth_nightmap.jpeg',
  nightSky: '/8k_stars_milky_way.jpeg',
}

export const Globe: React.FC<GlobeProps> = ({ type="sightings" }: GlobeProps) => {
  const pink = '#E393E6'
  const lightBlue = '#6EE3E6'
  const green = "#6EE6B5"
  const [points, setPoints] = useState<any[]>([])
  useEffect(() => {
    fetch(`/${type}.geojson`)
      .then((res) => res.json())
      .then((data) => {
        
        const { features } = data
        
        const formatted = features.map((d: any) => {
          const { geometry, properties } = d
          return {
            name: properties.name,
            lat: geometry.coordinates[1],
            lng: geometry.coordinates[0],
            color: green,
            size: .002,
          }
        })
        setPoints(formatted)
      })
  }, [])
  
  return (
    <EarthGlobe
    
    animateIn
      pointsData={points}
      globeImageUrl={images.earthSky}
      backgroundImageUrl={images.nightSky}
      labelsData={points}
      pointAltitude={.05}
      pointColor={(d: any) => d.color}
      // labelText={(d: any) => d.name}

    />
  )
}
