// ./.storybook/preview.tsx
import type { Preview } from "@storybook/react"
import React, { useEffect } from 'react'
import '../src/app/globals.css'


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

      return <Story />
    },
  ],

  tags: ['autodocs']
}

export default preview
