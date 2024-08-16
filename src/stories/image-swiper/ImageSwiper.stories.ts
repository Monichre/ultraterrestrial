import type { Meta, StoryObj } from '@storybook/react'
import { ImageSwiper } from '@/components/animations/image-swiper'

const meta = {
  title: 'Components/ImageSwiper',
  component: ImageSwiper,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ImageSwiper>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    images: ['/astro-3.png', '/astro-5.png', '/astronaut.png'],
  },
}
