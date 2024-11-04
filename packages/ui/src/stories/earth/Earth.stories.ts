import type { Meta, StoryObj } from '@storybook/react'
import { Earth } from '@/components/earth'

const meta = {
  title: 'Components/Earth',
  component: Earth,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof Earth>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {

  },
};


