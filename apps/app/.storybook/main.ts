import type { StorybookConfig } from '@storybook/nextjs'

import { dirname, join } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath( value: string ): any {
  return dirname( require.resolve( join( value, 'package.json' ) ) )
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../docs/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath( '@storybook/addon-onboarding' ),
    getAbsolutePath( '@storybook/addon-essentials' ),
    getAbsolutePath( '@chromatic-com/storybook' ),
    getAbsolutePath( '@storybook/addon-interactions' ),
    getAbsolutePath( '@storybook/addon-storysource' ),
    getAbsolutePath( '@storybook/addon-console' ),

  ],

  framework: {
    name: getAbsolutePath( '@storybook/nextjs' ),
    options: {},
  },

  staticDirs: ['../public'],

  features: {
    experimentalRSC: true,
  },

  docs: {}
}
export default config


// import { StorybookConfig } from '@storybook/nextjs';

// const config: StorybookConfig = {
//   // ...
//   // framework: '@storybook/react-webpack5', 👈 Remove this
//   framework: '@storybook/nextjs', // 👈 Add this
// };

// export default config;

