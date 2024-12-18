import type { Meta, StoryObj } from '@storybook/react'
import { BlurFade } from '@/components/animated/blur-fade'

const meta = {
  title: 'Components/BlurFade',
  component: BlurFade,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof BlurFade>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
}
