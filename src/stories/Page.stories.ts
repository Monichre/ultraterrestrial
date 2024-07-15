import { Home } from '@/views/home'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Pages/Home',
  component: Home,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/',
        asPath: '/',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Home>

export default meta

type Story = StoryObj<typeof meta>

export const HomePage: Story = {}

// const meta = {
//   title: 'Components/Spatial Gallery',
//   component: SpatialGallery,
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
//   tags: ['autodocs'],
//   parameters: {
//     // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
//     layout: 'fullscreen',

//     nextjs: {
//       router: {
//         pathname: '/explore/events/',
//         asPath: '/profile/1',
//         query: {
//           id: '',
//         },
//       },
//     },
//   },
//   args: {
//     images: [],
//   },
// } satisfies Meta<typeof SpatialGallery>

// export default meta
