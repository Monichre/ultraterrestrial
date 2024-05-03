import type { Preview } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'

const preview: Preview = {
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
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
