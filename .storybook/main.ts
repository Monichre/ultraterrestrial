import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  features: {
    experimentalRSC: true,
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions/register',
    'storybook-vscode-component/register',
    '@storybook/addon-console',
    {
      name: '@storybook/addon-storysource',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: true,
        },
      },
    },
    '@storybook/addon-mdx-gfm',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {},

  staticDirs: ['../public'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
