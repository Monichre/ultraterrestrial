'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useState, useEffect } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import DeckGL, { ScatterplotLayer } from 'deck.gl'
import { MapboxLayer } from '@deck.gl/mapbox'
import { useCallback } from 'react'
import { useMemo } from 'react'

const MapGL: any = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN || '',
})

export const MapboxGlobe: React.FC<any> = ({ sightings }) => {
  const [deckGlLayer, setDeckGlLayer]: any = useState(null)
  const defaultCenter = useMemo(
    () => [-125.148032, 19.613688] as unknown as [number, number],
    []
  )
  const [center, setCenter] = useState(defaultCenter)
  const pitch: any = [0]
  const zoom: any = [2.48]
  const [state, setState]: any = useState({ zoom, center, pitch })
  const [data, setData]: any = useState(null)

  const fetchCurrentUserLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: any = [
            position.coords.longitude,
            position.coords.latitude,
          ]
          setCenter(userLocation) // Update map center with user's location
        },
        (error) => {
          console.error('Error retrieving location:', error)
          // Use default location if geolocation fails
          // setCenter(defaultCenter)
        }
      )
    } else {
      console.error('Geolocation not supported by this browser.')
      // Fallback to default center
      setCenter(defaultCenter)
    }
  }, [defaultCenter])

  useEffect(() => {
    fetchCurrentUserLocation()
  }, [fetchCurrentUserLocation])

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      center,
    }))
  }, [center])

  // Load sightings data (geoJSON format)
  useEffect(() => {
    const geojsonUrl = '/sightings.geojson'

    const fetchSightings = async () => {
      const response = await fetch(geojsonUrl)
      const data = await response.json()

      setData(data)

      const points = data.features.map((feature: any) => ({
        position: feature.geometry.coordinates,
        name: feature.properties.name,
        color: [30, 144, 255],
        size: 2000, // Adjust size based on visualization needs
      }))

      const scatterplotLayer = new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: points,
        getPosition: (d: any) => d.position,
        getFillColor: (d: any) => d.color,
        getRadius: (d: any) => d.size,
        radiusMinPixels: 3,
        pickable: true,
        opacity: 0.8,
      })

      const deckLayer = new MapboxLayer({
        id: 'deckgl-scatter',
        scatterplotLayer,
      })
      setDeckGlLayer(deckLayer)
    }

    fetchSightings()
  }, [])

  useEffect(() => {
    let currentTime = 0
    const updateSightings = () => {
      if (data && deckGlLayer) {
        const points = data.features
          .filter((feature: any) => {
            const eventDate = new Date(feature.properties.date) // Assuming there's a date field
            return eventDate.getTime() <= currentTime
          })
          .map((feature: any) => ({
            position: feature.geometry.coordinates,
            name: feature.properties.name,
            color: [30, 144, 255],
            size: 2000,
          }))

        const updatedScatterplotLayer = new ScatterplotLayer({
          id: 'scatterplot-layer',
          data: points,
          getPosition: (d: any) => d.position,
          getFillColor: (d: any) => d.color,
          getRadius: (d: any) => d.size,
          radiusMinPixels: 3,
          pickable: true,
          opacity: 0.8,
        })

        deckGlLayer.setProps({ layers: [updatedScatterplotLayer] })
      }
      // Update layer dynamically
    }

    const interval = setInterval(() => {
      currentTime += 86400000 // Advance by one day
      updateSightings()
    }, 1000)

    return () => clearInterval(interval)
  }, [data, deckGlLayer])

  return (
    <MapGL
      movingMethod='flyTo'
      pitch={state?.pitch}
      zoom={state?.zoom}
      center={state?.center}
      style={`mapbox://styles/ellisliam/cld51oavf001e01o2eko08rd9`}
      containerStyle={{ height: '100vh', width: '100vw' }}
      renderChildrenInPortal
      onStyleLoad={(map: any) => {
        if (deckGlLayer) {
          map.addLayer(deckGlLayer) // Add DeckGL layer on top of Mapbox base
        }
      }}
    >
      {/* Render additional Mapbox layers here if needed */}
    </MapGL>
  )
}
