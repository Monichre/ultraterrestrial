import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { GlowingStarsCard } from './cards'

const meta = {
  title: 'Components/Cards/GlowingStarsCard',
  component: GlowingStarsCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof GlowingStarsCard>

export default meta

type Story = StoryObj<typeof meta>

export const GlowingStarsCardDemo: Story = {
  args: {},
}
