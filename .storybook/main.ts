import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
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
          injectStoryParameters: false,
        },
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    '../public',
    {
      from: '../public/fonts',
      to: '/fonts',
    },
  ],
}
export default config
