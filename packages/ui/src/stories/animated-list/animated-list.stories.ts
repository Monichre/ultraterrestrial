import type { Meta, StoryObj } from '@storybook/react'
import { AnimatedList } from '@/components/animated/animated-list'

const meta = {
  title: 'Components/AnimatedList',
  component: AnimatedList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof AnimatedList>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
}
