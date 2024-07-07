import React from 'react'
import type { Preview } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'

import '../src/app/globals.css' // replace with the name of your tailwind css file

const preview: Preview = {
  // decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
  decorators: [
    (Story, context) => (
      <div className='dark'> {withConsole()(Story)(context)} </div>
    ),
  ],
  parameters: {
    parameters: {
      // ...
      nextjs: {
        appDirectory: true,
      },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/i,
        },
      },
    },
  },
}
export default preview
