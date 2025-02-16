// ./.storybook/preview.tsx
import type { Preview } from "@storybook/react"
import React, { useEffect } from 'react'
import '../src/app/globals.css'

declare global {
  interface Window {
    ScrollTrigger?: {
      getAll: () => { kill: () => void }[]
    }
  }
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    canvas: {
      backgroundColor: '#000000',
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },

  decorators: [
    ( Story ) => {
      // Add GSAP ScrollTrigger cleanup
      useEffect( () => {
        return () => {
          if ( window.ScrollTrigger ) {
            window.ScrollTrigger.getAll().forEach( trigger => trigger.kill() )
          }
        }
      }, [] )

      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#000000',
          overflow: 'hidden'
        }}>
          <Story />
        </div>
      )
    },
  ],

  tags: ['autodocs']
}

export default preview
